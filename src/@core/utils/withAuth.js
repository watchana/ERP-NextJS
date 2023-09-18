import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Pages
import LoginPage from 'src/pages/login'

// ** Context
import { SettingsProvider, SettingsConsumer } from 'src/@core/context/settingsContext' // Import SettingsProvider and SettingsConsumer

// Import ThemeComponent
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Cookies
import Cookies from 'js-cookie'

// ** MUI
import { Skeleton } from '@mui/material'
import FullPageSkeleton from 'src/views/FullPageSkeleton'

const withAuth = WrappedComponent => {
  const AuthComponent = props => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [theme, setTheme] = useState({})
    const [isLoading, setIsLoading] = useState(true) // เพิ่ม isLoading state

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
        } finally {
          setIsLoading(false) // เมื่อตรวจสอบเสร็จสิ้นแล้วตั้งค่า isLoading เป็น false
        }
      }

      checkAuth()

      const storedTheme = JSON.parse(localStorage.getItem('theme'))
      setTheme(storedTheme || {})
    }, [router, router.pathname])

    if (isLoading) {
      // แสดง FullPageSkeleton ในระหว่างที่กำลังโหลด
      return <FullPageSkeleton />
    }

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
