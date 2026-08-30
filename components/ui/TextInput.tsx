'use client'

import { useId, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export function TextInput({ label, hint, error, required, id, className, ...props }: TextInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="ui-field">
      {label ? (
        <label htmlFor={inputId} className="ui-field-label">
          {label}
          {required ? <span className="ui-field-required"> *</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        className={clsx('ui-text-input', error && 'has-error', className)}
        aria-invalid={!!error || undefined}
        aria-describedby={describedBy}
        required={required}
        {...props}
      />
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
