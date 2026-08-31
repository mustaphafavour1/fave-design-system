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

const FONT_SPECIMENS = [
  {
    fontFamily: 'Fraunces',
    googleFont: 'Fraunces',
    caption: 'App display face — headlines, match scores, currency amounts.',
    usedBy: 'MonieMatch',
  },
  {
    fontFamily: 'Nunito',
    googleFont: 'Nunito',
    caption: 'App body copy, labels, and buttons.',
    usedBy: 'MonieMatch',
  },
  {
    fontFamily: 'Bricolage Grotesque',
    googleFont: 'Bricolage Grotesque',
    caption: 'Headings and the wordmark.',
    usedBy: 'Stampdx',
  },
  {
    fontFamily: 'Plus Jakarta Sans',
    googleFont: 'Plus Jakarta Sans',
    caption: 'UI text and paragraphs.',
    usedBy: 'Stampdx',
  },
  {
    fontFamily: 'Syne',
    googleFont: 'Syne',
    caption: 'Display, headings, and UI labels.',
    usedBy: 'Kronikl',
  },
  {
    fontFamily: 'Inter',
    googleFont: 'Inter',
    caption: 'Body copy.',
    usedBy: 'Kronikl',
  },
]

const STATIC = {
  description:
    'A two-font system: a display face for headings, stat values, and the logo wordmark, and a body face for everything else. A monospace face is reserved for reference IDs, hex codes, and code.',
}

function googleFontsHref(specimens: { googleFont?: string }[]) {
  const families = specimens
    .map((s) => s.googleFont?.trim())
    .filter((name): name is string => Boolean(name))
    .map((name) => `family=${encodeURIComponent(name).replace(/%20/g, '+')}:wght@400;600;700`)

  return families.length > 0 ? `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap` : null
}

export default async function BrandTypographyPage() {
  const sanity = await getBrandPage('typography')
  const description = sanity?.description || STATIC.description
  const specimens = sanity?.fontSpecimens?.length ? sanity.fontSpecimens : FONT_SPECIMENS
  const fontsHref = googleFontsHref(specimens)

  return (
    <div>
      {fontsHref ? <link rel="stylesheet" href={fontsHref} /> : null}
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
        <h2 className="token-section-title">Product fonts</h2>
        <div className="type-specimen-list">
          {specimens.map((spec: any, index: number) => (
            <div key={index} className="type-specimen-card">
              <div className="type-specimen-header">
                <span className="type-specimen-name">{spec.fontFamily}</span>
                {spec.usedBy ? <span className="chip">{spec.usedBy}</span> : null}
              </div>
              {spec.caption ? <p className="type-specimen-caption">{spec.caption}</p> : null}
              <div
                className="type-specimen-sample"
                style={{ fontFamily: `"${spec.googleFont || spec.fontFamily}", var(--font-sans)` }}
              >
                <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
                <div>abcdefghijklmnopqrstuvwxyz</div>
                <div>0123456789</div>
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
