// Home — 1:1 port of "Dakio Home.dc.html", localized.
// Copy lives in content/copy/home.<lang>.js; the layout below never changes
// between locales, only the strings and the type deltas from lib/type.js.

import Link from "next/link";
import { Fragment } from "react";
import HomeTop from "../../components/home/HomeTop";
import { Footer } from "../../components/Chrome";
import Reveal from "../../components/Reveal";
import LogoDefs from "../../components/Logo";
import PageJsonLd from "../../components/PageJsonLd";
import { REGISTER_URL } from "../../lib/urls";
import { href, languageAlternates } from "../../lib/i18n";
import { type } from "../../lib/type";
import homeEn, { MONO, MARQUEE } from "../../content/copy/home.en";
import homeBn from "../../content/copy/home.bn";
import { getHomePricing, getJsonLdOffers } from "../../lib/plans";

const COPY = { en: homeEn, bn: homeBn };

// The pricing strip and the JSON-LD offers read live prices from the API (see
// lib/plans.js), so this page revalidates instead of being frozen at build time:
// a founder changing a price in the admin app must not need a deploy for the
// front page of the site to agree with the till.
export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, "/"), languages: languageAlternates("/") },
  };
}

const MONOFONT = "var(--dk-font-mono), monospace";
const BN = "var(--dk-font-bn), sans-serif";

// The marquee runs the partner list twice so the loop has no seam.
const MARQUEE_LOOP = [...MARQUEE, ...MARQUEE];

// Radial org chart. Each spoke: chip anchor (% of container) plus the start/end
// trim of its dashed line. The svg is preserveAspectRatio="none", so a single
// trim ratio would render wildly different gaps per direction — these are
// pre-solved per spoke to leave an even ~14px gap at both the hub and the chip.
const RADIAL_SPOKES = [
  { pos: [24, 19], trim: [0.310, 0.779] },
  { pos: [50, 7], trim: [0.244, 0.802] },
  { pos: [76, 19], trim: [0.310, 0.779] },
  { pos: [16, 37], trim: [0.416, 0.635] },
  { pos: [84, 37], trim: [0.416, 0.635] },
  { pos: [16, 67], trim: [0.416, 0.655] },
  { pos: [84, 67], trim: [0.416, 0.655] },
  { pos: [29, 89], trim: [0.260, 0.809] },
  { pos: [71, 89], trim: [0.260, 0.809] },
];

const LAUNCH_SHAPE = [
  { i: "01", kind: "name", arrow: true },
  { i: "02", kind: "products", arrow: true },
  { i: "03", kind: "live", arrow: false },
];

