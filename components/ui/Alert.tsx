import type { ReactNode } from 'react'
import { CheckCircle, Warning, XCircle, Info } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

export interface AlertProps {
  variant?: 'success' | 'warning' | 'error' | 'info'
  title: string
  children?: ReactNode
}

const ICONS = {
  success: CheckCircle,
  warning: Warning,
  error: XCircle,
  info: Info,
}

export function Alert({ variant = 'info', title, children }: AlertProps) {
  const Icon = ICONS[variant]
  return (
    <div className={clsx('ui-alert', `ui-alert-${variant}`)} role="alert">
      <Icon size={18} weight="fill" className="ui-alert-icon" />
      <div>
        <div className="ui-alert-title">{title}</div>
        {children ? <div className="ui-alert-body">{children}</div> : null}
      </div>
    </div>
  )
}
