// Merchant app auth URLs (same convention as dakio-landing's APP_URL).
// NEXT_PUBLIC_APP_URL points the links at a local merchant app in development
// (http://localhost:5190); production has no override.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.dakio.io";
export const LOGIN_URL = `${APP_URL}/`;
export const REGISTER_URL = `${APP_URL}/register`;

// "Start free": signup on the Free plan. The signup app reads ?plan=trial as
// "start on Free" (no countdown, DAKIO_GROWTH_SYSTEM.md §25.3), so this link
// stays the same whatever the Free package is called.
export const FREE_URL = `${REGISTER_URL}?plan=trial`;

/** A plan card's button: signup on that package and the billing period showing ("growth:YEARLY" opens payment). */
export const buyHref = (code, period) =>
  code ? `${REGISTER_URL}?plan=${encodeURIComponent(code)}${period ? `:${period}` : ""}` : REGISTER_URL;

/** "Just looking? See Dakio running": the merchant app's demo store (§25.3). */
export const DEMO_URL = `${APP_URL}/demo`;
