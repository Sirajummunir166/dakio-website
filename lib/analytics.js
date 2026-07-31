// GA4 for the "Dakio Website" stream (property stream 15360999220).
//
// The measurement ID is public — it ships in the page source of every site that
// uses GA — so it lives here rather than in an env var nobody remembers to set
// on a new Vercel project.
export const GA_MEASUREMENT_ID = "G-TW1HR08MLJ";

// Vercel sets NEXT_PUBLIC_VERCEL_ENV on every deploy ("production" | "preview" |
// "development"); it is undefined under `next dev`. Gating on production keeps
// preview builds and local work out of the property, so the numbers in GA are
// only ever real visitors.
//
// To check the tag end-to-end against a local build, build with the flag on:
//   NEXT_PUBLIC_VERCEL_ENV=production npm run build && npx next start
// Those hits are real, so exclude them in GA (Admin → Data Streams → Configure
// tag settings → Define internal traffic) before doing it often.
export const analyticsEnabled = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
