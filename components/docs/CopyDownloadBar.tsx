'use client'

import { useState } from 'react'
import { Copy, DownloadSimple, Check } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/Button'

export function CopyDownloadBar({ content, filename }: { content: string; filename: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API can be unavailable (insecure context, permissions) —
      // there's no other fallback to offer here.
    }
  }

  function handleDownload() {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="guardrail-actions">
      <Button
        variant="secondary"
        size="sm"
        icon={copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
        onClick={handleCopy}
      >
        {copied ? 'Copied' : 'Copy'}
      </Button>
      <Button variant="secondary" size="sm" icon={<DownloadSimple size={14} weight="bold" />} onClick={handleDownload}>
        Download .md
      </Button>
    </div>
  )
}
