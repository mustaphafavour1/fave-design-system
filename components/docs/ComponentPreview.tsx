'use client'

import { useState, type ReactNode } from 'react'
import { Copy, Check } from '@phosphor-icons/react/dist/ssr'

export function ComponentPreview({
  title,
  description,
  code,
  children,
}: {
  title: string
  description?: string
  code?: string
  children: ReactNode
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API can be unavailable (insecure context, permissions) —
      // the code is still visible to copy by hand.
    }
  }

  const showCode = tab === 'code' && !!code

  return (
    <div className="component-preview">
      <div className="component-preview-header">
        <div>
          <div className="component-preview-title">{title}</div>
          {description ? <div className="component-preview-description">{description}</div> : null}
        </div>
        {code ? (
          <div className="component-preview-tabs">
            <button
              type="button"
              className={`component-preview-tab${tab === 'preview' ? ' active' : ''}`}
              onClick={() => setTab('preview')}
            >
              Preview
            </button>
            <button
              type="button"
              className={`component-preview-tab${tab === 'code' ? ' active' : ''}`}
              onClick={() => setTab('code')}
            >
              Code
            </button>
          </div>
        ) : null}
      </div>

      {showCode ? (
        <div className="component-preview-code">
          <button type="button" className="component-preview-copy" onClick={handleCopy}>
            {copied ? <Check size={13} weight="bold" /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      ) : (
        <div className="demo-surface component-preview-canvas">{children}</div>
      )}
    </div>
  )
}
