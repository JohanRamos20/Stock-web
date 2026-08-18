import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { ROUTES } from '../../app/paths'
import { CartTable } from './components/CartTable'
import { useCarrinhoPage } from './useCarrinhoPage'

export function CarrinhoPage() {
  const navigate = useNavigate()
  const {
    user,
    items,
    totalUnits,
    editingRequestId,
    confirm,
    sent,
    sentMessage,
    error,
    isSubmitting,
    handleQuantityChange,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleSubmit,
    handleCancelEdit,
    closeConfirm,
    runConfirm,
    unitsLabel,
    itemsLabel,
  } = useCarrinhoPage()

  const showSuccess = sent && items.length === 0
  const showEmpty = !showSuccess && items.length === 0

  return (
    <div>
      <h2 className="mb-5">Solicitação de material</h2>

      {showSuccess && (
        <div className="bg-accent-100 border-l-[3px] border-accent px-4 py-3 mb-5">
          <div className="font-heading font-extrabold text-sm text-accent-700 mb-1">Solicitação enviada</div>
          <div className="text-[13px]">{sentMessage}</div>
        </div>
      )}

      {!showSuccess && editingRequestId && (
        <div className="bg-accent-100 border-l-[3px] border-accent px-4 py-3 mb-5 flex items-center justify-between gap-4">
          <div className="text-[13px]">
            Editando a solicitação #{editingRequestId.slice(0, 8)} — as alterações substituem o pedido original ao
            reenviar.
          </div>
          <Button type="button" variant="secondary" onClick={handleCancelEdit}>
            Cancelar edição
          </Button>
        </div>
      )}

      {showEmpty && (
        <div className="border-y-2 border-divider py-12 flex flex-col items-center gap-3 text-center">
          <h4 className="m-0">Nenhum item na solicitação</h4>
          <p className="text-muted text-sm m-0">
            Adicione materiais pela tela de solicitação de materiais para montar a requisição.
          </p>
          <Button type="button" variant="primary" onClick={() => navigate(ROUTES.materiais)}>
            Ir para materiais
          </Button>
        </div>
      )}

      {items.length > 0 && error && (
        <div className="border-l-[3px] border-accent pl-3 py-2 text-[13px] mb-5">{error}</div>
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-8">
          <CartTable
            items={items}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />

          <div>
            <div className="flex items-center justify-between border-b-2 border-divider px-2 py-4">
              <span className="text-muted text-[13px]">{itemsLabel(items.length)}</span>
              <span className="font-heading font-extrabold text-xl">{unitsLabel(totalUnits)}</span>
            </div>

            <div className="flex items-center justify-between px-2 py-4">
              <div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-muted">Servidor responsável</div>
                <div className="text-[13px]">
                  {user?.name} · {user?.sector}
                </div>
              </div>
              <Button
                type="button"
                variant="primary"
                className="px-5 py-3"
                disabled={isSubmitting}
                onClick={() => void handleSubmit()}
              >
                {isSubmitting ? 'Enviando…' : editingRequestId ? 'Reenviar solicitação' : 'Solicitar'}
              </Button>
            </div>
          </div>
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
