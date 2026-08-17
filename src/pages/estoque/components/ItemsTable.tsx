import { Button } from '../../../components/ui/Button'
import type { StockItem } from '../../../mocks/items'

interface ItemsTableProps {
  items: StockItem[]
  onEdit: (item: StockItem) => void
  onDelete: (item: StockItem) => void
}

export function ItemsTable({ items, onEdit, onDelete }: ItemsTableProps) {
  if (items.length === 0) {
    return <p className="text-muted text-sm px-2 py-6">Nenhum item corresponde à busca.</p>
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="w-[86px] text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Código
          </th>
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
            <td className="text-muted tabular-nums px-2 py-2 border-b border-divider">{item.codigo}</td>
            <td className="font-semibold px-2 py-2 border-b border-divider">{item.nome}</td>
            <td className="text-muted px-2 py-2 border-b border-divider">{item.categoria}</td>
            <td className="text-muted px-2 py-2 border-b border-divider">{item.local}</td>
            <td className="text-right tabular-nums px-2 py-2 border-b border-divider">
              {item.qtd} {item.un}
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
