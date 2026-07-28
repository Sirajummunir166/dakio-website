// The Complete Store — 1:1 port of "Dakio Complete Store.dc.html".
// The foundation page: a Dakio store already includes everything and runs itself.

import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { REGISTER_URL } from "../../../lib/urls";

export const metadata = {
  title: "The Complete Store — Everything Included, From Day One | Dakio",
  description:
    "Payments, couriers, orders and stock already work on a Dakio store — bKash, Nagad, cards and cash on delivery, Steadfast, Pathao and RedX. Open your store free.",
  alternates: { canonical: "/store" },
};

const MONO = "var(--dk-font-mono), monospace";

const STAGES = [
  { time: "TUE 21:12", pipe: "FRONT OFFICE", t: "A customer messages", d: "“Dam koto? M ase?” — Nova answers in Bangla, the customer says yes, order #1044 is created. No message missed." },
  { time: "21:14", pipe: "PAYMENT", t: "Payment arrives by itself", d: "৳2,300 comes in over bKash — confirmed and recorded. Nagad, cards and cash on delivery work from day one too." },
  { time: "21:15", pipe: "COURIER", t: "Courier gets booked", d: "Pathao pickup set for 9 AM, tracking number made, customer told. Steadfast and RedX as backup." },
  { time: "WED 08:40", pipe: "STOCK", t: "The product ships", d: "This one came from a trusted supplier — they hold the stock, Dakio packs and ships. Selling your own stock? The count simply updates: 125 → 124." },
  { time: "WED 14:38", pipe: "DELIVERY", t: "Delivered, Chattogram", d: "Delivery proof saved. If this were cash on delivery, the cash would reach your balance automatically." },
  { time: "WED 14:39", pipe: "MONEY", t: "Money counted, recorded", d: "Courier and gateway fees listed, profit calculated, record #A-1044 saved. Tomorrow’s 6 AM report will mention it." },
];

const UTILS = [
  { mono: "SF", verb: "READY AT SIGNUP", n: "Storefront & link", d: "A ready-made store at name.dakio.shop the moment you register — your own domain when you want it.", chips: ["name.dakio.shop", "own domain", "বাংলা + EN"] },
  { mono: "CK", verb: "PAYMENTS COME IN", n: "Checkout", d: "The payments Bangladesh actually uses, already set up — nothing to install, no dollar fees.", chips: ["bKash", "Nagad", "cards · SSLCommerz", "cash on delivery"] },
  { mono: "CR", verb: "BOOKED FOR YOU", n: "Couriers", d: "Order confirmed → pickup booked, tracking made, customer told. COD cash reaches your balance after delivery.", chips: ["Steadfast", "Pathao", "RedX"] },
  { mono: "OD", verb: "ANSWERED FOR YOU", n: "Order desk", d: "Storefront, Messenger, Instagram, WhatsApp — one list. Nova replies, and places an order only after the customer says yes.", chips: ["one list", "asks first", "fewer fake orders"] },
  { mono: "ST", verb: "SHIPPED FOR YOU", n: "Stock — yours or theirs", d: "Keep your own stock, or sell from trusted suppliers who hold it for you. Dakio ships either way.", chips: ["own stock", "supplier network", "no stock needed"] },
  { mono: "LG", verb: "COUNTED FOR YOU", n: "Money records", d: "Every taka in and out — fees, COD cash, courier charges — written down automatically. Profit you can trust.", chips: ["every ৳ on record", "profit view", "mistakes can be undone"] },
];

const VS = [
  { old: "Set up payments yourself — forms, papers, monthly fees", now: "bKash payment reaches you from your very first order" },
  { old: "Book every courier yourself, copy-paste addresses", now: "Pickup is booked the moment an order confirms" },
  { old: "Buy stock first, hope it sells", now: "Sell first — a trusted supplier ships it for you" },
];

