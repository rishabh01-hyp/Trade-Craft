import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { initialBookings } from '../data/mockData'

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
]

export default function Bookings() {
  const [bookings, setBookings] = useLocalStorage('tradecraft_bookings', initialBookings)
  const [activeTab, setActiveTab] = useState('upcoming')

  const items = bookings[activeTab]

  function cancelBooking(id) {
    setBookings((current) => ({
      ...current,
      pending: current.pending.filter((booking) => booking.id !== id),
    }))
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Bookings</h1>
        <p>Your sessions — upcoming, pending and completed.</p>
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
            <span className="tab-count">{bookings[tab.id].length}</span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="empty-state">No {activeTab} sessions.</p>
      ) : (
        items.map((booking) => (
          <article key={booking.id} className="booking-card">
            <div>
              <p className="booking-skill">{booking.skill}</p>
              <p className="booking-details">
                <Link to={`/student/${booking.teacherId}`}>{booking.teacher}</Link>
                {' \u00b7 '}
                {booking.mode}
                {' \u00b7 '}
                {booking.date}
                {' \u00b7 '}
                {booking.time}
              </p>
            </div>

            <div className="booking-card-side">
              <span className={`booking-status booking-status-${booking.status}`}>
                {booking.status}
              </span>
              {activeTab === 'pending' && (
                <button type="button" className="btn-ghost" onClick={() => cancelBooking(booking.id)}>
                  Cancel
                </button>
              )}
            </div>
          </article>
        ))
      )}
    </div>
  )
}
