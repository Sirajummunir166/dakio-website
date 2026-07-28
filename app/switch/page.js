// Switch — 1:1 port of "Dakio Switch.dc.html". The platform name is a
// variable in source (fromPlatform, default "Shopify").

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import LogoDefs from "../../components/Logo";
import PageJsonLd from "../../components/PageJsonLd";

export const metadata = {
  title: "Switch from Shopify to Dakio in One Weekend — Free Migration",
  description:
    "Concierge migration moves products, customers and orders with SEO redirects intact. COD + bKash native, ৳ pricing — and on Monday your store has a CEO.",
  alternates: { canonical: "/switch" },
};

const MONO = "var(--dk-font-mono), monospace";
const PLAT = "Shopify";

const OLD_BILL = [
  { n: "Platform subscription", d: "Basic plan, billed in USD", v: "≈ ৳4,700" },
  { n: "Apps & plugins", d: "COD forms, reviews, courier connectors", v: "≈ ৳3,800" },
  { n: "Payment workarounds", d: "Gateway + conversion fees", v: "≈ ৳2,000+" },
  { n: "Designer / agency", d: "Theme fixes, banners, ad creatives", v: "≈ ৳6,000+" },
];

const NEW_BILL = [
  { n: "Store + Store Studio", d: "Design it yourself — theme gallery, Bangla fonts" },
  { n: "COD, bKash & Nagad", d: "Native checkout, no gateway workarounds" },
  { n: "Couriers + Grow Labs", d: "Steadfast · Pathao · RedX, campaigns, broadcasts" },
  { n: "Nova — your Acting CEO", d: "Marketing, support, ops. On duty 24/7" },
];

const dayPill = lime => ({
  display: "inline-block", padding: "6px 13px", borderRadius: 99,
  ...(lime ? { background: "#C6F035", color: "#0F120B" } : { background: "#1A1D12", color: "#C6F035" }),
  fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
});

const WEEKEND = [
  { d: "FRIDAY", t: "Export & hand over", b: "One CSV export and store access. We map products, variants, customers and order history overnight.", lime: false },
  { d: "SATURDAY", t: "Review your new store", b: "Everything imported, storefront rebuilt in Store Studio with a theme you pick. You click around and correct.", lime: true },
  { d: "SUNDAY", t: "Domain flips, Nova starts", b: "DNS + redirects go live, old links keep working. Nova begins its first night shift at 00:00.", lime: false },
];

const MOVES = ["Products & variants", "Customers", "Order history", "Reviews", "Images", "Domain & redirects"];

const FAQ = [
  { q: "Will my Google ranking break?", a: "No — every old URL gets a permanent redirect to its new home, and your domain stays yours. Rankings follow the redirects." },
  { q: "What happens to my theme?", a: "Themes don't transfer between platforms — instead you rebuild in Store Studio in an afternoon: theme gallery, your brand colors, Bangla fonts, no developer." },
  { q: "Am I locked in?", a: "No contract, monthly billing, and your data (products, customers, orders) exports to CSV anytime. We keep you by being better, not by holding the door." },
];

