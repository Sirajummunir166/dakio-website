// Locale plumbing. Two locales: `en` (default, served at the bare paths so no
// indexed URL moves) and `bn` (served under /bn/*). Every page lives under
// app/[lang]/ and middleware.js rewrites the bare paths onto /en internally.

export const LOCALES = ["en", "bn"];
export const DEFAULT_LOCALE = "en";

export const isLocale = v => LOCALES.includes(v);

// Legal copy is English-only and governs in English — these never take a /bn
// prefix, and middleware redirects /bn/<legal> back to the bare path.
export const LEGAL_PATHS = ["/privacy", "/terms", "/refund-policy", "/data-deletion"];

const isLegal = path => LEGAL_PATHS.some(p => path === p || path.startsWith(`${p}#`));

// Anything not a site route (prototype embeds, brand assets) is passed through
// untouched — those files exist at one path only.
const isExternalish = path => !path.startsWith("/") || path.startsWith("/prototypes/") || path.startsWith("/brand/") || path.startsWith("/assets/");

/** Locale-aware internal href: `/about` → `/about` (en) or `/bn/about` (bn). */
export function href(lang, path) {
  if (lang === DEFAULT_LOCALE || isExternalish(path) || isLegal(path)) return path;
  if (path === "/") return "/bn";
  return `/bn${path}`;
}

/** The same page in the other locale — what the EN/বাং switch links to. */
export function otherLocaleHref(lang, path) {
  return href(lang === "bn" ? "en" : "bn", path);
}

/** Absolute alternates map for Next `metadata.alternates.languages`. */
export function languageAlternates(path) {
  return {
    en: href("en", path),
    bn: href("bn", path),
    "x-default": href("en", path),
  };
}
