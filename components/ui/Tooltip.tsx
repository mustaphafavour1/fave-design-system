import type { ReactNode } from 'react'
import clsx from 'clsx'

export function Tooltip({
  label,
  children,
  side = 'top',
}: {
  label: string
  children: ReactNode
  side?: 'top' | 'bottom'
}) {
  return (
    <span className={clsx('ui-tooltip-wrap', `ui-tooltip-${side}`)}>
      {children}
      <span className="ui-tooltip-bubble" role="tooltip">
        {label}
      </span>
    </span>
  )
}