export default function CompleteStorePage() {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/store" />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav active="store" ctaHref="#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div className="m-bleed-wrap m-hero-wrap" style={{ maxWidth: 1200, margin: "18px auto 0", padding: "0 20px" }}>
        <div className="m-pad-hero m-bleed" style={{ position: "relative", borderRadius: 36, background: "#0F120B", color: "#E9EFDC", overflow: "hidden", padding: "76px 64px 70px" }}>
          <div style={{ position: "absolute", top: -220, right: -140, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(198,240,53,0.18), rgba(198,240,53,0))" }} />
          <div style={{ position: "relative", maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, border: "1px solid rgba(198,240,53,0.35)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#C6F035", animation: "heroUp .6s ease both" }}>THE FOUNDATION · EVERYTHING INCLUDED</div>
            <h1 className="m-h1" style={{ margin: "22px 0 0", fontSize: 62, lineHeight: 1.03, letterSpacing: "-2.5px", fontWeight: 800, color: "#FBFBF4", animation: "heroUp .6s .08s ease both" }}>A store that runs<br />itself<span style={{ color: "#C6F035" }}>.</span></h1>
            <p style={{ margin: "20px 0 0", fontSize: 16.5, lineHeight: 1.6, color: "#A9AD98", maxWidth: 470, animation: "heroUp .6s .16s ease both" }}>Payments, couriers, orders, stock — on other platforms this is your daily work. On Dakio it <b style={{ color: "#E9EFDC" }}>happens on its own</b>, with proof you can check anytime.</p>
            <div className="m-wrap" style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 26, animation: "heroUp .6s .24s ease both", fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em", color: "#878B76" }}>
              <span style={{ color: "#C6F035" }}>READY ON DAY ONE</span><span style={{ opacity: 0.4 }}>·</span><span>WORKS ON ITS OWN</span><span style={{ opacity: 0.4 }}>·</span><span>EVERY ৳ ON RECORD</span>
            </div>
          </div>
        </div>
      </div>

      {/* ONE ORDER, START TO FINISH */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 56, alignItems: "start" }} data-reveal>
          <div className="m-unstick" style={{ position: "sticky", top: 96 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>PROOF · ORDER #1044, LAST TUESDAY</div>
            <h2 className="m-h2" style={{ margin: "14px 0 0", fontSize: 48, lineHeight: 1.05, letterSpacing: "-1.9px", fontWeight: 800 }}>
              One order,<br />start to{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>finish<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 13, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>.
            </h2>
            <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.65, color: "#6B6D60", maxWidth: 360 }}>A real order, step by step. Every step has a time and a record — and the owner did none of it.</p>
            <div style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 18px", borderRadius: 16, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)" }}>
              <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.1em", color: "#6B6D60" }}>YOUR PART IN THIS ORDER</span>
              <span style={{ fontSize: 15, fontWeight: 800 }}>nothing.</span>
            </div>
          </div>
          <div style={{ position: "relative", paddingLeft: 34 }}>
            <div style={{ position: "absolute", left: 10, top: 8, bottom: 8, width: 3, borderRadius: 99, backgroundImage: "linear-gradient(#C6F035 55%, rgba(198,240,53,0.15) 55%)", backgroundSize: "100% 44px", animation: "pipeFlow 1.6s linear infinite" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {STAGES.map(sg => (
                <div key={sg.t} style={{ position: "relative", borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "16px 18px" }}>
                  <div style={{ position: "absolute", left: -30, top: 22, width: 11, height: 11, borderRadius: 99, background: "#C6F035", border: "2px solid #1A1D12" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: MONO, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", color: "#3E7A45" }}>{sg.time}</span>
                    <span style={{ fontFamily: MONO, fontSize: 8.5, letterSpacing: "0.1em", color: "#6B6D60", marginLeft: "auto" }}>{sg.pipe}</span>
                  </div>
                  <div style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.2px", marginTop: 6 }}>{sg.t}</div>
                  <div style={{ fontSize: 12.5, color: "#6B6D60", lineHeight: 1.55, marginTop: 4 }}>{sg.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* THE UTILITIES */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 38 }} data-reveal>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>SIX PARTS · ALL INCLUDED · ALL AUTOMATIC</div>
          <h2 className="m-h2" style={{ margin: "14px auto 0", fontSize: 48, lineHeight: 1.05, letterSpacing: "-1.9px", fontWeight: 800, maxWidth: 640 }}>Everything included. Everything automatic.</h2>
        </div>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {UTILS.map(u => (
            <div key={u.mono} className="hv-up3-border18" style={{ borderRadius: 24, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 38, height: 38, borderRadius: 12, background: "#1A1D12", color: "#C6F035", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 600 }}>{u.mono}</span>
                <span style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#3E7A45", border: "1px solid rgba(62,122,69,0.35)", borderRadius: 99, padding: "3px 9px" }}>{u.verb}</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 14 }}>{u.n}</div>
              <div style={{ fontSize: 12.5, color: "#6B6D60", lineHeight: 1.6, marginTop: 5 }}>{u.d}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                {u.chips.map(c => (
                  <span key={c} style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10.5, fontWeight: 700, color: "#1A1D12" }}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "#6B6D60" }}>All of this comes with every store. Nothing extra to install, nothing extra to pay for.</div>
      </div>

      {/* THE DIFFERENCE */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "0 auto", padding: "88px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band m-gap m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: "52px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -60, bottom: -120, width: 420, height: 420, borderRadius: "50%", border: "1px dashed rgba(198,240,53,0.25)", animation: "orbitcw 60s linear infinite" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#8CBF33" }}>THE DIFFERENCE</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 40, lineHeight: 1.1, letterSpacing: "-1.5px", fontWeight: 800, color: "#FBFBF4" }}>On other platforms, you do the work.<br /><span style={{ color: "#C6F035" }}>On Dakio, the work is done for you.</span></h2>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 9 }}>
            {VS.map(v => (
              <div key={v.now} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: 12, color: "#878B76", textDecoration: "line-through" }}>{v.old}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#E9EFDC", marginTop: 4 }}>{v.now}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1200, margin: "70px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 36, background: "#C6F035", padding: "72px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 className="m-cta-h2" style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.03, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 720 }}>Everything ready.<br />Open your store today.</h2>
          <div className="m-wrap" style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />Open your store
            </a>
            <a href="/nova" className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700 }}>Then appoint Nova</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>FREE TO START · ৳ · bKASH · NAGAD · COD · COURIERS WIRED</div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
