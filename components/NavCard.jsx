// The Explore menu's fourth column (SiteNav).
//
// Before the visitor points at anything it asks which business they run and
// sends them to /shops or /services, with the home chat demo as the third way
// in. On hover of a menu row it shows that row's real app screen (public/app)
// and the one line under it. Rows without a screen yet show their line alone.
//
// Light on purpose: the dark pill with Nova's glowing ball is kept for the
// Talk to Nova button only.

import Link from "next/link";
import SmartLink from "./SmartLink";

const card = { display: "flex", flexDirection: "column", borderRadius: 18, background: "#EEF1E3", padding: 14, minHeight: 300 };
const choice = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "11px 14px", borderRadius: 12, background: "#C6F035", color: "#1A1D12", fontSize: 13, fontWeight: 800 };

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function NavCard({ it, c, T, L, dest }) {
  if (!it) {
    const s = c.start;
    return (
      <div style={{ ...card, justifyContent: "center", gap: 10, padding: 18 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#1A1D12", lineHeight: 1.25, ...T.label }}>{s.title}</div>
        <div style={{ fontSize: 12.5, color: "#5B5E50", lineHeight: 1.5, marginBottom: 4, ...T.chip }}>{s.body}</div>
        <Link href={L("/shops")} className="hv-up1" style={{ ...choice, ...T.label }}>{s.shops} <Arrow /></Link>
        <Link href={L("/services")} className="hv-up1" style={{ ...choice, ...T.label }}>{s.services} <Arrow /></Link>
        <Link href={`${L("/")}#chat`} className="hv-ink" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 12, fontWeight: 700, color: "#3E7A45", ...T.label }}>{s.chat} <Arrow /></Link>
      </div>
    );
  }

  return (
    <SmartLink href={dest(it.href)} className="hv-up2" style={card}>
      {it.shot ? (
        <div style={{ borderRadius: 10, overflow: "hidden", background: "#fff", border: "1px solid rgba(26,29,18,0.1)", boxShadow: "0 10px 24px rgba(26,29,18,0.12)" }}>
          <div style={{ display: "flex", gap: 4, padding: "6px 8px", borderBottom: "1px solid rgba(26,29,18,0.08)" }}>
            {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: 99, background: "#D9DCCB" }} />)}
          </div>
          <img src={`/app/${it.shot}.webp`} alt="" style={{ display: "block", width: "100%", height: 150, objectFit: "cover", objectPosition: "top left" }} />
        </div>
      ) : null}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: it.shot ? "flex-start" : "center", marginTop: it.shot ? 12 : 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: "#1A1D12", ...T.label }}>{it.n}</div>
        <div style={{ fontSize: 12.5, color: "#5B5E50", lineHeight: 1.5, marginTop: 4, ...T.chip }}>{it.note}</div>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 10, fontSize: 12.5, fontWeight: 800, color: "#3E7A45", ...T.label }}>{c.see} <Arrow /></div>
    </SmartLink>
  );
}
