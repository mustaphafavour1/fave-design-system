import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Tabs } from '@/components/ui/Tabs'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'Switches between views that live at the same level of the hierarchy — never a substitute for real navigation.',
  dos: [
    'Use for filtering or switching between different views of the same data (e.g. this very Preview/Code control).',
    'Keep labels to one or two words.',
    'Default to the tab a user is most likely to want first.',
  ],
  donts: [
    'Use tabs to hide a required step in a form — every field should be reachable without hunting.',
    'Put more than 5–6 tabs in one row before it needs an overflow pattern instead.',
  ],
}

const PROPS = [
  { name: 'tabs', type: '{ label: string; content: ReactNode }[]', required: true, description: 'Tabs to render, in order.' },
  { name: 'defaultTab', type: 'string', description: 'Label of the tab active on first render — defaults to the first tab.' },
]

export default async function TabsPage() {
  const sanity = await getComponent('tabs')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Navigation"
        title="Tabs"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<Tabs
  tabs={[
    { label: 'All', content: 'Showing all 128 transactions.' },
    { label: 'Pending', content: 'Showing 4 pending transactions.' },
    { label: 'Failed', content: 'Showing 1 failed transaction.' },
  ]}
/>`}
      >
        <Tabs
          tabs={[
            { label: 'All', content: 'Showing all 128 transactions.' },
            { label: 'Pending', content: 'Showing 4 pending transactions.' },
            { label: 'Failed', content: 'Showing 1 failed transaction.' },
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
