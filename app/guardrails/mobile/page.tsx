import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { getGuardrailCount } from '@/lib/guardrails'

export default function MobileGuardrailsPage() {
  const count = getGuardrailCount('mobile')

  return (
    <div>
      <PageHeader
        section="AI Design Guardrails"
        title="Mobile Apps"
        description={`${count} rule${count === 1 ? '' : 's'} checked before an AI-produced mobile design ships.`}
      />
      <GuardrailList platform="mobile" label="Mobile Apps" />
    </div>
  )
}
