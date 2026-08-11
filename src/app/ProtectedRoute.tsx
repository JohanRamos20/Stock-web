import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../data/auth/AuthContext'
import { ROUTES } from './paths'

/** Guarda pathless: exige sessão autenticada antes de renderizar os filhos via <Outlet/>. */
export function ProtectedRoute() {
  const { user, status } = useAuth()
  const location = useLocation()

  if (status === 'idle') {
    return null
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />
  }

  return <Outlet />
}
