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
  adminId: string | null
  adminName: string | null
  prazo: string
  status: RequestStatus
  materials: RequestMaterialDto[]
  createdAt: string
  updatedAt: string
}

export interface PaginatedRequestsDto {
  data: RequestDto[]
  total: number
  page: number
  totalPages: number
}

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: 'Em análise',
  COMPLETED: 'Atendida',
  CANCELED: 'Cancelada',
}

export const REQUEST_STATUS_TAG_VARIANT: Record<RequestStatus, 'accent' | 'neutral' | 'outline'> = {
  PENDING: 'outline',
  COMPLETED: 'accent',
  CANCELED: 'neutral',
}
