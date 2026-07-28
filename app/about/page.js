// About — 1:1 port of "Dakio About.dc.html". This page family (About/Blog/
// Contact) uses plain var(--dk-font-sans), a green pulseRing variant and a
// page-wide a:hover ink rule (.company-root).

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Reveal from "../../components/Reveal";
import LogoDefs from "../../components/Logo";
import PageJsonLd from "../../components/PageJsonLd";
import { REGISTER_URL } from "../../lib/urls";

export const metadata = {
  title: "About Dakio — Built in Bangladesh by Digidhaka",
  description:
    "We gave Bangladesh's entrepreneurs world-class tools, then a team: every Dakio store appoints Nova, an AI CEO, on day one. 1,000+ merchants across 64 districts.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { v: "1,000+", l: "Active Merchants" },
  { v: "100K+", l: "Orders Processed" },
  { v: "৳50Cr+", l: "GMV on Platform" },
  { v: "64", l: "Districts Reached" },
];

const MISSION = [
  "Make powerful ecommerce tools simple enough for first-time sellers.",
  "Integrate every platform Bangladesh merchants actually use — not just global ones.",
  "Keep pricing honest. No hidden fees. No surprise charges.",
  "Make AI accountable — every Nova action carries a receipt, an undo, and your guardrails.",
];

const VALUES = [
  { dot: { background: "#3E7A45" }, t: "Merchants first", d: "Every feature we build starts with one question: does this make life easier for a merchant in Bangladesh? If the answer is no, we don't build it." },
  { dot: { background: "#C6F035", boxShadow: "0 0 0 1px rgba(26,29,18,0.15)" }, t: "Zero friction", d: "A merchant shouldn't need a developer, an IT team, or a manual to run their business. Dakio handles the complexity so they can focus on selling." },
  { dot: { background: "#1A1D12" }, t: "Built for Bangladesh", d: "bKash, Nagad, Pathao, RedX, Steadfast — we integrate what Bangladesh merchants actually use, not what works in other countries." },
  { dot: { background: "#7a5119" }, t: "Trust through transparency", d: "No hidden fees, no surprise charges. Merchants see exactly what they're paying, what they're getting, and what they're earning." },
];

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const CONTACTS = [
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    label: "HQ",
    body: <>House 5, Road 5, Priyanka City,<br />Sector 12, Uttara, Dhaka</>,
  },
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4" /></svg>,
    label: "Registered office",
    body: <>253-254, Dr. Kudrat-e-Khuda Road,<br />(Kataban), Dhaka</>,
  },
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>,
    label: "Email",
    body: <a href="mailto:hello@dakio.io" className="hv-green">hello@dakio.io</a>,
  },
  {
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#C6F035" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" /></svg>,
    label: "Phone",
    body: <a href="tel:01521305403" className="hv-green">01521 305 403</a>,
  },
];

