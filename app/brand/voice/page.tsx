import { PortableText } from '@portabletext/react'
import { PageHeader } from '@/components/docs/PageHeader'
import { DosDonts } from '@/components/docs/DosDonts'
import { getBrandPage } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'How HeadFavour sounds in product copy, error messages, emails, and support content.',
  dos: [
    'Say the specific thing that happened, and the specific next step — "Your card was declined" not "Something went wrong."',
    'Write like a knowledgeable, friendly colleague, not a legal disclaimer.',
    'Use active voice and short sentences, especially in errors and empty states.',
    'Match the formality of the moment — a confirmation can be warm, a security warning should be direct.',
  ],
  donts: [
    'Use jargon, internal team names, or acronyms a user has no way of knowing.',
    'Blame the user ("You entered an invalid value") — describe the problem neutrally instead.',
    'Use exclamation marks to manufacture enthusiasm.',
    'Write a generic "Something went wrong" when the real cause is knowable.',
  ],
}

export default async function BrandVoicePage() {
  const sanity = await getBrandPage('voice')
  const description = sanity?.description || STATIC.description
  const body = sanity?.body

  return (
    <div>
      <PageHeader section="Brand" title="Voice & Tone" description={description} />

      {body?.length ? (
        <div className="prose">
          <PortableText value={body} />
        </div>
      ) : (
        <div className="prose">
          <p>
            HeadFavour&apos;s voice is clear, confident, and human. We explain what happened and what to do
            next — we don&apos;t hide behind vague copy or over-apologise for routine states.
          </p>
          <p>
            Tone flexes with context: a dashboard empty state is calm and practical, a destructive
            action&apos;s confirmation is direct and unambiguous, and a success message is brief rather
            than celebratory.
          </p>
        </div>
      )}

      <div className="stack-block">
        <DosDonts dos={STATIC.dos} donts={STATIC.donts} />
      </div>

      {!sanity ? (
        <p className="empty-note">
          Showing static fallback copy — add a &quot;Brand Page&quot; document in Sanity Studio with
          slug <code>voice</code> to manage this content from the CMS.
        </p>
      ) : null}
    </div>
  )
}
