import { SITE_URL, abs } from "../lib/seo";
import { LOCALES, href, LEGAL_PATHS } from "../lib/i18n";
import { posts } from "../lib/blog";
import { docs, docHref } from "../lib/docs";
import { THEME_KEYS } from "../lib/themes";

const ROUTES = ["/", "/nova", "/store", "/store-studio", "/grow", "/ads", "/front-office", "/switch", "/pricing", "/about", "/blog", "/contact", "/developers", "/themes", ...THEME_KEYS.map(k => `/themes/${k}`)];

const priority = route => {
  if (route === "/") return 1;
  if (route === "/switch" || route === "/pricing" || route === "/store") return 0.9;
  return 0.8;
};

// Each entry carries the full alternates map so Search Console sees the pair,
// matching the <link rel="alternate" hreflang> the pages emit.
const alternates = route => ({
  languages: Object.fromEntries([
    ...LOCALES.map(l => [l, abs(l, route)]),
    ["x-default", abs("en", route)],
  ]),
});

export default function sitemap() {
  const lastModified = new Date("2026-07-29");

  const pages = LOCALES.flatMap(lang =>
    ROUTES.map(route => ({
      url: abs(lang, route),
      lastModified,
      changeFrequency: route === "/blog" ? "weekly" : "monthly",
      // The bn tree is the same content in another language, not a second-class
      // copy — but English keeps the edge as the default locale.
      priority: lang === "en" ? priority(route) : Math.max(0.5, priority(route) - 0.1),
      alternates: alternates(route),
    }))
  );

  // Posts are locale-tagged, so each appears once — under the locale it was
  // written in (see lib/blog.js).
  const articles = posts.map(p => ({
    url: `${SITE_URL}${href(p.lang, "/blog")}/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Policy pages are English-only and live at one URL each.
  const legal = LEGAL_PATHS.map(route => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  // Developer docs are English-only, one URL each.
  const devDocs = docs.map(d => ({
    url: `${SITE_URL}${docHref(d.slug)}`,
    lastModified: new Date("2026-10-02"),
    changeFrequency: "monthly",
    priority: d.slug ? 0.5 : 0.7,
  }));

  return [...pages, ...articles, ...legal, ...devDocs];
}
