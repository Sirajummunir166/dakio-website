"use client";

// Port of SiteNav.dc.html — sticky blurred cream bar with Explore mega-menu.
// Hover-open with 260ms close grace, click toggles (touch), outside-click
// closes, caret rotates; active page gets the lime underline.
//
// The panel is four columns: START HERE / RUN WITH NOVA / BUILD & GROW, and a
// dark preview card that swaps vignette on hover (or keyboard focus) of any
// item and resets to the 60-second tour whenever the menu opens or closes.
//
// Localized: copy arrives as a prop (chrome.<lang>.js), internal links go
// through href(lang, …), and the EN/বাং switch is a real <a> to the same page
// in the other locale — not client state — so both locales are crawlable.

import { useRef, useState } from "react";
import LogoDefs from "./Logo";
import NavPreview from "./NavPreview";
import { LOGIN_URL } from "../lib/urls";
import { href, otherLocaleHref } from "../lib/i18n";
import chromeEn, { MONO_LABELS, PREVIEW_MONO } from "../content/copy/chrome.en";
import { type } from "../lib/type";

const MONO = "var(--dk-font-mono), monospace";

const SUPPLIER_HREF = "/prototypes/Dakio Supplier Dashboard.dc.html";
const NOVA_HQ_HREF = "/prototypes/Nova HQ Prototype v7.dc.html";

// mono badge · copy key · destination · which preview it shows
const START_KEYS = [
  { mono: "GO", href: "#launch", pv: "store" },
  { mono: "MV", href: "/switch", pv: "switch" },
  { mono: "ZS", href: SUPPLIER_HREF, pv: "supplier" },
];

const NOVA_KEYS = [
  { mono: "NV", href: "/nova", pv: "nova" },
  { mono: "HQ", href: NOVA_HQ_HREF, pv: "novahq" },
  { mono: "FO", href: "/front-office", pv: "front" },
];

