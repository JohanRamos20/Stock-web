import { Button } from '../../../components/ui/Button'
import { CATEGORY_LABELS, UNIT_TYPE_LABELS, type Material } from '../../../types/stock'

interface MaterialsCatalogTableProps {
  materials: Material[]
  isLoading: boolean
  qty: Record<string, string>
  onQtyChange: (materialId: string, value: string) => void
  onAdd: (material: Material) => void
}

export function MaterialsCatalogTable({ materials, isLoading, qty, onQtyChange, onAdd }: MaterialsCatalogTableProps) {
  if (isLoading) {
    return <p className="text-muted text-sm px-2 py-6">Carregando materiais…</p>
  }

  if (materials.length === 0) {
    return <p className="text-muted text-sm px-2 py-6">Nenhum material corresponde à busca.</p>
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Material
          </th>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Categoria
          </th>
          <th className="w-[140px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Qtd. disponível
          </th>
          <th className="w-[190px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Solicitar
          </th>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => (
          <tr key={material.id} className="hover:bg-text/4">
            <td className="font-semibold px-2 py-2 border-b border-divider">{material.name}</td>
            <td className="text-muted px-2 py-2 border-b border-divider">{CATEGORY_LABELS[material.category]}</td>
            <td className="text-right tabular-nums px-2 py-2 border-b border-divider">
              {material.amount} {UNIT_TYPE_LABELS[material.unitType]}
            </td>
            <td className="px-2 py-2 border-b border-divider">
              <div className="flex justify-end gap-2">
                <input
                  type="number"
                  min={1}
                  max={material.amount}
                  placeholder="1"
                  value={qty[material.id] ?? ''}
                  onChange={(event) => onQtyChange(material.id, event.target.value)}
                  className="w-[66px] min-h-9 px-2 py-1.5 text-sm text-right text-text bg-surface border border-divider hover:border-text/45 focus-visible:border-accent focus-visible:outline-offset-0"
                />
                <Button type="button" variant="primary" onClick={() => onAdd(material)}>
                  Adicionar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
