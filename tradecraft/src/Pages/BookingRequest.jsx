import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { useLoading } from '../hooks/useLoading'
import { getStudentById } from '../data/mockData'

export default function BookingRequest() {
  const { studentId } = useParams()
  const student = getStudentById(studentId)

  const [skill, setSkill] = useState('')
  const [mode, setMode] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const loading = useLoading()

  if (loading) {
    return (
      <div className="page-content">
        <Loading full label="Loading session details..." />
      </div>
    )
  }

  if (!student) {
    return (
      <div className="page-content">
        <p className="empty-state">Student not found.</p>
      </div>
    )
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-content">
        <h1>Session requested</h1>
        <p className="profile-bio" style={{ marginTop: '16px' }}>
          Your request to learn {skill} with {student.name} has been sent.
          Kindly wait for the acceptance.
        </p>
        <Link to={`/student/${student.id}`} className="btn-ghost" style={{ marginTop: '16px', display: 'inline-block' }}>
          ← Back to profile
        </Link>
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
          <label className="form-label" htmlFor="skill">Skill</label>
          <select
            id="skill"
            className="form-select"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            required
          >
            <option value="">Select a skill</option>
            {student.teaches.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <span className="form-label">Mode</span>
          <div className="mode-options">
            {student.teachingModes.map((m) => (
              <button
                key={m}
                type="button"
                className={`mode-option ${mode === m ? 'selected' : ''}`}
                onClick={() => setMode(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="time">Time</label>
          <input
            id="time"
            type="time"
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
