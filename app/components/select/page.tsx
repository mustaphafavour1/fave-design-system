import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Select } from '@/components/ui/Select'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A single-choice dropdown, built on the native <select> for full keyboard and screen-reader support.',
  dos: [
    'Order options logically — alphabetical, or by expected frequency of use.',
    'Include a neutral first option ("Select a status") when there is no sensible default.',
    'Keep option labels short enough to read without truncation.',
  ],
  donts: [
    'Use a Select for fewer than 3 options — Toggle or a radio group reads faster.',
    'Pre-select an option the user is likely to miss changing.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', description: 'Field label.' },
  { name: 'hint', type: 'string', description: 'Helper text shown below the field.' },
  { name: 'error', type: 'string', description: 'Error message — replaces the hint.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows a red asterisk next to the label.' },
  { name: '...props', type: 'SelectHTMLAttributes', description: 'All standard <select> props (value, onChange, disabled, etc).' },
]

export default async function SelectPage() {
  const sanity = await getComponent('select')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Forms"
        title="Select"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<Select label="Status" hint="Filter results by status">
  <option value="">All statuses</option>
  <option value="active">Active</option>
  <option value="paused">Paused</option>
</Select>`}
      >
        <Select label="Status" hint="Filter results by status">
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </Select>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        code={`<Select label="Status" error="Select a status">
  <option value="">All statuses</option>
</Select>
<Select label="Status" disabled>
  <option>Active</option>
</Select>`}
      >
        <Select label="Status" error="Select a status">
          <option value="">All statuses</option>
        </Select>
        <Select label="Status" disabled>
          <option>Active</option>
        </Select>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
