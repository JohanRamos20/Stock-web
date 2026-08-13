import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  block?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-accent text-white border-transparent hover:not-disabled:bg-accent-600 active:not-disabled:bg-accent-700',
  secondary:
    'bg-transparent text-text border-divider hover:not-disabled:bg-text/7 active:not-disabled:bg-text/14',
  ghost:
    'bg-transparent text-accent border-transparent px-1 hover:not-disabled:bg-accent/10 active:not-disabled:bg-accent/18',
}

export function Button({ variant = 'primary', block = false, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 cursor-pointer no-underline font-heading font-extrabold text-sm leading-tight border px-3.5 py-2 disabled:opacity-45 disabled:cursor-not-allowed ${variantClasses[variant]} ${block ? 'w-full mt-2 justify-center' : ''} ${className}`}
    />
  )
}
