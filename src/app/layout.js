import '../index.css'
import React from "react"
import WrapAround from '../components/wraparound/WrapAround.jsx'

export const metadata = {
  title: 'Enclaver',
  content: 'The social platform for minimalists.'
}
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
        <WrapAround>
          {children}
        </WrapAround>
      </body>
    </html>
  </>
}