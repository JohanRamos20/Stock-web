import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center text-[11px] tracking-[0.02em] px-2.5 py-[3px] bg-accent-100 text-accent-800">
      {children}
    </span>
  )
}
