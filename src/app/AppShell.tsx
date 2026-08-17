import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import { useAuth } from '../data/auth/AuthContext'
import { getRoleLabel, isAdminRole } from '../lib/auth/role'
import { ROUTES } from './paths'
import { ROUTE_ROLES } from './routeAccess'

const NAV_ITEMS = [
  { label: 'Solicitação de Materiais', to: ROUTES.materiais },
  { label: 'Minhas Solicitações', to: ROUTES.minhasSolicitacoes },
  { label: 'Dashboard', to: ROUTES.dashboard },
  { label: 'Estoque', to: ROUTES.estoque },
  { label: 'Solicitações', to: ROUTES.solicitacoes },
  { label: 'Registro de Servidores', to: ROUTES.servidores },
] as const

export function AppShell() {
  const { user, logout } = useAuth()
  const location = useLocation()

  if (!user) return null

  const admin = isAdminRole(user.role)
  const navItems = NAV_ITEMS.filter((item) => ROUTE_ROLES[item.to] === (admin ? 'admin' : 'servidor'))
  const pageTitle = NAV_ITEMS.find((item) => item.to === location.pathname)?.label ?? ''

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-[248px] flex-none bg-white border-r-2 border-divider flex flex-col">
        <div className="px-5 pt-5 pb-4 border-b-2 border-divider">
          <div className="font-heading font-extrabold text-[17px] tracking-[-0.01em]">ALMOXARIFADO</div>
          <div className="text-muted text-[11px] tracking-[0.1em] uppercase">Campus Central</div>
        </div>

        <div className="px-5 py-2.5 border-b-2 border-divider bg-accent-100">
          <div className="text-muted text-[10px] tracking-[0.12em] uppercase">Perfil de acesso</div>
          <div className="font-heading font-extrabold text-[13px] text-accent-700">{getRoleLabel(user.role)}</div>
        </div>

        <nav className="flex flex-col py-3 gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm font-heading font-extrabold no-underline border-l-[3px] ${
                  isActive ? 'text-accent-700 border-accent bg-accent-100' : 'text-text border-transparent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-5 py-4 border-t-2 border-divider">
          <div className="font-heading font-extrabold text-[13px]">{user.name}</div>
          <div className="text-muted text-[11px] mb-2.5">{user.sector}</div>
          <Button type="button" variant="secondary" block onClick={() => void logout()}>
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white px-8 py-3.5 flex items-center justify-between">
          <div className="text-[15px] tracking-[0.1em] uppercase text-accent-700">{pageTitle}</div>
          <div className="flex items-center gap-3">
            <Tag>{getRoleLabel(user.role)}</Tag>
            <span className="text-muted text-xs">Exercício 2026 · Unidade 158/15290</span>
          </div>
        </header>

        <div className="p-8 max-w-[1240px] w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
