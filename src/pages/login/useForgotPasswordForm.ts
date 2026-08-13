import { useState, type FormEvent } from 'react'
import * as usersApi from '../../api/users/usersApi'

const EMAIL_PATTERN = /.+@.+\..+/

interface UseForgotPasswordFormOptions {
  onCancel: () => void
  onSuccess: () => void
}

export function useForgotPasswordForm({ onCancel, onSuccess }: UseForgotPasswordFormOptions) {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function resetFields() {
    setEmail('')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setError(null)
    setStep(1)
  }

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Informe um e-mail institucional válido.')
      return
    }

    setError(null)
    setStep(2)
  }

  function handleBack() {
    setError(null)
    setStep(1)
  }

  function handleCancel() {
    resetFields()
    onCancel()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!currentPassword) {
      setError('Informe a senha atual.')
      return
    }

    if (newPassword.length < 8) {
      setError('A nova senha deve ter ao menos 8 caracteres.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setError('A confirmação não confere com a nova senha.')
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      await usersApi.resetPassword({ email, currentPassword, newPassword, confirmNewPassword })
      resetFields()
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível redefinir a senha. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    step,
    email,
    setEmail,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    error,
    isSubmitting,
    handleNext,
    handleBack,
    handleCancel,
    handleSubmit,
  }
}
