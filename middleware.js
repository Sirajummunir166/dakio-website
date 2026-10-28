import { NextResponse } from "next/server";
import { LEGAL_PATHS, isEnglishOnlyPath } from "./lib/i18n";
import { REGION_COOKIE, countryFromHeader } from "./lib/region";

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
const REGION_MAX_AGE = 30 * 24 * 60 * 60;

/**
 * The visitor's country for the price they see (lib/region.js): Vercel's
 * `x-vercel-ip-country`, kept in `dakio_region` on .dakio.io so app.dakio.io's
 * signup can pre-fill it too. Written only when it changes. Outside production,
 * `?region=DE` (or BD) overrides it, so the dollar page can be checked without a
 * VPN. No header and no override → no cookie → taka.
 */
function withRegion(request, res) {
  const override = process.env.VERCEL_ENV !== "production" ? countryFromHeader(request.nextUrl.searchParams.get("region")) : null;
  const country = override || countryFromHeader(request.headers.get("x-vercel-ip-country"));
  if (!country || request.cookies.get(REGION_COOKIE)?.value === country) return res;
  const host = request.nextUrl.hostname;
  res.cookies.set(REGION_COOKIE, country, {
    path: "/",
    maxAge: REGION_MAX_AGE,
    sameSite: "lax",
    ...(host === "dakio.io" || host.endsWith(".dakio.io") ? { domain: ".dakio.io", secure: true } : {}),
  });
  return res;
}

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
    // Keep the query (?for=, utm_*, fbclid): ads and links must survive the hop.
    return NextResponse.redirect(new URL(bare + request.nextUrl.search, request.url), 301);
  }

  if (pathname === "/bn" || pathname.startsWith("/bn/")) {
    // Legal copy and the developer docs exist in English only — send
    // /bn/privacy to /privacy, /bn/developers/docs/… to /developers/docs/….
    const bare = pathname.slice(3) || "/";
    if (isLegalPath(bare) || isEnglishOnlyPath(bare)) return NextResponse.redirect(new URL(bare + request.nextUrl.search, request.url), 308);
    return withRegion(request, NextResponse.next());
  }

  return withRegion(request, NextResponse.rewrite(new URL(`/en${pathname === "/" ? "" : pathname}`, request.url)));
}

export const config = {
  matcher: [
    // Skip Next internals, route handlers (api/), the verbatim prototype
    // embeds, brand/static assets, Vercel BotID's proxy path (next.config
    // withBotId) and anything with a file extension (robots.txt, sitemap.xml,
    // llms.txt).
    "/((?!_next/|api/|prototypes/|brand/|assets/|149e9513-01fa-4fb0-aad4-566afd725d1b/|.*\\.).*)",
  ],
};
