// Grow Labs — 1:1 port of "Dakio Grow Labs Page.dc.html".

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import LogoDefs from "../../components/Logo";
import PageJsonLd from "../../components/PageJsonLd";
import { REGISTER_URL } from "../../lib/urls";

export const metadata = {
  title: "Grow Labs — The Business Grow Studio | Dakio",
  description:
    "Six growth levers — campaigns, content, reach, research, pricing, goals — pulled professionally by Nova while you sleep. See the curve bend.",
  alternates: { canonical: "/grow" },
};

const MONO = "var(--dk-font-mono), monospace";

const pinStyle = (l, t, d) => ({
  position: "absolute", left: `${l}%`, top: `${t}%`, transform: "translate(-50%,-100%)",
  display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 11px", borderRadius: 99,
  background: "#14170E", border: "1px solid rgba(198,242,62,0.35)", fontSize: 10, fontWeight: 700,
  color: "#E9EFDC", whiteSpace: "nowrap", animation: `pinIn .4s ${d}s ease both`,
});

const PINS = [
  { t: "Cart won back · ৳2,300", s: pinStyle(26, 76, 1.0) },
  { t: "Reel hit 7:30 PM slot", s: pinStyle(46, 62, 1.5) },
  { t: "Eid campaign scaled", s: pinStyle(66, 44, 2.0) },
  { t: "Best month ever", s: pinStyle(87, 20, 2.5) },
];

const ALONE = [
  '23 unread DMs — "dam koto?" ×9',
  "Tomorrow's post: still undecided",
  "Ad running on a guess since Tuesday",
  "4 carts abandoned today, quietly",
  'Eid plan: "next week, inshallah"',
];

const WITH_NOVA = [
  { t: "Replied to all 23 DMs, in Bangla", r: "RECEIPT" },
  { t: "Tomorrow's reel scheduled — 7:30 PM", r: "RECEIPT" },
  { t: "Weak ad set paused, budget shifted", r: "RECEIPT" },
  { t: "3 carts recovered · ৳6,900", r: "RECEIPT" },
  { t: "Eid playbook drafted — for your approval", r: "WAITING ON YOU" },
];

const LEVERS = [
  { n: "Campaigns", job: "PROMOTE", before: "Boosted a post the night before Eid.", after: "The season is planned on a quarter Gantt — Eid, Puja, 11.11 — three weeks ahead.", from: "ROAS 1.2×", to: "ROAS 3.4×" },
  { n: "Content", job: "CREATE", before: "Posted whenever you remembered.", after: "A month of posts slotted at the hours your buyers actually scroll.", from: "REACH 900", to: "REACH 4,200" },
  { n: "Broadcast", job: "REACH", before: "Mass-forwarded on WhatsApp, hoped.", after: "38 lapsed buyers, one targeted message, cool-off protected.", from: "REPEAT 5/MO", to: "REPEAT 19/MO" },
  { n: "Research", job: "DISCOVER", before: "Copied competitors after the trend peaked.", after: "Demand curves spot the next winner six weeks early, supplier margins attached.", from: "FOLLOWER", to: "FIRST MOVER" },
  { n: "Growth", job: "IMPROVE", before: "Gut-feel discounts when sales dipped.", after: "Every opportunity comes with evidence, math and risk — Apply or Not now.", from: "GUESSING", to: "৳1,14,200 BACK" },
  { n: "Goals", job: "LEAD", before: "Checked sales at midnight, felt anxious.", after: "Pace, forecast and the exact lever that closes the gap — named.", from: "HOPE", to: "ON TRACK 9/12" },
];

const LOOP = [
  { n: "Research finds it", d: "THE NEXT WINNER", arrow: true },
  { n: "Campaigns launch it", d: "ON THE SEASON", arrow: true },
  { n: "Broadcast brings them back", d: "REPEAT BUYERS", arrow: true },
  { n: "Growth sharpens it", d: "PRICE & MARGIN", arrow: true },
  { n: "Goals re-aim", d: "NEXT TARGET", arrow: false },
];

const STATS = [
  { v: "+38%", l: "revenue vs last quarter" },
  { v: "৳1,14,200", l: "recovered by Growth" },
  { v: "0", l: "stockouts in Eid week" },
  { v: "6h 40m", l: "founder hours saved daily" },
];

