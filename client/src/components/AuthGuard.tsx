import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, authData } = useAuthContext()

  if (loading) return <div>Cargando...</div>

  return authData?.authenticated? <>{children}</> : <Navigate to="/login" replace />
}
