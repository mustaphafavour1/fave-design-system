import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { SidebarNav } from '@/components/ui/SidebarNav'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'A vertical navigation list for a product dashboard — light sidebar on a tinted content background (the pattern documented here; this site itself uses the dark-sidebar mode, see Foundations for both).',
  dos: [
    'Give the active item a filled background plus a coloured left border and text — never colour alone.',
    'Keep badge counts to items with genuinely pending work, not decoration.',
    'Group related items under a section label rather than one long flat list.',
  ],
  donts: [
    'Use more than two levels of nesting — if the IA needs a third level, it needs restructuring instead.',
    'Change the active-item treatment between pages of the same product.',
  ],
}

const PROPS = [
  { name: 'items', type: '{ label: string; badge?: string }[]', required: true, description: 'The nav items to render.' },
  { name: 'defaultActive', type: 'string', description: 'Label of the item marked active on first render.' },
]

export default async function SidebarNavPage() {
  const sanity = await getComponent('sidebar-nav')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Navigation"
        title="Sidebar Nav"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview
        title="Default"
        code={`<SidebarNav
  defaultActive="Overview"
  items={[
    { label: 'Overview' },
    { label: 'Transactions', badge: '3' },
    { label: 'Customers' },
    { label: 'Settings' },
  ]}
/>`}
      >
        <SidebarNav
          defaultActive="Overview"
          items={[
            { label: 'Overview' },
            { label: 'Transactions', badge: '3' },
            { label: 'Customers' },
            { label: 'Settings' },
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
