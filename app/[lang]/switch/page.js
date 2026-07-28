// Switch — 1:1 port of "Dakio Switch.dc.html", localized. The platform name is
// a constant in the copy files (PLATFORM, default "Shopify"), as in the source.

import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { REGISTER_URL } from "../../../lib/urls";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import swEn, { MONO } from "../../../content/copy/switch.en";
import swBn from "../../../content/copy/switch.bn";

const COPY = { en: swEn, bn: swBn };
const ROUTE = "/switch";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

const MONOFONT = "var(--dk-font-mono), monospace";

const dayPill = lime => ({
  display: "inline-block", padding: "6px 13px", borderRadius: 99,
  ...(lime ? { background: "#C6F035", color: "#0F120B" } : { background: "#1A1D12", color: "#C6F035" }),
  fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
});

export default async function SwitchPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} active="switch" ctaHref="#cta" ctaLabel={c.navCta} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "76px 28px 20px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45", animation: "heroUp .6s ease both" }}>{MONO.heroBadge}</div>
        <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 64, lineHeight: 1.03, letterSpacing: "-2.6px", fontWeight: 800, maxWidth: 760, animation: "heroUp .6s .08s ease both", ...T.h1 }}>
          {c.hero.h1}
        </h1>
        <p style={{ margin: "20px auto 0", fontSize: 17, lineHeight: 1.6, color: "#6B6D60", maxWidth: 480, animation: "heroUp .6s .16s ease both", ...T.lead }}>{c.hero.sub}</p>
        <div className="m-wrap" style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
          <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700, ...T.label }}>
            {c.hero.ctaPrimary}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a href="#math" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.hero.ctaSecondary}</a>
        </div>
      </div>

      {/* THE MATH */}
      <div id="math" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px 20px" }}>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 880, margin: "0 auto", alignItems: "stretch" }} data-reveal>
          <div style={{ borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)", padding: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.12em", color: "#6B6D60" }}>{MONO.oldStack}</div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
              {c.math.oldBill.map(ob => (
                <div key={ob.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, paddingBottom: 11, borderBottom: "1px dashed rgba(26,29,18,0.1)" }}>
                  <div><div style={{ fontSize: 13.5, fontWeight: 700, ...T.chip }}>{ob.n}</div><div style={{ fontSize: 11, color: "#6B6D60", marginTop: 1, ...T.chip }}>{ob.d}</div></div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#6B6D60", whiteSpace: "nowrap" }}>{ob.v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#6B6D60", ...T.chip }}>{c.math.oldTotalLabel}</span>
              <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px", color: "#B03A2E" }}>{c.math.oldTotal}<span style={{ fontSize: 13, fontWeight: 600, color: "#6B6D60" }}>{c.math.perMonth}</span></span>
            </div>
          </div>
          <div style={{ borderRadius: 28, background: "#0F120B", color: "#E9EFDC", padding: 30, display: "flex", flexDirection: "column", boxShadow: "0 30px 70px rgba(15,18,11,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.12em", color: "#8CBF33" }}>{MONO.newStack}</div>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
            </div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
              {c.math.newBill.map(nb => (
                <div key={nb.n} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 11, borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6L9 17l-5-5" /></svg>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 700, color: "#FBFBF4", ...T.chip }}>{nb.n}</div><div style={{ fontSize: 11, color: "#A9AD98", marginTop: 1, ...T.chip }}>{nb.d}</div></div>
                  <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.08em", color: "#8CBF33" }}>{MONO.included}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#A9AD98", ...T.chip }}>{c.math.newTotalLabel}</span>
              <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px", color: "#C6F035" }}>{c.math.newTotal}<span style={{ fontSize: 13, fontWeight: 600, color: "#A9AD98" }}>{c.math.perMonth}</span></span>
            </div>
          </div>
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 14, fontSize: 11.5, color: "#6B6D60", ...T.small }}>{c.math.footnote}</div>
      </div>

      {/* THE WEEKEND */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.planKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, ...T.h2 }}>{c.weekend.h2}</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {c.weekend.days.map((wk, i) => (
            <div key={MONO.days[i]} style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
              <div style={dayPill(wk.lime)}>{MONO.days[i]}</div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 14, ...T.h3 }}>{wk.t}</div>
              <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 7, lineHeight: 1.6, ...T.small }}>{wk.b}</div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ marginTop: 14, borderRadius: 20, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.12em", color: "#3E7A45", flexShrink: 0 }}>{MONO.whatMoves}</span>
          {c.weekend.moves.map(t => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 99, background: "#ffffff", border: "1px solid rgba(26,29,18,0.09)", fontSize: 12.5, fontWeight: 700, ...T.chip }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3E7A45" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{t}
            </span>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#6B6D60", ...T.small }}>{c.weekend.movesNote}</span>
        </div>
      </div>

      {/* WHAT YOU GAIN */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.gainKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 660, ...T.h2 }}>{c.gain.h2}</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1px" }}>৳</div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 10, ...T.h3 }}>{c.gain.cards[0].t}</div>
            <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 7, lineHeight: 1.6, ...T.small }}>{c.gain.cards[0].d}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>{c.gain.cards[0].chips.map(t => <span key={t} style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10.5, fontWeight: 700 }}>{t}</span>)}</div>
          </div>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 10, ...T.h3 }}>{c.gain.cards[1].t}</div>
            <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 7, lineHeight: 1.6, ...T.small }}>{c.gain.cards[1].d}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>{c.gain.cards[1].chips.map(t => <span key={t} style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10.5, fontWeight: 700 }}>{t}</span>)}</div>
          </div>
          <a href={L("/nova")} className="hv-up3" style={{ display: "block", borderRadius: 26, background: "#0F120B", color: "#E9EFDC", padding: 26 }}>
            <span style={{ display: "inline-block", width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 10, color: "#FBFBF4", ...T.h3 }}>{c.gain.nova.t}</div>
            <div style={{ fontSize: 13, color: "#A9AD98", marginTop: 7, lineHeight: 1.6, ...T.small }}>{c.gain.nova.d}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 14, fontSize: 12.5, fontWeight: 700, color: "#C6F035", ...T.label }}>{c.gain.nova.cta} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }} data-reveal>
          <h2 style={{ margin: 0, fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.4px", fontWeight: 800, ...T.h2 }}>{c.faq.h2}</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} data-reveal>
          {c.faq.items.map(f => (
            <div key={f.q} style={{ borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "20px 24px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.2px", ...T.h3 }}>{f.q}</div>
              <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 6, lineHeight: 1.6, ...T.body }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "76px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.04, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 720, ...T.ctaH2 }}>{c.cta.h2}</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />{c.cta.primary}
            </a>
            <a href={L("/")} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{c.cta.secondary}</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>{MONO.ctaStrip}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
