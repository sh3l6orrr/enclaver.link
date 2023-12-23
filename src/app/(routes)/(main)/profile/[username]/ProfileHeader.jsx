'use client'

import { Dropdown, Filler, Modal, Space } from "@/util.jsx"
import React, { useState } from "react"
import { useAppStore } from "@/store.js"
import { useRouter } from 'next/navigation'
import { updateProfile } from "./actions.js"

export default function ProfileHeader({ profile }) {
  const token = useAppStore(state => state.token)
  const loggedUser = useAppStore(state => state.loggedUser)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const router = useRouter()


  function ProfileDropdown() {
    return <>
      <Dropdown hideDropdownCallback={() => setShowProfileDropdown(false)}>
        <div onClick={() => {
          setShowEditProfileModal(true)
          setShowProfileDropdown(false)
        }}>⛄︎ Update Profile </div>

      </Dropdown >
    </>
  }
  function EditProfileModal() {
    const [nickname, setNickname] = useState(profile.nickname)
    const [bio, setBio] = useState(profile.bio)
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData()
      formData.append('nickname', nickname)
      formData.append('bio', bio)
      const { success, msg } = await updateProfile(token, formData)
      setShowEditProfileModal(false)
      router.refresh()
      alert(success, msg)
    };
    return <>
      <Modal hideModalCallback={() => setShowEditProfileModal(false)}>
        <form onSubmit={handleSubmit}>
          <div style={{ width: "25rem" }}>
            <div className="horizontal align-items-center">
              Nickname <Filler /><input value={nickname} onChange={e => setNickname(e.target.value)} style={{ width: "10rem" }} required />
            </div>
            <Space h="0.5rem" />
            <div className="horizontal align-items-center">
              Bio <Filler /><input value={bio} onChange={e => setBio(e.target.value)} style={{ width: "22rem" }} required />
            </div>
          </div>

          <Space h="1rem" />
          <div className="horizontal">
            <button type='button' onClick={() => setShowEditProfileModal(false)}>Cancel</button>
            <Filler />
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    </>
  }

  return <>
    <div className="horizontal">
      <b>{profile.nickname}</b>@{profile.username}
      <Filler />
      <div>
        {loggedUser === profile.username && <div style={{ cursor: "pointer" }} onClick={() => setShowProfileDropdown(true)}>◎</div>}
        {showProfileDropdown && <ProfileDropdown />}
      </div>
    </div>
    <Space h="0.3rem" />
    {profile.bio ?? <i>No bio yet.</i>}
    <Space h="0.3rem" />
    <div title="Enclaver points">✦ {profile.pts}</div>


    <Space h="1rem" />
    <div className="horizontal align-items-center">
      <button onClick={() => { router.push(`/profile/${profile.username}`) }}>Posts</button>
      <Space w="0.5rem" />
      <button onClick={() => { router.push(`/profile/${profile.username}/comments`) }} >Comments</button>
      <Filler />
    </div>


    {showEditProfileModal && <EditProfileModal />}

  </>
}