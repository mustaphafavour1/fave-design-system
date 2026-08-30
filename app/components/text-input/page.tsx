import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { TextInput } from '@/components/ui/TextInput'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A single-line text field with a label, optional hint, and error state.',
  dos: [
    'Validate on blur, not on every keystroke.',
    'Write a specific error message and, where possible, how to fix it.',
    'Show the hint by default; replace it with the error only once validation fails.',
  ],
  donts: [
    'Use a generic "Invalid input" error message.',
    'Rely on placeholder text as a substitute for a real label.',
    'Validate before the user has had a chance to finish typing.',
  ],
}

const PROPS = [
  { name: 'label', type: 'string', description: 'Field label, associated via a real <label>.' },
  { name: 'hint', type: 'string', description: 'Helper text shown below the field when there is no error.' },
  { name: 'error', type: 'string', description: 'Error message — replaces the hint and applies the error border.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Shows a red asterisk next to the label.' },
  { name: '...props', type: 'InputHTMLAttributes', description: 'All standard <input> props (type, value, onChange, placeholder, etc).' },
]

export default async function TextInputPage() {
  const sanity = await getComponent('text-input')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Forms"
        title="Text Input"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<TextInput label="Email" placeholder="you@example.com" hint="We'll never share this." />`}
      >
        <TextInput label="Email" placeholder="you@example.com" hint="We'll never share this." />
      </ComponentPreview>

      <ComponentPreview
        title="States"
        code={`<TextInput label="Email" required />
<TextInput label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
<TextInput label="Email" disabled placeholder="Disabled" />`}
      >
        <TextInput label="Email" required placeholder="you@example.com" />
        <TextInput label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
        <TextInput label="Email" disabled placeholder="Disabled" />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
