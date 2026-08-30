'use client'

import { useState } from 'react'
import { Info } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'

export function ModalDemo({ variant }: { variant: 'confirm' | 'error' }) {
  const [open, setOpen] = useState(false)

  if (variant === 'error') {
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Trigger error modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Payment failed">
          <div className="ui-modal-error-body">
            <span className="ui-modal-error-icon">
              <Info size={20} weight="fill" />
            </span>
            <p>
              We couldn&apos;t process your card. No amount was charged — check the card details and
              try again.
            </p>
          </div>
          <div className="ui-modal-full-width-action">
            <Button onClick={() => setOpen(false)}>OK</Button>
          </div>
        </Modal>
      </>
    )
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete item</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this item?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        This can&apos;t be undone.
      </Modal>
    </>
  )
}
