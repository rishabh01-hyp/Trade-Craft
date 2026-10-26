// Storage is optional: blocked storage or invalid JSON must not crash the app.
export function readStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    const value = raw === null ? fallback : JSON.parse(raw)
    return hasSameShape(value, fallback) ? value : fallback
  } catch {
    return fallback
  }
}

function hasSameShape(value, fallback) {
  if (fallback === null) return value === null || (typeof value === 'object' && typeof value.rollNo === 'string')
  if (Array.isArray(fallback)) return Array.isArray(value)
  if (typeof fallback === 'object') {
    return value !== null && typeof value === 'object' &&
      Object.keys(fallback).every((key) => hasSameShape(value[key], fallback[key]))
  }
  return typeof value === typeof fallback
}

export function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
