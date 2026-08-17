import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  wrapperClassName?: string
}

export function Select({ id, label, wrapperClassName = '', className = '', ...props }: SelectProps) {
  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="block text-xs mb-1 text-text/70">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className={`w-full min-h-9 px-2.5 py-1.5 text-sm text-text bg-surface border border-divider hover:border-text/45 focus-visible:border-accent focus-visible:outline-offset-0 ${className}`}
      />
    </div>
  )
}
