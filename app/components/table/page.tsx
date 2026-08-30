import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'The single most-used pattern in any product dashboard. Reference IDs in monospace, amounts right-aligned with 2 decimals, status as a coloured badge, rows or empty state — never both.',
  dos: [
    'Right-align every numeric/currency column, and give it a monospace or tabular-numeral treatment.',
    'Always design and build the empty state alongside the filled state — never ship one without the other.',
    'Truncate long text with an ellipsis rather than wrapping and breaking row height.',
  ],
  donts: [
    'Render an empty <tbody> with headers still showing — swap to a dedicated empty state instead.',
    'Show status as plain coloured text — use the Badge component.',
    'Left-align currency or numeric columns.',
  ],
}

const PROPS = [
  { name: 'columns', type: 'TableColumn<T>[]', required: true, description: 'Column definitions: key, header, align, and an optional custom render.' },
  { name: 'rows', type: 'T[]', required: true, description: 'Row data. An empty array renders the empty state instead of the table.' },
  { name: 'emptyMessage', type: 'string', default: '"No items yet."', description: 'Shown when rows is empty.' },
  { name: 'getRowKey', type: '(row: T) => string', required: true, description: 'Stable key extractor for each row.' },
]

interface Txn {
  id: string
  customer: string
  status: 'Completed' | 'Pending' | 'Failed'
  amount: number
}

const ROWS: Txn[] = [
  { id: 'TXN-84012', customer: 'Ada Lovelace', status: 'Completed', amount: 1250.0 },
  { id: 'TXN-84013', customer: 'Grace Hopper', status: 'Pending', amount: 84.5 },
  { id: 'TXN-84014', customer: 'Alan Turing', status: 'Failed', amount: 320.75 },
]

const statusVariant: Record<Txn['status'], 'success' | 'warning' | 'error'> = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'error',
}

export default async function TablePage() {
  const sanity = await getComponent('table')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Data Display"
        title="Table"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Filled"
        code={`<Table
  getRowKey={(row) => row.id}
  columns={[
    { key: 'id', header: 'Reference', render: (r) => <code>{r.id}</code> },
    { key: 'customer', header: 'Customer' },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge> },
    { key: 'amount', header: 'Amount', align: 'right', render: (r) => \`$\${r.amount.toFixed(2)}\` },
  ]}
  rows={rows}
/>`}
      >
        <Table<Txn>
          getRowKey={(row) => row.id}
          columns={[
            { key: 'id', header: 'Reference', render: (r) => <code>{r.id}</code> },
            { key: 'customer', header: 'Customer' },
            {
              key: 'status',
              header: 'Status',
              render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge>,
            },
            {
              key: 'amount',
              header: 'Amount',
              align: 'right',
              render: (r) => `$${r.amount.toFixed(2)}`,
            },
          ]}
          rows={ROWS}
        />
      </ComponentPreview>

      <ComponentPreview title="Empty" code={`<Table columns={columns} rows={[]} emptyMessage="No transactions yet." getRowKey={(r) => r.id} />`}>
        <Table<Txn>
          getRowKey={(row) => row.id}
          columns={[
            { key: 'id', header: 'Reference' },
            { key: 'customer', header: 'Customer' },
          ]}
          rows={[]}
          emptyMessage="No transactions yet."
        />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
