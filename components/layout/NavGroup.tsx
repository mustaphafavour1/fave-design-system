'use client'

import { useState, useEffect, useId } from 'react'
import { usePathname } from 'next/navigation'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import { NavLink } from './NavLink'
import { ResolvedIcon } from '@/lib/icons'
import type { NavSectionDef } from '@/lib/navigation'

function sectionContainsPath(section: NavSectionDef, pathname: string): boolean {
  if (section.items?.some((item) => item.href === pathname)) return true
  if (section.groups?.some((group) => group.items.some((item) => item.href === pathname))) return true
  return false
}

export function NavGroup({
  section,
  badgeOverrides,
  emptyMessage,
}: {
  section: NavSectionDef
  badgeOverrides: Map<string, string>
  emptyMessage?: string
}) {
  const pathname = usePathname()
  const isActive = sectionContainsPath(section, pathname)
  // Whichever group contains the current page auto-expands on load; every
  // other group defaults collapsed. The effect (not just the initial
  // useState) re-opens this group on later client-side navigation into it
  // too, since the Sidebar doesn't remount between routes.
  const [open, setOpen] = useState(isActive)
  const bodyId = useId()

  useEffect(() => {
    if (isActive) setOpen(true)
  }, [isActive])

  const hasChildren = (section.items && section.items.length > 0) || (section.groups && section.groups.length > 0)

  return (
    <div className="nav-group">
      <button
        type="button"
        className="nav-group-trigger"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav-group-trigger-label">
          {section.icon ? <ResolvedIcon name={section.icon} size={14} /> : null}
          {section.label}
        </span>
        <CaretRight
          size={11}
          weight="bold"
          aria-hidden="true"
          className={clsx('nav-group-chevron', open && 'is-open')}
        />
      </button>
      <div className={clsx('nav-group-collapse', open && 'is-open')}>
        <div className="nav-group-collapse-inner">
          <div id={bodyId} className="nav-group-children" aria-hidden={!open} inert={!open}>
            {hasChildren ? (
              <>
                {section.items?.map((item) => (
                  <NavLink key={item.href} href={item.href} badge={badgeOverrides.get(item.href) ?? item.badge}>
                    {item.label}
                  </NavLink>
                ))}
                {section.groups?.map((group) => (
                  <div key={group.label}>
                    <div className="nav-group-label">{group.label}</div>
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        badge={badgeOverrides.get(item.href) ?? item.badge}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="nav-empty">{emptyMessage ?? 'Nothing here yet'}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
