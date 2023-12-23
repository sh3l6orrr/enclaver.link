import React, { useState } from "react"
import { Space, Filler, Modal } from "@/util.jsx"
import { commentItem } from "./actions.js"
import { useAppStore } from "@/store.js"
import { useRouter } from "next/navigation"

export default function CommentModal({ id, setShowCommentModal }) {

  const token = useAppStore(state => state.token)


  const router = useRouter()
  const [content, setContent] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData()
    data.append('content', content)
    const { success, msg, newId } = await commentItem(token, id, data)
    setShowCommentModal(false)
    alert(success, msg)
    router.push(`/item/${newId}`)
  };
  return <>
    <Modal hideModalCallback={() => setShowCommentModal(false)}>
      <h2>Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Leave a comment..." required />
        <Space h="0.5rem" />
        <div className="horizontal">
          <button type='button' onClick={() => setShowCommentModal(false)}>Cancel</button>
          <Filler />
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal >
  </>
}