import { PageHeader } from '@/components/docs/PageHeader'
import { GuardrailList } from '@/components/docs/GuardrailList'
import { CopyDownloadBar } from '@/components/docs/CopyDownloadBar'
import { getGuardrailCount, buildGuardrailMarkdown } from '@/lib/guardrails'

export const revalidate = 60

export default async function MobileGuardrailsPage() {
  const [count, markdown] = await Promise.all([
    getGuardrailCount('mobile'),
    buildGuardrailMarkdown('mobile', 'Mobile Apps'),
  ])

  return (
    <div>
      <PageHeader
        section="AI Taste/Guideline Docs"
        title="Mobile Apps"
        description={`${count} rule${count === 1 ? '' : 's'} checked before an AI-produced mobile design ships.`}
        actions={<CopyDownloadBar content={markdown} filename="headfavour-mobile-guidelines.md" />}
      />
      <GuardrailList platform="mobile" label="Mobile Apps" />
    </div>
  )
}
