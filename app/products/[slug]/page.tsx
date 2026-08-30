import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PageHeader } from '@/components/docs/PageHeader'
import { ColorPalette } from '@/components/docs/ColorPalette'
import { ProductScreenshots } from '@/components/docs/ProductScreenshots'
import { Link } from '@/components/ui/Link'
import { ResolvedIcon } from '@/lib/icons'
import { getProduct, urlFor } from '@/lib/sanity'

export const revalidate = 60

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)

  // showOnSite must be checked before any fallback rendering, or the
  // toggle silently does nothing (spec §11 pitfall table).
  if (!product || product.showOnSite === false) {
    notFound()
  }

  return (
    <div>
      <PageHeader
        section="Products"
        title={product.name}
        description={product.tagline}
        status={product.status}
      />

      {product.liveUrl || product.figmaUrl ? (
        <div className="page-header-links">
          {product.liveUrl ? (
            <Link href={product.liveUrl} external>
              Live site
            </Link>
          ) : null}
          {product.figmaUrl ? (
            <Link href={product.figmaUrl} external>
              Figma
            </Link>
          ) : null}
        </div>
      ) : null}

      <div className="product-identity">
        {product.logo ? (
          <div className="product-logo-box">
            <Image
              src={urlFor(product.logo).width(200).url()}
              alt={`${product.name} logo`}
              width={130}
              height={50}
              style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        ) : null}
        {product.type || product.status ? (
          <table className="spec-table product-meta-table">
            <tbody>
              {product.type ? (
                <tr>
                  <td className="spec-table-term">Type</td>
                  <td>{product.type}</td>
                </tr>
              ) : null}
              {product.status ? (
                <tr>
                  <td className="spec-table-term">Status</td>
                  <td>{product.status}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        ) : null}
      </div>

      {product.description ? <p className="product-description">{product.description}</p> : null}

      {product.features?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Features</h2>
          <div className="product-features-grid">
            {product.features.map((feature: any, index: number) => (
              <div key={index} className="product-feature-card">
                <div className="overview-card-icon">
                  <ResolvedIcon name={feature.icon} size={20} weight="duotone" />
                </div>
                <div className="overview-card-title">{feature.title}</div>
                <p className="overview-card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {product.colors?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Colours</h2>
          <ColorPalette colors={product.colors} />
        </div>
      ) : null}

      {product.screenshots?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Key screens</h2>
          <ProductScreenshots images={product.screenshots} />
        </div>
      ) : null}
    </div>
  )
}
