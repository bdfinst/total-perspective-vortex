import '../styles/globals.css'
import '../styles/vsm.css'
import { VSMProvider } from '../reactContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <VSMProvider>
      <Component {...pageProps} />
    </VSMProvider>
  )
}

export default MyApp
