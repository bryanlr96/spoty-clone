import { createContext, useState, useEffect, type ReactNode } from 'react'
import { type AuthData, type Track } from '../types/SpotifyTypes'

type AuthContextType = {
  authData: AuthData | null
  setAuthData: (data: AuthData | null) => void
  currentSong: Track | null
  setCurrentSong: (song: Track | null) => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [currentSong, setCurrentSong] = useState<Track | null>(null)
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

  useEffect(() => {
    if (authData?.recentlyPlayed?.length) {
      setCurrentSong(authData.recentlyPlayed[0])
    }
  }, [authData])

  return (
    <AuthContext.Provider value={{ authData, setAuthData,currentSong, setCurrentSong, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
