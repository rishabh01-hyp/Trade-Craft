import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate } from '../data/loginCredentials'

export default function Login({ onLogin }) {
  const [rollNo, setRollNo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    // Look up the account. authenticate() returns the account
    // object when roll number AND password match, otherwise undefined.
    const account = authenticate(rollNo, password)

    if (!account) {
      setError('Invalid roll number or password. Please try again.')
      return
    }

    // Success: save the logged-in user, clear the error and go home.
    setError('')
    onLogin({ rollNo: account.rollNo, name: account.name })
    navigate('/')
  }

  return (
    // Flexbox centers the box vertically and horizontally on the full screen
    <div className="login-screen">
      <form className="login-box" onSubmit={handleSubmit}>
        <div className="login-box-brand">
          <span>TradeCraft</span>
          <span className="login-brand-cursor">▊</span>
        </div>

        <h1 className="login-title">Log in</h1>
        <p className="login-subtitle">Sign in with your college roll number to continue.</p>

        <div className="form-group">
          <label className="form-label" htmlFor="rollNo">
            Roll Number
          </label>
          <input
            id="rollNo"
            type="text"
            className="form-input"
            value={rollNo}
            onChange={(event) => setRollNo(event.target.value)}
            placeholder="e.g. 2510990316"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Only shows when the credentials do not match */}
        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn btn-primary login-submit">
          Continue
        </button>
      </form>
    </div>
  )
}