// Nova — 1:1 port of "Dakio Nova.dc.html".

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import LogoDefs from "../../components/Logo";
import DecisionCard from "../../components/nova/DecisionCard";
import PageJsonLd from "../../components/PageJsonLd";

export const metadata = {
  title: "Nova — Your Store's AI Acting CEO, On Duty 24/7 | Dakio",
  description:
    "Not a chatbot. Nova plans, executes and reports around the clock inside guardrails you set — every action receipted, everything undoable. Appoint your CEO today.",
  alternates: { canonical: "/nova" },
};

const MONO = "var(--dk-font-mono), monospace";

const ORBIT_DOTS = Array.from({ length: 10 }, (_, i) => ({
  background: i % 3 === 0 ? "#C6F035" : "rgba(198,242,62,0.4)",
  transform: `rotate(${i * 36}deg) translateX(165px)`,
}));

const timePill = lime => ({
  display: "inline-block", padding: "6px 13px", borderRadius: 99,
  ...(lime ? { background: "#C6F035", color: "#0F120B" } : { background: "#1A1D12", color: "#C6F035" }),
  fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
});

const DAY = [
  { t: "00:00", n: "Night shift", d: "Deep analysis, trend hunting, campaigns prepared, prices checked — all receipted.", lime: false },
  { t: "06:00", n: "Morning brief", d: "“While you slept…” — the overnight story plus the decisions that need you. Readable or as a call.", lime: true },
  { t: "09:00", n: "On watch", d: "Executes inside guardrails all day. If something breaks, the watchdog calls you first.", lime: false },
  { t: "23:00", n: "Tonight's plan", d: "Posts its intent for the night, per department. Tomorrow it reports planned vs. done.", lime: false },
];

const PIPELINE = [
  { k: "STEP 1", n: "Authority check", arrow: true },
  { k: "STEP 2", n: "Execute", arrow: true },
  { k: "STEP 3", n: "Ledger receipt", arrow: true },
  { k: "STEP 4", n: "Lands in a door", arrow: false },
];

const BARS = Array.from({ length: 24 }, (_, i) => ({
  animation: `waveform ${(0.7 + (i % 5) * 0.12).toFixed(2)}s ease-in-out infinite`,
  animationDelay: `${-i * 0.08}s`,
}));

const AGENTS = [
  ["CEO-Nova", "COORDINATES"], ["Marketing", "AUTONOMOUS"], ["Sales", "AUTONOMOUS"], ["Support", "AUTONOMOUS"],
  ["Research", "ASSISTED"], ["Inventory", "ASSISTED"], ["Shipping", "AUTONOMOUS"], ["Finance", "ASSISTED"],
  ["Operations", "ASSISTED"], ["Growth", "ASSISTED"],
];

const agentTag = (m, i) => ({
  fontFamily: MONO, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: 99,
  ...(i === 0
    ? { background: "#1A1D12", color: "#C6F035" }
    : m === "AUTONOMOUS"
      ? { background: "rgba(198,240,53,0.4)", color: "#3A5212" }
      : { background: "rgba(26,29,18,0.07)", color: "#6B6D60" }),
});

