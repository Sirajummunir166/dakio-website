// Home — 1:1 port of "Dakio Home.dc.html", localized.
// Copy lives in content/copy/home.<lang>.js; the layout below never changes
// between locales, only the strings and the type deltas from lib/type.js.

import Link from "next/link";
import { Fragment } from "react";
import HomeTop from "../../components/home/HomeTop";
import GuardrailDial from "../../components/home/GuardrailDial";
import NovaField from "../../components/home/NovaField";
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

const LAUNCH_SHAPE = [
  { i: "01", kind: "name", img: "launch-name", arrow: true },
  { i: "02", kind: "products", img: "launch-products", arrow: true },
  { i: "03", kind: "live", img: "launch-live", arrow: false },
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
                {/* One graphic + one line per step (hand-drawn SVG, public/graphics/launch-*.svg) */}
                <div style={{ marginTop: 14, aspectRatio: "400 / 240", borderRadius: 18, background: "#F2F3EC", overflow: "hidden" }}>
                  <img src={`/graphics/${ls.img}.svg`} alt="" width={400} height={240} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div style={{ marginTop: 14, fontSize: 13, color: "#6B6D60", lineHeight: 1.55, ...T.small }}>{c.launch[ls.kind].note}</div>
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

      {/* ================= ORG / TEAM — Nova's office as a living field ================= */}
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
        <div data-reveal style={{ marginTop: 34 }}>
          <NovaField
            copy={c.org.field}
            badge={MONO.orgFieldBadge}
            storeName="Shahrqee"
            deptNames={c.org.depts.map(d => d.n)}
            href={L("/nova")}
            T={T}
          />
        </div>
        <div data-reveal style={{ marginTop: 18, fontSize: 13, color: "#6B6D60", ...T.small }}>{c.org.note}</div>
      </div>

      {/* ================= THE ROOMS ================= */}
      <div id="rooms" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker}>{MONO.roomsKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 620, ...T.h2 }}>{c.rooms.h2}</h2>
        </div>
        {/* One card per room: a graphic, the name, one line — the rooms themselves
            (the prototypes) carry the detail. Graphics: hand-drawn SVG, public/graphics/rooms-*.svg */}
        <div className="m-rooms" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
          {[
            { key: "hq", href: "/prototypes/Nova HQ Prototype v7.dc.html", img: "rooms-nova-hq" },
            { key: "studio", href: "/prototypes/Dakio Store Studio.dc.html", img: "rooms-store-studio" },
            { key: "frontOffice", href: "/prototypes/Nova Inbox - Front Office.dc.html", img: "rooms-front-office" },
            { key: "grow", href: "/prototypes/Dakio Grow Modules.dc.html", img: "rooms-grow-suite" },
            { key: "ads", href: "/prototypes/Dakio Nova Motion Ads.dc.html", img: "rooms-ads-gallery" },
            { key: "supplier", href: "/prototypes/Dakio Supplier Dashboard.dc.html", img: "rooms-supplier-network" },
          ].map(r => (
            <a key={r.key} href={r.href} data-reveal className="hv-up4" style={{ display: "flex", flexDirection: "column", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 14, overflow: "hidden" }}>
              <div style={{ aspectRatio: "400 / 240", borderRadius: 20, background: "#F4F5EE", overflow: "hidden" }}>
                <img src={`/graphics/${r.img}.svg`} alt="" width={400} height={240} loading="lazy" style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ padding: "18px 12px 10px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{c.rooms[r.key].n}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#6B6D60", marginTop: 4, ...T.chip }}>{c.rooms[r.key].d}</div>
                </div>
                <span style={{ fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60", marginTop: 7, whiteSpace: "nowrap" }}>{MONO.roomsOpen}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ================= TRUST ================= */}
      {/* One argument, one instrument: text on the left, the guardrail dial on
          the right — deliberately not another row of three cards. */}
      <div id="trust" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.08fr)", gap: 48, alignItems: "center", borderRadius: 32, padding: "56px 60px", background: "linear-gradient(180deg, #F7F5EC 0%, #EFECDF 100%)", border: "1px solid rgba(26,29,18,0.08)", backgroundImage: "radial-gradient(rgba(26,29,18,0.09) 1px, transparent 1px), linear-gradient(180deg, #F7F5EC 0%, #EFECDF 100%)", backgroundSize: "22px 22px, 100% 100%" }}>
          <div>
            <div style={kicker}>{MONO.trustKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, ...T.h2 }}>{c.trust.h2}</h2>
            <p style={{ margin: "18px 0 0", maxWidth: 440, fontSize: 16, lineHeight: 1.6, color: "#4C4F42", ...T.lead }}>{c.trust.lede}</p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column" }}>
              {c.trust.points.map(pt => (
                <div key={pt.k} style={{ display: "grid", gridTemplateColumns: "44px minmax(0, 1fr)", gap: 6, padding: "18px 0", borderTop: "1px solid rgba(26,29,18,0.12)" }}>
                  <span style={{ fontFamily: MONOFONT, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#9A7A22", paddingTop: 4 }}>{pt.k}</span>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", ...T.h3 }}>{pt.t}</div>
                    <div style={{ marginTop: 5, fontSize: 13.5, lineHeight: 1.6, color: "#6B6D60", maxWidth: 420, ...T.small }}>{pt.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href={href(lang, "/nova")} className="hv-ink" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, fontSize: 14, fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 3, ...T.label }}>
              {c.trust.cta} <Arrow size={14} />
            </Link>
          </div>
          <GuardrailDial levels={c.trust.levels} spend={MONO.trustSpend} discount={MONO.trustDiscount} noTouch={MONO.trustNoTouch} style={{ maxWidth: 600, margin: "0 auto" }} />
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
      {/* A summary of /pricing, not a second pitch: same lede, same two cards
          (light Growth with the badge, dark Business), same bullets, same note. */}
      <div id="pricing" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={kicker}>{MONO.pricingKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, ...T.h2 }}>{pricing.h2}</h2>
          <p style={{ margin: "16px auto 0", maxWidth: 560, fontSize: 16, lineHeight: 1.6, color: "#4C4F42", ...T.lead }}>{pricing.sub}</p>
        </div>
        {/* Columns follow the plan count. Hardcoding 3 left a phantom third
            column the day the free tier was withdrawn from sale. */}
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${pricing.plans.length}, minmax(0, 1fr))`, gap: 14, maxWidth: pricing.plans.length < 3 ? 820 : "none", margin: "0 auto" }} data-reveal>
          {pricing.plans.map(p => (
            <div key={p.n} style={{ padding: 28, borderRadius: 26, display: "flex", flexDirection: "column", ...(p.dark ? { background: "#0F120B", color: "#E9EFDC", boxShadow: "0 24px 54px rgba(15,18,11,0.3)" } : { background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.n}</span>
                {p.pop ? <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", ...(p.dark ? { background: "rgba(198,240,53,0.16)", color: "#C6F035" } : { background: "#1A1D12", color: "#C6F035" }) }}>{pricing.popular}</span> : null}
              </div>
              {p.audience ? <div style={{ marginTop: 3, fontSize: 12.5, color: p.dark ? "#A9AD98" : "#6B6D60", ...T.chip }}>{p.audience}</div> : null}
              <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.pr}</span>
                <span style={{ fontSize: 13, color: p.dark ? "#878B76" : "#6B6D60", ...T.chip }}>{p.sub}</span>
              </div>
              {p.yr ? <div style={{ marginTop: 4, fontSize: 12, color: p.dark ? "#878B76" : "#6B6D60", ...T.small }}>{p.yr}</div> : null}
              {p.level ? <div style={{ marginTop: 14, display: "inline-flex", alignSelf: "flex-start", padding: "4px 10px", borderRadius: 99, fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", ...(p.dark ? { border: "1px solid rgba(198,240,53,0.4)", color: "#C6F035" } : { background: "rgba(62,122,69,0.1)", color: "#3E7A45" }) }}>{p.level}</div> : null}
              <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                {(p.feats || []).map(f => (
                  <li key={f} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, lineHeight: 1.5, color: p.dark ? "#C9CDB8" : "#4C4F42", ...T.small }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.dark ? "#C6F035" : "#3E7A45"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={p.href || REGISTER_URL} style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 0", borderRadius: 99, fontSize: 14, fontWeight: 700, ...(p.dark ? { background: "#C6F035", color: "#0F120B" } : { border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12" }), ...T.label }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", margin: "16px auto 0", maxWidth: 640, fontSize: 12.5, lineHeight: 1.6, color: "#6B6D60", ...T.small }}>
          {pricing.foot}{" "}
          <Link href={L("/pricing")} style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1, whiteSpace: "nowrap" }}>{pricing.footLink}</Link>
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
