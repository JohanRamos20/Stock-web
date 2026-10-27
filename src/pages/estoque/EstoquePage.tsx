import { Button } from '../../components/ui/Button'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { Field } from '../../components/ui/Field'
import { Pagination } from '../../components/ui/Pagination'
import { ItemForm } from './components/ItemForm'
import { ItemsTable } from './components/ItemsTable'
import { useEstoquePage } from './useEstoquePage'

export function EstoquePage() {
  const {
    items,
    total,
    page,
    setPage,
    totalPages,
    isLoading,
    search,
    handleSearchChange,
    isFormOpen,
    form,
    setForm,
    message,
    confirm,
    handleToggleForm,
    handleClearForm,
    handleEdit,
    handleDelete,
    handleSubmit,
    closeConfirm,
    runConfirm,
  } = useEstoquePage()

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-5">
        <div>
          <h2 className="mb-1">Registro de itens</h2>
          <p className="text-muted text-sm m-0">
            {items.length} de {total} itens cadastrados
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end w-full sm:w-auto">
          <Field
            id="ibusca"
            label="Buscar item"
            placeholder="Nome, categoria ou local"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            wrapperClassName="w-full sm:w-[260px]"
          />
          <Button type="button" variant="primary" className="w-full sm:w-auto" onClick={handleToggleForm}>
            {isFormOpen ? 'Fechar formulário' : 'Novo item'}
          </Button>
        </div>
      </div>

      {message && <div className="border-l-[3px] border-accent pl-3 py-2 text-[13px] mb-5">{message}</div>}

      {isFormOpen ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <ItemsTable items={items} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
          <ItemForm form={form} setForm={setForm} onSubmit={handleSubmit} onClear={handleClearForm} />
        </div>
      ) : (
        <ItemsTable items={items} isLoading={isLoading} onEdit={handleEdit} onDelete={handleDelete} />
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
