import { apiRequest } from '../../lib/http/apiClient'
import type { RequestDto } from '../../types/requests'

interface CreateRequestPayload {
  materials: { materialId: string; quantity: number }[]
}

export function createRequest(payload: CreateRequestPayload, token: string): Promise<RequestDto> {
  return apiRequest<RequestDto>('/requests', { method: 'POST', body: payload, token })
}
