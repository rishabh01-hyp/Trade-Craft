// Friendly error state with a retry button. Used whenever a data
// fetch fails so the user can re-run the request instead of reloading.
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="error-state" role="alert">
      <p className="error-state-code">error</p>
      <p className="error-state-message">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
          &#8635; Retry
        </button>
      )}
    </div>
  )
}