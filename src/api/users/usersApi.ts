import { apiRequest } from '../../lib/http/apiClient'
import type { Role, Sector, Session, User } from '../../types/auth'
import { mapApiUser, type ApiUser } from './usersMapper'

interface LoginPayload {
  email: string
  password: string
}

interface CreateUserPayload {
  name: string
  email: string
  role: Role
  sector: Sector
}

interface ResetPasswordPayload {
  email: string
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

interface ApiSession {
  user: ApiUser
  token: string
}

export async function login(payload: LoginPayload): Promise<Session> {
  const session = await apiRequest<ApiSession>('/users/login', { method: 'POST', body: payload })
  return { user: mapApiUser(session.user), token: session.token }
}

export async function getMe(token: string): Promise<User> {
  const apiUser = await apiRequest<ApiUser>('/users/me', { token })
  return mapApiUser(apiUser)
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const apiUser = await apiRequest<ApiUser>('/users', { method: 'POST', body: payload })
  return mapApiUser(apiUser)
}

export async function listUsers(token: string): Promise<User[]> {
  const apiUsers = await apiRequest<ApiUser[]>('/users', { token })
  return apiUsers.map(mapApiUser)
}

export function resetPassword(payload: ResetPasswordPayload): Promise<void> {
  return apiRequest<void>('/users/password/reset', { method: 'POST', body: payload })
}
