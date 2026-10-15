// Merchant app auth URLs (same convention as dakio-landing's APP_URL).
export const APP_URL = "https://app.dakio.io";
export const LOGIN_URL = `${APP_URL}/`;
export const REGISTER_URL = `${APP_URL}/register`;

// The small "Not ready to buy? Get a free N-day trial" line — the only place
// the site offers the trial (owner, 2026-10-16: buying is the front door).
// Signup opens a bare ?plan=<code> in TRIAL mode when that code is not on sale,
// and trials whichever package admin marks as the trial, so this link keeps
// working whatever the trial package is called. Every other button goes to
// REGISTER_URL, which opens on the packages to buy.
export const TRIAL_URL = `${REGISTER_URL}?plan=trial`;

/** A plan card's button: signup on that package and the billing period showing ("growth:YEARLY" opens payment). */
export const buyHref = (code, period) =>
  code ? `${REGISTER_URL}?plan=${encodeURIComponent(code)}${period ? `:${period}` : ""}` : REGISTER_URL;
