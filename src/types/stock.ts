export type MaterialCategory = 'FERRAMENTA' | 'EPI' | 'CONSUMIVEL'

export type MaterialUnitType = 'UNITY' | 'BOX'

export interface Material {
  id: string
  name: string
  category: MaterialCategory
  location: string
  amount: number
  unitType: MaterialUnitType
  isCritical: boolean
  createdAt: string
  updatedAt: string
}

export const CATEGORY_LABELS: Record<MaterialCategory, string> = {
  FERRAMENTA: 'Ferramenta',
  EPI: 'EPI',
  CONSUMIVEL: 'Consumível',
}

export const UNIT_TYPE_LABELS: Record<MaterialUnitType, string> = {
  UNITY: 'Unidade',
  BOX: 'Caixa',
}
