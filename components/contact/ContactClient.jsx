"use client";

// Contact — 1:1 port of "Dakio Contact.dc.html". Client for the demo
// send-message state swap (form → "Message sent" card).

import { useState } from "react";
import SiteNav from "../SiteNav";
import SiteFooter from "../SiteFooter";
import Reveal from "../Reveal";
import LogoDefs from "../Logo";

const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(26,29,18,0.14)", background: "#ffffff", fontSize: 14, color: "#1A1D12" };
const labelStyle = { display: "block", fontSize: 12.5, fontWeight: 600, color: "#1A1D12", marginBottom: 7 };

const INFO_CARDS = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    label: "HQ",
    body: "House 5, Road 5, Priyanka City, Sector 12, Uttara, Dhaka",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" /></svg>,
    label: "Registered office",
    body: "253-254, Dr. Kudrat-e-Khuda Road, (Kataban), Dhaka",
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
    label: "Email",
    body: <a href="mailto:hello@dakio.io" className="hv-green">hello@dakio.io</a>,
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>,
    label: "Phone",
    body: <a href="tel:01521305403" className="hv-green">01521 305 403</a>,
  },
];

export default function ContactClient() {
  const [sent, setSent] = useState(false);

  return (
    <div className="company-root" style={{ fontFamily: "var(--dk-font-sans)", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav ctaHref="/#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 28px 48px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 720, height: 400, background: "radial-gradient(closest-side, rgba(198,240,53,0.4), rgba(198,240,53,0) 100%)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12.5, fontWeight: 600, color: "#3E7A45", animation: "heroUp .6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#3E7A45", animation: "pulseRingGreen 2.2s infinite" }} />Contact
          </div>
          <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 56, lineHeight: 1.05, letterSpacing: "-2.2px", fontWeight: 800, animation: "heroUp .6s .08s ease both" }}>
            Get in <span style={{ position: "relative", whiteSpace: "nowrap" }}>touch<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 12, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>
          </h1>
          <p style={{ margin: "18px auto 0", fontSize: 17, lineHeight: 1.65, color: "#6B6D60", maxWidth: 460, animation: "heroUp .6s .16s ease both" }}>Questions, feedback, or need help? A human answers here — Nova only runs the stores.</p>
        </div>
      </div>

      {/* CONTACT GRID */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "12px 28px 20px" }}>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 14, alignItems: "start" }}>
          {/* left: info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {INFO_CARDS.map(c => (
              <div key={c.label} data-reveal className="hv-up2" style={{ padding: 22, borderRadius: 22, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 42, height: 42, borderRadius: 13, background: "#1A1D12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", color: "#6B6D60", textTransform: "uppercase" }}>{c.label}</div>
                  <div style={{ fontSize: 14.5, fontWeight: 500, marginTop: 5, lineHeight: 1.5 }}>{c.body}</div>
                </div>
              </div>
            ))}
            <div data-reveal style={{ padding: 24, borderRadius: 22, background: "#0F120B", color: "#F0EFE6" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)" }} />
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.2px", color: "#fff" }}>Start for free</div>
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(240,239,230,0.6)", marginTop: 8, lineHeight: 1.55 }}>Open a free account — and appoint your CEO on day one. No card required.</div>
              <a href="/#cta" className="hv-up2" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 99, background: "#C6F035", color: "#1A1D12", fontSize: 14, fontWeight: 700 }}>
                Start free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </div>

          {/* right: form */}
          <div data-reveal style={{ padding: 32, borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)" }}>
            <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: "-0.4px" }}>Send a message</div>
            {sent ? (
              <div style={{ marginTop: 22, padding: 28, borderRadius: 16, background: "rgba(198,240,53,0.25)", border: "1px solid rgba(62,122,69,0.25)", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 99, background: "#1A1D12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Message sent</div>
                  <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 3 }}>Thanks for reaching out — we&apos;ll get back to you within one business day.</div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input type="text" placeholder="Enter your name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone number</label>
                    <input type="tel" placeholder="01XXXXXXXXX" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" placeholder="email@example.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Subject</label>
                  <input type="text" placeholder="What would you like to discuss?" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea placeholder="Write your question or message..." rows={5} style={{ ...inputStyle, resize: "vertical", minHeight: 110 }} />
                </div>
                <button onClick={() => setSent(true)} className="hv-up2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "14px 0", borderRadius: 10, border: "none", background: "#C6F035", color: "#1A1D12", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>Send message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <SiteFooter />
      </div>
    </div>
  );
}
