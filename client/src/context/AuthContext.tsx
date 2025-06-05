import { createContext, useState, useEffect, type ReactNode } from 'react'
import { type AuthData, type Track } from '../types/SpotifyTypes'
import { removeDuplicatesById } from '../utils/removeDuplicates'

type AuthContextType = {
  authData: AuthData | null
  setAuthData: (data: AuthData | null) => void
  currentSong: Track | null
  setCurrentSong: (song: Track | null) => void
  loading: boolean
  currentPlaylist: Track[]
  setCurrentPlaylist: (value: React.SetStateAction<Track[]>) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [currentSong, setCurrentSong] = useState<Track | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([])

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

  useEffect(() => {
    if (authData?.recentlyPlayed?.length) {
      setCurrentPlaylist(removeDuplicatesById(authData.recentlyPlayed))
    }
  }, [authData])

  return (
    <AuthContext.Provider value={{ authData, setAuthData,currentSong, setCurrentSong, loading, currentPlaylist, setCurrentPlaylist }}>
      {children}
    </AuthContext.Provider>
  )
}
