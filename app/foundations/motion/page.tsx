import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'Motion is restrained and functional — it confirms an action happened, it never performs for its own sake. Every animated property respects prefers-reduced-motion.',
  rules: [
    { term: '--duration-fast (120ms)', description: 'Micro-interactions: hover, focus, small state toggles.' },
    { term: '--duration-base (200ms)', description: 'Everything else: elevation changes, expand/collapse, page transitions.' },
    { term: '--easing', description: 'cubic-bezier(0.4, 0, 0.2, 1) on every animated property — no linear or bounce easing.' },
    { term: 'Reduced motion', description: 'All durations collapse to ~0 automatically under prefers-reduced-motion — never bypass this per-component.' },
  ],
}

export default async function MotionPage() {
  const sanity = await getFoundation('motion')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Motion" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Try it</h2>
        <div className="token-motion-row">
          <div className="token-motion-demo" />
          <p className="token-motion-note">
            Hover the square — it scales using <code>--duration-base</code> (200ms) and{' '}
            <code>--easing</code>. Quick UI feedback (hover, focus) uses <code>--duration-fast</code>{' '}
            (120ms) instead.
          </p>
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Usage rules</h2>
        <table className="spec-table">
          <thead>
            <tr>
              <th className="spec-table-term">Token / rule</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule: any) => (
              <tr key={rule.term}>
                <td className="spec-table-term">{rule.term}</td>
                <td>{rule.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
