import { useNavigate } from 'react-router-dom'
import { Alert } from '../../components/ui/Alert'
import { Button } from '../../components/ui/Button'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { ROUTES } from '../../app/paths'
import { MyRequestRow } from './components/MyRequestRow'
import { useMinhasSolicitacoesPage } from './useMinhasSolicitacoesPage'

export function MinhasSolicitacoesPage() {
  const navigate = useNavigate()
  const {
    requests,
    isLoading,
    loadError,
    openId,
    toggleExpand,
    message,
    deletingId,
    confirm,
    handleEdit,
    handleDelete,
    closeConfirm,
    runConfirm,
  } = useMinhasSolicitacoesPage()

  return (
    <div>
      <h2 className="mb-1">Minhas solicitações</h2>
      <p className="text-muted text-sm mb-5">Acompanhe o estado de cada pedido enviado ao almoxarifado.</p>

      {message && <Alert>{message}</Alert>}
      {loadError && <Alert>{loadError}</Alert>}

      {isLoading && <p className="text-muted text-sm px-2 py-6">Carregando solicitações…</p>}

      {!isLoading && requests.length === 0 && !loadError && (
        <div className="border-y-2 border-divider py-12 flex flex-col items-center gap-3 text-center">
          <h4 className="m-0">Nenhuma solicitação registrada</h4>
          <p className="text-muted text-sm m-0">Monte uma requisição na tela de solicitação de materiais.</p>
          <Button type="button" variant="primary" onClick={() => navigate(ROUTES.materiais)}>
            Ir para materiais
          </Button>
        </div>
      )}

      {!isLoading && requests.length > 0 && (
        <div className="flex flex-col gap-[2px] bg-divider border-y-2 border-divider">
          {requests.map((request) => (
            <MyRequestRow
              key={request.id}
              request={request}
              isOpen={openId === request.id}
              onToggle={() => toggleExpand(request.id)}
              onEdit={() => handleEdit(request)}
              onDelete={() => handleDelete(request)}
              isDeleting={deletingId === request.id}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ''}
        body={confirm?.body ?? ''}
        actionLabel={confirm?.actionLabel ?? ''}
        onCancel={closeConfirm}
        onConfirm={runConfirm}
      />
    </div>
  )
}
