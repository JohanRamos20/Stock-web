import { Navigate } from 'react-router-dom'
import { useAuth } from '../data/auth/AuthContext'
import { defaultRouteForRole } from './routeAccess'

/** Rota índice do shell: redireciona para a tela inicial do papel do usuário. */
export function RoleLanding() {
  const { user } = useAuth()
  if (!user) return null

  return <Navigate to={defaultRouteForRole(user.role)} replace />
}
