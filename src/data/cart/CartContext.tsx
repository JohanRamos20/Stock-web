import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Material, MaterialCategory, MaterialUnitType } from '../../types/stock'

export interface CartItem {
  materialId: string
  name: string
  category: MaterialCategory
  unitType: MaterialUnitType
  amount: number
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  totalUnits: number
  editingRequestId: string | null
  addItem: (material: Material, quantity: number) => void
  updateQuantity: (materialId: string, quantity: number) => void
  removeItem: (materialId: string) => void
  clear: () => void
  startEditing: (requestId: string, items: CartItem[]) => void
  cancelEditing: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function clamp(quantity: number, amount: number): number {
  return Math.min(Math.max(1, quantity), amount)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [editingRequestId, setEditingRequestId] = useState<string | null>(null)

  function addItem(material: Material, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((item) => item.materialId === material.id)
      if (existing) {
        return prev.map((item) =>
          item.materialId === material.id
            ? { ...item, quantity: clamp(item.quantity + quantity, material.amount) }
            : item,
        )
      }
      return prev.concat({
        materialId: material.id,
        name: material.name,
        category: material.category,
        unitType: material.unitType,
        amount: material.amount,
        quantity: clamp(quantity, material.amount),
      })
    })
  }

  function updateQuantity(materialId: string, quantity: number) {
    setItems((prev) =>
      prev.map((item) => (item.materialId === materialId ? { ...item, quantity: clamp(quantity, item.amount) } : item)),
    )
  }

  function removeItem(materialId: string) {
    setItems((prev) => prev.filter((item) => item.materialId !== materialId))
  }

  function clear() {
    setItems([])
  }

  function startEditing(requestId: string, editItems: CartItem[]) {
    setItems(editItems)
    setEditingRequestId(requestId)
  }

  function cancelEditing() {
    setItems([])
    setEditingRequestId(null)
  }

  const count = items.length
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        totalUnits,
        editingRequestId,
        addItem,
        updateQuantity,
        removeItem,
        clear,
        startEditing,
        cancelEditing,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return ctx
}
