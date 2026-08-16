export default function RatingDisplay({ teachingRating, learningRating }) {
  return (
    <div className="ratings">
      <span className="rating-item">
        <span className="rating-label">Teaching</span>
        <span className="rating-value">★ {teachingRating.toFixed(1)}</span>
      </span>
      <span className="rating-item">
        <span className="rating-label">Learning</span>
        <span className="rating-value">★ {learningRating.toFixed(1)}</span>
      </span>
    </div>
  )
}
