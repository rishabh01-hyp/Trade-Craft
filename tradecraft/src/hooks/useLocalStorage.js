import { useEffect, useState } from 'react'
import { readStored, writeStored } from '../services/storage'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStored(key, initialValue))
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    // Persist after React commits; state updater functions stay pure.
    const success = writeStored(key, value)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(success)
  }, [key, value])

  return [value, setValue, saved]
}
