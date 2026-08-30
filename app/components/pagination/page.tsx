import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { DosDonts } from '@/components/docs/DosDonts'
import { Pagination } from '@/components/ui/Pagination'
import { getComponent } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'Sits at the bottom of every data table — the item-count summary on the left, page controls on the right.',
  dos: [
    'Always show the "Showing X–Y of Z items" summary, even when there’s only one page.',
    'Disable Previous on page 1 and Next on the last page, rather than hiding them.',
  ],
  donts: [
    'Use infinite scroll and page numbers in the same table — pick one.',
    'Reset to page 1 silently after a filter change without telling the user why the list moved.',
  ],
}

const PROPS = [
  { name: 'total', type: 'number', required: true, description: 'Total number of items across all pages.' },
  { name: 'pageSize', type: 'number', default: '10', description: 'Items shown per page.' },
  { name: 'initialPage', type: 'number', default: '1', description: 'Page shown on first render.' },
]

export default async function PaginationPage() {
  const sanity = await getComponent('pagination')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader
        section="Components / Navigation"
        title="Pagination"
        description={description}
        status={sanity?.status || 'stable'}
        figmaUrl={sanity?.figmaUrl}
      />

      <ComponentPreview title="Default" code={`<Pagination total={128} pageSize={10} />`}>
        <Pagination total={128} pageSize={10} />
      </ComponentPreview>

      <ComponentPreview title="Single page" code={`<Pagination total={6} pageSize={10} />`}>
        <Pagination total={6} pageSize={10} />
      </ComponentPreview>

      <PropsTable rows={PROPS} />

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
