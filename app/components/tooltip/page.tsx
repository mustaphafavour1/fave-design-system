import { Gear } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Tooltip } from '@/components/ui/Tooltip'
import { IconButton } from '@/components/ui/IconButton'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A short label revealed on hover or keyboard focus — supplementary context, never the only way to learn what a control does.',
  dos: [
    'Use to clarify an icon-only control (though IconButton’s label already covers the accessible name — Tooltip adds the visual hint).',
    'Keep the label to a few words.',
  ],
  donts: [
    'Put essential instructions only in a tooltip — mouse users on a touch device may never see it.',
    'Use a tooltip on a disabled element without also making it focusable, or the explanation is unreachable by keyboard.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', required: true, description: 'Tooltip text.' },
  { name: 'side', type: "'top' | 'bottom'", default: "'top'", description: 'Which side the bubble appears on.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'The trigger element — shows the tooltip on hover or focus.' },
]

export default async function TooltipPage() {
  const sanity = await getComponent('tooltip')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Feedback"
        title="Tooltip"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Hover or focus the button"
        code={`<Tooltip label="Settings">
  <IconButton icon={<Gear />} label="Settings" />
</Tooltip>`}
      >
        <Tooltip label="Settings">
          <IconButton icon={<Gear size={18} />} label="Settings" />
        </Tooltip>
        <Tooltip label="Appears below" side="bottom">
          <IconButton icon={<Gear size={18} />} label="Settings, tooltip below" />
        </Tooltip>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
