// About — 1:1 port of "Dakio About.dc.html", localized. This page family
// (About/Blog/Contact) uses plain var(--dk-font-sans), a green pulseRing
// variant and a page-wide a:hover ink rule (.company-root).

import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { REGISTER_URL } from "../../../lib/urls";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import aboutEn from "../../../content/copy/about.en";
import aboutBn from "../../../content/copy/about.bn";

const COPY = { en: aboutEn, bn: aboutBn };
const ROUTE = "/about";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

const EMAIL = "hello@dakio.io";
const PHONE_HREF = "tel:01521305403";
const PHONE_LABEL = "01521 305 403";

const VALUE_DOTS = [
  { background: "#3E7A45" },
  { background: "#C6F035", boxShadow: "0 0 0 1px rgba(26,29,18,0.15)" },
  { background: "#1A1D12" },
  { background: "#7a5119" },
];

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const ICONS = {
  hq: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  registered: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" /></svg>,
  email: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
  phone: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>,
};

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);

  const contacts = [
    { key: "hq", icon: ICONS.hq, label: c.contact.hq.label, body: c.contact.hq.body },
    { key: "registered", icon: ICONS.registered, label: c.contact.registered.label, body: c.contact.registered.body },
    { key: "email", icon: ICONS.email, label: c.contact.email.label, body: <a href={`mailto:${EMAIL}`} className="hv-green">{EMAIL}</a> },
    { key: "phone", icon: ICONS.phone, label: c.contact.phone.label, body: <a href={PHONE_HREF} className="hv-green">{PHONE_LABEL}</a> },
  ];

  return (
    <div className="company-root" style={{ fontFamily: "var(--dk-font-sans)", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} ctaHref="#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 28px 64px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 760, height: 420, background: "radial-gradient(closest-side, rgba(198,240,53,0.4), rgba(198,240,53,0) 100%)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12.5, fontWeight: 600, color: "#3E7A45", animation: "heroUp .6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#3E7A45", animation: "pulseRingGreen 2.2s infinite" }} />{c.hero.badge}
          </div>
          <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 60, lineHeight: 1.04, letterSpacing: "-2.4px", fontWeight: 800, maxWidth: 700, animation: "heroUp .6s .08s ease both", ...T.h1 }}>
            {c.hero.h1}
          </h1>
          <p style={{ margin: "20px auto 0", fontSize: 17, lineHeight: 1.65, color: "#6B6D60", maxWidth: 540, animation: "heroUp .6s .16s ease both", ...T.lead }}>
            {c.hero.sub}
          </p>
          <div className="m-wrap" style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
            <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "14px 26px", borderRadius: 99, background: "#C6F035", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>
              {c.hero.ctaPrimary} <Arrow />
            </a>
            <a href="#contact" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "14px 24px", borderRadius: 99, background: "transparent", border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.hero.ctaSecondary}</a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
        <div data-reveal className="m-stats2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(26,29,18,0.08)", borderBottom: "1px solid rgba(26,29,18,0.08)" }}>
          {c.stats.map((s, i) => (
            <div key={s.l} style={{ padding: "34px 20px", textAlign: "center", ...(i < 3 ? { borderRight: "1px solid rgba(26,29,18,0.08)" } : {}) }}>
              <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px" }}>{s.v}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#6B6D60", marginTop: 6, ...T.chip }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OUR STORY */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#3E7A45", textTransform: "uppercase", ...T.label }}>{c.story.label}</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 42, lineHeight: 1.1, letterSpacing: "-1.6px", fontWeight: 750, ...T.h2b }}>
              {c.story.h2}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 15.5, lineHeight: 1.7, color: "#6B6D60", ...T.body }}>
            {c.story.paras.map((p, i) => (
              <p key={i} style={{ margin: 0, ...(i === 0 || i === c.story.paras.length - 1 ? { color: "#1A1D12", fontWeight: 500 } : {}) }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band m-gap m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#C6F035", textTransform: "uppercase", ...T.label }}>{c.mission.label}</div>
            <h2 className="m-h2b" style={{ margin: "16px 0 0", fontSize: 34, lineHeight: 1.16, letterSpacing: "-1px", fontWeight: 750, color: "#fff", ...T.h2b }}>{c.mission.h2}</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "rgba(240,239,230,0.6)", maxWidth: 420, ...T.body }}>{c.mission.p}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {c.mission.points.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "18px 20px", borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#C6F035", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(240,239,230,0.85)", ...T.small }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#6B6D60", textTransform: "uppercase", ...T.label }}>{c.values.label}</div>
          <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 40, lineHeight: 1.12, letterSpacing: "-1.4px", fontWeight: 750, ...T.h2b }}>{c.values.h2}</h2>
        </div>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 920, margin: "0 auto" }}>
          {c.values.items.map((v, i) => (
            <div key={v.t} data-reveal className="hv-up3" style={{ padding: 26, borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)" }}>
              <span style={{ display: "block", width: 9, height: 9, borderRadius: 99, marginBottom: 14, ...VALUE_DOTS[i] }} />
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.3px", ...T.h3 }}>{v.t}</div>
              <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 8, lineHeight: 1.6, ...T.small }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#6B6D60", textTransform: "uppercase", ...T.label }}>{c.contact.label}</div>
          <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 40, lineHeight: 1.12, letterSpacing: "-1.4px", fontWeight: 750, ...T.h2b }}>{c.contact.h2}</h2>
        </div>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 800, margin: "0 auto" }}>
          {contacts.map(ct => (
            <div key={ct.key} data-reveal className="hv-up3" style={{ padding: 26, borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)", textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "#1A1D12", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{ct.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", color: "#6B6D60", textTransform: "uppercase", ...T.label }}>{ct.label}</div>
              <div style={{ fontSize: 14.5, fontWeight: 500, marginTop: 7, lineHeight: 1.55 }}>{ct.body}</div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
          <a href={`mailto:${EMAIL}`} className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 10, background: "transparent", border: "1px solid rgba(26,29,18,0.18)", color: "#1A1D12", fontSize: 14.5, fontWeight: 700, ...T.label }}>
            {c.contact.send} <Arrow size={14} />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1160, margin: "64px auto 0", padding: "0 28px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 32, background: "#C6F035", padding: "60px 40px", textAlign: "center" }}>
          <h2 className="m-cta-h2" style={{ margin: "0 auto", fontSize: 44, lineHeight: 1.08, letterSpacing: "-1.6px", fontWeight: 800, maxWidth: 640, ...T.ctaH2 }}>{c.cta.h2}</h2>
          <p style={{ margin: "16px auto 0", fontSize: 16, color: "#1A1D12", maxWidth: 440, lineHeight: 1.6, ...T.body }}>{c.cta.p}</p>
          <div className="m-wrap" style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 30 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 28px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700, ...T.label }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRingGreen 2.2s infinite" }} />{c.cta.primary}
            </a>
            <a href={L("/nova")} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15, fontWeight: 700, ...T.label }}>{c.cta.secondary}</a>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
