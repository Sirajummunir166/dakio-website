// Developers — the landing page for @dakio/sdk (DAKIO_SDK_PLAN.md §7, cut 6).
// Bilingual like every marketing page; the docs it points to are English-only
// (app/[lang]/developers/docs, content/docs/*.mdx).
//
// One visual language per section, never three cards in a row (owner rule for
// dakio.io): a light code card in the hero, the hand-drawn seam graphic, a
// numbered rail for the steps, a sand flow strip for checkout, a light/dark
// pair for the starters, an ink key panel, a big-number agency panel.

import Link from "next/link";
import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import Code from "../../../components/docs/Code";
import CopyButton from "../../../components/docs/CopyButton";
import { APP_URL, REGISTER_URL } from "../../../lib/urls";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import devEn, { MONO } from "../../../content/copy/developers.en";
import devBn from "../../../content/copy/developers.bn";

const COPY = { en: devEn, bn: devBn };
const ROUTE = "/developers";
const DOCS = "/developers/docs";
const KEYS_URL = `${APP_URL}/settings/developers`;
const REPO = "https://github.com/alasim/dakio-sdk";
const deployUrl = (dir, env) =>
  `https://vercel.com/new/clone?repository-url=${encodeURIComponent(`${REPO}/tree/main/examples/${dir}`)}&project-name=my-dakio-store&env=${env}&envDescription=${encodeURIComponent("Your Dakio key (Settings → Developers)")}`;

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
const kicker = color => ({ fontFamily: MONOFONT, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color });

const HERO_CODE = `import { createDakio } from '@dakio/sdk'

const dakio = createDakio({ key: 'dk_pub_live_…' })

// Your design, Dakio's catalog — sale prices included
const { data: products } = await dakio.products.list({ limit: 12 })

// Cash on delivery, fake-order protection, straight to Orders
const order = await dakio.checkout.create({ customer, items })
// → { status: 'PLACED', orderNumber: '#K3P-9QXA' }`;

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  );
}

function Check({ color = "#3E7A45", size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5" /></svg>
  );
}

