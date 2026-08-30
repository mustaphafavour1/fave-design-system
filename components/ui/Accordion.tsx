'use client'

import { useState, type ReactNode } from 'react'
import { CaretDown } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'

export interface AccordionItem {
  title: string
  content: ReactNode
}

export function Accordion({
  items,
  defaultOpen = [0],
}: {
  items: AccordionItem[]
  defaultOpen?: number[]
}) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen)

  function toggle(index: number) {
    setOpenIndexes((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index]
    )
  }

  return (
    <div className="ui-accordion">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index)
        return (
          <div className="ui-accordion-item" key={item.title}>
            <button
              type="button"
              className="ui-accordion-trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(index)}
            >
              <span>{item.title}</span>
              <CaretDown size={14} weight="bold" className={clsx('ui-accordion-caret', isOpen && 'is-open')} />
            </button>
            {isOpen ? <div className="ui-accordion-content">{item.content}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
