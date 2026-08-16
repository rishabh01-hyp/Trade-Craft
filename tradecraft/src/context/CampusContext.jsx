import { createContext, useContext, useState } from 'react'
import { campuses } from '../data/mockData'

const CampusContext = createContext(null)

export function CampusProvider({ children }) {
  const [campusId, setCampusId] = useState('punjab')

  const campus = campuses.find((c) => c.id === campusId) || campuses[0]

  return (
    <CampusContext.Provider value={{ campusId, setCampusId, campus }}>
      {children}
    </CampusContext.Provider>
  )
}

export function useCampus() {
  const ctx = useContext(CampusContext)
  if (!ctx) throw new Error('useCampus must be used within CampusProvider')
  return ctx
}
