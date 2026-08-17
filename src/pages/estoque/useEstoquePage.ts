import { useState, type FormEvent } from 'react'
import { mockItems, type StockItem } from '../../mocks/items'

interface ItemFormState {
  id: number | null
  nome: string
  categoria: string
  local: string
  qtd: string
  un: string
  min: number
}

interface ConfirmState {
  title: string
  body: string
  actionLabel: string
  run: () => void
}

const EMPTY_FORM: ItemFormState = {
  id: null,
  nome: '',
  categoria: 'Expediente',
  local: 'Prateleira A-1',
  qtd: '',
  un: 'un',
  min: 0,
}

function nextCodigo(items: StockItem[]): string {
  const max = items.reduce((acc, item) => {
    const n = parseInt(item.codigo.slice(3), 10)
    return Number.isNaN(n) ? acc : Math.max(acc, n)
  }, 0)
  return `MA-${String(max + 1).padStart(4, '0')}`
}

export function useEstoquePage() {
  const [items, setItems] = useState<StockItem[]>(mockItems)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState<ItemFormState>(EMPTY_FORM)
  const [message, setMessage] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)

  const query = search.trim().toLowerCase()
  const filteredItems = items.filter(
    (item) => !query || `${item.nome}${item.categoria}${item.codigo}${item.local}`.toLowerCase().includes(query),
  )

  function handleNew() {
    setForm(EMPTY_FORM)
    setMessage(null)
  }

  function handleEdit(item: StockItem) {
    setForm({
      id: item.id,
      nome: item.nome,
      categoria: item.categoria,
      local: item.local,
      qtd: String(item.qtd),
      un: item.un,
      min: item.min,
    })
    setMessage(null)
  }

  function handleDelete(item: StockItem) {
    setConfirm({
      title: 'Excluir item do estoque?',
      body: `“${item.nome}” (${item.codigo}) será removido do catálogo e de todas as solicitações em montagem. Esta ação não pode ser desfeita.`,
      actionLabel: 'Excluir item',
      run: () => {
        setItems((prev) => prev.filter((x) => x.id !== item.id))
        setMessage(`Item excluído: ${item.nome}.`)
      },
    })
  }

  function applySave() {
    const qtd = Math.max(0, parseInt(form.qtd, 10) || 0)

    if (form.id) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === form.id
            ? { ...item, nome: form.nome, categoria: form.categoria, local: form.local, qtd, un: form.un }
            : item,
        ),
      )
      setMessage('Item atualizado.')
    } else {
      const item: StockItem = {
        id: Date.now(),
        codigo: nextCodigo(items),
        nome: form.nome,
        categoria: form.categoria,
        local: form.local,
        qtd,
        min: form.min,
        un: form.un,
      }
      setItems((prev) => prev.concat(item))
      setMessage('Item cadastrado no estoque.')
    }

    setForm(EMPTY_FORM)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.nome.trim()) {
      setMessage('Informe o nome do item.')
      return
    }

    if (form.id) {
      setConfirm({
        title: 'Salvar alterações do item?',
        body: `O cadastro de “${form.nome}” será atualizado, incluindo a quantidade disponível em estoque.`,
        actionLabel: 'Salvar alterações',
        run: applySave,
      })
      return
    }

    applySave()
  }

  function closeConfirm() {
    setConfirm(null)
  }

  function runConfirm() {
    confirm?.run()
    setConfirm(null)
  }

  return {
    items,
    filteredItems,
    search,
    setSearch,
    form,
    setForm,
    message,
    confirm,
    handleNew,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeConfirm,
    runConfirm,
  }
}
