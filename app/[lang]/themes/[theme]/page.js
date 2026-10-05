// One theme — /themes/<key>. The screenshots on the left (laptop, phone,
// product page), the theme's facts in a sticky column on the right.

import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav, Footer } from "../../../../components/Chrome";
import LogoDefs from "../../../../components/Logo";
import ThemeShots from "../../../../components/themes/ThemeShots";
import { TRIAL_URL } from "../../../../lib/urls";
import { href, languageAlternates } from "../../../../lib/i18n";
import { type } from "../../../../lib/type";
import { THEMES, themeByKey, shot, wordmarkStyle } from "../../../../lib/themes";
import { themeFontVars } from "../../../../lib/themeFonts";
import themesEn, { MONO } from "../../../../content/copy/themes.en";
import themesBn from "../../../../content/copy/themes.bn";
import "../../../themes.css";

const COPY = { en: themesEn, bn: themesBn };
const MONOFONT = "var(--dk-font-mono), monospace";
const kicker = color => ({ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color });

export function generateStaticParams() {
  return THEMES.map(t => ({ theme: t.key }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { lang, theme } = await params;
  const t = themeByKey(theme);
  if (!t) return {};
  const c = COPY[lang] || COPY.en;
  const route = `/themes/${t.key}`;
  return {
    title: `${t.name} — ${c.items[t.key].category} · Dakio`,
    description: c.items[t.key].line,
    alternates: { canonical: href(lang, route), languages: languageAlternates(route) },
  };
}

function Arrow({ size = 15, back = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={back ? { transform: "rotate(180deg)" } : undefined}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}

function Block({ label, children }) {
  return (
    <section>
      <div style={{ ...kicker("#6B6D60"), marginBottom: 10 }}>{label}</div>
      {children}
    </section>
  );
}

export default async function ThemePage({ params }) {
  const { lang, theme } = await params;
  const t = themeByKey(theme);
  if (!t) notFound();
  const c = COPY[lang] || COPY.en;
  const it = c.items[t.key];
  const T = type(lang);
  const L = p => href(lang, p);
  const next = THEMES[(THEMES.indexOf(t) + 1) % THEMES.length];
  const srcFor = Object.fromEntries(t.shots.map(s => [s, shot(t.key, s)]));

  return (
    <div className={themeFontVars} style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <LogoDefs mkId="mk" wmId="wm" />
      <Nav lang={lang} route={`/themes/${t.key}`} active="themes" ctaLabel={c.navCta} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HEAD — back, the name in its own typeface, the line, the demo */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "40px 20px 0" }}>
        <Link href={L("/themes")} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: "#3E7A45", ...T.label }}><Arrow size={13} back />{c.detail.back}</Link>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 24, alignItems: "end", marginTop: 22 }}>
          <div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", ...kicker("#6B6D60") }}>
              <span style={{ color: "#1A1D12" }}>{MONO.template} {t.num}</span><span style={T.chip}>{it.category}</span>
            </div>
            <h1 style={{ margin: "14px 0 0", fontSize: t.wordmark.upper ? 52 : 64, lineHeight: 1, color: "#1A1D12", ...wordmarkStyle(t) }}>{t.name}</h1>
            <p style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#4A4E3F", maxWidth: 680, ...T.lead }}>{it.line}</p>
          </div>
          <div className="m-wrap" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {t.demo ? (
              <a href={t.demo} target="_blank" rel="noopener" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700, ...T.label }}>{c.card.demo} ↗</a>
            ) : (
              <span style={{ padding: "12px 18px", borderRadius: 99, background: "#E5E7DE", fontSize: 13.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.card.soon}</span>
            )}
            <a href={TRIAL_URL} className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "14px 22px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.cta.primary}</a>
          </div>
        </div>
        {t.demo && <p style={{ margin: "12px 0 0", fontSize: 12.5, color: "#8B8E7E", ...T.small }}>{c.detail.demoNote}</p>}
      </div>

      {/* BODY — screenshots left, facts right */}
      <div className="th-detail" style={{ maxWidth: 1240, margin: "0 auto", padding: "32px 20px 20px" }}>
        <ThemeShots name={t.name} shots={t.shots} tabs={c.detail.tabs} captions={c.detail.captions} srcFor={srcFor} />

        <aside className="th-side" style={{ borderRadius: 24, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 22 }}>
          <Block label={MONO.colours}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
              {t.palette.map(h => (
                <div key={h} style={{ display: "grid", gap: 6 }}>
                  <span style={{ height: 40, borderRadius: 10, background: h, boxShadow: "inset 0 0 0 1px rgba(26,29,18,0.14)" }} />
                  <code style={{ fontFamily: MONOFONT, fontSize: 11, color: "#6B6D60" }}>{h}</code>
                </div>
              ))}
            </div>
          </Block>
          <Block label={MONO.type}>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#4A4E3F", ...T.body }}>{c.detail.typeLine(t.fonts.display, t.fonts.body)} {c.detail.accent(t.fonts.accent)}</p>
          </Block>
          <Block label={MONO.sections}>
            <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 5, fontSize: 13.5, lineHeight: 1.5, color: "#4A4E3F", ...T.small }}>
              {it.sections.map(s => <li key={s}>{s}</li>)}
            </ol>
          </Block>
          <Block label={MONO.pages}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {t.pages.map(p => <code key={p} style={{ fontFamily: MONOFONT, fontSize: 11.5, padding: "3px 8px", borderRadius: 7, background: "#EEF0E6", color: "#4A4E3F" }}>{p}</code>)}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "#6B6D60", ...T.small }}>{c.detail.stats(t.products, t.categories)}</p>
          </Block>
        </aside>
      </div>

      {/* NEXT — the next theme, so the showroom reads like a walk */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "56px 20px 80px" }}>
        <Link href={L(`/themes/${next.key}`)} className="th-shot m-grid" style={{ borderRadius: 28, border: 0, display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)", gap: 28, alignItems: "end", padding: "28px 28px 0" }}>
          <div style={{ paddingBottom: 28 }}>
            <div style={kicker("#3E7A45")}>{c.detail.next}</div>
            <div style={{ marginTop: 10, fontSize: next.wordmark.upper ? 30 : 38, lineHeight: 1.05, color: "#1A1D12", ...wordmarkStyle(next) }}>{next.name}</div>
            <div style={{ marginTop: 8, fontSize: 14, color: "#6B6D60", ...T.small }}>{c.items[next.key].category}</div>
          </div>
          <span className="th-frame"><img src={shot(next.key, "hero")} alt="" width={1440} height={900} loading="lazy" /></span>
        </Link>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
