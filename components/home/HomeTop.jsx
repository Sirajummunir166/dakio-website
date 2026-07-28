"use client";

// Home nav + dark hero. Client boundary because the EN/বাং toggle in SiteNav
// swaps the hero copy (and only the hero copy) — state shared between the two.

import { useState } from "react";
import SiteNav from "../SiteNav";

const MONO = "var(--dk-font-mono), monospace";
const BN = "var(--dk-font-bn), sans-serif";

const CHIP_POS = [
  { top: 24, right: -6, delay: "0s" },
  { top: 150, left: -30, delay: "-4s" },
  { bottom: 64, right: 2, delay: "-8s" },
];

const HERO_CHIPS = [
  "84 messages answered",
  "Cart recovered · ৳2,300",
  "Weak ad set paused",
];

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomeTop() {
  const [lang, setLang] = useState("en");
  const isBn = lang === "bn";

  return (
    <>
      <SiteNav
        active="home"
        lang={lang}
        onToggleLang={() => setLang(isBn ? "en" : "bn")}
        ctaHref="#cta"
        style={{ position: "sticky", top: 0, zIndex: 60 }}
      />

      <div style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
        <div style={{ position: "relative", borderRadius: 36, background: "#0F120B", color: "#E9EFDC", overflow: "hidden", padding: "84px 64px 76px" }}>
          <div style={{ position: "absolute", top: -220, right: -140, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(198,240,53,0.22), rgba(198,240,53,0))" }} />
          <div style={{ position: "absolute", bottom: -260, left: -120, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(198,240,53,0.12), rgba(198,240,53,0))" }} />
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, border: "1px solid rgba(198,240,53,0.35)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#C6F035", animation: "heroUp .6s ease both" }}>
                <span style={{ position: "relative", width: 7, height: 7, borderRadius: 99, background: "#C6F035" }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: 99, background: "#C6F035", animation: "ping 2.2s ease-out infinite" }} />
                </span>
                THE COMMERCE OS FOR BANGLADESH
              </div>
              {!isBn ? (
                <>
                  <h1 style={{ margin: "24px 0 0", fontSize: 68, lineHeight: 1.02, letterSpacing: "-2.8px", fontWeight: 800, color: "#FBFBF4", animation: "heroUp .6s .08s ease both" }}>
                    Appoint a CEO<br />to your store<span style={{ color: "#C6F035" }}>.</span>
                  </h1>
                  <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.6, color: "#A9AD98", maxWidth: 440, animation: "heroUp .6s .16s ease both" }}>
                    Store, couriers, payments — and <b style={{ color: "#E9EFDC" }}>Nova</b>, an AI CEO that runs it all. Even while you sleep.
                  </p>
                  <div style={{ display: "flex", gap: 12, marginTop: 32, animation: "heroUp .6s .24s ease both" }}>
                    <a href="#cta" className="hv-up2-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 15, fontWeight: 700 }}>
                      Appoint Nova <Arrow />
                    </a>
                    <a href="#rooms" className="hv-bg-wash07" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.25)", color: "#E9EFDC", fontSize: 15, fontWeight: 700 }}>
                      Open your store
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <h1 style={{ margin: "24px 0 0", fontFamily: BN, fontSize: 58, lineHeight: 1.15, letterSpacing: "-1px", fontWeight: 800, color: "#FBFBF4", animation: "heroUp .6s .08s ease both" }}>
                    আপনার দোকানে<br />একজন CEO নিয়োগ দিন<span style={{ color: "#C6F035" }}>।</span>
                  </h1>
                  <p style={{ margin: "22px 0 0", fontFamily: BN, fontSize: 17, lineHeight: 1.7, color: "#A9AD98", maxWidth: 440, animation: "heroUp .6s .16s ease both" }}>
                    স্টোর, কুরিয়ার, পেমেন্ট — আর <b style={{ color: "#E9EFDC" }}>Nova</b>, আপনার AI CEO। আপনি ঘুমালেও ব্যবসা চলে।
                  </p>
                  <div style={{ display: "flex", gap: 12, marginTop: 32, animation: "heroUp .6s .24s ease both" }}>
                    <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontFamily: BN, fontSize: 15, fontWeight: 700 }}>
                      Nova নিয়োগ দিন <Arrow />
                    </a>
                    <a href="#rooms" className="hv-bg-wash07" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.25)", color: "#E9EFDC", fontFamily: BN, fontSize: 15, fontWeight: 700 }}>
                      স্টোর খুলুন
                    </a>
                  </div>
                </>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 30, animation: "heroUp .6s .32s ease both", fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em", color: "#878B76" }}>
                <span>NO CODE</span><span style={{ opacity: 0.4 }}>·</span><span>NO INVENTORY</span><span style={{ opacity: 0.4 }}>·</span><span>৳ · bKASH · COD</span>
              </div>
            </div>
            {/* Nova orb + live work chips */}
            <div style={{ position: "relative", height: 420, animation: "heroUp .7s .2s ease both" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 340, height: 340 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(198,242,62,0.22)" }} />
                <div style={{ position: "absolute", inset: 34, borderRadius: "50%", border: "1px dashed rgba(198,242,62,0.18)", animation: "orbitccw 40s linear infinite" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "conic-gradient(from 0deg, rgba(198,242,62,0) 0deg, rgba(198,242,62,0) 285deg, rgba(198,242,62,0.5) 345deg, #C6F035 360deg)", animation: "orbitcw 4s linear infinite" }} />
                <div style={{ position: "absolute", inset: 6, borderRadius: "50%", background: "#0F120B" }} />
                <div style={{ position: "absolute", inset: 96, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6 0%, #C6F035 40%, #6FA524 75%, #2E4710 100%)", animation: "breathe 5s ease-in-out infinite", boxShadow: "0 0 80px rgba(198,240,53,0.35)" }} />
                <div style={{ position: "absolute", left: "50%", bottom: 112, transform: "translateX(-50%)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.22em", color: "#0F120B" }}>NOVA</div>
              </div>
              {HERO_CHIPS.map((t, i) => (
                <div key={t} style={{ position: "absolute", ...CHIP_POS[i], animation: "stepIn 12s ease-in-out infinite", animationDelay: CHIP_POS[i].delay }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "11px 15px", borderRadius: 14, background: "#14170E", border: "1px solid rgba(198,242,62,0.25)", boxShadow: "0 18px 40px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#E9EFDC" }}>{t}</span>
                    <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#8CBF33", border: "1px solid rgba(140,191,51,0.4)", borderRadius: 99, padding: "2.5px 7px" }}>RECEIPT</span>
                  </div>
                </div>
              ))}
              <div style={{ position: "absolute", left: "50%", bottom: 6, transform: "translateX(-50%)", fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", color: "#878B76", whiteSpace: "nowrap" }}>ON DUTY 24/7 · EVERY ACTION AUDITABLE</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
