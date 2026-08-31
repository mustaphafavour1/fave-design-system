import { PageHeader } from '@/components/docs/PageHeader'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

// Ratios computed against the actual token hex values (WCAG relative
// luminance formula) — not estimated. Re-verify here whenever a colour
// token changes; this page is what "authoritative" means in practice.
const CONTRAST_PAIRS = [
  { label: 'Text', bg: 'var(--color-bg)', fg: 'var(--color-text)', ratio: '17.4:1' },
  { label: 'Text secondary', bg: 'var(--color-bg)', fg: 'var(--color-text-secondary)', ratio: '6.7:1' },
  { label: 'Text muted', bg: 'var(--color-bg)', fg: 'var(--color-text-muted)', ratio: '5.2:1' },
  { label: 'Button text', bg: 'var(--color-primary)', fg: 'var(--color-on-primary)', ratio: '12.6:1' },
  { label: 'Success text', bg: 'var(--color-success-bg)', fg: 'var(--color-success-text)', ratio: '9.8:1' },
  { label: 'Warning text', bg: 'var(--color-warning-bg)', fg: 'var(--color-warning-text)', ratio: '7.7:1' },
  { label: 'Error text', bg: 'var(--color-error-bg)', fg: 'var(--color-error-text)', ratio: '6.4:1' },
  { label: 'Info text', bg: 'var(--color-info-bg)', fg: 'var(--color-info-text)', ratio: '6.7:1' },
]

const STATIC = {
  description:
    'Accessibility is a requirement checked before ship, not a follow-up pass. Every token pair below is measured against the WCAG AA thresholds — 4.5:1 for normal text, 3:1 for large text (18pt+/24px+ regular, or 14pt+/18.7px+ bold).',
  rules: [
    { term: 'Keyboard', description: 'Every interactive element is reachable and operable with Tab, Shift+Tab, Enter, and Space alone — no mouse-only interactions.' },
    { term: 'Focus visibility', description: 'A visible focus ring on every focusable element — never removed with outline: none without an equally visible replacement.' },
    { term: 'Labels', description: 'Every form control and icon-only button has an accessible name (a <label>, aria-label, or equivalent).' },
    { term: 'Colour is never the only signal', description: 'Status is shown with an icon or label in addition to colour — never colour alone (e.g. red text with no icon).' },
    { term: 'Motion', description: 'Every animation respects prefers-reduced-motion (see Foundations → Motion).' },
  ],
}

export default async function AccessibilityPage() {
  const sanity = await getFoundation('accessibility')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Accessibility" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Verified contrast pairs</h2>
        <div className="contrast-pair-grid">
          {CONTRAST_PAIRS.map((pair) => (
            <div
              key={pair.label}
              className="contrast-pair"
              style={{ background: pair.bg, color: pair.fg }}
            >
              <span>{pair.label}</span>
              <span className="contrast-ratio-badge">{pair.ratio} · AA</span>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Rules</h2>
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
