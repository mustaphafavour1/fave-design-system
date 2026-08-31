import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { getGuardrailCount } from '@/lib/guardrails'

export const revalidate = 60

export default async function WebsiteGuardrailsPage() {
  const count = await getGuardrailCount('websites')

  return (
    <div>
      <PageHeader
        section="AI Design Guardrails"
        title="Websites"
        description={`${count} rule${count === 1 ? '' : 's'} checked before an AI-produced website design ships.`}
      />
      <GuardrailList platform="websites" label="Websites" />
    </div>
  )
}
