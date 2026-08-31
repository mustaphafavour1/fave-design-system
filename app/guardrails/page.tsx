import Link from 'next/link'
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr'
import { PageHeader } from '@/components/docs/PageHeader'
import { getGuardrailCount, type GuardrailPlatform } from '@/lib/guardrails'

export const revalidate = 60

const PLATFORMS: { slug: GuardrailPlatform; label: string; href: string }[] = [
  { slug: 'websites', label: 'Websites', href: '/guardrails/websites' },
  { slug: 'dashboards', label: 'Dashboards', href: '/guardrails/dashboards' },
  { slug: 'mobile', label: 'Mobile Apps', href: '/guardrails/mobile' },
]

export default async function GuardrailsOverviewPage() {
  const platforms = await Promise.all(PLATFORMS.map(async (p) => ({ ...p, count: await getGuardrailCount(p.slug) })))

  return (
    <div>
      <PageHeader
        section="AI Design Guardrails"
        title="AI Design Guardrails"
        description="The checklists I grade AI-produced design against before it ships. Patterns and Components are what to build with; this is what the result gets checked against."
      />

      <div className="card-grid">
        {platforms.map((platform) => (
          <Link
            key={platform.slug}
            href={platform.href}
            className={`overview-card${platform.count === 0 ? ' is-muted' : ''}`}
          >
            <div className="overview-card-icon">
              <ShieldCheck size={22} weight="duotone" />
            </div>
            <div className="overview-card-title-row">
              <div className="overview-card-title">{platform.label}</div>
              {platform.count === 0 ? <span className="chip chip-muted">Coming Soon</span> : null}
            </div>
            <p className="overview-card-description">
              {platform.count} rule{platform.count === 1 ? '' : 's'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
