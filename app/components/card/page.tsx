import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Card } from '@/components/ui/Card'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'The base surface for grouping related content — every stat card, product card, and settings panel is built on this.',
  dos: [
    'Use the tinted page background around cards to create depth — never a border-only card on a pure white page.',
    'Keep one clear purpose per card.',
  ],
  donts: [
    'Nest a card inside another card — flatten the hierarchy or use a Divider instead.',
    'Add a drop shadow beyond --shadow-1 for a resting card — reserve heavier shadows for elevated/interactive states.',
  ],
}

const PROPS = [
  { name: 'padding', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Inner spacing.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Card content.' },
  { name: '...props', type: 'HTMLAttributes<HTMLDivElement>', description: 'Any standard div prop (onClick, className, etc).' },
]

export default async function CardPage() {
  const sanity = await getComponent('card')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Layout"
        title="Card"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Padding"
        code={`<Card padding="sm">Small</Card>
<Card padding="md">Medium</Card>
<Card padding="lg">Large</Card>`}
      >
        <Card padding="sm">Small</Card>
        <Card padding="md">Medium</Card>
        <Card padding="lg">Large</Card>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
