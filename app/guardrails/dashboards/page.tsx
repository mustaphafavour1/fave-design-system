import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { getGuardrailCount } from '@/lib/guardrails'

export default function DashboardGuardrailsPage() {
  const count = getGuardrailCount('dashboards')

  return (
    <div>
      <PageHeader
        section="AI Design Guardrails"
        title="Dashboards"
        description={`${count} rule${count === 1 ? '' : 's'} checked before an AI-produced dashboard design ships.`}
      />
      <GuardrailList platform="dashboards" label="Dashboards" />
    </div>
  )
}
