import { Navigate } from 'react-router-dom'
import { useAuth } from '../data/auth/AuthContext'
import { isAdminRole } from '../lib/auth/role'
import { ROUTES } from './paths'

/** Rota índice do shell: redireciona para a tela inicial do papel do usuário. */
export function RoleLanding() {
  const { user } = useAuth()
  if (!user) return null

  return <Navigate to={isAdminRole(user.role) ? ROUTES.dashboard : ROUTES.materiais} replace />
}
