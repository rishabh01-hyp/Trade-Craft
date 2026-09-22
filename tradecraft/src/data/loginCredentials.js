// Roll number is the key + password must match.
// In a real app these would live in a database, never in the frontend.

export const loginCredentials = [
  {rollNo:'2510990316',password:'Rishabh@123',name:'Rishabh'},
  {rollNo:'2510990029',password:'Nishant@123',name:'Nishant Lal'},
  {rollNo:'2510990712',password:'Aditya@123',name:'Aditya Patyal'},
  {rollNo:'2510990304',password:'Shirshak@123',name:'Shirshak'},
]

// Returns the account object for a valid roll number + password,
// or undefined if the credentials do not match.
export function authenticate(rollNo, password) {
  return loginCredentials.find(
    (account)=>account.rollNo===rollNo.trim()&&account.password===password
  )
}