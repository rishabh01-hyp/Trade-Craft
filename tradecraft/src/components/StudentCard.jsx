import { Link } from 'react-router-dom'
import RatingDisplay from './RatingDisplay'

export default function StudentCard({ student }) {
  return (
    <article className="list-item student-row">
      <div className="student-row-header">
        <Link to={`/student/${student.id}`} className="student-name">
          {student.name}
        </Link>
        <RatingDisplay
          teachingRating={student.teachingRating}
          learningRating={student.learningRating}
        />
      </div>
      <div className="tag-list">
        {student.teaches.map((skill) => (
          <span key={skill} className="tag">
            {skill}
          </span>
        ))}
      </div>
      <p className="student-meta">{student.teachingSessions} teaching sessions</p>
      <p className="student-modes">{student.teachingModes.join(' · ')}</p>
      <Link to={`/student/${student.id}`} className="btn-ghost">
        View profile →
      </Link>
    </article>
  )
}
