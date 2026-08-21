import { ApiError } from './apiClient'

const DEFAULT_STATUS_MESSAGES: Partial<Record<number, string>> = {
  400: 'Dados formatados incorretamente',
  401: 'Credênciais inválidas. Verifique e-mail e senha',
  403: 'Você não tem permissão para realizar esta ação.',
  404: 'Recurso não encontrado.',
  409: 'Não foi possível concluir a operação por um conflito com dados existentes.',
  422: 'Dados inválidos. Verifique os campos e tente novamente.',
  500: 'Erro interno do servidor. Tente novamente mais tarde.',
}

export function getErrorMessage(
  error: unknown,
  fallback: string,
  statusMessages?: Partial<Record<number, string>>,
): string {
  if (error instanceof ApiError) {
    return (
      statusMessages?.[error.status] ??
      DEFAULT_STATUS_MESSAGES[error.status] ??
      error.message ??
      fallback
    )
  }
  if (error instanceof Error) return error.message
  return fallback
}
