import type { FormEvent } from 'react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import { Kicker } from '../../../components/ui/Kicker'
import { Select } from '../../../components/ui/Select'
import { ROLE_LABELS, SECTOR_LABELS, type ApiRole, type Sector } from '../../../types/auth'

interface ServerFormValues {
  name: string
  email: string
  siapp: string
  sector: Sector
  role: ApiRole
}

interface ServerFormProps {
  form: ServerFormValues
  setForm: (updater: (form: ServerFormValues) => ServerFormValues) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onClear: () => void
}

export function ServerForm({ form, setForm, onSubmit, onClear }: ServerFormProps) {
  return (
    <aside className="bg-white border-2 border-divider p-5 flex flex-col gap-3.5">
      <div>
        <Kicker>Cadastro</Kicker>
        <h4 className="m-0">Novo servidor</h4>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3.5">
        <Field
          id="snome"
          label="Nome completo"
          placeholder="Ex.: Ana Paula Vieira"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />

        <Field
          id="ssiapp"
          label="Matrícula SIAPE"
          placeholder="1234567"
          value={form.siapp}
          onChange={(event) => setForm((prev) => ({ ...prev, siapp: event.target.value }))}
        />

        <Select
          id="ssetor"
          label="Setor"
          value={form.sector}
          onChange={(event) => setForm((prev) => ({ ...prev, sector: event.target.value as Sector }))}
        >
          {Object.entries(SECTOR_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Select
          id="spapel"
          label="Papel"
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value as ApiRole }))}
        >
          {Object.entries(ROLE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Field
          id="semail"
          label="E-mail institucional"
          type="email"
          placeholder="nome@ifce.edu.br"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />

        <div className="flex gap-2 mt-1">
          <Button type="submit" variant="primary">
            Cadastrar
          </Button>
          <Button type="button" variant="secondary" onClick={onClear}>
            Limpar
          </Button>
        </div>
      </form>
    </aside>
  )
}
