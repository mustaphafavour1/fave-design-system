import { Plus } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Button } from '@/components/ui/Button'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'The primary way a user takes action. Four variants, three sizes, and a loading state.',
  dos: [
    'Use exactly one primary button per view for the main action.',
    'Keep labels short and verb-first — "Save changes", not "Changes will be saved."',
    'Use the loading state for any action that takes longer than ~300ms.',
  ],
  donts: [
    'Use more than one primary button in the same view.',
    'Disable a button without explaining why nearby.',
    'Use danger styling for anything that isn’t destructive.',
  ],
}

const PROPS = [
  { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'danger'", default: "'primary'", description: 'Visual style.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls height and padding.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the button.' },
  { name: 'icon', type: 'ReactNode', description: 'Optional leading icon, hidden while loading.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Standard HTML disabled state.' },
]

export default async function ButtonPage() {
  const sanity = await getComponent('button')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Actions"
        title="Button"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Variants"
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </ComponentPreview>

      <ComponentPreview
        title="Sizes"
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </ComponentPreview>

      <ComponentPreview
        title="States"
        code={`<Button>Default</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}
      >
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </ComponentPreview>

      <ComponentPreview title="With icon" code={`<Button icon={<Plus size={16} weight="bold" />}>Add item</Button>`}>
        <Button icon={<Plus size={16} weight="bold" />}>Add item</Button>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
