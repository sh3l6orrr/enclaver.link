import React, { useState } from "react"
import { Filler, Space, Modal } from '../util.jsx';
import url from "../url.js"
import { useStore } from "../store.js"


export default function SignModal({ signUp }) {
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const setShowSignUpModal = useStore(state => state.setShowSignUpModal)
  const setLoggedUser = useStore(state => state.setLoggedUser)
  const setToken = useStore(state => state.setToken)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData();
    data.append('username', username)
    data.append('password', password)
    if (signUp) {
      const res = await fetch(url + '/signup', {
        method: 'POST',
        body: data
      })
      if (!res.ok) { alert(false, await res.text()); return }
      alert(true, 'Signed up successfully, jumping to sign in.')
      setShowSignUpModal(true)
      setShowSignInModal(false)
      return
    }
    const res = await fetch(url + '/signin', {
      method: 'POST',
      body: data
    })

    if (!res.ok) { alert(false, await res.text()); return }
    const token = await res.text()
    localStorage.setItem('token', token)
    setLoggedUser(username)
    setToken(token)
    alert(true, 'Signed in successfully.')
    setShowSignInModal(false)
  }
  return <>
  <Modal hideModalCallback={() => { signUp ? setShowSignUpModal(false) : setShowSignInModal(false) }}>
    <h2>{signUp ? "Sign Up" : "Sign In"}</h2>
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
          setShowSignInModal(signUp ? true : false)
          setShowSignUpModal(signUp ? false : true)
        }}> {signUp ? "Already signed up?" : "Not signed up yet?"}
        </button>
        <Filler />
        <button type="submit">Submit</button>
      </div>
    </form>
  </Modal>
</>
}