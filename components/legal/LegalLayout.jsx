// Legal page chrome + typography. Copy ported verbatim from dakio-landing's
// PolicyLayout pages, restyled to the v3 site language (ink/lime/cream).

import { notFound } from "next/navigation";
import { Nav, Footer } from "../Chrome";
import LogoDefs from "../Logo";
import { DEFAULT_LOCALE } from "../../lib/i18n";

// Policy copy is English-only and governs in English, so the legal routes exist
// at one URL each. Middleware sends /bn/<legal> back to the bare path; this
// guard makes sure the prerendered /bn copy 404s rather than shipping a
// duplicate. Call it from every legal page.
export function englishOnly(lang) {
  if (lang !== DEFAULT_LOCALE) notFound();
}

const MONO = "var(--dk-font-mono), monospace";

export function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", color: "#1A1D12", marginBottom: 14, paddingBottom: 10, borderBottom: "2px solid rgba(26,29,18,0.08)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export function P({ children }) {
  return <p style={{ fontSize: 14, lineHeight: 1.85, color: "#6B6D60", marginBottom: 12, marginTop: 0 }}>{children}</p>;
}

export function Ul({ items }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 12px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 14, color: "#6B6D60", lineHeight: 1.7 }}>
          <span style={{ color: "#3E7A45", flexShrink: 0, fontWeight: 700 }}>·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Step({ number, title, children }) {
  return (
    <div style={{ display: "flex", gap: 18, marginBottom: 28 }}>
      <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: "rgba(198,240,53,0.35)", border: "2px solid #1A1D12", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#1A1D12", marginTop: 2 }}>
        {number}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1A1D12", marginBottom: 6 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

export function A({ href, children, subject }) {
  const h = subject ? `${href}?subject=${encodeURIComponent(subject)}` : href;
  return (
    <a href={h} style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>
      {children}
    </a>
  );
}

export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <LogoDefs mkId="mk" wmId="wm" />
      <Nav lang={DEFAULT_LOCALE} route="/" ctaHref="/#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />
      <div style={{ flex: 1, maxWidth: 760, margin: "0 auto", padding: "64px 28px 88px", width: "100%" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>DAKIO · LEGAL</div>
          <h1 className="m-h2b" style={{ margin: "14px 0 8px", fontSize: 44, lineHeight: 1.08, letterSpacing: "-1.7px", fontWeight: 800 }}>{title}</h1>
          {lastUpdated ? <p style={{ fontSize: 13, color: "#878B76", margin: 0 }}>Last updated: {lastUpdated}</p> : null}
        </div>
        {children}
        <div style={{ marginTop: 8, fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#878B76" }}>© DIGIDHAKA COMMUNICATION LIMITED · TRADE LICENSE TRAD/DSCC/041467/2021</div>
      </div>
      <Footer lang={DEFAULT_LOCALE} />
    </div>
  );
}
