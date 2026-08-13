import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import { Kicker } from '../../../components/ui/Kicker'
import { useForgotPasswordForm } from '../useForgotPasswordForm'

interface ForgotPasswordFlowProps {
  onCancel: () => void
  onSuccess: () => void
}

export function ForgotPasswordFlow({ onCancel, onSuccess }: ForgotPasswordFlowProps) {
  const {
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
  } = useForgotPasswordForm({ onCancel, onSuccess })

  return (
    <div className="w-full max-w-[360px]">
      <Kicker>Recuperação de acesso</Kicker>
      <h2 className="mb-1">{step === 1 ? 'Esqueci a senha' : 'Definir nova senha'}</h2>
      <p className="text-muted text-sm mb-5">
        {step === 1
          ? 'Informe o e-mail institucional vinculado à sua matrícula.'
          : `Redefinindo o acesso de ${email || 'sua conta'}.`}
      </p>

      <div className="flex items-center gap-3 mb-2">
        <div className="flex-1 h-0.5 bg-accent" />
        <div className={`flex-1 h-0.5 ${step === 2 ? 'bg-accent' : 'bg-divider'}`} />
      </div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.1em] font-heading font-extrabold mb-6">
        <span className="text-accent-700">1 · Identificação</span>
        <span className={step === 2 ? 'text-accent-700' : 'text-neutral-500'}>2 · Nova senha</span>
      </div>

      {step === 1 ? (
        <form onSubmit={handleNext} noValidate>
          <Field
            id="fgmail"
            label="E-mail institucional"
            placeholder="nome@ifce.edu.br"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            wrapperClassName="mb-5"
          />

          <Button type="submit" block>
            Continuar
          </Button>
          <Button type="button" variant="ghost" onClick={handleCancel} className="mt-3">
            Voltar ao login
          </Button>

          {error && <Alert>{error}</Alert>}
        </form>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <Field
            id="fgatual"
            label="Senha atual"
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            wrapperClassName="mb-3.5"
          />
          <Field
            id="fgnova"
            label="Nova senha"
            type="password"
            placeholder="Mínimo de 8 caracteres"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            wrapperClassName="mb-3.5"
          />
          <Field
            id="fgconf"
            label="Confirmar nova senha"
            type="password"
            placeholder="Repita a nova senha"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
            autoComplete="new-password"
            wrapperClassName="mb-5"
          />

          <Button type="submit" block disabled={isSubmitting}>
            {isSubmitting ? 'Redefinindo…' : 'Redefinir senha'}
          </Button>
          <Button type="button" variant="ghost" onClick={handleBack} className="mt-3">
            Voltar
          </Button>

          {error && <Alert>{error}</Alert>}
        </form>
      )}
    </div>
  )
}
