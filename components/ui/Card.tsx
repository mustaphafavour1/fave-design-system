import type { ReactNode, HTMLAttributes } from 'react'
import clsx from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
}

export function Card({ children, padding = 'md', className, ...props }: CardProps) {
  return (
    <div className={clsx('ui-card', `ui-card-padding-${padding}`, className)} {...props}>
      {children}
    </div>
  )
}
