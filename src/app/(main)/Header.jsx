'use client'

import React, { useState } from 'react';
import Link from 'next/link'
import { Dropdown, Filler, Space } from '../../util.jsx';
import { useRouter } from 'next/navigation'
import { useAppStore } from '../../store.js';

export default function Header() {
  const loggedUser = useAppStore((state) => state.loggedUser)
  const setLoggedUser = useAppStore((state) => state.setLoggedUser)
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [showAccountDropdownMobile, setShowAccountDropdownMobile] = useState(false)
  const router = useRouter()

  function AccountDropdown() {
    return <>
      <Dropdown hideDropdownCallback={() => setShowAccountDropdown(false)}>
        {loggedUser && <>
          <div onClick={() => {
            router.push(`/profile/${loggedUser}`)
            setShowAccountDropdown(false)
          }}> ⛄︎ Profile </div>
          <div onClick={() => {
            router.push('/settings')
            setShowAccountDropdown(false)
          }}> ⚙︎ Settings</div>
          <div onClick={() => {
            localStorage.removeItem('token')
            setLoggedUser(null)
            router.push('/')
            alert(true, 'You are signed out.')
            setShowAccountDropdown(false)
          }}> ⎋ Sign Out </div>
        </>
        }
      </Dropdown>
    </>
  }
  function AccountDropdownMobile() {
    return <>
      <Dropdown hideDropdownCallback={() => setShowAccountDropdownMobile(false)}>
        {loggedUser
          ? <>
            <div onClick={() => {

              router.push(`/profile/${loggedUser}`)
              setShowAccountDropdownMobile(false)
            }}> ⛄︎ Profile </div>
            <div onClick={() => {
              router.push('/notifications')
              setShowAccountDropdownMobile(false)
            }}> ✽ Notifs </div>
            <div onClick={() => {
              router.push('/settings')
              setShowAccountDropdown(false)
            }}> ⚙︎ Settings</div>
            <div onClick={() => {
              localStorage.removeItem('token')
              setLoggedUser(null)
              router.push('/')
              alert(true, 'You are signed out.')
              setShowAccountDropdownMobile(false)
            }}> ⎋ Sign Out </div>
          </>
          : <>
            <div onClick={() => { router.push('/signin') }}>
              ➢ Sign In
            </div>
            <div onClick={() => { router.push('/signup') }}>
              ➣ Sign Up
            </div>
          </>
        }
      </Dropdown>
    </>
  }
  function MenuBar() {
    return <div className='on-desktop'>
      <div className='horizontal align-items-center'>
        {loggedUser
          ? <>
            <a onClick={() => {
              router.push('/notifications')
              setShowAccountDropdown(false)
            }}> ✽ Notifs</a>
            <Space w="1.6rem" />
            <div>
              <button style={{ padding: "0.4rem", fontSize: "large" }} onClick={() => setShowAccountDropdown(true)}>
                {loggedUser ? loggedUser : "Sign in"}
              </button>
              {showAccountDropdown && <AccountDropdown />}
            </div>
          </> : <>
            <a onClick={() => router.push('/signin')}>
              ➢ Sign In
            </a>
            <Space w="1.3rem" />
            <a onClick={() => router.push('/signin')}>
              ➣ Sign Up
            </a>
          </>
        }
      </div>
    </div>
  }
  function MenuBarMobile() {
    return <div className='on-mobile'>
      <button style={{ padding: "0.4rem", fontSize: "large" }} onClick={() => setShowAccountDropdownMobile(true)}>
        {loggedUser ? loggedUser : "Sign in"}
      </button>
      {showAccountDropdownMobile && <AccountDropdownMobile />}
    </div>
  }

  function SearchField() {
    const [query, setQuery] = useState('')
    const handleSubmit = (event) => {
      event.preventDefault()
      router.push(`/search?query=${query}`);
      setQuery('')
    };
    return <>
      <form className='horizontal' style={{ flexGrow: "1" }} onSubmit={handleSubmit}>
        <input style={{ borderColor: "green", flexGrow: "1", width: "6rem" }} value={query}
          onChange={(event) => { setQuery(event.target.value) }} placeholder="Search..." required />
        <Space w="0.2rem" />
        <button type="submit" style={{ color: "green" }}>➤</button>
      </form>
    </>
  }
  return <>
    <header>
      <div className="horizontal align-items-center" style={{ maxWidth: "1025px", width: "100%" }}>
        <Space w="1rem" />
        <Link href='/'>
          <div style={{ fontSize: "larger" }}>Enclaver</div>
        </Link>
        <Filler />
        <SearchField />
        <Filler />

        <MenuBarMobile />
        <MenuBar />

        <Space w="1rem" />
      </div>
    </header>
  </>
}

