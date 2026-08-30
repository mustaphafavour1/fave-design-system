export interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <table className="spec-table">
      <thead>
        <tr>
          <th className="spec-table-term">Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <td className="spec-table-term">
              <code>{row.name}</code>
            </td>
            <td>
              <code className="props-table-type">{row.type}</code>
            </td>
            <td>{row.default ? <code>{row.default}</code> : '—'}</td>
            <td>{row.required ? 'Yes' : 'No'}</td>
            <td>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
