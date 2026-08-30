import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DosDonts } from '@/components/docs/DosDonts'
import { TextInput } from '@/components/ui/TextInput'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { getPattern } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'Max two columns, and only once the form is long enough to need it — a 3-field form is never split into columns just because two-column "looks more designed."',
  dos: [
    'Validate on blur, not on every keystroke.',
    'Show a red border plus a specific caption stating the problem and, where possible, how to fix it.',
    'Keep the primary submit button visually muted/disabled until every required field validates.',
  ],
  donts: [
    'Split a short form into two columns purely for visual balance.',
    'Show a generic "Invalid input" error message.',
    'Rely on a click-time alert instead of inline, per-field validation.',
  ],
}

export default async function FormsPatternPage() {
  const sanity = await getPattern('forms')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader section="Patterns" title="Forms & Validation" description={description} />

      <ComponentPreview title="Short form — single column, never split">
        <div className="pattern-form-grid" style={{ gridTemplateColumns: '1fr', maxWidth: 320 }}>
          <TextInput label="Full name" required placeholder="Ada Lovelace" />
          <TextInput label="Email" required placeholder="you@example.com" />
          <Button disabled>Create account</Button>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Long form — two columns once it earns them">
        <div className="pattern-form-grid">
          <TextInput label="First name" required placeholder="Ada" />
          <TextInput label="Last name" required placeholder="Lovelace" />
          <TextInput label="Email" required placeholder="you@example.com" error="Enter a valid email address." />
          <Select label="Country" required>
            <option>United Kingdom</option>
            <option>United States</option>
          </Select>
          <TextInput label="Company" hint="Optional" />
          <TextInput label="Job title" hint="Optional" />
          <div className="pattern-form-grid-full">
            <Button disabled style={{ width: '100%' }}>
              Save profile
            </Button>
          </div>
        </div>
      </ComponentPreview>

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
