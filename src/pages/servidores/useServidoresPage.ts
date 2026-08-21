import { useEffect, useState, type FormEvent } from 'react'
import * as usersApi from '../../api/users/usersApi'
import { useAuth } from '../../data/auth/AuthContext'
import { getErrorMessage } from '../../lib/http/errorMessage'
import type { ApiRole, Sector, User } from '../../types/auth'

interface ServerFormState {
  name: string
  email: string
  siapp: string
  sector: Sector
  role: ApiRole
}

interface ConfirmState {
  title: string
  body: string
  actionLabel: string
  needsPassword?: boolean
  run: (password?: string) => Promise<void>
}

const EMPTY_FORM: ServerFormState = {
  name: '',
  email: '',
  siapp: '',
  sector: 'ACADEMICS',
  role: 'USER',
}

export function useServidoresPage() {
  const { session } = useAuth()
  const token = session?.token ?? ''

  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState<ServerFormState>(EMPTY_FORM)
  const [message, setMessage] = useState<string | null>(null)
  const [confirm, setConfirm] = useState<ConfirmState | null>(null)
  const [deletePassword, setDeletePassword] = useState('')
  const [resettingId, setResettingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    let cancelled = false
    setIsLoading(true)
    usersApi
      .listUsers(token)
      .then((data) => {
        if (!cancelled) setUsers(data)
      })
      .catch((error: unknown) => {
        if (!cancelled) setMessage(getErrorMessage(error, 'Não foi possível carregar os servidores.'))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  function handleToggleForm() {
    setIsFormOpen((prev) => !prev)
    setForm(EMPTY_FORM)
    setMessage(null)
  }

  function handleClearForm() {
    setForm(EMPTY_FORM)
    setMessage(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.name.trim() || !form.siapp.trim()) {
      setMessage('Informe ao menos nome e matrícula.')
      return
    }

    try {
      const created = await usersApi.createUser(
        {
          name: form.name,
          email: form.email,
          siapp: form.siapp,
          sector: form.sector,
          role: form.role,
        },
        token,
      )
      setUsers((prev) => prev.concat(created))
      setMessage('Servidor cadastrado.')
      setForm(EMPTY_FORM)
      setIsFormOpen(false)
    } catch (error) {
      setMessage(getErrorMessage(error, 'Não foi possível cadastrar o servidor.'))
    }
  }

  function handleResetPassword(user: User) {
    setConfirm({
      title: 'Resetar senha?',
      body: `A senha de "${user.name}" volta a ser a matrícula (SIAPE) cadastrada.`,
      actionLabel: 'Resetar senha',
      run: async () => {
        setResettingId(user.id)
        try {
          await usersApi.resetUserPassword(user.id, token)
          setMessage(`Senha de ${user.name} redefinida.`)
        } catch (error) {
          setMessage(getErrorMessage(error, 'Não foi possível resetar a senha.'))
        } finally {
          setResettingId(null)
        }
      },
    })
  }

  function handleDeleteUser(user: User) {
    setDeletePassword('')
    setConfirm({
      title: 'Excluir servidor?',
      body: `Informe sua senha de administrador para excluir "${user.name}" definitivamente. Esta ação não pode ser desfeita.`,
      actionLabel: 'Excluir servidor',
      needsPassword: true,
      run: async (password) => {
        setDeletingId(user.id)
        try {
          await usersApi.deleteUser(user.id, password ?? '', token)
          setUsers((prev) => prev.filter((existing) => existing.id !== user.id))
          setMessage(`Servidor removido: ${user.name}.`)
        } catch (error) {
          setMessage(
            getErrorMessage(error, 'Não foi possível excluir o servidor.', {
              409: `"${user.name}" possui solicitações associadas e não pode ser excluído.`,
            }),
          )
        } finally {
          setDeletingId(null)
        }
      },
    })
  }

  function closeConfirm() {
    setConfirm(null)
    setDeletePassword('')
  }

  async function runConfirm() {
    await confirm?.run(deletePassword)
    setConfirm(null)
    setDeletePassword('')
  }

  return {
    users,
    isLoading,
    isFormOpen,
    form,
    setForm,
    message,
    confirm,
    deletePassword,
    setDeletePassword,
    resettingId,
    deletingId,
    handleToggleForm,
    handleClearForm,
    handleSubmit,
    handleResetPassword,
    handleDeleteUser,
    closeConfirm,
    runConfirm,
  }
}
