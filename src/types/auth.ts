export type Role = 'servidor' | 'admin'

export type Sector = 'ADMINISTRATIVE' | 'ACADEMICS'

export interface User {
  id: string
  name: string
  email: string
  sector: string
  role: string
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
