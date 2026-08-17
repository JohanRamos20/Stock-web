import { Alert } from '../../components/ui/Alert'
import { Field } from '../../components/ui/Field'
import { RequestsKpis } from './components/RequestsKpis'
import { RequestRow } from './components/RequestRow'
import { useSolicitacoesPage, type StatusFilter } from './useSolicitacoesPage'

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'Todas', value: 'ALL' },
  { label: 'Em análise', value: 'PENDING' },
  { label: 'Atendidas', value: 'COMPLETED' },
  { label: 'Canceladas', value: 'CANCELED' },
]

export function SolicitacoesPage() {
  const {
    isLoading,
    loadError,
    actionError,
    pdfNotice,
    rows,
    filteredRows,
    registered,
    unitsMoved,
    requesters,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    openId,
    toggleExpand,
    completingId,
    pdfDone,
    generatingPdfId,
    handleComplete,
    handleGeneratePdf,
  } = useSolicitacoesPage()

  return (
    <div>
      <div className="flex items-end justify-between gap-6 mb-5">
        <div>
          <h2 className="mb-1">Auditoria de solicitações</h2>
          <p className="text-muted text-sm m-0">
            {filteredRows.length} de {rows.length} solicitações
          </p>
        </div>
        <Field
          id="sbusca"
          label="Buscar"
          placeholder="Servidor ou material"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          wrapperClassName="w-[300px]"
        />
      </div>

      <RequestsKpis registered={registered} unitsMoved={unitsMoved} requesters={requesters} />

      <div className="flex gap-[2px] border border-divider w-max mb-5">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setStatusFilter(filter.value)}
            className={`px-3.5 py-2 text-sm font-heading font-extrabold cursor-pointer border-0 ${
              statusFilter === filter.value ? 'bg-accent text-white' : 'bg-white text-text hover:bg-text/5'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loadError && <Alert>{loadError}</Alert>}
      {actionError && <Alert>{actionError}</Alert>}

      {isLoading && <p className="text-muted text-sm px-2 py-6">Carregando solicitações…</p>}

      {!isLoading && filteredRows.length === 0 && (
        <p className="text-muted text-sm px-2 py-6">Nenhuma solicitação corresponde ao filtro.</p>
      )}

      {!isLoading && filteredRows.length > 0 && (
        <div className="flex flex-col gap-[2px] bg-divider border-y-2 border-divider">
          {filteredRows.map((row) => (
            <RequestRow
              key={row.request.id}
              row={row}
              isOpen={openId === row.request.id}
              onToggle={() => toggleExpand(row.request.id)}
              onComplete={() => void handleComplete(row.request.id)}
              onGeneratePdf={() => void handleGeneratePdf(row.request.id)}
              isCompleting={completingId === row.request.id}
              isGeneratingPdf={generatingPdfId === row.request.id}
              pdfDone={Boolean(pdfDone[row.request.id])}
              pdfNotice={openId === row.request.id ? pdfNotice : null}
            />
          ))}
        </div>
      )}
    </div>
  )
}
