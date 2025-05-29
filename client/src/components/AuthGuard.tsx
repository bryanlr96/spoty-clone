// src/components/AuthGuard.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { loading, authenticated } = useAuth()

  if (loading) return <div>Cargando...</div>

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />
}
