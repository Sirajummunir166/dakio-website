"use client";

// Contact — 1:1 port of "Dakio Contact.dc.html". Client for the demo
// send-message state swap (form → "Message sent" card). Copy arrives as props.

import { useState } from "react";
import { Nav, Footer } from "../Chrome";
import Reveal from "../Reveal";
import LogoDefs from "../Logo";
import { href } from "../../lib/i18n";
import { type } from "../../lib/type";

const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(26,29,18,0.14)", background: "#ffffff", fontSize: 14, color: "#1A1D12" };
const labelBase = { display: "block", fontSize: 12.5, fontWeight: 600, color: "#1A1D12", marginBottom: 7 };

const ROUTE = "/contact";
const EMAIL = "hello@dakio.io";
const PHONE_HREF = "tel:01521305403";
const PHONE_LABEL = "01521 305 403";

const ICONS = {
  hq: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  registered: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" /></svg>,
  email: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
  phone: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>,
};

export default function ContactClient({ lang = "en", copy }) {
  const [sent, setSent] = useState(false);
  const c = copy;
  const T = type(lang);
  const labelStyle = { ...labelBase, ...T.label };

  const cards = [
    { key: "hq", icon: ICONS.hq, label: c.info.hq.label, body: c.info.hq.body },
    { key: "registered", icon: ICONS.registered, label: c.info.registered.label, body: c.info.registered.body },
    { key: "email", icon: ICONS.email, label: c.info.email.label, body: <a href={`mailto:${EMAIL}`} className="hv-green">{EMAIL}</a> },
    { key: "phone", icon: ICONS.phone, label: c.info.phone.label, body: <a href={PHONE_HREF} className="hv-green">{PHONE_LABEL}</a> },
  ];

  return (
    <div className="company-root" style={{ fontFamily: "var(--dk-font-sans)", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <Nav lang={lang} route={ROUTE} ctaHref={`${href(lang, "/")}#cta`} style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 28px 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 720, height: 400, background: "radial-gradient(closest-side, rgba(198,240,53,0.4), rgba(198,240,53,0) 100%)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12.5, fontWeight: 600, color: "#3E7A45", animation: "heroUp .6s ease both", ...T.label }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#3E7A45", animation: "pulseRingGreen 2.2s infinite" }} />{c.hero.badge}
          </div>
          <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 56, lineHeight: 1.05, letterSpacing: "-2.2px", fontWeight: 800, animation: "heroUp .6s .08s ease both", ...T.h1 }}>
            {c.hero.h1}
          </h1>
          <p style={{ margin: "18px auto 0", fontSize: 17, lineHeight: 1.65, color: "#6B6D60", maxWidth: 460, animation: "heroUp .6s .16s ease both", ...T.lead }}>{c.hero.sub}</p>
        </div>
      </div>

      {/* CONTACT GRID */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "12px 28px 20px" }}>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 14, alignItems: "start" }}>
          {/* left: info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {cards.map(card => (
              <div key={card.key} data-reveal className="hv-up2" style={{ padding: 22, borderRadius: 22, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: "#1A1D12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{card.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", color: "#6B6D60", textTransform: "uppercase", ...T.label }}>{card.label}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 500, marginTop: 5, lineHeight: 1.5 }}>{card.body}</div>
                </div>
              </div>
            ))}
            <div data-reveal style={{ padding: 24, borderRadius: 22, background: "#0F120B", color: "#F0EFE6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)" }} />
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px", color: "#fff", ...T.h3 }}>{c.promo.title}</div>
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(240,239,230,0.6)", marginTop: 8, lineHeight: 1.55, ...T.small }}>{c.promo.body}</div>
              <a href={`${href(lang, "/")}#cta`} className="hv-up2" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 99, background: "#C6F035", color: "#1A1D12", fontSize: 14, fontWeight: 700, ...T.label }}>
                {c.promo.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </div>

          {/* right: form */}
          <div data-reveal style={{ padding: 32, borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)" }}>
            <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.4px", ...T.h3 }}>{c.form.title}</div>
            {sent ? (
              <div style={{ marginTop: 22, padding: 28, borderRadius: 16, background: "rgba(198,240,53,0.25)", border: "1px solid rgba(62,122,69,0.25)", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 99, background: "#1A1D12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, ...T.h3 }}>{c.form.sentTitle}</div>
                  <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 3, ...T.small }}>{c.form.sentBody}</div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>{c.form.name.label}</label>
                    <input type="text" placeholder={c.form.name.placeholder} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{c.form.phone.label}</label>
                    <input type="tel" placeholder={c.form.phone.placeholder} style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{c.form.email.label}</label>
                  <input type="email" placeholder={c.form.email.placeholder} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{c.form.subject.label}</label>
                  <input type="text" placeholder={c.form.subject.placeholder} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{c.form.message.label}</label>
                  <textarea placeholder={c.form.message.placeholder} rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} />
                </div>
                <button onClick={() => setSent(true)} className="hv-up2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px 0", borderRadius: 10, border: "none", background: "#C6F035", color: "#1A1D12", fontSize: 15, fontWeight: 700, cursor: "pointer", ...T.label }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>{c.form.submit}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
