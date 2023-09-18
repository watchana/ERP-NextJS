import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LoginPage from 'src/pages/login'
import { SettingsProvider, SettingsConsumer } from 'src/@core/context/settingsContext' // Import SettingsProvider and SettingsConsumer

// Import ThemeComponent
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Cookies
import Cookies from 'js-cookie'

const withAuth = WrappedComponent => {
  const AuthComponent = props => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [theme, setTheme] = useState({})

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = Cookies.get('jwt')
          console.log('token: ', token)
          if (!token) {
            if (router.pathname !== '/pages/login') {
              setIsAuthenticated(false)
            }
          } else {
            const userData = JSON.parse(localStorage.getItem('userData'))
            if (!userData || Object.keys(userData).length === 0) {
              setIsAuthenticated(false)
            } else {
              setIsAuthenticated(true)
            }
          }
        } catch (error) {
          console.error('ErrorApp:', error)
          setIsAuthenticated(false)
        }
      }

      checkAuth()

      const storedTheme = JSON.parse(localStorage.getItem('theme'))
      setTheme(storedTheme || {})
    }, [router, router.pathname])

    if (!isAuthenticated) {
      // แสดง Component LoginPage และส่งค่า theme ไปให้
      return (
        <SettingsProvider>
          {' '}
          {/* Wrap with SettingsProvider */}
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeComponent settings={settings}>
                {/* Wrap ThemeComponent around LoginPage */}
                <LoginPage theme={theme} {...props} />
              </ThemeComponent>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      )
    }

    return <WrappedComponent {...props} />
  }

  return AuthComponent
}

export default withAuth
