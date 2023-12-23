'use client'
import { useState } from "react"
import { Filler, Modal, Space } from "@/util"
import { changePassword } from "./actions"
import { useAppStore } from "@/store"

export default function Page() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const token = useAppStore(state => state.token)

  function ChangePasswordModal() {
    const [pwd, setPwd] = useState('')
    const [pwd2, setPwd2] = useState('')
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (pwd !== pwd2) {
        alert(false, 'Passwords do not match.')
        return
      }
      const formData = new FormData()
      formData.append('password', pwd)
      const { success, msg } = await changePassword(token, formData)
      setShowChangePasswordModal(false)
      alert(success, msg)
    };
    return <>
      <Modal hideModalCallback={() => setShowChangePasswordModal(false)}>
        <form onSubmit={handleSubmit} >
          <div className='horizontal align-items-center'>
            New Password: <Filler /><Space w='1rem'/><input type="password" value={pwd} onChange={e => setPwd(e.target.value)} required />
          </div>
          <Space h='0.5rem'/>
          <div className='horizontal align-items-center'>
            Re-enter: <Filler /><input type="password" value={pwd2} onChange={e => setPwd2(e.target.value)} required />
          </div>
          <Space h="0.5rem" />
          <div className='horizontal align-items-center'>
            <Filler /><button type="submit">Submit</button>
          </div>

        </form>
      </Modal>
    </>
  }
  return <>
    <h1>Settings</h1>
    <div className="vertical">
      <button onClick={() => {
        setShowChangePasswordModal(true)
      }}>
        🗝️  Change Password
      </button>
      <Space h='1rem' />
      <button>
        ❌ Delete Account
      </button>
    </div>

    {showChangePasswordModal && <ChangePasswordModal />}
  </>
}