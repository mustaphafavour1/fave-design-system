import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Skeleton } from '@/components/ui/Skeleton'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A loading placeholder shaped like the content that’s about to appear — reduces layout shift and signals progress.',
  dos: [
    'Match the skeleton’s shape and size to the real content it’s standing in for.',
    'Replace it the instant real data arrives — never leave it showing after load.',
  ],
  donts: [
    'Use a spinner and a skeleton for the same loading state — pick one per component.',
    'Use skeletons for anything that loads in under ~200ms — it reads as a flicker, not a signal.',
  ],
}

const PROPS = [
  { name: 'variant', type: "'text' | 'circle' | 'rect'", default: "'text'", description: 'Shape of the placeholder.' },
  { name: 'width', type: 'number | string', description: 'Overrides the default width.' },
  { name: 'height', type: 'number | string', description: 'Overrides the default height.' },
]

export default async function SkeletonPage() {
  const sanity = await getComponent('skeleton')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Feedback"
        title="Skeleton"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Shapes"
        code={`<Skeleton variant="circle" />
<Skeleton variant="text" width={160} />
<Skeleton variant="rect" width={200} height={60} />`}
      >
        <Skeleton variant="circle" />
        <Skeleton variant="text" width={160} />
        <Skeleton variant="rect" width={200} height={60} />
      </ComponentPreview>

      <ComponentPreview
        title="In context — a loading table row"
        code={`<Skeleton variant="circle" />
<div style={{ flex: 1 }}>
  <Skeleton variant="text" width="60%" />
  <Skeleton variant="text" width="35%" />
</div>`}
      >
        <div style={{ display: 'flex', gap: 'var(--space-3)', width: '100%', maxWidth: 320, alignItems: 'center' }}>
          <Skeleton variant="circle" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="35%" />
          </div>
        </div>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
