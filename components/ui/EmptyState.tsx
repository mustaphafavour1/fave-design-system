import type { ReactNode } from 'react'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: ReactNode
}

// Copy formula (spec §7.4): "No [Items] Yet" + "When there are [items],
// they will show here." Kept as the caller's responsibility (title/
// description props) rather than baked in, so it still reads naturally
// for the one deliberate exception -- Guardrails "coming soon" copy.
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="ui-empty-state">
      {icon ? <div className="ui-empty-state-icon">{icon}</div> : null}
      <div className="ui-empty-state-title">{title}</div>
      <p className="ui-empty-state-description">{description}</p>
      {action ? <div className="ui-empty-state-action">{action}</div> : null}
    </div>
  )
}
