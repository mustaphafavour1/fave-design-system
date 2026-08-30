import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Divider } from '@/components/ui/Divider'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'A thin rule separating unrelated content within the same surface.',
  dos: ['Use to separate distinct groups within one Card or section.', 'Use the labelled form for "or" splits, like between two sign-in methods.'],
  donts: ['Use a Divider where spacing alone would already read as a separation.', 'Stack two dividers with nothing between them.'],
}

const PROPS = [
  { name: 'label', type: 'string', description: 'Optional centred label — omit for a plain rule.' },
]

export default async function DividerPage() {
  const sanity = await getComponent('divider')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Layout"
        title="Divider"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview title="Plain" code={`<Divider />`}>
        <div style={{ width: '100%' }}>
          <Divider />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Labelled" code={`<Divider label="or" />`}>
        <div style={{ width: '100%' }}>
          <Divider label="or" />
        </div>
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
