import type { AuthService, LoginCredentials, Session, User } from '../../types/auth'
import { mockUsers } from '../../mocks/users'

const SESSION_KEY = 'almoxarifado:session:v1'
const MOCK_LATENCY_MS = 600

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

async function login(credentials: LoginCredentials): Promise<Session> {
  await delay(MOCK_LATENCY_MS)

  const identifier = credentials.identifier.trim()
  const account = mockUsers.find(
    (candidate) =>
      candidate.matricula === identifier ||
      candidate.email.toLowerCase() === identifier.toLowerCase(),
  )

  if (!account || account.password !== credentials.password) {
    throw new Error('Matrícula/e-mail ou senha inválidos.')
  }

  if (account.role !== credentials.role) {
    throw new Error('Perfil selecionado não corresponde às credenciais informadas.')
  }

  const user: User = {
    id: account.id,
    nome: account.nome,
    matricula: account.matricula,
    email: account.email,
    setor: account.setor,
    cargo: account.cargo,
    role: account.role,
  }

  const session: Session = { user, token: crypto.randomUUID() }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

async function logout(): Promise<void> {
  localStorage.removeItem(SESSION_KEY)
}

function getSession(): Session | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Session
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export const mockAuthService: AuthService = { login, logout, getSession }


