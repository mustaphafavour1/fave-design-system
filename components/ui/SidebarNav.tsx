'use client'

import { useState } from 'react'
import clsx from 'clsx'

export interface SidebarNavItem {
  label: string
  badge?: string
}

export function SidebarNav({
  items,
  defaultActive,
}: {
  items: SidebarNavItem[]
  defaultActive?: string
}) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.label)

  return (
    <nav className="ui-sidebar-nav">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className={clsx('ui-sidebar-nav-item', active === item.label && 'active')}
          onClick={() => setActive(item.label)}
        >
          <span>{item.label}</span>
          {item.badge ? <span className="ui-sidebar-nav-badge">{item.badge}</span> : null}
        </button>
      ))}
    </nav>
  )
}
