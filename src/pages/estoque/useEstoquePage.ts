import { useEffect, useState, type FormEvent } from 'react'
import * as materialsApi from '../../api/materials/materialsApi'
import { useAuth } from '../../data/auth/AuthContext'
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

const EMPTY_FORM: ItemFormState = {
  id: null,
  name: '',
  category: 'CONSUMIVEL',
  location: '',
  amount: '',
  unitType: 'UNITY',
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useEstoquePage() {
  const { session } = useAuth()
  const token = session?.token ?? ''

  const [items, setItems] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState<ItemFormState>(EMPTY_FORM)
  const [message, setMessage] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false
    setIsLoading(true)
    materialsApi
      .listMaterials(token)
      .then((materials) => {
        if (!cancelled) setItems(materials)
      })
      .catch((error: unknown) => {
        if (!cancelled) setMessage(errorMessage(error, 'Não foi possível carregar o estoque.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const query = search.trim().toLowerCase()
  const filteredItems = items.filter(
    (item) => !query || `${item.name}${item.category}${item.location}`.toLowerCase().includes(query),
  )

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
    setForm({
      id: item.id,
      name: item.name,
      category: item.category,
      location: item.location,
      amount: String(item.amount),
      unitType: item.unitType,
    })
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
          setItems((prev) => prev.filter((x) => x.id !== item.id))
          setMessage(`Item excluído: ${item.name}.`)
        } catch (error) {
          setMessage(errorMessage(error, 'Não foi possível excluir o item.'))
        }
      },
    })
  }

  async function applySave() {
    const amount = Math.max(0, parseInt(form.amount, 10) || 0)
    const payload = {
      name: form.name,
      category: form.category,
      location: form.location,
      amount,
      unitType: form.unitType,
    }

    try {
      if (form.id) {
        const updated = await materialsApi.updateMaterial(form.id, payload, token)
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
        setMessage('Item atualizado.')
      } else {
        const created = await materialsApi.createMaterial(payload, token)
        setItems((prev) => prev.concat(created))
        setMessage('Item cadastrado no estoque.')
      }
      setForm(EMPTY_FORM)
      setIsFormOpen(false)
    } catch (error) {
      setMessage(errorMessage(error, 'Não foi possível salvar o item.'))
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
      setConfirm({
        title: 'Salvar alterações do item?',
        body: `O cadastro de “${form.name}” será atualizado, incluindo a quantidade disponível em estoque.`,
        actionLabel: 'Salvar alterações',
        run: applySave,
      })
      return
    }

    void applySave()
  }

  function closeConfirm() {
    setConfirm(null)
  }

  async function runConfirm() {
    await confirm?.run()
    setConfirm(null)
  }

  return {
    items,
    filteredItems,
    isLoading,
    search,
    setSearch,
    isFormOpen,
    form,
    setForm,
    message,
    confirm,
    handleToggleForm,
    handleClearForm,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeConfirm,
    runConfirm,
  }
}
