import { useState } from 'react'
import { AuthBrandingPanel } from './components/AuthBrandingPanel'
import { ForgotPasswordFlow } from './components/ForgotPasswordFlow'
import { LoginForm } from './components/LoginForm'

type AuthView = 'login' | 'forgot'

export function LoginPage() {
  const [view, setView] = useState<AuthView>('login')
  const [loginMessage, setLoginMessage] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-screen bg-bg">
      <AuthBrandingPanel />
      <div className="flex items-center justify-center p-8 md:p-14">
        {view === 'login' ? (
          <LoginForm successMessage={loginMessage} onForgotPassword={() => setView('forgot')} />
        ) : (
          <ForgotPasswordFlow
            onCancel={() => setView('login')}
            onSuccess={() => {
              setView('login')
              setLoginMessage('Senha redefinida. Entre com a nova senha.')
            }}
          />
        )}
      </div>
    </div>
  )
}
