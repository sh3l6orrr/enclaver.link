'use client'

import Link from 'next/link'
import React from 'react'
import { Space } from './util.jsx'
import { useStore } from './store.js'


export default function NavBar() {
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const setShowCreatePostModal = useStore(state => state.setShowCreatePostModal)
  const loggedUser = useStore(state => state.loggedUser)
  return <>
    <nav>
      <div id="navbar">
        <Space w="2rem" />
        <div className='horizontal justify-content-space-between' style={{ width: "100%" }}>
          <Link href="/">
            ✦
          </Link>
          <button onClick={loggedUser ? () => setShowCreatePostModal(true) : () => setShowSignInModal(true)}
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