interface DashboardKpisProps {
  itemsCount: number
  unitsInStock: number
  openRequests: number
}

export function DashboardKpis({ itemsCount, unitsInStock, openRequests }: DashboardKpisProps) {
  const items = [
    { label: 'Itens cadastrados', value: itemsCount.toLocaleString('pt-BR') },
    { label: 'Unidades em estoque', value: unitsInStock.toLocaleString('pt-BR') },
    { label: 'Solicitações abertas', value: openRequests.toLocaleString('pt-BR') },
  ]

  return (
    <div className="grid grid-cols-3 gap-[2px] bg-divider border-y-2 border-divider mb-5">
      {items.map((item) => (
        <div key={item.label} className="bg-white p-5">
          <div className="text-[11px] tracking-[0.1em] uppercase text-muted mb-1">{item.label}</div>
          <div className="font-heading font-extrabold text-[32px] leading-none">{item.value}</div>
        </div>
      ))}
    </div>
  )
}
