export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}
import { Analytics } from '@vercel/analytics/react';
export default function RootLayout({ children }) {

  return <>
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  </>
}