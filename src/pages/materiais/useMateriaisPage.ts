import { useEffect, useState } from 'react'
import * as materialsApi from '../../api/materials/materialsApi'
import { useAuth } from '../../data/auth/AuthContext'
import { useCart } from '../../data/cart/CartContext'
import { getErrorMessage } from '../../lib/http/errorMessage'
import type { Material } from '../../types/stock'

const PAGE_SIZE = 10

export function useMateriaisPage() {
  const { session } = useAuth()
  const token = session?.token ?? ''
  const cart = useCart()
  const [materials, setMaterials] = useState<Material[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [qty, setQty] = useState<Record<string, string>>({})

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim())
      setPage(1)
    }, 300)
    return () => window.clearTimeout(timeout)
  }, [search])

  useEffect(() => {
    if (!token) return
    let cancelled = false
    setIsLoading(true)
    materialsApi
      .listMaterialsPage({ page, limit: PAGE_SIZE, q: debouncedSearch || undefined }, token)
      .then((result) => {
        if (cancelled) return
        setMaterials(result.data)
        setTotal(result.total)
        setTotalPages(result.totalPages)
        if (page > Math.max(1, result.totalPages)) setPage(Math.max(1, result.totalPages))
      })
      .catch((error: unknown) => {
        if (!cancelled) setMessage(getErrorMessage(error, 'Não foi possível carregar o catálogo de materiais.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => { cancelled = true }
  }, [token, page, debouncedSearch])

  function handleQtyChange(materialId: string, value: string) { setQty((prev) => ({ ...prev, [materialId]: value })) }
  function handleAdd(material: Material) {
    const requested = Math.max(1, parseInt(qty[material.id] ?? '', 10) || 1)
    cart.addItem(material, requested)
    setQty((prev) => ({ ...prev, [material.id]: '' }))
  }

  return { materials, total, page, setPage, totalPages, isLoading, message, search, setSearch, qty, handleQtyChange, handleAdd, cartCount: cart.count }
}
