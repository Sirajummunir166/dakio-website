// The Free plan on the pricing page: one slim row under the paid cards
// (DAKIO_GROWTH_SYSTEM.md §9). Deliberately secondary: never a card the size of
// Growth, never highlighted, and no big ৳0, so the first price the eye meets is
// still Growth's. The button opens signup on Launch week (TRIAL_URL), which
// steps down to Free after 7 days. Renders nothing without copy.

import { TRIAL_URL } from "../../lib/urls";

export default function FreeRow({ free, T = {}, maxWidth = 800 }) {
  if (!free) return null;
  return (
    <div className="m-wrap" style={{ maxWidth, margin: "14px auto 0", padding: "16px 20px", borderRadius: 20, border: "1px dashed rgba(26,29,18,0.2)", display: "flex", alignItems: "center", gap: "10px 22px", flexWrap: "nowrap" }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.2px", ...T.h3 }}>{free.title}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#3E7A45", marginTop: 2, ...T.chip }}>{free.tag}</div>
      </div>
      <div style={{ flex: "1 1 260px", minWidth: 0, fontSize: 12.5, lineHeight: 1.5, color: "#6B6D60", ...T.small }}>
        <div>{free.limits}</div>
        <div style={{ color: "#1A1D12", fontWeight: 600, marginTop: 2 }}>{free.launch}</div>
      </div>
      <a href={TRIAL_URL} style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", ...T.label }}>
        {free.cta} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
