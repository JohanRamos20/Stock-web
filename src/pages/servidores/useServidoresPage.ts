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
  const [form, setForm] = useState<ServerFormState>(EMPTY_FORM)
  const [message, setMessage] = useState<string | null>(null)

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

  function handleNew() {
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
    } catch (error) {
      setMessage(errorMessage(error, 'Não foi possível cadastrar o servidor.'))
    }
  }

  return {
    users,
    isLoading,
    form,
    setForm,
    message,
    handleNew,
    handleSubmit,
  }
}
