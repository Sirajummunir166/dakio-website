// Home — the Dakio Themes band. One ink panel: the claim on the left, the way
// in on the right, and below it a slow belt of all eight storefronts, each
// named in its own typeface. The belt pauses on hover and stands still for
// reduced motion (app/themes.css).

import Link from "next/link";
import { THEMES, shot, wordmarkStyle } from "../../lib/themes";
import { themeFontVars } from "../../lib/themeFonts";
import themesEn, { MONO } from "../../content/copy/themes.en";
import themesBn from "../../content/copy/themes.bn";
import "../../app/themes.css";

const COPY = { en: themesEn, bn: themesBn };
const MONOFONT = "var(--dk-font-mono), monospace";

export default function ThemesBand({ lang, L, T }) {
  const c = COPY[lang] || COPY.en;
  const belt = [...THEMES, ...THEMES];
  return (
    <div className={themeFontVars} style={{ maxWidth: 1240, margin: "0 auto", padding: "110px 12px 20px" }}>
      <div data-reveal style={{ borderRadius: 36, background: "#0F120B", color: "#E9EFDC", padding: "56px 0 48px", overflow: "hidden", boxShadow: "0 40px 90px -40px rgba(15,18,11,0.6)" }}>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 32, alignItems: "end", padding: "0 44px" }}>
          <div>
            <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>{MONO.kicker} · 8</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, color: "#FBFBF4", ...T.h2b }}>{c.home.h2}</h2>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#A9AD98", ...T.body }}>{c.home.sub}</p>
            <Link href={L("/themes")} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, padding: "13px 22px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 14.5, fontWeight: 700, ...T.label }}>
              {c.home.cta}
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>

        <div className="th-belt" style={{ marginTop: 44 }}>
          <div className="th-belt-track">
            {belt.map((t, i) => (
              <Link key={`${t.key}-${i}`} href={L(`/themes/${t.key}`)} className="th-belt-item" aria-hidden={i >= THEMES.length ? "true" : undefined} tabIndex={i >= THEMES.length ? -1 : undefined}>
                <span className="th-frame">
                  <span className="th-bar" aria-hidden="true"><i /><i /><i /></span>
                  <img src={shot(t.key, "hero")} alt="" width={1440} height={900} loading="lazy" />
                </span>
                <span style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginTop: 14, padding: "0 2px" }}>
                  <span style={{ fontSize: t.wordmark.upper ? 17 : 22, lineHeight: 1.1, color: "#FBFBF4", ...wordmarkStyle(t) }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: "#878B76", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", ...T.chip }}>{c.items[t.key].category}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
