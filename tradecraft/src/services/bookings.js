export const emptyBookings = { upcoming: [], pending: [], completed: [] }

export function today() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export function validateSession(bookings, date, time, ignoredId) {
  const scheduled = new Date(`${date}T${time}`)
  if (!date || !time || Number.isNaN(scheduled.getTime()) || scheduled <= new Date()) {
    return 'Choose a date and time in the future.'
  }
  const conflict = [...bookings.pending, ...bookings.upcoming].some(
    (booking) => booking.id !== ignoredId && booking.date === date && booking.time === time
  )
  return conflict ? 'You already have a session at this date and time.' : ''
}

export function moveBooking(bookings, booking, destination) {
  const next = {}
  for (const group of Object.keys(bookings)) {
    next[group] = bookings[group].filter((item) => item.id !== booking.id)
  }
  const status = destination === 'upcoming' ? 'confirmed' : 'completed'
  next[destination] = [{ ...booking, status }, ...next[destination]]
  return next
}
