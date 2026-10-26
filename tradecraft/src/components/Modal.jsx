import { useEffect, useRef } from 'react'

// Accessible modal dialog. Closes on Escape, on overlay click and via
// the onClose callback. Uses role="dialog" + aria-modal and focuses
// the panel on open so keyboard users land inside the dialog.
export default function Modal({ open, onClose, title, children, footer }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open])

  function handleKeyDown(event) {
      const panel = panelRef.current
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const controls = [...panel.querySelectorAll('button, input, select, textarea, a[href], [tabindex="0"]')]
        .filter((element) => !element.disabled && element.getClientRects().length > 0)
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (!first) {
        event.preventDefault()
        panel.focus()
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
        event.preventDefault()
        first.focus()
      }
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onMouseDown={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        onKeyDown={handleKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            x
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}
