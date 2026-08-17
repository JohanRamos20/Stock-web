import { Button } from '../../../components/ui/Button'
import { CATEGORY_LABELS, UNIT_TYPE_LABELS, type Material } from '../../../types/stock'

interface ItemsTableProps {
  items: Material[]
  isLoading: boolean
  onEdit: (item: Material) => void
  onDelete: (item: Material) => void
}

export function ItemsTable({ items, isLoading, onEdit, onDelete }: ItemsTableProps) {
  if (isLoading) {
    return <p className="text-muted text-sm px-2 py-6">Carregando itens…</p>
  }

  if (items.length === 0) {
    return <p className="text-muted text-sm px-2 py-6">Nenhum item corresponde à busca.</p>
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Item
          </th>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Categoria
          </th>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Local
          </th>
          <th className="w-[120px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Disponível
          </th>
          <th className="w-[140px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-text/4">
            <td className="font-semibold px-2 py-2 border-b border-divider">{item.name}</td>
            <td className="text-muted px-2 py-2 border-b border-divider">{CATEGORY_LABELS[item.category]}</td>
            <td className="text-muted px-2 py-2 border-b border-divider">{item.location}</td>
            <td className="text-right tabular-nums px-2 py-2 border-b border-divider">
              {item.amount} {UNIT_TYPE_LABELS[item.unitType]}
            </td>
            <td className="px-2 py-2 border-b border-divider">
              <div className="flex justify-end gap-1">
                <Button type="button" variant="ghost" onClick={() => onEdit(item)}>
                  Editar
                </Button>
                <Button type="button" variant="ghost" onClick={() => onDelete(item)}>
                  Excluir
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
