'use client'

import './style.css'
import Item from "@/components/item/Item.jsx"
import { Seperator, Space } from "@/util.jsx"
import { useAppStore } from "@/store.js"
import { useState } from "react"
import { useEffect } from "react"
import { getNotifs, readAllNotifs } from './actions.js'

export default function Notifications() {
  const token = useAppStore(state => state.token)
  const loggedUser = useAppStore(state => state.loggedUser)
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    if (!loggedUser) return
    async function fetchData() {
      const notifications = await getNotifs(token)
      setNotifications(notifications)
    }
    fetchData()
  }, [loggedUser, token])

  function DeletedItem() {
    return <div className="comment-item" >
      <Space h="1rem" />
      <div style={{ margin: "0 1rem" }}>
        This comment was deleted and no longer available.
      </div>
      <Space h="1rem" />
      <Seperator />
    </div>
  }
  function NoNotificationsSign() {
    return <div>
      <h1>Notifications</h1>
      You must be signed in to view notifications.
    </div>
  }
  function LoadingNotificationsSign() {
    return <div>
      <h1>Notifications</h1>
      Loading...
    </div>
  }
  function ReadAllButtion() {
    async function handleClick() {
      const { success, msg } = await readAllNotifs(token)
      alert(success, msg)
    }
    return <button onClick={handleClick}>Read all Notifications</button>
  }
  return loggedUser ? notifications ? <>
    <h1>Notifications</h1>
    <ReadAllButtion />
    <Space h="1rem" />
    <Seperator />
    {notifications.map((notification) =>
      <div key={notification.id} style={{ position: "relative" }}>
        <div className="unread-badge" />
        {notification.content
          ? <Item item={notification.content} loggedUser={loggedUser} />
          : <DeletedItem />
        }
      </div>
    )}

  </> : <LoadingNotificationsSign /> : <NoNotificationsSign />
}
