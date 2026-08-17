import { apiRequest } from '../../lib/http/apiClient'
import type { Material, MaterialCategory, MaterialUnitType } from '../../types/stock'

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

export function createMaterial(payload: MaterialPayload, token: string): Promise<Material> {
  return apiRequest<Material>('/materials', { method: 'POST', body: payload, token })
}

export function updateMaterial(id: string, payload: UpdateMaterialPayload, token: string): Promise<Material> {
  return apiRequest<Material>(`/materials/${id}`, { method: 'PATCH', body: payload, token })
}

export function deleteMaterial(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/materials/${id}`, { method: 'DELETE', token })
}
