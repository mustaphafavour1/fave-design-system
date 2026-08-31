import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { getGuardrailCount } from '@/lib/guardrails'

export const revalidate = 60

export default async function DashboardGuardrailsPage() {
  const count = await getGuardrailCount('dashboards')

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
