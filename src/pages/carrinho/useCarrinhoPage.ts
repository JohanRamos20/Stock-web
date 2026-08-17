import { useState } from 'react'
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

export function useCarrinhoPage() {
  const { user } = useAuth()
  const { items, totalUnits, updateQuantity, removeItem, clear } = useCart()
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [sent, setSent] = useState(false)
  const [sentMessage, setSentMessage] = useState<string | null>(null)

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

  function handleSubmit() {
    const materialsCount = items.length
    const units = totalUnits
    setSentMessage(
      `Solicitação enviada com sucesso — ${materialsCount} ${materialsCount === 1 ? 'material' : 'materiais'}, ${units} ${units === 1 ? 'unidade' : 'unidades'}. Encaminhada ao almoxarifado.`,
    )
    clear()
    setSent(true)
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
