'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from '@phosphor-icons/react/dist/ssr'
import { urlFor } from '@/lib/sanity'

export interface ScreenshotImage {
  caption?: string
  [key: string]: unknown
}

// Client component — the one interactive piece of the Sanity image
// pipeline. Escape/click-outside close and a body-scroll lock while open,
// same as Modal.
export function ProductScreenshots({ images }: { images: ScreenshotImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [activeIndex])

  const active = activeIndex !== null ? images[activeIndex] : null

  return (
    <>
      <div className="product-screenshots-grid">
        {images.map((image, index) => (
          <button key={index} type="button" className="product-screenshot-thumb" onClick={() => setActiveIndex(index)}>
            <Image
              src={urlFor(image).width(400).url()}
              alt={image.caption ?? ''}
              fill
              sizes="220px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {active ? (
        <div className="product-lightbox-overlay" onClick={() => setActiveIndex(null)}>
          <button type="button" className="product-lightbox-close" aria-label="Close" onClick={() => setActiveIndex(null)}>
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- variable viewport-fit sizing, not worth a fixed width/height */}
          <div className="product-lightbox-body" onClick={(e) => e.stopPropagation()}>
            <img
              src={urlFor(active).width(1400).url()}
              alt={active.caption ?? ''}
              className="product-lightbox-image"
            />
            {active.caption ? <p className="product-lightbox-caption">{active.caption}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
