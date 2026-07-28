"use client";

// Interactive decision card from "Dakio Nova.dc.html" — Approve swaps the
// buttons for the EXECUTED · receipt · undo-24h line. Copy arrives as props so
// the card speaks the page's locale; the receipt line stays mono English.

import { useState } from "react";
import { type } from "../../lib/type";

const MONOFONT = "var(--dk-font-mono), monospace";

export default function DecisionCard({ lang = "en", copy, mono }) {
  const [approved, setApproved] = useState(false);
  const T = type(lang);

  return (
    <div style={{ marginTop: 14, borderRadius: 16, background: "#14170E", border: "1px solid rgba(198,242,62,0.2)", padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.12em", color: "#E3B54A" }}>{mono.cardTag}</span>
        <span style={{ fontFamily: MONOFONT, fontSize: 8.5, color: "#8CBF33" }}>{mono.cardConfidence}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 9, color: "#FBFBF4", ...T.h3 }}>{copy.title}</div>
      <div style={{ fontSize: 12, color: "#A9AD98", marginTop: 6, lineHeight: 1.6, ...T.small }}>{copy.body}</div>
      {!approved ? (
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <span onClick={() => setApproved(true)} className="hv-glow22 av-scale97" style={{ padding: "9px 20px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 12.5, fontWeight: 700, cursor: "pointer", ...T.label }}>{copy.approve}</span>
          <span className="hv-bg-wash06" style={{ padding: "9px 16px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.2)", fontSize: 12.5, fontWeight: 600, color: "#A9AD98", cursor: "pointer", ...T.label }}>{copy.later}</span>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14, fontFamily: MONOFONT, fontSize: 10, letterSpacing: "0.1em", color: "#8CBF33" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          {mono.cardExecuted}
        </div>
      )}
    </div>
  );
}
