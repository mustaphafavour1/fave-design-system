import NextLink from 'next/link'
import { CaretRight } from '@phosphor-icons/react/dist/ssr'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="ui-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={item.label} className="ui-breadcrumbs-item">
            {index > 0 ? <CaretRight size={11} className="ui-breadcrumbs-sep" /> : null}
            {item.href && !isLast ? (
              <NextLink href={item.href} className="ui-breadcrumbs-link">
                {item.label}
              </NextLink>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'ui-breadcrumbs-current' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
