import type { Role } from '../types/auth'
import { isAdminRole } from '../lib/auth/role'
import { ROUTES } from './paths'

/** Toda rota de conteúdo (fora do índice) precisa estar mapeada aqui; sem entrada = liberada pra ambos os papéis. */
export const ROUTE_ROLES: Partial<Record<string, Role>> = {
  [ROUTES.dashboard]: 'admin',
  [ROUTES.estoque]: 'admin',
  [ROUTES.solicitacoes]: 'admin',
  [ROUTES.servidores]: 'admin',
  [ROUTES.materiais]: 'servidor',
  [ROUTES.carrinho]: 'servidor',
  [ROUTES.minhasSolicitacoes]: 'servidor',
}

export function defaultRouteForRole(role: string): string {
  return isAdminRole(role) ? ROUTES.dashboard : ROUTES.materiais
}
