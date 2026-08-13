import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { Checkbox } from '../../../components/ui/Checkbox'
import { Divider } from '../../../components/ui/Divider'
import { Field } from '../../../components/ui/Field'
import { Kicker } from '../../../components/ui/Kicker'
import { useLoginForm } from '../useLoginForm'

interface LoginFormProps {
  successMessage?: string | null
  onForgotPassword: () => void
}

export function LoginForm({ successMessage, onForgotPassword }: LoginFormProps) {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    keepConnected,
    setKeepConnected,
    error,
    isSubmitting,
    handleSubmit,
  } = useLoginForm()

  return (
    <form className="w-full max-w-[360px]" onSubmit={handleSubmit} noValidate>
      <Kicker>Acesso restrito</Kicker>
      <h2 className="mb-1">Entrar no sistema</h2>
      <p className="text-muted text-sm mb-6">Use suas credenciais institucionais.</p>

      {successMessage && <Alert>{successMessage}</Alert>}
      {error && <Alert>{error}</Alert>}

      <Field
        id="identifier"
        label="E-mail"
        placeholder="seu-email@ifce.edu.br"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        autoComplete="username"
        wrapperClassName="mb-3.5"
      />

      <Field
        id="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        wrapperClassName="mb-4.5"
      />

      <div className="flex items-center justify-between mb-[22px]">
        <Checkbox
          checked={keepConnected}
          onChange={setKeepConnected}
          label="Manter conectado"
        />
        <a
          href="#esqueci-senha"
          className="text-[13px]"
          onClick={(event) => {
            event.preventDefault()
            onForgotPassword()
          }}
        >
          Recuperar senha
        </a>
      </div>

      <Button type="submit" block disabled={isSubmitting}>
        {isSubmitting ? 'Entrando…' : 'Entrar'}
      </Button>

      <Divider />
    </form>
  )
}
