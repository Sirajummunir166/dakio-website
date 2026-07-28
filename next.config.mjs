import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx"],
  // Rust MDX compiler — works under both turbopack dev and webpack build.
  // Post frontmatter lives in lib/blog.js (not in the .mdx files), so no
  // remark plugins are needed.
  experimental: { mdxRs: true },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
