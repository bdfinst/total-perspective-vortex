import '../styles/globals.css'
import '../styles/vsm.css'
import '../styles/edges.css'
import { ValueStreamProvider } from '../appContext/valueStreamContext'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ValueStreamProvider>
      <Component {...pageProps} />
    </ValueStreamProvider>
  )
}

export default MyApp
