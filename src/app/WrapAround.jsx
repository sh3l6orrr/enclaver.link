'use client'

import './wraparound.css'
import React, { useEffect, useRef, useState } from "react"
import Header from './Header.jsx'
import NavBar from './NavBar.jsx'
import Sidebar from './Sidebar.jsx'
import { Filler, Space, Modal, useClickOutside } from './util.jsx';
import url from "./url.js"
import { useStore } from "./store.js"


export default function WrapAround({ children }) {
  const showSignInModal = useStore(state => state.showSignInModal)
  const setShowSignInModal = useStore(state => state.setShowSignInModal)
  const showSignUpModal = useStore(state => state.showSignUpModal)
  const setShowSignUpModal = useStore(state => state.setShowSignUpModal)
  const setLoggedUser = useStore(state => state.setLoggedUser)
  const showCreatePostModal = useStore(state => state.showCreatePostModal)
  const setShowCreatePostModal = useStore(state => state.setShowCreatePostModal)
  const alertMessage = useStore(state => state.alertMessage)
  const setAlertMessage = useStore(state => state.setAlertMessage)
  const showAlertBanner = useStore(state => state.showAlertBanner)
  const setShowAlertBanner = useStore(state => state.setShowAlertBanner)

  useEffect(() => {
    AutoLogIn()
    window.alert = (status, message) => {
      setAlertMessage({ status, message });
      setShowAlertBanner(true);
    }
  }, [])

  async function AutoLogIn() {
    const token = localStorage.getItem('token')
    if (!token) return
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const response = await fetch(url + '/username', {
      method: 'GET',
      headers: headers
    })
    if (response.ok) {
      const username = await response.text()
      setLoggedUser(username)
    }
    return 0
  }

  function AlertBanner() {
    const ref = useRef(null)
    useClickOutside(ref, () => setShowAlertBanner(false))

    return <>
      <div ref={ref} className="alert-banner" style={{ borderColor: alertMessage.status ? 'green' : 'red' }} onClick={() => setShowAlertBanner(false)}>
        <span>{alertMessage.message} </span>
      </div>
    </>
  }
  function CreatePostModal() {
    return <>
      <Modal hideModalCallback={() => setShowCreatePostModal(false)}>
        <h2> New post </h2>
        <form method="post" action="/" onSubmit={() => setShowCreatePostModal(false)}>
          <textarea name="content" placeholder="Content..." required />
          <Space h="0.6rem" />
          <div className="horizontal">
            <button type='button' onClick={() => setShowCreatePostModal(false)}>Cancel</button>
            <Filler />
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    </>
  }
  function SignModal({ signUp }) {
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
      alert(true, 'Signed in successfully.')
      setShowSignInModal(false)
    };
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

  return <>
    <Header />
    <NavBar />
    <Sidebar />
    <main>

      {children}
    </main>
    {showAlertBanner && <AlertBanner />}
    {showCreatePostModal && <CreatePostModal />}
    {showSignInModal && <SignModal />}
    {showSignUpModal && <SignModal signUp={true} />}
  </>
}