import type { AuthService, LoginCredentials, Session } from '../../types/auth'
import * as usersApi from '../users/usersApi'

const SESSION_KEY = 'almoxarifado:session:v1'

async function login(credentials: LoginCredentials): Promise<Session> {
  const session = await usersApi.login({
    email: credentials.identifier,
    password: credentials.password,
  })
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

export const apiAuthService: AuthService = { login, logout, getSession }
