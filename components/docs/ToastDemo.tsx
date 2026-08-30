'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Toast } from '@/components/ui/Toast'
import type { ToastProps } from '@/components/ui/Toast'

export function ToastDemo({ variant, message }: { variant: ToastProps['variant']; message: string }) {
  const [visible, setVisible] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Button onClick={() => setVisible(true)}>Show toast</Button>
      {visible ? <Toast variant={variant} message={message} onDismiss={() => setVisible(false)} /> : null}
    </div>
  )
}
