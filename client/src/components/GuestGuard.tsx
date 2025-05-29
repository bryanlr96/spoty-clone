import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const { loading, authenticated } = useAuth()

  if (loading) return <div>Cargando...</div>

  return authenticated ? <Navigate to="/" replace /> : <>{children}</>
}
