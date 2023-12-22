


import styles from './styles.module.css'

export default function RootLayout({ children }) {
  return <> 
    <div className={styles.centralize}>
      <div className={styles.content}>
        <div>
          {children}
        </div>
      </div>
    </div>

  </>
}
