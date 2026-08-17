import { useState } from 'react'
import { useCart } from '../../data/cart/CartContext'
import { mockMaterials } from '../../mocks/materials'
import type { Material } from '../../types/stock'

export function useMateriaisPage() {
  const cart = useCart()
  const [materials] = useState<Material[]>(mockMaterials)
  const [search, setSearch] = useState('')
  const [qty, setQty] = useState<Record<string, string>>({})

  const query = search.trim().toLowerCase()
  const filteredMaterials = materials.filter(
    (material) => !query || `${material.name}${material.category}${material.location}`.toLowerCase().includes(query),
  )

  function handleQtyChange(materialId: string, value: string) {
    setQty((prev) => ({ ...prev, [materialId]: value }))
  }

  function handleAdd(material: Material) {
    const requested = Math.max(1, parseInt(qty[material.id] ?? '', 10) || 1)
    cart.addItem(material, requested)
    setQty((prev) => ({ ...prev, [material.id]: '' }))
  }

  return {
    materials,
    filteredMaterials,
    search,
    setSearch,
    qty,
    handleQtyChange,
    handleAdd,
    cartCount: cart.count,
  }
}
