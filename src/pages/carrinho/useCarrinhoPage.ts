import { useEffect, useState } from 'react'
import * as requestsApi from '../../api/requests/requestsApi'
import * as usersApi from '../../api/users/usersApi'
import { useAuth } from '../../data/auth/AuthContext'
import { useCart, type CartItem } from '../../data/cart/CartContext'
import { isAdminRole } from '../../lib/auth/role'
import type { User } from '../../types/auth'

interface ConfirmState {
  title: string
  body: string
  actionLabel: string
  run: () => void
}

function unitsLabel(total: number): string {
  return total === 1 ? '1 unidade' : `${total} unidades`
}

function itemsLabel(total: number): string {
  return total === 1 ? '1 item na requisição' : `${total} itens na requisição`
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useCarrinhoPage() {
  const { user, session } = useAuth()
  const token = session?.token ?? ''
  const isAdmin = isAdminRole(user?.role ?? '')
  const { items, totalUnits, editingRequestId, updateQuantity, removeItem, cancelEditing } = useCart()
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [sent, setSent] = useState(false)
  const [sentMessage, setSentMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [servidores, setServidores] = useState<User[]>([])
  const [selectedServidorId, setSelectedServidorId] = useState<string | null>(null)

  useEffect(() => {
    if (!token || !isAdmin) return

    let cancelled = false
    usersApi
      .listUsers(token)
      .then((data) => {
        if (!cancelled) setServidores(data)
      })
      .catch(() => {
        // lista de servidores é auxiliar; falha aqui não bloqueia a tela
      })

    return () => {
      cancelled = true
    }
  }, [token, isAdmin])

  function handleQuantityChange(item: CartItem, value: string) {
    const parsed = parseInt(value, 10)
    updateQuantity(item.materialId, Number.isNaN(parsed) ? 1 : parsed)
  }

  function handleIncrement(item: CartItem) {
    updateQuantity(item.materialId, item.quantity + 1)
  }

  function handleDecrement(item: CartItem) {
    updateQuantity(item.materialId, item.quantity - 1)
  }

  function handleRemove(item: CartItem) {
    setConfirm({
      title: 'Remover material da solicitação?',
      body: `"${item.name}" será retirado da requisição em montagem.`,
      actionLabel: 'Remover material',
      run: () => removeItem(item.materialId),
    })
  }

  async function handleSubmit() {
    const materialsCount = items.length
    const units = totalUnits
    const materialsPayload = items.map((item) => ({ materialId: item.materialId, quantity: item.quantity }))
    setError(null)
    setIsSubmitting(true)
    try {
      if (editingRequestId) {
        await requestsApi.updateRequest(editingRequestId, { materials: materialsPayload }, token)
        setSentMessage(
          `Solicitação #${editingRequestId.slice(0, 8)} atualizada — ${materialsCount} ${materialsCount === 1 ? 'material' : 'materiais'}, ${units} ${units === 1 ? 'unidade' : 'unidades'}. Reenviada ao almoxarifado.`,
        )
      } else {
        await requestsApi.createRequest(
          { materials: materialsPayload, ...(isAdmin && selectedServidorId ? { userId: selectedServidorId } : {}) },
          token,
        )
        setSentMessage(
          `Solicitação enviada com sucesso — ${materialsCount} ${materialsCount === 1 ? 'material' : 'materiais'}, ${units} ${units === 1 ? 'unidade' : 'unidades'}. Encaminhada ao almoxarifado.`,
        )
      }
      cancelEditing()
      setSelectedServidorId(null)
      setSent(true)
    } catch (submitError) {
      setError(errorMessage(submitError, 'Não foi possível enviar a solicitação.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCancelEdit() {
    cancelEditing()
  }

  function closeConfirm() {
    setConfirm(null)
  }

  function runConfirm() {
    confirm?.run()
    setConfirm(null)
  }

  return {
    user,
    isAdmin,
    servidores,
    selectedServidorId,
    setSelectedServidorId,
    items,
    totalUnits,
    editingRequestId,
    confirm,
    sent,
    sentMessage,
    error,
    isSubmitting,
    handleQuantityChange,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleSubmit,
    handleCancelEdit,
    closeConfirm,
    runConfirm,
    unitsLabel,
    itemsLabel,
  }
}
