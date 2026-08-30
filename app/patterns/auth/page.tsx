import { PageHeader } from '@/components/docs/PageHeader'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { DosDonts } from '@/components/docs/DosDonts'
import { TextInput } from '@/components/ui/TextInput'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { getPattern } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'Two accepted layouts: split screen (contextual image + form card) and fullscreen overlay (background image, dark overlay, frosted card). Both share the same field and button rules.',
  dos: [
    'Keep the submit button visually muted/disabled until every required field validates.',
    'Put "Remember me" and "Forgot Password?" on the same row.',
    'Use UPPERCASE/small-caps field labels — this is a deliberate auth-only convention, not used elsewhere.',
  ],
  donts: [
    'Enable the submit button before validation, relying on a click-time alert instead.',
    'Use a fullscreen background image without checking overlay contrast against both its darkest and lightest regions.',
  ],
}

export default async function AuthPatternPage() {
  const sanity = await getPattern('auth')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts

  return (
    <div>
      <PageHeader section="Patterns" title="Authentication" description={description} />

      <ComponentPreview title="Format 1 — split screen">
        <div className="pattern-auth-demo">
          <div className="pattern-auth-image" />
          <div className="pattern-auth-form-side">
            <div className="pattern-auth-card">
              <div className="pattern-auth-logo">F</div>
              <div className="pattern-auth-title">Sign in</div>
              <TextInput label="Email" placeholder="you@example.com" />
              <TextInput label="Password" type="password" placeholder="••••••••" />
              <div className="pattern-auth-row">
                <Checkbox label="Remember me" />
                <Link href="#" variant="inline" muted>
                  Forgot Password?
                </Link>
              </div>
              <Button disabled style={{ width: '100%' }}>
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>
    </div>
  )
}
