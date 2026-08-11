import type { User } from '../types/auth'

/** Senha única para todas as contas de exemplo (ambiente de desenvolvimento). */
export const MOCK_PASSWORD = '123456'

interface MockAccount extends User {
  password: string
}

/**
 * Contas de exemplo extraídas de data/modelo-de-dados.md do design handoff.
 * Servem apenas para validar o fluxo de login mockado.
 */
export const mockUsers: MockAccount[] = [
  {
    id: 'srv-1873220',
    name: 'Ana Paula Vieira',
    email: 'ana.vieira@ifce.edu.br',
    sector: 'Coordenadoria de Ensino',
    role: 'servidor',
    password: MOCK_PASSWORD,
  },
  {
    id: 'srv-2041188',
    name: 'Carlos Henrique Braga',
    email: 'carlos.braga@ifce.edu.br',
    sector: 'Laboratório de Química',
    role: 'servidor',
    password: MOCK_PASSWORD,
  },
  {
    id: 'adm-1904772',
    name: 'Marina Cavalcante',
    email: 'marina.cavalcante@ifce.edu.br',
    sector: 'Almoxarifado',
    role: 'admin',
    password: MOCK_PASSWORD,
  },
]
