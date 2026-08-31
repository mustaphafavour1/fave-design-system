import { PageHeader } from '@/components/docs/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { getChangelog } from '@/lib/sanity'

export const revalidate = 60

const STEPS = [
  { title: 'Open a discussion', description: 'Propose the change and the reasoning behind it before any work starts.' },
  { title: 'Get it approved', description: 'One other designer or engineer signs off on the approach before anything gets built.' },
  {
    title: 'Design in Figma, when it earns it',
    description: 'For a new component or a real visual change. Most changes go straight to code — see the naming convention below for when Figma applies.',
  },
  { title: 'Build against the checklist', description: 'Every item below, not just the obvious ones.' },
  { title: 'Open a PR', description: 'Title as feat(component): ... or fix(component): ..., linked to the Figma spec if there is one.' },
  { title: 'Update the changelog', description: 'Add an entry before merging, not after.' },
]

const CHECKLIST = [
  'Figma spec complete, if the change needed one',
  'All props typed and documented',
  'Every interactive state covered',
  'Empty state defined',
  'Keyboard accessible',
  'ARIA labels present',
  'WCAG AA contrast verified',
  'Responsive at 320/768/1280px',
  'Dark-mode-safe via tokens, not hardcoded colours',
  "Do's/don'ts written",
  'CMS entry added',
  'Changelog updated',
]

const RELEASE_VARIANT = { major: 'error', minor: 'warning', patch: 'info' } as const

export default async function ContributingPage() {
  const changelog = await getChangelog()
  const entries = changelog?.length ? changelog : []

  return (
    <div>
      <PageHeader
        section="Contributing"
        title="Contributing"
        description="How a change gets proposed, approved, and shipped. Most changes go straight to code, thought through and signed off first; Figma comes in when a change is genuinely worth designing first."
      />

      <div className="token-section">
        <h2 className="token-section-title">Proposing a change</h2>
        <ol className="contributing-steps">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="contributing-step-index">{index + 1}</span>
              <div>
                <div className="contributing-step-title">{step.title}</div>
                <div className="contributing-step-description">{step.description}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Component checklist</h2>
        <div className="checklist-grid">
          {CHECKLIST.map((item) => (
            <div className="checklist-row" key={item}>
              <span className="checklist-row-glyph" />
              <span className="checklist-row-text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Figma naming convention</h2>
        <p className="prose">
          Format: <code>Module - Screen Name - State</code>. Only add a product-name prefix when a
          screen is shared across multiple products&apos; Figma files — within a single product&apos;s own
          file, the product name is redundant context. When a screen has both an empty and a
          populated version, both get designed and named with exactly <code>- Empty</code> /{' '}
          <code>- Filled</code> — not &quot;Blank&quot; or &quot;Populated.&quot;
        </p>
        <div className="demo-surface stack-block" style={{ display: 'block', padding: 'var(--space-5)' }}>
          <div className="figma-example">Login - Empty</div>
          <div className="figma-example">Login - Filled</div>
          <div className="figma-example">User Management - Create New User - Empty</div>
          <div className="figma-example">User Management - Create New User - Filled</div>
          <div className="figma-example">Transactions - View Transaction Details</div>
          <div className="figma-example">Change Password - Error</div>
        </div>
      </div>

      <div className="token-section">
        <h2 className="token-section-title">Changelog</h2>
        {entries.length === 0 ? (
          <p className="empty-note">
            When there are updates to the design system, they will reflect here.
          </p>
        ) : (
          <div className="changelog-list">
            {entries.map((entry: any) => (
              <div className="changelog-entry" key={entry.version}>
                <div className="changelog-entry-header">
                  <span className="changelog-version">v{entry.version}</span>
                  <Badge variant={RELEASE_VARIANT[entry.releaseType as keyof typeof RELEASE_VARIANT] ?? 'neutral'}>
                    {entry.releaseType}
                  </Badge>
                  <span className="changelog-date">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <ul className="changelog-changes">
                  {entry.changes?.map((change: any, index: number) => (
                    <li key={index}>
                      <span className="changelog-change-type">{change.type}</span> {change.description}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
