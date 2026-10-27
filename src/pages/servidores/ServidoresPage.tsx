import { Button } from '../../components/ui/Button'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { Field } from '../../components/ui/Field'
import { Pagination } from '../../components/ui/Pagination'
import { ServerForm } from './components/ServerForm'
import { ServersTable } from './components/ServersTable'
import { useServidoresPage } from './useServidoresPage'

export function ServidoresPage() {
  const {
    users,
    total,
    page,
    setPage,
    totalPages,
    isLoading,
    search,
    setSearch,
    isFormOpen,
    form,
    setForm,
    message,
    confirm,
    deletePassword,
    setDeletePassword,
    resettingId,
    deletingId,
    handleToggleForm,
    handleClearForm,
    handleSubmit,
    handleResetPassword,
    handleDeleteUser,
    closeConfirm,
    runConfirm,
  } = useServidoresPage()

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-5">
        <div>
          <h2 className="mb-1">Registro de servidores</h2>
          <p className="text-muted text-sm m-0">{users.length} de {total} servidores habilitados a retirar material</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end w-full sm:w-auto">
          <Field
            id="sbusca"
            label="Buscar servidor"
            placeholder="Nome, e-mail, SIAPE ou setor"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            wrapperClassName="w-full sm:w-[280px]"
          />
          <Button type="button" variant="primary" className="w-full sm:w-auto" onClick={handleToggleForm}>
            {isFormOpen ? 'Fechar cadastro' : 'Novo servidor'}
          </Button>
        </div>
      </div>

      {message && <div className="border-l-[3px] border-accent pl-3 py-2 text-[13px] mb-5">{message}</div>}

      {isFormOpen ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <ServersTable
            users={users}
            isLoading={isLoading}
            onResetPassword={handleResetPassword}
            onDeleteUser={handleDeleteUser}
            resettingId={resettingId}
            deletingId={deletingId}
          />
          <ServerForm form={form} setForm={setForm} onSubmit={handleSubmit} onClear={handleClearForm} />
        </div>
      ) : (
        <ServersTable
          users={users}
          isLoading={isLoading}
          onResetPassword={handleResetPassword}
          onDeleteUser={handleDeleteUser}
          resettingId={resettingId}
          deletingId={deletingId}
        />
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        open={confirm !== null}
        title={confirm?.title ?? ''}
        body={confirm?.body ?? ''}
        actionLabel={confirm?.actionLabel ?? ''}
        onCancel={closeConfirm}
        onConfirm={runConfirm}
        password={confirm?.needsPassword ? deletePassword : undefined}
        onPasswordChange={confirm?.needsPassword ? setDeletePassword : undefined}
      />
    </div>
  )
}
