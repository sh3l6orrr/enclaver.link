'use client'
import React, { useEffect } from "react"
import Header from './Header.jsx'
import NavBar from './NavBar.jsx'
import Sidebar from './Sidebar.jsx'
import AlertBanner from './Alertbanner.jsx'
import CreatePostModal from './CreatePostModal.jsx'
import SignModal from './SignModal.jsx'
import LoadingBar from './LoadingBar.jsx'
import { getUsername } from './actions.js'
import { useStore } from "../store.js"

export default function Wrap({ children }) {
  const showSignInModal = useStore(state => state.showSignInModal)
  const showSignUpModal = useStore(state => state.showSignUpModal)

  const setLoggedUser = useStore(state => state.setLoggedUser)
  const showCreatePostModal = useStore(state => state.showCreatePostModal)
  const setAlertMessage = useStore(state => state.setAlertMessage)
  const showAlertBanner = useStore(state => state.showAlertBanner)
  const setShowAlertBanner = useStore(state => state.setShowAlertBanner)
  const setToken = useStore(state => state.setToken)
  const showLoadingBar = useStore(state => state.showLoadingBar)

  useEffect(() => {
    async function autoLogIn() {
      const token = localStorage.getItem('token')
      if (!token) return
      const username = await getUsername(token)
      if (username) {
        setLoggedUser(username)
        setToken(token)
      }
    }
    autoLogIn()

    window.alert = (ok, msg) => {
      setAlertMessage({ ok, msg });
      setShowAlertBanner(true);
    }
  }, [setAlertMessage, setLoggedUser, setShowAlertBanner, setToken])

  return <>
    <Header />
    <NavBar />
    <Sidebar />
    <main>

      {children}
    </main>

    {showCreatePostModal && <CreatePostModal />}
    {showSignInModal && <SignModal />}
    {showSignUpModal && <SignModal up={true} />}
    {showLoadingBar && <LoadingBar />}
    {showAlertBanner && <AlertBanner />}
  </>
}