// Mock login accounts for the demo.
// Roll number is the key + password must match.
// In a real app these would live in a database, never in the frontend.

export const loginCredentials = [
  { rollNo: '2510990316', password: 'clive@123', name: 'Rishabh' },
  { rollNo: '2510990029', password: 'clive@123', name: 'Nishant Lal' },
  { rollNo: '2510990712', password: 'clive@123', name: 'Aditya Patyal' },
  { rollNo: '2510990304', password: 'clive@123', name: 'Rohan Sharma' },
]

// Returns the account object for a valid roll number + password,
// or undefined if the credentials do not match.
export function authenticate(rollNo, password) {
  return loginCredentials.find(
    (account) => account.rollNo === rollNo.trim() && account.password === password
  )
}