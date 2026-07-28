"use client";

// Port of SiteNav.dc.html — sticky blurred cream bar with Explore mega-menu.
// Hover-open with 260ms close grace, click toggles (touch), outside-click
// closes, caret rotates; active page gets the lime underline.

import { useRef, useState } from "react";
import LogoDefs from "./Logo";
import { LOGIN_URL } from "../lib/urls";

const MONO = "var(--dk-font-mono), monospace";

const NOVA_ITEMS = [
  { mono: "HQ", n: "Nova HQ", d: "Supervise your Acting CEO", href: "/nova" },
  { mono: "FO", n: "Front Office", d: "Nova sells in your inbox", href: "/front-office" },
];

const BUILD_ITEMS = [
  { mono: "SS", n: "Store Studio", d: "Design without a developer", href: "/store-studio" },
  { mono: "GL", n: "Grow Labs", d: "The business Grow Studio", href: "/grow" },
  { mono: "AD", n: "Ads Gallery", d: "Product → on-brand ad", href: "/ads" },
  { mono: "SN", n: "Supplier Network", d: "Sell with zero inventory", href: "/prototypes/Dakio Supplier Dashboard.dc.html" },
];

function ArrowIcon({ size = 12, strokeWidth = 2.4 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function SiteNav({
  active = "home",
  lang = "en",
  onToggleLang = null,
  ctaHref = "#cta",
  ctaLabel = "Appoint Nova",
  style,
}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeT = useRef(null);

  const toggleOpen = () => { clearTimeout(closeT.current); setOpen(o => !o); };
  const openMenu = () => { clearTimeout(closeT.current); if (!open) setOpen(true); };
  const scheduleClose = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => setOpen(false), 260); };
  const close = () => { clearTimeout(closeT.current); setOpen(false); };

  const link = key =>
    active === key
      ? { fontSize: 13.5, fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 2 }
      : { fontSize: 13.5, fontWeight: 600, color: "#6B6D60" };
  const seg = on => ({
    padding: "5px 11px", borderRadius: 99, fontSize: 11.5, fontWeight: 700,
    ...(on ? { background: "#1A1D12", color: "#C6F035" } : { color: "#6B6D60" }),
  });
  const prodActive = ["store-studio", "grow", "ads", "front-office"].includes(active);

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", position: "relative", backdropFilter: "blur(10px)", background: "rgba(239,241,233,0.88)", borderBottom: "1px solid rgba(26,29,18,0.06)", ...style }}>
      <LogoDefs mkId="nv-mk" wmId="nv-wm" />

      <div className="nav-row" style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", gap: 24 }}>
        <a href="/" aria-label="Dakio — home" style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
          <svg width="26" height="26" viewBox="0 5.4 23 23" style={{ color: "#1A1D12" }}><use href="#nv-mk" /></svg>
          <svg width="88" height="25" viewBox="31 0 104 29" style={{ color: "#1A1D12" }}><use href="#nv-wm" /></svg>
        </a>
        <div className="nav-desktop-links" style={{ flex: 1, display: "flex", alignItems: "center", gap: 22, marginLeft: 12 }}>
          <div
            role="button"
            tabIndex={0}
            aria-expanded={open}
            aria-haspopup="true"
            onClick={toggleOpen}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleOpen(); }
              else if (e.key === "Escape") close();
            }}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none", ...link(prodActive ? active : "_"), ...(open ? { color: "#1A1D12" } : {}) }}
          >
            Explore
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform .18s ease", ...(open ? { transform: "rotate(180deg)" } : {}) }}><path d="M6 9l6 6 6-6" /></svg>
          </div>
          <a href="/nova" className="hv-ink" style={link("nova")}>Nova</a>
          <a href="/switch" className="hv-ink" style={link("switch")}>Switch to Dakio</a>
          <a href="/pricing" className="hv-ink" style={link("pricing")}>Pricing</a>
        </div>
        {onToggleLang ? (
          <div
            role="button"
            tabIndex={0}
            aria-label={lang === "bn" ? "Switch language to English" : "Switch language to Bangla"}
            onClick={onToggleLang}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggleLang(); } }}
            className="nav-lang"
            style={{ display: "flex", padding: 3, borderRadius: 99, background: "rgba(26,29,18,0.07)", cursor: "pointer", fontSize: 11.5, fontWeight: 700 }}
          >
            <span style={seg(lang !== "bn")}>EN</span><span style={seg(lang === "bn")}>বাং</span>
          </div>
        ) : null}
        <a href={LOGIN_URL} className="nav-login" style={{ fontSize: 14, fontWeight: 600, color: "#1A1D12" }}>Log in</a>
        <a href={ctaHref} className="hv-up1 m-nav-cta" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap" }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "nvPulse 2.2s infinite" }} />{ctaLabel}
        </a>
        <button
          type="button"
          className="nav-burger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(o => !o)}
        >
          {mobileOpen ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div className="nav-mobile-panel">
          <div className="nav-mobile-card">
            {onToggleLang ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px 2px" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#6B6D60" }}>Language</span>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={lang === "bn" ? "Switch language to English" : "Switch language to Bangla"}
                  onClick={onToggleLang}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggleLang(); } }}
                  style={{ display: "flex", padding: 3, borderRadius: 99, background: "rgba(26,29,18,0.07)", cursor: "pointer", fontSize: 11.5, fontWeight: 700 }}
                >
                  <span style={seg(lang !== "bn")}>EN</span><span style={seg(lang === "bn")}>বাং</span>
                </div>
              </div>
            ) : null}
            <div className="nav-mobile-label">RUN BY NOVA</div>
            {NOVA_ITEMS.map(it => <a key={it.mono} href={it.href}><span style={{ width: 30, height: 30, borderRadius: 10, background: "#14170E", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{it.mono}</span>{it.n}</a>)}
            <div className="nav-mobile-label">BUILD &amp; GROW</div>
            {BUILD_ITEMS.map(it => <a key={it.mono} href={it.href}><span style={{ width: 30, height: 30, borderRadius: 10, background: "#EEF4D4", color: "#3A5212", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{it.mono}</span>{it.n}</a>)}
            <div className="nav-mobile-divider" />
            <a href="/nova">Nova</a>
            <a href="/switch">Switch to Dakio</a>
            <a href="/pricing">Pricing</a>
            <div className="nav-mobile-divider" />
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
            <div className="nav-mobile-divider" />
            <a href={LOGIN_URL}>Log in</a>
          </div>
        </div>
      ) : null}

      {open ? (
        <>
          <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: -1 }} />
          <div onMouseEnter={openMenu} onMouseLeave={scheduleClose} style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "10px 28px 0" }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 1020, margin: "0 auto", borderRadius: 24, background: "#FBFBF4", border: "1px solid rgba(26,29,18,0.08)", boxShadow: "0 34px 80px rgba(26,29,18,0.22)", padding: 22, display: "grid", gridTemplateColumns: "1fr 1.4fr 0.9fr", gap: 20, animation: "nvDrop .18s ease both" }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45", padding: "0 10px" }}>RUN BY NOVA</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 10 }}>
                  {NOVA_ITEMS.map(it => (
                    <a key={it.mono} href={it.href} className="hv-bg-f0efe4" style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 14 }}>
                      <span style={{ width: 38, height: 38, borderRadius: 12, background: "#14170E", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{it.mono}</span>
                      <span style={{ minWidth: 0 }}><span style={{ display: "block", fontSize: 13.5, fontWeight: 700 }}>{it.n}</span><span style={{ display: "block", fontSize: 11, color: "#6B6D60", marginTop: 1 }}>{it.d}</span></span>
                    </a>
                  ))}
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(26,29,18,0.07)", paddingLeft: 20 }}>
                <div style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45", padding: "0 10px" }}>BUILD &amp; GROW</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 10 }}>
                  {BUILD_ITEMS.map(it => (
                    <a key={it.mono} href={it.href} className="hv-bg-f0efe4" style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 14 }}>
                      <span style={{ width: 38, height: 38, borderRadius: 12, background: "#EEF4D4", color: "#3A5212", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{it.mono}</span>
                      <span style={{ minWidth: 0 }}><span style={{ display: "block", fontSize: 13.5, fontWeight: 700 }}>{it.n}</span><span style={{ display: "block", fontSize: 11, color: "#6B6D60", marginTop: 1 }}>{it.d}</span></span>
                    </a>
                  ))}
                </div>
              </div>
              <a href="/#rooms" className="hv-up2" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 16, background: "#0F120B", color: "#E9EFDC", padding: 18 }}>
                <div>
                  <span style={{ display: "inline-block", width: 22, height: 22, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)" }} />
                  <div style={{ fontSize: 14.5, fontWeight: 800, marginTop: 10, color: "#FBFBF4" }}>The 60-second tour</div>
                  <div style={{ fontSize: 11, color: "#A9AD98", marginTop: 4, lineHeight: 1.55 }}>Every room, clickable — real product, not mockups.</div>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: "#C6F035", marginTop: 14 }}>Take it <ArrowIcon /></div>
              </a>
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 16, padding: "12px 10px 2px", borderTop: "1px solid rgba(26,29,18,0.08)", flexWrap: "wrap" }}>
                <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", color: "#878B76" }}>COMPANY</span>
                <a href="/about" className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60" }}>About</a>
                <a href="/blog" className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60" }}>Blog</a>
                <a href="/contact" className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60" }}>Contact</a>
                <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#878B76" }}>৳ BANGLADESH · GOING GLOBAL SOON</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
