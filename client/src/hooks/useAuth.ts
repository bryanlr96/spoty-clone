import { useEffect, useState } from 'react'

export function useAuth() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    fetch('/api/auth', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setAuthenticated(data.authenticated)
      })
      .catch(() => {
        setAuthenticated(false)
      })
      .finally(() => setLoading(false))
  }, [])

  return { loading, authenticated }
}
