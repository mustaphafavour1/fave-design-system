'use client'

import { usePathname } from 'next/navigation'

function toTitleCase(segment: string) {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function TopBar() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const crumbs = segments.length > 0 ? segments.map(toTitleCase) : ['Overview']
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'm7vu676k'

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
      <a
        className="manage-link"
        href={`https://www.sanity.io/manage/project/${projectId}`}
        target="_blank"
        rel="noreferrer"
      >
        Manage Content
      </a>
    </div>
  )
}