export default async function DevelopersPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} active="developers" ctaHref={KEYS_URL} ctaLabel={c.navCta} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO — words left, a light code card right */}
      <div className="m-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 28px 20px", display: "grid", gridTemplateColumns: "1.02fr 1fr", gap: 44, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", ...kicker("#3E7A45"), animation: "heroUp .6s ease both" }}>{MONO.heroBadge}</div>
          <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 60, lineHeight: 1.03, letterSpacing: "-2.4px", fontWeight: 800, animation: "heroUp .6s .08s ease both", ...T.h1 }}>{c.hero.h1}</h1>
          <p style={{ margin: "20px 0 0", fontSize: 17, lineHeight: 1.6, color: "#6B6D60", maxWidth: 520, animation: "heroUp .6s .16s ease both", ...T.lead }}>{c.hero.sub}</p>
          <div className="m-wrap" style={{ display: "flex", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
            <Link href={DOCS} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700, ...T.label }}>
              {c.hero.ctaPrimary}<Arrow />
            </Link>
            <a href={KEYS_URL} className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.hero.ctaSecondary}</a>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 22, padding: "8px 8px 8px 16px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.09)", animation: "heroUp .6s .3s ease both" }}>
            <span style={{ ...kicker("#6B6D60"), fontSize: 9 }}>{MONO.install}</span>
            <code style={{ fontFamily: MONOFONT, fontSize: 13, color: "#1A1D12" }}>npm install @dakio/sdk</code>
            <CopyButton text="npm install @dakio/sdk" label={c.copy} done={c.copied} />
          </div>
        </div>
        <div style={{ animation: "heroUp .7s .2s ease both", minWidth: 0 }}>
          <Code code={HERO_CODE} lang="js" title={c.hero.codeTitle} copyLabel={c.copy} copiedLabel={c.copied} style={{ margin: 0, boxShadow: "0 30px 70px rgba(26,29,18,0.12)", borderRadius: 22 }} />
        </div>
      </div>

      {/* THE SEAM — one wide panel: the graphic, then who does what */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid" style={{ borderRadius: 32, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 40, display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={kicker("#3E7A45")}>{MONO.seamKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, ...T.h2 }}>{c.seam.h2}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "#6B6D60", ...T.body }}>{c.seam.sub}</p>
            <div style={{ marginTop: 22, aspectRatio: "400 / 240", maxWidth: 420 }}>
              <img src="/graphics/developers-seam.svg" width={400} height={240} alt={c.seam.graphicAlt} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>
          <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 18 }}>
            <div style={{ borderRadius: 22, background: "#FFFFFF", border: "1px solid rgba(26,29,18,0.08)", padding: 22 }}>
              <div style={kicker("#6B6D60")}>{MONO.you}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                {c.seam.you.map(t => (
                  <div key={t} style={{ display: "flex", gap: 9, fontSize: 13.5, fontWeight: 650, lineHeight: 1.45, ...T.chip }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "#1A1D12", flexShrink: 0, marginTop: 7 }} />{t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 22, background: "#E6EFC9", padding: 22 }}>
              <div style={kicker("#3A5212")}>{MONO.dakio}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
                {c.seam.dakio.map(t => (
                  <div key={t} style={{ display: "flex", gap: 9, fontSize: 13.5, fontWeight: 650, lineHeight: 1.45, ...T.chip }}>
                    <Check />{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIVE MINUTES — a numbered rail */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker("#3E7A45")}>{MONO.stepsKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, ...T.h2 }}>{c.steps.h2}</h2>
        </div>
        <div data-reveal style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 21, top: 20, bottom: 20, width: 2, background: "repeating-linear-gradient(to bottom, rgba(62,122,69,0.45) 0 6px, transparent 6px 12px)" }} />
          {c.steps.items.map((s, i) => (
            <div key={s.t} style={{ position: "relative", display: "flex", gap: 20, paddingBottom: i === c.steps.items.length - 1 ? 0 : 26 }}>
              <span style={{ width: 44, height: 44, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: i === c.steps.items.length - 1 ? "#C6F035" : "#FBFAF5", border: "2px solid #3E7A45", fontWeight: 800, fontSize: 16 }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px", ...T.h3 }}>{s.t}</div>
                <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 4, lineHeight: 1.6, ...T.small }}>{s.d}</div>
                {s.code && (
                  <code style={{ display: "inline-block", marginTop: 10, padding: "8px 14px", borderRadius: 12, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.09)", fontFamily: MONOFONT, fontSize: 12.5, color: "#1A1D12", maxWidth: "100%", overflowX: "auto", whiteSpace: "nowrap" }}>{s.code}</code>
                )}
              </div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 34 }}>
          <Link href={DOCS} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontWeight: 750, color: "#3E7A45", ...T.label }}>{c.steps.cta}<Arrow size={14} /></Link>
        </div>
      </div>

      {/* CHECKOUT — a sand strip, one flow */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal style={{ borderRadius: 32, background: "#F1E7D3", padding: "44px 40px" }}>
          <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "end" }}>
            <div>
              <div style={kicker("#8A5A12")}>{MONO.flowKicker}</div>
              <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, ...T.h2 }}>{c.flow.h2}</h2>
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: "#5E5240", ...T.body }}>{c.flow.sub}</p>
          </div>
          <div className="dev-flow" style={{ marginTop: 34, display: "flex", alignItems: "center", gap: 0 }}>
            {c.flow.nodes.map((n, i) => {
              const last = i === c.flow.nodes.length - 1
              const maybe = i === 3
              return (
                <div key={n} className="dev-flow-step" style={{ display: "flex", alignItems: "center", flex: last ? "0 0 auto" : 1, minWidth: 0 }}>
                  <div style={{
                    padding: "12px 16px", borderRadius: 16, whiteSpace: "nowrap", fontSize: 13.5, fontWeight: 750,
                    background: last ? "#C6F035" : maybe ? "transparent" : "#FFFBF2",
                    border: maybe ? "2px dashed #E2A63B" : "1.5px solid rgba(94,82,64,0.25)", color: "#1A1D12", ...T.chip,
                  }}>
                    {n}
                    {last && <div style={{ fontFamily: MONOFONT, fontSize: 9.5, letterSpacing: "0.08em", color: "#3A5212", marginTop: 3 }}>{MONO.orderNo}</div>}
                  </div>
                  {!last && <div className="dev-flow-line" style={{ flex: 1, minWidth: 14, height: 2, margin: "0 6px", background: "repeating-linear-gradient(to right, #C9A86A 0 6px, transparent 6px 11px)" }} />}
                </div>
              )
            })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
            {c.flow.chips.map(t => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 99, background: "#FFFBF2", border: "1px solid rgba(94,82,64,0.16)", fontSize: 12.5, fontWeight: 700, ...T.chip }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A5A12" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STARTERS — a light / dark pair */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={kicker("#3E7A45")}>{MONO.startersKicker}</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 44, lineHeight: 1.06, letterSpacing: "-1.7px", fontWeight: 800, ...T.h2 }}>{c.starters.h2}</h2>
          <p style={{ margin: "14px auto 0", fontSize: 15, lineHeight: 1.65, color: "#6B6D60", maxWidth: 600, ...T.body }}>{c.starters.sub}</p>
        </div>
        <div data-reveal className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 940, margin: "0 auto" }}>
          {[
            { k: "react", mono: MONO.react, s: c.starters.react, dark: false, deploy: deployUrl("react-vite", "VITE_DAKIO_KEY"), code: `${REPO}/tree/main/examples/react-vite` },
            { k: "next", mono: MONO.next, s: c.starters.next, dark: true, deploy: deployUrl("next", "NEXT_PUBLIC_DAKIO_KEY,NEXT_PUBLIC_SITE_URL"), code: `${REPO}/tree/main/examples/next` },
          ].map(st => (
            <div key={st.k} style={{ borderRadius: 28, padding: 30, display: "flex", flexDirection: "column", ...(st.dark ? { background: "#0F120B", color: "#E9EFDC", boxShadow: "0 30px 70px rgba(15,18,11,0.25)" } : { background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }) }}>
              <div style={kicker(st.dark ? "#8CBF33" : "#3E7A45")}>{st.mono}</div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.8px", marginTop: 14, color: st.dark ? "#FBFBF4" : "#1A1D12", ...T.h3 }}>{st.s.t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, marginTop: 8, color: st.dark ? "#A9AD98" : "#6B6D60", flex: 1, ...T.body }}>{st.s.d}</div>
              <div className="m-wrap" style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <a href={st.deploy} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 99, background: st.dark ? "#C6F035" : "#1A1D12", color: st.dark ? "#0F120B" : "#C6F035", fontSize: 14, fontWeight: 700, ...T.label }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l10 18H2z" /></svg>{c.starters.deploy}
                </a>
                <a href={st.code} style={{ display: "inline-flex", alignItems: "center", padding: "12px 18px", borderRadius: 99, border: `1.5px solid ${st.dark ? "rgba(233,239,220,0.25)" : "rgba(26,29,18,0.2)"}`, color: st.dark ? "#E9EFDC" : "#1A1D12", fontSize: 14, fontWeight: 700, ...T.label }}>{c.starters.code}</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KEYS — an ink panel, one row per key */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid" style={{ borderRadius: 32, background: "#0F120B", color: "#E9EFDC", padding: 40, display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 36, alignItems: "center" }}>
          <div>
            <div style={kicker("#8CBF33")}>{MONO.keysKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.5px", fontWeight: 800, color: "#FBFBF4", ...T.h2b }}>{c.keys.h2}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#A9AD98", ...T.body }}>{c.keys.sub}</p>
            <Link href={`${DOCS}/keys`} style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 20, fontSize: 14, fontWeight: 700, color: "#C6F035", ...T.label }}>{c.keys.cta}<Arrow size={13} /></Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.keys.rows.map((r, i) => (
              <div key={r.k} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 18, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
                <code style={{ fontFamily: MONOFONT, fontSize: 13, color: i === 2 ? "#F2C46B" : "#C6F035", minWidth: 128 }}>{r.k}</code>
                <span style={{ padding: "3px 10px", borderRadius: 99, background: i === 2 ? "rgba(242,196,107,0.14)" : "rgba(198,240,53,0.14)", color: i === 2 ? "#F2C46B" : "#C6F035", fontSize: 11, fontWeight: 700, ...T.chip }}>{r.t}</span>
                <span style={{ fontSize: 13, color: "#C9CDB8", flex: "1 1 200px", lineHeight: 1.5, ...T.small }}>{r.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AGENCIES — one big number */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid" style={{ borderRadius: 32, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 40, display: "grid", gridTemplateColumns: "0.75fr 1.25fr", gap: 36, alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: "-5px", lineHeight: 1, color: "#1A1D12" }}>
              <span style={{ background: "linear-gradient(transparent 62%, #C6F035 62%, #C6F035 88%, transparent 88%)" }}>{c.agency.stat}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#6B6D60", marginTop: 10, ...T.chip }}>{c.agency.statLabel}</div>
          </div>
          <div>
            <div style={kicker("#3E7A45")}>{MONO.agencyKicker}</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.5px", fontWeight: 800, ...T.h2 }}>{c.agency.h2}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "#6B6D60", maxWidth: 560, ...T.body }}>{c.agency.sub}</p>
            <div className="m-wrap" style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 22 }}>
              <Link href={L("/contact")} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 22px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 14.5, fontWeight: 700, ...T.label }}>{c.agency.cta}<Arrow size={14} /></Link>
              <span style={{ fontSize: 12.5, color: "#6B6D60", ...T.small }}>{c.agency.note}</span>
            </div>
          </div>
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
            <Link href={DOCS} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700, ...T.label }}>{c.cta.secondary}</Link>
          </div>
          <div style={{ position: "relative", marginTop: 20, ...kicker("rgba(26,29,18,0.6)"), fontSize: 9.5 }}>{MONO.ctaStrip}</div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
