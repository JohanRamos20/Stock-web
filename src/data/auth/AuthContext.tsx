import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { LoginCredentials, Session, User } from '../../types/auth'
import { authService } from '../../api/auth'

type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'unauthenticated'

interface AuthContextValue {
  user: User | null
  session: Session | null
  status: AuthStatus
  login: (credentials: LoginCredentials) => Promise<Session>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('idle')

  useEffect(() => {
    const existing = authService.getSession()
    setSession(existing)
    setStatus(existing ? 'authenticated' : 'unauthenticated')
  }, [])

  async function login(credentials: LoginCredentials) {
    setStatus('authenticating')
    try {
      const newSession = await authService.login(credentials)
      setSession(newSession)
      setStatus('authenticated')
      return newSession
    } catch (error) {
      setStatus('unauthenticated')
      throw error
    }
  }

  async function logout() {
    await authService.logout()
    setSession(null)
    setStatus('unauthenticated')
  }

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, session, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return ctx
}
