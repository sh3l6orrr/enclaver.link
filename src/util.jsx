'use client'

import styles from './util.module.css'
import React, { useEffect } from 'react';
import { useRef } from 'react';

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) callback()
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, callback])
}

export function Seperator() {
  return <>
    <div className={styles.seperator} />
  </>
}
export function Space({ h, w }) {
  return <>
    <div style={{ height: h ?? "auto", width: w ?? "auto" }} />
  </>
}

export function Modal({ children, hideModalCallback }) {
  const ref = useRef(null)
  useClickOutside(ref, hideModalCallback)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => document.body.style.overflow = 'unset'
  }, [])
  return <>
    <div className={styles.modal}>
      <div ref={ref} className={styles.modalContent}>
        {children}
      </div>
    </div>
  </>
}
export function Filler() {
  return <>
    <div style={{ flexGrow: "1" }} />
  </>
}

export function Dropdown({ children, hideDropdownCallback }) {
  const ref = useRef(null)
  useClickOutside(ref, hideDropdownCallback)

  return <>
    <div ref={ref} className={styles.dropdown}>
      {children}
    </div>
  </>
}
