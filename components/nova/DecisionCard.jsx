"use client";

// Interactive decision card from "Dakio Nova.dc.html" — Approve swaps the
// buttons for the EXECUTED · receipt · undo-24h line.

import { useState } from "react";

const MONO = "var(--dk-font-mono), monospace";

export default function DecisionCard() {
  const [approved, setApproved] = useState(false);

  return (
    <div style={{ marginTop: 14, borderRadius: 16, background: "#14170E", border: "1px solid rgba(198,242,62,0.2)", padding: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.12em", color: "#E3B54A" }}>DECISION · INVENTORY</span>
        <span style={{ fontFamily: MONO, fontSize: 8.5, color: "#8CBF33" }}>CONFIDENCE 91%</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 9, color: "#FBFBF4" }}>Reorder 60 × Jamdani stole before Eid week</div>
      <div style={{ fontSize: 12, color: "#A9AD98", marginTop: 6, lineHeight: 1.6 }}>Sell-through 3.2×/wk · stockout in 9 days · supplier lead time 12 days. Waiting costs an est. ৳38,000.</div>
      {!approved ? (
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <span onClick={() => setApproved(true)} className="hv-glow22 av-scale97" style={{ padding: "9px 20px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Approve</span>
          <span className="hv-bg-wash06" style={{ padding: "9px 16px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.2)", fontSize: 12.5, fontWeight: 600, color: "#A9AD98", cursor: "pointer" }}>Later</span>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14, fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#8CBF33" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          EXECUTED · PO #1187 CREATED · RECEIPT #A-4472 · UNDO 24H
        </div>
      )}
    </div>
  );
}
