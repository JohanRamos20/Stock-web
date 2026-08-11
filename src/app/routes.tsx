import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { HomePage } from '../pages/home/HomePage'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from './paths'

export const router = createBrowserRouter([
  { path: ROUTES.login, element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [{ path: ROUTES.home, element: <HomePage /> }],
  },
  { path: '*', element: <Navigate to={ROUTES.login} replace /> },
])
