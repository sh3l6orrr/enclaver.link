'use client'

import './global.css'
import { useAppStore } from "@/store"
import { getUsername } from './actions.js'
import { useEffect } from "react"
import AlertBanner from './Alertbanner.jsx'
import LoadingBar from './LoadingBar.jsx'

export default function SideEffects({ children }) {
  const { setLoggedUser, setAlertMessage, setShowAlertBanner, setToken, showAlertBanner, showLoadingBar } = useAppStore()
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

    window.alert = (success, msg) => {
      setAlertMessage({ success, msg });
      setShowAlertBanner(true);
    }
  }, [setAlertMessage, setLoggedUser, setShowAlertBanner, setToken])

  return <>
    {children}
    {showLoadingBar && <LoadingBar />}
    {showAlertBanner && <AlertBanner />}
  </>
}