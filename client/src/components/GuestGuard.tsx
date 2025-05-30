import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const { loading, authData} = useAuthContext()

  if (loading) return <div>Cargando...</div>

  return authData?.authenticated ? <Navigate to="/" replace /> : <>{children}</>
}
