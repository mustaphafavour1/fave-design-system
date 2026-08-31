import type { ReactNode } from 'react'

export function PageHeader({
  section,
  title,
  description,
  status,
  figmaUrl,
  actions,
}: {
  section: string
  title: string
  description?: string
  status?: string
  figmaUrl?: string
  actions?: ReactNode
}) {
  const statusClass = status
    ? `status-badge status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`
    : null

  return (
    <header className="page-header">
      <div className="page-header-eyebrow">{section}</div>
      <div className="page-header-title-row">
        <div className="page-header-title-group">
          <h1 className="page-header-title">{title}</h1>
          {status ? <span className={statusClass ?? undefined}>{status}</span> : null}
        </div>
        {actions ? <div className="page-header-actions">{actions}</div> : null}
      </div>
      {description ? <p className="page-header-description">{description}</p> : null}
      {figmaUrl ? (
        <div className="page-header-links">
          <a className="figma-link" href={figmaUrl} target="_blank" rel="noreferrer">
            View in Figma →
          </a>
        </div>
      ) : null}
    </header>
  )
}