export default function GrowPage() {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/grow" />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav active="grow" ctaHref="#cta" ctaLabel="Appoint Nova" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO: the diverging curve */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "70px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45", animation: "heroUp .6s ease both" }}>GROW LABS · THE BUSINESS GROW STUDIO</div>
            <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 58, lineHeight: 1.04, letterSpacing: "-2.4px", fontWeight: 800, animation: "heroUp .6s .08s ease both" }}>
              Growth you never{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>dared<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 13, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>{" "}
              to plan.
            </h1>
            <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.65, color: "#6B6D60", maxWidth: 400, animation: "heroUp .6s .16s ease both" }}>Campaigns, content, reach, research, pricing, goals — six growth levers in one studio. You pull them by hand, or Nova pulls them around the clock.</p>
            <div className="m-wrap" style={{ display: "flex", gap: 12, marginTop: 28, animation: "heroUp .6s .24s ease both" }}>
              <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700 }}>
                Start growing free
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
              <a href="/prototypes/Dakio Grow Modules.dc.html" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700 }}>See it live</a>
            </div>
          </div>
          <div style={{ animation: "heroUp .7s .2s ease both" }}>
            <div style={{ position: "relative", borderRadius: 26, background: "#0F120B", padding: "26px 26px 18px", boxShadow: "0 34px 80px rgba(15,18,11,0.3)", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.14em", color: "#878B76" }}>SHAHRQEE · REVENUE, ONE QUARTER</span>
                <span style={{ display: "flex", gap: 14, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.08em" }}>
                  <span style={{ color: "#878B76" }}>— YOU, DOING EVERYTHING</span>
                  <span style={{ color: "#C6F035" }}>— YOU + NOVA</span>
                </span>
              </div>
              <div style={{ position: "relative", marginTop: 14 }}>
                <svg viewBox="0 0 560 290" style={{ width: "100%", display: "block" }}>
                  <line x1="20" y1="70" x2="540" y2="70" stroke="rgba(233,239,220,0.07)" strokeWidth="1" />
                  <line x1="20" y1="140" x2="540" y2="140" stroke="rgba(233,239,220,0.07)" strokeWidth="1" />
                  <line x1="20" y1="210" x2="540" y2="210" stroke="rgba(233,239,220,0.07)" strokeWidth="1" />
                  <line x1="20" y1="258" x2="540" y2="258" stroke="rgba(233,239,220,0.14)" strokeWidth="1" />
                  <polygon points="20,250 150,236 300,196 430,120 540,52 540,258 20,258" fill="url(#growFill)" style={{ animation: "areaIn 1.4s 1.4s ease both" }} />
                  <defs>
                    <linearGradient id="growFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(198,240,53,0.28)" />
                      <stop offset="100%" stopColor="rgba(198,240,53,0)" />
                    </linearGradient>
                  </defs>
                  <path d="M20,250 C120,246 220,240 340,236 C430,233 500,231 540,230" fill="none" stroke="rgba(233,239,220,0.35)" strokeWidth="2.5" strokeDasharray="6 7" pathLength="1000" strokeDashoffset="1000" style={{ animation: "drawLine 1.8s .3s ease both" }} />
                  <path d="M20,250 C110,242 200,228 300,196 C390,167 470,102 540,52" fill="none" stroke="#C6F035" strokeWidth="4" strokeLinecap="round" pathLength="1000" strokeDasharray="1000" strokeDashoffset="1000" style={{ animation: "drawLine 2.2s .5s ease both" }} />
                </svg>
                {PINS.map((pn, i) => (
                  <div key={pn.t} className={`m-pin-${i + 1}`} style={pn.s}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0 }} />{pn.t}
                  </div>
                ))}
                <span style={{ position: "absolute", left: "95%", top: "15.5%", width: 12, height: 12, margin: -6, borderRadius: 99, background: "#C6F035", animation: "glowDot 2s 2.7s infinite" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#878B76" }}><span>APRIL</span><span>EID RAMP</span><span>JUNE</span></div>
            </div>
            <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#6B6D60" }}>Demo store, one quarter in the Grow Studio. The grey line is the same shop without it.</div>
          </div>
        </div>
      </div>

      {/* MIDNIGHT: with / without */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "92px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>SAME SHOP · SAME MIDNIGHT</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 50, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640 }}>The growth happens while you sleep.</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} data-reveal>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)", padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#B03A2E" }}>11:47 PM — YOU, ALONE</span>
              <span style={{ fontSize: 11, color: "#6B6D60" }}>😮‍💨 still at the desk</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
              {ALONE.map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(26,29,18,0.07)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "rgba(176,58,46,0.6)", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#6B6D60" }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#B03A2E" }}>GROWTH TODAY: WHATEVER ENERGY WAS LEFT</div>
          </div>
          <div style={{ borderRadius: 26, background: "#0F120B", color: "#E9EFDC", padding: 28, boxShadow: "0 28px 60px rgba(15,18,11,0.28)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#8CBF33" }}>11:47 PM — NOVA IN THE STUDIO</span>
              <span style={{ fontSize: 11, color: "#A9AD98" }}>you: asleep 😴</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 18 }}>
              {WITH_NOVA.map(w => (
                <div key={w.t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(198,242,62,0.15)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13 }}>{w.t}</span>
                  <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.06em", color: "#8CBF33" }}>{w.r}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#8CBF33" }}>GROWTH TONIGHT: ৳9,200 · READY FOR YOUR 06:00 BRIEF</div>
          </div>
        </div>
      </div>

      {/* SIX LEVERS */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "92px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>SIX LEVERS, ONE STUDIO</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 50, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 700 }}>Every lever, pulled professionally.</h2>
          <p style={{ margin: "14px auto 0", fontSize: 14.5, color: "#6B6D60", maxWidth: 460, lineHeight: 1.6 }}>What you used to improvise at midnight, the studio runs like a marketing team — and Nova runs the studio.</p>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {LEVERS.map(lv => (
            <div key={lv.n} className="hv-up3-border25" style={{ borderRadius: 24, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px" }}>{lv.n}</span>
                <span style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.1em", color: "#3E7A45" }}>{lv.job}</span>
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: "#9a9e8c", textDecoration: "line-through", textDecorationColor: "rgba(176,58,46,0.5)", lineHeight: 1.5 }}>{lv.before}</div>
              <div style={{ marginTop: 7, fontSize: 12.5, color: "#1A1D12", lineHeight: 1.55, flex: 1 }}><b style={{ color: "#3E7A45" }}>Now:</b> {lv.after}</div>
              <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 11, background: "#14170E", color: "#E9EFDC" }}>
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.06em", color: "#878B76" }}>{lv.from}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.06em", color: "#C6F035" }}>{lv.to}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPOUNDING LOOP */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "92px 28px 20px" }}>
        <div data-reveal className="m-pad-band m-bleed" style={{ borderRadius: 32, background: "#0F120B", color: "#E9EFDC", padding: "52px 56px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>WHY THE CURVE BENDS</div>
            <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.5px", fontWeight: 800, color: "#FBFBF4", maxWidth: 620 }}>The levers hand off. The growth compounds.</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 30, flexWrap: "wrap" }}>
            {LOOP.map(lp => (
              <div key={lp.n} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ padding: "11px 16px", borderRadius: 13, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(198,242,62,0.22)" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#FBFBF4" }}>{lp.n}</div>
                  <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.08em", color: "#8CBF33", marginTop: 2 }}>{lp.d}</div>
                </div>
                {lp.arrow ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg> : null}
              </div>
            ))}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 99, border: "1px dashed rgba(198,242,62,0.45)", fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#C6F035" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6M3 13a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 9" /></svg>REPEATS EVERY NIGHT
            </div>
          </div>
          <div className="m-stats2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 34, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
            {STATS.map(st => (
              <div key={st.l} style={{ padding: "16px 14px", borderRadius: 16, background: "rgba(198,240,53,0.08)", border: "1px solid rgba(198,240,53,0.22)", textAlign: "center" }}>
                <div style={{ fontSize: 23, fontWeight: 800, letterSpacing: "-0.7px", color: "#C6F035" }}>{st.v}</div>
                <div style={{ fontSize: 10.5, color: "#A9AD98", marginTop: 3, lineHeight: 1.4 }}>{st.l}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 18, fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.12em", color: "#878B76" }}>SHAHRQEE DEMO STORE · ONE QUARTER · EVERY NUMBER TRACES TO A RECEIPT</div>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "70px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.03, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 740 }}>Your curve is still the grey one.</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />Bend it — start free
            </a>
            <a href="/prototypes/Dakio Grow Modules.dc.html" className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700 }}>Open the Grow Studio</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>SIX LEVERS · NOVA ON THE NIGHT SHIFT · EVERYTHING REVERSIBLE</div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
