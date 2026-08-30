import { Wallet, ClockCounterClockwise, XCircle, DownloadSimple } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DosDonts } from '@/components/docs/DosDonts'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { StatCard } from '@/components/ui/StatCard'
import { Tabs } from '@/components/ui/Tabs'
import { TextInput } from '@/components/ui/TextInput'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Table } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { Pagination } from '@/components/ui/Pagination'
import { getPattern } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'The single most-used pattern in any product dashboard. Strict top-to-bottom anatomy: breadcrumb → stat cards → toolbar → table → pagination.',
  dos: [
    'Keep S/N as the first column and ACTIONS as the last, always.',
    'Design and build both the empty and filled state — the state most often skipped and most often shipped broken.',
    'Right-align amounts to 2 decimals; show status as a Badge, never plain text.',
  ],
  donts: [
    'Reorder the anatomy — a reader’s eyes expect stats above the toolbar, the toolbar above the table.',
    'Show table rows and an empty state at the same time — the state is binary.',
  ],
}

interface Txn {
  sn: number
  id: string
  customer: string
  status: 'Completed' | 'Pending' | 'Failed'
  amount: number
}

const ROWS: Txn[] = [
  { sn: 1, id: 'TXN-84012', customer: 'Ada Lovelace', status: 'Completed', amount: 1250.0 },
  { sn: 2, id: 'TXN-84013', customer: 'Grace Hopper', status: 'Pending', amount: 84.5 },
  { sn: 3, id: 'TXN-84014', customer: 'Alan Turing', status: 'Failed', amount: 320.75 },
]

const statusVariant: Record<Txn['status'], 'success' | 'warning' | 'error'> = {
  Completed: 'success',
  Pending: 'warning',
  Failed: 'error',
}

export default async function DataTablesPatternPage() {
  const sanity = await getPattern('data-tables')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader section="Patterns" title="Data Tables" description={description} />

      <ComponentPreview title="Full anatomy">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', width: '100%' }}>
          <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Transactions' }]} />

          <div className="pattern-dashboard-stats">
            <StatCard label="Total volume" value="$84,920.50" icon={<Wallet size={16} />} />
            <StatCard label="Pending" value="4" icon={<ClockCounterClockwise size={16} />} />
            <StatCard label="Failed" value="1" icon={<XCircle size={16} />} />
          </div>

          <div className="pattern-toolbar">
            <Tabs
              tabs={[
                { label: 'All', content: null },
                { label: 'Completed', content: null },
                { label: 'Pending', content: null },
              ]}
            />
            <div className="pattern-toolbar-filters">
              <TextInput placeholder="Search transactions" />
              <Select aria-label="Filter by status">
                <option>All statuses</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Failed</option>
              </Select>
              <Button variant="secondary" size="sm" icon={<DownloadSimple size={14} weight="bold" />}>
                Export
              </Button>
            </div>
          </div>

          <Table<Txn>
            getRowKey={(row) => row.id}
            columns={[
              { key: 'sn', header: 'S/N' },
              { key: 'id', header: 'Reference', render: (r) => <code>{r.id}</code> },
              { key: 'customer', header: 'Customer' },
              {
                key: 'status',
                header: 'Status',
                render: (r) => <Badge variant={statusVariant[r.status]}>{r.status}</Badge>,
              },
              { key: 'amount', header: 'Amount', align: 'right', render: (r) => `$${r.amount.toFixed(2)}` },
              {
                key: 'actions',
                header: 'Actions',
                align: 'right',
                render: () => <Button variant="ghost" size="sm">View</Button>,
              },
            ]}
            rows={ROWS}
          />

          <Pagination total={128} pageSize={10} />
        </div>
      </ComponentPreview>

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
