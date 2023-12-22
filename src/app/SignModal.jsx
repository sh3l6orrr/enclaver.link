import React, { useState } from "react"
import { Filler, Space, Modal } from '../util.jsx';
import { useStore } from "../store.js"
import { signIn, signUp } from "./actions.js";


export default function SignModal({ up }) {
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const setShowSignUpModal = useStore(state => state.setShowSignUpModal)
  const setLoggedUser = useStore(state => state.setLoggedUser)
  const setToken = useStore(state => state.setToken)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
    if (up) {
      const { success, msg } = await signUp(formData)
      alert(success, msg)
      if (!success) return
      setShowSignUpModal(true)
      setShowSignInModal(false)
      return
    }
    const { success, msg, token } = await signIn(formData)
    alert(success, msg)
    if (!success) return 

    localStorage.setItem('token', token)
    setLoggedUser(username)
    setToken(token)
    setShowSignInModal(false)
  }
  return <>
    <Modal hideModalCallback={() => { up ? setShowSignUpModal(false) : setShowSignInModal(false) }}>
      <h2>{up ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ width: "19rem" }}>
          <div className='horizontal align-items-center'>
            Username: <Filler /><input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <Space h="0.5rem" />
          <div className='horizontal align-items-center'>
            Password: <Filler /> <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>

        <Space h="1rem" />
        <div className='horizontal'>
          <button type="button" style={{ fontSize: "medium" }} onClick={() => {
            setShowSignInModal(up ? true : false)
            setShowSignUpModal(up ? false : true)
          }}> {up ? "Already signed up?" : "Not signed up yet?"}
          </button>
          <Filler />
          <button type="submit">Submit</button>
        </div>
      </form>
    </Modal>
  </>
}