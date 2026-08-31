import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { CopyDownloadBar } from '@/components/docs/CopyDownloadBar'
import { getGuardrailCount, buildGuardrailMarkdown } from '@/lib/guardrails'

export const revalidate = 60

export default async function WebsiteGuardrailsPage() {
  const [count, markdown] = await Promise.all([
    getGuardrailCount('websites'),
    buildGuardrailMarkdown('websites', 'Websites'),
  ])

  return (
    <div>
      <PageHeader
        section="AI Taste/Guideline Docs"
        title="Websites"
        description={`${count} rule${count === 1 ? '' : 's'} checked before an AI-produced website design ships.`}
        actions={<CopyDownloadBar content={markdown} filename="headfavour-websites-guidelines.md" />}
      />
      <GuardrailList platform="websites" label="Websites" />
    </div>
  )
}
