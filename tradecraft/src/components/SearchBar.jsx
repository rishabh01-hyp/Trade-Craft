import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ placeholder = 'Search skills...', large = false, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* An inline magnifier icon makes the input read as a search box instantly */}
      <div className="search-wrap">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          className={`search-input ${large ? 'search-input-large' : ''}`}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search skills"
        />
      </div>
    </form>
  )
}