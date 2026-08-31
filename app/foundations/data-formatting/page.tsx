import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const day = d.getUTCDate()
  const month = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
  return `${day} ${month} ${d.getUTCFullYear()}`
}

const CURRENCY_EXAMPLES = [4, 1250, 84920.5, 1000000]
const DATE_EXAMPLES = ['2026-01-05', '2026-03-21', '2025-12-31']
const NUMBER_EXAMPLES = [1000, 84500, 2450000]

const STATIC = {
  description:
    'Numbers, currency, and dates render the same way everywhere in the product — a user should never see two different date formats on the same screen.',
  rules: [
    { term: 'Currency', description: 'Always 2 decimal places, right-aligned in tables, thousands separator, no currency symbol ambiguity.' },
    { term: 'Dates', description: 'DD MMM YYYY (e.g. 5 Jan 2026) — never DD/MM/YYYY or MM/DD/YYYY, which are ambiguous across locales.' },
    { term: 'Numbers', description: 'Thousands separators on every number over 999, right-aligned in tables.' },
    { term: 'Reference IDs', description: 'Monospace font, never formatted or truncated in a way that loses characters silently.' },
  ],
}

export default async function DataFormattingPage() {
  const sanity = await getFoundation('data-formatting')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Data Formatting" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Currency</h2>
        <div className="demo-surface" style={{ display: 'block', padding: 'var(--space-2) 0' }}>
          {CURRENCY_EXAMPLES.map((n) => (
            <div className="format-example-row" key={n}>
              <span className="format-example-input">{n}</span>
              <span className="format-example-output">${formatCurrency(n)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Dates</h2>
        <div className="demo-surface" style={{ display: 'block', padding: 'var(--space-2) 0' }}>
          {DATE_EXAMPLES.map((iso) => (
            <div className="format-example-row" key={iso}>
              <span className="format-example-input">{iso}</span>
              <span className="format-example-output">{formatDate(iso)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Numbers</h2>
        <div className="demo-surface" style={{ display: 'block', padding: 'var(--space-2) 0' }}>
          {NUMBER_EXAMPLES.map((n) => (
            <div className="format-example-row" key={n}>
              <span className="format-example-input">{n}</span>
              <span className="format-example-output">{new Intl.NumberFormat('en-US').format(n)}</span>
            </div>
          ))}
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
