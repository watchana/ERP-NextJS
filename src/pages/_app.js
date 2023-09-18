// ** React Imports
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react'

// ** NextJS Imports
import { useRouter, Router as NextRouter } from 'next/router'
import Head from 'next/head'

// ** Axios
import axios from 'axios'

// ** Cookies
import Cookies from 'js-cookie'

// ** redux wrapper
import { wrapper } from 'src/redux/store'

// ** NProgress
import NProgress from 'nprogress'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'
import '../../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

if (themeConfig.routingLoader) {
  NextRouter.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  NextRouter.events.on('routeChangeError', () => {
    NProgress.done()
  })
  NextRouter.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const InnerApp = ({ Component, pageProps, emotionCache }) => {
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <CacheProvider value={emotionCache}>
      <Head>{/* ... */}</Head>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

const App = ({ Component, initialIsLoggedIn, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()
  const token = Cookies.get('jwt')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          localStorage.removeItem('userData')
          if (router.pathname !== '/pages/login') {
            router.push('/pages/login')
          }
        } else {
          const userData = JSON.parse(localStorage.getItem('userData'))
          console.log('userData', userData)
          if (userData === null || Object.keys(userData).length === 0) {
            localStorage.removeItem('userData')
            if (router.pathname !== '/pages/login') {
              router.push('/pages/login')
            }
          } else {
            const res = await axios.post('/api/logger', { token: token })
            if (res.status !== 200 && router.pathname !== '/pages/login') {
              localStorage.removeItem('userData')
              router.push('/pages/login')
            } else if (res.status === 200 && router.pathname === '/pages/login') {
              router.push('/')
            }
          }
        }
      } catch (error) {
        console.error('ErrorApp:', error)
        localStorage.removeItem('userData')
        if (router.pathname !== '/pages/login') {
          router.push('/pages/login')
        }
      }
    }

    checkAuth()
  }, [router, token])

  return (
    <Provider store={store}>
      <Head>
        <title>ERP NEXT.JS</title>
      </Head>
      <InnerApp Component={Component} pageProps={pageProps} emotionCache={emotionCache} />
    </Provider>
  )
}

export default App
