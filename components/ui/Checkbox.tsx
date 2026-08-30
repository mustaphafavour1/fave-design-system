'use client'

import { useId, useRef, useEffect, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { Check, Minus } from '@phosphor-icons/react/dist/ssr'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  indeterminate?: boolean
}

export function Checkbox({ label, indeterminate = false, id, className, ...props }: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <label htmlFor={checkboxId} className={clsx('ui-checkbox', className)}>
      <input ref={ref} id={checkboxId} type="checkbox" className="ui-checkbox-input" {...props} />
      <span className="ui-checkbox-box">
        <Check className="ui-checkbox-icon-check" size={11} weight="bold" />
        <Minus className="ui-checkbox-icon-indeterminate" size={11} weight="bold" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  )
}
