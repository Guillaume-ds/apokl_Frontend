import { useEffect } from 'react'
import { AuthenticationProvider } from '../../context/AuthenticationContext'
import styles from '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
  <AuthenticationProvider>
    <Component {...pageProps} />
  </AuthenticationProvider>
  )}

export default MyApp
