import { PageHeader } from '@/components/docs/PageHeader'
import { ColorPalette } from '@/components/docs/ColorPalette'
import { getBrandPage } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'The colour system is a semantic layer over numeric scales. Product teams reach for the semantic alias below, never a raw scale value.',
  colors: [
    { name: 'Primary', hex: '#4F46E5' },
    { name: 'Primary Dark', hex: '#3730A3' },
    { name: 'Primary Faint', hex: '#EEF2FF' },
    { name: 'Text', hex: '#0F172A' },
    { name: 'Text Secondary', hex: '#475569' },
    { name: 'Border', hex: '#E2E8F0' },
    { name: 'Success', hex: '#047857' },
    { name: 'Warning', hex: '#B45309' },
    { name: 'Error', hex: '#B91C1C' },
    { name: 'Info', hex: '#4338CA' },
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
