import { apiRequestBlob } from '../../lib/http/apiClient'

export function generateWithdrawalTerm(requestId: string, token: string): Promise<{ blob: Blob; fileName: string }> {
  return apiRequestBlob(`/requests/${requestId}/pdf`, { token })
}
