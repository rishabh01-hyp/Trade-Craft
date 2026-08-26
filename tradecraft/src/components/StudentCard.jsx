import { Link } from 'react-router-dom'
import RatingDisplay from './RatingDisplay'

export default function StudentCard({ student }) {
  // Same initials pattern as the profile page keeps avatars consistent
  const initials = student.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <article className="list-item student-row">
      <div className="student-row-header">
        <span className="student-avatar">{initials}</span>
        <div className="student-main">
          <Link to={`/student/${student.id}`} className="student-name">
            {student.name}
          </Link>
          <RatingDisplay
            teachingRating={student.teachingRating}
            learningRating={student.learningRating}
          />
        </div>
        <span className="student-sessions">{student.teachingSessions} sessions</span>
      </div>

      <div className="tag-list">
        {student.teaches.map((skill) => (
          <span key={skill} className="tag">
            {skill}
          </span>
        ))}
      </div>

      <div className="student-row-footer">
        <p className="student-modes">{student.teachingModes.join(' · ')}</p>
        <Link to={`/student/${student.id}`} className="btn btn-outline btn-sm">
          View profile →
        </Link>
      </div>
    </article>
  )
}