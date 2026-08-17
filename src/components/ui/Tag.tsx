import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'accent' | 'neutral' | 'outline'
}

const variantClasses: Record<NonNullable<TagProps['variant']>, string> = {
  accent: 'bg-accent-100 text-accent-800',
  neutral: 'bg-text/8 text-text/70',
  outline: 'bg-transparent text-text/70 border border-divider',
}

export function Tag({ children, variant = 'accent' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center text-[11px] tracking-[0.02em] px-2.5 py-[3px] ${variantClasses[variant]}`}
    >
      {children}
    </span>
  )
}
