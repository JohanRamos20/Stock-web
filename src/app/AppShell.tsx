import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import { useAuth } from '../data/auth/AuthContext'
import { useCart } from '../data/cart/CartContext'
import { getRoleLabel, isAdminRole } from '../lib/auth/role'
import type { Role } from '../types/auth'
import { ROUTES } from './paths'

type NavItem = {
  label: string
  to: string
  roles: readonly Role[]
  hidden: boolean
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', to: ROUTES.dashboard, roles: ['admin'], hidden: false },
  { label: 'Solicitar Materiais', to: ROUTES.materiais, roles: ['admin'], hidden: false },
  { label: 'Solicitação de Materiais', to: ROUTES.materiais, roles: ['servidor'], hidden: false },
  { label: 'Solicitação', to: ROUTES.carrinho, roles: ['admin', 'servidor'], hidden: true },
  { label: 'Estoque', to: ROUTES.estoque, roles: ['admin'], hidden: false },
  { label: 'Solicitações dos servidores', to: ROUTES.solicitacoes, roles: ['admin'], hidden: false },
  { label: 'Registro de Servidores', to: ROUTES.servidores, roles: ['admin'], hidden: false },
  { label: 'Minhas Solicitações', to: ROUTES.minhasSolicitacoes, roles: ['servidor'], hidden: false },
]

function matchesRole(itemRoles: readonly Role[], role: Role): boolean {
  return itemRoles.includes(role)
}

export function AppShell() {
  const { user, logout } = useAuth()
  const { count: cartCount } = useCart()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!user) return null

  const currentUser = user
  const role: Role = isAdminRole(user.role) ? 'admin' : 'servidor'
  const navItems = NAV_ITEMS.filter((item) => !item.hidden && matchesRole(item.roles, role))
  const pageTitle = NAV_ITEMS.find((item) => item.to === location.pathname && matchesRole(item.roles, role))?.label ?? ''

  function renderNavigation(mobile = false) {
    return (
      <>
        <div className="px-5 pt-5 pb-4 border-b-2 border-divider">
          <div className="font-heading font-extrabold text-[17px] tracking-[-0.01em]">Stock</div>
          <div className="text-muted text-[11px] tracking-[0.1em] uppercase">Campus Jaguaribe</div>
        </div>

        <div className="px-5 py-2.5 border-b-2 border-divider bg-accent-100">
          <div className="text-muted text-[10px] tracking-[0.12em] uppercase">Perfil de acesso</div>
          <div className="font-heading font-extrabold text-[13px] text-accent-700">{getRoleLabel(currentUser.role)}</div>
        </div>

        <nav className="flex flex-col py-3 gap-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={mobile ? () => setIsMenuOpen(false) : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-2.5 text-sm font-heading font-extrabold no-underline border-l-[3px] ${
                  isActive ? 'text-accent-700 border-accent bg-accent-100' : 'text-text border-transparent'
                }`
              }
            >
              {item.label}
              {item.to === ROUTES.carrinho && cartCount > 0 && <Tag>{cartCount}</Tag>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-5 py-4 border-t-2 border-divider">
          <div className="font-heading font-extrabold text-[13px]">{currentUser.name}</div>
          <div className="text-muted text-[11px] mb-2.5">{currentUser.sector}</div>
          <Button
            type="button"
            variant="secondary"
            block
            onClick={() => {
              setIsMenuOpen(false)
              void logout()
            }}
          >
            Sair
          </Button>
        </div>
      </>
    )
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden md:flex w-[248px] flex-none bg-white border-r-2 border-divider flex-col">{renderNavigation()}</aside>

      {isMenuOpen && (
        <div className="fixed inset-0 z-20 md:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 w-full bg-neutral-900/50 border-0 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          />
          <aside className="relative w-[min(248px,calc(100vw-2rem))] min-h-full bg-white border-r-2 border-divider flex flex-col shadow-lg">
            <button
              type="button"
              aria-label="Fechar menu"
              className="absolute top-3 right-3 p-1.5 bg-transparent border-0 cursor-pointer text-text"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={20} aria-hidden="true" />
            </button>
            {renderNavigation(true)}
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white px-4 md:px-8 py-3.5 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            className="md:hidden p-1.5 -ml-1.5 bg-transparent border-0 cursor-pointer text-text"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
          <div className="text-[15px] tracking-[0.1em] uppercase text-accent-700">{pageTitle}</div>
          <div className="hidden sm:flex items-center gap-3">
            <Tag>{getRoleLabel(user.role)}</Tag>
            <span className="text-muted text-xs">Exercício {new Date().getFullYear()}</span>
          </div>
        </header>

        <div className="p-4 sm:p-6 md:p-8 max-w-[1240px] w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
