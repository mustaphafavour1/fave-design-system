/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    // Product logos are uploaded as SVG; next/image blocks SVG through its
    // optimizer by default (it can embed scripts). Sandboxed per Next's own
    // documented recipe: served with a strict CSP and forced download
    // disposition rather than executed inline.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  transpilePackages: ['@sanity/ui', '@sanity/icons', '@sanity/vision'],
}

export default nextConfig
