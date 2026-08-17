import type { FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import { Kicker } from '../../../components/ui/Kicker'
import { Select } from '../../../components/ui/Select'
import { CATEGORIAS, LOCAIS, UNIDADES } from '../../../mocks/items'

interface ItemFormValues {
  id: number | null
  nome: string
  categoria: string
  local: string
  qtd: string
  un: string
  min: number
}

interface ItemFormProps {
  form: ItemFormValues
  setForm: (updater: (form: ItemFormValues) => ItemFormValues) => void
  message: string | null
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClear: () => void
}

export function ItemForm({ form, setForm, message, onSubmit, onClear }: ItemFormProps) {
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
          value={form.nome}
          onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
        />

        <Select
          id="icat"
          label="Categoria"
          value={form.categoria}
          onChange={(event) => setForm((prev) => ({ ...prev, categoria: event.target.value }))}
        >
          {CATEGORIAS.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </Select>

        <Select
          id="iloc"
          label="Local de armazenamento"
          value={form.local}
          onChange={(event) => setForm((prev) => ({ ...prev, local: event.target.value }))}
        >
          {LOCAIS.map((local) => (
            <option key={local} value={local}>
              {local}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Field
            id="iqtd"
            label="Quantidade disponível"
            type="number"
            min={0}
            placeholder="0"
            value={form.qtd}
            onChange={(event) => setForm((prev) => ({ ...prev, qtd: event.target.value }))}
          />

          <Select
            id="iun"
            label="Unidade"
            value={form.un}
            onChange={(event) => setForm((prev) => ({ ...prev, un: event.target.value }))}
          >
            {UNIDADES.map((un) => (
              <option key={un} value={un}>
                {un}
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

        {message && <div className="border-l-[3px] border-accent pl-3 py-2 text-[13px]">{message}</div>}
      </form>
    </aside>
  )
}
