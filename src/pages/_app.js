import { ThemeProvider } from '@material-ui/core/styles'
import { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'

import '../styles/globals.css'
import '../styles/vsm.css'
import '../styles/edges.css'
import theme from '../theme'

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Total Perspective Vortex</title>
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
