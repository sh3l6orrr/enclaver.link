import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div >
      <h1>There&apos;s nothing here.</h1>
      <Link href="/">➣ Go back to home page</Link>
    </div>
  )
}