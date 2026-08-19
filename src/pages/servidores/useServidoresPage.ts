import { useEffect, useState, type FormEvent } from 'react'
import * as usersApi from '../../api/users/usersApi'
import { useAuth } from '../../data/auth/AuthContext'
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
  run: () => Promise<void>
}

const EMPTY_FORM: ServerFormState = {
  name: '',
  email: '',
  siapp: '',
  sector: 'ACADEMICS',
  role: 'USER',
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
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
  const [resettingId, setResettingId] = useState<string | null>(null)

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
        if (!cancelled) setMessage(errorMessage(error, 'Não foi possível carregar os servidores.'))
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
      setMessage(errorMessage(error, 'Não foi possível cadastrar o servidor.'))
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
          setMessage(errorMessage(error, 'Não foi possível resetar a senha.'))
        } finally {
          setResettingId(null)
        }
      },
    })
  }

  function closeConfirm() {
    setConfirm(null)
  }

  async function runConfirm() {
    await confirm?.run()
    setConfirm(null)
  }

  return {
    users,
    isLoading,
    isFormOpen,
    form,
    setForm,
    message,
    confirm,
    resettingId,
    handleToggleForm,
    handleClearForm,
    handleSubmit,
    handleResetPassword,
    closeConfirm,
    runConfirm,
  }
}
