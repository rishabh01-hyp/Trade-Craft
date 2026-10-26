import { useEffect, useState, useCallback } from 'react'

export function useFetchData(load, deps) {
  const [attempt, setAttempt] = useState(0)
  const requestKey = JSON.stringify([deps, attempt])
  const [result, setResult] = useState({ key: null, data: null, error: null })

  useEffect(() => {
    let cancelled = false

    Promise.resolve().then(load)
      .then((data) => {
        if (!cancelled) setResult({ key: requestKey, data, error: null })
      })
      .catch((error) => {
        if (!cancelled) setResult({ key: requestKey, data: null, error })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  return {
    data: result.key === requestKey ? result.data : null,
    loading: result.key !== requestKey,
    error: result.key === requestKey ? result.error : null,
    retry,
  }
}
