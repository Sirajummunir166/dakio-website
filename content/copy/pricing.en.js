// Pricing copy — English.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "৳ BANGLADESH PRICING · GOING GLOBAL SOON",
  planLevels: ["NOVA L0–L1 ADVISOR", "NOVA L3 OPERATOR", "NOVA L4 ACTING CEO"],
  meterKicker: "THE METER, IN PLAIN WORDS",
  perTask: "= 1 TASK",
  voiceMinutes: "= NOVA MINUTES",
  runOut: "WHEN TASKS RUN OUT",
  draftMode: "DRAFT MODE · TASKS USED 750/750",
  anchorKicker: "THE REAL COMPARISON",
  anchorFoot: "PREMIUM WORK · REASONABLE TAKA · WE’RE NOT THE CHEAPEST, WE’RE THE BEST HIRE",
  switchKicker: "COMING FROM SHOPIFY?",
  ctaStrip: "NO CARD TO START · MONTHLY BILLING · YOUR DATA EXPORTS ANYTIME",
};

const pricing = {
  meta: {
    title: "Dakio Pricing — Plans in Taka, AI CEO Included | Free to Start",
    description:
      "Free forever to start. Growth ৳1,490/mo, Business ৳3,990/mo — every plan includes Nova. Honest task metering, no hidden fees, courier rates passed through.",
  },

  hero: {
    h1: (
      <>
        Your whole back office, for less than <Mark bottom={6} height={14}>one employee</Mark>.
      </>
    ),
    sub: "A shop assistant costs ৳12,000 a month and works ten hours. Nova works around the clock — and every plan includes it.",
    monthly: "Monthly",
    annual: "Annual — 2 months free",
  },

  plans: [
    {
      n: "Starter", audience: "Get online, meet Nova",
      prMo: "Free", prYr: "Free", sub: "forever", noteMo: "no card needed", noteYr: "no card needed",
      cta: "Start free", dark: false, pop: false,
      feats: ["Store + Store Studio & theme gallery", "Orders, couriers & COD · bKash · Nagad", "Nova Advisor — 50 tasks/mo", "Morning brief, read-only", "Up to 30 products"],
    },
    {
      n: "Growth", audience: "The default for running shops",
      prMo: "৳1,490", prYr: "৳1,242", sub: "/month", noteMo: "billed monthly", noteYr: "billed ৳14,900/year",
      cta: "Choose Growth", dark: false, pop: true,
      feats: ["Everything in Starter, unlimited products", "Nova Operator — 750 tasks/mo", "Grow Labs + Supplier Network", "Ads Gallery — static exports", "Decision desk, receipts & undo"],
    },
    {
      n: "Business", audience: "The full CEO seat",
      prMo: "৳3,990", prYr: "৳3,325", sub: "/month", noteMo: "billed monthly", noteYr: "billed ৳39,900/year",
      cta: "Start 14-day free trial", dark: true, pop: false,
      feats: ["Everything in Growth", "Acting CEO — 2,500 tasks/mo", "60 Nova voice minutes — briefs, alerts, COD confirms", "Seasonal playbooks (Eid, Puja, 11.11)", "Motion ad renders + staff logins", "Concierge migration included"],
    },
  ],

  plansNote: (
    <>
      Every new store gets <b style={{ color: "#1A1D12" }}>14 days of Business, free</b> — meet the full CEO before you choose. Courier deliveries billed per shipment on all plans.
    </>
  ),

  meter: {
    h2: "What’s a Nova task?",
    p: "One finished piece of work — not a token, not an API call. The Hours-Saved report shows you every task and what it was worth.",
    chips: ["Customer reply answered", "Listing written from a photo", "Ad creative generated", "Abandoned cart recovered", "Reorder drafted"],
    voiceChip: "Voice call",
    draft: {
      h3: "Nova never just stops. It shifts to Draft mode.",
      quote: "“I’ve queued 12 replies and 2 campaigns as drafts — nothing executes until you top up or the month resets. Nothing is lost.”",
      topUp: "Top up — ৳250 / 250 tasks",
      wait: "Wait for reset",
      note: "Prepared work executes the moment you top up. Honest billing is the same product as honest AI.",
    },
  },

  anchor: {
    h2: (
      <>
        Don’t compare us to software.<br />Compare us to payroll.
      </>
    ),
    employee: {
      title: "One shop assistant",
      price: "৳12,000",
      per: "/month",
      lines: ["10 hours a day, 6 days a week", "Knows one job", "Needs training, leave, supervision"],
    },
    nova: {
      title: "Nova — Acting CEO",
      price: "৳3,990",
      per: "/month, Business plan",
      lines: ["24/7 — nights, Eid, monsoon", "10 departments, 65 duties", "Every action receipted & undoable"],
    },
  },

  switchStrip: {
    headline: (
      <>
        Their stack: ≈ ৳16,500/mo.<br />Dakio Growth: ৳1,490 — CEO included.
      </>
    ),
    cta: "See the full math",
  },

  faq: {
    h2: "Fair questions.",
    items: [
      { q: "Why not unlimited AI?", a: "Nova does real work on real compute — unlimited would mean either fake AI or hidden throttling. We'd rather sell you an honest meter with receipts than a soft lie." },
      { q: "What happens when my tasks run out?", a: "Nova shifts to Draft mode: it keeps preparing everything but executes nothing until you top up (৳250 / 250 tasks) or the month resets. Nothing is lost, nothing is silent." },
      { q: "What do couriers cost?", a: "Per-delivery, passed through at the courier's rate (Steadfast, Pathao, RedX) on every plan — we don't mark up shipping." },
      { q: "I'm not in Bangladesh — can I use Dakio?", a: "Soon. We built for Bangladesh first — ৳, bKash, COD, Bangla — and global markets open next with local pricing, not conversions. Join the waitlist from the signup page." },
    ],
  },

  cta: {
    h2: "Fourteen days with the full CEO. Free.",
    primary: "Start the Business trial",
    secondary: "Back to Dakio",
  },
};

export default pricing;
