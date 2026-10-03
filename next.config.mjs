import createMDX from "@next/mdx";
import { withBotId } from "botid/next/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
  // Rust MDX compiler — works under both turbopack dev and webpack build.
  // Post frontmatter lives in lib/blog.js (not in the .mdx files), so no
  // remark plugins are needed.
  experimental: { mdxRs: true },
};

const withMDX = createMDX({});

// withBotId proxies Vercel's bot check through this domain; only the Nova
// voice guide's ticket route uses it (app/api/voice-guide/open).
export default withBotId(withMDX(nextConfig));
