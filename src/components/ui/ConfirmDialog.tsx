import { Button } from './Button'
import { Field } from './Field'

interface ConfirmDialogProps {
  open: boolean
  title: string
  body: string
  actionLabel: string
  onCancel: () => void
  onConfirm: () => void
  password?: string
  onPasswordChange?: (value: string) => void
}

export function ConfirmDialog({
  open,
  title,
  body,
  actionLabel,
  onCancel,
  onConfirm,
  password,
  onPasswordChange,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 grid place-items-center p-4 bg-neutral-900/50">
      <div className="w-full max-w-[440px] flex flex-col gap-3 p-5 bg-white border-2 border-divider">
        <div className="font-heading font-extrabold text-xl">{title}</div>
        <div className="text-sm opacity-85">{body}</div>
        {onPasswordChange && (
          <Field
            id="confirm-password"
            label="Sua senha"
            type="password"
            value={password ?? ''}
            onChange={(event) => onPasswordChange(event.target.value)}
          />
        )}
        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={onPasswordChange ? !password?.trim() : false}
            onClick={onConfirm}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
