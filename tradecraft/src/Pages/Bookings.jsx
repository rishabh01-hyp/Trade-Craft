import { useState } from 'react'
import { Link } from 'react-router-dom'
import { bookings } from '../data/mockData'

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
]

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const items = bookings[activeTab]

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Bookings</h1>
        <p>Your sessions — upcoming, pending, and completed.</p>
      </div>

      <div className="booking-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`booking-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="empty-state">No {activeTab} sessions.</p>
      ) : (
        items.map((booking) => (
          <article key={booking.id} className="booking-card">
            <p className="booking-skill">{booking.skill}</p>
            <p className="booking-details">
              <Link to={`/student/${booking.teacherId}`}>{booking.teacher}</Link>
              {' · '}{booking.mode}{' · '}{booking.date}{' · '}{booking.time}
            </p>
            <p className="booking-status">{booking.status}</p>
          </article>
        ))
      )}
    </div>
  )
}
