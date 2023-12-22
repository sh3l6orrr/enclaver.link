'use client'

import Link from 'next/link'
import React from 'react'
import { Space } from '../../../util.jsx'
import { useAppStore } from '../../../store.js'
import { useRouter } from 'next/navigation'


export default function NavBar() {
  const router = useRouter()
  const setShowCreatePostModal = useAppStore(state => state.setShowCreatePostModal)
  const loggedUser = useAppStore(state => state.loggedUser)
  return <>
    <nav>
      <div id="navbar">
        <Space w="2rem" />
        <div className='horizontal justify-content-space-between' style={{ width: "100%" }}>
          <Link href="/">
            ✦
          </Link>
          <button onClick={loggedUser ? () => setShowCreatePostModal(true) : () => router.push('/signin')}
            style={{ color: "dodgerblue", width: "2.5rem", height: "2.5rem", borderRadius: "45%" }}>✚</button>
          <Link href="/notifications" >
            ✽
          </Link>
        </div>
        <Space w="2rem" />
      </div>
    </nav>
  </>
}