'use client'
import { useState } from "react"
import { Modal, Space } from "../../../util"
import { changePassword } from "./actions"
import { useAppStore } from "../../../store"

export default function Page() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const token = useAppStore(state => state.token)

  function ChangePasswordModal() {
    const [pwd, setPwd] = useState('')
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData()
      formData.append('password', pwd)
      const { success, msg } = await changePassword(token, formData)
      setShowChangePasswordModal(false)
      alert(success, msg)
    };
    return <>
      <Modal hideModalCallback={() => setShowChangePasswordModal(false)}>
        <form onSubmit={handleSubmit}>
          New Password: <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required />
          <Space h="0.5rem" />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  }
  return <>
    <h1>Settings</h1>
    <button onClick={() => {
      setShowChangePasswordModal(true)
    }}>🗝️  Change Password</button>
    <button>Delete Account</button>
    {showChangePasswordModal && <ChangePasswordModal />}
  </>
}