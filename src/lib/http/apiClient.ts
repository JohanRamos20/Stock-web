const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

interface ApiErrorBody {
  error: {
    message: string
    code?: string
    issues?: { path: string; message: string }[]
  }
}

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const data: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const body = data as ApiErrorBody | null
    throw new ApiError(
      body?.error?.message ?? 'Erro inesperado ao comunicar com o servidor.',
      response.status,
      body?.error?.code,
    )
  }

  return data as T
}

interface DownloadResult {
  blob: Blob
  fileName: string
}

function fileNameFromDisposition(disposition: string | null, fallback: string): string {
  const match = disposition?.match(/filename="?([^"]+)"?/)
  return match?.[1] ?? fallback
}

export async function apiRequestBlob(path: string, options: { token?: string } = {}): Promise<DownloadResult> {
  const headers: Record<string, string> = {}
  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { headers })

  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null)
    const body = data as ApiErrorBody | null
    throw new ApiError(
      body?.error?.message ?? 'Erro inesperado ao comunicar com o servidor.',
      response.status,
      body?.error?.code,
    )
  }

  const blob = await response.blob()
  const fileName = fileNameFromDisposition(response.headers.get('Content-Disposition'), 'documento.pdf')
  return { blob, fileName }
}
