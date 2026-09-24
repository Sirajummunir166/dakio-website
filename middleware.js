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

// Influencer coupon links: dakio.io/c/RAFI20 (or /bn/c/RAFI20). The code is
// saved in a `dakio_coupon` cookie on .dakio.io for 30 days — app.dakio.io reads
// it at signup and payment — and the visitor lands on the home page with
// ?coupon= so the strip can confirm it. The server re-checks every code where
// money moves (dakio-api lib/planCoupons.js); nothing here grants a discount.
const COUPON_PATH = /^\/(?:(bn)\/)?c\/([A-Za-z0-9_-]{3,32})\/?$/;
const COUPON_MAX_AGE = 30 * 24 * 60 * 60;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const coupon = pathname.match(COUPON_PATH);
  if (coupon) {
    const code = coupon[2].toUpperCase();
    const res = NextResponse.redirect(new URL(`${coupon[1] ? "/bn" : "/"}?coupon=${encodeURIComponent(code)}`, request.url), 307);
    const host = request.nextUrl.hostname;
    res.cookies.set("dakio_coupon", code, {
      path: "/",
      maxAge: COUPON_MAX_AGE,
      sameSite: "lax",
      // Shared with app.dakio.io in production; host-only on localhost / previews.
      ...(host === "dakio.io" || host.endsWith(".dakio.io") ? { domain: ".dakio.io", secure: true } : {}),
    });
    return res;
  }

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
