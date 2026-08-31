export default function Loading({ label = 'Loading...', full = false }) {
  return (
    <div className={`loading ${full ? 'loading-full' : ''}`} role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      {label && <span className="loading-label">{label}</span>}
    </div>
  )
}