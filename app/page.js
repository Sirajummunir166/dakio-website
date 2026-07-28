// Home — 1:1 port of "Dakio Home.dc.html".

import HomeTop from "../components/home/HomeTop";
import SiteFooter from "../components/SiteFooter";
import Reveal from "../components/Reveal";
import LogoDefs from "../components/Logo";
import PageJsonLd from "../components/PageJsonLd";
import { REGISTER_URL } from "../lib/urls";

export const metadata = {
  title: "Dakio — Appoint an AI CEO to Your Online Store | Bangladesh",
  description:
    "Store, couriers, bKash, Nagad & COD — plus Nova, an AI CEO that runs marketing, support and ops 24/7 with a receipt for everything. Start free, no card.",
  alternates: { canonical: "/" },
};

const MONO = "var(--dk-font-mono), monospace";
const BN = "var(--dk-font-bn), sans-serif";

const MARQUEE = ["bKash", "Nagad", "Cash on delivery", "Steadfast", "Pathao", "RedX", "Facebook", "Instagram", "WhatsApp", "bKash", "Nagad", "Cash on delivery", "Steadfast", "Pathao", "RedX", "Facebook", "Instagram", "WhatsApp"];

const BRIEF_TILES = [
  { v: "৳46,200", l: "revenue overnight" },
  { v: "23", l: "orders confirmed" },
  { v: "84", l: "messages answered" },
  { v: "11", l: "carts recovered" },
  { v: "7", l: "trends found" },
  { v: "6h 40m", l: "your hours saved" },
];

const DEPTS = [
  { n: "CEO Office", j: "PLANS" }, { n: "Marketing", j: "PROMOTES" }, { n: "Sales", j: "CLOSES" }, { n: "Support", j: "ANSWERS" },
  { n: "Research", j: "DISCOVERS" }, { n: "Inventory", j: "PREDICTS" }, { n: "Shipping", j: "DELIVERS" }, { n: "Finance", j: "COUNTS" },
  { n: "Operations", j: "SOURCES" }, { n: "Growth", j: "EXPERIMENTS" },
];

const GROW_ROOMS = [
  { n: "Campaigns", j: "PROMOTE" }, { n: "Content", j: "CREATE" }, { n: "Broadcast", j: "REACH" },
  { n: "Research", j: "DISCOVER" }, { n: "Growth", j: "IMPROVE" }, { n: "Goals", j: "LEAD" },
];

const SHIP_FLOW = [
  { n: "Supplier", j: "HOLDS STOCK", arrow: true },
  { n: "Your store", j: "SELLS", arrow: true },
  { n: "Dakio", j: "PACKS + SHIPS", arrow: true },
  { n: "Doorstep", j: "COD COLLECTED", arrow: false },
];

const LADDER = [
  { l: "L0", n: "Observe", note: "REPORTS ONLY", on: false },
  { l: "L1", n: "Suggest", note: "ASKS FIRST", on: false },
  { l: "L2", n: "Draft", note: "PREPARES, YOU APPROVE", on: false },
  { l: "L3", n: "Operator", note: "DAY-ONE DEFAULT", on: true },
  { l: "L4", n: "Acting CEO", note: "EARNED", on: false, lime: true },
];

const BD_CHIPS = ["৳ everywhere", "bKash · Nagad", "Cash on delivery", "বাংলা + English", "Bangla voice calls", "Dhaka timezone"];

const SWITCH_ROWS = [
  { i: "1", t: "Concierge import", d: "Products, customers, orders and reviews — we move them, you review." },
  { i: "2", t: "COD + bKash native", d: "No payment plugins, no USD fees. The checkout Bangladesh actually uses." },
  { i: "3", t: "And you gain a CEO", d: "Shopify gives you tools. Dakio staffs the whole back office from day one." },
];

// Radial org variant — chip anchor points (% of container), CEO at 50/50.
const RADIAL_POS = [[22, 7], [50, 2], [78, 7], [15, 30], [85, 30], [15, 70], [85, 70], [30, 93], [70, 93]];

