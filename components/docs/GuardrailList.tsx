import { ShieldCheck } from '@phosphor-icons/react/dist/ssr'
import ReactMarkdown from 'react-markdown'
import { EmptyState } from '@/components/ui/EmptyState'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { getGuardrailsByPlatform, type GuardrailPlatform } from '@/lib/guardrails'

const SEVERITY_VARIANT = {
  'must-fix': 'error',
  'should-fix': 'warning',
  recommended: 'info',
} as const

export function GuardrailList({ platform, label }: { platform: GuardrailPlatform; label: string }) {
  const grouped = getGuardrailsByPlatform(platform)
  const categories = Object.keys(grouped)

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={<ShieldCheck size={22} />}
        title="No Guardrails Yet"
        description={`When rules for ${label} are added, they'll show here.`}
      />
    )
  }

  return (
    <Accordion
      defaultOpen={[0]}
      items={categories.map((category) => ({
        title: category,
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {grouped[category].map((rule) => (
              <div key={rule.slug}>
                <div className="checklist-row">
                  <span className="checklist-row-glyph" />
                  <span className="checklist-row-text">{rule.title}</span>
                  <Badge variant={SEVERITY_VARIANT[rule.severity] ?? 'neutral'}>{rule.severity}</Badge>
                </div>
                {rule.body?.trim() ? (
                  <div className="guardrail-rule-body">
                    <ReactMarkdown>{rule.body}</ReactMarkdown>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ),
      }))}
    />
  )
}
