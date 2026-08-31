import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

const SPACING_TOKENS = [
  { name: '--space-1', px: 4 },
  { name: '--space-2', px: 8 },
  { name: '--space-3', px: 12 },
  { name: '--space-4', px: 16 },
  { name: '--space-5', px: 20 },
  { name: '--space-6', px: 24 },
  { name: '--space-8', px: 32 },
  { name: '--space-10', px: 40 },
]

const STATIC = {
  description:
    'A strict 4px base unit. Every gap, padding, and margin in the system is a multiple of 4 — there is no "just this once" 5px or 18px.',
  rules: [
    { term: 'Base unit', description: '4px. Every spacing token is a multiple of it.' },
    { term: 'Component padding', description: 'Small controls (chips, badges) use --space-2/--space-3; buttons and inputs use --space-3/--space-4.' },
    { term: 'Section spacing', description: 'Related content groups use --space-6; distinct page sections use --space-8 or --space-10.' },
    { term: 'No raw values', description: 'A gap, padding, or margin that isn’t one of the tokens on this page is a bug, not a design decision.' },
  ],
}

export default async function SpacingPage() {
  const sanity = await getFoundation('spacing')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Spacing & Grid" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Scale</h2>
        <div>
          {SPACING_TOKENS.map((token) => (
            <div className="token-spacing-row" key={token.name}>
              <div className="token-spacing-label">{token.name}</div>
              <div className="token-spacing-bar" style={{ width: token.px }} />
              <div className="token-spacing-label">{token.px}px</div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Nesting example</h2>
        <div
          className="demo-surface"
          style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 'var(--space-6)' }}
        >
          <div
            style={{
              background: 'var(--color-bg-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
            }}
          >
            <div style={{ fontSize: 12.5, color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
              Card padding: --space-5 (20px)
            </div>
            <div
              style={{
                background: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                fontSize: 12.5,
                color: 'var(--color-text-secondary)',
              }}
            >
              Inner control padding: --space-3 (12px)
            </div>
          </div>
        </div>
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
