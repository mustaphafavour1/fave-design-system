import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type GuardrailPlatform = 'websites' | 'dashboards' | 'mobile'

export interface GuardrailRule {
  title: string
  category: string
  severity: 'must-fix' | 'should-fix' | 'recommended'
  tags?: string[]
  order?: number
  slug: string
  body: string
}

const ROOT = path.join(process.cwd(), 'guardrails')

// Build-time filesystem read — Server Components only (Node runtime, not
// Edge). Source of truth stays git-tracked markdown, not Sanity: see the
// spec's content-ownership table for why this one type breaks the pattern.
export function getGuardrailsByPlatform(platform: GuardrailPlatform): Record<string, GuardrailRule[]> {
  const dir = path.join(ROOT, platform)
  if (!fs.existsSync(dir)) return {}

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  const rules: GuardrailRule[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data, content } = matter(raw)
    return { ...(data as Omit<GuardrailRule, 'slug' | 'body'>), slug: file.replace(/\.md$/, ''), body: content }
  })

  return rules
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || a.title.localeCompare(b.title))
    .reduce((groups: Record<string, GuardrailRule[]>, rule) => {
      ;(groups[rule.category] ??= []).push(rule)
      return groups
    }, {})
}

export function getGuardrailCount(platform: GuardrailPlatform): number {
  const grouped = getGuardrailsByPlatform(platform)
  return Object.values(grouped).reduce((sum, rules) => sum + rules.length, 0)
}
