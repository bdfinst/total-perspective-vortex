import '../styles/globals.css'
import '../styles/vsm.css'
import AppContext from '../components/AppContext'

function MyApp({ Component, pageProps }) {
  return (
    <AppContext.Provider>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
