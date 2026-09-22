// Field wraps any input with a label and an inline validation error.
// Reusable across every form so error styling stays consistent.

export default function Field({ label, htmlFor, error, children, hint }) {
  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <label className="form-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  )
}