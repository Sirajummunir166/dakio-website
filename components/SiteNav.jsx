"use client";

// Sticky blurred cream bar with the Explore mega-menu.
// Hover-open with 260ms close grace, click toggles (touch), outside-click
// closes, caret rotates; active page gets the lime underline.
//
// Explore is built for a visitor who is still deciding: one column per kind of
// business (shops, services), then Nova and the rest. Every item says what the
// owner gets and links to the page section that shows it. The fourth column is
// a light preview card: before you point at anything it asks which business you
// run; on hover it shows that item's real app screen (public/app) and one line.
// The phone sheet uses the same groups.
//
// Localized: copy arrives as a prop (chrome.<lang>.js), internal links go
// through href(lang, …), and the EN/বাং switch is a real <a> to the same page
// in the other locale — not client state — so both locales are crawlable.
//
// Routes are <Link> so navigation stays client-side. Two things stay plain
// anchors on purpose: the app subdomain and the EN/বাং switch — [lang] is the
// root layout's own segment, so a locale change is a new document either way,
// and a hard nav keeps <html lang> honest.

import Link from "next/link";
import SmartLink from "./SmartLink";
import { useEffect, useRef, useState } from "react";
import LogoDefs from "./Logo";
import NavCard from "./NavCard";
import { LOGIN_URL, REGISTER_URL } from "../lib/urls";
import { href, otherLocaleHref } from "../lib/i18n";
import chromeEn from "../content/copy/chrome.en";
import { type } from "../lib/type";

// Small line icons for the menu rows (24px grid, drawn with currentColor).
const ICONS = {
  chat: "M4 5h16v11H9l-5 4z",
  shield: "M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM9 12l2 2 4-4",
  truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
  box: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5",
  bell: "M6 16V11a6 6 0 0112 0v5l2 2H4zM10 21h4",
  team: "M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5M16 4.5a3.5 3.5 0 010 6.5M18 14.8c2 .7 3.2 2.5 3.5 5.2",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3",
  funnel: "M3 4h18l-7 8v6l-4 2v-8z",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 2-2 5 5M15.5 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  pen: "M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
  move: "M4 8h13l-3-3M20 16H7l3 3",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
};

