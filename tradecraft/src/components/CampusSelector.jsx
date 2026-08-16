import { useState, useRef, useEffect } from 'react'
import { useCampus } from '../context/CampusContext'
import { campuses } from '../data/mockData'

export default function CampusSelector() {
  const { campusId, setCampusId, campus } = useCampus()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
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
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {campus.name}
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="campus-dropdown">
          {campuses.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`campus-option ${c.id === campusId ? 'selected' : ''}`}
              onClick={() => {
                setCampusId(c.id)
                setOpen(false)
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
