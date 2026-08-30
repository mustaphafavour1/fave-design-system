'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { ResolvedIcon } from '@/lib/icons'

export function NavLink({
  href,
  children,
  badge,
  topLevel = false,
  icon,
}: {
  href: string
  children: ReactNode
  badge?: string
  topLevel?: boolean
  icon?: string
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className={clsx('nav-link', topLevel && 'nav-link-top', isActive && 'active')}>
      <span className="nav-link-label">
        {icon ? <ResolvedIcon name={icon} size={14} /> : null}
        {children}
      </span>
      {badge ? <span className="nav-badge">{badge}</span> : null}
    </Link>
  )
}
