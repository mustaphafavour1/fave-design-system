import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { CopyDownloadBar } from '@/components/docs/CopyDownloadBar'
import { getGuardrailCount, buildGuardrailMarkdown } from '@/lib/guardrails'

export const revalidate = 60

export default async function DashboardGuardrailsPage() {
  const [count, markdown] = await Promise.all([
    getGuardrailCount('dashboards'),
    buildGuardrailMarkdown('dashboards', 'Dashboards'),
  ])

  return (
    <div>
      <PageHeader
        section="AI Taste/Guideline Docs"
        title="Dashboards"
        description={`${count} rule${count === 1 ? '' : 's'} checked before an AI-produced dashboard design ships.`}
        actions={<CopyDownloadBar content={markdown} filename="headfavour-dashboards-guidelines.md" />}
      />
      <GuardrailList platform="dashboards" label="Dashboards" />
    </div>
  )
}
