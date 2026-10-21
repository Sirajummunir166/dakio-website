// Pricing copy — English.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "৳ BANGLADESH PRICING · GOING GLOBAL SOON",
  // Outside Bangladesh (lib/region.js): the dollar page's badge and strip.
  heroBadgeIntl: "US DOLLAR PRICING · TAX ADDED WHERE IT APPLIES",
  planLevels: ["NOVA L0–L1 ADVISOR", "NOVA L3 OPERATOR", "NOVA L4 ACTING CEO"],
  meterKicker: "THE METER, IN PLAIN WORDS",
  perTask: "= 1 CREDIT",
  voiceMinutes: "= NOVA MINUTES",
  runOut: "WHEN CREDITS RUN OUT",
  draftMode: "DRAFT MODE · CREDITS USED 750/750",
  anchorKicker: "THE REAL COMPARISON",
  anchorFoot: "PREMIUM WORK · REASONABLE TAKA · WE’RE NOT THE CHEAPEST, WE’RE THE BEST HIRE",
  switchKicker: "COMING FROM SHOPIFY?",
  ctaStrip: "PAY IN TAKA · bKASH, NAGAD OR CARD · YOUR DATA EXPORTS ANYTIME",
  ctaStripIntl: "PAY BY CARD OR PAYPAL · BILLED IN USD · CANCEL ANYTIME · YOUR DATA EXPORTS ANYTIME",
};

const pricing = {
  meta: {
    // The metadata is NOT fetched — generateMetadata runs off this copy, so a
    // free-tier claim here would keep appearing in search results long after the
    // tier was withdrawn. It says trial, because that is what is on offer.
    title: "Dakio Pricing — Plans in Taka, AI CEO Included",
    description:
      "Growth ৳1,490/mo, Business ৳3,990/mo — every plan includes Nova. Honest credit metering, no hidden fees, courier rates passed through.",
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

  // FALLBACK ONLY — the live cards come from lib/plans.js#getPricingCopy. The
  // Starter tier is gone from here because it is no longer on sale; existing free
  // stores keep it, but nobody new can be sent to it.
  plans: [
    {
      n: "Growth", audience: "The default for running shops",
      prMo: "৳1,490", prYr: "৳1,242", sub: "/month", noteMo: "billed monthly", noteYr: "billed ৳14,900/year",
      cta: "Choose Growth", dark: false, pop: true,
      feats: ["Unlimited products, no daily order cap", "Nova Operator — 7,500 Nova credits/month", "Grow Suite + Supplier Network", "Ads Gallery — static exports", "Decision desk, receipts & undo"],
    },
    {
      n: "Business", audience: "The full CEO seat",
      prMo: "৳3,990", prYr: "৳3,325", sub: "/month", noteMo: "billed monthly", noteYr: "billed ৳39,900/year",
      cta: "Choose Business", dark: true, pop: false,
      feats: ["Everything in Growth", "Acting CEO — 25,000 Nova credits/month", "60 Nova voice minutes/month — briefs, alerts, COD confirms", "Seasonal playbooks (Eid, Puja, 11.11)", "Motion ad renders + staff logins", "Concierge migration included"],
    },
  ],

  plansNote: "Courier deliveries are billed per shipment on all plans.",

  meter: {
    h2: "What’s a Nova credit?",
    p: "One credit is one finished piece of work — not a token, not an API call. The Hours-Saved report shows you every one and what it was worth.",
    chips: ["Customer reply answered", "Listing written from a photo", "Ad creative generated", "Abandoned cart recovered", "Reorder drafted"],
    voiceChip: "Voice call",
    draft: {
      h3: "Nova never just stops. It shifts to Draft mode.",
      quote: "“I’ve queued 12 replies and 2 campaigns as drafts — nothing executes until you top up or the month resets. Nothing is lost.”",
      topUp: "Top up — ৳250 / 250 credits",
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
      { q: "What happens when my credits run out?", a: "Nova shifts to Draft mode: it keeps preparing everything but executes nothing until you top up (৳250 / 250 credits) or the month resets. Nothing is lost, nothing is silent." },
      { q: "What do couriers cost?", a: "Per-delivery, passed through at the courier's rate (Steadfast, Pathao, RedX) on every plan — we don't mark up shipping." },
      { q: "I'm not in Bangladesh — can I use Dakio?", a: "Yes. Outside Bangladesh you pay in US dollars by card or PayPal, with tax added where it applies, and the plan renews by itself until you cancel. Your inbox, Nova and customer records work everywhere today; the online store and courier partners are Bangladesh-only for now and come to more countries next. Paddle, our reseller, charges only for Dakio software (your plan and Nova credits): Dakio doesn't sell or ship physical goods; you sell your own products to your own customers." },
    ],
  },

  cta: {
    h2: "Your store. Your CEO. Today.",
    primary: "Open your store",
    secondary: "Back to Dakio",
  },
};

export default pricing;
