import clsx from 'clsx'

export interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rect'
  width?: number | string
  height?: number | string
}

export function Skeleton({ variant = 'text', width, height }: SkeletonProps) {
  return (
    <span
      className={clsx('ui-skeleton', `ui-skeleton-${variant}`)}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
