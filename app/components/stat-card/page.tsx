import { Wallet } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { StatCard } from '@/components/ui/StatCard'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A single summary metric — used in rows of 3–5 at the top of a dashboard or data table.',
  dos: [
    'Pair each stat with a semantic icon that reinforces what it measures.',
    'Show a trend only when the comparison period is unambiguous (e.g. "vs last 30 days" is stated somewhere nearby).',
  ],
  donts: [
    'Show more than 5 stat cards in one row — group into a second row or a details page instead.',
    'Use a trend arrow without a value next to it.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', required: true, description: 'What the number measures.' },
  { name: 'value', type: 'string', required: true, description: 'The formatted metric value.' },
  { name: 'icon', type: 'ReactNode', description: 'Optional semantic icon.' },
  { name: 'trend', type: '{ direction: "up" | "down"; value: string }', description: 'Optional trend indicator.' },
]

export default async function StatCardPage() {
  const sanity = await getComponent('stat-card')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Data Display"
        title="Stat Card"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<StatCard label="Total revenue" value="$84,920.50" icon={<Wallet />} trend={{ direction: 'up', value: '12.4%' }} />
<StatCard label="Active users" value="1,204" trend={{ direction: 'down', value: '3.1%' }} />
<StatCard label="Open tickets" value="6" />`}
      >
        <StatCard
          label="Total revenue"
          value="$84,920.50"
          icon={<Wallet size={18} />}
          trend={{ direction: 'up', value: '12.4%' }}
        />
        <StatCard label="Active users" value="1,204" trend={{ direction: 'down', value: '3.1%' }} />
        <StatCard label="Open tickets" value="6" />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
