import React, { useState } from "react"
import { Space, Filler, Modal } from "../../util.jsx"
import { updateItem } from "./actions.js"
import { useAppStore } from "../../store.js"
import { useRouter } from "next/navigation"

export default function EditModal({ id, defaultContent, setShowEditModal }) {
  const token = useAppStore(state => state.token)

  const router = useRouter()
  const [content, setContent] = useState(defaultContent)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData()
    data.append('content', content)
    const { success, msg } = await updateItem(token, id, data)
    setShowEditModal(false)
    alert(success, msg)
    router.refresh()

  };
  return <>
    <Modal hideModalCallback={() => setShowEditModal(false)}>
      <h2>Edit</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content..." required />
        <Space h="0.5rem" />
        <div className="horizontal">
          <button type='button' onClick={() => setShowEditModal(false)}>Cancel</button>
          <Filler />
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal>
  </>
}