export default function AboutPage() {
  return (
    <div className="company-root" style={{ fontFamily: "var(--dk-font-sans)", color: "#1A1D12", background: "#F4F2EA", overflowX: "hidden" }}>
      <PageJsonLd route="/about" />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />

      <SiteNav ctaHref="#cta" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      {/* HERO */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "88px 28px 64px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 760, height: 420, background: "radial-gradient(closest-side, rgba(198,240,53,0.4), rgba(198,240,53,0) 100%)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 99, background: "rgba(198,240,53,0.35)", border: "1px solid rgba(26,29,18,0.1)", fontSize: 12.5, fontWeight: 600, color: "#3E7A45", animation: "heroUp .6s ease both" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#3E7A45", animation: "pulseRingGreen 2.2s infinite" }} />Digidhaka Communication Limited
          </div>
          <h1 className="m-h1" style={{ margin: "22px auto 0", fontSize: 60, lineHeight: 1.04, letterSpacing: "-2.4px", fontWeight: 800, maxWidth: 700, animation: "heroUp .6s .08s ease both" }}>
            Meet <span style={{ position: "relative", whiteSpace: "nowrap" }}>Dakio<span style={{ position: "absolute", left: 0, right: 0, bottom: 5, height: 13, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>
          </h1>
          <p style={{ margin: "20px auto 0", fontSize: 17, lineHeight: 1.65, color: "#6B6D60", maxWidth: 540, animation: "heroUp .6s .16s ease both" }}>
            We started by giving Bangladesh&apos;s entrepreneurs world-class tools. Then we realized tools weren&apos;t the real gap — <b style={{ color: "#1A1D12" }}>a team was</b>. So every Dakio store now comes with a CEO.
          </p>
          <div className="m-wrap" style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 30, animation: "heroUp .6s .24s ease both" }}>
            <a href="#cta" className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "14px 26px", borderRadius: 99, background: "#C6F035", color: "#1A1D12", fontSize: 15, fontWeight: 700 }}>
              Start selling free <Arrow />
            </a>
            <a href="#contact" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", padding: "14px 24px", borderRadius: 99, background: "transparent", border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12", fontSize: 15, fontWeight: 700 }}>Get in touch</a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
        <div data-reveal className="m-stats2" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(26,29,18,0.08)", borderBottom: "1px solid rgba(26,29,18,0.08)" }}>
          {STATS.map((s, i) => (
            <div key={s.l} style={{ padding: "34px 20px", textAlign: "center", ...(i < 3 ? { borderRight: "1px solid rgba(26,29,18,0.08)" } : {}) }}>
              <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px" }}>{s.v}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#6B6D60", marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OUR STORY */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "96px 28px 20px" }}>
        <div data-reveal className="m-grid m-gap" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 56, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#3E7A45", textTransform: "uppercase" }}>Our story</div>
            <h2 className="m-h2b" style={{ margin: "14px 0 0", fontSize: 42, lineHeight: 1.1, letterSpacing: "-1.6px", fontWeight: 750 }}>
              Built in Bangladesh,{" "}
              <span style={{ position: "relative", whiteSpace: "nowrap" }}>for Bangladesh.<span style={{ position: "absolute", left: 0, right: 0, bottom: 3, height: 11, background: "#C6F035", zIndex: -1, borderRadius: 3 }} /></span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 15.5, lineHeight: 1.7, color: "#6B6D60" }}>
            <p style={{ margin: 0, color: "#1A1D12", fontWeight: 500 }}>Dakio started with a simple observation: Bangladeshi merchants were stitching together 5–6 different tools just to run a basic online store. One for orders. One for couriers. One for payments. One for products. One for customers. None of them talking to each other.</p>
            <p style={{ margin: 0 }}>The founders of Digidhaka Communication Limited — having worked closely with hundreds of local merchants — saw this problem up close. These merchants were smart, hardworking, and determined. But the tools available to them were either built for foreign markets, too expensive, or too complicated to use.</p>
            <p style={{ margin: 0 }}>So we built Dakio. One platform that handles everything a Bangladesh merchant needs — from the first product listing to the thousandth order delivery — with integrations built specifically for the Bangladesh ecosystem: bKash, Nagad, Pathao, RedX, Steadfast, and more.</p>
            <p style={{ margin: 0 }}>And then we went further. Tools solve the evening&apos;s work; they don&apos;t solve running a whole business alone. So we built <b style={{ color: "#1A1D12" }}>Nova</b> — an Acting CEO every store appoints on day one. It plans, executes and reports 24/7, inside guardrails the founder sets, with a receipt for everything it touches.</p>
            <p style={{ margin: 0, color: "#1A1D12", fontWeight: 500 }}>Today, more than 1,000 merchants across 64 districts run their businesses on Dakio — and none of them run alone. We&apos;re just getting started.</p>
          </div>
        </div>
      </div>

      {/* MISSION */}
      <div className="m-bleed-wrap" style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px 20px" }}>
        <div data-reveal className="m-grid m-pad-band m-gap m-bleed" style={{ borderRadius: 32, background: "#1A1D12", color: "#F0EFE6", padding: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#C6F035", textTransform: "uppercase" }}>Our mission</div>
            <h2 className="m-h2b" style={{ margin: "16px 0 0", fontSize: 34, lineHeight: 1.16, letterSpacing: "-1px", fontWeight: 750, color: "#fff" }}>Give every merchant the team that was only available to big brands.</h2>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.65, color: "rgba(240,239,230,0.6)", maxWidth: 420 }}>A merchant in Khulna or Rajshahi deserves what a funded company in Dhaka has — a marketing team, a support desk, an operations lead. Dakio levels the field with one appointment: Nova. The best product wins, not the best-staffed one.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MISSION.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "18px 20px", borderRadius: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#C6F035", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, lineHeight: 1.55, color: "rgba(240,239,230,0.85)" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#6B6D60", textTransform: "uppercase" }}>What we stand for</div>
          <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 40, lineHeight: 1.12, letterSpacing: "-1.4px", fontWeight: 750 }}>Our values</h2>
        </div>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 920, margin: "0 auto" }}>
          {VALUES.map(v => (
            <div key={v.t} data-reveal className="hv-up3" style={{ padding: 26, borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)" }}>
              <span style={{ display: "block", width: 9, height: 9, borderRadius: 99, marginBottom: 14, ...v.dot }} />
              <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.3px" }}>{v.t}</div>
              <div style={{ fontSize: 13.5, color: "#6B6D60", marginTop: 8, lineHeight: 1.6 }}>{v.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div id="contact" style={{ maxWidth: 1160, margin: "0 auto", padding: "84px 28px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }} data-reveal>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.4px", color: "#6B6D60", textTransform: "uppercase" }}>Find us</div>
          <h2 className="m-h2b" style={{ margin: "12px auto 0", fontSize: 40, lineHeight: 1.12, letterSpacing: "-1.4px", fontWeight: 750 }}>Get in touch</h2>
        </div>
        <div className="m-grid2-1" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, maxWidth: 800, margin: "0 auto" }}>
          {CONTACTS.map(c => (
            <div key={c.label} data-reveal className="hv-up3" style={{ padding: 26, borderRadius: 26, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.06)", textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "#1A1D12", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{c.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.6px", color: "#6B6D60", textTransform: "uppercase" }}>{c.label}</div>
              <div style={{ fontSize: 14.5, fontWeight: 500, marginTop: 7, lineHeight: 1.55 }}>{c.body}</div>
            </div>
          ))}
        </div>
        <div data-reveal style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
          <a href="mailto:hello@dakio.io" className="hv-bg-ink05" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 10, background: "transparent", border: "1px solid rgba(26,29,18,0.18)", color: "#1A1D12", fontSize: 14.5, fontWeight: 700 }}>
            Send a message <Arrow size={14} />
          </a>
        </div>
      </div>

      {/* CTA */}
      <div id="cta" className="m-bleed-wrap" style={{ maxWidth: 1160, margin: "64px auto 0", padding: "0 28px" }}>
        <div data-reveal className="m-pad-cta m-bleed" style={{ borderRadius: 32, background: "#C6F035", padding: "60px 40px", textAlign: "center" }}>
          <h2 className="m-cta-h2" style={{ margin: "0 auto", fontSize: 44, lineHeight: 1.08, letterSpacing: "-1.6px", fontWeight: 800, maxWidth: 640 }}>Join 1,000+ merchants who don&apos;t run alone.</h2>
          <p style={{ margin: "16px auto 0", fontSize: 16, color: "#1A1D12", maxWidth: 440, lineHeight: 1.6 }}>Start free today — and appoint your CEO on day one. No card, no setup fee.</p>
          <div className="m-wrap" style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 30 }}>
            <a href={REGISTER_URL} className="hv-up2" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 28px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 15, fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: "#C6F035", animation: "pulseRingGreen 2.2s infinite" }} />Start selling free
            </a>
            <a href="/nova" className="hv-bg-ink08" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 99, border: "1.5px solid rgba(26,29,18,0.35)", color: "#1A1D12", fontSize: 15, fontWeight: 700 }}>Meet Nova</a>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
