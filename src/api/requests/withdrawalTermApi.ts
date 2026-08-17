/**
 * Geração do termo de retirada em PDF ainda não existe na Stock-api (não documentado em
 * docs/request-feature.md). Quando o endpoint existir, trocar o corpo desta função pela
 * chamada real (ex.: apiRequest<Blob>(`/requests/${requestId}/withdrawal-term`, { token }))
 * e disparar o download do blob — nenhuma outra parte da UI precisa mudar.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- assinatura já pronta pro endpoint real
export async function generateWithdrawalTerm(requestId: string, token: string): Promise<void> {
  throw new Error('Geração do termo de retirada ainda não está disponível.')
}
