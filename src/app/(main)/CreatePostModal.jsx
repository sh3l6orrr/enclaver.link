import React, { useState } from "react"

import { Filler, Space, Modal } from '../../util.jsx';

import { useAppStore } from "../../store.js"
import { createPost } from './actions.js'
import { useRouter } from "next/navigation";

export default function CreatePostModal() {
  const setShowCreatePostModal = useAppStore(state => state.setShowCreatePostModal)
  const [content, setContent] = useState('')
const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append('content', content)
    const { success, msg, newId } = await createPost(localStorage.getItem('token'), formData)
    setShowCreatePostModal(false)
    alert(success, msg)
    router.push(`/item/${newId}`)
  };
  return <>
    <Modal hideModalCallback={() => setShowCreatePostModal(false)}>
      <h2> New post </h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content..." required />
        <Space h="0.6rem" />
        <div className="horizontal">
          <button type='button' onClick={() => setShowCreatePostModal(false)}>Cancel</button>
          <Filler />
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal>
  </>
}