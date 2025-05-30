import { createContext, useState, useEffect, type ReactNode } from 'react'
import { type AuthData } from '../types/SpotifyTypes'

interface AuthContextType {
  authData: AuthData | null
  setAuthData: (data: AuthData | null) => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data: AuthData) => {
        setAuthData(data)
      })
      .catch(() => {
        setAuthData(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthContext.Provider value={{ authData, setAuthData, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
