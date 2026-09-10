import { useState, useRef, useEffect } from 'react'
import { campuses } from '../data/mockData'

export default function CampusSelector({ campus, onCampusChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="campus-selector" ref={ref}>
      <button
        type="button"
        className="campus-selector-btn"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        {campus.name}
        <span aria-hidden="true">&#9662;</span>
      </button>

      {open && (
        <div className="campus-dropdown">
          {campuses.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`campus-option ${option.id === campus.id ? 'selected' : ''}`}
              onClick={() => {
                onCampusChange(option.id)
                setOpen(false)
              }}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
