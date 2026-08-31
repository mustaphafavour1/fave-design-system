// Fetches an SVG and rewrites its fill colours to currentColor, so it can
// be inlined and recoloured per-instance via a wrapping `color` style —
// used for showing one uploaded logo mark across several brand colours.
// Server-side only: needs a real fetch, and dangerouslySetInnerHTML'ing
// the result is only safe because it's the site owner's own Sanity-hosted
// upload, not arbitrary third-party input.
export async function fetchRecolorableSvg(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    let svg = await res.text()
    if (!svg.includes('<svg')) return null

    svg = svg.replace(/<script[\s\S]*?<\/script>/gi, '')
    svg = svg.replace(/\son\w+="[^"]*"/gi, '')
    // fill="none" is how transparent holes/backgrounds are usually
    // expressed — leave it alone, only swap actual ink colours.
    svg = svg.replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"')

    return svg
  } catch (err) {
    console.error('[svg] failed to fetch/recolor:', err)
    return null
  }
}
