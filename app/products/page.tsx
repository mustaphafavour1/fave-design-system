import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/docs/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { getProducts, urlFor } from '@/lib/sanity'

export const revalidate = 60

export default async function ProductsIndexPage() {
  const products = await getProducts()
  const list = Array.isArray(products) ? products : []

  return (
    <div>
      <PageHeader
        section="Products"
        title="Products"
        description="Every product this design system ships into — real, live products, each documented as its own case study."
      />

      {list.length === 0 ? (
        <EmptyState
          title="No Products Yet"
          description="When there are products, they will show here."
        />
      ) : (
        <div className="product-index-grid">
          {list.map((product: any) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="product-index-card">
              <div className="product-index-logo">
                {product.logo ? (
                  <Image
                    src={urlFor(product.logo).width(120).url()}
                    alt=""
                    width={44}
                    height={44}
                    style={{ objectFit: 'contain', width: '70%', height: '70%' }}
                  />
                ) : (
                  <span>{product.name?.[0]}</span>
                )}
              </div>
              {product.category ? <div className="product-index-category">{product.category}</div> : null}
              <div className="product-index-name">{product.name}</div>
              {product.tagline ? <p className="product-index-tagline">{product.tagline}</p> : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
