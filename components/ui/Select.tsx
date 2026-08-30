'use client'

import { useId, type SelectHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import { CaretDown } from '@phosphor-icons/react/dist/ssr'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  children: ReactNode
}

export function Select({
  label,
  hint,
  error,
  required,
  id,
  className,
  children,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = hint ? `${selectId}-hint` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="ui-field">
      {label ? (
        <label htmlFor={selectId} className="ui-field-label">
          {label}
          {required ? <span className="ui-field-required"> *</span> : null}
        </label>
      ) : null}
      <div className="ui-select-wrap">
        <select
          id={selectId}
          className={clsx('ui-select', error && 'has-error', className)}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          required={required}
          {...props}
        >
          {children}
        </select>
        <CaretDown size={14} weight="bold" className="ui-select-caret" />
      </div>
      {error ? (
        <p id={errorId} className="ui-field-error">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="ui-field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
