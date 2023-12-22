

import Image from 'next/image'
import styles from './styles.module.css'

export default function RootLayout({ children }) {
  return <> 
    <div className={styles.centralize}>
      <div className={styles.content}>
        <Image src='/logo.png' alt='1' width={100} height={100}></Image>
        <div>
          {children}
        </div>
      </div>
    </div>

  </>
}
