import { Button } from '../../../components/ui/Button'
import { UNIT_TYPE_LABELS, type Material } from '../../../types/stock'

interface ReposicaoNecessariaProps {
  items: Material[]
  onViewStock: () => void
}

export function ReposicaoNecessaria({ items, onViewStock }: ReposicaoNecessariaProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="m-0">Reposição necessária</h4>
        <Button type="button" variant="ghost" onClick={onViewStock}>
          Ver estoque completo
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-muted text-sm px-2 py-6">Nenhum item em nível crítico.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
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
            {items.map((item) => (
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
      )}
    </div>
  )
}
