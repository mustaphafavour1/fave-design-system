import NextLink from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string
  variant?: 'standalone' | 'inline'
  muted?: boolean
  external?: boolean
  children: ReactNode
}

export function Link({
  href,
  variant = 'standalone',
  muted = false,
  external = false,
  className,
  children,
  ...props
}: LinkProps) {
  const classes = clsx('ui-link', `ui-link-${variant}`, muted && 'ui-link-muted', className)
  const isExternal = external || /^https?:\/\//.test(href)

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...props}>
        {children}
        <ArrowUpRight size={13} weight="bold" />
      </a>
    )
  }

  return (
    <NextLink href={href} className={classes} {...props}>
      {children}
    </NextLink>
  )
}
