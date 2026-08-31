import Image from 'next/image'
import { PageHeader } from '@/components/docs/PageHeader'
import { DosDonts } from '@/components/docs/DosDonts'
import { getBrandPage, urlFor } from '@/lib/sanity'

export const revalidate = 60

const STATIC = {
  description:
    'The HeadFavour mark is the primary signature of the brand. Use the files provided in Sanity — never recreate, redraw, or approximate the mark.',
  dos: [
    'Maintain clear space around the mark equal to at least the height of the mark itself.',
    'Use the light-background version on white or light surfaces, and the dark-background version on dark surfaces.',
    'Scale the mark proportionally from the provided file.',
  ],
  donts: [
    'Stretch, skew, or otherwise distort the proportions of the mark.',
    'Recolour the mark outside of the approved light/dark pair.',
    'Rotate the mark or place it at an angle.',
    'Add drop shadows, outlines, or other effects.',
  ],
}

export default async function BrandLogoPage() {
  const sanity = await getBrandPage('logo')
  const description = sanity?.description || STATIC.description
  const dos = sanity?.dos?.length ? sanity.dos : STATIC.dos
  const donts = sanity?.donts?.length ? sanity.donts : STATIC.donts
  const images: any[] = sanity?.images ?? []

  return (
    <div>
      <PageHeader section="Brand" title="Logo" description={description} />

      {images.length > 0 ? (
        <div className="logo-grid">
          {images.map((image, index) => (
            <div key={image?._key ?? index}>
              <div className="demo-surface logo-showcase">
                <Image src={urlFor(image).width(400).url()} alt="" width={240} height={80} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="logo-grid">
          <div>
            <div className="demo-surface logo-showcase">
              <div className="logo-mark-placeholder">F</div>
            </div>
            <p className="logo-grid-label">Light background</p>
          </div>
          <div>
            <div className="logo-showcase logo-showcase-dark demo-surface">
              <div className="logo-mark-placeholder">F</div>
            </div>
            <p className="logo-grid-label">Dark background</p>
          </div>
        </div>
      )}

      <div className="stack-block">
        <DosDonts dos={dos} donts={donts} />
      </div>

      {images.length === 0 ? (
        <p className="empty-note">
          Showing a placeholder mark — add a &quot;Brand Page&quot; document in Sanity Studio with
          slug <code>logo</code> and upload the real logo files to the Images field to replace it.
        </p>
      ) : null}
    </div>
  )
}
