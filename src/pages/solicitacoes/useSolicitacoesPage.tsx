import { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import * as requestsApi from '../../api/requests/requestsApi'
import * as withdrawalSlipApi from '../../api/requests/withdrawalSlipApi'
import * as usersApi from '../../api/users/usersApi'
import { useAuth } from '../../data/auth/AuthContext'
import { openBlobInNewTab } from '../../lib/download'
import { WithdrawalSlipDocument } from '../../pdf/WithdrawalSlipDocument'
import type { RequestDto, RequestStatus } from '../../types/requests'
import type { User } from '../../types/auth'

export type StatusFilter = 'ALL' | RequestStatus

const REQUESTS_PAGE_SIZE = 200

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export interface RequestRowData {
  request: RequestDto
  requesterName: string
  requesterSector: string
  completedByName: string | null
}

export function useSolicitacoesPage() {
  const { session } = useAuth()
  const token = session?.token ?? ''

  const [requests, setRequests] = useState<RequestDto[]>([])
  const [usersById, setUsersById] = useState<Map<string, User>>(new Map())
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [openId, setOpenId] = useState<string | null>(null)
  const [completingId, setCompletingId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [pdfNotice, setPdfNotice] = useState<string | null>(null)
  const [pdfDone, setPdfDone] = useState<Record<string, boolean>>({})
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false
    setIsLoading(true)
    Promise.all([requestsApi.listAllRequests({ page: 1, limit: REQUESTS_PAGE_SIZE }, token), usersApi.listUsers(token)])
      .then(([page, users]) => {
        if (cancelled) return
        setRequests(page.data)
        setUsersById(new Map(users.map((user) => [user.id, user])))
      })
      .catch((error: unknown) => {
        if (!cancelled) setLoadError(errorMessage(error, 'Não foi possível carregar as solicitações.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const rows: RequestRowData[] = requests.map((request) => {
    const user = usersById.get(request.userId)
    const completedByName = request.status === 'COMPLETED' ? request.adminName : null
    return {
      request,
      requesterName: user?.name ?? 'Servidor não encontrado',
      requesterSector: user?.sector ?? '—',
      completedByName,
    }
  })

  const query = search.trim().toLowerCase()
  const filteredRows = rows.filter((row) => {
    if (statusFilter !== 'ALL' && row.request.status !== statusFilter) return false
    if (!query) return true
    const haystack = `${row.requesterName}${row.requesterSector}${row.request.materials
      .map((material) => material.name)
      .join(' ')}`.toLowerCase()
    return haystack.includes(query)
  })

  const registered = requests.length
  const unitsMoved = requests.reduce(
    (sum, request) => sum + request.materials.reduce((materialSum, material) => materialSum + material.quantity, 0),
    0,
  )
  const requesters = new Set(requests.map((request) => request.userId)).size

  function toggleExpand(id: string) {
    setOpenId((prev) => (prev === id ? null : id))
    setPdfNotice(null)
  }

  async function handleComplete(id: string) {
    if (!pdfDone[id]) return

    setCompletingId(id)
    setActionError(null)
    try {
      const updated = await requestsApi.completeRequest(id, token)
      setRequests((prev) => prev.map((request) => (request.id === id ? updated : request)))
    } catch (error) {
      setActionError(errorMessage(error, 'Não foi possível concluir a solicitação.'))
    } finally {
      setCompletingId(null)
    }
  }

  async function handleGeneratePdf(id: string) {
    setPdfNotice(null)
    setGeneratingPdfId(id)
    try {
      const data = await withdrawalSlipApi.getWithdrawalSlip(id, token)
      const blob = await pdf(<WithdrawalSlipDocument data={data} />).toBlob()
      openBlobInNewTab(blob)
      setPdfDone((prev) => ({ ...prev, [id]: true }))
    } catch (error) {
      setPdfNotice(errorMessage(error, 'Não foi possível gerar o termo de retirada.'))
    } finally {
      setGeneratingPdfId(null)
    }
  }

  return {
    isLoading,
    loadError,
    actionError,
    pdfNotice,
    rows,
    filteredRows,
    registered,
    unitsMoved,
    requesters,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    openId,
    toggleExpand,
    completingId,
    pdfDone,
    generatingPdfId,
    handleComplete,
    handleGeneratePdf,
  }
}
