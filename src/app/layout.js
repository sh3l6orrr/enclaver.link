
import SideEffects from './SideEffects'
import './global.css'

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }) {

  return <>
    <html lang="en">
      <body>
        <SideEffects>
          {children}
        </SideEffects>
      </body>
    </html>
  </>
}