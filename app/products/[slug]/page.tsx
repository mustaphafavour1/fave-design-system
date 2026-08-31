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
        {product.category || product.type || product.status ? (
          <table className="spec-table product-meta-table">
            <tbody>
              {product.category ? (
                <tr>
                  <td className="spec-table-term">Category</td>
                  <td>{product.category}</td>
                </tr>
              ) : null}
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

      {product.positioning ? <p className="product-positioning">{product.positioning}</p> : null}

      {product.description ? <p className="product-description">{product.description}</p> : null}

      {product.highlights?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Highlights</h2>
          <div className="product-highlights">
            {product.highlights.map((highlight: string, index: number) => (
              <div key={index} className="product-highlight">
                <span className="product-highlight-marker" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

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

      {product.typography?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Typography</h2>
          <table className="spec-table">
            <thead>
              <tr>
                <th className="spec-table-term">Role</th>
                <th>Font</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {product.typography.map((row: any, index: number) => (
                <tr key={index}>
                  <td className="spec-table-term">{row.role}</td>
                  <td>{row.font}</td>
                  <td>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {product.techStack?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Tech Stack</h2>
          <table className="spec-table">
            <thead>
              <tr>
                <th className="spec-table-term">Layer</th>
                <th>Technology</th>
              </tr>
            </thead>
            <tbody>
              {product.techStack.map((row: any, index: number) => (
                <tr key={index}>
                  <td className="spec-table-term">{row.layer}</td>
                  <td>{row.technology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {product.screenshots?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Key screens</h2>
          <ProductScreenshots images={product.screenshots} />
        </div>
      ) : null}

      {product.surfaces?.length ? (
        <div className="token-section">
          <h2 className="token-section-title">Surfaces</h2>
          <div className="product-surfaces">
            {product.surfaces.map((surface: any, index: number) => (
              <div key={index} className="product-surface">
                <div className="product-surface-header">
                  <h3 className="product-surface-title">{surface.label || surface.type}</h3>
                  {surface.label ? <span className="chip">{surface.type}</span> : null}
                  {surface.liveUrl ? (
                    <Link href={surface.liveUrl} external>
                      Visit
                    </Link>
                  ) : null}
                </div>
                {surface.description ? <p className="product-surface-description">{surface.description}</p> : null}
                {surface.screenshots?.length ? <ProductScreenshots images={surface.screenshots} /> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
