import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as materialsApi from '../../api/materials/materialsApi'
import * as requestsApi from '../../api/requests/requestsApi'
import { ROUTES } from '../../app/paths'
import { useAuth } from '../../data/auth/AuthContext'
import { useCart, type CartItem } from '../../data/cart/CartContext'
import type { RequestDto } from '../../types/requests'

const REQUESTS_PAGE_SIZE = 200

interface ConfirmState {
  title: string
  body: string
  actionLabel: string
  run: () => void
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useMinhasSolicitacoesPage() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const token = session?.token ?? ''
  const cart = useCart()

  const [requests, setRequests] = useState<RequestDto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false
    setIsLoading(true)
    requestsApi
      .listMyRequests({ page: 1, limit: REQUESTS_PAGE_SIZE }, token)
      .then((page) => {
        if (!cancelled) setRequests(page.data)
      })
      .catch((error: unknown) => {
        if (!cancelled) setLoadError(errorMessage(error, 'Não foi possível carregar suas solicitações.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  function toggleExpand(id: string) {
    setOpenId((prev) => (prev === id ? null : id))
    setMessage(null)
  }

  function handleEdit(request: RequestDto) {
    setConfirm({
      title: 'Editar solicitação?',
      body: `Os materiais da solicitação #${request.id.slice(0, 8)} voltam para a tela de solicitação para você ajustar e reenviar.`,
      actionLabel: 'Editar solicitação',
      run: () => void runEdit(request),
    })
  }

  async function runEdit(request: RequestDto) {
    try {
      const catalog = await materialsApi.listMaterials(token)
      const items: CartItem[] = request.materials.flatMap((material) => {
        const catalogItem = catalog.find((item) => item.id === material.materialId)
        if (!catalogItem || catalogItem.amount <= 0) return []
        return [
          {
            materialId: catalogItem.id,
            name: catalogItem.name,
            category: catalogItem.category,
            unitType: catalogItem.unitType,
            amount: catalogItem.amount,
            quantity: Math.min(material.quantity, catalogItem.amount),
          },
        ]
      })
      cart.startEditing(request.id, items)
      navigate(ROUTES.carrinho)
    } catch (error) {
      setMessage(errorMessage(error, 'Não foi possível carregar os materiais para edição.'))
    }
  }

  function handleDelete(request: RequestDto) {
    setConfirm({
      title: 'Excluir pedido?',
      body: `A solicitação #${request.id.slice(0, 8)} será cancelada e os materiais retornam ao estoque.`,
      actionLabel: 'Excluir pedido',
      run: () => void runDelete(request),
    })
  }

  async function runDelete(request: RequestDto) {
    setDeletingId(request.id)
    try {
      await requestsApi.cancelRequest(request.id, token)
      setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, status: 'CANCELED' } : item)))
      setMessage(`Solicitação #${request.id.slice(0, 8)} excluída.`)
    } catch (error) {
      setMessage(errorMessage(error, 'Não foi possível excluir a solicitação.'))
    } finally {
      setDeletingId(null)
    }
  }

  function closeConfirm() {
    setConfirm(null)
  }

  function runConfirm() {
    confirm?.run()
    setConfirm(null)
  }

  return {
    requests,
    isLoading,
    loadError,
    openId,
    toggleExpand,
    message,
    deletingId,
    confirm,
    handleEdit,
    handleDelete,
    closeConfirm,
    runConfirm,
  }
}
