import { useEffect } from "react";
import { useStore } from "../store.js";
export default function AlertBanner() {
  const alertMessage = useStore(state => state.alertMessage)
  const setShowAlertBanner = useStore(state => state.setShowAlertBanner)

  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      setShowAlertBanner(false);
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [setShowAlertBanner]);

  return <>
    <div  className="alert-banner"
      style={{ borderColor: alertMessage.ok ? 'green' : 'red' }}>
      <span>{alertMessage.msg} </span>
    </div>
  </>
}