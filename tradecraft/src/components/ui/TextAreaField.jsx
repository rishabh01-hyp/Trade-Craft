import Field from './Field'

// Controlled textarea with label, error and character counter.
export default function TextAreaField({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  hint,
  rows = 4,
  placeholder = '',
  maxLength = 500,
  required = false,
}) {
  return (
    <Field label={label} htmlFor={id} error={error} hint={hint}>
      <textarea
        id={id}
        className="form-textarea"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        maxLength={maxLength}
        required={required}
        aria-invalid={Boolean(error)}
      />
      <span className="field-count">
        {value.length}/{maxLength}
      </span>
    </Field>
  )
}