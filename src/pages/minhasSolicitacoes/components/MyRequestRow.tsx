import { Button } from '../../../components/ui/Button'
import { Tag } from '../../../components/ui/Tag'
import { formatRequestNumber } from '../../../lib/formatRequestNumber'
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_TAG_VARIANT } from '../../../types/requests'
import type { RequestDto } from '../../../types/requests'

interface MyRequestRowProps {
  request: RequestDto
  isOpen: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
  isDeleting: boolean
}

function formatDateTime(iso: string): string {
  const date = new Date(iso)
  const datePart = date.toLocaleDateString('pt-BR')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${datePart} · ${hours}h${minutes}`
}

function situacaoText(request: RequestDto): string {
  switch (request.status) {
    case 'PENDING':
      return 'Aguardando liberação do almoxarifado'
    case 'SEPARATED':
      return 'Material separado — aguardando retirada'
    case 'COMPLETED':
      return `Material liberado · retirada em ${formatDateTime(request.updatedAt)}`
    case 'CANCELED':
      return 'Pedido cancelado pelo almoxarifado'
  }
}

export function MyRequestRow({ request, isOpen, onToggle, onEdit, onDelete, isDeleting }: MyRequestRowProps) {
  const totalUnits = request.materials.reduce((sum, material) => sum + material.quantity, 0)
  const isPending = request.status === 'PENDING'
  const isSeparated = request.status === 'SEPARATED'

  return (
    <div className="bg-white">
      <div className="grid grid-cols-2 lg:grid-cols-[170px_1.6fr_1fr_130px_220px] gap-x-4 gap-y-3 items-center px-4 sm:px-5 py-4">
        <div className="col-span-2 lg:col-span-1 font-heading font-extrabold text-[15px] tabular-nums">
          Solicitação #{formatRequestNumber(request.numero)}
        </div>
        <div className="col-span-2 lg:col-span-1 min-w-0">
          <div className="text-[13px]">{situacaoText(request)}</div>
          <div className="text-muted text-xs">
            {request.materials.length} {request.materials.length === 1 ? 'material' : 'materiais'} · {totalUnits}{' '}
            {totalUnits === 1 ? 'unidade' : 'unidades'}
          </div>
        </div>
        <div className="text-muted text-[13px]">{formatDateTime(request.createdAt)}</div>
        <div>
          <Tag variant={REQUEST_STATUS_TAG_VARIANT[request.status]}>{REQUEST_STATUS_LABELS[request.status]}</Tag>
        </div>
        <div className="col-span-2 lg:col-span-1 text-left lg:text-right flex flex-wrap items-center justify-start lg:justify-end gap-x-3 gap-y-1">
          <Button type="button" variant="ghost" className="px-0 lg:px-1" onClick={onToggle}>
            {isOpen ? 'Ocultar itens' : 'Ver itens'}
          </Button>
          {isPending && (
            <>
              <Button type="button" variant="ghost" disabled={isDeleting} onClick={onEdit}>
                Editar
              </Button>
              <Button type="button" variant="ghost" disabled={isDeleting} onClick={onDelete}>
                Cancelar pedido
              </Button>
            </>
          )}
          {isSeparated && (
            <Button type="button" variant="ghost" disabled={isDeleting} onClick={onDelete}>
              Excluir pedido
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
          <div className="border-t border-divider bg-accent-100 px-4 sm:px-5 py-4 flex flex-col gap-4">
          <table className="hidden md:table w-full border-collapse text-sm bg-white">
            <thead>
              <tr>
                <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-3 py-2 border-b-2 border-divider">
                  Material solicitado
                </th>
                <th className="w-[140px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-3 py-2 border-b-2 border-divider">
                  Quantidade
                </th>
              </tr>
            </thead>
            <tbody>
              {request.materials.map((material) => (
                <tr key={material.materialId}>
                  <td className="font-semibold px-3 py-2 border-b border-divider">{material.name}</td>
                  <td className="text-right tabular-nums px-3 py-2 border-b border-divider">{material.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden flex flex-col gap-2">
            {request.materials.map((material) => (
              <div key={material.materialId} className="bg-white border border-divider px-3 py-2 flex items-start justify-between gap-3">
                <span className="font-semibold text-sm break-words">{material.name}</span>
                <span className="text-muted text-sm tabular-nums flex-none">{material.quantity}</span>
              </div>
            ))}
          </div>

          {request.observacoes?.trim() && (
            <div>
              <div className="text-[11px] tracking-[0.08em] uppercase text-muted mb-1">Observações</div>
              <p className="m-0 text-sm whitespace-pre-wrap break-words">{request.observacoes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
