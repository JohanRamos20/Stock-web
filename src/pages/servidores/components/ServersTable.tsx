import { Button } from '../../../components/ui/Button'
import type { User } from '../../../types/auth'

interface ServersTableProps {
  users: User[]
  isLoading: boolean
  onResetPassword: (user: User) => void
  resettingId: string | null
}

export function ServersTable({ users, isLoading, onResetPassword, resettingId }: ServersTableProps) {
  if (isLoading) {
    return <p className="text-muted text-sm px-2 py-6">Carregando servidores…</p>
  }

  if (users.length === 0) {
    return <p className="text-muted text-sm px-2 py-6">Nenhum servidor cadastrado.</p>
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Nome
          </th>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Setor
          </th>
          <th className="w-[190px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-text/4">
            <td className="px-2 py-2 border-b border-divider">
              <div className="font-semibold">{user.name}</div>
              <div className="text-muted text-xs">{user.email}</div>
            </td>
            <td className="text-muted px-2 py-2 border-b border-divider">{user.sector}</td>
            <td className="px-2 py-2 border-b border-divider">
              <div className="flex justify-end gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={resettingId === user.id}
                  onClick={() => onResetPassword(user)}
                >
                  Resetar senha
                </Button>
                <Button type="button" variant="ghost" disabled>
                  Excluir
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
