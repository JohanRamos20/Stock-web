export interface WithdrawalSlipMaterialDto {
  name: string
  category: string
  quantity: number
  unit: string
}

export interface WithdrawalSlipDto {
  requestId: number
  requesterName: string
  sector: string
  deadline: string
  createdAt: string
  requestedByAdminName: string | null
  observacoes: string | null
  materials: WithdrawalSlipMaterialDto[]
}