export default function SwitchPage() {
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), var(--dk-font-bn), sans-serif", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/switch" />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav active="switch" ctaHref="#cta" ctaLabel="Plan my switch" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "76px 28px 20px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", color: "#3E7A45", animation: "heroUp .6s ease both" }}>SWITCHING FROM {PLAT.toUpperCase()}</div>
        <h1 style={{ margin: "22px auto 0", fontSize: 64, lineHeight: 1.03, letterSpacing: "-2.6px", fontWeight: 800, maxWidth: 760, animation: "heroUp .6s .08s ease both" }}>
          Leave the tools.<br />Gain a{" "}
          <span style={{ position: "relative", whiteSpace: "nowrap" }}>team<span style={{ position: "absolute", left: 0, right: 0, bottom: 6, height: 14, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>.
        </h1>
        <p style={{ margin: "20px auto 0", fontSize: 17, lineHeight: 1.6, color: "#6B6D60", maxWidth: 480, animation: "heroUp .6s .16s ease both" }}>Concierge migration over one weekend. Your store keeps selling the whole time — and on Monday it has a CEO.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
          <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700 }}>
            Plan my switch
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
          <a href="#math" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "15px 24px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700 }}>See the math</a>
        </div>
      </div>

      {/* THE MATH */}
      <div id="math" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 880, margin: "0 auto", alignItems: "stretch" }} data-reveal>
          <div style={{ borderRadius: 28, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.08)", padding: 30, display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: "#6B6D60" }}>YOUR {PLAT.toUpperCase()} STACK · MONTHLY</div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
              {OLD_BILL.map(ob => (
                <div key={ob.n} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, paddingBottom: 11, borderBottom: "1px dashed rgba(26,29,18,0.1)" }}>
                  <div><div style={{ fontSize: 13.5, fontWeight: 700 }}>{ob.n}</div><div style={{ fontSize: 11, color: "#6B6D60", marginTop: 1 }}>{ob.d}</div></div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#6B6D60", whiteSpace: "nowrap" }}>{ob.v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#6B6D60" }}>Typical total — and still no CEO</span>
              <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px", color: "#B03A2E" }}>≈ ৳16,500<span style={{ fontSize: 13, fontWeight: 600, color: "#6B6D60" }}>/mo</span></span>
            </div>
          </div>
          <div style={{ borderRadius: 28, background: "#0F120B", color: "#E9EFDC", padding: 30, display: "flex", flexDirection: "column", boxShadow: "0 30px 70px rgba(15,18,11,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: "#8CBF33" }}>THE SAME STORE ON DAKIO</div>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
            </div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
              {NEW_BILL.map(nb => (
                <div key={nb.n} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 11, borderBottom: "1px dashed rgba(255,255,255,0.1)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M20 6L9 17l-5-5" /></svg>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 13.5, fontWeight: 700, color: "#FBFBF4" }}>{nb.n}</div><div style={{ fontSize: 11, color: "#A9AD98", marginTop: 1 }}>{nb.d}</div></div>
                  <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.08em", color: "#8CBF33" }}>INCLUDED</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#A9AD98" }}>One plan — Growth</span>
              <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px", color: "#C6F035" }}>৳1,490<span style={{ fontSize: 13, fontWeight: 600, color: "#A9AD98" }}>/mo</span></span>
            </div>
          </div>
        </div>
        <div data-reveal style={{ textAlign: "center", marginTop: 14, fontSize: 11.5, color: "#6B6D60" }}>Typical stack for a BD merchant on a $39 plan with paid apps and a designer retainer, at July 2026 rates. Your bill may differ — bring it, we&apos;ll do the math with you.</div>
      </div>

      {/* THE WEEKEND */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>THE PLAN</div>
          <h2 style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800 }}>One weekend. We carry the boxes.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          {WEEKEND.map(wk => (
            <div key={wk.d} style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
              <div style={dayPill(wk.lime)}>{wk.d}</div>
              <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 14 }}>{wk.t}</div>
              <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 7, lineHeight: 1.6 }}>{wk.b}</div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ marginTop: 14, borderRadius: 20, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", color: "#3E7A45", flexShrink: 0 }}>WHAT MOVES ·</span>
          {MOVES.map(t => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 99, background: "#ffffff", border: "1px solid rgba(26,29,18,0.09)", fontSize: 12.5, fontWeight: 700 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3E7A45" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>{t}
            </span>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#6B6D60" }}>SEO redirects included — your links keep working.</span>
        </div>
      </div>

      {/* WHAT YOU GAIN */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }} data-reveal>
          <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#3E7A45" }}>WHY IT&apos;S WORTH THE WEEKEND</div>
          <h2 style={{ margin: "14px auto 0", fontSize: 52, lineHeight: 1.05, letterSpacing: "-2px", fontWeight: 800, maxWidth: 660 }}>What {PLAT} never gave you.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} data-reveal>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1px" }}>৳</div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 10 }}>COD + bKash native</div>
            <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 7, lineHeight: 1.6 }}>The checkout Bangladesh actually uses — no plugins, no USD fees, no workarounds.</div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>{["bKash", "Nagad", "COD"].map(t => <span key={t} style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10.5, fontWeight: 700 }}>{t}</span>)}</div>
          </div>
          <div style={{ borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", padding: 26 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1A1D12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 10 }}>Courier rails built in</div>
            <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 7, lineHeight: 1.6 }}>Steadfast, Pathao and RedX booked in one tap, with COD collection tracked to the taka.</div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>{["Steadfast", "Pathao", "RedX"].map(t => <span key={t} style={{ padding: "5px 11px", borderRadius: 99, background: "#EEEBDF", fontSize: 10.5, fontWeight: 700 }}>{t}</span>)}</div>
          </div>
          <a href="/nova" className="hv-up3" style={{ display: "block", borderRadius: 26, background: "#0F120B", color: "#E9EFDC", padding: 26 }}>
            <span style={{ display: "inline-block", width: 30, height: 30, borderRadius: "50%", background: "radial-gradient(circle at 32% 28%, #F4FFD6, #C6F035 45%, #6FA524 90%)", animation: "breathe 5s ease-in-out infinite" }} />
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", marginTop: 10, color: "#FBFBF4" }}>And a CEO</div>
            <div style={{ fontSize: 13, color: "#A9AD98", marginTop: 7, lineHeight: 1.6 }}>{PLAT} gives you tools; you&apos;re still every employee. Dakio staffs the back office from day one.</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 14, fontSize: 12.5, fontWeight: 700, color: "#C6F035" }}>Meet Nova <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></div>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }} data-reveal>
          <h2 style={{ margin: 0, fontSize: 40, lineHeight: 1.08, letterSpacing: "-1.4px", fontWeight: 800 }}>The three questions everyone asks.</h2>
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
      <div id="cta" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 20px 60px" }}>
        <div data-reveal style={{ borderRadius: 36, background: "#C6F035", padding: "76px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: "50%", top: -160, transform: "translateX(-50%)", width: 520, height: 520, borderRadius: "50%", border: "1px dashed rgba(26,29,18,0.2)", animation: "orbitcw 50s linear infinite" }} />
          <h2 style={{ position: "relative", margin: "0 auto", fontSize: 56, lineHeight: 1.04, letterSpacing: "-2.3px", fontWeight: 800, maxWidth: 720 }}>Friday you export.<br />Monday you have a CEO.</h2>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <a href="#" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "16px 30px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15.5, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite" }} />Plan my switch
            </a>
            <a href="/" className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "16px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15.5, fontWeight: 700 }}>Back to Dakio</a>
          </div>
          <div style={{ position: "relative", marginTop: 20, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(26,29,18,0.6)" }}>CONCIERGE MIGRATION · FREE ON GROWTH &amp; BUSINESS PLANS · NO CONTRACT</div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
