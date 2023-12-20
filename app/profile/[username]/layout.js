'use client'

import { Dropdown, Filler, Modal, Space } from "../../../src/util.jsx"
import React, { useState } from "react"
import { useStore } from "../../../src/store.js"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { getProfile, updateProfile } from "./actions.js"

export default function Profile({ params, children }) {
  const token = localStorage.getItem('token')
  const [profile, setProfile] = useState(null)
  const loggedUser = useStore(state => state.loggedUser)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const profile = await getProfile(params.username)
      setProfile(profile)
    }
    fetchData()
  }, [])

  function ProfileDropdown() {
    return <>
      <Dropdown hideDropdownCallback={() => setShowProfileDropdown(false)}>
        <div onClick={() => {
          setShowEditProfileModal(true)
          setShowProfileDropdown(false)
        }}>⛄︎ Update Profile </div>
        <div onClick={() => {
          setShowChangePasswordModal(true)
          setShowProfileDropdown(false)
        }}>🗝️ Reset password </div>
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
      const { ok, msg } = await updateProfile(token, loggedUser, formData)
      alert(ok, msg)
      setShowEditProfileModal(false)
    };
    return <>
      <Modal hideModalCallback={() => setShowEditProfileModal(false)}>
        <form onSubmit={handleSubmit}>
          <div style={{ width: "25rem" }}>
            <div className="horizontal align-items-center">
              Nickname <Filler /><input value={nickname} onChange={e=>setNickname(e.target.value)} style={{ width: "10rem" }} required />
            </div>
            <Space h="0.5rem" />
            <div className="horizontal align-items-center">
              Bio <Filler /><input value={bio} onChange={e=>setBio(e.target.value)} style={{ width: "22rem" }} required />
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
  function ChangePasswordModal() {
    return <>
      <Modal hideModalCallback={() => setShowChangePasswordModal(false)}>
        <form method="put" onSubmit={() => setShowChangePasswordModal(false)}>
          New Password: <input type="password" name="password" required />
          <Space h="0.5rem" />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  }

  return profile && <>
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
      <button onClick={() => { router.push(`/profile/${params.username}`) }}>Posts</button>
      <Space w="0.5rem" />
      <button onClick={() => { router.push(`/profile/${params.username}/comments`) }} >Comments</button>
      <Filler />
    </div>
    <Space h="1rem" />
    {children}
    {showEditProfileModal && <EditProfileModal />}
    {showChangePasswordModal && <ChangePasswordModal />}
  </>
}