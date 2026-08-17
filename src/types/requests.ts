import type { MaterialCategory, MaterialUnitType } from './stock'

export type RequestStatus = 'PENDING' | 'COMPLETED' | 'CANCELED'

export interface RequestMaterialDto {
  materialId: string
  name: string
  category: MaterialCategory
  unitType: MaterialUnitType
  quantity: number
}

export interface RequestDto {
  id: string
  userId: string
  prazo: string
  status: RequestStatus
  materials: RequestMaterialDto[]
  createdAt: string
  updatedAt: string
}
