// Grow Labs — 1:1 port of "Dakio Grow Labs Page.dc.html", localized.

import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { REGISTER_URL } from "../../../lib/urls";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import growEn, { MONO } from "../../../content/copy/grow.en";
import growBn from "../../../content/copy/grow.bn";

const COPY = { en: growEn, bn: growBn };
const ROUTE = "/grow";
const PROTO = "/prototypes/Dakio Grow Modules.dc.html";

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

// Pin anchors on the revenue curve — position is chart geometry, not copy.
const PIN_STYLE = (l, t, d) => ({
  position: "absolute", left: `${l}%`, top: `${t}%`, transform: "translate(-50%,-100%)",
  display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: 99,
  background: "#14170E", border: "1px solid rgba(198,242,62,0.35)", fontSize: 10, fontWeight: 700,
  color: "#E9EFDC", whiteSpace: "nowrap", animation: `pinIn .4s ${d}s ease both`,
});
const PIN_POS = [PIN_STYLE(26, 76, 1.0), PIN_STYLE(46, 62, 1.5), PIN_STYLE(66, 44, 2.0), PIN_STYLE(87, 20, 2.5)];

export default async function GrowPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} active="grow" ctaHref="#cta" ctaLabel={c.navCta} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO: the diverging curve */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45", animation: "heroUp .6s ease both" }}>{MONO.heroBadge}</div>
            <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 58, lineHeight: 1.04, letterSpacing: "-2.4px", fontWeight: 800, animation: "heroUp .6s .08s ease both", ...T.h1 }}>
              {c.hero.h1}
            </h1>
            <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.65, color: "#6B6D60", maxWidth: 400, animation: "heroUp .6s .16s ease both", ...T.lead }}>{c.hero.sub}</p>
            <div className="m-wrap" style={{ display: "flex", gap: 12, marginTop: 28, animation: "heroUp .6s .24s ease both" }}>
              <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700, ...T.label }}>
                {c.hero.ctaPrimary}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href={PROTO} className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.hero.ctaSecondary}</a>
            </div>
          </div>
          <div style={{ animation: "heroUp .7s .2s ease both" }}>
            <div style={{ position: "relative", borderRadius: 26, background: "#0F120B", padding: "26px 26px 18px", boxShadow: "0 34px 80px rgba(15,18,11,0.3)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.14em", color: "#878B76" }}>{MONO.chartTitle}</span>
                <span style={{ display: "flex", gap: 14, fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.08em" }}>
                  <span style={{ color: "#878B76" }}>{MONO.chartLegendGrey}</span>
                  <span style={{ color: "#C6F035" }}>{MONO.chartLegendLime}</span>
                </span>
              </div>
              <div style={{ position: "relative", marginTop: 14 }}>
                <svg viewBox="0 0 560 290" style={{ width: "100%", display: "block" }}>
                  <line x1="20" y1="70" x2="540" y2="70" stroke="rgba(233,239,220,0.07)" strokeWidth="1" />
                  <line x1="20" y1="140" x2="540" y2="140" stroke="rgba(233,239,220,0.07)" strokeWidth="1" />
                  <line x1="20" y1="210" x2="540" y2="210" stroke="rgba(233,239,220,0.07)" strokeWidth="1" />
                  <line x1="20" y1="258" x2="540" y2="258" stroke="rgba(233,239,220,0.14)" strokeWidth="1" />
                  <polygon points="20,250 150,236 300,196 430,120 540,52 540,258 20,258" fill="url(#growFill)" style={{ animation: "areaIn 1.4s 1.4s ease both" }} />
                  <defs>
                    <linearGradient id="growFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(198,240,53,0.28)" />
                      <stop offset="100%" stopColor="rgba(198,240,53,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M20,250 C120,246 220,240 340,236 C430,233 500,231 540,230" fill="none" stroke="rgba(233,239,220,0.35)" strokeWidth="2.5" strokeDasharray="6 7" pathLength="1000" strokeDashoffset="1000" style={{ animation: "drawLine 1.8s .3s ease both" }} />
                  <path d="M20,250 C110,242 200,228 300,196 C390,167 470,102 540,52" fill="none" stroke="#C6F035" strokeWidth="4" strokeLinecap="round" pathLength="1000" strokeDasharray="1000" strokeDashoffset="1000" style={{ animation: "drawLine 2.2s .5s ease both" }} />
                </svg>
                {c.hero.pins.map((pn, i) => (
                  <div key={pn} className={`m-pin-${i + 1}`} style={{ ...PIN_POS[i], ...T.chip }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0 }} />{pn}
                  </div>
                ))}
                <span style={{ position: "absolute", left: "95%", top: "15.5%", width: 12, height: 12, margin: -6, borderRadius: 99, background: "#C6F035", animation: "glowDot 2s 2.7s infinite" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.1em", color: "#878B76" }}>
                {MONO.chartAxis.map(a => <span key={a}>{a}</span>)}
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#6B6D60", ...T.small }}>{c.hero.chartNote}</div>
          </div>
        </div>
      </div>

      {/* MIDNIGHT: with / without */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "92px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.midnightKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 50, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640, ...T.h2 }}>{c.midnight.h2}</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} data-reveal>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)", padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.12em", color: "#B03A2E" }}>{MONO.aloneStamp}</span>
              <span style={{ fontSize: 11, color: "#6B6D60", ...T.chip }}>{c.midnight.aloneMood}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
              {c.midnight.alone.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(26,29,18,0.07)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "rgba(176,58,46,0.6)", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#6B6D60", ...T.chip }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#B03A2E" }}>{MONO.aloneFoot}</div>
          </div>
          <div style={{ borderRadius: 26, background: "#0F120B", color: "#E9EFDC", padding: 28, boxShadow: "0 28px 60px rgba(15,18,11,0.28)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.12em", color: "#8CBF33" }}>{MONO.novaStamp}</span>
              <span style={{ fontSize: 11, color: "#A9AD98", ...T.chip }}>{c.midnight.novaMood}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
              {c.midnight.withNova.map(w => (
                <div key={w.t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(198,242,62,0.15)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, ...T.chip }}>{w.t}</span>
                  <span style={{ fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.06em", color: "#8CBF33" }}>{w.waiting ? MONO.waiting : MONO.receipt}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#8CBF33" }}>{MONO.novaFoot}</div>
          </div>
        </div>
      </div>

      {/* SIX LEVERS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "92px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.leversKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 50, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 700, ...T.h2 }}>{c.levers.h2}</h2>
          <p style={{ margin: "14px auto 0", fontSize: 14.5, color: "#6B6D60", maxWidth: 460, lineHeight: 1.6, ...T.body }}>{c.levers.p}</p>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {c.levers.items.map((lv, i) => (
            <div key={lv.n} className="hv-up3-border25" style={{ borderRadius: 24, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px", ...T.h3 }}>{lv.n}</span>
                <span style={{ fontFamily: MONOFONT, fontSize: 7.5, letterSpacing: "0.1em", color: "#3E7A45" }}>{MONO.leverJobs[i]}</span>
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: "#9a9e8c", textDecoration: "line-through", textDecorationColor: "rgba(176,58,46,0.5)", lineHeight: 1.5, ...T.small }}>{lv.before}</div>
              <div style={{ marginTop: 7, fontSize: 12.5, color: "#1A1D12", lineHeight: 1.55, flex: 1, ...T.small }}><b style={{ color: "#3E7A45" }}>{c.levers.nowLabel}</b> {lv.after}</div>
              <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 11, background: "#14170E", color: "#E9EFDC" }}>
                <span style={{ fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.06em", color: "#878B76" }}>{lv.from}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <span style={{ fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.06em", color: "#C6F035" }}>{lv.to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPOUNDING LOOP */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "92px 28px 20px" }}>
        <div data-reveal className="m-pad-band m-bleed" style={{ borderRadius: 32, background: "#0F120B", color: "#E9EFDC", padding: "52px 56px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>{MONO.loopKicker}</div>
            <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.5px", fontWeight: 800, color: "#FBFBF4", maxWidth: 620, ...T.h2b }}>{c.loop.h2}</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 30, flexWrap: "wrap" }}>
            {c.loop.steps.map((lp, i) => (
              <div key={MONO.loopNotes[i]} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ padding: "11px 16px", borderRadius: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(198,242,62,0.22)" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#FBFBF4", ...T.chip }}>{lp}</div>
                  <div style={{ fontFamily: MONOFONT, fontSize: 7.5, letterSpacing: "0.08em", color: "#8CBF33", marginTop: 2 }}>{MONO.loopNotes[i]}</div>
                </div>
                {i < c.loop.steps.length - 1 ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg> : null}
              </div>
            ))}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 99, border: "1px dashed rgba(198,242,62,0.45)", fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.1em", color: "#C6F035" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6M3 13a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 9" /></svg>{MONO.loopRepeat}
            </div>
          </div>
          <div className="m-stats2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 34, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
            {c.loop.stats.map(st => (
              <div key={st.l} style={{ padding: "16px 14px", borderRadius: 16, background: "rgba(198,240,53,0.08)", border: "1px solid rgba(198,240,53,0.22)", textAlign: "center" }}>
                <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: "-0.7px", color: "#C6F035" }}>{st.v}</div>
                <div style={{ fontSize: 10.5, color: "#A9AD98", marginTop: 3, lineHeight: 1.4, ...T.chip }}>{st.l}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 18, fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.12em", color: "#878B76" }}>{MONO.statsFoot}</div>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "70px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.03, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 740, ...T.ctaH2 }}>{c.cta.h2}</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />{c.cta.primary}
            </a>
            <a href={PROTO} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{c.cta.secondary}</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>{MONO.ctaStrip}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
