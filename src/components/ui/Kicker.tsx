import type { ReactNode } from 'react'

interface KickerProps {
  children: ReactNode
  className?: string
}

export function Kicker({ children, className = '' }: KickerProps) {
  return <h6 className={`text-accent-700 ${className}`}>{children}</h6>
}
