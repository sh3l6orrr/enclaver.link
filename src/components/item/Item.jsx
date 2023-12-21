'use client'

import './item.css'
import React, { useState } from "react"
import { Space, Seperator, Filler, Dropdown } from "../../util.jsx"
import Link from 'next/link'
import { useStore } from "../../store.js"
import { useRouter } from 'next/navigation'
import LikeButton from './LikeButton.jsx'
import CommentModal from './CommentModal.jsx'
import EditModal from './EditModal.jsx'
import ConfirmDeletionModal from './ConfirmDeletionModal.jsx'

export default function Item({ item, isPost }) {

  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const loggedUser = useStore(state => state.loggedUser)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] = useState(false)
  const router = useRouter()

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
  function ItemHeader() {
    return <>
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
    </>
  }
  function ItemContent({ content, isPost }) {
    return <>
      <div style={isPost ? { whiteSpace: "pre-line" } :
        { overflow: "hidden", maxHeight: '4.56rem' }}>
        {content}</div>
      {content.split(' ').length > 50 && !isPost && <i style={{ color: "steelblue", cursor: "pointer" }}>Show More</i>}
    </>
  }
  function ToolBar() {
    return <>
      <Seperator />
      <div style={{ margin: "0 1rem" }}>
        <LikeButton item={item} />
        <CommentButton />
      </div>
      <Seperator />
    </>
  }
  return <>
    <div className={isPost ? null : "item"} >
      <Space h="1rem" />
      <div style={{ margin: "0 1rem" }} onClick={() => { isPost ? null : router.push(`/item/${item.id}`) }}>
        <ItemHeader />
        <Space h="1rem" />
        <ItemContent content={item.content} isPost={isPost} />
      </div>
      <Space h="1rem" />
      <ToolBar />
    </div>
    {showCommentModal && <CommentModal id={item.id} setShowCommentModal={setShowCommentModal} />}
    {showEditModal && <EditModal id={item.id} defaultContent={item.content} setShowEditModal={setShowEditModal} />}
    {showConfirmDeletionModal && <ConfirmDeletionModal id={item.id} setShowConfirmDeletionModal={setShowConfirmDeletionModal} />}
  </>
}