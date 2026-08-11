import type { InputHTMLAttributes } from 'react'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  wrapperClassName?: string
}

export function Field({ id, label, wrapperClassName = '', className = '', ...props }: FieldProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block text-xs mb-1 text-text/70">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full min-h-9 px-2.5 py-1.5 text-sm text-text caret-accent bg-surface border border-divider hover:border-text/45 focus-visible:border-accent focus-visible:outline-offset-0 ${className}`}
      />
    </div>
  )
}
