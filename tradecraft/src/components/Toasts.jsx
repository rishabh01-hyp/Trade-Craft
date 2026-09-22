import { useCallback, useRef, useState } from 'react'
import { ToastContext } from './toastContext'

let toastId = 0

// Provider for the global toast notification system.
// usage: const toast = useToast(); toast.success('Saved!')
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback(
    (message, type = 'info', duration = 4200) => {
      const id = ++toastId
      setToasts((current) => [...current, { id, message, type }])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration)
      )
    },
    [dismiss]
  )

  const show = useCallback((message, duration) => push(message, 'info', duration), [push])
  const success = useCallback((message, duration) => push(message, 'success', duration), [push])
  const error = useCallback((message, duration) => push(message, 'error', duration), [push])

  return (
    <ToastContext.Provider value={{ show, success, error, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-container" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
          <span className="toast-icon" aria-hidden="true">
            {toast.type === 'success' ? '✓' : toast.type === 'error' ? '!' : 'i'}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button
            type="button"
            className="toast-dismiss"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}

export default ToastProvider