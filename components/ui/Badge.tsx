import type { ReactNode } from 'react'
import clsx from 'clsx'

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  children: ReactNode
}

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  return <span className={clsx('ui-badge', `ui-badge-${variant}`)}>{children}</span>
}
