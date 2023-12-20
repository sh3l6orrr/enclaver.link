import React from 'react';
import { Space } from '../util.jsx';
import Link from 'next/link'
import { useStore } from '../store.js';

export default function Sidebar() {
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const setShowCreatePostModal = useStore(state => state.setShowCreatePostModal)
  const loggedUser = useStore(state => state.loggedUser)
  function AddButton() {
    return <button onClick={loggedUser ? () => setShowCreatePostModal(true) : ()=> setShowSignInModal(true)}  style={{ color: "dodgerblue" }}> ✚ New Post </button>
  }
  function LatestButton() {
    return <Link href='/'> <button>✦ Latest</button></Link>
  }
  function RecommendedButton() {
    return <Link href='/recommended'><button>✦ Recommended</button></Link>
  }

  return <>
    <aside>
      <AddButton />
      <Space h="0.5rem" />
      <LatestButton />
      <Space h="0.5rem" />
      <RecommendedButton />
    </aside>
  </>
}