function Arrow({ size = 14, sw = 2.4, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const kicker = { fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" };
const monoTile = { width: 38, height: 38, borderRadius: 12, background: "#14170E", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONOFONT, fontSize: 11, fontWeight: 600, flexShrink: 0 };

export default async function Home({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);

  // Live catalogue for the pricing strip and the structured data. Both fall back
  // to the committed copy if the API is unreachable — see lib/plans.js.
  const [pricing, offers] = await Promise.all([getHomePricing(lang), getJsonLdOffers(lang)]);

  // The CEO Office is the hub, the rest ring it — sliced to the spoke count so a
  // copy edit can never index past RADIAL_SPOKES.
  const departments = c.org.depts.slice(0, RADIAL_SPOKES.length);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/" lang={lang} offers={offers} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <HomeTop lang={lang} copy={c.hero} />

      {/* ================= PARTNER MARQUEE ================= */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 28px 0" }}>
        <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(26,29,18,0.08)", display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#6B6D60", whiteSpace: "nowrap", flexShrink: 0, ...T.label }}>{c.marquee.worksWith}</span>
          <div style={{ flex: 1, overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
            <div style={{ display: "flex", gap: 44, width: "max-content", animation: "marquee 22s linear infinite" }}>
              {MARQUEE_LOOP.map((label, i) => (
                <span key={i} style={{ fontSize: 15, fontWeight: 600, color: "#6B6D60", whiteSpace: "nowrap" }}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= CHOOSE YOUR PATH ================= */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 28px 0" }}>
        <div data-reveal className="m-paths" style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr", gap: 14, alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 14 }}>
            <div style={{ fontFamily: MONOFONT, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>{MONO.pathsKicker}</div>
            <div className="m-paths-h" style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.6px", marginTop: 6, whiteSpace: "nowrap", ...T.h3 }}>{c.paths.h2}</div>
          </div>
          <a href="#launch" className="hv-up3-border-ink" style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 24px", borderRadius: 20, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: MONOFONT, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45" }}>{MONO.pathsFresh}</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 5, ...T.h3 }}>{c.paths.fresh.t}</div>
              <div style={{ fontSize: 12.5, color: "#6B6D60", lineHeight: 1.5, marginTop: 4, ...T.small }}>{c.paths.fresh.d}</div>
            </div>
            <span className="m-paths-cta" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", borderBottom: "2px solid #C6F035", paddingBottom: 2, ...T.label }}>
              {c.paths.fresh.cta} <Arrow size={13} />
            </span>
          </a>
          <a href="#switch" className="hv-up3" style={{ display: "flex", alignItems: "center", gap: 18, padding: "22px 24px", borderRadius: 20, background: "#0F120B", color: "#E9EFDC" }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: MONOFONT, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.12em", color: "#8CBF33" }}>{MONO.pathsSelling}</div>
              <div style={{ fontSize: 16.5, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 5, color: "#FBFBF4", ...T.h3 }}>{c.paths.selling.t}</div>
              <div style={{ fontSize: 12.5, color: "#A9AD98", lineHeight: 1.5, marginTop: 4, ...T.small }}>{c.paths.selling.d}</div>
            </div>
            <span className="m-paths-cta" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", color: "#C6F035", borderBottom: "2px solid rgba(198,240,53,0.5)", paddingBottom: 2, ...T.label }}>
              {c.paths.selling.cta} <Arrow size={13} />
            </span>
          </a>
        </div>
      </div>

      {/* ================= LAUNCH IN MINUTES ================= */}
      <div id="launch" style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 8px" }}>
        <div style={{ textAlign: "center" }} data-reveal>
          <div style={kicker}>{MONO.launchKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 660, ...T.h2 }}>
            {c.launch.h2}
          </h2>
        </div>
        <div data-reveal className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 38 }}>
          {LAUNCH_SHAPE.map((ls, i) => {
            const step = c.launch.steps[i];
            return (
              <div key={ls.i} style={{ position: "relative", borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: MONOFONT, fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#6B6D60" }}>{MONO.launchStep} {ls.i}</span>
                  <span style={{ fontFamily: MONOFONT, fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", color: "#3E7A45" }}>{step.time}</span>
                </div>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", marginTop: 10, ...T.h3 }}>{step.t}</div>
                <div style={{ marginTop: 14 }}>
                  {ls.kind === "name" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", borderRadius: 12, background: "#ffffff", border: "1.5px solid #1A1D12" }}>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{c.launch.name.handle}</span>
                        <span style={{ width: 2, height: 16, background: "#C6F035", animation: "pulseRing 1.4s infinite" }} />
                        <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.1em", color: "#3E7A45" }}>{MONO.launchAvailable}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 12, background: "#EEEBDF" }}>
                        <span style={{ fontFamily: MONOFONT, fontSize: 10.5, fontWeight: 600, color: "#1A1D12" }}>{c.launch.name.domain}</span>
                        <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: "#6B6D60", ...T.chip }}>{c.launch.name.yours}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#6B6D60", lineHeight: 1.55, ...T.small }}>{c.launch.name.note}</div>
                    </div>
                  ) : null}
                  {ls.kind === "products" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(26,29,18,0.08)" }}>
                        <span style={{ width: 26, height: 26, borderRadius: 8, background: "#8C2F1B", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 700, ...T.chip }}>{c.launch.products.a.n}</span>
                        <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 9, color: "#3E7A45" }}>{c.launch.products.a.p}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(26,29,18,0.08)" }}>
                        <span style={{ width: 26, height: 26, borderRadius: 8, background: "#1F6E63", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 700, ...T.chip }}>{c.launch.products.b.n}</span>
                        <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 9, color: "#3E7A45" }}>{c.launch.products.b.p}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12, border: "1.5px dashed rgba(26,29,18,0.18)", fontSize: 11, fontWeight: 700, color: "#6B6D60", ...T.chip }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>{c.launch.products.enough}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12, background: "rgba(198,240,53,0.16)", border: "1px solid rgba(198,240,53,0.5)", fontSize: 11, fontWeight: 700, ...T.chip }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M21 3l-7 7M8 3H3v18h18v-5" /></svg>{c.launch.products.supplier}
                      </div>
                    </div>
                  ) : null}
                  {ls.kind === "live" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderRadius: 99, background: "#0F120B" }}>
                        <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite", flexShrink: 0 }} />
                        <span style={{ fontFamily: MONOFONT, fontSize: 11, fontWeight: 600, color: "#C6F035" }}>{c.launch.live.domain}</span>
                        <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.1em", color: "#8CBF33" }}>{MONO.launchLive}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#6B6D60", lineHeight: 1.55, ...T.small }}>{c.launch.live.note}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 12, background: "rgba(198,240,53,0.16)", border: "1px solid rgba(198,240,53,0.5)" }}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", flexShrink: 0 }} />
                        <span style={{ fontSize: 11.5, fontWeight: 700, ...T.chip }}>{c.launch.live.ceo}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
                {ls.arrow ? (
                  <div className="m-hide" style={{ position: "absolute", right: -14, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 26, height: 26, borderRadius: 99, background: "#1A1D12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#6B6D60", ...T.small }}>
          {c.launch.foot}{" "}
          <Link href={L("/store")} style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>{c.launch.footLink}</Link>
        </div>
      </div>

      {/* ================= MORNING BRIEF ================= */}
      <div id="nova" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "center" }} data-reveal>
          <div>
            <div style={kicker}>{MONO.briefKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, ...T.h2 }}>
              {c.brief.h2}
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", maxWidth: 380, ...T.body }}>
              {c.brief.p}
            </p>
            <a href="/prototypes/Nova HQ Prototype v7.dc.html" className="hv-gap12" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, fontSize: 14, fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 3, ...T.label }}>
              {c.brief.link} <Arrow />
            </a>
          </div>
          <div style={{ borderRadius: 28, background: "#0F120B", padding: 28, color: "#E9EFDC", boxShadow: "0 34px 80px rgba(15,18,11,0.35)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
                <span style={{ fontFamily: MONOFONT, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.16em", color: "#8CBF33" }}>{MONO.briefBadge}</span>
              </div>
              <span className="hv-bg-lime24" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 99, background: "rgba(198,242,62,0.14)", color: "#C6F035", fontSize: 11, fontWeight: 700, cursor: "pointer", ...T.chip }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
                {c.brief.hearCall}
              </span>
            </div>
            <div className="m-tiles" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, marginTop: 20 }}>
              {c.brief.tiles.map(bt => (
                <div key={bt.l} style={{ padding: "14px 14px 12px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", color: "#FBFBF4" }}>{bt.v}</div>
                  <div style={{ fontSize: 10.5, color: "#A9AD98", marginTop: 3, ...T.chip }}>{bt.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 14, background: "rgba(198,242,62,0.08)", border: "1px solid rgba(198,242,62,0.2)", display: "flex", gap: 11, alignItems: "flex-start" }}>
              <span style={{ marginTop: 5, width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0, animation: "pulseRing 2.2s infinite" }} />
              <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#E9EFDC", ...T.small }}>
                {c.brief.focus}
                <span style={{ fontFamily: MONOFONT, fontSize: 9, letterSpacing: "0.08em", color: "#8CBF33" }}>{MONO.briefApprove}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ORG / TEAM — radial: CEO at the hub, departments around ================= */}
      <div className="m-org-section" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px", textAlign: "center" }}>
        <div data-reveal>
          <div style={kicker}>{MONO.orgKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640, ...T.h2 }}>{c.org.h2}</h2>
          <div className="m-org-stats" style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 34, marginTop: 26 }}>
            {c.org.stats.map((s, i) => (
              <Fragment key={s.l}>
                {i > 0 ? <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} /> : null}
                <div>
                  <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>{s.v}</span>
                  <div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2, ...T.chip }}>{s.l}</div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div data-reveal className="org-radial" style={{ position: "relative", maxWidth: 760, height: 400, margin: "22px auto 0" }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
            {RADIAL_SPOKES.map(({ pos: [x, y], trim: [t0, t1] }, i) => {
              const at = t => [50 + (x - 50) * t, 50 + (y - 50) * t];
              const [x1, y1] = at(t0);
              const [x2, y2] = at(t1);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(26,29,18,0.25)" strokeWidth="1" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />;
            })}
          </svg>
          {departments.map((d, i) => {
            const [x, y] = RADIAL_SPOKES[i].pos;
            return (
              <div key={d.n} className="org-radial-chip" style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)", whiteSpace: "nowrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", border: "1px solid rgba(26,29,18,0.25)" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 700, ...T.label }}>{d.n}</span>
                </span>
                <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.06em", color: "#6B6D60" }}>{d.j}</span>
              </div>
            );
          })}
          <div className="org-radial-ceo" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "16px 28px", borderRadius: 18, background: "#1A1D12", color: "#F0EFE6", boxShadow: "0 18px 44px rgba(15,18,11,0.25)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 12, height: 12, borderRadius: 99, background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#FBFBF4", ...T.label }}>{c.org.ceo}</span>
            </span>
            <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#C6F035" }}>{MONO.orgCeoJob}</span>
          </div>
        </div>
        <div data-reveal style={{ marginTop: 18, fontSize: 13, color: "#6B6D60", ...T.small }}>{c.org.note}</div>
      </div>

      {/* ================= THE ROOMS ================= */}
      <div id="rooms" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker}>{MONO.roomsKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 620, ...T.h2 }}>{c.rooms.h2}</h2>
        </div>
        <div className="m-rooms" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {/* Nova HQ (big) */}
          <a href="/prototypes/Nova HQ Prototype v7.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 3", display: "block", borderRadius: 28, background: "#0F120B", color: "#E9EFDC", padding: 28, overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ ...monoTile, background: "#C6F035", color: "#0F120B" }}>HQ</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", color: "#FBFBF4", ...T.h3 }}>{c.rooms.hq.n}</div>
                <div style={{ fontSize: 12.5, color: "#A9AD98", marginTop: 1, ...T.chip }}>{c.rooms.hq.d}</div>
              </div>
              <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#8CBF33" }}>{MONO.roomsOpen}</span>
            </div>
            <div style={{ marginTop: 20, borderRadius: 16, background: "#14170E", border: "1px solid rgba(198,242,62,0.18)", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.14em", color: "#E3B54A" }}>{MONO.roomsDecision}</span>
                <span style={{ fontFamily: MONOFONT, fontSize: 8.5, color: "#8CBF33" }}>{MONO.roomsDecisionEst}</span>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 8, color: "#FBFBF4", ...T.chip }}>{c.rooms.hq.decision}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <span style={{ padding: "7px 16px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 11.5, fontWeight: 700, ...T.chip }}>{c.rooms.hq.approve}</span>
                <span style={{ padding: "7px 14px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.2)", fontSize: 11.5, fontWeight: 600, color: "#A9AD98", ...T.chip }}>{c.rooms.hq.later}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 12 }}>
              {c.rooms.hq.feed.map(f => (
                <div key={f.at} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#A9AD98", ...T.chip }}>
                  <span style={{ width: 5, height: 5, borderRadius: 99, background: "#8CBF33" }} />{f.t}
                  <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 8, color: "#878B76" }}>{f.at}</span>
                </div>
              ))}
            </div>
          </a>
          {/* Store Studio (big) */}
          <a href="/prototypes/Dakio Store Studio.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 3", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 28, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>SS</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{c.rooms.studio.n}</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1, ...T.chip }}>{c.rooms.studio.d}</div>
              </div>
              <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>{MONO.roomsOpen}</span>
            </div>
            <div style={{ marginTop: 20, borderRadius: 16, border: "1px solid rgba(26,29,18,0.1)", overflow: "hidden", background: "#F6EFE3" }}>
              <div style={{ height: 26, background: "#FFFDF8", borderBottom: "1px solid rgba(26,29,18,0.07)", display: "flex", alignItems: "center", gap: 5, padding: "0 12px" }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: "rgba(26,29,18,0.2)" }} /><span style={{ width: 6, height: 6, borderRadius: 99, background: "rgba(26,29,18,0.12)" }} />
                <span style={{ marginLeft: 8, fontSize: 8.5, fontWeight: 700, color: "#3A2418" }}>{c.rooms.studio.previewDomain}</span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ height: 58, borderRadius: 10, background: "#3A2418", display: "flex", alignItems: "center", padding: "0 16px" }}><span style={{ fontSize: 14, fontWeight: 700, color: "#F6EFE3", fontFamily: "Georgia,serif" }}>{c.rooms.studio.previewHeadline}</span></div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, height: 44, borderRadius: 8, background: "#FFFDF8", border: "1px solid rgba(26,29,18,0.08)" }} />
                  <div style={{ flex: 1, height: 44, borderRadius: 8, background: "#FFFDF8", border: "1px solid rgba(26,29,18,0.08)" }} />
                  <div style={{ flex: 1, height: 44, borderRadius: 8, background: "#FFFDF8", border: "1px solid rgba(26,29,18,0.08)" }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#6B6D60" }}>{c.rooms.studio.themes}</span>
              {["#8C2F1B", "#C6F035", "#1F6E63", "#171420"].map(sw => (
                <span key={sw} style={{ width: 16, height: 16, borderRadius: 99, background: sw, border: "2px solid #fff", boxShadow: "0 0 0 1px rgba(26,29,18,0.15)" }} />
              ))}
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#6B6D60", marginLeft: 4, ...T.chip }}>{c.rooms.studio.themesNote}</span>
            </div>
          </a>
          {/* Front Office */}
          <a href="/prototypes/Nova Inbox - Front Office.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 2", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>FO</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{c.rooms.frontOffice.n}</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1, ...T.chip }}>{c.rooms.frontOffice.d}</div>
              </div>
              <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>{MONO.roomsOpen}</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
              <span title="Messenger" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="#1A1D12"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1.1 12.5L10.5 11.7l-4.9 2.8 5.4-5.7 2.6 2.7 4.8-2.7-5.3 5.7z" /></svg></span>
              <span title="Instagram" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="0.8" fill="#1A1D12" stroke="none" /></svg></span>
              <span title="WhatsApp" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1121 11.5z" /><path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5-2-1-1 .5c-.8-.5-1.5-1.2-2-2l.5-1-1-2z" fill="#1A1D12" stroke="none" /></svg></span>
              <span title="Email" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="M3 6.5l9 6.5 9-6.5" /></svg></span>
              <span style={{ alignSelf: "center", marginLeft: 4, fontFamily: MONOFONT, fontSize: 7.5, letterSpacing: "0.08em", color: "#6B6D60" }}>{MONO.roomsChannels}</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
              {c.rooms.frontOffice.chat.map((m, i) =>
                m.from === "customer" ? (
                  <div key={i} style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "8px 12px", borderRadius: "12px 12px 12px 3px", background: "#EEEBDF", fontSize: 11.5, ...T.chip }}>{m.t}</div>
                ) : (
                  <div key={i} style={{ alignSelf: "flex-end", maxWidth: "88%", padding: "8px 12px", borderRadius: "12px 12px 3px 12px", background: "#1A1D12", color: "#F0EFE6", fontSize: 11.5, ...T.chip }}>
                    {m.t} <span style={{ fontFamily: MONOFONT, fontSize: 7.5, color: "#8CBF33" }}>{c.rooms.frontOffice.byNova}</span>
                  </div>
                )
              )}
              <div style={{ alignSelf: "center", marginTop: 3, padding: "6px 12px", borderRadius: 99, background: "rgba(62,122,69,0.12)", color: "#2c5c31", fontSize: 10, fontWeight: 700 }}>{MONO.roomsOrder}</div>
            </div>
          </a>
          {/* Grow Modules */}
          <a href="/prototypes/Dakio Grow Modules.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 2", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>GL</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{c.rooms.grow.n}</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1, ...T.chip }}>{c.rooms.grow.d}</div>
              </div>
              <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>{MONO.roomsOpen}</span>
            </div>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              {c.rooms.grow.levers.map(g => (
                <div key={g.j} style={{ padding: "9px 12px", borderRadius: 11, background: "rgba(26,29,18,0.92)", color: "#F0EFE6" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, ...T.chip }}>{g.n}</div>
                  <div style={{ fontFamily: MONOFONT, fontSize: 7.5, letterSpacing: "0.1em", color: "#C6F035", marginTop: 2 }}>{g.j}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "13px 15px", borderRadius: 13, background: "#14170E", color: "#E9EFDC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", flexShrink: 0 }} />
                <span style={{ fontFamily: MONOFONT, fontSize: 7.5, letterSpacing: "0.12em", color: "#8CBF33" }}>{MONO.roomsGrowNova}</span>
              </div>
              <div style={{ fontSize: 12, marginTop: 7, lineHeight: 1.5, ...T.small }}>{c.rooms.grow.novaLine}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                <span style={{ padding: "6px 14px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 10.5, fontWeight: 700, cursor: "pointer", ...T.chip }}>{c.rooms.grow.review}</span>
                <span style={{ padding: "6px 12px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.25)", color: "#A9AD98", fontSize: 10.5, fontWeight: 600, cursor: "pointer", ...T.chip }}>{c.rooms.grow.dismiss}</span>
                <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 7, letterSpacing: "0.08em", color: "#8CBF33" }}>{MONO.roomsGrowRecovered}</span>
              </div>
            </div>
          </a>
          {/* Ads Content Gallery */}
          <a href="/prototypes/Dakio Nova Motion Ads.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 2", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>AD</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{c.rooms.ads.n}</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1, ...T.chip }}>{c.rooms.ads.d}</div>
              </div>
              <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>{MONO.roomsOpen}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px 5px 5px", borderRadius: 99, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)" }}>
                <span style={{ width: 22, height: 22, borderRadius: 99, background: "linear-gradient(140deg, #8C2F1B, #D9A62E)", border: "1px solid rgba(26,29,18,0.15)" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, ...T.chip }}>{c.rooms.ads.product}</span>
              </span>
              <Arrow size={14} sw={2.2} style={{ flexShrink: 0, color: "#6B6D60" }} />
              <span style={{ padding: "4px 10px", borderRadius: 99, background: "#C6F035", fontFamily: MONOFONT, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.1em", color: "#0F120B" }}>{MONO.roomsAdsClick}</span>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div style={{ flex: 1, aspectRatio: "1/1", borderRadius: 10, background: "linear-gradient(160deg, #3A2418, #8C2F1B)", position: "relative", overflow: "hidden" }}><span style={{ position: "absolute", left: 8, bottom: 7, fontSize: 8, fontWeight: 800, color: "#FFF1EA" }}>{c.rooms.ads.creatives[0]}</span><span style={{ position: "absolute", top: 7, right: 7, fontFamily: MONOFONT, fontSize: 6.5, color: "#FFF1EA", opacity: 0.7 }}>1:1</span></div>
              <div style={{ flex: 1, aspectRatio: "4/5", borderRadius: 10, background: "linear-gradient(160deg, #1F2A16, #4C7A3F)", position: "relative", overflow: "hidden" }}><span style={{ position: "absolute", left: 8, bottom: 7, fontSize: 8, fontWeight: 800, color: "#F2F6E9" }}>{c.rooms.ads.creatives[1]}</span><span style={{ position: "absolute", top: 7, right: 7, fontFamily: MONOFONT, fontSize: 6.5, color: "#F2F6E9", opacity: 0.7 }}>4:5</span></div>
              <div style={{ flex: 1, aspectRatio: "9/16", borderRadius: 10, background: "linear-gradient(170deg, #171420, #3A4C8C)", position: "relative", overflow: "hidden" }}>
                <span style={{ position: "absolute", top: 7, right: 7, fontFamily: MONOFONT, fontSize: 6.5, color: "#EDF0FC", opacity: 0.7 }}>9:16</span>
                <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: 99, background: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 24 24" fill="#0F120B"><path d="M8 5l12 7-12 7z" /></svg></span>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 7, fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.1em", color: "#3E7A45" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{MONO.roomsAdsCheck}</div>
          </a>
          {/* Dropshipping */}
          <a href="/prototypes/Dakio Supplier Dashboard.dc.html" data-reveal className="hv-up3 m-wrap" style={{ gridColumn: "span 6", display: "flex", alignItems: "center", gap: 28, borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "24px 28px" }}>
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>SN</span>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{c.rooms.supplier.n}</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1, maxWidth: 280, ...T.chip }}>{c.rooms.supplier.d}</div>
              </div>
            </div>
            <div className="m-wrap" style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              {c.rooms.supplier.flow.map((sf, i) => (
                <div key={sf.j} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{ flex: 1, padding: "12px 14px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(26,29,18,0.08)", textAlign: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", ...T.chip }}>{sf.n}</div>
                    <div style={{ fontFamily: MONOFONT, fontSize: 7.5, letterSpacing: "0.08em", color: "#6B6D60", marginTop: 2, whiteSpace: "nowrap" }}>{sf.j}</div>
                  </div>
                  {i < c.rooms.supplier.flow.length - 1 ? <Arrow size={14} sw={2.2} style={{ flexShrink: 0, color: "#6B6D60" }} /> : null}
                </div>
              ))}
            </div>
          </a>
        </div>
      </div>

      {/* ================= TRUST ================= */}
      <div id="trust" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker}>{MONO.trustKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640, ...T.h2 }}>{c.trust.h2}</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px", ...T.h3 }}>{c.trust.receipt.title}</div>
            <div style={{ marginTop: 16, borderRadius: 14, background: "#ffffff", border: "1px solid rgba(26,29,18,0.09)", padding: 16 }}>
              <div style={{ fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.12em", color: "#6B6D60" }}>{MONO.trustReceiptNo}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 7, ...T.chip }}>{c.trust.receipt.action}</div>
              <div style={{ fontSize: 11.5, color: "#6B6D60", marginTop: 5, lineHeight: 1.55, ...T.small }}>{c.trust.receipt.evidence}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <span style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10, fontWeight: 700, color: "#6B6D60" }}>{c.trust.receipt.before}</span>
                <span style={{ padding: "5px 11px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 10, fontWeight: 700 }}>{c.trust.receipt.after}</span>
              </div>
              <span className="hv-ink-lime" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "7px 14px", borderRadius: 99, border: "1.5px solid #1A1D12", fontSize: 11, fontWeight: 700, cursor: "pointer", ...T.chip }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6M3 13a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 9" /></svg>{c.trust.receipt.undo}
              </span>
            </div>
          </div>
          <div style={{ borderRadius: 26, background: "#0F120B", color: "#E9EFDC", padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px", color: "#FBFBF4", ...T.h3 }}>{c.trust.limits.title}</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
              {c.trust.limits.rows.map(r => (
                <div key={r.l} style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#A9AD98", ...T.chip }}>{r.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#C6F035" }}>{r.v}</span>
                </div>
              ))}
              <div style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 12, color: "#A9AD98", ...T.chip }}>{c.trust.limits.noTouch}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  {MONO.trustNoTouch.map(t => (
                    <span key={t} style={{ padding: "4px 10px", borderRadius: 99, border: "1px dashed rgba(198,242,62,0.5)", fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.08em", color: "#C6F035" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#878B76", lineHeight: 1.55, marginTop: 4, ...T.small }}>{c.trust.limits.note}</div>
            </div>
          </div>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px", ...T.h3 }}>{c.trust.ladder.title}</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 7 }}>
              {c.trust.ladder.levels.map(lv => (
                <div key={lv.l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 12, ...(lv.on ? { background: "#1A1D12", color: "#F0EFE6" } : lv.lime ? { background: "rgba(198,240,53,0.35)", border: "1px dashed rgba(26,29,18,0.3)" } : { background: "#ffffff", border: "1px solid rgba(26,29,18,0.08)" }) }}>
                  <span style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 6, ...(lv.on ? { background: "#C6F035", color: "#0F120B" } : { background: "rgba(26,29,18,0.08)", color: "#1A1D12" }) }}>{lv.l}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, ...T.chip }}>{lv.n}</span>
                  <span style={{ marginLeft: "auto", fontFamily: MONOFONT, fontSize: 8, letterSpacing: "0.08em", color: "#6B6D60" }}>{lv.note}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#6B6D60", lineHeight: 1.55, marginTop: 12, ...T.small }}>{c.trust.ladder.note}</div>
          </div>
        </div>
      </div>

      {/* ================= BANGLADESH ================= */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band m-gap m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", right: -60, top: -80, fontSize: 340, fontWeight: 800, color: "rgba(198,240,53,0.07)", lineHeight: 1, fontFamily: BN }}>৳</div>
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>{MONO.bdKicker}</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 44, lineHeight: 1.08, letterSpacing: "-1.6px", fontWeight: 800, color: "#FBFBF4", ...T.h2b }}>{c.bd.h2}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#A9AD98", maxWidth: 380, ...T.body }}>{c.bd.p}</p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {c.bd.chips.map(t => (
                <span key={t} style={{ padding: "9px 16px", borderRadius: 99, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 13, fontWeight: 700, color: "#F0EFE6", ...T.chip }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 8, padding: "16px 18px", borderRadius: 16, background: "rgba(198,240,53,0.09)", border: "1px solid rgba(198,240,53,0.25)" }}>
              <div style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.12em", color: "#8CBF33" }}>{MONO.bdSeason}</div>
              <div style={{ display: "flex", gap: 7, marginTop: 10, flexWrap: "wrap" }}>
                {MONO.bdSeasons.map((s, i) =>
                  i === 0 ? (
                    <span key={s} style={{ padding: "6px 13px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 11, fontWeight: 800 }}>{s}</span>
                  ) : (
                    <span key={s} style={{ padding: "6px 13px", borderRadius: 99, border: "1px solid rgba(198,242,62,0.4)", color: "#C6F035", fontSize: 11, fontWeight: 700 }}>{s}</span>
                  )
                )}
              </div>
              <div style={{ fontSize: 11.5, color: "#A9AD98", marginTop: 10, lineHeight: 1.55, ...T.small }}>{c.bd.seasonNote}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SWITCH ================= */}
      <div id="switch" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} data-reveal>
          <div>
            <div style={kicker}>{MONO.switchKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, ...T.h2 }}>
              {c.switch.h2}
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", maxWidth: 400, ...T.body }}>{c.switch.p}</p>
            <Link href={L("/switch")} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, padding: "13px 22px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 14, fontWeight: 700, ...T.label }}>
              {c.switch.cta} <Arrow />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.switch.rows.map(sw => (
              <div key={sw.i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#1A1D12", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15, fontWeight: 800 }}>{sw.i}</div>
                <div style={{ minWidth: 0 }}><div style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.2px", ...T.h3 }}>{sw.t}</div><div style={{ fontSize: 12, color: "#6B6D60", marginTop: 2, lineHeight: 1.5, ...T.small }}>{sw.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PRICING ================= */}
      <div id="pricing" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={kicker}>{MONO.pricingKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, ...T.h2 }}>{pricing.h2}</h2>
        </div>
        {/* Columns follow the plan count. Hardcoding 3 left a phantom third
            column the day the free tier was withdrawn from sale. */}
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${pricing.plans.length}, 1fr)`, gap: 14, maxWidth: pricing.plans.length < 3 ? 800 : "none", margin: "0 auto" }} data-reveal>
          {pricing.plans.map(p => (
            <div key={p.n} style={{ padding: 28, borderRadius: 26, display: "flex", flexDirection: "column", ...(p.dark ? { background: "#0F120B", color: "#E9EFDC", boxShadow: "0 24px 54px rgba(15,18,11,0.3)" } : { background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.2px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.n}</span>
                {p.pop ? <span style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(198,240,53,0.16)", color: "#C6F035", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em" }}>{pricing.popular}</span> : null}
              </div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.pr}</span>
                <span style={{ fontSize: 13, color: p.dark ? "#878B76" : "#6B6D60", ...T.chip }}>{p.sub}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginTop: 10, flex: 1, color: p.dark ? "#A9AD98" : "#6B6D60", ...T.small }}>{p.d}</div>
              <a href={p.href || REGISTER_URL} style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 0", borderRadius: 99, fontSize: 14, fontWeight: 700, ...(p.dark ? { background: "#C6F035", color: "#0F120B" } : { border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12" }), ...T.label }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 14, fontSize: 12.5, color: "#6B6D60", ...T.small }}>
          {pricing.foot}{" "}
          <Link href={L("/pricing")} style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>{pricing.footLink}</Link>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 20px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "76px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 60, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, maxWidth: 720, ...T.ctaH2 }}>{c.cta.h2}</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 34 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />{c.cta.primary}
            </a>
            <Link href={L("/nova")} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{c.cta.secondary}</Link>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>{MONO.ctaStrip}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
