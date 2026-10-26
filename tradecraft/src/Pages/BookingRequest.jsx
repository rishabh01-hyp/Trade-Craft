import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useFetchData } from '../hooks/useFetchData'
import { useWorkspace } from '../components/workspaceContext'
import { today, validateSession } from '../services/bookings'
import ErrorState from '../components/ErrorState'
import { useToast } from '../components/toastContext'
import { fetchStudent } from '../data/mockData'

export default function BookingRequest() {
  const { studentId } = useParams()
  const { data: student, loading, error, retry } = useFetchData(() => fetchStudent(studentId), [studentId])
  const { bookings, setBookings } = useWorkspace()
  const toast = useToast()

  const [skill, setSkill] = useState('')
  const [mode, setMode] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading session details..." />
      </div>
    )
  }

  if (error) return <ErrorState message={error.message} onRetry={retry} />

  if (!student) {
    return (
      <div className="page-content">
        <p className="empty-state">Student not found.</p>
      </div>
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateSession(bookings, date, time)
    if (validationError) return toast.error(validationError)
    if (!student.teaches.includes(skill) || !student.teachingModes.includes(mode)) {
      return toast.error('Select an offered skill and session mode.')
    }

    const booking = {
      id: crypto.randomUUID(),
      skill,
      teacher: student.name,
      teacherId: student.id,
      mode,
      date,
      time,
      status: 'pending',
    }

    setBookings((current) => ({
      ...current,
      pending: [booking, ...current.pending],
    }))
    setSubmitted(true)
    toast.success(`Session request sent to ${student.name}.`)
  }

  if (submitted) {
    return (
      <div className="page-content">
        <h1>Session requested</h1>
        <p className="profile-bio">
          Your request to learn {skill} with {student.name} is saved in this browser.
          Use Confirm (demo) in Bookings to try the rest of the session workflow.
        </p>
        <div className="confirmation-actions">
          <Link to="/bookings" className="btn btn-primary">
            View my bookings
          </Link>
          <Link to={`/student/${student.id}`} className="btn-ghost">
            &larr; Back to profile
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content">
      <p className="breadcrumb">
        <Link to={`/student/${student.id}`}>{student.name}</Link> / Request session
      </p>

      <div className="page-header">
        <h1>Request session</h1>
        <p>Teacher: {student.name}</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="skill">
            Skill
          </label>
          <select
            id="skill"
            className="form-select"
            value={skill}
            onChange={(event) => setSkill(event.target.value)}
            required
          >
            <option value="">Select a skill</option>
            {student.teaches.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <span className="form-label">Mode</span>
          <div className="mode-options">
            {student.teachingModes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={mode === option}
                className={`mode-option ${mode === option ? 'selected' : ''}`}
                onClick={() => setMode(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            type="date"
            min={today()}
            className="form-input"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="time">
            Time
          </label>
          <input
            id="time"
            type="time"
            className="form-input"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={!mode}>
          Request session
        </button>
      </form>
    </div>
  )
}
