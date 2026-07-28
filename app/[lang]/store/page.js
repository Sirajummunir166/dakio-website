// The Complete Store — 1:1 port of "Dakio Complete Store.dc.html", localized.
// The foundation page: a Dakio store already includes everything and runs itself.

import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { REGISTER_URL } from "../../../lib/urls";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import storeEn, { MONO } from "../../../content/copy/store.en";
import storeBn from "../../../content/copy/store.bn";

const COPY = { en: storeEn, bn: storeBn };
const ROUTE = "/store";

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

export default async function CompleteStorePage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} active="store" ctaHref="#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div className="m-bleed-wrap m-hero-wrap" style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
        <div className="m-pad-hero m-bleed" style={{ position: "relative", borderRadius: 36, background: "#0F120B", color: "#E9EFDC", overflow: "hidden", padding: "76px 64px 70px" }}>
          <div style={{ position: "absolute", top: -220, right: -140, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(198,240,53,0.18), rgba(198,240,53,0))" }} />
          <div style={{ position: "relative", maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, border: "1px solid rgba(198,240,53,0.35)", fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#C6F035", animation: "heroUp .6s ease both" }}>{MONO.heroBadge}</div>
            <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 62, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, color: "#FBFBF4", animation: "heroUp .6s .08s ease both", ...T.h1 }}>{c.hero.h1}</h1>
            <p style={{ margin: "20px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#A9AD98", maxWidth: 470, animation: "heroUp .6s .16s ease both", ...T.lead }}>{c.hero.sub}</p>
            <div className="m-wrap" style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 26, animation: "heroUp .6s .24s ease both", fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.1em", color: "#878B76" }}>
              <span style={{ color: "#C6F035" }}>{MONO.heroStrip[0]}</span><span style={{ opacity: 0.4 }}>·</span><span>{MONO.heroStrip[1]}</span><span style={{ opacity: 0.4 }}>·</span><span>{MONO.heroStrip[2]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ONE ORDER, START TO FINISH */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "start" }} data-reveal>
          <div className="m-unstick" style={{ position: "sticky", top: 96 }}>
            <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.orderKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 48, lineHeight: 1.05, letterSpacing: "-1.9px", fontWeight: 800, ...T.h2 }}>
              {c.order.h2}
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.65, color: "#6B6D60", maxWidth: 360, ...T.body }}>{c.order.p}</p>
            <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 18px", borderRadius: 16, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }}>
              <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.1em", color: "#6B6D60" }}>{MONO.yourPart}</span>
              <span style={{ fontSize: 15, fontWeight: 800, ...T.label }}>{c.order.yourPartValue}</span>
            </div>
          </div>
          <div style={{ position: "relative", paddingLeft: 34 }}>
            <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 3, borderRadius: 99, backgroundImage: "linear-gradient(#C6F035 55%, rgba(198,240,53,0.15) 55%)", backgroundSize: "100% 44px", animation: "pipeFlow 1.6s linear infinite" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {c.order.stages.map((sg, i) => (
                <div key={MONO.stagePipes[i]} style={{ position: "relative", borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "16px 18px" }}>
                  <div style={{ position: "absolute", left: -30, top: 22, width: 11, height: 11, borderRadius: 99, background: "#C6F035", border: "2px solid #1A1D12" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: MONOFONT, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: "#3E7A45" }}>{MONO.stageTimes[i]}</span>
                    <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60", marginLeft: "auto" }}>{MONO.stagePipes[i]}</span>
                  </div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.2px", marginTop: 6, ...T.h3 }}>{sg.t}</div>
                  <div style={{ fontSize: 12.5, color: "#6B6D60", lineHeight: 1.55, marginTop: 4, ...T.small }}>{sg.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* THE UTILITIES */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 38 }} data-reveal>
          <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.utilsKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 48, lineHeight: 1.05, letterSpacing: "-1.9px", fontWeight: 800, maxWidth: 640, ...T.h2 }}>{c.utils.h2}</h2>
        </div>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {c.utils.items.map((u, i) => (
            <div key={u.mono} className="hv-up3-border18" style={{ borderRadius: 24, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 38, height: 38, borderRadius: 12, background: "#1A1D12", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONOFONT, fontSize: 11, fontWeight: 600 }}>{u.mono}</span>
                <span style={{ fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.1em", color: "#3E7A45", border: "1px solid rgba(62,122,69,0.35)", borderRadius: 99, padding: "3px 9px" }}>{MONO.utilVerbs[i]}</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 14, ...T.h3 }}>{u.n}</div>
              <div style={{ fontSize: 12.5, color: "#6B6D60", lineHeight: 1.6, marginTop: 5, ...T.small }}>{u.d}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {u.chips.map(ch => (
                  <span key={ch} style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10.5, fontWeight: 700, color: "#1A1D12", ...T.chip }}>{ch}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#6B6D60", ...T.small }}>{c.utils.note}</div>
      </div>

      {/* THE DIFFERENCE */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band m-gap m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: "52px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -60, bottom: -120, width: 420, height: 420, borderRadius: "50%", border: "1px dashed rgba(198,240,53,0.25)", animation: "orbitcw 60s linear infinite" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>{MONO.diffKicker}</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 40, lineHeight: 1.1, letterSpacing: "-1.5px", fontWeight: 800, color: "#FBFBF4", ...T.h2b }}>{c.diff.h2}</h2>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 9 }}>
            {c.diff.rows.map(v => (
              <div key={v.now} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 12, color: "#878B76", textDecoration: "line-through", ...T.small }}>{v.old}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#E9EFDC", marginTop: 4, ...T.chip }}>{v.now}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "70px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.03, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 720, ...T.ctaH2 }}>{c.cta.h2}</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />{c.cta.primary}
            </a>
            <a href={L("/nova")} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{c.cta.secondary}</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>{MONO.ctaStrip}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
