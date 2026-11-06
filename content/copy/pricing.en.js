// Pricing copy — English.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "৳ TAKA PRICING FOR BANGLADESH",
  // Outside Bangladesh (lib/region.js): the dollar page's badge and strip.
  heroBadgeIntl: "US DOLLAR PRICING · TAX ADDED WHERE IT APPLIES",
  planLevels: ["NOVA ADVISOR", "NOVA AI CEO", "NOVA AI CEO + VOICE"],
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
    // The description is replaced by live prices when the API answers (lib/plans.js).
    title: "Dakio Pricing: Plans in Taka, AI CEO Included",
    description:
      "Free forever. Growth from ৳2,980 a month on yearly, Business from ৳7,980. Every plan includes Nova. No hidden fees, courier rates passed through.",
  },

  hero: {
    h1: (
      <>
        Your whole back office, for less than <Mark bottom={6} height={14}>one employee</Mark>.
      </>
    ),
    sub: "A shop assistant costs ৳12,000 a month and works ten hours. Nova works around the clock, in every plan.",
  },

  plansNote: "Courier deliveries are billed per shipment on all plans.",
  demo: "Just looking? See Dakio running",

  // The comparison table (DAKIO_GROWTH_SYSTEM.md §25.1, lib/compare.js). Labels
  // per kind of business where they differ: `shop` and `svc`.
  compare: {
    kindLabel: "Show it for",
    kinds: { shop: "Shops", svc: "Services" },
    popular: "Most stores choose this",
    startFree: "Start free",
    diamondNote: "Business: autopilot",
    tiers: {
      free: { tag: "Start", line: "Your store, live today." },
      growth: { tag: "You run it", line: "Nova answers. You decide." },
      business: { tag: "Autopilot", line: "Nova runs it for you." },
    },
    rows: {
      store: { shop: "Your store", svc: "Your booking site" },
      products: { shop: "Products", svc: "Services" },
      orders: { shop: "Orders a month", svc: "Bookings a month" },
      team: { shop: "Team", svc: "Staff calendars" },
      pos: { shop: "Shop counter (POS)", svc: "Quotes and invoices" },
      answers: "Nova answers",
      acts: "Nova acts on its own",
      followUps: { shop: "Follow-ups and cart recovery", svc: "Books in chat, sends reminders" },
      orderShield: { shop: "Confirmation calls", svc: "Chases no-shows" },
      whatsapp: { shop: "WhatsApp order updates", svc: "WhatsApp booking updates" },
      brief: "Daily brief with actions",
      marketing: "Marketing",
      adImages: "Ad images",
      aiWriting: { shop: "AI product writing", svc: "AI service writing" },
      adVideos: "Ad videos",
      money: "Money",
      talk: "Talk to Nova",
      monthly: "Every month you get",
      credits: "Nova credits",
      sms: "SMS",
      voice: "Nova voice minutes",
      storage: "Media storage",
      topups: "Top-ups",
    },
    v: {
      unlimited: "Unlimited",
      subdomain: "Dakio subdomain, all themes",
      ownDomain: "Your own domain, no Dakio badge",
      dropship: "dropship",
      upTo: "up to",
      ownerOnly: "Owner only",
      withHr: "with HR",
      oneChannel: "One channel",
      everyChannel: "Every channel",
      everyChannelChat: "Every channel + website chat",
      everyChannelComments: "Every channel, website chat + comments",
      threeAMonth: "3 a month",
      moneyBasic: "This month's P&L",
      moneyFull: "Full accounting",
      moneyPro: "Full accounting + profit per order and per ad",
      topups: "Credits, SMS",
      topupsVoice: "Credits, SMS, voice minutes",
    },
  },

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
      lines: ["24/7 — nights, Eid, monsoon", "Messenger, Instagram, WhatsApp and website chat", "Every action receipted & undoable"],
    },
  },

  // `{price}` is Growth's per-month price on the period the page opens on (lib/plans.js).
  switchStrip: {
    stack: "Their stack: ≈ ৳16,500/mo.",
    ours: "Dakio Growth: {price} a month, CEO included.",
    price: "৳2,980",
    cta: "See the full math",
  },

  faq: {
    h2: "Fair questions.",
    items: [
      { q: "Is Free really free forever?", a: "Yes. No card, no time limit. Your store stays open and keeps selling within Free's limits." },
      { q: "What is the autopilot trial?", a: "14 days of Business, once. When your store is ready, you start it. It never starts by itself." },
      { q: "Monthly or yearly?", a: "Monthly is the full price. Every saving is on yearly, the launch price too." },
      { q: "Can I use an influencer code?", a: "Yes, on yearly. You pay the lower of the code or the launch price, never both." },
    ],
  },

  cta: {
    h2: "Your store. Your CEO. Today.",
    primary: "Open your store",
    secondary: "Back to Dakio",
  },
};

export default pricing;
