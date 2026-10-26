import { useLocalStorage } from '../hooks/useLocalStorage'
import { useWorkspace } from '../components/workspaceContext'
import { useState } from 'react'
import { initialReviewsData } from '../data/mockReviews.js'
import { useToast } from '../components/toastContext'
import '../styles/ReviewsPage.css'

export default function ReviewsPage({ defaultData = initialReviewsData }) {
  const toast = useToast()
  const { bookings, owner } = useWorkspace()
  const [reviewsData, setReviewsData, saved] = useLocalStorage('tradecraft_reviews_' + owner, {
    ...defaultData, reviewsGiven: [],
  })
  const reviewsGiven = reviewsData.reviewsGiven || []
  const completedSessions = bookings.completed
    .filter((booking) => !reviewsGiven.some((review) => review.sessionId === booking.id))
    .map((booking) => ({ ...booking, teacherName: booking.teacher }))

  // Form controlled state
  const [selectedSessionId, setSelectedSessionId] = useState('')
  const [rating, setRating] = useState('5')
  const [comment, setComment] = useState('')
  const [formSuccessMessage, setFormSuccessMessage] = useState('')

  const {
    summary = {
      teachingRating: 4.6,
      learningRating: 4.9,
      totalReviews: 28,
      starDistribution: { 5: 20, 4: 6, 3: 1, 2: 1, 1: 0 },
    },
    reviewsReceived = [],
  } = reviewsData

  // Handle new review submission
  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!selectedSessionId) return

    const selectedSession = completedSessions.find(
      (session) => session.id === selectedSessionId
    )

    if (!selectedSession || !comment.trim()) return toast.error('Choose a completed session and write feedback.')
    const teacherName = selectedSession.teacherName
    const skill = selectedSession.skill
    const numRating = Number(rating)

    const newReview = {
      id: crypto.randomUUID(),
      sessionId: selectedSession.id,
      reviewerName: 'You',
      teacherName,
      skill,
      rating: numRating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }

    // Feedback given to a teacher must not increase your own received rating.
    setReviewsData((current) => ({
      ...current,
      reviewsGiven: [newReview, ...current.reviewsGiven],
    }))

    // Reset form fields
    setComment('')
    setRating('5')
    setSelectedSessionId('')
    setFormSuccessMessage(`Review for ${skill} with ${teacherName} submitted successfully!`)
    toast.success(`Review for ${skill} submitted.`)


  }

  // Calculate percentage for star distribution progress bars
  const totalStarVotes = Object.values(summary.starDistribution || {}).reduce(
    (acc, curr) => acc + curr,
    0
  ) || 1

  return (
    <div className="page-content">
      <div className="reviews-page">
        {/* Page Header */}
        <header className="page-header reviews-header">
          <h1>Reviews & Ratings</h1>
          <p>Explore sample received ratings and leave feedback for your completed sessions.</p>
        </header>

        {/* Section 1: Overall Rating Summary */}
        <section className="reviews-section" aria-labelledby="summary-title">
          <h2 id="summary-title" className="section-title">
            Sample Received Rating Summary
          </h2>

          <div className="reviews-summary-grid">
            {/* Score & Dual Metric Card */}
            <article className="reviews-score-card">
              <span className="score-main">{summary.teachingRating?.toFixed(1) || '4.6'}</span>
              <div className="score-stars" aria-label={`Average teaching rating ${summary.teachingRating || 4.6} out of 5 stars`}>
                {'★'.repeat(Math.round(summary.teachingRating || 5))}
              </div>
              <p className="score-subtitle">
                Overall score from {summary.totalReviews || 0} reviews
              </p>

              <div className="score-sub-metrics">
                <div className="sub-metric-item">
                  <span className="sub-metric-label">Teaching Rating</span>
                  <span className="sub-metric-val">
                    <span className="star-mini" aria-hidden="true">★</span>
                    {summary.teachingRating?.toFixed(1) || '4.6'}
                  </span>
                </div>
                <div className="sub-metric-item">
                  <span className="sub-metric-label">Learning Rating</span>
                  <span className="sub-metric-val">
                    <span className="star-mini" aria-hidden="true">★</span>
                    {summary.learningRating?.toFixed(1) || '4.9'}
                  </span>
                </div>
              </div>
            </article>

            {/* Star Distribution Breakdown Card */}
            <article className="reviews-breakdown-card">
              <h3 className="breakdown-title">Star Distribution</h3>
              <div className="star-distribution">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = summary.starDistribution?.[stars] || 0
                  const percentage = Math.round((count / totalStarVotes) * 100)

                  return (
                    <div key={stars} className="star-row">
                      <span className="star-label">
                        {stars} <span className="star-icon" aria-hidden="true">★</span>
                      </span>
                      <div className="star-bar-track" title={`${percentage}% (${count} reviews)`}>
                        <div
                          className="star-bar-fill"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="star-count">{count}</span>
                    </div>
                  )
                })}
              </div>
            </article>
          </div>
        </section>

        {/* Section 2: List of Received Reviews */}
        <section className="reviews-section" aria-labelledby="received-reviews-title">
          <h2 id="received-reviews-title" className="section-title">
            Reviews Received ({reviewsReceived.length})
          </h2>

          {reviewsReceived.length === 0 ? (
            <div className="reviews-empty-state">
              <p>No reviews received yet.</p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviewsReceived.map((review) => (
                <article key={review.id} className="review-card">
                  <header className="review-card-header">
                    <div className="reviewer-profile">
                      <div className="reviewer-avatar" aria-hidden="true">
                        {review.reviewerName ? review.reviewerName.charAt(0) : 'U'}
                      </div>
                      <div className="reviewer-info">
                        <span className="reviewer-name">{review.reviewerName}</span>
                        <span className="reviewer-role">Demo Student</span>
                      </div>
                    </div>
                    <div className="review-meta">
                      <span className="review-skill-badge">{review.skill}</span>
                      <time className="review-date">{review.date}</time>
                    </div>
                  </header>

                  <div className="review-rating">
                    <span
                      className="star-rating"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={star <= review.rating ? 'star-gold' : 'star-empty'}
                          aria-hidden="true"
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="review-rating-score">{review.rating}.0</span>
                  </div>

                  <p className="review-comment">{review.comment}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="reviews-section" aria-labelledby="given-title">
          <h2 id="given-title" className="section-title">Reviews you gave ({reviewsGiven.length})</h2>
          {!saved && <p role="alert">Feedback could not be saved to this browser.</p>}
          {reviewsGiven.map((review) => (
            <article className="review-card" key={review.id}>
              <h3>{review.skill} with {review.teacherName}</h3>
              <p>{review.rating}/5 ? {review.comment}</p>
            </article>
          ))}
        </section>

        {/* Section 3: Controlled Form to Leave a Review */}
        <section className="reviews-section" aria-labelledby="write-review-title">
          <h2 id="write-review-title" className="section-title">
            Leave a Review
          </h2>

          {completedSessions.length === 0 && <p className="empty-state">Complete a booking to leave feedback. Each session can be reviewed once.</p>}
          <form className="review-form-card" onSubmit={handleSubmitReview}>
            {formSuccessMessage && (
              <div
                style={{
                  padding: '10px 14px',
                  background: 'var(--accent-muted)',
                  color: 'var(--accent)',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  border: '1px solid rgba(45, 106, 79, 0.25)',
                }}
              >
                ✓ {formSuccessMessage}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="session-select">
                Completed Session
              </label>
              <select
                id="session-select"
                className="form-select"
                value={selectedSessionId}
                onChange={(e) => setSelectedSessionId(e.target.value)}
                required
              >
                <option value="">-- Select a completed session --</option>
                {completedSessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.skill} with {session.teacherName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rating-select">
                Rating
              </label>
              <select
                id="rating-select"
                className="form-select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="5">★★★★★ (5 - Outstanding)</option>
                <option value="4">★★★★☆ (4 - Very Good)</option>
                <option value="3">★★★☆☆ (3 - Good)</option>
                <option value="2">★★☆☆☆ (2 - Fair)</option>
                <option value="1">★☆☆☆☆ (1 - Poor)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="review-comment">
                Your Feedback
              </label>
              <textarea
                id="review-comment"
                className="review-textarea"
                rows="4"
                placeholder="Write helpful feedback about the teaching style, pacing, and concepts covered..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start' }}
            >
              Submit Review
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
