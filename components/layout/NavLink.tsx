'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import type { ReactNode } from 'react'

export function NavLink({
  href,
  children,
  badge,
  topLevel = false,
}: {
  href: string
  children: ReactNode
  badge?: string
  topLevel?: boolean
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} className={clsx('nav-link', topLevel && 'nav-link-top', isActive && 'active')}>
      <span>{children}</span>
      {badge ? <span className="nav-badge">{badge}</span> : null}
    </Link>
  )
}
