import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

const COLOR_TOKENS = [
  { name: '--color-primary', var: 'var(--color-primary)' },
  { name: '--color-primary-dark', var: 'var(--color-primary-dark)' },
  { name: '--color-primary-faint', var: 'var(--color-primary-faint)' },
  { name: '--color-text', var: 'var(--color-text)' },
  { name: '--color-text-secondary', var: 'var(--color-text-secondary)' },
  { name: '--color-border', var: 'var(--color-border)' },
  { name: '--color-bg-subtle', var: 'var(--color-bg-subtle)' },
  { name: '--color-success-text', var: 'var(--color-success-text)' },
  { name: '--color-warning-text', var: 'var(--color-warning-text)' },
  { name: '--color-error-text', var: 'var(--color-error-text)' },
  { name: '--color-info-text', var: 'var(--color-info-text)' },
]

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

const RADIUS_TOKENS = [
  { name: '--radius-sm', var: 'var(--radius-sm)' },
  { name: '--radius-md', var: 'var(--radius-md)' },
  { name: '--radius-lg', var: 'var(--radius-lg)' },
  { name: '--radius-xl', var: 'var(--radius-xl)' },
  { name: '--radius-full', var: 'var(--radius-full)' },
]

const SHADOW_TOKENS = [
  { name: '--shadow-1', var: 'var(--shadow-1)' },
  { name: '--shadow-2', var: 'var(--shadow-2)' },
  { name: '--shadow-3', var: 'var(--shadow-3)' },
  { name: '--shadow-4', var: 'var(--shadow-4)' },
  { name: '--shadow-5', var: 'var(--shadow-5)' },
]

const STATIC = {
  description:
    'Every colour, space, radius, shadow, and duration in this system is a CSS custom property defined once in app/globals.css. Components reference the token, never a raw value.',
  rules: [
    {
      term: 'Semantic aliases',
      description: 'Components reference --color-primary, never a raw scale value or hex code directly.',
    },
    {
      term: 'Colour scale',
      description:
        'Runs 25 (near-white tint) to 900 (near-black shade); semantic aliases point at one specific stop.',
    },
    {
      term: 'Contrast',
      description: 'Every text/background token pair meets WCAG AA — 4.5:1 for normal text, 3:1 for large text.',
    },
    {
      term: 'Spacing unit',
      description: '4px base unit. Every gap, padding, and margin used anywhere is a multiple of 4.',
    },
    {
      term: 'New tokens',
      description: 'Proposed in the same PR as their first real usage — never added speculatively.',
    },
  ],
}

export default async function DesignTokensPage() {
  const sanity = await getFoundation('tokens')

  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Design Tokens" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Colour</h2>
        <div className="token-swatch-grid">
          {COLOR_TOKENS.map((token) => (
            <div key={token.name}>
              <div className="token-swatch-preview" style={{ background: token.var }} />
              <div className="token-swatch-label">{token.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Typography</h2>
        <div>
          <div className="token-type-sample">
            <div className="token-type-label">--font-display · 600 · 24px</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 24 }}>
              Aa Design system
            </div>
          </div>
          <div className="token-type-sample">
            <div className="token-type-label">--font-sans · 400 · 15px</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15 }}>
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
          <div className="token-type-sample">
            <div className="token-type-label">--font-mono · 400 · 13px</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              ref_8f3a2c1e · #4F46E5 · 200ms
            </div>
          </div>
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Spacing</h2>
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
        <h2 className="token-section-title">Border Radius</h2>
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
        <h2 className="token-section-title">Elevation</h2>
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
        <h2 className="token-section-title">Motion</h2>
        <div className="token-motion-row">
          <div className="token-motion-demo" />
          <p className="token-motion-note">
            Hover the square — it scales using <code>--duration-base</code> (200ms) and{' '}
            <code>--easing</code>. Quick UI feedback (hover, focus) uses <code>--duration-fast</code>{' '}
            (120ms) instead. Both are disabled automatically for <code>prefers-reduced-motion</code>.
          </p>
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

      {!sanity ? (
        <p className="empty-note">
          Showing static fallback rules — add a &quot;Foundation&quot; document in Sanity Studio with
          slug <code>tokens</code> to manage the usage rules above from the CMS.
        </p>
      ) : null}
    </div>
  )
}
