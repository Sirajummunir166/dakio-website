// Shared skeleton for the three play-first pages (Store Studio / Ads / Front
// Office): slim hero + the real product in a browser-chrome frame (iframe of
// the prototype), LIVE badge, TRY chips, feature chips, lime CTA.
// Frame math from source: zoom 0.88, view height 720 → inner 1440×819 scaled.
//
// Copy comes from content/copy/playfirst.<lang>.js via the three route files;
// only `shared` (Full screen / Back to Dakio) is passed here directly.

import { Nav, Footer } from "./Chrome";
import Reveal from "./Reveal";
import LogoDefs from "./Logo";
import PageJsonLd from "./PageJsonLd";
import FrameScaler from "./FrameScaler";
import { REGISTER_URL } from "../lib/urls";
import { href } from "../lib/i18n";
import { type } from "../lib/type";

const MONO = "var(--dk-font-mono), monospace";

export function Highlight({ children }) {
  return (
    <span style={{ position: "relative", whiteSpace: "nowrap" }}>
      {children}
      <span style={{ position: "absolute", left: 0, right: 0, bottom: 6, height: 14, background: "#C6F035", zIndex: -1, borderRadius: 3 }} />
    </span>
  );
}

export default function PlayFirstPage({
  lang = "en",
  shared,
  route,
  active,
  navCtaHref,
  navCtaLabel,
  kicker,
  h1,
  h1MaxWidth,
  sub,
  subMaxWidth,
  barUrl,
  liveLabel,
  iframeSrc,
  iframeTitle,
  tryLabel,
  tryChips,
  featsH2,
  featsH2MaxWidth,
  feats,
  featsMaxWidth,
  featsNote,
  ctaH2,
  ctaH2MaxWidth,
  ctaPrimaryLabel,
  ctaMonoLine,
}) {
  const T = type(lang);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={route} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={route} active={active} ctaHref={navCtaHref} ctaLabel={navCtaLabel} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px 36px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45", animation: "heroUp .6s ease both" }}>{kicker}</div>
        <h1 className="m-h1" style={{ margin: "20px auto 0", fontSize: 62, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, maxWidth: h1MaxWidth, animation: "heroUp .6s .08s ease both", ...T.h1c }}>{h1}</h1>
        <p style={{ margin: "18px auto 0", fontSize: 16, lineHeight: 1.6, color: "#6B6D60", maxWidth: subMaxWidth, animation: "heroUp .6s .16s ease both", ...T.lead }}>{sub}</p>
      </div>

      {/* LIVE EMBED */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1310, margin: "0 auto", padding: "0 20px" }}>
        <div className="m-bleed" style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.1)", boxShadow: "0 40px 90px rgba(26,29,18,0.2)", overflow: "hidden", animation: "heroUp .7s .22s ease both" }}>
          <div className="m-wrap" style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 18px", borderBottom: "1px solid rgba(26,29,18,0.07)", background: "#ffffff" }}>
            <span style={{ width: 9, height: 9, borderRadius: 99, background: "#1A1D12", opacity: 0.85 }} />
            <span style={{ width: 9, height: 9, borderRadius: 99, background: "#1A1D12", opacity: 0.35 }} />
            <span style={{ width: 9, height: 9, borderRadius: 99, background: "#1A1D12", opacity: 0.15 }} />
            <div style={{ marginLeft: 14, padding: "4px 14px", borderRadius: 99, background: "#E8E6DA", fontSize: 10, color: "#6B6D60", fontWeight: 600 }}>{barUrl}</div>
            <div style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#3E7A45" }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: "#3E7A45", animation: "pulseRing 2.2s infinite" }} />{liveLabel}
            </div>
          </div>
          <FrameScaler src={iframeSrc} title={iframeTitle} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
          {tryChips.map(t => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 15px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12, fontWeight: 700, ...T.chip }}>
              <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.08em", color: "#3E7A45" }}>{tryLabel}</span>{t}
            </span>
          ))}
          <a href={iframeSrc} className="hv-up1" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 12, fontWeight: 700, ...T.chip }}>
            {shared.fullScreen} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
          </a>
        </div>
      </div>

      {/* WHAT YOU JUST USED */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px", textAlign: "center" }}>
        <div data-reveal>
          <h2 className="m-h2b" style={{ margin: "0 auto", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, maxWidth: featsH2MaxWidth, ...T.h2b }}>{featsH2}</h2>
        </div>
        <div data-reveal style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 9, marginTop: 28, maxWidth: featsMaxWidth, marginLeft: "auto", marginRight: "auto" }}>
          {feats.map(f => (
            <span key={f} style={{ padding: "10px 17px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.09)", fontSize: 13, fontWeight: 700, ...T.chip }}>{f}</span>
          ))}
        </div>
        {featsNote}
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "70px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.03, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: ctaH2MaxWidth, ...T.ctaH2 }}>{ctaH2}</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />{ctaPrimaryLabel}
            </a>
            <a href={href(lang, "/")} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{shared.back}</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>{ctaMonoLine}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
