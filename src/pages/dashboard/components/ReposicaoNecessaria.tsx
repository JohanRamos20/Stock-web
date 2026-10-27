import { Button } from '../../../components/ui/Button'
import { UNIT_TYPE_LABELS, type Material } from '../../../types/stock'

const MAX_VISIBLE_ITEMS = 10

interface ReposicaoNecessariaProps {
  items: Material[]
  onViewStock: () => void
}

export function ReposicaoNecessaria({ items, onViewStock }: ReposicaoNecessariaProps) {
  const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS)

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <h4 className="m-0">Reposição necessária</h4>
        <Button type="button" variant="ghost" onClick={onViewStock}>
          Ver estoque completo
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted text-sm px-2 py-6">Nenhum item em nível crítico.</p>
      ) : (
        <>
          <table className="hidden md:table w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
                Material
              </th>
              <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
                Local
              </th>
              <th className="text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
                Estoque
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleItems.map((item) => (
              <tr key={item.id}>
                <td className="font-semibold px-2 py-2 border-b border-divider">{item.name}</td>
                <td className="text-muted px-2 py-2 border-b border-divider">{item.location}</td>
                <td className="text-right font-semibold text-accent-700 tabular-nums px-2 py-2 border-b border-divider">
                  {item.amount} {UNIT_TYPE_LABELS[item.unitType]}
                </td>
              </tr>
            ))}
          </tbody>
          </table>

          <div className="md:hidden flex flex-col gap-2">
            {visibleItems.map((item) => (
              <div key={item.id} className="bg-white border-y-2 border-divider px-4 py-3">
                <div className="font-heading font-extrabold text-sm break-words">{item.name}</div>
                <div className="text-accent-700 font-semibold text-xs tabular-nums mt-1">
                  {item.amount} {UNIT_TYPE_LABELS[item.unitType]} em estoque
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
