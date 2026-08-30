import { CheckCircle, WarningCircle, Info, X } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

export interface ToastProps {
  variant?: 'success' | 'error' | 'info'
  message: string
  onDismiss?: () => void
}

const ICONS = { success: CheckCircle, error: WarningCircle, info: Info }

export function Toast({ variant = 'info', message, onDismiss }: ToastProps) {
  const Icon = ICONS[variant]
  return (
    <div className={clsx('ui-toast', `ui-toast-${variant}`)} role="status">
      <Icon size={18} weight="fill" />
      <span>{message}</span>
      {onDismiss ? (
        <button type="button" className="ui-toast-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <X size={14} />
        </button>
      ) : null}
    </div>
  )
}
