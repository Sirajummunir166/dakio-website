// Port of SiteFooter.dc.html — ink block: orb + wordmark, 3 link columns,
// SSLCommerz payment strip (row swap under 760px via .nf-pay-* classes),
// legal row + lime Appoint Nova button.
//
// Localized: copy from chrome.<lang>.js, internal links through href(lang, …).
// The legal links stay unprefixed by design — policy copy is English-only and
// governs in English (see lib/i18n.js LEGAL_PATHS).

import Link from "next/link";
import LogoDefs from "./Logo";
import { REGISTER_URL } from "../lib/urls";
import { href } from "../lib/i18n";
import chromeEn, { MONO_LABELS } from "../content/copy/chrome.en";
import { type } from "../lib/type";

const MONO = "var(--dk-font-mono), monospace";

const PRODUCT_LINKS = [
  ["nova", "/nova"],
  ["store", "/store"],
  ["studio", "/store-studio"],
  ["grow", "/grow"],
  ["ads", "/ads"],
  ["frontOffice", "/front-office"],
  ["pricing", "/pricing"],
];

const TRY_LIVE_LINKS = [
  ["hq", "/prototypes/Nova HQ Prototype v7.dc.html"],
  ["studio", "/prototypes/Dakio Store Studio.dc.html"],
  ["grow", "/prototypes/Dakio Grow Modules.dc.html"],
  ["ads", "/prototypes/Dakio Nova Motion Ads.dc.html"],
  ["inbox", "/prototypes/Nova Inbox - Front Office.dc.html"],
];

const COMPANY_LINKS = [
  ["about", "/about"],
  ["blog", "/blog"],
  ["contact", "/contact"],
  ["switch", "/switch"],
];

export default function SiteFooter({ lang = "en", copy }) {
  const c = copy || chromeEn.footer;
  const T = type(lang);
  const L = p => href(lang, p);

  const cols = [
    { title: MONO_LABELS.footProduct, group: c.product, links: PRODUCT_LINKS },
    { title: MONO_LABELS.footTryLive, group: c.tryLive, links: TRY_LIVE_LINKS },
    { title: MONO_LABELS.footCompany, group: c.company, links: COMPANY_LINKS },
  ];

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", background: "#0F120B", color: "#E9EFDC", marginTop: 20 }}>
      <LogoDefs mkId="nf-mk" wmId="nf-wm" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 36px" }}>
        <div className="m-foot" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* dark-bg lockup per design system: lime mark + cream wordmark */}
              <svg width="24" height="24" viewBox="0 5.4 23 23" style={{ color: "#C6F035" }}><use href="#nf-mk" /></svg>
              <svg width="82" height="23" viewBox="31 0 104 29" style={{ color: "#FBFBF4" }}><use href="#nf-wm" /></svg>
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 13, color: "#A9AD98", maxWidth: 250, lineHeight: 1.65, ...T.small }}>{c.tagline}</p>
            <div style={{ marginTop: 16, display: "inline-flex", padding: "6px 13px", borderRadius: 99, border: "1px solid rgba(198,242,62,0.3)", fontFamily: MONO, fontSize: 8, letterSpacing: "0.12em", color: "#8CBF33" }}>{MONO_LABELS.footRegion}</div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#878B76" }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 15 }}>
                {col.links.map(([key, path]) => (
                  <Link key={key} href={L(path)} className="hv-lime" style={{ fontSize: 13, color: "#A9AD98", ...T.label }}>{col.group[key]}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(233,239,220,0.1)" }}>
          <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#878B76" }}>{MONO_LABELS.footPayments}</div>
          <div style={{ marginTop: 12, borderRadius: 14, background: "#ffffff", padding: "10px 14px", overflow: "hidden" }}>
            <img className="nf-pay-1row" src="/assets/sslcommerz-pay-1row.png" alt={c.payAlt} style={{ width: "100%", height: "auto" }} />
            <img className="nf-pay-2rows" src="/assets/sslcommerz-pay-2rows.png" alt={c.payAlt} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(233,239,220,0.1)", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#878B76", lineHeight: 1.6, ...T.small }}>{c.legalLine}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <Link href="/privacy" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76", ...T.label }}>{c.privacy}</Link>
            <Link href="/terms" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76", ...T.label }}>{c.terms}</Link>
            <Link href="/refund-policy" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76", ...T.label }}>{c.refund}</Link>
            <Link href="/data-deletion" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76", ...T.label }}>{c.dataDeletion}</Link>
            <a href={REGISTER_URL} className="hv-up1" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 12, fontWeight: 700, ...T.label }}>{c.cta}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
