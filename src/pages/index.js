import { Container, Grid } from '@material-ui/core'
import React from 'react'

import { ValueStreamProvider } from '../appContext/valueStreamContext'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import ValueStreamMap from '../components/ValueStreamMap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Container>
      <Header />
      {/* <main className={styles.main}> */}
      <ValueStreamProvider>
        <Grid container>
          <Grid item xs={12} md={10}>
            <ValueStreamMap />
          </Grid>
          <Grid item xs={12} md={2}>
            <Sidebar />
          </Grid>
        </Grid>
      </ValueStreamProvider>
      {/* </main> */}
    </Container>
  )
}