// group · its own page · rows (copy key, destination, icon, app screen)
const GROUPS = [
  {
    key: "shops", page: "/shops", items: [
      { k: "inbox", href: "/front-office", icon: "chat", shot: "shop-inbox" },
      { k: "fake", href: "/shops#fake", icon: "shield", shot: "shop-risk" },
      { k: "courier", href: "/shops#courier", icon: "truck", shot: "shop-couriers" },
      { k: "website", href: "/themes", icon: "globe", shot: "shop-website" },
      { k: "stock", href: "/shops#stock", icon: "box", shot: "shop-dropship" },
    ],
  },
  {
    key: "services", page: "/services", items: [
      { k: "bookings", href: "/services#missed", icon: "calendar", shot: "svc-booking" },
      { k: "noshow", href: "/services#noshow", icon: "bell", shot: "svc-reminder" },
      { k: "team", href: "/services#team", icon: "team", shot: "svc-calendar" },
      { k: "paid", href: "/services#paid", icon: "receipt", shot: "svc-paid" },
      { k: "pipeline", href: "/services#pipeline", icon: "funnel", shot: "svc-pipeline" },
    ],
  },
  {
    key: "more", page: null, items: [
      { k: "nova", href: "/nova", icon: "spark", shot: "nav-nova" },
      { k: "ads", href: "/ads", icon: "image", shot: "nav-ads" },
      { k: "posts", href: "/grow", icon: "pen", shot: "nav-posts" },
      { k: "switch", href: "/switch", icon: "move", shot: "nav-switch" },
      { k: "developers", href: "/developers", icon: "code", shot: null },
    ],
  },
];

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

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
  // "Open your store" goes straight to signup; pages that repurpose the nav
  // CTA (switch "Plan my switch" → #cta, pricing → #plans) pass their own href.
  ctaHref = REGISTER_URL,
  ctaLabel,
  style,
}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pv, setPv] = useState(null); // the menu row being pointed at

  const closeT = useRef(null);
  const rootRef = useRef(null);
  // The phone sheet mirrors the desktop bar: Explore (collapsible, the same
  // three groups as the mega-menu) → the top-level links → company row, with
  // language + Log in + the CTA pinned at the bottom so they never need a scroll.
  const [exploreOpen, setExploreOpen] = useState(false);
  const [barBottom, setBarBottom] = useState(64);

  const toggleMobile = () => {
    if (!mobileOpen && rootRef.current) {
      setBarBottom(Math.max(0, rootRef.current.getBoundingClientRect().bottom));
      setExploreOpen(false);
    }
    setMobileOpen(o => !o);
  };

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // The Talk to Nova launcher sits over the sheet's Get started button.
    document.body.classList.add("nav-sheet-open");
    const onKey = e => { if (e.key === "Escape") setMobileOpen(false); };
    const onResize = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.body.classList.remove("nav-sheet-open");
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const c = copy || chromeEn.nav;
  const T = type(lang);
  const L = p => href(lang, p);
  const isBn = lang === "bn";
  const langHref = otherLocaleHref(lang, route);
  const langAria = isBn ? c.toEnglish : c.toBangla;

  // "/shops#fake" → the localized page plus the section.
  const dest = p => {
    const [path, hash] = p.split("#");
    return hash ? `${L(path || "/")}#${hash}` : L(path);
  };

  const toggleOpen = () => { clearTimeout(closeT.current); setPv(null); setOpen(o => !o); };
  const openMenu = () => { clearTimeout(closeT.current); if (!open) { setPv(null); setOpen(true); } };
  const scheduleClose = () => { clearTimeout(closeT.current); closeT.current = setTimeout(() => { setOpen(false); setPv(null); }, 260); };
  const close = () => { clearTimeout(closeT.current); setOpen(false); setPv(null); };

  const link = key =>
    active === key
      ? { fontSize: 13.5, fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 2, ...T.label }
      : { fontSize: 13.5, fontWeight: 600, color: "#6B6D60", ...T.label };
  const seg = on => ({
    padding: "5px 11px", borderRadius: 99, fontSize: 11.5, fontWeight: 700,
    ...(on ? { background: "#1A1D12", color: "#C6F035" } : { color: "#6B6D60" }),
  });
  const prodActive = ["store", "store-studio", "grow", "ads", "front-office", "themes", "developers", "switch"].includes(active);

  const groups = GROUPS.map(g => ({
    ...g,
    copy: c.groups[g.key],
    items: g.items.map(it => ({ ...it, ...c.groups[g.key].items[it.k] })),
  }));
  const hovered = groups.flatMap(g => g.items).find(it => it.k === pv) || null;

  const colTitle = { display: "flex", alignItems: "baseline", gap: 8, padding: "0 10px", fontSize: 13, fontWeight: 800, color: "#1A1D12", ...T.label };
  const colSub = { display: "block", padding: "2px 10px 0", fontSize: 11.5, color: "#878B76", ...T.chip };
  const badge = size => ({
    width: size, height: size, borderRadius: 10, background: "#EEF4D4", color: "#3A5212",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  });

  // One menu row: icon + what you get + one line; it drives the preview card.
  const Item = ({ it }) => (
    <SmartLink
      href={dest(it.href)}
      className="hv-bg-f0efe4"
      onMouseEnter={() => setPv(it.k)}
      onFocus={() => setPv(it.k)}
      style={{ display: "flex", alignItems: "center", gap: 11, padding: "7px 10px", borderRadius: 12 }}
    >
      <span style={badge(32)}><Icon name={it.icon} size={17} /></span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 13, fontWeight: 700, ...T.label }}>{it.n}</span>
        <span style={{ display: "block", fontSize: 11, color: "#6B6D60", marginTop: 1, ...T.chip }}>{it.d}</span>
      </span>
    </SmartLink>
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
    <div ref={rootRef} style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", position: "relative", backdropFilter: "blur(10px)", background: "rgba(239,241,233,0.88)", borderBottom: "1px solid rgba(26,29,18,0.06)", ...style }}>
      <LogoDefs mkId="nv-mk" wmId="nv-wm" />

      <div className="nav-row" style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 28px", display: "flex", alignItems: "center", gap: 24 }}>
        <Link href={L("/")} aria-label={c.homeAria} style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
          <svg width="26" height="26" viewBox="0 5.4 23 23" style={{ color: "#1A1D12" }}><use href="#nv-mk" /></svg>
          <svg width="88" height="25" viewBox="31 0 104 29" style={{ color: "#1A1D12" }}><use href="#nv-wm" /></svg>
        </Link>
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
          <Link href={L("/shops")} className="hv-ink" style={link("shops")}>{c.shops}</Link>
          <Link href={L("/services")} className="hv-ink" style={link("services")}>{c.services}</Link>
          <Link href={L("/nova")} className="hv-ink" style={link("nova")}>{c.nova}</Link>
          <Link href={L("/pricing")} className="hv-ink" style={link("pricing")}>{c.pricing}</Link>
        </div>
        <LangSwitch className="nav-lang" />
        <a href={LOGIN_URL} className="nav-login" style={{ fontSize: 14, fontWeight: 600, color: "#1A1D12", ...T.label }}>{c.login}</a>
        <SmartLink href={ctaHref} className="hv-up1 m-nav-cta" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 13.5, fontWeight: 700, whiteSpace: "nowrap", ...T.label }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "nvPulse 2.2s infinite" }} />{ctaLabel || c.cta}
        </SmartLink>
        <button
          type="button"
          className="nav-burger"
          aria-label={mobileOpen ? c.closeMenu : c.openMenu}
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          {mobileOpen ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="nav-mobile-panel"
          style={{ height: `calc(100dvh - ${barBottom}px)` }}
          onClick={e => { if (e.target.closest("a")) setMobileOpen(false); }}
        >
          <div className="nav-m-scroll">
            <button
              type="button"
              className={`nav-m-row${prodActive ? " is-active" : ""}`}
              aria-expanded={exploreOpen}
              onClick={() => setExploreOpen(o => !o)}
              style={T.label}
            >
              {c.explore}
              <svg className="nav-m-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={exploreOpen ? { transform: "rotate(180deg)" } : undefined}><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {exploreOpen ? (
              <div className="nav-m-explore">
                {groups.map(g => (
                  <div key={g.key}>
                    <div className="nav-m-label" style={T.label}>
                      {g.page ? <Link href={L(g.page)}>{g.copy.title} <ArrowIcon size={11} /></Link> : g.copy.title}
                    </div>
                    {g.items.map(it => (
                      <SmartLink key={it.k} href={dest(it.href)} className="nav-m-item">
                        <span style={badge(34)}><Icon name={it.icon} /></span>
                        <span style={{ minWidth: 0 }}>
                          <span className="nav-m-item-n" style={T.label}>{it.n}</span>
                          <span className="nav-m-item-d" style={T.chip}>{it.d}</span>
                        </span>
                      </SmartLink>
                    ))}
                  </div>
                ))}
              </div>
            ) : null}
            {[
              { key: "shops", p: "/shops", label: c.shops },
              { key: "services", p: "/services", label: c.services },
              { key: "nova", p: "/nova", label: c.nova },
              { key: "pricing", p: "/pricing", label: c.pricing },
            ].map(r => (
              <Link key={r.key} href={L(r.p)} className={`nav-m-row${active === r.key ? " is-active" : ""}`} style={T.label}>
                {r.label}<ArrowIcon size={15} />
              </Link>
            ))}
            <div className="nav-m-company">
              <span style={T.chip}>{c.company}</span>
              <Link href={L("/about")} style={T.label}>{c.about}</Link>
              <Link href={L("/blog")} style={T.label}>{c.blog}</Link>
              <Link href={L("/contact")} style={T.label}>{c.contact}</Link>
            </div>
          </div>
          <div className="nav-m-foot">
            <div className="nav-m-foot-meta">
              <span style={T.chip}>{c.region}</span>
              <LangSwitch />
            </div>
            <div className="nav-m-actions">
              <a href={LOGIN_URL} className="nav-m-btn nav-m-btn--ghost" style={T.label}>{c.login}</a>
              <SmartLink href={ctaHref} className="nav-m-btn nav-m-btn--ink" style={T.label}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "nvPulse 2.2s infinite", flexShrink: 0 }} />{ctaLabel || c.cta}
              </SmartLink>
            </div>
          </div>
        </div>
      ) : null}

      {open ? (
        <>
          <div onClick={close} style={{ position: "fixed", inset: 0, zIndex: -1 }} />
          <div onMouseEnter={openMenu} onMouseLeave={scheduleClose} style={{ position: "absolute", top: "100%", left: 0, right: 0, padding: "10px 28px 0" }}>
            <div onClick={e => e.stopPropagation()} style={{ maxWidth: 1150, margin: "0 auto", borderRadius: 24, background: "#FBFBF4", border: "1px solid rgba(26,29,18,0.08)", boxShadow: "0 34px 80px rgba(26,29,18,0.22)", padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.2fr", gap: 14, animation: "nvDrop .18s ease both" }}>
              {groups.map((g, i) => (
                <div key={g.key} style={i ? { borderLeft: "1px solid rgba(26,29,18,0.07)", paddingLeft: 14 } : undefined}>
                  {g.page ? (
                    <Link href={L(g.page)} className="hv-ink" style={colTitle}>{g.copy.title} <ArrowIcon size={11} /></Link>
                  ) : (
                    <div style={colTitle}>{g.copy.title}</div>
                  )}
                  <span style={colSub}>{g.copy.sub}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 1, marginTop: 8 }}>
                    {g.items.map(it => <Item key={it.k} it={it} />)}
                  </div>
                </div>
              ))}
              <NavCard it={hovered} c={c} T={T} L={L} dest={dest} />
              <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 16, padding: "12px 10px 2px", borderTop: "1px solid rgba(26,29,18,0.08)", flexWrap: "wrap" }}>
                <Link href={L("/pricing")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#1A1D12", ...T.label }}>{c.pricing}</Link>
                <Link href={L("/about")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.about}</Link>
                <Link href={L("/blog")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.blog}</Link>
                <Link href={L("/contact")} className="hv-ink" style={{ fontSize: 12.5, fontWeight: 700, color: "#6B6D60", ...T.label }}>{c.contact}</Link>
                <span style={{ marginLeft: "auto", fontSize: 11.5, color: "#878B76", ...T.chip }}>{c.region}</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
