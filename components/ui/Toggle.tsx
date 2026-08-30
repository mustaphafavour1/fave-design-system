'use client'

import { useId, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export function Toggle({ label, id, className, ...props }: ToggleProps) {
  const generatedId = useId()
  const toggleId = id ?? generatedId

  return (
    <label htmlFor={toggleId} className={clsx('ui-toggle', className)}>
      <input id={toggleId} type="checkbox" role="switch" className="ui-toggle-input" {...props} />
      <span className="ui-toggle-track">
        <span className="ui-toggle-thumb" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
