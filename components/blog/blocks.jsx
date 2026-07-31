// Custom blocks authors can drop into a .mdx post — ported from dakio-landing,
// token vars resolved to this site's literal values. Server-safe (no hooks).

import SmartLink from "../SmartLink";
import { REGISTER_URL } from "../../lib/urls";

const INK = "#1A1D12";
const LIME = "#C6F035";
const CARD = "#fbfcf7";
const FG2 = "#5c6150";
const LINE_SOFT = "rgba(27, 30, 21, 0.06)";
const LINE_INSET = "rgba(27, 30, 21, 0.10)";
const ON_INK_MUTED = "rgba(244, 246, 236, 0.55)";
const SUCCESS = "#3E7A45";

function ArrowRight({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Opening lead paragraph — larger, ink, medium weight.
export function Lead({ children }) {
  return <p style={{ margin: 0, fontSize: 18, color: INK, fontWeight: 500, lineHeight: 1.85 }}>{children}</p>;
}

// Stat callout — big figure on the left, supporting text on the right.
export function Callout({ stat, children }) {
  return (
    <div style={{ margin: "28px 0 0", padding: "24px 28px", borderRadius: 16, background: CARD, border: `1px solid ${LINE_INSET}`, display: "flex", alignItems: "center", gap: 20 }}>
      {stat ? <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.2px", color: INK, flexShrink: 0 }}>{stat}</div> : null}
      <div style={{ fontSize: 14, lineHeight: 1.6, color: FG2 }}>{children}</div>
    </div>
  );
}

// Numbered step list wrapper.
export function Steps({ children }) {
  return <div style={{ margin: "20px 0 0", display: "flex", flexDirection: "column", gap: 14 }}>{children}</div>;
}

// One numbered step card. `n` renders as the green index.
export function Step({ n, children }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "20px 22px", borderRadius: 16, background: CARD, border: `1px solid ${LINE_SOFT}` }}>
      <span style={{ fontSize: 13, fontWeight: 800, color: SUCCESS, paddingTop: 2, flexShrink: 0 }}>{n}</span>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: "#3a3d30" }}>{children}</div>
    </div>
  );
}

// Mid-article ink CTA band.
export function MidCTA({ title, children, cta = "ফ্রি শুরু করুন", href = REGISTER_URL }) {
  return (
    <div style={{ margin: "44px 0 0", padding: "32px 36px", borderRadius: 20, background: INK, color: "#f4f6ec", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.3px", color: "#fff" }}>{title}</div>
        {children ? <div style={{ fontSize: 13.5, color: ON_INK_MUTED, marginTop: 6, lineHeight: 1.6 }}>{children}</div> : null}
      </div>
      <SmartLink href={href} className="hv-up3" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "12px 22px", borderRadius: 12, background: LIME, color: INK, fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
        {cta} <ArrowRight />
      </SmartLink>
    </div>
  );
}
