import { useEffect, useState } from 'react'
import * as materialsApi from '../../api/materials/materialsApi'
import { useAuth } from '../../data/auth/AuthContext'
import { useCart } from '../../data/cart/CartContext'
import { getErrorMessage } from '../../lib/http/errorMessage'
import type { Material } from '../../types/stock'

export function useMateriaisPage() {
  const { session } = useAuth()
  const token = session?.token ?? ''
  const cart = useCart()

  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [qty, setQty] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!token) return

    let cancelled = false
    setIsLoading(true)
    materialsApi
      .listMaterials(token)
      .then((data) => {
        if (!cancelled) setMaterials(data)
      })
      .catch((error: unknown) => {
        if (!cancelled) setMessage(getErrorMessage(error, 'Não foi possível carregar o catálogo de materiais.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

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
    isLoading,
    message,
    search,
    setSearch,
    qty,
    handleQtyChange,
    handleAdd,
    cartCount: cart.count,
  }
}
