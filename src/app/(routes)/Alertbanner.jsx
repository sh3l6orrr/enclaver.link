import { useEffect } from "react";
import { useAppStore } from "../../store.js";
export default function AlertBanner() {
  const alertMessage = useAppStore(state => state.alertMessage)
  const setShowAlertBanner = useAppStore(state => state.setShowAlertBanner)

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
      style={{ borderColor: alertMessage.success ? 'green' : 'red' }}>
      <span>{alertMessage.msg} </span>
    </div>
  </>
}