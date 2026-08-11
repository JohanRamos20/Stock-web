export type Role = 'servidor' | 'admin'

export interface User {
  id: string
  nome: string
  matricula: string
  email: string
  setor: string
  cargo?: string
  role: Role
}

export interface Session {
  user: User
  token: string
}

export interface LoginCredentials {
  identifier: string
  password: string
  role: Role
  keepConnected?: boolean
}

export interface AuthService {
  login(credentials: LoginCredentials): Promise<Session>
  logout(): Promise<void>
  getSession(): Session | null
}
