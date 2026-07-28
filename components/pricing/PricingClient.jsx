"use client";

// Pricing — 1:1 port of "Dakio Pricing.dc.html". Client component because the
// Monthly/Annual toggle reprices the plan cards (৳1,490→৳1,242, ৳3,990→৳3,325,
// "billed ৳…/year"). Prerendered HTML ships the Monthly default.

import { useState } from "react";
import SiteNav from "../SiteNav";
import SiteFooter from "../SiteFooter";
import Reveal from "../Reveal";
import LogoDefs from "../Logo";
import { REGISTER_URL } from "../../lib/urls";

const MONO = "var(--dk-font-mono), monospace";

const PLANS = [
  {
    n: "Starter", level: "NOVA L0–L1 ADVISOR", audience: "Get online, meet Nova",
    prMo: "Free", prYr: "Free", sub: "forever", noteMo: "no card needed", noteYr: "no card needed",
    cta: "Start free", dark: false, pop: false,
    feats: ["Store + Store Studio & theme gallery", "Orders, couriers & COD · bKash · Nagad", "Nova Advisor — 50 tasks/mo", "Morning brief, read-only", "Up to 30 products"],
  },
  {
    n: "Growth", level: "NOVA L3 OPERATOR", audience: "The default for running shops",
    prMo: "৳1,490", prYr: "৳1,242", sub: "/month", noteMo: "billed monthly", noteYr: "billed ৳14,900/year",
    cta: "Choose Growth", dark: false, pop: true,
    feats: ["Everything in Starter, unlimited products", "Nova Operator — 750 tasks/mo", "Grow Labs + Supplier Network", "Ads Gallery — static exports", "Decision desk, receipts & undo"],
  },
  {
    n: "Business", level: "NOVA L4 ACTING CEO", audience: "The full CEO seat",
    prMo: "৳3,990", prYr: "৳3,325", sub: "/month", noteMo: "billed monthly", noteYr: "billed ৳39,900/year",
    cta: "Start 14-day free trial", dark: true, pop: false,
    feats: ["Everything in Growth", "Acting CEO — 2,500 tasks/mo", "60 Nova voice minutes — briefs, alerts, COD confirms", "Seasonal playbooks (Eid, Puja, 11.11)", "Motion ad renders + staff logins", "Concierge migration included"],
  },
];

const TASK_CHIPS = ["Customer reply answered", "Listing written from a photo", "Ad creative generated", "Abandoned cart recovered", "Reorder drafted"];

const FAQ = [
  { q: "Why not unlimited AI?", a: "Nova does real work on real compute — unlimited would mean either fake AI or hidden throttling. We'd rather sell you an honest meter with receipts than a soft lie." },
  { q: "What happens when my tasks run out?", a: "Nova shifts to Draft mode: it keeps preparing everything but executes nothing until you top up (৳250 / 250 tasks) or the month resets. Nothing is lost, nothing is silent." },
  { q: "What do couriers cost?", a: "Per-delivery, passed through at the courier's rate (Steadfast, Pathao, RedX) on every plan — we don't mark up shipping." },
  { q: "I'm not in Bangladesh — can I use Dakio?", a: "Soon. We built for Bangladesh first — ৳, bKash, COD, Bangla — and global markets open next with local pricing, not conversions. Join the waitlist from the signup page." },
];

