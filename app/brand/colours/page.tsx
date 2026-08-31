import Link from 'next/link'
import { PageHeader } from '@/components/docs/PageHeader'
import { ColorPalette } from '@/components/docs/ColorPalette'
import { getBrandPage, getProductPalettes } from '@/lib/sanity'

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

const GRAY_SCALE = [
  { name: 'Gray 25', hex: '#F8F8FA' },
  { name: 'Gray 50', hex: '#F0F0F5' },
  { name: 'Gray 100', hex: '#E4E4EC' },
  { name: 'Gray 200', hex: '#C8C8D6' },
  { name: 'Gray 300', hex: '#ACACBE' },
  { name: 'Gray 400', hex: '#9494AC' },
  { name: 'Gray 500', hex: '#80809A' },
  { name: 'Gray 600', hex: '#5C5C72' },
  { name: 'Gray 700', hex: '#3A3A4A' },
  { name: 'Gray 800', hex: '#2A2A3A' },
  { name: 'Gray 900', hex: '#1E1E2E' },
  { name: 'Gray 950', hex: '#0A0A0F' },
]

export default async function BrandColoursPage() {
  const [sanity, productPalettes] = await Promise.all([getBrandPage('colours'), getProductPalettes()])

  const description = sanity?.description || STATIC.description
  const colors = sanity?.colors?.length ? sanity.colors : STATIC.colors
  const palettes = Array.isArray(productPalettes) ? productPalettes : []

  return (
    <div>
      <PageHeader section="Brand" title="Colours" description={description} />
      <ColorPalette colors={colors} />

      <div className="token-section">
        <h2 className="token-section-title">Neutral scale</h2>
        <ColorPalette colors={GRAY_SCALE} />
      </div>

      {palettes.length > 0 ? (
        <div className="token-section">
          <h2 className="token-section-title">Product colours</h2>
          <div className="product-palettes-list">
            {palettes.map((product: any) => (
              <div key={product.slug}>
                <Link href={`/products/${product.slug}`} className="product-palette-name">
                  {product.name}
                </Link>
                <ColorPalette colors={product.colors} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
