import { NextResponse } from "next/server";
import { LEGAL_PATHS } from "./lib/i18n";

// Every page lives under app/[lang]/. English keeps the bare URLs it was
// indexed on, so /about is *rewritten* (not redirected) to /en/about — the URL
// bar never shows /en. Bangla is a real path: /bn/about.
//
// Three jobs:
//   1. /bn/*        → pass through (already localized)
//   2. /en/*        → 301 to the bare path, so the /en duplicate never indexes
//   3. everything   → rewrite onto /en internally

const isLegalPath = path => LEGAL_PATHS.some(p => path === p);

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // /en/about is a real, servable path — collapse it onto /about so there is
  // exactly one URL per English page. Metadata routes are exempt: Next emits
  // absolute /en/... URLs for them and they must resolve, not redirect.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    if (pathname.includes("/opengraph-image") || pathname.includes("/icon")) return NextResponse.next();
    const bare = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(bare, request.url), 301);
  }

  if (pathname === "/bn" || pathname.startsWith("/bn/")) {
    // Legal copy exists in English only — send /bn/privacy to /privacy.
    const bare = pathname.slice(3) || "/";
    if (isLegalPath(bare)) return NextResponse.redirect(new URL(bare, request.url), 308);
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/en${pathname === "/" ? "" : pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip Next internals, the verbatim prototype embeds, brand/static assets
    // and anything with a file extension (robots.txt, sitemap.xml, llms.txt).
    "/((?!_next/|prototypes/|brand/|assets/|.*\\.).*)",
  ],
};
