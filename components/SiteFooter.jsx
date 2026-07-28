// Port of SiteFooter.dc.html — ink block: orb + wordmark, 3 link columns,
// SSLCommerz payment strip (row swap under 760px via .nf-pay-* classes),
// legal row + lime Appoint Nova button.

import LogoDefs from "./Logo";

const MONO = "var(--dk-font-mono), monospace";

const COLS = [
  {
    title: "PRODUCT",
    links: [
      { label: "Nova — your CEO", href: "/nova" },
      { label: "Store Studio", href: "/store-studio" },
      { label: "Grow Labs", href: "/grow" },
      { label: "Ads Gallery", href: "/ads" },
      { label: "Front Office", href: "/front-office" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "TRY IT LIVE",
    links: [
      { label: "Nova HQ", href: "/prototypes/Nova HQ Prototype v7.dc.html" },
      { label: "Store Studio builder", href: "/prototypes/Dakio Store Studio.dc.html" },
      { label: "The Grow Studio", href: "/prototypes/Dakio Grow Modules.dc.html" },
      { label: "Ads editor", href: "/prototypes/Dakio Nova Motion Ads.dc.html" },
      { label: "The inbox", href: "/prototypes/Nova Inbox - Front Office.dc.html" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Switch to Dakio", href: "/switch" },
    ],
  },
];

const PAY_ALT =
  "Pay with Visa, Mastercard, bKash, Nagad, Rocket and 40+ methods — verified by SSLCommerz";

export default function SiteFooter() {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", background: "#0F120B", color: "#E9EFDC", marginTop: 20 }}>
      <LogoDefs mkId="nf-mk" wmId="nf-wm" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* dark-bg lockup per design system: lime mark + cream wordmark */}
              <svg width="24" height="24" viewBox="0 5.4 23 23" style={{ color: "#C6F035" }}><use href="#nf-mk" /></svg>
              <svg width="82" height="23" viewBox="31 0 104 29" style={{ color: "#FBFBF4" }}><use href="#nf-wm" /></svg>
            </div>
            <p style={{ margin: "14px 0 0", fontSize: 13, color: "#A9AD98", maxWidth: 250, lineHeight: 1.65 }}>The commerce OS for Bangladesh — with an AI CEO in every store.</p>
            <div style={{ marginTop: 16, display: "inline-flex", padding: "6px 13px", borderRadius: 99, border: "1px solid rgba(198,242,62,0.3)", fontFamily: MONO, fontSize: 8, letterSpacing: "0.12em", color: "#8CBF33" }}>৳ BANGLADESH · GOING GLOBAL SOON</div>
          </div>
          {COLS.map(c => (
            <div key={c.title}>
              <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#878B76" }}>{c.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 15 }}>
                {c.links.map(l => (
                  <a key={l.label} href={l.href} className="hv-lime" style={{ fontSize: 13, color: "#A9AD98" }}>{l.label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(233,239,220,0.1)" }}>
          <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#878B76" }}>CHECKOUT PAYMENTS · VERIFIED BY SSLCOMMERZ</div>
          <div style={{ marginTop: 12, borderRadius: 14, background: "#ffffff", padding: "10px 14px", overflow: "hidden" }}>
            <img className="nf-pay-1row" src="/assets/sslcommerz-pay-1row.png" alt={PAY_ALT} style={{ width: "100%", height: "auto" }} />
            <img className="nf-pay-2rows" src="/assets/sslcommerz-pay-2rows.png" alt={PAY_ALT} style={{ width: "100%", height: "auto" }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(233,239,220,0.1)", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#878B76", lineHeight: 1.6 }}>© 2026 Dakio by Digidhaka Communication Limited. All rights reserved.<br />Trade License No. TRAD/DSCC/041467/2021 · Made for Bangladesh&apos;s entrepreneurs</span>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <a href="/privacy" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76" }}>Privacy</a>
            <a href="/terms" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76" }}>Terms</a>
            <a href="/refund-policy" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76" }}>Return &amp; Refund Policy</a>
            <a href="/data-deletion" className="hv-cream-e9" style={{ fontSize: 12, color: "#878B76" }}>Data Deletion</a>
            <a href="/nova" className="hv-up1" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 12, fontWeight: 700 }}>Appoint Nova</a>
          </div>
        </div>
      </div>
    </div>
  );
}
