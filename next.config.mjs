import createMDX from "@next/mdx";
import { withBotId } from "botid/next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
  // Rust MDX compiler — works under both turbopack dev and webpack build.
  // Post frontmatter lives in lib/blog.js (not in the .mdx files), so no
  // remark plugins are needed.
  experimental: { mdxRs: true },
  // Themes became Templates. The pictures stay under /themes/<id>/..., so only
  // the pages (one path segment after /themes) are sent on.
  async redirects() {
    return [
      { source: "/themes", destination: "/templates", permanent: true },
      { source: "/bn/themes", destination: "/bn/templates", permanent: true },
      { source: "/themes/:key", destination: "/templates/:key", permanent: true },
      { source: "/bn/themes/:key", destination: "/bn/templates/:key", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

// withBotId proxies Vercel's bot check through this domain; only the Nova
// voice guide's ticket route uses it (app/api/voice-guide/open).
export default withBotId(withMDX(nextConfig));
