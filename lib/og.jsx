// OG image factory — 1200×630, ink bg + lime accent + the page's one-line
// claim, per the SEO doc.
//
// Latin text only, in both locales: next/og renders through satori, which has
// no Indic shaping, so Bengali comes out with reordered matras and dotted
// circles even when the right font is supplied. content/copy/og.js holds the
// Bangla claims and the full explanation.

import { ImageResponse } from "next/og";
import { ogClaim, OG_KICKER } from "../content/copy/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Render the OG card for a route. `route` keys into content/copy/og.js. */
export function ogImage(route) {
  const claim = ogClaim(route);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F120B",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 360,
            background: "radial-gradient(circle at 50% 50%, rgba(198,240,53,0.28), rgba(198,240,53,0))",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)",
            }}
          />
          <div style={{ fontSize: 26, letterSpacing: 4, color: "#C6F035", fontWeight: 600 }}>{OG_KICKER}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 72, lineHeight: 1.08, color: "#FBFBF4", fontWeight: 800, letterSpacing: -2, maxWidth: 980 }}>{claim}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 10, borderRadius: 5, background: "#C6F035" }} />
            <div style={{ fontSize: 24, color: "#A9AD98" }}>dakio.io</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
