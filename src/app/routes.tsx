import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/login/LoginPage'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { EstoquePage } from '../pages/estoque/EstoquePage'
import { SolicitacoesPage } from '../pages/solicitacoes/SolicitacoesPage'
import { ServidoresPage } from '../pages/servidores/ServidoresPage'
import { MateriaisPage } from '../pages/materiais/MateriaisPage'
import { MinhasSolicitacoesPage } from '../pages/minhasSolicitacoes/MinhasSolicitacoesPage'
import { AppShell } from './AppShell'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleGuard } from './RoleGuard'
import { RoleLanding } from './RoleLanding'
import { ROUTES } from './paths'

export const router = createBrowserRouter([
  { path: ROUTES.login, element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <RoleLanding /> },
          {
            element: <RoleGuard />,
            children: [
              { path: ROUTES.dashboard, element: <DashboardPage /> },
              { path: ROUTES.estoque, element: <EstoquePage /> },
              { path: ROUTES.solicitacoes, element: <SolicitacoesPage /> },
              { path: ROUTES.servidores, element: <ServidoresPage /> },
              { path: ROUTES.materiais, element: <MateriaisPage /> },
              { path: ROUTES.minhasSolicitacoes, element: <MinhasSolicitacoesPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to={ROUTES.login} replace /> },
])
