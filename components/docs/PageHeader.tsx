export function PageHeader({
  section,
  title,
  description,
  status,
  figmaUrl,
}: {
  section: string
  title: string
  description?: string
  status?: string
  figmaUrl?: string
}) {
  const statusClass = status
    ? `status-badge status-badge-${status.toLowerCase().replace(/\s+/g, '-')}`
    : null

  return (
    <header className="page-header">
      <div className="page-header-eyebrow">{section}</div>
      <div className="page-header-title-row">
        <h1 className="page-header-title">{title}</h1>
        {status ? <span className={statusClass ?? undefined}>{status}</span> : null}
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
