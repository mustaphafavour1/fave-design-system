import { PageHeader } from '@/components/docs/PageHeader'
import { ResolvedIcon, iconMap } from '@/lib/icons'
import { getFoundation } from '@/lib/sanity'

export const revalidate = 60

const GRID_ICONS = [
  'House', 'User', 'Users', 'ChartBar', 'ShieldCheck', 'Lightning', 'Globe', 'Wallet',
  'Bell', 'Gear', 'Lock', 'CreditCard', 'ChatCircle', 'DeviceMobile', 'Rocket', 'Clock',
]

const WEIGHTS: { weight: 'regular' | 'bold' | 'duotone' | 'fill'; usage: string }[] = [
  { weight: 'regular', usage: 'Default — used everywhere unless a rule below applies' },
  { weight: 'bold', usage: 'Active or selected states (e.g. the current nav item)' },
  { weight: 'duotone', usage: 'Decorative feature icons (e.g. homepage section cards)' },
  { weight: 'fill', usage: 'Status glyphs (e.g. a filled bell for "has notifications")' },
]

const STATIC = {
  description:
    'One icon library for the whole product: Phosphor. 1,200+ icons across six consistent weights — never mix in an icon from another set, and never ship emoji as icons.',
  rules: [
    { term: 'Single source', description: 'Every icon comes from @phosphor-icons/react. No mixed libraries, no emoji in shipped product.' },
    { term: 'Server components', description: 'Import from the /dist/ssr subpath in any file that might render on the server — the default export breaks server-side page-data collection.' },
    { term: 'Size', description: 'Icons default to 20px inline with text, 24px in isolation (buttons, nav).' },
  ],
}

export default async function IconographyPage() {
  const sanity = await getFoundation('iconography')
  const description = sanity?.description || STATIC.description
  const rules = sanity?.rules?.length ? sanity.rules : STATIC.rules

  return (
    <div>
      <PageHeader section="Foundations" title="Iconography" description={description} />

      <div className="token-section">
        <h2 className="token-section-title">Library ({Object.keys(iconMap).length} icons wired in lib/icons.tsx)</h2>
        <div className="icon-grid">
          {GRID_ICONS.map((name) => (
            <div className="icon-grid-item" key={name}>
              <ResolvedIcon name={name} size={22} weight="regular" />
              <span className="icon-grid-label">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Weights</h2>
        <div className="icon-grid">
          {WEIGHTS.map((w) => (
            <div className="icon-grid-item" key={w.weight}>
              <ResolvedIcon name="Bell" size={24} weight={w.weight} color="var(--color-primary)" />
              <span className="icon-grid-label">{w.weight}</span>
            </div>
          ))}
        </div>
        <table className="spec-table stack-block">
          <thead>
            <tr>
              <th className="spec-table-term">Weight</th>
              <th>When to use it</th>
            </tr>
          </thead>
          <tbody>
            {WEIGHTS.map((w) => (
              <tr key={w.weight}>
                <td className="spec-table-term">{w.weight}</td>
                <td>{w.usage}</td>
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
