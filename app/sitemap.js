import { SITE_URL } from "../lib/seo";
import { posts } from "../lib/blog";

const ROUTES = ["", "/nova", "/store-studio", "/grow", "/ads", "/front-office", "/switch", "/pricing", "/about", "/blog", "/contact"];

export default function sitemap() {
  return [
    ...ROUTES.map(route => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date("2026-07-28"),
      changeFrequency: route === "/blog" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/switch" || route === "/pricing" ? 0.9 : 0.8,
    })),
    ...posts.map(p => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
