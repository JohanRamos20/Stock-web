import { AuthBrandingPanel } from './components/AuthBrandingPanel'
import { LoginForm } from './components/LoginForm'

export function LoginPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-screen bg-bg">
      <AuthBrandingPanel />
      <div className="flex items-center justify-center p-8 md:p-14">
        <LoginForm />
      </div>
    </div>
  )
}
