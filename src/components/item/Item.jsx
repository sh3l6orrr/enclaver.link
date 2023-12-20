'use client'

import './item.css'
import React, { useState } from "react"
import { Space, Seperator, Filler, Modal, Dropdown } from "../../util.jsx"
import Link from 'next/link'
import { useStore } from "../../store.js"
import { useRouter } from 'next/navigation'
import { commentItem, deleteItem, likeItem, updateItem } from "./item.js"

export default function Item({ item, isPost }) {
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const token = useStore(state => state.token)
  const loggedUser = useStore(state => state.loggedUser)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] = useState(false)

  const router = useRouter()

  function CommentModal() {
    const [content, setContent] = useState('')

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData()
      data.append('content', content)
      const { ok, msg } = await commentItem(token, item.id, data)
      alert(ok, msg)
      setShowCommentModal(false);
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
  function EditModal() {
    const [content, setContent] = useState(item.content)

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData()
      data.append('content', content)
      const { ok, msg } = await updateItem(token, item.id, data)
      alert(ok, msg)
      setShowEditModal(false);
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
  function ReportButton() {
    return <div> ⚐ Report </div>
  }
  function DeleteButton() {
    return <div onClick={(event) => {
      event.stopPropagation()
      setShowDropdown(false)
      setShowConfirmDeletionModal(true)
    }}>✕ Delete</div>
  }
  function EditButton() {
    return <div onClick={(event) => {
      event.stopPropagation()
      setShowEditModal(true)
      setShowDropdown(false)
    }}>⌖ Edit</div>
  }
  function ConfirmDeletionModal() {
    async function handleDelete() {
      const { ok, msg } = await deleteItem(token, item.id)
      alert(ok, msg)
      setShowConfirmDeletionModal(false)
    }
    return <>
      <Modal hideModalCallback={() => setShowConfirmDeletionModal(false)}>
        <h2>Are you sure?</h2>
        <div className="horizontal">
          <button onClick={() => setShowConfirmDeletionModal(false)}>Cancel</button>
          <Space w="1.5rem" />
          <button onClick={handleDelete}>Yes, delete.</button>
        </div>
      </Modal>
    </>
  }
  function ItemDropdown() {
    return <>
      <Dropdown hideDropdownCallback={() => setShowDropdown(false)}>
        {(loggedUser === item.username || loggedUser === 'admin') && <>
          <DeleteButton />
          <EditButton />
        </>}
        <ReportButton />
      </Dropdown>
    </>
  }
  function LikeButton() {
    const handleLikeClick = async (event) => {
      event.stopPropagation();

      if (!loggedUser) {
        setShowSignInModal(true);
        return;
      }
      const { ok, msg } = await likeItem(token, item.id);
      alert(ok, msg)
    }
    return <div className="item-button" onClick={handleLikeClick}>
      {item.liked_by.includes(loggedUser) ? '♥' : '♡'} Like {item.likes}
    </div>
  }

  function CommentButton() {
    return <div className="item-button" onClick={(event) => {
      event.stopPropagation()
      if (!loggedUser) {
        setShowSignInModal(true)
        return
      }
      setShowCommentModal(true)
    }}> ✎ Comment {item.comment_cnt}</div>
  }

  return <>
    <div className={isPost ? null : "item"} >
      <Space h="1rem" />
      <div style={{ margin: "0 1rem" }} onClick={() => { isPost ? null : router.push(`/item/${item.id}`) }}>
        <div className="horizontal">
          <Link href={`/profile/${item.username}`} onClick={(event) => event.stopPropagation()}>
            <b>{item.username}</b>
          </Link>, {item.time_created.split(' ')[0]}
          <Filler />
          <div>
            <div style={{ cursor: "pointer" }} onClick={(event) => {
              event.stopPropagation()
              setShowDropdown(true)
            }}>◎</div>
            {showDropdown && <ItemDropdown />}
          </div>
        </div>

        <Space h="1rem" />
        <div style={isPost ? { whiteSpace: "pre-line" } :
          { whiteSpace: "pre-line", maxHeight: "5.8rem", overflow: "hidden" }}>
          {isPost ? item.content : item.content.slice(0, 260)}</div>
        {item.content.length > 260 && !isPost ? <i style={{ color: "steelblue", cursor: "pointer" }}>Show More</i> : null}
      </div>
      <Space h="1rem" />
      <Seperator />
      <div style={{ margin: "0 1rem" }}>
        <LikeButton />
        <CommentButton />
      </div>
      <Seperator />
    </div>
    {showCommentModal && <CommentModal />}
    {showEditModal && <EditModal />}
    {showConfirmDeletionModal && <ConfirmDeletionModal />}

  </>
}