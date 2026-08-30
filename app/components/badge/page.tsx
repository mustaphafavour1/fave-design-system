import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Badge } from '@/components/ui/Badge'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A small status label — status is always shown as a coloured badge, never as plain text.',
  dos: [
    'Use the semantic variant that matches the actual status (success for "Active", error for "Failed").',
    'Keep the label to one or two words.',
  ],
  donts: [
    'Invent a sixth colour for a status — map it onto success/warning/error/info/neutral.',
    'Use a badge for something that isn’t a status (that’s a Chip or plain text).',
  ],
}

const PROPS = [
  { name: 'variant', type: "'success' | 'warning' | 'error' | 'info' | 'neutral'", default: "'neutral'", description: 'Colour, matched to meaning.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Label text.' },
]

export default async function BadgePage() {
  const sanity = await getComponent('badge')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Data Display"
        title="Badge"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Variants"
        code={`<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Draft</Badge>
<Badge variant="neutral">Archived</Badge>`}
      >
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="error">Failed</Badge>
        <Badge variant="info">Draft</Badge>
        <Badge variant="neutral">Archived</Badge>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
