// Front Office — 1:1 port of "Dakio Front Office Page.dc.html".

import PlayFirstPage, { Highlight } from "../../components/PlayFirstPage";

export const metadata = {
  title: "Front Office — AI That Sells in Your Inbox | Dakio",
  description:
    "Messenger, Instagram, WhatsApp and email in one thread. Nova answers in Bangla, takes orders only after the customer confirms, and cuts RTO. You can take over anytime.",
  alternates: { canonical: "/front-office" },
};

const MONO = "var(--dk-font-mono), monospace";
const PROTO = "/prototypes/Nova Inbox - Front Office.dc.html";

export default function FrontOfficePage() {
  return (
    <PlayFirstPage
      route="/front-office"
      active="front-office"
      navCtaHref={PROTO}
      navCtaLabel="Open Front Office"
      kicker="FRONT OFFICE · THE REAL INBOX, LIVE"
      h1={<>Nova sells<br />in your <Highlight>inbox</Highlight>.</>}
      h1MaxWidth={760}
      sub="Messenger, Instagram, WhatsApp, email — one thread each, Nova answering in Bangla, taking orders only after the customer says yes. Below is the real thing."
      subMaxWidth={490}
      barUrl="app.dakio.io/inbox — Shahrqee (demo threads)"
      liveLabel="LIVE — READ THE THREADS"
      iframeSrc={PROTO}
      iframeTitle="Front Office — live"
      tryChips={[
        "Open a NOVA HANDLING thread",
        "Expand a receipt row on a reply",
        "Check the customer 360 rail",
        "Flip the autonomy dial T0–T3",
        "See a CONTEXT BRIEF handover",
      ]}
      featsH2="A salesperson with rules it can't break."
      featsH2MaxWidth={700}
      feats={["Messenger · IG · WhatsApp · Email", "Replies in Bangla, human pacing", 'Orders only after "hae, confirm"', "RTO Shield — pre-dispatch confirm", "Escalates with a context brief", "You take over instantly", "EST vs MEASURED, never summed", "Every reply receipted"]}
      featsMaxWidth={900}
      featsNote={
        <div data-reveal style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 99, background: "#1A1D12", color: "#F0EFE6", fontSize: 13, fontWeight: 600 }}>
          Hard lines, forever:&nbsp;<span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: "#C6F035" }}>NO ORDER WITHOUT CONSENT · REFUNDS FOUNDER-ONLY · &quot;BOT NAKI?&quot; → HONEST ANSWER</span>
        </div>
      }
      ctaH2={<>Stop answering &quot;dam koto?&quot;<br />at midnight.</>}
      ctaH2MaxWidth={760}
      ctaPrimaryLabel="Put Nova on the desk"
      ctaMonoLine="STARTS IN SHADOW MODE · YOU PROMOTE IT · TAKE OVER ANY THREAD, INSTANTLY"
    />
  );
}