const kicker = { fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" };

export default function NovaPage() {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/nova" />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav active="nova" ctaHref="#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
        <div className="m-pad-hero m-bleed" style={{ position: "relative", borderRadius: 36, background: "#0F120B", color: "#E9EFDC", overflow: "hidden", padding: "88px 64px" }}>
          <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 720, height: 720, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(198,240,53,0.18), rgba(198,240,53,0))" }} />
          <div className="m-grid" style={{ position: "relative", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, border: "1px solid rgba(198,242,62,0.35)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#C6F035", animation: "heroUp .6s ease both" }}>NOVA — ACTING CEO · EVERY DAKIO STORE</div>
              <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 66, lineHeight: 1.02, letterSpacing: "-2.6px", fontWeight: 800, color: "#FBFBF4", animation: "heroUp .6s .08s ease both" }}>Not hired.<br /><span style={{ color: "#C6F035" }}>Appointed.</span></h1>
              <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.6, color: "#A9AD98", maxWidth: 430, animation: "heroUp .6s .16s ease both" }}>Nova observes, plans, executes and reports across your whole store — 24/7, inside guardrails you set, with a receipt for everything.</p>
              <div className="m-wrap" style={{ display: "flex", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
                <a href="#cta" className="hv-up2-glow" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 15, fontWeight: 700 }}>Appoint Nova as your CEO</a>
                <a href="/prototypes/Nova HQ Prototype v7.dc.html" className="hv-bg-wash07" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.25)", color: "#E9EFDC", fontSize: 15, fontWeight: 700 }}>Walk into HQ →</a>
              </div>
              <div style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 15px", borderRadius: 99, border: "1px solid rgba(198,242,62,0.2)", fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#878B76", animation: "heroUp .6s .32s ease both" }}>STARTING ROLE — L3 OPERATOR · EARNS THE FULL CEO SEAT</div>
            </div>
            <div className="m-orbcol" style={{ position: "relative", height: 400 }}>
              <div className="m-orb" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 330, height: 330 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(198,242,62,0.2)" }} />
                <div style={{ position: "absolute", inset: 0, animation: "orbitcw 30s linear infinite" }}>
                  {ORBIT_DOTS.map((od, i) => (
                    <span key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 7, height: 7, margin: -3.5, borderRadius: 99, background: od.background, transform: od.transform }} />
                  ))}
                </div>
                <div style={{ position: "absolute", inset: 38, borderRadius: "50%", border: "1px dashed rgba(198,242,62,0.16)", animation: "orbitccw 44s linear infinite" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "conic-gradient(from 0deg, rgba(198,242,62,0) 0deg, rgba(198,242,62,0) 290deg, rgba(198,242,62,0.5) 348deg, #C6F035 360deg)", animation: "orbitcw 4.2s linear infinite" }} />
                <div style={{ position: "absolute", inset: 7, borderRadius: "50%", background: "#0F120B" }} />
                <div style={{ position: "absolute", inset: 100, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6 0%, #C6F035 40%, #6FA524 75%, #2E4710 100%)", animation: "breathe 5s ease-in-out infinite", boxShadow: "0 0 70px rgba(198,240,53,0.3)" }} />
              </div>
              <div className="m-nowrap-off" style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", color: "#878B76", whiteSpace: "nowrap", textAlign: "center", width: "100%" }}>10 DEPARTMENT AGENTS · ONE LEDGER · ONE DESK</div>
            </div>
          </div>
        </div>
      </div>

      {/* A DAY WITH NOVA */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker}>A DAY ON DUTY</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>It never clocks out.</h2>
        </div>
        <div className="m-grid2-1" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} data-reveal>
          <div className="m-hide" style={{ position: "absolute", top: 26, left: "11%", right: "11%", height: 2, background: "repeating-linear-gradient(90deg, rgba(26,29,18,0.16) 0 8px, transparent 8px 16px)" }} />
          {DAY.map(dy => (
            <div key={dy.t} style={{ position: "relative" }}>
              <div style={timePill(dy.lime)}>{dy.t}</div>
              <div style={{ marginTop: 14, padding: 18, borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", minHeight: 130 }}>
                <div style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.2px" }}>{dy.n}</div>
                <div style={{ fontSize: 12, color: "#6B6D60", marginTop: 6, lineHeight: 1.55 }}>{dy.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THE ONE RULE */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-pad-band m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: "52px 56px", textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>THE ONE RULE THAT NEVER BENDS</div>
          <h2 className="m-h2b" style={{ margin: "14px auto 0", fontSize: 40, lineHeight: 1.1, letterSpacing: "-1.4px", fontWeight: 800, color: "#FBFBF4", maxWidth: 640 }}>Nova never touches your store directly.</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 32, flexWrap: "wrap" }}>
            {PIPELINE.map(pp => (
              <div key={pp.k} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ padding: "13px 20px", borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(198,242,62,0.25)" }}>
                  <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#8CBF33" }}>{pp.k}</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 3, color: "#FBFBF4" }}>{pp.n}</div>
                </div>
                {pp.arrow ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg> : null}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, fontSize: 13, color: "#A9AD98" }}>A capability that can&apos;t honor this pipeline doesn&apos;t ship. That&apos;s the product.</div>
        </div>
      </div>

      {/* DECISION DESK + TRUST */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "center" }} data-reveal>
          <div>
            <div style={kicker}>THE DECISION DESK</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>
              Big moves wait<br />for{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>you<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 13, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", maxWidth: 380 }}>Anything above Nova&apos;s authority becomes a decision card — reason, evidence, before/after. One tap approves. Approvals build trust; trust unlocks autonomy.</p>
            <div style={{ marginTop: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#6B6D60" }}><span>TRUST — FROM THE LEDGER</span><span>68%</span></div>
              <div style={{ marginTop: 8, height: 10, borderRadius: 99, background: "rgba(26,29,18,0.08)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #8CBF33, #C6F035)", animation: "trustFill 1.6s .3s ease both" }} /></div>
              <div style={{ marginTop: 8, fontSize: 11.5, color: "#6B6D60" }}>50 clean approvals → Nova earns its L4 promotion. You confirm it.</div>
            </div>
          </div>
          <div style={{ borderRadius: 28, background: "#0F120B", padding: 26, color: "#E9EFDC", boxShadow: "0 34px 80px rgba(15,18,11,0.35)" }}>
            <div style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", color: "#878B76" }}>WAITING ON YOU · 1 OF 3</div>
            <DecisionCard />
            <div style={{ marginTop: 12, padding: "14px 16px", borderRadius: 14, background: "rgba(198,242,62,0.07)", border: "1px dashed rgba(198,242,62,0.3)" }}>
              <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.12em", color: "#C6F035" }}>PROMOTION EARNED</div>
              <div style={{ fontSize: 12, color: "#A9AD98", marginTop: 5, lineHeight: 1.55 }}>Trust review complete — <b style={{ color: "#E9EFDC" }}>50 tasks, 100% approved.</b> Nova is ready for L4 Acting CEO. Your call.</div>
            </div>
          </div>
        </div>
      </div>

      {/* VOICE */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center" }} data-reveal>
          <div style={{ borderRadius: 28, background: "#0F120B", padding: 28, color: "#E9EFDC" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 3s ease-in-out infinite" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(198,242,62,0.6)", animation: "ping 2s ease-out infinite" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, color: "#FBFBF4" }}>Nova is calling…</div>
                <div style={{ fontSize: 12, color: "#A9AD98", marginTop: 2 }}>Ad spend spiked 3.1× on &quot;Boishakh Reels&quot; — I paused it. 40 seconds to decide what&apos;s next?</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 26, marginTop: 18 }}>
              {BARS.map((b, i) => (
                <div key={i} style={{ flex: 1, height: "100%", borderRadius: 2, background: "rgba(198,242,62,0.55)", transformOrigin: "bottom", animation: b.animation, animationDelay: b.animationDelay }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <span style={{ flex: 1, textAlign: "center", padding: "11px 0", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Answer</span>
              <span style={{ flex: 1, textAlign: "center", padding: "11px 0", borderRadius: 99, border: "1px solid rgba(233,239,220,0.2)", color: "#A9AD98", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Send to desk</span>
            </div>
          </div>
          <div>
            <div style={kicker}>NOVA VOICE</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>It calls you first.</h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", maxWidth: 380 }}>Morning brief as a phone call. Watchdog alerts before small fires get big. Even customer confirmation calls — in Bangla or English. Every call recorded, transcribed, receipted.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              <span style={{ padding: "8px 15px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12, fontWeight: 700 }}>Briefing calls</span>
              <span style={{ padding: "8px 15px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12, fontWeight: 700 }}>Alert calls</span>
              <span style={{ padding: "8px 15px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12, fontWeight: 700 }}>Customer calls</span>
              <span style={{ padding: "8px 15px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 12, fontWeight: 700 }}>বাংলা + English</span>
            </div>
          </div>
        </div>
      </div>

      {/* AGENTS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px", textAlign: "center" }}>
        <div data-reveal>
          <div style={kicker}>THE TEAM UNDER YOUR CEO</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 680 }}>Ten agents. One ledger.</h2>
          <p style={{ margin: "16px auto 0", fontSize: 15, color: "#6B6D60", maxWidth: 460, lineHeight: 1.6 }}>Promote Marketing-Nova to autonomous while Finance-Nova still asks first — authority is per agent, and CEO-Nova coordinates them all.</p>
        </div>
        <div data-reveal className="m-chip-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 9, marginTop: 30, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          {AGENTS.map(([n, m], i) => (
            <div key={n} className="hv-border-ink-up2 m-chip-stack" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "11px 16px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)" }} />
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>{n}</span>
              </span>
              <span style={agentTag(m, i)}>{m}</span>
            </div>
          ))}
        </div>
        <div data-reveal className="m-wrap" style={{ marginTop: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 22px", borderRadius: 99, background: "#1A1D12", color: "#F0EFE6", fontSize: 13, fontWeight: 600 }}>
          Founder-only, forever:&nbsp;<span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: "#C6F035" }}>REFUNDS · GUARDRAILS · CONTRACT SIGNING</span>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "76px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 58, lineHeight: 1.03, letterSpacing: "-2.4px", fontWeight: 800, maxWidth: 700 }}>Give your store its CEO.</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href="/prototypes/Nova HQ Prototype v7.dc.html" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />Appoint Nova
            </a>
            <a href="/" className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700 }}>Back to Dakio</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>L3 OPERATOR ON DAY ONE · GUARDRAILS YOURS · EVERYTHING UNDOABLE</div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
