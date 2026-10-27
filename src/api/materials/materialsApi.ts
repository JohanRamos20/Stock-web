import { apiRequest } from '../../lib/http/apiClient'
import type { Material, MaterialCategory, MaterialUnitType, PaginatedMaterialsDto } from '../../types/stock'

interface MaterialPayload {
  name: string
  category: MaterialCategory
  location: string
  amount: number
  unitType: MaterialUnitType
}

type UpdateMaterialPayload = Partial<MaterialPayload>

export function listMaterials(token: string): Promise<Material[]> {
  return apiRequest<Material[]>('/materials', { token })
}

export function listMaterialsPage(
  params: { page: number; limit: number; q?: string },
  token: string,
): Promise<PaginatedMaterialsDto> {
  const search = new URLSearchParams({ page: String(params.page), limit: String(params.limit) })
  if (params.q) search.set('q', params.q)
  return apiRequest<PaginatedMaterialsDto>(`/materials?${search}`, { token })
}

export function createMaterial(payload: MaterialPayload, token: string): Promise<Material> {
  return apiRequest<Material>('/materials', { method: 'POST', body: payload, token })
}

export function updateMaterial(id: string, payload: UpdateMaterialPayload, token: string): Promise<Material> {
  return apiRequest<Material>(`/materials/${id}`, { method: 'PATCH', body: payload, token })
}

export function deleteMaterial(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/materials/${id}`, { method: 'DELETE', token })
}
