import { useEffect, useState } from 'react'
import * as materialsApi from '../../api/materials/materialsApi'
import * as requestsApi from '../../api/requests/requestsApi'
import * as usersApi from '../../api/users/usersApi'
import { useAuth } from '../../data/auth/AuthContext'
import { isCriticalStock } from '../../lib/stock'
import type { Material } from '../../types/stock'
import type { RecentRequestData } from './components/RecentRequests'

const REQUESTS_PAGE_SIZE = 200
const RECENT_REQUESTS_COUNT = 4

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useDashboardPage() {
  const { session } = useAuth()
  const token = session?.token ?? ''

  const [itemsCount, setItemsCount] = useState(0)
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [criticalItems, setCriticalItems] = useState<Material[]>([])
  const [openRequests, setOpenRequests] = useState(0)
  const [recentRequests, setRecentRequests] = useState<RecentRequestData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false
    setIsLoading(true)
    Promise.all([
      materialsApi.listMaterials(token),
      requestsApi.listAllRequests({ page: 1, limit: REQUESTS_PAGE_SIZE }, token),
      usersApi.listUsers(token),
    ])
      .then(([materials, requestsPage, users]) => {
        if (cancelled) return

        const usersById = new Map(users.map((user) => [user.id, user]))

        setItemsCount(materials.length)
        setUnitsInStock(materials.reduce((sum, material) => sum + material.amount, 0))
        setCriticalItems(materials.filter(isCriticalStock))
        setOpenRequests(requestsPage.data.filter((request) => request.status === 'PENDING').length)
        setRecentRequests(
          [...requestsPage.data]
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .slice(0, RECENT_REQUESTS_COUNT)
            .map((request) => {
              const user = usersById.get(request.userId)
              return {
                id: request.id,
                requesterName: user?.name ?? 'Servidor não encontrado',
                requesterSector: user?.sector ?? '—',
                itemsCount: request.materials.length,
                status: request.status,
              }
            }),
        )
      })
      .catch((error: unknown) => {
        if (!cancelled) setLoadError(errorMessage(error, 'Não foi possível carregar o painel.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  return {
    itemsCount,
    unitsInStock,
    criticalItems,
    openRequests,
    recentRequests,
    isLoading,
    loadError,
  }
}
