import Field from './Field'

// Controlled text input with label, placeholder, error and optional
// onBlur validation. `onBlur` lets forms validate a field once the
// user leaves it instead of waiting for submit.
export default function TextField({
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  hint,
  type = 'text',
  placeholder = '',
  required = false,
  autoComplete = 'off',
}) {
  return (
    <Field label={label} htmlFor={id} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
      />
    </Field>
  )
}