'use client'
import React from "react"
import Item from "../Item.jsx"
import { Seperator, Space } from "../../util.jsx"
import { useStore } from "../store.js"
import url from "../url.js"
import './notifications.css'
import { useState } from "react"
import { useEffect } from "react"

export default function Notifications() {
  const loggedUser = useStore(state => state.loggedUser)
  const [notifications, setNotifications] = useState(null)

  useEffect(() => {
    if (!loggedUser) return
    async function fetchData() {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
      const requestOptions = {
        headers: headers
      };
      const res = await fetch(url + "/messages", requestOptions)
      const notifications = await res.json()
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
  return notifications ? <>
    <h1>Notifications</h1>
    {/* <button onClick={() => submit(null, { action: "/notifications", navigate: false, method: 'post' })}>Read all Notifications</button> */}
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

  </> : <NoNotificationsSign />
}

