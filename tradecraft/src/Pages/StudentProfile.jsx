import { Link, useParams } from 'react-router-dom'
import RatingDisplay from '../components/RatingDisplay'
import { getStudentById } from '../data/mockData'
import { useCampus } from '../context/CampusContext'

export default function StudentProfile() {
  const { studentId } = useParams()
  const student = getStudentById(studentId)
  const { campus } = useCampus()

  if (!student) {
    return (
      <div className="page-content">
        <p className="empty-state">Student not found.</p>
        <Link to="/search" className="btn-ghost">← Back to search</Link>
      </div>
    )
  }

  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div className="page-content">
      <div className="profile-header">
        {/* Avatar sits beside the identity instead of above it — tighter, more structured */}
        <div className="profile-id">
          <div className="profile-avatar">{initials}</div>
          <div>
            <h1>{student.name}</h1>
            <RatingDisplay
              teachingRating={student.teachingRating}
              learningRating={student.learningRating}
            />
            <p className="profile-details">
              {student.department} · {student.year} · {campus.name}
            </p>
          </div>
        </div>
        <p className="profile-bio">{student.bio}</p>
      </div>

      <div className="profile-section">
        <h3>Teaches</h3>
        <div className="tag-list">
          {student.teaches.map((skill) => (
            <Link key={skill} to={`/skill/${encodeURIComponent(skill)}`} className="tag">
              {skill}
            </Link>
          ))}
        </div>
        <p className="session-count">{student.teachingSessions} teaching sessions</p>
      </div>

      <div className="profile-section">
        <h3>Learning</h3>
        <div className="tag-list">
          {student.learning.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
        <p className="session-count">{student.learningSessions} learning sessions</p>
      </div>

      <div className="profile-section">
        <h3>Teaching modes</h3>
        <div className="tag-list">
          {student.teachingModes.map((mode) => (
            <span key={mode} className="tag">
              {mode}
            </span>
          ))}
        </div>
      </div>

      <div className="profile-section">
        <h3>Availability</h3>
        <ul className="availability-list">
          {student.availability.map((slot) => (
            <li key={slot}>{slot}</li>
          ))}
        </ul>
      </div>

      <Link
        to={`/book/${student.id}`}
        className="btn btn-primary"
        style={{ marginTop: '24px', display: 'inline-flex' }}
      >
        Request session
      </Link>
    </div>
  )
}
