'use client'
import React from "react"
import Header from './Header.jsx'
import NavBar from './NavBar.jsx'
import Sidebar from './Sidebar.jsx'

import CreatePostModal from './CreatePostModal.jsx'

import { useAppStore } from "../../store.js"

export default function Layout({ children }) {
  const showCreatePostModal = useAppStore(state => state.showCreatePostModal)
  return <>
    <Header />
    <NavBar />
    <Sidebar />
    <div id='position-main'>
        <main>
          {children}
        </main>
      </div>

    {showCreatePostModal && <CreatePostModal />}
  </>
}