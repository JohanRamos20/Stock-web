import type { ReactNode } from 'react'

interface AlertProps {
  children: ReactNode
}

export function Alert({ children }: AlertProps) {
  return (
    <div className="bg-accent-100 border-l-[3px] border-accent px-4 py-3 text-[13px] mb-4.5 text-accent-800" role="alert">
      {children}
    </div>
  )
}
