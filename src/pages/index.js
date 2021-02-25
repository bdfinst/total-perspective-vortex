import { Container, Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { ValueStreamProvider } from '../appContext/valueStreamContext'
import Header from '../components/Header'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import ValueStreamMap from '../components/ValueStreamMap'

const useStyles = makeStyles((theme) => ({
  container: {
    background: 'green',
  },
}))

export default function Home() {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    // <Container className={classes.container}>
    //   <Header />
    //   <ValueStreamProvider>
    //     <Grid container>
    //       <Grid item xs={12} md={10}>
    //         <ValueStreamMap />
    //       </Grid>
    //       <Grid item xs={12} md={2}>
    //         <Sidebar />
    //       </Grid>
    //     </Grid>
    //   </ValueStreamProvider>
    // </Container>
    <Main />
  )
}
