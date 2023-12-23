'use client'

import React, { useState } from "react"
import { Filler, Space } from '@/util.jsx'; 
import { signUp } from "./actions.js";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)

    const { success, msg } = await signUp(formData)
    alert(success, msg)
    if (!success) return

    router.push('/signin')
  }
  return <> 
    <h1>Create an account</h1>
    <form onSubmit={handleSubmit}>
      <div style={{ width: "19rem" }}>
        <div className='horizontal align-items-center'>
          Username: <Filler /><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <Space h="0.5rem" />
        <div className='horizontal align-items-center'>
          Password: <Filler /> <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </div>

      <Space h="1.5rem" />
      <div className='horizontal'>
        <button type="button" style={{ fontSize: "medium" }} onClick={() => { router.push('/signin') }}>
          Have an account?
        </button>
        <Filler />
        <button type="submit">Submit</button>
      </div>
    </form>
  </>
}