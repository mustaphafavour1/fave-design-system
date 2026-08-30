import { PageHeader } from '@/components/docs/PageHeader'
import { ColorPalette } from '@/components/docs/ColorPalette'
import { getBrandPage } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'The colour system is a semantic layer over numeric scales. Product teams reach for the semantic alias below, never a raw scale value.',
  colors: [
    { name: 'Background', hex: '#0A0A0F' },
    { name: 'Primary', hex: '#F7C948' },
    { name: 'Primary Dark', hex: '#E6B830' },
    { name: 'Text', hex: '#F0F0F5' },
    { name: 'Text Secondary', hex: '#9494AC' },
    { name: 'Border', hex: '#1E1E2E' },
    { name: 'Success', hex: '#4ADE80' },
    { name: 'Warning', hex: '#FB923C' },
    { name: 'Error', hex: '#F87171' },
    { name: 'Info', hex: '#9494F5' },
  ],
}

export default async function BrandColoursPage() {
  const sanity = await getBrandPage('colours')

  const description = sanity?.description || STATIC.description
  const colors = sanity?.colors?.length ? sanity.colors : STATIC.colors

  return (
    <div>
      <PageHeader section="Brand" title="Colours" description={description} />
      <ColorPalette colors={colors} />
      {!sanity ? (
        <p className="empty-note">
          Showing static fallback colours — add a &quot;Brand Page&quot; document in Sanity Studio
          with slug <code>colours</code> to manage this content from the CMS.
        </p>
      ) : null}
    </div>
  )
}
