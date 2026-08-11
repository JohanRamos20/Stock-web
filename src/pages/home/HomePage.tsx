import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { Kicker } from '../../components/ui/Kicker'
import { useAuth } from '../../data/auth/AuthContext'

/** Landing page pós-login — confirma que a sessão e o logout funcionam. */
export function HomePage() {
  const { user, logout } = useAuth()
  if (!user) return null

  return (
    <div className="p-14 max-w-[480px]">
      <Kicker>{user.role.toUpperCase() === 'ADMIN' ? 'Administrador do almoxarifado' : 'Servidor requisitante'}</Kicker>
      <h2>Bem-vindo, {user.name.split(' ')[0]}</h2>
      <p className="text-muted text-sm">{user.sector}</p>
      <Divider />
      <Button type="button" variant="secondary" onClick={() => void logout()}>
        Sair
      </Button>
    </div>
  )
}
