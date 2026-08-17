import { Alert } from '../../../components/ui/Alert'
import { Button } from '../../../components/ui/Button'
import { Tag } from '../../../components/ui/Tag'
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_TAG_VARIANT } from '../../../types/requests'
import type { RequestRowData } from '../useSolicitacoesPage'

interface RequestRowProps {
  row: RequestRowData
  isOpen: boolean
  onToggle: () => void
  onComplete: () => void
  onGeneratePdf: () => void
  isCompleting: boolean
  pdfNotice: string | null
}

function formatDateTime(iso: string): string {
  const date = new Date(iso)
  const datePart = date.toLocaleDateString('pt-BR')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${datePart} · ${hours}h${minutes}`
}

export function RequestRow({ row, isOpen, onToggle, onComplete, onGeneratePdf, isCompleting, pdfNotice }: RequestRowProps) {
  const { request, requesterName, requesterSector } = row
  const totalUnits = request.materials.reduce((sum, material) => sum + material.quantity, 0)
  const isPending = request.status === 'PENDING'

  return (
    <div className="bg-white">
      <div
        className="grid gap-4 items-center px-5 py-4"
        style={{ gridTemplateColumns: '110px 1.4fr 1fr 150px 90px 120px' }}
      >
        <div className="font-heading font-extrabold text-[15px] tabular-nums">#{request.id.slice(0, 8)}</div>
        <div>
          <div className="font-semibold text-sm">{requesterName}</div>
          <div className="text-muted text-xs">{requesterSector}</div>
        </div>
        <div className="text-muted text-[13px]">{formatDateTime(request.createdAt)}</div>
        <div className="text-muted text-xs">
          {request.materials.length} {request.materials.length === 1 ? 'material' : 'materiais'} · {totalUnits}{' '}
          {totalUnits === 1 ? 'unidade' : 'unidades'}
        </div>
        <div>
          <Tag variant={REQUEST_STATUS_TAG_VARIANT[request.status]}>{REQUEST_STATUS_LABELS[request.status]}</Tag>
        </div>
        <div className="text-right">
          <Button type="button" variant="ghost" onClick={onToggle}>
            {isOpen ? 'Ocultar itens' : 'Ver itens'}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-divider bg-accent-100 px-5 py-4 flex flex-col gap-4">
          <div className="text-[12px] text-muted">
            Retirada registrada: {request.status === 'COMPLETED' ? formatDateTime(request.updatedAt) : '—'}
          </div>

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

          {isPending && (
            <div className="border-t-2 border-divider pt-4 flex items-center justify-between gap-6">
              <div>
                <div className="font-heading font-extrabold text-sm">Termo de retirada</div>
                <p className="text-muted text-xs m-0 mt-1 max-w-[420px]">
                  Geração do termo em PDF ainda não está disponível — assim que o backend expuser essa
                  funcionalidade, o termo poderá ser gerado aqui.
                </p>
                {pdfNotice && (
                  <div className="mt-2">
                    <Alert>{pdfNotice}</Alert>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-none">
                <Button type="button" variant="secondary" onClick={onGeneratePdf}>
                  Gerar PDF do termo
                </Button>
                <Button type="button" variant="primary" disabled={isCompleting} onClick={onComplete}>
                  {isCompleting ? 'Concluindo…' : 'Concluir pedido'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
