import Head from 'next/head'
import VSMFlow from '../components/VSMFlow'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Value Stream Map</title>
      </Head>

      <main className={styles.main}>
        <VSMFlow />
      </main>

      <footer className={styles.footer}>Totals</footer>
    </div>
  )
}
