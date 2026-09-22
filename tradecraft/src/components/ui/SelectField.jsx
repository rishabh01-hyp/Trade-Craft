import Field from './Field'

// Controlled select with label, options and validation error.
export default function SelectField({
  label,
  id,
  value,
  onChange,
  onBlur,
  options,
  error,
  hint,
  placeholder = 'Select...',
  required = false,
}) {
  return (
    <Field label={label} htmlFor={id} error={error} hint={hint}>
      <select
        id={id}
        className="form-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        aria-invalid={Boolean(error)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const { value: optionValue, label: optionLabel } =
            typeof option === 'string' ? { value: option, label: option } : option
          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          )
        })}
      </select>
    </Field>
  )
}