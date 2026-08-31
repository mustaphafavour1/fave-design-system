import { PageHeader } from '@/components/docs/PageHeader'
import { getBrandPage } from '@/lib/sanity'

export const revalidate = 60

const TYPE_SCALE = [
  { label: 'Display', token: '--font-display · 600', px: 38 },
  { label: 'H1 / page title', token: '--font-display · 600', px: 30 },
  { label: 'H2 / section title', token: '--font-display · 600', px: 24 },
  { label: 'H3', token: '--font-display · 600', px: 20 },
  { label: 'H4', token: '--font-display · 600', px: 17 },
  { label: 'Body', token: '--font-sans · 400', px: 15 },
  { label: 'Body small', token: '--font-sans · 400', px: 13.5 },
  { label: 'Caption', token: '--font-sans · 500', px: 12 },
]

const STATIC = {
  description:
    'A two-font system: a display face for headings, stat values, and the logo wordmark, and a body face for everything else. A monospace face is reserved for reference IDs, hex codes, and code.',
}

export default async function BrandTypographyPage() {
  const sanity = await getBrandPage('typography')
  const description = sanity?.description || STATIC.description

  return (
    <div>
      <PageHeader section="Brand" title="Typography" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Type scale</h2>
        <div>
          {TYPE_SCALE.map((row) => (
            <div className="type-scale-row" key={row.label}>
              <div className="type-scale-meta">
                {row.label}
                <br />
                {row.token} · {row.px}px
              </div>
              <div className="type-scale-sample" style={{ fontSize: row.px, fontWeight: row.px >= 17 ? 600 : 400 }}>
                Design system
              </div>
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
            <tr>
              <td className="spec-table-term">Display weight cap</td>
              <td>The display face never goes above weight 600 — no 700/800/900 headings.</td>
            </tr>
            <tr>
              <td className="spec-table-term">Body face</td>
              <td>Used for all prose, labels, and UI copy. Optimised for legibility at small sizes.</td>
            </tr>
            <tr>
              <td className="spec-table-term">Monospace</td>
              <td>Reference IDs, hex codes, and code snippets only — never for prose.</td>
            </tr>
            <tr>
              <td className="spec-table-term">Line height</td>
              <td>1.6 for body copy, 1.15–1.3 for headings depending on size.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
