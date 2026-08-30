'use client'

import { useState } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { IconButton } from './IconButton'

export function Pagination({
  total,
  pageSize = 10,
  initialPage = 1,
}: {
  total: number
  pageSize?: number
  initialPage?: number
}) {
  const [page, setPage] = useState(initialPage)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="ui-pagination">
      <span className="ui-pagination-summary">
        Showing {start}–{end} of {total} items
      </span>
      <div className="ui-pagination-controls">
        <IconButton
          icon={<CaretLeft size={14} weight="bold" />}
          label="Previous page"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        />
        <span className="ui-pagination-page">
          Page {page} of {totalPages}
        </span>
        <IconButton
          icon={<CaretRight size={14} weight="bold" />}
          label="Next page"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
    </div>
  )
}
