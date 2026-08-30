import type { ReactNode } from 'react'

export interface TableColumn<T> {
  key: string
  header: string
  align?: 'left' | 'right'
  render?: (row: T) => ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  rows: T[]
  emptyMessage?: string
  getRowKey: (row: T) => string
}

// Rows or empty state — never both. A table is never rendered "empty but
// with headers still showing an empty tbody"; the whole table swaps for a
// dedicated empty-state block instead (see spec §7.4, Data Tables).
export function Table<T>({ columns, rows, emptyMessage = 'No items yet.', getRowKey }: TableProps<T>) {
  if (rows.length === 0) {
    return <div className="ui-table-empty">{emptyMessage}</div>
  }

  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.align === 'right' ? 'ui-table-align-right' : undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((col) => (
                <td key={col.key} className={col.align === 'right' ? 'ui-table-align-right' : undefined}>
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
