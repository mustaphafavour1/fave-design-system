import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'Shows where the current page sits in the hierarchy, and lets a user jump back up a level.',
  dos: [
    'Make every item except the last one a real link.',
    'Match the labels to the actual page titles they point to.',
    'Mark the current page with aria-current="page" (built in).',
  ],
  donts: [
    'Use breadcrumbs as the only way to navigate up — pair with the sidebar, don’t replace it.',
    'Show more than 4–5 levels — collapse the middle if the hierarchy runs deeper.',
  ],
}

const PROPS = [
  { name: 'items', type: '{ label: string; href?: string }[]', required: true, description: 'Trail from the root to the current page. The last item renders as plain text.' },
]

export default async function BreadcrumbsPage() {
  const sanity = await getComponent('breadcrumbs')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Navigation"
        title="Breadcrumbs"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<Breadcrumbs
  items={[
    { label: 'Components', href: '/components/button' },
    { label: 'Navigation', href: '/components/breadcrumbs' },
    { label: 'Breadcrumbs' },
  ]}
/>`}
      >
        <Breadcrumbs
          items={[
            { label: 'Components', href: '/components/button' },
            { label: 'Navigation', href: '/components/breadcrumbs' },
            { label: 'Breadcrumbs' },
          ]}
        />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
