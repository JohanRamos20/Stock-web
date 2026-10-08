import { Button } from '../../../components/ui/Button'
import type { User } from '../../../types/auth'

interface ServersTableProps {
  users: User[]
  isLoading: boolean
  onResetPassword: (user: User) => void
  onDeleteUser: (user: User) => void
  resettingId: string | null
  deletingId: string | null
}

export function ServersTable({
  users,
  isLoading,
  onResetPassword,
  onDeleteUser,
  resettingId,
  deletingId,
}: ServersTableProps) {
  if (isLoading) {
    return <p className="text-muted text-sm px-2 py-6">Carregando servidores…</p>
  }

  if (users.length === 0) {
    return <p className="text-muted text-sm px-2 py-6">Nenhum servidor cadastrado.</p>
  }

  return (
    <>
      <table className="hidden md:table w-full border-collapse text-sm">
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
                <Button
                  type="button"
                  variant="ghost"
                  disabled={deletingId === user.id}
                  onClick={() => onDeleteUser(user)}
                >
                  Excluir
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      </table>

      <div className="md:hidden flex flex-col gap-2">
        {users.map((user) => (
          <div key={user.id} className="bg-white border-y-2 border-divider px-4 py-3">
            <div className="font-heading font-extrabold text-sm break-words">{user.name}</div>
            <div className="text-muted text-xs break-all mt-1">{user.email}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              <Button
                type="button"
                variant="ghost"
                className="px-0"
                disabled={resettingId === user.id}
                onClick={() => onResetPassword(user)}
              >
                Resetar senha
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="px-0"
                disabled={deletingId === user.id}
                onClick={() => onDeleteUser(user)}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
