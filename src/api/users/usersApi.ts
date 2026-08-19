import { apiRequest } from '../../lib/http/apiClient'
import type { ApiRole, Sector, Session, User } from '../../types/auth'
import { mapApiUser, type ApiUser } from './usersMapper'

interface LoginPayload {
  email: string
  password: string
}

interface CreateUserPayload {
  name: string
  email: string
  siapp: string
  role: ApiRole
  sector: Sector
}

interface ChangePasswordPayload {
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

export async function createUser(payload: CreateUserPayload, token: string): Promise<User> {
  const apiUser = await apiRequest<ApiUser>('/users', { method: 'POST', body: payload, token })
  return mapApiUser(apiUser)
}

export async function listUsers(token: string): Promise<User[]> {
  const apiUsers = await apiRequest<ApiUser[]>('/users', { token })
  return apiUsers.map(mapApiUser)
}

export function changePassword(payload: ChangePasswordPayload): Promise<void> {
  return apiRequest<void>('/users/password/reset', { method: 'POST', body: payload })
}

export function resetUserPassword(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/users/${id}/password/reset`, { method: 'PATCH', token })
}
