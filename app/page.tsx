import Link from 'next/link'
import { Rocket } from '@phosphor-icons/react/dist/ssr'
import { ResolvedIcon } from '@/lib/icons'
import { getSiteCounts, getProducts } from '@/lib/sanity'
import { overviewSections } from '@/lib/navigation'
import pkg from '@/package.json'

export const revalidate = 60

const PRINCIPLES = [
  {
    title: 'Tokens, not values',
    description: 'Every colour, space and radius is a token. A hardcoded value isn’t a shortcut; it’s a bug waiting to be found.',
  },
  {
    title: 'Document the edges',
    description:
      'Empty, loading and error states get designed with the happy path, not after it. I’ve shipped enough half-finished flows to know that gap always shows.',
  },
  {
    title: 'One source of truth',
    description:
      'Code owns what only code can render. Sanity owns the words and images that change often; nobody should need a deploy to fix a typo.',
  },
  {
    title: 'Accessible by default',
    description: 'WCAG AA contrast and full keyboard support aren’t a follow-up pass. I check them before I call anything done.',
  },
]

export default async function HomePage() {
  const [counts, products] = await Promise.all([getSiteCounts(), getProducts()])

  const componentCount = counts?.components ?? 0
  const productCount = counts?.products ?? (Array.isArray(products) ? products.length : 0)

  return (
    <div>
      <section className="hero">
        <div className="hero-badge">
          <Rocket size={14} weight="bold" />
          Design System v{pkg.version}
        </div>
        <h1 className="hero-title">
          How I design and build, all in one place.
        </h1>
        <p className="hero-description">
          Brand, foundations, components, patterns and products; documented once, so design and
          engineering never drift apart. I’d rather write it down properly than explain it again
          in every handoff.
        </p>
        <div className="hero-ctas">
          <Link href="/foundations/tokens" className="btn btn-primary">
            Explore Foundations
          </Link>
          <Link href="/brand/colours" className="btn btn-secondary">
            View Brand
          </Link>
        </div>

        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-value">{componentCount}</div>
            <div className="stat-label">Components documented</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{productCount}</div>
            <div className="stat-label">Products shipped into</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">v{pkg.version}</div>
            <div className="stat-label">Current version</div>
          </div>
        </div>
      </section>

      <section className="section-divider">
        <h2 className="section-divider-title">Start here</h2>
        <div className="card-grid">
          {overviewSections.map((section) => {
            const isProducts = section.label === 'Products'
            const examples = isProducts
              ? [productCount === 0 ? 'No products yet' : `${productCount} product${productCount === 1 ? '' : 's'}`]
              : section.examples

            return (
              <Link key={section.label} href={section.href!} className="overview-card">
                <div className="overview-card-icon">
                  <ResolvedIcon name={section.icon} size={22} weight="duotone" />
                </div>
                <div className="overview-card-title">{section.label}</div>
                <p className="overview-card-description">{section.description}</p>
                <div className="chip-row">
                  {examples.map((example) => (
                    <span key={example} className="chip">
                      {example}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="section-divider">
        <h2 className="section-divider-title">Design principles</h2>
        <div className="principles-grid">
          {PRINCIPLES.map((principle, index) => (
            <div key={principle.title}>
              <div className="principle-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="principle-title">{principle.title}</div>
              <p className="principle-description">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
