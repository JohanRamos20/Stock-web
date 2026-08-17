import { apiRequest } from '../../lib/http/apiClient'
import type { PaginatedRequestsDto, RequestDto } from '../../types/requests'

interface CreateRequestPayload {
  materials: { materialId: string; quantity: number }[]
}

export function createRequest(payload: CreateRequestPayload, token: string): Promise<RequestDto> {
  return apiRequest<RequestDto>('/requests', { method: 'POST', body: payload, token })
}

export function listAllRequests(params: { page: number; limit: number }, token: string): Promise<PaginatedRequestsDto> {
  return apiRequest<PaginatedRequestsDto>(`/requests/all?page=${params.page}&limit=${params.limit}`, { token })
}

export function completeRequest(id: string, token: string): Promise<RequestDto> {
  return apiRequest<RequestDto>(`/requests/${id}/complete`, { method: 'PATCH', token })
}
