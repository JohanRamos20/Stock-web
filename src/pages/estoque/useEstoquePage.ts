import { useEffect, useState, type FormEvent } from 'react'
import * as materialsApi from '../../api/materials/materialsApi'
import { useAuth } from '../../data/auth/AuthContext'
import { getErrorMessage } from '../../lib/http/errorMessage'
import type { Material, MaterialCategory, MaterialUnitType } from '../../types/stock'

interface ItemFormState {
  id: string | null
  name: string
  category: MaterialCategory
  location: string
  amount: string
  unitType: MaterialUnitType
}

interface ConfirmState {
  title: string
  body: string
  actionLabel: string
  run: () => Promise<void>
}

const PAGE_SIZE = 10
const EMPTY_FORM: ItemFormState = { id: null, name: '', category: 'CONSUMIVEL', location: '', amount: '', unitType: 'UNITY' }

export function useEstoquePage() {
  const { session } = useAuth()
  const token = session?.token ?? ''
  const [items, setItems] = useState<Material[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [reloadKey, setReloadKey] = useState(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState<ItemFormState>(EMPTY_FORM)
  const [message, setMessage] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

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
        setItems(result.data)
        setTotal(result.total)
        setTotalPages(result.totalPages)
        if (page > Math.max(1, result.totalPages)) setPage(Math.max(1, result.totalPages))
      })
      .catch((error: unknown) => {
        if (!cancelled) setMessage(getErrorMessage(error, 'Não foi possível carregar o estoque.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [token, page, debouncedSearch, reloadKey])

  function handleSearchChange(value: string) {
    setSearch(value)
  }

  function refresh() {
    setReloadKey((current) => current + 1)
  }

  function handleToggleForm() {
    setIsFormOpen((prev) => !prev)
    setForm(EMPTY_FORM)
    setMessage(null)
  }

  function handleClearForm() {
    setForm(EMPTY_FORM)
    setMessage(null)
  }

  function handleEdit(item: Material) {
    setForm({ id: item.id, name: item.name, category: item.category, location: item.location, amount: String(item.amount), unitType: item.unitType })
    setMessage(null)
    setIsFormOpen(true)
  }

  function handleDelete(item: Material) {
    setConfirm({
      title: 'Excluir item do estoque?',
      body: `“${item.name}” será removido do catálogo. Esta ação não pode ser desfeita.`,
      actionLabel: 'Excluir item',
      run: async () => {
        try {
          await materialsApi.deleteMaterial(item.id, token)
          if (items.length === 1 && page > 1) setPage(page - 1)
          else refresh()
          setMessage(`Item excluído: ${item.name}.`)
        } catch (error) {
          setMessage(getErrorMessage(error, 'Não foi possível excluir o item.'))
        }
      },
    })
  }

  async function applySave() {
    const amount = Math.max(0, parseInt(form.amount, 10) || 0)
    const payload = { name: form.name, category: form.category, location: form.location, amount, unitType: form.unitType }
    try {
      if (form.id) {
        await materialsApi.updateMaterial(form.id, payload, token)
        setMessage('Item atualizado.')
      } else {
        await materialsApi.createMaterial(payload, token)
        setMessage('Item cadastrado no estoque.')
      }
      refresh()
      setForm(EMPTY_FORM)
      setIsFormOpen(false)
    } catch (error) {
      setMessage(getErrorMessage(error, 'Não foi possível salvar o item.'))
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.name.trim()) {
      setMessage('Informe o nome do item.')
      return
    }
    if (!form.location.trim()) {
      setMessage('Informe o local de armazenamento.')
      return
    }
    if (form.id) {
      setConfirm({ title: 'Salvar alterações do item?', body: `O cadastro de “${form.name}” será atualizado, incluindo a quantidade disponível em estoque.`, actionLabel: 'Salvar alterações', run: applySave })
      return
    }
    void applySave()
  }

  function closeConfirm() { setConfirm(null) }
  async function runConfirm() { await confirm?.run(); setConfirm(null) }

  return { items, total, page, setPage, totalPages, isLoading, search, handleSearchChange, isFormOpen, form, setForm, message, confirm, handleToggleForm, handleClearForm, handleEdit, handleDelete, handleSubmit, closeConfirm, runConfirm }
}
