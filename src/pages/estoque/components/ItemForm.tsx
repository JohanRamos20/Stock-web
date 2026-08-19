import type { FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import { Kicker } from '../../../components/ui/Kicker'
import { Select } from '../../../components/ui/Select'
import { CATEGORY_LABELS, UNIT_TYPE_LABELS, type MaterialCategory, type MaterialUnitType } from '../../../types/stock'

interface ItemFormValues {
  id: string | null
  name: string
  category: MaterialCategory
  location: string
  amount: string
  unitType: MaterialUnitType
}

interface ItemFormProps {
  form: ItemFormValues
  setForm: (updater: (form: ItemFormValues) => ItemFormValues) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClear: () => void
}

export function ItemForm({ form, setForm, onSubmit, onClear }: ItemFormProps) {
  const isEditing = form.id !== null

  return (
    <aside className="bg-white border-2 border-divider p-5 flex flex-col gap-3.5">
      <div>
        <Kicker>Cadastro de estoque</Kicker>
        <h4 className="m-0">{isEditing ? 'Editar item' : 'Novo item'}</h4>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
        <Field
          id="inome"
          label="Nome do item"
          placeholder="Ex.: Papel A4 75g (resma)"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />

        <Select
          id="icat"
          label="Categoria"
          value={form.category}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, category: event.target.value as MaterialCategory }))
          }
        >
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Field
          id="iloc"
          label="Local de armazenamento"
          placeholder="Ex.: Prateleira A-1"
          value={form.location}
          onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            id="iqtd"
            label="Quantidade disponível"
            type="number"
            min={0}
            placeholder="0"
            value={form.amount}
            onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
          />

          <Select
            id="iun"
            label="Unidade"
            value={form.unitType}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, unitType: event.target.value as MaterialUnitType }))
            }
          >
            {Object.entries(UNIT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex gap-2 mt-1">
          <Button type="submit" variant="primary">
            {isEditing ? 'Salvar alterações' : 'Cadastrar item'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClear}>
            Limpar
          </Button>
        </div>
      </form>
    </aside>
  )
}
