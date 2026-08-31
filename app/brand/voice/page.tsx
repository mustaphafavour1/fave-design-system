import { PortableText } from '@portabletext/react'
import { PageHeader } from '@/components/docs/PageHeader'
import { DosDonts } from '@/components/docs/DosDonts'
import { getBrandPage } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description: 'How I want HeadFavour to sound, whether that’s product copy, an error message or a receipt email.',
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
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

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
            HeadFavour sounds clear, confident and human. We say what happened and what to do next;
            we don&apos;t hide behind vague copy or over-apologise for a routine state. I strongly
            believe a product should talk to people the way a good colleague would, not a legal
            disclaimer.
          </p>
          <p>
            Tone still moves with context. A dashboard empty state stays calm and practical. A
            destructive action&apos;s confirmation is direct, no softening. And a success message is
            brief, not celebratory; the work speaks for itself.
          </p>
        </div>
      )}

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
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
