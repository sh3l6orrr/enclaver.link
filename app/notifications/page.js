'use client'

import './notifications.css'
import React from "react"
import Item from "../../src/components/item/Item.jsx"
import { Seperator, Space } from "../../src/util.jsx"
import { useStore } from "../../src/store.js"
import { useState } from "react"
import { useEffect } from "react"
import { getNotifs, readAllNotifs } from './actions.js'

export default function Notifications() {
  const token = useStore(state => state.token)
  const loggedUser = useStore(state => state.loggedUser)
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    if (!loggedUser) return
    async function fetchData() {
      const notifications = await getNotifs(token)
      setNotifications(notifications)
    }
    fetchData()
  }, [loggedUser])

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
  function ReadAllButtion() {
    async function handleClick() {
      const { ok, msg } = await readAllNotifs(token)
      alert(ok, msg)
    }
    return <button onClick={handleClick}>Read all Notifications</button>
  }
  return notifications ? <>
    <h1>Notifications</h1>
    <ReadAllButtion />
    <Space h="1rem" />
    <Seperator />
    {notifications.map((notification) =>
      <div key={notification.id} style={{ position: "relative" }}>
        <div className="unread-badge" />
        {notification.content
          ? <Item id={notification.content.id} loggedUser={loggedUser} />
          : <DeletedItem />
        }
      </div>
    )}

  </> : <NoNotificationsSign />
}
