import { apiRequest } from '../../lib/http/apiClient'
import type { WithdrawalSlipDto } from '../../types/withdrawalSlip'

export function getWithdrawalSlip(requestId: string, token: string): Promise<WithdrawalSlipDto> {
  return apiRequest<WithdrawalSlipDto>(`/requests/${requestId}/withdrawal-slip`, { token })
}
