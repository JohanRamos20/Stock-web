import { Button } from '../../../components/ui/Button'
import { Tag } from '../../../components/ui/Tag'
import { REQUEST_STATUS_LABELS, REQUEST_STATUS_TAG_VARIANT } from '../../../types/requests'
import type { RequestStatus } from '../../../types/requests'

export interface RecentRequestData {
  id: string
  requesterName: string
  requesterSector: string
  itemsCount: number
  status: RequestStatus
}

interface RecentRequestsProps {
  requests: RecentRequestData[]
  onAudit: () => void
}

export function RecentRequests({ requests, onAudit }: RecentRequestsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="m-0">Últimas solicitações</h4>
        <Button type="button" variant="ghost" onClick={onAudit}>
          Auditoria
        </Button>
      </div>

      {requests.length === 0 ? (
        <p className="text-muted text-sm px-2 py-6">Nenhuma solicitação registrada.</p>
      ) : (
        <div className="flex flex-col gap-[2px] bg-divider border-y-2 border-divider">
          {requests.map((request) => (
            <div key={request.id} className="bg-white px-4 py-3.5 flex items-center justify-between">
              <div>
                <div className="font-heading font-extrabold text-sm">{request.requesterName}</div>
                <div className="text-muted text-xs">
                  {request.itemsCount} {request.itemsCount === 1 ? 'item' : 'itens'} · {request.requesterSector}
                </div>
              </div>
              <Tag variant={REQUEST_STATUS_TAG_VARIANT[request.status]}>
                {REQUEST_STATUS_LABELS[request.status]}
              </Tag>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
