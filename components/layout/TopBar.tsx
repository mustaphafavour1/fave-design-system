'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'

function toTitleCase(segment: string) {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatDateTime(date: Date) {
  const datePart = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
  const timePart = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${datePart} · ${timePart}`
}

export function TopBar() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.length > 0 ? segments.map(toTitleCase) : ['Overview']

  // Rendered null on the server and filled in after mount so the clock
  // never causes a hydration mismatch against the server-rendered markup.
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="topbar">
      <div className="breadcrumb">
        {crumbs.map((crumb, index) => (
          <span key={crumb + index} className={index === crumbs.length - 1 ? 'breadcrumb-current' : undefined}>
            {index > 0 ? ' / ' : ''}
            {crumb}
          </span>
        ))}
      </div>

      <label className="topbar-search">
        <MagnifyingGlass size={15} />
        <input type="search" placeholder="Search the design system" aria-label="Search the design system" />
      </label>

      <span className="topbar-datetime">{now ? formatDateTime(now) : ' '}</span>
    </div>
  )
}
