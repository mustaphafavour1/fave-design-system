import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  label: string
  variant?: 'ghost' | 'solid'
  size?: 'sm' | 'md' | 'lg'
}

// `label` is required, not optional — an icon-only button with no
// accessible name is the single most common accessibility bug in a
// component library, so the API makes the correct usage the only usage.
export function IconButton({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx('ui-icon-button', `ui-icon-button-${variant}`, `ui-icon-button-${size}`, className)}
      {...props}
    >
      {icon}
    </button>
  )
}
