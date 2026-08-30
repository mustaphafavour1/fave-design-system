'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from '@phosphor-icons/react/dist/ssr'
import { IconButton } from './IconButton'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="ui-modal-overlay" onClick={onClose}>
      <div
        className="ui-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ui-modal-header">
          <h2 id="ui-modal-title" className="ui-modal-title">
            {title}
          </h2>
          <IconButton icon={<X size={16} />} label="Close" size="sm" onClick={onClose} />
        </div>
        <div className="ui-modal-body">{children}</div>
        {footer ? <div className="ui-modal-footer">{footer}</div> : null}
      </div>
    </div>
  )
}
