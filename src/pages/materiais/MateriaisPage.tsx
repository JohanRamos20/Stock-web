import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Field } from '../../components/ui/Field'
import { ROUTES } from '../../app/paths'
import { MaterialsCatalogTable } from './components/MaterialsCatalogTable'
import { useMateriaisPage } from './useMateriaisPage'

export function MateriaisPage() {
  const navigate = useNavigate()
  const { materials, filteredMaterials, isLoading, message, search, setSearch, qty, handleQtyChange, handleAdd, cartCount } =
    useMateriaisPage()

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-5">
        <div>
          <h2 className="mb-1">Solicitação de materiais</h2>
          <p className="text-muted text-sm m-0">
            {filteredMaterials.length} de {materials.length} itens disponíveis
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end w-full sm:w-auto">
          <Field
            id="mbusca"
            label="Buscar material"
            placeholder="Nome ou categoria"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            wrapperClassName="w-full sm:w-[280px]"
          />
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={() => navigate(ROUTES.carrinho)}>
            Ver solicitação ({cartCount})
          </Button>
        </div>
      </div>

      {message && <div className="border-l-[3px] border-accent pl-3 py-2 text-[13px] mb-4">{message}</div>}

      <MaterialsCatalogTable
        materials={filteredMaterials}
        isLoading={isLoading}
        qty={qty}
        onQtyChange={handleQtyChange}
        onAdd={handleAdd}
      />
    </div>
  )
}
