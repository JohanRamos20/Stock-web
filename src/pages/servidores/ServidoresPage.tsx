import { Button } from '../../components/ui/Button'
import { ConfirmDialog } from '../../components/ui/ConfirmDialog'
import { ServerForm } from './components/ServerForm'
import { ServersTable } from './components/ServersTable'
import { useServidoresPage } from './useServidoresPage'

export function ServidoresPage() {
  const {
    users,
    isLoading,
    isFormOpen,
    form,
    setForm,
    message,
    confirm,
    resettingId,
    handleToggleForm,
    handleClearForm,
    handleSubmit,
    handleResetPassword,
    closeConfirm,
    runConfirm,
  } = useServidoresPage()

  return (
    <div>
      <div className="flex items-end justify-between gap-6 mb-5">
        <div>
          <h2 className="mb-1">Registro de servidores</h2>
          <p className="text-muted text-sm m-0">{users.length} servidores habilitados a retirar material</p>
        </div>
        <Button type="button" variant="primary" onClick={handleToggleForm}>
          {isFormOpen ? 'Fechar cadastro' : 'Novo servidor'}
        </Button>
      </div>

      {message && <div className="border-l-[3px] border-accent pl-3 py-2 text-[13px] mb-5">{message}</div>}

      {isFormOpen ? (
        <div className="grid grid-cols-[1.6fr_1fr] gap-8 items-start">
          <ServersTable
            users={users}
            isLoading={isLoading}
            onResetPassword={handleResetPassword}
            resettingId={resettingId}
          />
          <ServerForm form={form} setForm={setForm} onSubmit={handleSubmit} onClear={handleClearForm} />
        </div>
      ) : (
        <ServersTable
          users={users}
          isLoading={isLoading}
          onResetPassword={handleResetPassword}
          resettingId={resettingId}
        />
      )}

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
