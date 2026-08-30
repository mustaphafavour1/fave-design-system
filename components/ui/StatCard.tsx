import type { ReactNode } from 'react'
import { ArrowUp, ArrowDown } from '@phosphor-icons/react/dist/ssr'

export interface StatCardProps {
  label: string
  value: string
  icon?: ReactNode
  trend?: { direction: 'up' | 'down'; value: string }
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="ui-stat-card">
      {icon ? <div className="ui-stat-card-icon">{icon}</div> : null}
      <div className="ui-stat-card-value">{value}</div>
      <div className="ui-stat-card-label">{label}</div>
      {trend ? (
        <div className={`ui-stat-card-trend ui-stat-card-trend-${trend.direction}`}>
          {trend.direction === 'up' ? (
            <ArrowUp size={11} weight="bold" />
          ) : (
            <ArrowDown size={11} weight="bold" />
          )}
          {trend.value}
        </div>
      ) : null}
    </div>
  )
}
