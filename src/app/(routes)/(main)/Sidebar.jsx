import React from 'react';
import { Space } from '@/util.jsx';
import Link from 'next/link'
import { useAppStore } from '@/store.js';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { setShowCreatePostModal, loggedUser } = useAppStore()
  const router = useRouter()
  function AddButton() {
    return <button onClick={loggedUser ? () => setShowCreatePostModal(true) : () => router.push('/signin')} style={{ color: "dodgerblue" }}>
      ✚ New Post
    </button>
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