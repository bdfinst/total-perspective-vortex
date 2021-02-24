import { Container } from '@material-ui/core'
import React from 'react'

import { ValueStreamProvider } from '../appContext/valueStreamContext'
import Header from '../components/Header'
import ValueStreamMap from '../components/ValueStreamMap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Container>
      <Header />
      {/* <main className={styles.main}> */}
      <ValueStreamProvider>
        <ValueStreamMap />
      </ValueStreamProvider>
      {/* </main> */}
    </Container>
  )
}
