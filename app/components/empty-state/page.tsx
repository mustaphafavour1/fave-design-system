import { Package } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'What renders instead of a table, list, or grid when there is nothing to show yet. Every list-shaped component in this system has one.',
  dos: [
    'Use the standard copy formula: "No [Items] Yet" + "When there are [items], they will show here."',
    'Include an action when there’s an obvious next step (e.g. "Add your first product").',
    'Design this state at the same time as the filled state, not after.',
  ],
  donts: [
    'Show a blank white box with no explanation.',
    'Use alarming iconography — an empty state is a normal, expected condition, not an error.',
  ],
}

const PROPS = [
  { name: 'icon', type: 'ReactNode', description: 'Optional icon in a circular badge.' },
  { name: 'title', type: 'string', required: true, description: '"No [Items] Yet"' },
  { name: 'description', type: 'string', required: true, description: '"When there are [items], they will show here."' },
  { name: 'action', type: 'ReactNode', description: 'Optional call-to-action, e.g. a Button.' },
]

export default async function EmptyStatePage() {
  const sanity = await getComponent('empty-state')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Feedback"
        title="Empty State"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="With action"
        code={`<EmptyState
  icon={<Package />}
  title="No Products Yet"
  description="When there are products, they will show here."
  action={<Button size="sm">Add product</Button>}
/>`}
      >
        <EmptyState
          icon={<Package size={22} />}
          title="No Products Yet"
          description="When there are products, they will show here."
          action={<Button size="sm">Add product</Button>}
        />
      </ComponentPreview>

      <ComponentPreview title="Without action" code={`<EmptyState title="No Results Found" description="Try adjusting your filters." />`}>
        <EmptyState title="No Results Found" description="Try adjusting your filters." />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
