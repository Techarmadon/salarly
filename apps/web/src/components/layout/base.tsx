import { cn } from '@salarly/ui/lib/utils'
import type { ReactNode } from 'react'

interface BaseProps {
  children: ReactNode
  className?: string
}

export default function Base({ children, className }: BaseProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center min-h-screen-with-nav bg-zinc-50 font-sans dark:bg-black p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
