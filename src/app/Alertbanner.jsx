import React, { useRef } from "react"

import { useClickOutside } from '../util.jsx';
import { useStore } from "../store.js";
export default function AlertBanner() {
  const alertMessage = useStore(state => state.alertMessage)
  const setShowAlertBanner = useStore(state => state.setShowAlertBanner)
  const ref = useRef(null)
  useClickOutside(ref, () => setShowAlertBanner(false))

  return <>
    <div ref={ref} className="alert-banner"
      style={{ borderColor: alertMessage.ok ? 'green' : 'red' }} onClick={() => setShowAlertBanner(false)}>
      <span>{alertMessage.msg} </span>
    </div>
  </>
}