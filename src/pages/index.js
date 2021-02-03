import ValueStreamMap from '../components/ValueStreamMap'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ValueStreamMap />
      </main>
    </div>
  )
}
