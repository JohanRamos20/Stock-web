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
    nome: 'Ana Paula Vieira',
    matricula: '1873220',
    email: 'ana.vieira@ifce.edu.br',
    setor: 'Coordenadoria de Ensino',
    role: 'servidor',
    password: MOCK_PASSWORD,
  },
  {
    id: 'srv-2041188',
    nome: 'Carlos Henrique Braga',
    matricula: '2041188',
    email: 'carlos.braga@ifce.edu.br',
    setor: 'Laboratório de Química',
    role: 'servidor',
    password: MOCK_PASSWORD,
  },
  {
    id: 'adm-1904772',
    nome: 'Marina Cavalcante',
    matricula: '1904772',
    email: 'marina.cavalcante@ifce.edu.br',
    setor: 'Almoxarifado',
    cargo: 'Almoxarife',
    role: 'admin',
    password: MOCK_PASSWORD,
  },
]
