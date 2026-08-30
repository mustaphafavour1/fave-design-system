import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Toggle } from '@/components/ui/Toggle'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'An on/off switch for a setting that takes effect immediately — no separate save step.',
  dos: [
    'Use for a setting that applies the instant it’s toggled.',
    'Label it with the state it enables, not the action ("Email notifications", not "Toggle emails").',
  ],
  donts: [
    'Use a Toggle when the change needs a separate "Save" action — use Checkbox in a form instead.',
    'Rely on colour alone to communicate on/off — the thumb position already does.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', description: 'Label text, rendered next to the switch.' },
  { name: 'checked', type: 'boolean', description: 'Controlled on/off state.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Standard HTML disabled state.' },
]

export default async function TogglePage() {
  const sanity = await getComponent('toggle')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Forms"
        title="Toggle"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="States"
        code={`<Toggle label="Off" />
<Toggle label="On" defaultChecked />
<Toggle label="Disabled" disabled />`}
      >
        <Toggle label="Off" />
        <Toggle label="On" defaultChecked />
        <Toggle label="Disabled" disabled />
      </ComponentPreview>

      <ComponentPreview
        title="In context — settings row"
        code={`<Toggle label="Email notifications" defaultChecked />
<Toggle label="SMS notifications" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Toggle label="Email notifications" defaultChecked />
          <Toggle label="SMS notifications" />
        </div>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
