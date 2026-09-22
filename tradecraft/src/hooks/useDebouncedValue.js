import { useEffect, useState } from 'react'

// Delays updating a value until the input has stopped changing for
// `delayMs`. Used to debounce search inputs so the API is not called
// on every keystroke.
export function useDebouncedValue(value, delayMs = 350) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}

export default useDebouncedValue