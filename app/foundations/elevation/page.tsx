import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

const SHADOW_TOKENS = [
  { name: '--shadow-0', var: 'var(--shadow-0)', usage: 'Flat — default resting state for most surfaces' },
  { name: '--shadow-1', var: 'var(--shadow-1)', usage: 'Cards and rows at rest' },
  { name: '--shadow-2', var: 'var(--shadow-2)', usage: 'Hover state on a card or button' },
  { name: '--shadow-3', var: 'var(--shadow-3)', usage: 'Dropdowns, popovers, tooltips' },
  { name: '--shadow-4', var: 'var(--shadow-4)', usage: 'Modals, dialogs' },
  { name: '--shadow-5', var: 'var(--shadow-5)', usage: 'The single highest overlay on screen at once' },
]

const STATIC = {
  description:
    'Six levels, flat (0) to highest overlay (5). Elevation communicates stacking order and interactivity — it is not decoration.',
  rules: [
    { term: 'One highest layer', description: 'Only one element on screen uses --shadow-5 at a time — if two things compete for it, one is wrong.' },
    { term: 'Elevation implies interactivity', description: 'Raising a shadow on hover signals "this is clickable." Don’t apply it to static content.' },
    { term: 'Pair with motion', description: 'Elevation changes transition using --duration-fast, never instantly.' },
  ],
}

export default async function ElevationPage() {
  const sanity = await getFoundation('elevation')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Elevation" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Scale</h2>
        <div className="token-shadow-grid">
          {SHADOW_TOKENS.map((token) => (
            <div key={token.name}>
              <div className="token-shadow-preview" style={{ boxShadow: token.var }} />
              <div className="token-swatch-label">{token.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">When to use each level</h2>
        <table className="spec-table">
          <thead>
            <tr>
              <th className="spec-table-term">Token</th>
              <th>When to use it</th>
            </tr>
          </thead>
          <tbody>
            {SHADOW_TOKENS.map((token) => (
              <tr key={token.name}>
                <td className="spec-table-term">{token.name}</td>
                <td>{token.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Usage rules</h2>
        <table className="spec-table">
          <thead>
            <tr>
              <th className="spec-table-term">Rule</th>
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

      {!sanity ? (
        <p className="empty-note">
          Showing static fallback rules — add a &quot;Foundation&quot; document in Sanity Studio with
          slug <code>elevation</code> to manage the usage rules above from the CMS.
        </p>
      ) : null}
    </div>
  )
}