export default function PricingClient() {
  const [billing, setBilling] = useState("mo");
  const yr = billing === "yr";

  const seg = on => ({
    padding: "9px 18px", borderRadius: 99, cursor: "pointer", fontSize: 13, fontWeight: 700,
    ...(on ? { background: "#1A1D12", color: "#C6F035" } : { color: "#6B6D60" }),
  });

  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav active="pricing" ctaHref="#plans" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 28px 8px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45", animation: "heroUp .6s ease both" }}>৳ BANGLADESH PRICING · GOING GLOBAL SOON</div>
        <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 60, lineHeight: 1.04, letterSpacing: "-2.5px", fontWeight: 800, maxWidth: 780, animation: "heroUp .6s .08s ease both" }}>
          Your whole back office, for less than{" "}
          <span style={{ position: "relative", whiteSpace: "nowrap" }}>one employee<span style={{ position: "absolute", left: 0, right: 0, bottom: 6, height: 14, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>.
        </h1>
        <p style={{ margin: "18px auto 0", fontSize: 16, lineHeight: 1.6, color: "#6B6D60", maxWidth: 480, animation: "heroUp .6s .16s ease both" }}>A shop assistant costs ৳12,000 a month and works ten hours. Nova works around the clock — and every plan includes it.</p>
        <div style={{ display: "inline-flex", padding: 3, borderRadius: 99, background: "#E9EBE0", marginTop: 28, animation: "heroUp .6s .24s ease both" }}>
          <span onClick={() => setBilling("mo")} style={seg(!yr)}>Monthly</span>
          <span onClick={() => setBilling("yr")} style={seg(yr)}>Annual — 2 months free</span>
        </div>
      </div>

      {/* PLANS */}
      <div id="plans" style={{ maxWidth: 1200, margin: "0 auto", padding: "44px 28px 20px" }}>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, alignItems: "stretch" }}>
          {PLANS.map(p => (
            <div key={p.n} style={{ padding: 28, borderRadius: 26, display: "flex", flexDirection: "column", ...(p.dark ? { background: "#0F120B", color: "#E9EFDC", boxShadow: "0 28px 60px rgba(15,18,11,0.3)" } : p.pop ? { background: "#FBFAF5", border: "2px solid #1A1D12" } : { background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.n}</span>
                <span style={{ fontFamily: MONO, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.08em", padding: "4px 9px", borderRadius: 99, ...(p.dark ? { background: "rgba(198,240,53,0.16)", color: "#C6F035" } : { background: "rgba(26,29,18,0.07)", color: "#3E7A45" }) }}>{p.level}</span>
              </div>
              <div style={{ fontSize: 12.5, marginTop: 5, color: p.dark ? "#878B76" : "#6B6D60" }}>{p.audience}</div>
              <div style={{ marginTop: 18, display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px", ...(p.dark ? { color: "#C6F035" } : {}) }}>{yr ? p.prYr : p.prMo}</span>
                <span style={{ fontSize: 13, color: p.dark ? "#878B76" : "#6B6D60" }}>{p.sub}</span>
              </div>
              <div style={{ fontSize: 11.5, marginTop: 3, color: p.dark ? "#878B76" : "#6B6D60" }}>{yr ? p.noteYr : p.noteMo}</div>
              <div style={{ height: 1, margin: "20px 0", background: p.dark ? "rgba(240,239,230,0.12)" : "rgba(26,29,18,0.08)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {p.feats.map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.dark ? "#C6F035" : "#1A1D12"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6L9 17l-5-5" /></svg>
                    <span style={{ fontSize: 13, lineHeight: 1.5, ...(p.dark ? { color: "#E9EFDC" } : {}) }}>{t}</span>
                  </div>
                ))}
              </div>
              <a href={REGISTER_URL} style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 0", borderRadius: 99, fontSize: 14, fontWeight: 700, ...(p.dark ? { background: "#C6F035", color: "#0F120B" } : p.pop ? { background: "#1A1D12", color: "#C6F035" } : { border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12" }) }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#6B6D60" }}>Every new store gets <b style={{ color: "#1A1D12" }}>14 days of Business, free</b> — meet the full CEO before you choose. Courier deliveries billed per shipment on all plans.</div>
      </div>

      {/* WHAT'S A NOVA TASK */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} data-reveal>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>THE METER, IN PLAIN WORDS</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 48, lineHeight: 1.05, letterSpacing: "-1.9px", fontWeight: 800 }}>What&apos;s a Nova task?</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "#6B6D60", maxWidth: 400 }}>One finished piece of work — not a token, not an API call. The Hours-Saved report shows you every task and what it was worth.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
              {TASK_CHIPS.map(t => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12, fontWeight: 700 }}>{t}<span style={{ fontFamily: MONO, fontSize: 7, letterSpacing: "0.08em", color: "#3E7A45" }}>= 1 TASK</span></span>
              ))}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 99, background: "#1A1D12", color: "#F0EFE6", fontSize: 12, fontWeight: 700 }}>Voice call<span style={{ fontFamily: MONO, fontSize: 7, letterSpacing: "0.08em", color: "#C6F035" }}>= NOVA MINUTES</span></span>
            </div>
          </div>
          <div style={{ borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 28 }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#6B6D60" }}>WHEN TASKS RUN OUT</div>
            <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", marginTop: 10 }}>Nova never just stops. It shifts to Draft mode.</div>
            <div style={{ marginTop: 14, padding: "15px 16px", borderRadius: 14, background: "#14170E", color: "#E9EFDC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)" }} />
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#E3B54A" }}>DRAFT MODE · TASKS USED 750/750</span>
              </div>
              <div style={{ fontSize: 12, marginTop: 8, lineHeight: 1.55, color: "#A9AD98" }}>&quot;I&apos;ve queued 12 replies and 2 campaigns as drafts — nothing executes until you top up or the month resets. Nothing is lost.&quot;</div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <span style={{ padding: "6px 14px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>Top up — ৳250 / 250 tasks</span>
                <span style={{ padding: "6px 12px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.25)", color: "#A9AD98", fontSize: 10.5, fontWeight: 600, cursor: "pointer" }}>Wait for reset</span>
              </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: "#6B6D60", lineHeight: 1.55 }}>Prepared work executes the moment you top up. Honest billing is the same product as honest AI.</div>
          </div>
        </div>
      </div>

      {/* EMPLOYEE ANCHOR */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div data-reveal className="m-pad-band" style={{ borderRadius: 32, background: "#0F120B", color: "#E9EFDC", padding: "52px 56px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>THE REAL COMPARISON</div>
            <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 42, lineHeight: 1.07, letterSpacing: "-1.6px", fontWeight: 800, color: "#FBFBF4", maxWidth: 620 }}>Don&apos;t compare us to software.<br />Compare us to payroll.</h2>
          </div>
          <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 34, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", padding: 26 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#FBFBF4" }}>One shop assistant</div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 5 }}><span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.2px", color: "#FBFBF4" }}>৳12,000</span><span style={{ fontSize: 12, color: "#878B76" }}>/month</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16, fontSize: 12.5, color: "#A9AD98" }}>
                <span>10 hours a day, 6 days a week</span>
                <span>Knows one job</span>
                <span>Needs training, leave, supervision</span>
              </div>
            </div>
            <div style={{ borderRadius: 20, background: "rgba(198,240,53,0.1)", border: "1px solid rgba(198,240,53,0.4)", padding: 26, position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
                <span style={{ fontSize: 15, fontWeight: 800, color: "#FBFBF4" }}>Nova — Acting CEO</span>
              </div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 5 }}><span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1.2px", color: "#C6F035" }}>৳3,990</span><span style={{ fontSize: 12, color: "#878B76" }}>/month, Business plan</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16, fontSize: 12.5, color: "#E9EFDC" }}>
                <span>24/7 — nights, Eid, monsoon</span>
                <span>10 departments, 65 duties</span>
                <span>Every action receipted &amp; undoable</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 22, fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#878B76" }}>PREMIUM WORK · REASONABLE TAKA · WE&apos;RE NOT THE CHEAPEST, WE&apos;RE THE BEST HIRE</div>
        </div>
      </div>

      {/* SHOPIFY MATH */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div data-reveal style={{ borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "34px 40px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#3E7A45" }}>COMING FROM SHOPIFY?</div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.7px", marginTop: 8 }}>Their stack: ≈ ৳16,500/mo.<br />Dakio Growth: ৳1,490 — CEO included.</div>
          </div>
          <a href="/switch" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
            See the full math <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }} data-reveal>
          <h2 className="m-h2b" style={{ margin: 0, fontSize: 38, lineHeight: 1.08, letterSpacing: "-1.4px", fontWeight: 800 }}>Fair questions.</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} data-reveal>
          {FAQ.map(f => (
            <div key={f.q} style={{ borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "20px 24px" }}>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.2px" }}>{f.q}</div>
              <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 6, lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div id="cta" style={{ maxWidth: 1200, margin: "70px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta" style={{ borderRadius: 36, background: "#C6F035", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.03, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 700 }}>Fourteen days with the full CEO. Free.</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />Start the Business trial
            </a>
            <a href="/" className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700 }}>Back to Dakio</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>NO CARD TO START · MONTHLY BILLING · YOUR DATA EXPORTS ANYTIME</div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
