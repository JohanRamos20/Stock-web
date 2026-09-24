import { Alert } from '../../components/ui/Alert'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { Field } from '../../components/ui/Field'
import { Pagination } from '../../components/ui/Pagination'
import { RequestRow } from './components/RequestRow'
import { useSolicitacoesPage, type StatusFilter } from './useSolicitacoesPage'

const FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'Todas', value: 'ALL' },
  { label: 'Em análise', value: 'PENDING' },
  { label: 'Separadas', value: 'SEPARATED' },
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
    pagedRows,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    openId,
    toggleExpand,
    completingId,
    pdfDone,
    generatingPdfId,
    cancelingId,
    separatingId,
    confirm,
    handleComplete,
    handleGeneratePdf,
    handleCancelRequest,
    handleSeparate,
    closeConfirm,
    runConfirm,
  } = useSolicitacoesPage()

  return (
    <div>
      <div className="flex items-end justify-between gap-6 mb-5">
        <h2 className="mb-1">Auditoria de solicitações</h2>
        <Field
          id="sbusca"
          label="Buscar"
          placeholder="Servidor ou material"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          wrapperClassName="w-[300px]"
        />
      </div>

      <div className="bg-white border-y-2 border-divider px-4 py-3 mb-5">
        <div className="text-[11px] tracking-[0.1em] uppercase text-muted mb-1">Solicitações</div>
        <div className="font-heading font-extrabold text-2xl leading-none">
          {filteredRows.length} de {rows.length} solicitações
        </div>
      </div>

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
          {pagedRows.map((row) => (
            <RequestRow
              key={row.request.id}
              row={row}
              isOpen={openId === row.request.id}
              onToggle={() => toggleExpand(row.request.id)}
              onComplete={() => void handleComplete(row.request.id)}
              onGeneratePdf={() => void handleGeneratePdf(row.request.id)}
              onCancel={() => handleCancelRequest(row.request)}
              onSeparate={() => void handleSeparate(row.request.id)}
              isCompleting={completingId === row.request.id}
              isGeneratingPdf={generatingPdfId === row.request.id}
              isCanceling={cancelingId === row.request.id}
              isSeparating={separatingId === row.request.id}
              pdfDone={Boolean(pdfDone[row.request.id])}
              pdfNotice={openId === row.request.id ? pdfNotice : null}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ''}
        body={confirm?.body ?? ''}
        actionLabel={confirm?.actionLabel ?? ''}
        onCancel={closeConfirm}
        onConfirm={runConfirm}
      />
    </div>
  )
}
