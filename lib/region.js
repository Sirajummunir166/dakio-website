/**
 * Which price a visitor sees: taka (Bangladesh) or US dollars (everywhere else).
 * DAKIO_GLOBAL_BILLING_PLAN.md §6.1 — the owner chose NO currency switch.
 *
 *   1. /bn/* → taka, always (the Bangla site is for Bangladesh).
 *   2. the `dakio_region` cookie, set by middleware.js from Vercel's
 *      `x-vercel-ip-country` header: "BD" → taka, any other country → dollars.
 *   3. no cookie (local dev, a preview without geo) → taka.
 *
 * The pages are static, so both price sets are in the HTML. This script runs in
 * <head> before the page paints and sets `data-region` on <html>; globals.css
 * hides the other set. No flicker, one cached page for everyone.
 *
 * The cookie lives on .dakio.io, so app.dakio.io's signup pre-fills the
 * merchant's country from it. Only the PRICE SHOWN depends on it: what a
 * merchant is charged follows the country they pick at signup.
 */
export const REGION_COOKIE = "dakio_region";

export const REGION_SCRIPT = `(function(){try{var d=document.documentElement,r="BD";if(!/^\\/bn(\\/|$)/.test(location.pathname)){var m=document.cookie.match(/(?:^|; )${REGION_COOKIE}=([A-Za-z]{2,4})/);if(m&&m[1].toUpperCase()!=="BD")r="INTL";}d.setAttribute("data-region",r);}catch(e){}})();`;

/** "DE" → "DE"; "bd" → "BD"; anything that is not a two-letter code → null. */
export function countryFromHeader(v) {
  const c = String(v || "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(c) && c !== "XX" && c !== "T1" ? c : null;
}
