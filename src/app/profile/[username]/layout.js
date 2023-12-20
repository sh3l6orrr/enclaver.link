'use client'

import { Dropdown, Filler, Modal, Space } from "../../util.jsx"
import React, { useState } from "react"
import { useStore } from "../../store"
import url from "../../url.js"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"

export default function Profile({ params, children }) {
  const [profile, setProfile] = useState(null)
  const loggedUser = useStore(state => state.loggedUser)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url + `/profile/${params.username}`)
      const profile = await res.json()
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
    return <>
      <Modal hideModalCallback={() => setShowEditProfileModal(false)}>
        <form method="put" onSubmit={() => setShowEditProfileModal(false)}>
          <div style={{ width: "25rem" }}>
            <div className="horizontal align-items-center">
              Nickname <Filler /><input name="nickname" style={{ width: "10rem" }} defaultValue={profile.nickname} required />
            </div>
            <Space h="0.5rem" />
            <div className="horizontal align-items-center">
              Bio <Filler /><input name="bio" style={{ width: "22rem" }} defaultValue={profile.bio} required />
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
      <b>{profile.nickname}</b>@{profile.loggedUser}
      <Filler />
      <div>
        {loggedUser === profile.loggedUser && <div style={{ cursor: "pointer" }} onClick={() => setShowProfileDropdown(true)}>◎</div>}
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



// export async function action({ request, params }) {
//   const data = await request.formData()
//   switch (request.method) {
//     case "PUT" : {
//       const response = await updateProfile(params.username, data);
//       alert({ message: await response.text(), status: response.ok })
//       return json(null)
//     }
//   }
// }

// async function updateProfile(username, data) {
//   const headers = new Headers();
//   headers.append('Authorization', `Bearer ${ localStorage.getItem('token') }`)
//   const requestOptions = {
//     method: 'PUT',
//     headers: headers,
//     body: new URLSearchParams(data),
//   };
//   return await fetch(url + `/profile/${ username }`, requestOptions)
// }