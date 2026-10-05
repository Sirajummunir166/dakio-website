// Themes — the showroom of Dakio storefront themes (DAKIO_THEMES_PLAN.md).
// The look follows the theme gallery the owner approved: an ink hero with the
// rounded foot, a two-up showroom of cards (laptop shot + overlapping phone
// shot, the theme's name in its own typeface), then one panel per idea.
// Each card opens the theme's own page, /themes/<key>.

import Link from "next/link";
import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { TRIAL_URL } from "../../../lib/urls";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import { THEMES, shot, wordmarkStyle } from "../../../lib/themes";
import { themeFontVars } from "../../../lib/themeFonts";
import themesEn, { MONO } from "../../../content/copy/themes.en";
import themesBn from "../../../content/copy/themes.bn";
import "../../themes.css";

const COPY = { en: themesEn, bn: themesBn };
const ROUTE = "/themes";
const MONOFONT = "var(--dk-font-mono), monospace";
const kicker = color => ({ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color });

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}

function Check({ color = "#3E7A45" }) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5" /></svg>
  );
}

export default async function ThemesPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);

  return (
    <div className={themeFontVars} style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} active="themes" ctaLabel={c.navCta} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO — ink, rounded foot, the eight names as the index */}
      <div style={{ padding: "0 12px" }}>
        <div style={{ maxWidth: 1240, margin: "12px auto 0", borderRadius: 36, background: "#1A1D12", color: "#F4F2EA", padding: "64px 40px 48px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 32, alignItems: "center", overflow: "hidden" }} className="m-pad-cta m-grid">
          <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", ...kicker("#A9AD98"), animation: "heroUp .6s ease both" }}>
            <span style={{ padding: "3px 10px", borderRadius: 99, background: "#C6F035", color: "#1A1D12" }}>{MONO.count}</span>
            <span>{MONO.kicker}</span>
          </div>
          <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 68, lineHeight: 1.0, letterSpacing: "-2.8px", fontWeight: 800, maxWidth: 860, color: "#FBFBF4", animation: "heroUp .6s .08s ease both", ...T.h1 }}>{c.hero.h1}</h1>
          <p style={{ margin: "20px 0 0", fontSize: 17, lineHeight: 1.6, color: "#A9AD98", maxWidth: 640, textWrap: "pretty", animation: "heroUp .6s .16s ease both", ...T.lead }}>{c.hero.sub}</p>
          <div className="m-wrap" style={{ display: "flex", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
            <a href="#themes" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#C6F035", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.hero.ctaPrimary}<Arrow /></a>
            <a href={TRIAL_URL} style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1.5px solid rgba(244,242,234,0.25)", color: "#F4F2EA", fontSize: 15, fontWeight: 700, ...T.label }}>{c.hero.ctaSecondary}</a>
          </div>
          <nav aria-label={MONO.kicker} style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 34, animation: "heroUp .6s .3s ease both" }}>
            {THEMES.map(t => (
              <Link key={t.key} href={L(`${ROUTE}/${t.key}`)} className="hv-up2" style={{ padding: "8px 15px", borderRadius: 99, border: "1px solid rgba(244,242,234,0.18)", color: "#F4F2EA", fontSize: t.wordmark.upper ? 13.5 : 17, lineHeight: 1.2, ...wordmarkStyle(t) }}>{t.name}</Link>
            ))}
          </nav>
          </div>
          {/* Three phones, fanned: the showroom in one glance */}
          <div className="m-hide" aria-hidden="true" style={{ position: "relative", height: 440, animation: "heroUp .7s .2s ease both" }}>
            {["lumira", "saril", "freshcart"].map((k, i) => (
              <img key={k} src={shot(k, "phone")} alt="" width={780} height={1688} style={{ position: "absolute", top: i === 1 ? 0 : 34, left: i * 104, width: 168, height: 364, objectFit: "cover", objectPosition: "top", borderRadius: 26, border: "6px solid #0B0D07", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.7)", transform: `rotate(${(i - 1) * 6}deg)`, zIndex: i === 1 ? 2 : 1 }} />
            ))}
          </div>
        </div>
      </div>

      {/* SHOWROOM — two up, laptop + phone, the name in its own typeface */}
      <div id="themes" style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 20px 20px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 720, marginBottom: 34 }} data-reveal>
          <h2 className="m-h2" style={{ margin: 0, fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, ...T.h2 }}>{c.showroom.h2}</h2>
          <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", ...T.body }}>{c.showroom.sub}</p>
        </div>
        <div className="th-grid">
          {THEMES.map(t => {
            const it = c.items[t.key];
            const page = L(`${ROUTE}/${t.key}`);
            return (
              <article key={t.key} id={t.key} className="th-card">
                <Link href={page} className="th-shot" aria-label={`${t.name} — ${c.card.look}`}>
                  <span className="th-frame">
                    <span className="th-bar" aria-hidden="true"><i /><i /><i /><span>{t.name}</span></span>
                    <img src={shot(t.key, "hero")} alt="" width={1440} height={900} loading={t.num <= "02" ? "eager" : "lazy"} />
                  </span>
                  <img className="th-phone" src={shot(t.key, "phone")} alt="" width={780} height={1688} loading="lazy" />
                </Link>
                <div style={{ padding: "22px 24px 26px", display: "grid", gap: 12, alignContent: "start" }}>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", ...kicker("#6B6D60") }}>
                    <span style={{ color: "#1A1D12" }}>{MONO.template} {t.num}</span>
                    <span style={T.chip}>{it.category}</span>
                  </div>
                  <h3 style={{ margin: 0, fontSize: t.wordmark.upper ? 28 : 34, lineHeight: 1.05, color: "#1A1D12", ...wordmarkStyle(t) }}>{t.name}</h3>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#4A4E3F", ...T.body }}>{it.line}</p>
                  <div style={{ display: "flex", gap: 6 }} aria-hidden="true">
                    {t.palette.map(h => <span key={h} style={{ width: 24, height: 24, borderRadius: 99, background: h, boxShadow: "inset 0 0 0 1px rgba(26,29,18,0.14)" }} />)}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: 12.5, color: "#6B6D60", fontVariantNumeric: "tabular-nums", ...T.small }}>
                    <span>{c.card.products(t.products)}</span><span>{c.card.categories(t.categories)}</span><span>{c.card.pages(t.pages.length)}</span>
                  </div>
                  <div className="m-wrap" style={{ display: "flex", gap: 10, marginTop: 4, alignItems: "center" }}>
                    <Link href={page} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 19px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 14, fontWeight: 700, ...T.label }}>{c.card.look}<Arrow size={13} /></Link>
                    {t.demo ? (
                      <a href={t.demo} target="_blank" rel="noopener" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "11px 18px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 14, fontWeight: 700, ...T.label }}>{c.card.demo} ↗</a>
                    ) : (
                      <span style={{ fontSize: 12.5, color: "#8B8E7E", ...T.small }}>{c.card.soon}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* INCLUDES — one green panel of what every theme already does */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "96px 20px 20px" }}>
        <div data-reveal className="m-grid" style={{ borderRadius: 32, background: "#E6EFC9", padding: 40, display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 36, alignItems: "center" }}>
          <div>
            <div style={kicker("#3A5212")}>{MONO.includesKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.5px", fontWeight: 800, ...T.h2 }}>{c.includes.h2}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "#4A5A2A", ...T.body }}>{c.includes.sub}</p>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {c.includes.items.map(x => (
              <div key={x} style={{ display: "flex", gap: 10, padding: "13px 16px", borderRadius: 16, background: "rgba(251,250,245,0.7)", fontSize: 14, fontWeight: 650, lineHeight: 1.5, ...T.chip }}><Check />{x}</div>
            ))}
          </div>
        </div>
      </div>

      {/* GOING LIVE — a numbered rail (the order is real) */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker("#3E7A45")}>{MONO.stepsKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, ...T.h2 }}>{c.steps.h2}</h2>
        </div>
        <div data-reveal>
          {c.steps.items.map((s, i) => (
            <div key={s.t} style={{ position: "relative", display: "flex", gap: 20, paddingBottom: i === c.steps.items.length - 1 ? 0 : 26 }}>
              {i < c.steps.items.length - 1 && <div style={{ position: "absolute", left: 21, top: 48, bottom: 4, width: 2, background: "repeating-linear-gradient(to bottom, rgba(62,122,69,0.45) 0 6px, transparent 6px 12px)" }} />}
              <span style={{ width: 44, height: 44, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: i === c.steps.items.length - 1 ? "#C6F035" : "#FBFAF5", border: "2px solid #3E7A45", fontWeight: 800, fontSize: 16 }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px", ...T.h3 }}>{s.t}</div>
                <div style={{ fontSize: 14, color: "#6B6D60", marginTop: 4, lineHeight: 1.6, ...T.small }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 34 }}>
          <Link href={L("/contact")} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontWeight: 750, color: "#3E7A45", ...T.label }}>{c.cta.secondary}<Arrow size={14} /></Link>
        </div>
      </div>

      {/* CTA */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "76px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.04, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 720, ...T.ctaH2 }}>{c.cta.h2}</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={TRIAL_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />{c.cta.primary}
            </a>
            <Link href={L("/contact")} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{c.cta.secondary}</Link>
          </div>
          <div style={{ position: "relative", marginTop: 20, ...kicker("rgba(26,29,18,0.6)"), fontSize: 9.5 }}>{MONO.ctaStrip}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