const PLANS = [
  { n: "Starter", pr: "Free", sub: "forever", d: "Store, orders, couriers and Nova at L0–L1 — watch it work before you trust it.", cta: "Start free", dark: false },
  { n: "Growth", pr: "৳1,490", sub: "/month", d: "Unlimited products, supplier network, Grow Labs, Nova Operator — 750 tasks/mo.", cta: "Choose Growth", dark: true, pop: true },
  { n: "Business", pr: "৳3,990", sub: "/month", d: "The full L4 Acting CEO seat — 2,500 tasks, voice calls, playbooks, staff logins.", cta: "Start 14-day free trial", dark: false },
];

function Arrow({ size = 14, sw = 2.4, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const kicker = { fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" };
const monoTile = { width: 38, height: 38, borderRadius: 12, background: "#14170E", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 600, flexShrink: 0 };

export default function Home() {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/" />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <HomeTop />

      {/* ================= PARTNER MARQUEE ================= */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 28px 0" }}>
        <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(26,29,18,0.08)", display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#6B6D60", whiteSpace: "nowrap", flexShrink: 0 }}>Works with</span>
          <div style={{ flex: 1, overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}>
            <div style={{ display: "flex", gap: 44, width: "max-content", animation: "marquee 22s linear infinite" }}>
              {MARQUEE.map((label, i) => (
                <span key={i} style={{ fontSize: 15, fontWeight: 600, color: "#6B6D60", whiteSpace: "nowrap" }}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MORNING BRIEF ================= */}
      <div id="nova" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "center" }} data-reveal>
          <div>
            <div style={kicker}>06:00 · EVERY MORNING</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>
              Wake up to work<br />already{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>done<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 13, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", maxWidth: 380 }}>
              Nova works the night shift and reports at 06:00 — every line backed by a receipt you can open, and undo.
            </p>
            <a href="/prototypes/Nova HQ Prototype v7.dc.html" className="hv-gap12" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, fontSize: 14, fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 3 }}>
              See Nova HQ live <Arrow />
            </a>
          </div>
          <div style={{ borderRadius: 28, background: "#0F120B", padding: 28, color: "#E9EFDC", boxShadow: "0 34px 80px rgba(15,18,11,0.35)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
                <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.16em", color: "#8CBF33" }}>MORNING BRIEF · WHILE YOU SLEPT</span>
              </div>
              <span className="hv-bg-lime24" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 99, background: "rgba(198,242,62,0.14)", color: "#C6F035", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>
                Hear it as a call
              </span>
            </div>
            <div className="m-tiles" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 9, marginTop: 20 }}>
              {BRIEF_TILES.map(bt => (
                <div key={bt.l} style={{ padding: "14px 14px 12px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.5px", color: "#FBFBF4" }}>{bt.v}</div>
                  <div style={{ fontSize: 10.5, color: "#A9AD98", marginTop: 3 }}>{bt.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 14, background: "rgba(198,242,62,0.08)", border: "1px solid rgba(198,242,62,0.2)", display: "flex", gap: 11, alignItems: "flex-start" }}>
              <span style={{ marginTop: 5, width: 7, height: 7, borderRadius: 99, background: "#C6F035", flexShrink: 0, animation: "pulseRing 2.2s infinite" }} />
              <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#E9EFDC" }}>
                Today&apos;s focus: scale the <b>Muslin drop</b> campaign — est. <b style={{ color: "#C6F035" }}>+14% weekly profit</b>.{" "}
                <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.08em", color: "#8CBF33" }}>APPROVE / LATER</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ORG / TEAM ================= */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px", textAlign: "center" }}>
        <div data-reveal>
          <div style={kicker}>THE ORGANIZATION</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640 }}>This is your team now.</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 34, marginTop: 26 }}>
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>1</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>Acting CEO</div></div>
            <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} />
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>10</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>departments</div></div>
            <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} />
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>65</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>named duties</div></div>
          </div>
        </div>
        <div data-reveal className="m-chip-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 9, marginTop: 30, maxWidth: 820, marginLeft: "auto", marginRight: "auto" }}>
          {DEPTS.map(d => (
            <div key={d.n} className="hv-border-ink-up2 m-chip-stack" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", border: "1px solid rgba(26,29,18,0.25)" }} />
                <span style={{ fontSize: 13.5, fontWeight: 700 }}>{d.n}</span>
              </span>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.06em", color: "#6B6D60" }}>{d.j}</span>
            </div>
          ))}
        </div>
        <div data-reveal style={{ marginTop: 18, fontSize: 13, color: "#6B6D60" }}>Every duty lands in a real module you could run by hand. Nova just never sleeps.</div>
      </div>

      {/* ============ ORG — TREE VARIANT (preview duplicate for comparison) ============ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px", textAlign: "center" }}>
        <div data-reveal>
          <div style={kicker}>THE ORGANIZATION · TREE VARIANT (PREVIEW)</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640 }}>This is your team now.</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 34, marginTop: 26 }}>
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>1</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>Acting CEO</div></div>
            <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} />
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>10</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>departments</div></div>
            <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} />
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>65</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>named duties</div></div>
          </div>
        </div>
        <div data-reveal style={{ marginTop: 34 }}>
          {/* CEO node */}
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "14px 26px", borderRadius: 16, background: "#1A1D12", color: "#F0EFE6" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)" }} />
              <span style={{ fontSize: 14.5, fontWeight: 800, color: "#FBFBF4" }}>CEO Office</span>
            </span>
            <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#C6F035" }}>PLANS · COORDINATES ALL</span>
          </div>
          {/* fishbone tree: center spine from the CEO node, one branch per dept */}
          <div className="org-tree">
            {DEPTS.filter(d => d.n !== "CEO Office").map(d => (
              <div key={d.n} className="org-node">
                <div className="hv-border-ink-up2 m-chip-stack" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", border: "1px solid rgba(26,29,18,0.25)" }} />
                    <span style={{ fontSize: 13.5, fontWeight: 700 }}>{d.n}</span>
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.06em", color: "#6B6D60" }}>{d.j}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18, fontSize: 13, color: "#6B6D60" }}>Every duty lands in a real module you could run by hand. Nova just never sleeps.</div>
        </div>
      </div>

      {/* ============ ORG — RADIAL VARIANT (preview duplicate for comparison) ============ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px", textAlign: "center" }}>
        <div data-reveal>
          <div style={kicker}>THE ORGANIZATION · RADIAL VARIANT (PREVIEW)</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640 }}>This is your team now.</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 34, marginTop: 26 }}>
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>1</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>Acting CEO</div></div>
            <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} />
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>10</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>departments</div></div>
            <div style={{ width: 1, height: 34, background: "rgba(26,29,18,0.12)", alignSelf: "center" }} />
            <div><span style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-1.5px" }}>65</span><div style={{ fontSize: 12, color: "#6B6D60", fontWeight: 600, marginTop: 2 }}>named duties</div></div>
          </div>
        </div>
        <div data-reveal className="org-radial" style={{ position: "relative", maxWidth: 760, height: 440, margin: "26px auto 0" }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
            {RADIAL_POS.map(([x, y], i) => (
              <line key={i} x1="50" y1="50" x2={x} y2={y} stroke="rgba(26,29,18,0.25)" strokeWidth="1" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
          {DEPTS.filter(d => d.n !== "CEO Office").map((d, i) => {
            const pos = RADIAL_POS[i];
            return (
              <div key={d.n} className="hv-border-ink-up2 org-radial-chip" style={{ position: "absolute", left: `${pos[0]}%`, top: `${pos[1]}%`, transform: "translate(-50%,-50%)", display: "inline-flex", alignItems: "center", gap: 9, padding: "11px 16px", borderRadius: 99, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)", whiteSpace: "nowrap" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", border: "1px solid rgba(26,29,18,0.25)" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>{d.n}</span>
                </span>
                <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.06em", color: "#6B6D60" }}>{d.j}</span>
              </div>
            );
          })}
          <div className="org-radial-ceo" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "16px 28px", borderRadius: 18, background: "#1A1D12", color: "#F0EFE6", boxShadow: "0 18px 44px rgba(15,18,11,0.25)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <span style={{ width: 12, height: 12, borderRadius: 99, background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
              <span style={{ fontSize: 15, fontWeight: 800, color: "#FBFBF4" }}>CEO Office</span>
            </span>
            <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#C6F035" }}>PLANS · COORDINATES ALL</span>
          </div>
        </div>
        <div data-reveal style={{ marginTop: 18, fontSize: 13, color: "#6B6D60" }}>Every duty lands in a real module you could run by hand. Nova just never sleeps.</div>
      </div>

      {/* ================= THE ROOMS ================= */}
      <div id="rooms" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker}>THE PRODUCT — NOT MOCKUPS. CLICK ANY CARD.</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 620 }}>The rooms your CEO works in.</h2>
        </div>
        <div className="m-rooms" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {/* Nova HQ (big) */}
          <a href="/prototypes/Nova HQ Prototype v7.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 3", display: "block", borderRadius: 28, background: "#0F120B", color: "#E9EFDC", padding: 28, overflow: "hidden", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ ...monoTile, background: "#C6F035", color: "#0F120B" }}>HQ</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px", color: "#FBFBF4" }}>Nova HQ</div>
                <div style={{ fontSize: 12.5, color: "#A9AD98", marginTop: 1 }}>Supervise your CEO — decisions, receipts, live feed.</div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#8CBF33" }}>OPEN ↗</span>
            </div>
            <div style={{ marginTop: 20, borderRadius: 16, background: "#14170E", border: "1px solid rgba(198,242,62,0.18)", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.14em", color: "#E3B54A" }}>DECISION · MARKETING</span>
                <span style={{ fontFamily: MONO, fontSize: 8.5, color: "#8CBF33" }}>+৳9,400 EST</span>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 8, color: "#FBFBF4" }}>Scale &quot;Muslin drop&quot; budget ৳800 → ৳1,200/day</div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <span style={{ padding: "7px 16px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 11.5, fontWeight: 700 }}>Approve</span>
                <span style={{ padding: "7px 14px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.2)", fontSize: 11.5, fontWeight: 600, color: "#A9AD98" }}>Later</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#A9AD98" }}><span style={{ width: 5, height: 5, borderRadius: 99, background: "#8CBF33" }} />Replied to 12 Messenger customers <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 8, color: "#878B76" }}>02:14</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#A9AD98" }}><span style={{ width: 5, height: 5, borderRadius: 99, background: "#8CBF33" }} />Recovered cart · Taspia K. · ৳2,300 <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 8, color: "#878B76" }}>03:41</span></div>
            </div>
          </a>
          {/* Store Studio (big) */}
          <a href="/prototypes/Dakio Store Studio.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 3", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 28, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>SS</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Store Studio</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1 }}>Design a storefront that doesn&apos;t look like a template.</div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>OPEN ↗</span>
            </div>
            <div style={{ marginTop: 20, borderRadius: 16, border: "1px solid rgba(26,29,18,0.1)", overflow: "hidden", background: "#F6EFE3" }}>
              <div style={{ height: 26, background: "#FFFDF8", borderBottom: "1px solid rgba(26,29,18,0.07)", display: "flex", alignItems: "center", gap: 5, padding: "0 12px" }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: "rgba(26,29,18,0.2)" }} /><span style={{ width: 6, height: 6, borderRadius: 99, background: "rgba(26,29,18,0.12)" }} />
                <span style={{ marginLeft: 8, fontSize: 8.5, fontWeight: 700, color: "#3A2418" }}>shahrqee.com</span>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ height: 58, borderRadius: 10, background: "#3A2418", display: "flex", alignItems: "center", padding: "0 16px" }}><span style={{ fontSize: 14, fontWeight: 700, color: "#F6EFE3", fontFamily: "Georgia,serif" }}>Eid Muslin Collection</span></div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, height: 44, borderRadius: 8, background: "#FFFDF8", border: "1px solid rgba(26,29,18,0.08)" }} />
                  <div style={{ flex: 1, height: 44, borderRadius: 8, background: "#FFFDF8", border: "1px solid rgba(26,29,18,0.08)" }} />
                  <div style={{ flex: 1, height: 44, borderRadius: 8, background: "#FFFDF8", border: "1px solid rgba(26,29,18,0.08)" }} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#6B6D60" }}>THEMES</span>
              {["#8C2F1B", "#C6F035", "#1F6E63", "#171420"].map(c => (
                <span key={c} style={{ width: 16, height: 16, borderRadius: 99, background: c, border: "2px solid #fff", boxShadow: "0 0 0 1px rgba(26,29,18,0.15)" }} />
              ))}
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#6B6D60", marginLeft: 4 }}>+ বাংলা fonts · dark mode</span>
            </div>
          </a>
          {/* Front Office */}
          <a href="/prototypes/Nova Inbox - Front Office.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 2", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>FO</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Front Office</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1 }}>One inbox for every channel. Nova sells in it.</div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>OPEN ↗</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
              <span title="Messenger" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="#1A1D12"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.3S17.5 2 12 2zm1.1 12.5L10.5 11.7l-4.9 2.8 5.4-5.7 2.6 2.7 4.8-2.7-5.3 5.7z" /></svg></span>
              <span title="Instagram" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="0.8" fill="#1A1D12" stroke="none" /></svg></span>
              <span title="WhatsApp" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1121 11.5z" /><path d="M9 9.5c.5 2.5 3 5 5.5 5.5l1-1.5-2-1-1 .5c-.8-.5-1.5-1.2-2-2l.5-1-1-2z" fill="#1A1D12" stroke="none" /></svg></span>
              <span title="Email" style={{ width: 26, height: 26, borderRadius: 8, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5" /><path d="M3 6.5l9 6.5 9-6.5" /></svg></span>
              <span style={{ alignSelf: "center", marginLeft: 4, fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.08em", color: "#6B6D60" }}>ONE THREAD, EVERY CHANNEL</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "8px 12px", borderRadius: "12px 12px 12px 3px", background: "#EEEBDF", fontSize: 11.5 }}>Dam koto? Size M ase?</div>
              <div style={{ alignSelf: "flex-end", maxWidth: "88%", padding: "8px 12px", borderRadius: "12px 12px 3px 12px", background: "#1A1D12", color: "#F0EFE6", fontSize: 11.5 }}>৳2,300, M stock e ase. Confirm korle order kore dei? <span style={{ fontFamily: MONO, fontSize: 7.5, color: "#8CBF33" }}>BY NOVA</span></div>
              <div style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "8px 12px", borderRadius: "12px 12px 12px 3px", background: "#EEEBDF", fontSize: 11.5 }}>Hae, confirm koren ✓</div>
              <div style={{ alignSelf: "center", marginTop: 3, padding: "6px 12px", borderRadius: 99, background: "rgba(62,122,69,0.12)", color: "#2c5c31", fontSize: 10, fontWeight: 700 }}>ORDER #1044 · PLACED AFTER CONFIRMATION · RTO SHIELD ✓</div>
            </div>
          </a>
          {/* Grow Modules */}
          <a href="/prototypes/Dakio Grow Modules.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 2", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>GL</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Grow Labs</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1 }}>The business Grow Studio — six levers, one team.</div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>OPEN ↗</span>
            </div>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
              {GROW_ROOMS.map(g => (
                <div key={g.n} style={{ padding: "9px 12px", borderRadius: 11, background: "rgba(26,29,18,0.92)", color: "#F0EFE6" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700 }}>{g.n}</div>
                  <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.1em", color: "#C6F035", marginTop: 2 }}>{g.j}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "13px 15px", borderRadius: 13, background: "#14170E", color: "#E9EFDC" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", flexShrink: 0 }} />
                <span style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.12em", color: "#8CBF33" }}>NOVA PREPARED · GROWTH → BROADCAST</span>
              </div>
              <div style={{ fontSize: 12, marginTop: 7, lineHeight: 1.5 }}>Eid muslin trending <b style={{ color: "#C6F035" }}>3.2×</b> — campaign drafted, 38 lapsed buyers queued. Nothing sends without you.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                <span style={{ padding: "6px 14px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>Review</span>
                <span style={{ padding: "6px 12px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.25)", color: "#A9AD98", fontSize: 10.5, fontWeight: 600, cursor: "pointer" }}>Dismiss</span>
                <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 7, letterSpacing: "0.08em", color: "#8CBF33" }}>৳1,14,200 RECOVERED SO FAR</span>
              </div>
            </div>
          </a>
          {/* Ads Content Gallery */}
          <a href="/prototypes/Dakio Nova Motion Ads.dc.html" data-reveal className="hv-up4" style={{ gridColumn: "span 2", display: "block", borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>AD</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Ads Gallery</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1 }}>Pick a product. Get the ad.</div>
              </div>
              <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60" }}>OPEN ↗</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 10px 5px 5px", borderRadius: 99, background: "#F4F2EA", border: "1px solid rgba(26,29,18,0.09)" }}>
                <span style={{ width: 22, height: 22, borderRadius: 99, background: "linear-gradient(140deg, #8C2F1B, #D9A62E)", border: "1px solid rgba(26,29,18,0.15)" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700 }}>Muslin Saree</span>
              </span>
              <Arrow size={14} sw={2.2} style={{ flexShrink: 0, color: "#6B6D60" }} />
              <span style={{ padding: "4px 10px", borderRadius: 99, background: "#C6F035", fontFamily: MONO, fontSize: 7.5, fontWeight: 600, letterSpacing: "0.1em", color: "#0F120B" }}>1 CLICK</span>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div style={{ flex: 1, aspectRatio: "1/1", borderRadius: 10, background: "linear-gradient(160deg, #3A2418, #8C2F1B)", position: "relative", overflow: "hidden" }}><span style={{ position: "absolute", left: 8, bottom: 7, fontSize: 8, fontWeight: 800, color: "#FFF1EA" }}>EID DROP</span><span style={{ position: "absolute", top: 7, right: 7, fontFamily: MONO, fontSize: 6.5, color: "#FFF1EA", opacity: 0.7 }}>1:1</span></div>
              <div style={{ flex: 1, aspectRatio: "4/5", borderRadius: 10, background: "linear-gradient(160deg, #1F2A16, #4C7A3F)", position: "relative", overflow: "hidden" }}><span style={{ position: "absolute", left: 8, bottom: 7, fontSize: 8, fontWeight: 800, color: "#F2F6E9" }}>-20%</span><span style={{ position: "absolute", top: 7, right: 7, fontFamily: MONO, fontSize: 6.5, color: "#F2F6E9", opacity: 0.7 }}>4:5</span></div>
              <div style={{ flex: 1, aspectRatio: "9/16", borderRadius: 10, background: "linear-gradient(170deg, #171420, #3A4C8C)", position: "relative", overflow: "hidden" }}>
                <span style={{ position: "absolute", top: 7, right: 7, fontFamily: MONO, fontSize: 6.5, color: "#EDF0FC", opacity: 0.7 }}>9:16</span>
                <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: 99, background: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="8" height="8" viewBox="0 0 24 24" fill="#0F120B"><path d="M8 5l12 7-12 7z" /></svg></span>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#3E7A45" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>3 SIZES + MOTION · EDITABLE · ON-BRAND BY DEFAULT</div>
          </a>
          {/* Dropshipping */}
          <a href="/prototypes/Dakio Supplier Dashboard.dc.html" data-reveal className="hv-up3 m-wrap" style={{ gridColumn: "span 6", display: "flex", alignItems: "center", gap: 28, borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "24px 28px" }}>
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={monoTile}>SN</span>
              <div>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.4px" }}>Supplier Network</div>
                <div style={{ fontSize: 12.5, color: "#6B6D60", marginTop: 1, maxWidth: 280 }}>Sell without inventory — verified suppliers hold stock, Dakio ships every order.</div>
              </div>
            </div>
            <div className="m-wrap" style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              {SHIP_FLOW.map(sf => (
                <div key={sf.n} style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                  <div style={{ flex: 1, padding: "12px 14px", borderRadius: 12, background: "#ffffff", border: "1px solid rgba(26,29,18,0.08)", textAlign: "center" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>{sf.n}</div>
                    <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.08em", color: "#6B6D60", marginTop: 2, whiteSpace: "nowrap" }}>{sf.j}</div>
                  </div>
                  {sf.arrow ? <Arrow size={14} sw={2.2} style={{ flexShrink: 0, color: "#6B6D60" }} /> : null}
                </div>
              ))}
            </div>
          </a>
        </div>
      </div>

      {/* ================= TRUST ================= */}
      <div id="trust" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={kicker}>WHY FOUNDERS TRUST AN AI CEO</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 640 }}>You hold the guardrails.</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px" }}>Every action has a receipt</div>
            <div style={{ marginTop: 16, borderRadius: 14, background: "#ffffff", border: "1px solid rgba(26,29,18,0.09)", padding: 16 }}>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.12em", color: "#6B6D60" }}>RECEIPT · #A-4471</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 7 }}>Paused &quot;Boishakh Reels&quot; campaign</div>
              <div style={{ fontSize: 11.5, color: "#6B6D60", marginTop: 5, lineHeight: 1.55 }}>CPA rose 43% over 3 days · evidence: 72h spend window</div>
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <span style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10, fontWeight: 700, color: "#6B6D60" }}>BEFORE ৳1,200/day</span>
                <span style={{ padding: "5px 11px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 10, fontWeight: 700 }}>AFTER PAUSED</span>
              </div>
              <span className="hv-ink-lime" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "7px 14px", borderRadius: 99, border: "1.5px solid #1A1D12", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6M3 13a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 9" /></svg>Undo · 24h window
              </span>
            </div>
          </div>
          <div style={{ borderRadius: 26, background: "#0F120B", color: "#E9EFDC", padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px", color: "#FBFBF4" }}>You set the limits</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, color: "#A9AD98" }}>Daily spend cap</span><span style={{ fontSize: 13, fontWeight: 800, color: "#C6F035" }}>৳5,000</span></div>
              <div style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, color: "#A9AD98" }}>Max discount</span><span style={{ fontSize: 13, fontWeight: 800, color: "#C6F035" }}>15%</span></div>
              <div style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 12, color: "#A9AD98" }}>No-touch list</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <span style={{ padding: "4px 10px", borderRadius: 99, border: "1px dashed rgba(198,242,62,0.5)", fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.08em", color: "#C6F035" }}>SAREE PRICING</span>
                  <span style={{ padding: "4px 10px", borderRadius: 99, border: "1px dashed rgba(198,242,62,0.5)", fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.08em", color: "#C6F035" }}>REFUNDS</span>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#878B76", lineHeight: 1.55, marginTop: 4 }}>Refunds, bulk changes and contracts stay founder-only. Always.</div>
            </div>
          </div>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.3px" }}>Authority is earned</div>
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 7 }}>
              {LADDER.map(lv => (
                <div key={lv.l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 12, ...(lv.on ? { background: "#1A1D12", color: "#F0EFE6" } : lv.lime ? { background: "rgba(198,240,53,0.35)", border: "1px dashed rgba(26,29,18,0.3)" } : { background: "#ffffff", border: "1px solid rgba(26,29,18,0.08)" }) }}>
                  <span style={{ fontFamily: "IBM Plex Mono,monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 6, ...(lv.on ? { background: "#C6F035", color: "#0F120B" } : { background: "rgba(26,29,18,0.08)", color: "#1A1D12" }) }}>{lv.l}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700 }}>{lv.n}</span>
                  <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 8, letterSpacing: "0.08em", color: "#6B6D60" }}>{lv.note}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#6B6D60", lineHeight: 1.55, marginTop: 12 }}>Trust is computed from the ledger — approvals move Nova up, undos move it down.</div>
          </div>
        </div>
      </div>

      {/* ================= BANGLADESH ================= */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band m-gap m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", right: -60, top: -80, fontSize: 340, fontWeight: 800, color: "rgba(198,240,53,0.07)", lineHeight: 1, fontFamily: BN }}>৳</div>
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>HOME GROUND</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 44, lineHeight: 1.08, letterSpacing: "-1.6px", fontWeight: 800, color: "#FBFBF4" }}>Built for Bangladesh.<br /><span style={{ color: "#C6F035" }}>Not translated for it.</span></h2>
            <p style={{ margin: "16px 0 0", fontSize: 14.5, lineHeight: 1.65, color: "#A9AD98", maxWidth: 380 }}>Payments, language and the retail calendar are design inputs here — not plugins.</p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {BD_CHIPS.map(t => (
                <span key={t} style={{ padding: "9px 16px", borderRadius: 99, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 13, fontWeight: 700, color: "#F0EFE6" }}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: 8, padding: "16px 18px", borderRadius: 16, background: "rgba(198,240,53,0.09)", border: "1px solid rgba(198,240,53,0.25)" }}>
              <div style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.12em", color: "#8CBF33" }}>SEASON-AWARE PLANNING</div>
              <div style={{ display: "flex", gap: 7, marginTop: 10, flexWrap: "wrap" }}>
                <span style={{ padding: "6px 13px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 11, fontWeight: 800 }}>EID</span>
                {["PUJA", "BOISHAKH", "11.11", "MONSOON"].map(s => (
                  <span key={s} style={{ padding: "6px 13px", borderRadius: 99, border: "1px solid rgba(198,242,62,0.4)", color: "#C6F035", fontSize: 11, fontWeight: 700 }}>{s}</span>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: "#A9AD98", marginTop: 10, lineHeight: 1.55 }}>Nova proposes the Eid playbook 3 weeks early — one approval runs the month.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SWITCH ================= */}
      <div id="switch" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} data-reveal>
          <div>
            <div style={kicker}>SWITCHING?</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>
              Leaving Shopify?<br />Bring it over a{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>weekend<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 13, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#6B6D60", maxWidth: 400 }}>Concierge migration moves products, customers and order history. Your store keeps selling the whole time.</p>
            <a href="/switch" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, padding: "13px 22px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 14, fontWeight: 700 }}>
              Plan my switch <Arrow />
            </a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SWITCH_ROWS.map(sw => (
              <div key={sw.i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "#1A1D12", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15, fontWeight: 800 }}>{sw.i}</div>
                <div style={{ minWidth: 0 }}><div style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.2px" }}>{sw.t}</div><div style={{ fontSize: 12, color: "#6B6D60", marginTop: 2, lineHeight: 1.5 }}>{sw.d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PRICING ================= */}
      <div id="pricing" style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={kicker}>PRICING</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>Taka. Not dollars.</h2>
        </div>
        <div className="m-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {PLANS.map(p => (
            <div key={p.n} style={{ padding: 28, borderRadius: 26, display: "flex", flexDirection: "column", ...(p.dark ? { background: "#0F120B", color: "#E9EFDC", boxShadow: "0 24px 54px rgba(15,18,11,0.3)" } : { background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.2px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.n}</span>
                {p.pop ? <span style={{ padding: "4px 10px", borderRadius: 99, background: "rgba(198,240,53,0.16)", color: "#C6F035", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em" }}>POPULAR</span> : null}
              </div>
              <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.pr}</span>
                <span style={{ fontSize: 13, color: p.dark ? "#878B76" : "#6B6D60" }}>{p.sub}</span>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, marginTop: 10, flex: 1, color: p.dark ? "#A9AD98" : "#6B6D60" }}>{p.d}</div>
              <a href="#cta" style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 0", borderRadius: 99, fontSize: 14, fontWeight: 700, ...(p.dark ? { background: "#C6F035", color: "#0F120B" } : { border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12" }) }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 14, fontSize: 12.5, color: "#6B6D60" }}>
          Every plan includes Nova. Autonomy is earned, not bought.{" "}
          <a href="/pricing" style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>Full pricing →</a>
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 20px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "76px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 60, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, maxWidth: 720 }}>Your store. Your CEO.<br />Today.</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 34 }}>
            <a href="/prototypes/Nova HQ Prototype v7.dc.html" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />Appoint Nova
            </a>
            <a href={REGISTER_URL} className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700 }}>Start free — no card</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>FREE TO START · GUARDRAILS ON DAY ONE · UNDO EVERYTHING</div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
