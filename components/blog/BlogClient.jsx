"use client";

// Blog — layout is the 1:1 port of "Dakio Blog.dc.html"; posts now come from
// the MDX registry (lib/blog) via props, and cards link to /blog/[slug].
// Client component for the category filter only.

import { useState } from "react";
import SiteNav from "../SiteNav";
import SiteFooter from "../SiteFooter";
import LogoDefs from "../Logo";

const THUMBS = [
  { bg: "#E8E6DA", mark: "rgba(26,29,18,0.18)" },
  { bg: "rgba(198,240,53,0.4)", mark: "rgba(26,29,18,0.22)" },
  { bg: "#1A1D12", mark: "rgba(198,240,53,0.3)" },
];

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function BlogClient({ posts, categories, formattedDates }) {
  const [filter, setFilter] = useState("সব");

  const filtered = posts.filter(p => filter === "সব" || p.category === filter);
  const featured = filter === "সব" ? posts.find(p => p.featured) || posts[0] : null;
  const grid = featured ? filtered.filter(p => p.slug !== featured.slug) : filtered;

  return (
    <div className="company-root" style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav ctaHref="/#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "76px 28px 40px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 720, height: 380, background: "radial-gradient(closest-side, rgba(198,240,53,0.4), rgba(198,240,53,0) 100%)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12.5, fontWeight: 600, color: "#3E7A45", animation: "heroUp .6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#3E7A45", animation: "pulseRingGreen 2.2s infinite" }} />Blog
          </div>
          <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 54, lineHeight: 1.05, letterSpacing: "-2.1px", fontWeight: 800, animation: "heroUp .6s .08s ease both" }}>
            Resources &amp; <span style={{ position: "relative", whiteSpace: "nowrap" }}>Insights<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 12, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>
          </h1>
          <p style={{ margin: "18px auto 0", fontSize: 16.5, lineHeight: 1.7, color: "#6B6D60", maxWidth: 460, animation: "heroUp .6s .16s ease both" }}>ই-কমার্স ব্যবসা বাড়ানোর টিপস, গাইড এবং কৌশল — সরাসরি Dakio টিম থেকে।</p>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px 28px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {categories.map(label => (
          <button
            key={label}
            onClick={() => setFilter(label)}
            style={label === filter
              ? { padding: "9px 18px", borderRadius: 99, border: "none", background: "#1A1D12", color: "#F4F2EA", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }
              : { padding: "9px 18px", borderRadius: 99, border: "1px solid rgba(26,29,18,0.14)", background: "#FBFAF5", color: "#6B6D60", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* FEATURED */}
      {featured ? (
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px 14px" }}>
          <a href={`/blog/${featured.slug}`} className="hv-up3 m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 26, background: "#1A1D12", color: "#F0EFE6", overflow: "hidden", minHeight: 320 }}>
            <div style={{ position: "relative", background: "linear-gradient(135deg, #2a2e1f, #1A1D12)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
              <svg width="110" height="110" viewBox="0 5.4 23 23" style={{ color: "rgba(198,240,53,0.25)" }}><use href="#mk" /></svg>
              <span style={{ position: "absolute", top: 18, left: 18, padding: "6px 13px", borderRadius: 99, background: "rgba(198,240,53,0.16)", color: "#C6F035", fontSize: 11.5, fontWeight: 600 }}>{featured.category}</span>
            </div>
            <div style={{ padding: "40px 42px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 12.5, color: "rgba(240,239,230,0.55)", fontWeight: 600 }}>{formattedDates[featured.slug]} &nbsp;·&nbsp; {featured.mins} min read</div>
              <div style={{ marginTop: 14, fontSize: 27, fontWeight: 750, letterSpacing: "-0.5px", lineHeight: 1.35, color: "#fff" }}>{featured.title}</div>
              <div style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.7, color: "rgba(240,239,230,0.6)" }}>{featured.excerpt}</div>
              <span style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: "#C6F035" }}>পড়ুন <Arrow /></span>
            </div>
          </a>
        </div>
      ) : null}

      {/* GRID */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "14px 28px 20px" }}>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {grid.map((p, i) => {
            const t = THUMBS[i % 3];
            return (
              <a key={p.slug} href={`/blog/${p.slug}`} className="hv-up3" style={{ display: "flex", flexDirection: "column", borderRadius: 22, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)", overflow: "hidden" }}>
                <div style={{ position: "relative", height: 150, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="54" height="54" viewBox="0 5.4 23 23" style={{ color: t.mark }}><use href="#mk" /></svg>
                  <span style={{ position: "absolute", top: 14, left: 14, padding: "5px 11px", borderRadius: 99, background: "rgba(251,250,245,0.9)", color: "#1A1D12", fontSize: 10.5, fontWeight: 600 }}>{p.category}</span>
                </div>
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600 }}>{formattedDates[p.slug]} &nbsp;·&nbsp; {p.mins} min</div>
                  <div style={{ marginTop: 9, fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.2px", lineHeight: 1.45 }}>{p.title}</div>
                  <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.65, color: "#6B6D60", flex: 1 }}>{p.excerpt}</div>
                  <span style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#3E7A45" }}>পড়ুন <Arrow size={13} /></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1160, margin: "56px auto 0", padding: "0 28px" }}>
        <div className="m-pad-cta m-bleed" style={{ borderRadius: 32, background: "#C6F035", padding: "52px 40px", textAlign: "center" }}>
          <h2 className="m-h2b" style={{ margin: "0 auto", fontSize: 38, lineHeight: 1.1, letterSpacing: "-1.4px", fontWeight: 800, maxWidth: 560 }}>পড়া শেষ? এবার শুরু করুন।</h2>
          <p style={{ margin: "14px auto 0", fontSize: 15.5, color: "#1A1D12", maxWidth: 420, lineHeight: 1.65 }}>ফ্রি অ্যাকাউন্ট খুলুন — কোনো ক্রেডিট কার্ড লাগবে না।</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
            <a href="/#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 26px", borderRadius: 10, background: "#1A1D12", color: "#F4F2EA", fontSize: 15, fontWeight: 700 }}>
              Start selling free <Arrow size={15} />
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <SiteFooter />
      </div>
    </div>
  );
}
