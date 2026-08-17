import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../data/auth/AuthContext'
import { isAdminRole } from '../lib/auth/role'
import { defaultRouteForRole, ROUTE_ROLES } from './routeAccess'

/** Guarda pathless: bloqueia acesso direto por URL a rotas fora do papel do usuário. */
export function RoleGuard() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return null

  const requiredRole = ROUTE_ROLES[location.pathname]
  const allowed = !requiredRole || isAdminRole(user.role) === (requiredRole === 'admin')

  if (!allowed) {
    return <Navigate to={defaultRouteForRole(user.role)} replace />
  }

  return <Outlet />
}
