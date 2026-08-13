import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../data/auth/AuthContext'
import type { Role } from '../../types/auth'
import { ROUTES } from '../../app/paths'

interface LocationState {
  from?: { pathname: string }
}

export function useLoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('servidor')
  const [keepConnected, setKeepConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!identifier.trim() || !password) {
      setError('Preencha matrícula/e-mail e senha para continuar.')
      return
    }

    setIsSubmitting(true)
    try {
      await login({ identifier, password, role, keepConnected })
      const state = location.state as LocationState | null
      const destination = state?.from?.pathname ?? ROUTES.root
      navigate(destination, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    role,
    setRole,
    keepConnected,
    setKeepConnected,
    error,
    isSubmitting,
    handleSubmit,
  }
}
