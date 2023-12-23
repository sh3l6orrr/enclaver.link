

import Image from 'next/image'
import styles from './styles.module.css'
import Link from 'next/link'
import { Space } from '@/util'

export async function generateMetadata() {
  return {
    title: `Sign In`
  }
}

export default function RootLayout({ children }) {
  return <>
    <div className={styles.centralize}>
      <div className={styles.content}>
        <Link href='/' className={styles.left}>
          <Image className='light-mode' src='/logo-white.png' alt='1' width={200} height={200} priority />
          <Image className='dark-mode' src='/logo-black.png' alt='1' width={200} height={200} priority />
          <h1 className={styles.title}>Enclaver</h1>
        </Link>
        <Space w='65px' />
        <Space h='0px' />
        <div className={styles.form} >
          {children}

        </div>
      </div>
    </div>

  </>
}
