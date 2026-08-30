import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { DatePicker } from '@/components/ui/DatePicker'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'A single date field, built on the native date input so every platform gets its own accessible, localised picker UI for free.',
  dos: [
    'Constrain min/max when a date range is actually invalid (e.g. a birth date can’t be in the future).',
    'Display the chosen date as DD MMM YYYY everywhere else in the product (see Foundations → Data Formatting).',
  ],
  donts: [
    'Build a custom calendar widget unless the native picker genuinely can’t express the interaction (e.g. a date range).',
    'Accept free-text date entry without a picker — format ambiguity causes real data errors.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', description: 'Field label.' },
  { name: 'hint', type: 'string', description: 'Helper text shown below the field.' },
  { name: 'error', type: 'string', description: 'Error message — replaces the hint.' },
  { name: 'min', type: 'string', description: 'Earliest selectable date, as YYYY-MM-DD.' },
  { name: 'max', type: 'string', description: 'Latest selectable date, as YYYY-MM-DD.' },
]

export default async function DatePickerPage() {
  const sanity = await getComponent('date-picker')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Forms"
        title="Date Picker"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview title="Default" code={`<DatePicker label="Start date" hint="DD MMM YYYY once selected" />`}>
        <DatePicker label="Start date" hint="DD MMM YYYY once selected" />
      </ComponentPreview>

      <ComponentPreview
        title="States"
        code={`<DatePicker label="Due date" error="Choose a date after today." />
<DatePicker label="Due date" disabled />`}
      >
        <DatePicker label="Due date" error="Choose a date after today." />
        <DatePicker label="Due date" disabled />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
