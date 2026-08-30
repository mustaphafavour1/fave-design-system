import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Checkbox } from '@/components/ui/Checkbox'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A binary or multi-select choice — click the box or the label, both toggle it.',
  dos: [
    'Use for independent choices — several can be selected at once.',
    'Use the indeterminate state for a "select all" checkbox when some but not all rows are selected.',
    'Keep the label clickable — it’s part of the hit target.',
  ],
  donts: [
    'Use a Checkbox for a single, mutually-exclusive choice — that’s a Toggle or radio group.',
    'Leave a checkbox unlabelled.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', description: 'Label text, rendered next to the box and part of the click target.' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Shows a dash instead of a check — for partial "select all" states.' },
  { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Standard HTML disabled state.' },
]

export default async function CheckboxPage() {
  const sanity = await getComponent('checkbox')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Forms"
        title="Checkbox"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="States"
        code={`<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`}
      >
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
      </ComponentPreview>

      <ComponentPreview
        title="In context — a list with select all"
        code={`<Checkbox label="Select all" indeterminate />
<Checkbox label="Row 1" defaultChecked />
<Checkbox label="Row 2" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Checkbox label="Select all" indeterminate />
          <Checkbox label="Row 1" defaultChecked />
          <Checkbox label="Row 2" />
        </div>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
