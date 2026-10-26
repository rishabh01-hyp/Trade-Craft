import { useLocalStorage } from '../hooks/useLocalStorage'
import { emptyBookings } from '../services/bookings'
import { WorkspaceContext } from './workspaceContext'

// One shared source of truth for the signed-in student's workspace.
export default function WorkspaceProvider({ user, children }) {
  const owner = user?.rollNo || 'guest'
  const [bookings, setBookings, bookingsSaved] = useLocalStorage(`tradecraft_bookings_${owner}`, emptyBookings)
  const [skills, setSkills, skillsSaved] = useLocalStorage(`tradecraft_skills_${owner}`, {
    teaches: user?.skillsToTeach || [], learning: [],
  })

  return (
    <WorkspaceContext.Provider value={{ bookings, setBookings, skills, setSkills, owner }}>
      {(!bookingsSaved || !skillsSaved) && (
        <p className="form-error" role="alert">Browser storage is unavailable. Changes will be lost when you reload.</p>
      )}
      {children}
    </WorkspaceContext.Provider>
  )
}
