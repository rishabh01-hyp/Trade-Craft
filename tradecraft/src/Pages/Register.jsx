import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextField from '../components/ui/TextField'
import SelectField from '../components/ui/SelectField'
import TextAreaField from '../components/ui/TextAreaField'
import { useToast } from '../components/toastContext'
import { campuses, departments } from '../data/mockData'

const initialValues = {
  fullName: '',
  rollNo: '',
  email: '',
  campus: '',
  department: '',
  password: '',
  confirmPassword: '',
  bio: '',
  skillsToTeach: '',
}

const initialErrors = Object.fromEntries(Object.keys(initialValues).map((key) => [key, '']))

// --- Validation strategies -------------------------------------------------
// Each rule returns an error message or an empty string when valid.
const validators = {
  fullName(value) {
    if (!value.trim()) return 'Full name is required.'
    if (value.trim().length < 3) return 'Name must be at least 3 characters.'
    if (!/^[a-zA-Z\s.']+$/.test(value.trim())) return 'Name can only contain letters.'
    return ''
  },
  rollNo(value) {
    if (!value.trim()) return 'Roll number is required.'
    if (!/^\d{10}$/.test(value.trim())) return 'Roll number must be exactly 10 digits.'
    return ''
  },
  email(value) {
    if (!value.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return 'Enter a valid email address.'
    return ''
  },
  campus(value) {
    if (!value) return 'Select your campus.'
    return ''
  },
  department(value) {
    if (!value) return 'Select your department.'
    return ''
  },
  password(value) {
    if (!value) return 'Password is required.'
    if (value.length < 8) return 'Password must be at least 8 characters.'
    if (!/[A-Z]/.test(value)) return 'Password needs at least one uppercase letter.'
    if (!/[0-9]/.test(value)) return 'Password needs at least one number.'
    return ''
  },
  confirmPassword(value, allValues) {
    if (!value) return 'Please confirm your password.'
    if (value !== allValues.password) return 'Passwords do not match.'
    return ''
  },
  bio(value) {
    if (value.trim().length > 0 && value.trim().length < 20) {
      return 'Bio should be at least 20 characters or left empty.'
    }
    return ''
  },
  skillsToTeach(value) {
    const skills = value
      .split(',')
      .map((skill) => skill.trim())
      .filter(Boolean)
    if (skills.length === 0) return 'Add at least one skill you can teach.'
    if (skills.length > 5) return 'You can add up to 5 skills.'
    if (skills.some((skill) => skill.length < 2)) return 'Each skill must be at least 2 characters.'
    return ''
  },
}

function validateField(name, value, allValues) {
  return validators[name](value, allValues)
}

function validateAll(values) {
  const errors = {}
  Object.keys(validators).forEach((name) => {
    errors[name] = validateField(name, values[name], values)
  })
  return errors
}

export default function Register() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [touched, setTouched] = useState({})
  const navigate = useNavigate()
  const toast = useToast()

  function handleChange(name) {
    return (value) => {
      setValues((current) => ({ ...current, [name]: value }))
      // Re-validate live once the field has been touched.
      if (touched[name]) {
        setErrors((current) => ({
          ...current,
          [name]: validateField(name, value, { ...values, [name]: value }),
        }))
      }
    }
  }

  function handleBlur(name) {
    return () => {
      setTouched((current) => ({ ...current, [name]: true }))
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, values[name], values),
      }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(values).map((key) => [key, true])))

    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) {
      toast.error('Please fix the highlighted fields and try again.')
      return
    }

    const profile = {
      fullName: values.fullName.trim(),
      rollNo: values.rollNo.trim(),
      email: values.email.trim(),
      campus: values.campus,
      department: values.department,
      bio: values.bio.trim(),
      skillsToTeach: values.skillsToTeach
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      registeredAt: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }

    localStorage.setItem('tradecraft_profile', JSON.stringify(profile))
    toast.success(`Welcome to TradeCraft, ${profile.fullName}!`)
    navigate('/')
  }

  return (
    <div className="login-screen">
      <form className="login-box register-box" onSubmit={handleSubmit} noValidate>
        <div className="login-box-brand">
          <span>TradeCraft</span>
          <span className="login-brand-cursor">▊</span>
        </div>

        <h1 className="login-title">Create your account</h1>
        <p className="login-subtitle">
          Register to teach and learn on your campus. Fields are validated as you fill them.
        </p>

        <TextField
          label="Full name"
          id="fullName"
          value={values.fullName}
          onChange={handleChange('fullName')}
          onBlur={handleBlur('fullName')}
          error={errors.fullName}
          placeholder="e.g. Rishabh"
          autoComplete="name"
        />

        <TextField
          label="Roll number"
          id="rollNo"
          value={values.rollNo}
          onChange={handleChange('rollNo')}
          onBlur={handleBlur('rollNo')}
          error={errors.rollNo}
          hint="10-digit college roll number"
          placeholder="e.g. 2510990316"
        />

        <TextField
          label="Email"
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          placeholder="you@chitkara.edu.in"
          autoComplete="email"
        />

        <SelectField
          label="Campus"
          id="campus"
          value={values.campus}
          onChange={handleChange('campus')}
          onBlur={handleBlur('campus')}
          options={campuses.map((campus) => ({ value: campus.id, label: campus.name }))}
          error={errors.campus}
          placeholder="Select your campus"
        />

        <SelectField
          label="Department"
          id="department"
          value={values.department}
          onChange={handleChange('department')}
          onBlur={handleBlur('department')}
          options={departments}
          error={errors.department}
          placeholder="Select your department"
        />

        <TextField
          label="Password"
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          hint="Min 8 chars, one uppercase letter and one number"
        />

        <TextField
          label="Confirm password"
          id="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={errors.confirmPassword}
        />

        <TextAreaField
          label="About you"
          id="bio"
          value={values.bio}
          onChange={handleChange('bio')}
          onBlur={handleBlur('bio')}
          error={errors.bio}
          rows={3}
          maxLength={200}
          placeholder="A short intro that appears on your public profile..."
        />

        <TextField
          label="Skills you can teach"
          id="skillsToTeach"
          value={values.skillsToTeach}
          onChange={handleChange('skillsToTeach')}
          onBlur={handleBlur('skillsToTeach')}
          error={errors.skillsToTeach}
          hint="Comma separated, up to 5 (e.g. React, Guitar, Public Speaking)"
          placeholder="React, Guitar, Public Speaking"
        />

        <button type="submit" className="btn btn-primary login-submit">
          Create account
        </button>

        <p className="login-switch">
          Already registered?{' '}
          <Link to="/login" className="btn-ghost">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}