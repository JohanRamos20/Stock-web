import { Button } from '../../../components/ui/Button'
import { CATEGORY_LABELS, UNIT_TYPE_LABELS } from '../../../types/stock'
import type { CartItem } from '../../../data/cart/CartContext'

interface CartTableProps {
  items: CartItem[]
  onIncrement: (item: CartItem) => void
  onDecrement: (item: CartItem) => void
  onQuantityChange: (item: CartItem, value: string) => void
  onRemove: (item: CartItem) => void
}

export function CartTable({ items, onIncrement, onDecrement, onQuantityChange, onRemove }: CartTableProps) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th className="text-left text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Material
          </th>
          <th className="w-[150px] text-right text-[11px] tracking-[0.08em] uppercase text-muted px-2 py-2 border-b-2 border-divider">
            Quantidade
          </th>
          <th className="w-[60px] px-2 py-2 border-b-2 border-divider" />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.materialId} className="hover:bg-text/4">
            <td className="px-2 py-2 border-b border-divider">
              <div className="font-semibold">{item.name}</div>
              <div className="text-muted text-xs">{CATEGORY_LABELS[item.category]}</div>
            </td>
            <td className="px-2 py-2 border-b border-divider">
              <div className="flex justify-end items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-8 h-8 p-0"
                  onClick={() => onDecrement(item)}
                >
                  −
                </Button>
                <input
                  type="number"
                  min={1}
                  max={item.amount}
                  value={item.quantity}
                  onChange={(event) => onQuantityChange(item, event.target.value)}
                  className="w-16 min-h-9 px-2 py-1.5 text-sm text-center text-text bg-surface border border-divider hover:border-text/45 focus-visible:border-accent focus-visible:outline-offset-0"
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="w-8 h-8 p-0"
                  onClick={() => onIncrement(item)}
                >
                  +
                </Button>
              </div>
              <div className="text-muted text-[11px] text-right mt-1">
                disponível: {item.amount} {UNIT_TYPE_LABELS[item.unitType]}
              </div>
            </td>
            <td className="px-2 py-2 border-b border-divider text-right">
              <Button type="button" variant="ghost" onClick={() => onRemove(item)}>
                Remover
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
