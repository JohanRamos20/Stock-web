import { useState } from 'react'
import * as requestsApi from '../../api/requests/requestsApi'
import { useAuth } from '../../data/auth/AuthContext'
import { useCart, type CartItem } from '../../data/cart/CartContext'

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
  const { items, totalUnits, updateQuantity, removeItem, clear } = useCart()
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [sent, setSent] = useState(false)
  const [sentMessage, setSentMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setError(null)
    setIsSubmitting(true)
    try {
      await requestsApi.createRequest(
        { materials: items.map((item) => ({ materialId: item.materialId, quantity: item.quantity })) },
        token,
      )
      setSentMessage(
        `Solicitação enviada com sucesso — ${materialsCount} ${materialsCount === 1 ? 'material' : 'materiais'}, ${units} ${units === 1 ? 'unidade' : 'unidades'}. Encaminhada ao almoxarifado.`,
      )
      clear()
      setSent(true)
    } catch (submitError) {
      setError(errorMessage(submitError, 'Não foi possível enviar a solicitação.'))
    } finally {
      setIsSubmitting(false)
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
    user,
    items,
    totalUnits,
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
    closeConfirm,
    runConfirm,
    unitsLabel,
    itemsLabel,
  }
}
