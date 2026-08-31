import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

const RADIUS_TOKENS = [
  { name: '--radius-sm', var: 'var(--radius-sm)', usage: 'Small chips, inline badges' },
  { name: '--radius-md', var: 'var(--radius-md)', usage: 'Inputs, buttons, small chips' },
  { name: '--radius-lg', var: 'var(--radius-lg)', usage: 'Cards, tables, modals' },
  { name: '--radius-xl', var: 'var(--radius-xl)', usage: 'Auth cards, large elevated surfaces' },
  { name: '--radius-full', var: 'var(--radius-full)', usage: 'Pills, badges, avatars, toggles' },
]

const STATIC = {
  description: 'A small, consistent scale referenced everywhere a corner is rounded.',
  rules: [
    { term: 'No arbitrary radii', description: 'Every rounded corner uses one of the five tokens on this page.' },
    { term: 'Nesting', description: 'A nested element’s radius is never larger than its parent’s.' },
    { term: 'Consistency over cleverness', description: 'The same component always uses the same radius token across the whole product.' },
  ],
}

export default async function BorderRadiusPage() {
  const sanity = await getFoundation('border-radius')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Border Radius" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Scale</h2>
        <div className="token-radius-grid">
          {RADIUS_TOKENS.map((token) => (
            <div key={token.name}>
              <div className="token-radius-preview" style={{ borderRadius: token.var }} />
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
            {RADIUS_TOKENS.map((token) => (
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
    </div>
  )
}
