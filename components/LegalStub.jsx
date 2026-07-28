// Stub legal pages (Privacy / Terms / Return & Refund / Data Deletion).
// Final copy is pending from Digidhaka — the routes exist so footer links
// resolve, per the handoff definition-of-done.

import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import LogoDefs from "./Logo";

const MONO = "var(--dk-font-mono), monospace";

export default function LegalStub({ title }) {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <LogoDefs mkId="mk" wmId="wm" />
      <SiteNav ctaHref="/#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />
      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", padding: "88px 28px 96px", width: "100%" }}>
        <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>DAKIO · LEGAL</div>
        <h1 style={{ margin: "16px 0 0", fontSize: 48, lineHeight: 1.06, letterSpacing: "-1.9px", fontWeight: 800 }}>{title}</h1>
        <div style={{ marginTop: 28, borderRadius: 22, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "26px 28px", fontSize: 14.5, lineHeight: 1.7, color: "#6B6D60" }}>
          This page is being finalized. For any questions about our {title.toLowerCase()}, contact{" "}
          <a href="mailto:hello@dakio.io" style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>hello@dakio.io</a>{" "}
          — a human answers within one business day.
          <div style={{ marginTop: 14, fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#878B76" }}>© DIGIDHAKA COMMUNICATION LIMITED · TRADE LICENSE TRAD/DSCC/041467/2021</div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