const BUILD_KEYS = [
  { mono: "CS", href: "/store", pv: "complete" },
  { mono: "SS", href: "/store-studio", pv: "studio" },
  { mono: "GL", href: "/grow", pv: "grow" },
  { mono: "AD", href: "/ads", pv: "ads" },
  { mono: "SN", href: SUPPLIER_HREF, pv: "supplier" },
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
  route = "/",
  copy,
  ctaHref = "#cta",
  ctaLabel,
  style,
}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pv, setPv] = useState("tour");
  const closeT = useRef(null);

  const c = copy || chromeEn.nav;
  const T = type(lang);
  const L = p => href(lang, p);
  const isBn = lang === "bn";
  const langHref = otherLocaleHref(lang, route);
  const langAria = isBn ? c.toEnglish : c.toBangla;

  // "#launch" is a section of the home page, not a route of its own.
  const dest = p => (p.startsWith("#") ? `${L("/")}${p}` : L(p));

  const toggleOpen = () => { clearTimeout(closeT.current); setPv("tour"); setOpen(o => !o); };
  const openMenu = () => { clearTimeout(closeT.current); if (!open) { setPv("tour"); setOpen(true); } };
  const scheduleClose = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => { setOpen(false); setPv("tour"); }, 260); };
  const close = () => { clearTimeout(closeT.current); setOpen(false); setPv("tour"); };

  const link = key =>
    active === key
      ? { fontSize: 13.5, fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 2, ...T.label }
      : { fontSize: 13.5, fontWeight: 600, color: "#6B6D60", ...T.label };
  const seg = on => ({
    padding: "5px 11px", borderRadius: 99, fontSize: 11.5, fontWeight: 700,
    ...(on ? { background: "#1A1D12", color: "#C6F035" } : { color: "#6B6D60" }),
  });
  const prodActive = ["store", "store-studio", "grow", "ads", "front-office", "supplier"].includes(active);

  const startItems = START_KEYS.map(k => ({ ...k, ...c.startItems[k.mono] }));
  const novaItems = NOVA_KEYS.map(k => ({ ...k, ...c.novaItems[k.mono] }));
  const buildItems = BUILD_KEYS.map(k => ({ ...k, ...c.buildItems[k.mono] }));

  const preview = c.previews[pv] ? pv : "tour";

  const PREVIEW_HREF = {
    tour: `${L("/")}#rooms`,
    store: `${L("/")}#launch`,
    switch: L("/switch"),
    supplier: SUPPLIER_HREF,
    nova: L("/nova"),
    novahq: NOVA_HQ_HREF,
    front: L("/front-office"),
    complete: L("/store"),
    studio: L("/store-studio"),
    grow: L("/grow"),
    ads: L("/ads"),
  };

  const colTitle = { fontFamily: MONO, fontSize: 8.5, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45", padding: "0 10px" };
  const badge = (bg, color, size) => ({
    width: size, height: size, borderRadius: size === 34 ? 11 : 12, background: bg, color,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: MONO, fontSize: size === 34 ? 10.5 : 11, fontWeight: 600, flexShrink: 0,
  });

  // One menu row: mono badge + name + one-liner, and it drives the preview card.
  const Item = ({ it, badgeStyle, pad, nameSize, descSize }) => (
    <a
      href={dest(it.href)}
      className="hv-bg-f0efe4"
      onMouseEnter={() => setPv(it.pv)}
      onFocus={() => setPv(it.pv)}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: pad, borderRadius: 14 }}
    >
      <span style={badgeStyle}>{it.mono}</span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: nameSize, fontWeight: 700, ...T.label }}>{it.n}</span>
        <span style={{ display: "block", fontSize: descSize, color: "#6B6D60", marginTop: 1, ...T.chip }}>{it.d}</span>
      </span>
    </a>
  );

  // `nav-lang` is display:none under 900px (responsive.css) — the mobile panel
  // renders its own unclassed copy, so the switch is reachable on phones too.
  const LangSwitch = ({ className }) => (
    <a
      href={langHref}
      hrefLang={isBn ? "en" : "bn"}
      aria-label={langAria}
      className={className}
      style={{ display: "flex", padding: 3, borderRadius: 99, background: "rgba(26,29,18,0.07)", cursor: "pointer", fontSize: 11.5, fontWeight: 700 }}
    >
      <span style={seg(!isBn)}>EN</span><span style={seg(isBn)}>বাং</span>
    </a>
  );

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", position: "relative", backdropFilter: "blur(10px)", background: "rgba(239,241,233,0.88)", borderBottom: "1px solid rgba(26,29,18,0.06)", ...style }}>
      <LogoDefs mkId="nv-mk" wmId="nv-wm" />

      <div className="nav-row" style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", gap: 24 }}>
        <a href={L("/")} aria-label={c.homeAria} style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
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
            {c.explore}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform .18s ease", ...(open ? { transform: "rotate(180deg)" } : {}) }}><path d="M6 9l6 6 6-6" /></svg>
          </div>
          <a href={L("/nova")} className="hv-ink" style={link("nova")}>{c.nova}</a>
          <a href={L("/switch")} className="hv-ink" style={link("switch")}>{c.switch}</a>
          <a href={L("/pricing")} className="hv-ink" style={link("pricing")}>{c.pricing}</a>
        </div>
        <LangSwitch className="nav-lang" />
        <a href={LOGIN_URL} className="nav-login" style={{ fontSize: 14, fontWeight: 600, color: "#1A1D12", ...T.label }}>{c.login}</a>
        <a href={ctaHref} className="hv-up1 m-nav-cta" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap", ...T.label }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "nvPulse 2.2s infinite" }} />{ctaLabel || c.cta}
        </a>
        <button
          type="button"
          className="nav-burger"
          aria-label={mobileOpen ? c.closeMenu : c.openMenu}
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px 2px" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.languageLabel}</span>
              <LangSwitch />
            </div>
            <div className="nav-mobile-label">{MONO_LABELS.navStart}</div>
            {startItems.map(it => <a key={it.mono} href={dest(it.href)} style={T.label}><span style={{ ...badge("#C6F035", "#1A1D12", 30), borderRadius: 10, fontSize: 10 }}>{it.mono}</span>{it.n}</a>)}
            <div className="nav-mobile-label">{MONO_LABELS.navNova}</div>
            {novaItems.map(it => <a key={it.mono} href={dest(it.href)} style={T.label}><span style={{ ...badge("#14170E", "#C6F035", 30), borderRadius: 10, fontSize: 10 }}>{it.mono}</span>{it.n}</a>)}
            <div className="nav-mobile-label">{MONO_LABELS.navBuild}</div>
            {buildItems.map(it => <a key={it.mono} href={dest(it.href)} style={T.label}><span style={{ ...badge("#EEF4D4", "#3A5212", 30), borderRadius: 10, fontSize: 10 }}>{it.mono}</span>{it.n}</a>)}
            <div className="nav-mobile-divider" />
            <a href={L("/nova")} style={T.label}>{c.nova}</a>
            <a href={L("/switch")} style={T.label}>{c.switch}</a>
            <a href={L("/pricing")} style={T.label}>{c.pricing}</a>
            <div className="nav-mobile-divider" />
            <a href={L("/about")} style={T.label}>{c.about}</a>
            <a href={L("/blog")} style={T.label}>{c.blog}</a>
            <a href={L("/contact")} style={T.label}>{c.contact}</a>
            <div className="nav-mobile-divider" />
            <a href={LOGIN_URL} style={T.label}>{c.login}</a>
          </div>
        </div>
      ) : null}

      {open ? (
        <>
          <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: -1 }} />
          <div onMouseEnter={openMenu} onMouseLeave={scheduleClose} style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "10px 28px 0" }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 1150, margin: "0 auto", borderRadius: 24, background: "#FBFBF4", border: "1px solid rgba(26,29,18,0.08)", boxShadow: "0 34px 80px rgba(26,29,18,0.22)", padding: 22, display: "grid", gridTemplateColumns: "0.95fr 0.95fr 1.02fr 1.05fr", gap: 16, animation: "nvDrop .18s ease both" }}>
              <div>
                <div style={colTitle}>{MONO_LABELS.navStart}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 10 }}>
                  {startItems.map(it => (
                    <Item key={it.mono} it={it} badgeStyle={badge("#C6F035", "#1A1D12", 38)} pad={10} nameSize={13.5} descSize={11} />
                  ))}
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(26,29,18,0.07)", paddingLeft: 16 }}>
                <div style={colTitle}>{MONO_LABELS.navNova}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 10 }}>
                  {novaItems.map(it => (
                    <Item key={it.mono} it={it} badgeStyle={badge("#14170E", "#C6F035", 38)} pad={10} nameSize={13.5} descSize={11} />
                  ))}
                </div>
              </div>
              <div style={{ borderLeft: "1px solid rgba(26,29,18,0.07)", paddingLeft: 16 }}>
                <div style={colTitle}>{MONO_LABELS.navBuild}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 10 }}>
                  {buildItems.map(it => (
                    <Item key={it.mono} it={it} badgeStyle={badge("#EEF4D4", "#3A5212", 34)} pad="8px 10px" nameSize={13} descSize={10.5} />
                  ))}
                </div>
              </div>
              <a href={PREVIEW_HREF[preview]} className="hv-up2" style={{ display: "flex", flexDirection: "column", borderRadius: 16, background: "#0F120B", color: "#E9EFDC", padding: 16, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", flexShrink: 0 }} />
                  <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>{PREVIEW_MONO[preview]}</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 7, margin: "12px 0" }}>
                  <NavPreview pv={preview} copy={c.previews} T={T} />
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: "#C6F035", ...T.label }}>
                  {c.previews[preview].cta} <ArrowIcon />
                </div>
              </a>
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 16, padding: "12px 10px 2px", borderTop: "1px solid rgba(26,29,18,0.08)", flexWrap: "wrap" }}>
                <span style={{ fontFamily: MONO, fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", color: "#878B76" }}>{MONO_LABELS.navCompany}</span>
                <a href={L("/about")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.about}</a>
                <a href={L("/blog")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.blog}</a>
                <a href={L("/contact")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.contact}</a>
                <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#878B76" }}>{MONO_LABELS.navRegion}</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
