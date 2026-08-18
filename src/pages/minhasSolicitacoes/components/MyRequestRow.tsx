import { Button } from '../../../components/ui/Button'
import { Tag } from '../../../components/ui/Tag'
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
    case 'COMPLETED':
      return `Material liberado · retirada em ${formatDateTime(request.updatedAt)}`
    case 'CANCELED':
      return 'Pedido cancelado pelo almoxarifado'
  }
}

export function MyRequestRow({ request, isOpen, onToggle, onEdit, onDelete, isDeleting }: MyRequestRowProps) {
  const totalUnits = request.materials.reduce((sum, material) => sum + material.quantity, 0)
  const isPending = request.status === 'PENDING'

  return (
    <div className="bg-white">
      <div
        className="grid gap-4 items-center px-5 py-4"
        style={{ gridTemplateColumns: '130px 1.6fr 1fr 130px 220px' }}
      >
        <div className="font-heading font-extrabold text-[15px] tabular-nums">#{request.id.slice(0, 8)}</div>
        <div>
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
        <div className="text-right flex items-center justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onToggle}>
            {isOpen ? 'Ocultar itens' : 'Ver itens'}
          </Button>
          {isPending ? (
            <>
              <Button type="button" variant="ghost" disabled={isDeleting} onClick={onEdit}>
                Editar
              </Button>
              <Button type="button" variant="ghost" disabled={isDeleting} onClick={onDelete}>
                Excluir pedido
              </Button>
            </>
          ) : (
            <span className="text-muted text-xs">Não editável</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-divider bg-accent-100 px-5 py-4 flex flex-col gap-4">
          <table className="w-full border-collapse text-sm bg-white">
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
        </div>
      )}
    </div>
  )
}
