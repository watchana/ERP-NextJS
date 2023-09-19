// ** React Imports
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { CacheProvider } from '@emotion/react'

// ** NextJS Imports
import { Router as NextRouter } from 'next/router'
import Head from 'next/head'

// ** Auth
import WithAuth from 'src/@core/utils/withAuth'

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

const App = ({ Component, initialIsLoggedIn, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
          />
          <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>{getLayout(<Component {...pageProps} />)}</ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </CacheProvider>
    </Provider>
  )
}

export default WithAuth(App)
