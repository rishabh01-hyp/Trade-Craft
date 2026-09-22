import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import { useFetchData } from '../hooks/useFetchData'
import { useToast } from '../components/toastContext'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import Modal from '../components/Modal'

const tabs = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
]

export default function Bookings() {
  const { data: initialData, loading, error, retry } = useFetchData(() => api.get('bookings'), [])
  const [bookings, setBookings] = useState(null)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [confirmCancel, setConfirmCancel] = useState(null)
  const [rescheduleTarget, setRescheduleTarget] = useState(null)
  const [rescheduleDate, setRescheduleDate] = useState('')
  const [rescheduleTime, setRescheduleTime] = useState('')
  const toast = useToast()

  // Seed the local working copy once the initial GET resolves.
  // Adjusting state during render (instead of in an effect) is the
  // React-recommended pattern for syncing state from fetched data.
  if (initialData && bookings === null) {
    setBookings(initialData)
  }

  function applyChange(mutator, message) {
    if (!bookings) return
    const next = mutator(bookings)
    localStorage.setItem('tradecraft_bookings', JSON.stringify(next))
    setBookings(next)
    toast.success(message)
  }

  function cancelBooking() {
    if (!confirmCancel) return
    const id = confirmCancel.id
    // DELETE /bookings/:id
    applyChange((current) => ({
      ...current,
      pending: current.pending.filter((booking) => booking.id !== id),
      upcoming: current.upcoming.filter((booking) => booking.id !== id),
    }), 'Booking cancelled.')
    setConfirmCancel(null)
  }

  function openReschedule(booking) {
    setRescheduleTarget(booking)
    setRescheduleDate(booking.date || '')
    setRescheduleTime(booking.time || '')
  }

  function saveReschedule(event) {
    event.preventDefault()
    if (!rescheduleTarget) return

    // PUT /bookings/:id
    applyChange((current) => ({
      ...current,
      upcoming: current.upcoming.map((booking) =>
        booking.id === rescheduleTarget.id
          ? { ...booking, date: rescheduleDate, time: rescheduleTime }
          : booking
      ),
    }), 'Session rescheduled.')
    setRescheduleTarget(null)
  }

  function completeBooking(booking) {
    // PUT /bookings/:id — move an upcoming session to completed
    applyChange((current) => ({
      ...current,
      upcoming: current.upcoming.filter((item) => item.id !== booking.id),
      pending: current.pending.filter((item) => item.id !== booking.id),
      completed: [
        { ...booking, status: 'completed' },
        ...(current.completed || []),
      ],
    }), 'Marked as completed.')
  }

  function rescheduleModal() {
    return (
      <Modal
        open={Boolean(rescheduleTarget)}
        onClose={() => setRescheduleTarget(null)}
        title="Reschedule session"
        footer={
          <>
            <button type="button" className="btn-ghost" onClick={() => setRescheduleTarget(null)}>
              Cancel
            </button>
            <button type="submit" form="reschedule-form" className="btn btn-primary">
              Save changes
            </button>
          </>
        }
      >
        <form id="reschedule-form" className="booking-form" onSubmit={saveReschedule}>
          <p className="modal-note">
            {rescheduleTarget?.skill} with {rescheduleTarget?.teacher}
          </p>
          <div className="form-group">
            <label className="form-label" htmlFor="reschedule-date">
              Date
            </label>
            <input
              id="reschedule-date"
              type="date"
              className="form-input"
              value={rescheduleDate}
              onChange={(event) => setRescheduleDate(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reschedule-time">
              Time
            </label>
            <input
              id="reschedule-time"
              type="time"
              className="form-input"
              value={rescheduleTime}
              onChange={(event) => setRescheduleTime(event.target.value)}
              required
            />
          </div>
        </form>
      </Modal>
    )
  }

  function cancelModal() {
    return (
      <Modal
        open={Boolean(confirmCancel)}
        onClose={() => setConfirmCancel(null)}
        title="Cancel this booking?"
        footer={
          <>
            <button type="button" className="btn-ghost" onClick={() => setConfirmCancel(null)}>
              Keep booking
            </button>
            <button type="button" className="btn btn-primary" onClick={cancelBooking}>
              Cancel booking
            </button>
          </>
        }
      >
        <p className="modal-note">
          This will remove the {confirmCancel?.skill} session with {confirmCancel?.teacher}. This action
          cannot be undone.
        </p>
      </Modal>
    )
  }

  if (loading && !bookings) {
    return (
      <div className="page-content">
        <Loading full label="Loading bookings..." />
      </div>
    )
  }

  if (error && !bookings) {
    return (
      <div className="page-content">
        <ErrorState message={error.message || 'Failed to load bookings.'} onRetry={retry} />
      </div>
    )
  }

  const current = bookings || { upcoming: [], pending: [], completed: [] }
  const items = current[activeTab] || []

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Bookings</h1>
        <p>Create, update and manage your sessions — a full CRUD workflow.</p>
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
            <span className="tab-count">{(current[tab.id] || []).length}</span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="empty-state">
          No {activeTab} sessions.{' '}
          <Link to="/students" className="btn-ghost">
            Book one now
          </Link>
        </p>
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

              {activeTab === 'upcoming' && (
                <>
                  <button type="button" className="btn-ghost" onClick={() => openReschedule(booking)}>
                    Reschedule
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => setConfirmCancel(booking)}>
                    Cancel
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => completeBooking(booking)}>
                    Complete
                  </button>
                </>
              )}

              {activeTab === 'pending' && (
                <button type="button" className="btn-ghost" onClick={() => setConfirmCancel(booking)}>
                  Cancel
                </button>
              )}
            </div>
          </article>
        ))
      )}

      {cancelModal()}
      {rescheduleModal()}
    </div>
  )
}