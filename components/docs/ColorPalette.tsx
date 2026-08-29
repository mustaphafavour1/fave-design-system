'use client'

import { useState } from 'react'
import { Check } from '@phosphor-icons/react/dist/ssr'

export interface ColorSwatchData {
  name: string
  hex: string
}

export function ColorPalette({ colors }: { colors: ColorSwatchData[] }) {
  const [copied, setCopied] = useState<string | null>(null)

  async function handleCopy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setTimeout(() => setCopied((current) => (current === hex ? null : current)), 1500)
    } catch {
      // Clipboard API can be unavailable (insecure context, permissions) —
      // the hex value is still visible on the swatch to copy by hand.
    }
  }

  return (
    <div className="color-palette">
      {colors.map((color) => (
        <button
          key={color.name + color.hex}
          type="button"
          className="color-swatch"
          onClick={() => handleCopy(color.hex)}
        >
          <span className="color-swatch-preview" style={{ background: color.hex }} />
          <span className="color-swatch-info">
            <span className="color-swatch-name">{color.name}</span>
            <span className="color-swatch-hex">{color.hex}</span>
          </span>
          <span className={`color-swatch-copied${copied === color.hex ? ' is-visible' : ''}`}>
            <Check size={12} weight="bold" />
            Copied
          </span>
        </button>
      ))}
    </div>
  )
}
