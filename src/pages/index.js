import { Container } from '@material-ui/core'

import { ValueStreamProvider } from '../appContext/valueStreamContext'
import ValueStreamMap from '../components/ValueStreamMap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Container>
      <main className={styles.main}>
        <ValueStreamProvider>
          <ValueStreamMap />
        </ValueStreamProvider>
      </main>
    </Container>
  )
}
