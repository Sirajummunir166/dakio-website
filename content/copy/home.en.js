// Home copy — English. Mirrors the section order of app/[lang]/page.js.
// Mono/all-caps labels live in MONO (shared, never translated — see chrome.en.js
// for why). Demo data that is really *content* (product names, chat lines) is
// here too, because a Bangla page showing English sample messages reads fake.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "THE COMMERCE OS FOR BANGLADESH",
  heroStrip: ["STORE LIVE IN MINUTES", "NO CODE", "৳ · bKASH · COD"],
  heroDuty: "ON DUTY 24/7 · EVERY ACTION RECORDED",
  heroReceipt: "RECEIPT",
  pathsKicker: "TWO WAYS IN",
  pathsFresh: "STARTING FRESH",
  pathsSelling: "ALREADY SELLING",
  launchKicker: "FIRST THINGS FIRST — THE STORE",
  launchStep: "STEP",
  launchAvailable: "AVAILABLE ✓",
  launchLive: "LIVE",
  briefKicker: "06:00 · EVERY MORNING",
  briefBadge: "MORNING BRIEF · SHAHRQEE DEMO STORE",
  briefApprove: "APPROVE / LATER",
  orgKicker: "THE ORGANIZATION",
  orgCeoJob: "PLANS · COORDINATES ALL",
  roomsKicker: "THE PRODUCT — NOT MOCKUPS. CLICK ANY CARD.",
  roomsOpen: "OPEN ↗",
  roomsDecision: "DECISION · MARKETING",
  roomsDecisionEst: "+৳9,400 EST",
  roomsChannels: "ONE THREAD, EVERY CHANNEL",
  roomsOrder: "ORDER #1044 · PLACED AFTER CONFIRMATION · RTO SHIELD ✓",
  roomsGrowNova: "NOVA PREPARED · GROWTH → BROADCAST",
  roomsGrowRecovered: "৳1,14,200 RECOVERED SO FAR",
  roomsAdsClick: "1 CLICK",
  roomsAdsCheck: "3 SIZES + MOTION · EDITABLE · ON-BRAND BY DEFAULT",
  trustKicker: "WHY FOUNDERS TRUST AN AI CEO",
  trustReceiptNo: "RECEIPT · #A-4471",
  trustNoTouch: ["SAREE PRICING", "REFUNDS"],
  bdKicker: "HOME GROUND",
  bdSeason: "SEASON-AWARE PLANNING",
  bdSeasons: ["EID", "PUJA", "BOISHAKH", "11.11", "MONSOON"],
  switchKicker: "SWITCHING?",
  pricingKicker: "PRICING",
  ctaStrip: "FREE TO START · GUARDRAILS ON DAY ONE · EVERY ACTION RECORDED",
};

// Brand names in the partner marquee never translate.
export const MARQUEE = ["bKash", "Nagad", "Cash on delivery", "Steadfast", "Pathao", "RedX", "Facebook", "Instagram", "WhatsApp"];

const home = {
  meta: {
    title: "Dakio — Appoint an AI CEO to Your Online Store | Bangladesh",
    description:
      "Store, couriers, bKash, Nagad & COD — plus Nova, an AI CEO that runs marketing, support and ops 24/7 with a receipt for everything. Start a free trial, no card.",
  },

  hero: {
    h1: (
      <>
        Appoint a CEO<br />to your store<span style={{ color: "#C6F035" }}>.</span>
      </>
    ),
    sub: (
      <>
        Your store, customers, orders, couriers and payments — operated by <b style={{ color: "#E9EFDC" }}>Nova</b>, your AI Acting CEO. Even while you sleep.
      </>
    ),
    ctaPrimary: "Open your store",
    ctaSecondary: "Meet Nova",
    chips: ["84 messages answered", "Cart recovered · ৳2,300", "Weak ad set paused"],
  },

  marquee: { worksWith: "Works with" },

  paths: {
    h2: (
      <>
        How are you<br />starting?
      </>
    ),
    fresh: {
      t: "Build your first store",
      d: "A designed store, your products — or a supplier’s. No developer.",
      cta: "Start from zero",
    },
    selling: {
      t: "Move your business over",
      d: "Products, customers, domain and operations — brought across for you.",
      cta: "Plan my switch",
    },
  },

  launch: {
    h2: (
      <>
        Name it. Fill it. <Mark>It&apos;s live.</Mark>
      </>
    ),
    steps: [
      { time: "~30 SEC", t: "Give your store a name" },
      { time: "~5 MIN", t: "Add your products" },
      { time: "LIVE", t: "Share your link" },
    ],
    name: {
      handle: "shahrqee",
      domain: "shahrqee.dakio.shop",
      yours: "yours instantly",
      note: "A designed storefront is ready the moment you sign up — restyle it anytime.",
    },
    products: {
      a: { n: "Muslin saree — crimson", p: "৳2,300" },
      b: { n: "Jamdani stole — teal", p: "৳1,850" },
      enough: "photo + price is enough",
      supplier: "no stock? pick from suppliers — Dakio ships",
    },
    live: {
      domain: "shahrqee.dakio.shop",
      note: "Share the link on Facebook, Instagram, anywhere — orders, bKash and couriers already work.",
      ceo: "…and your CEO clocks in.",
    },
    foot: "No code. No developer. Your store is live in minutes — and that is only the beginning.",
    footLink: "See everything included →",
  },

  brief: {
    h2: (
      <>
        Wake up to work<br />already <Mark>done</Mark>.
      </>
    ),
    p: "Nova works the night shift and reports at 06:00 — every line backed by evidence you can inspect, with undo wherever the action is reversible.",
    link: "See Nova HQ live",
    hearCall: "Hear it as a call",
    tiles: [
      { v: "৳46,200", l: "revenue overnight" },
      { v: "23", l: "orders confirmed" },
      { v: "84", l: "messages answered" },
      { v: "11", l: "carts recovered" },
      { v: "7", l: "trends found" },
      { v: "6h 40m", l: "your hours saved" },
    ],
    focus: (
      <>
        Today&apos;s focus: scale the <b>Muslin drop</b> campaign — est. <b style={{ color: "#C6F035" }}>+14% weekly profit</b>.{" "}
      </>
    ),
  },

  org: {
    h2: "This is your team now.",
    stats: [
      { v: "1", l: "Acting CEO" },
      { v: "10", l: "departments" },
      { v: "65", l: "named duties" },
    ],
    ceo: "CEO Office",
    depts: [
      { n: "Marketing", j: "PROMOTES" }, { n: "Sales", j: "CLOSES" }, { n: "Support", j: "ANSWERS" },
      { n: "Research", j: "DISCOVERS" }, { n: "Inventory", j: "PREDICTS" }, { n: "Shipping", j: "DELIVERS" },
      { n: "Finance", j: "COUNTS" }, { n: "Operations", j: "SOURCES" }, { n: "Growth", j: "EXPERIMENTS" },
    ],
    note: "Every duty lands in a real module you could run by hand. Nova just never sleeps.",
  },

  rooms: {
    h2: "The rooms your CEO works in.",
    hq: {
      n: "Nova HQ",
      d: "Supervise your CEO — decisions, receipts, live feed.",
      decision: "Scale “Muslin drop” budget ৳800 → ৳1,200/day",
      approve: "Approve",
      later: "Later",
      feed: [
        { t: "Replied to 12 Messenger customers", at: "02:14" },
        { t: "Recovered cart · Taspia K. · ৳2,300", at: "03:41" },
      ],
    },
    studio: {
      n: "Store Studio",
      d: "Design a storefront that doesn’t look like a template.",
      previewDomain: "shahrqee.com",
      previewHeadline: "Eid Muslin Collection",
      themes: "THEMES",
      themesNote: "+ বাংলা fonts · dark mode",
    },
    frontOffice: {
      n: "Front Office",
      d: "One inbox for every channel. Nova sells in it.",
      chat: [
        { from: "customer", t: "Dam koto? Size M ase?" },
        { from: "nova", t: "৳2,300, M stock e ase. Confirm korle order kore dei?" },
        { from: "customer", t: "Hae, confirm koren ✓" },
      ],
      byNova: "BY NOVA",
    },
    grow: {
      n: "Grow Suite",
      d: "The business Grow Suite — six levers, one team.",
      levers: [
        { n: "Campaigns", j: "PROMOTE" }, { n: "Content", j: "CREATE" }, { n: "Broadcast", j: "REACH" },
        { n: "Research", j: "DISCOVER" }, { n: "Growth", j: "IMPROVE" }, { n: "Goals", j: "LEAD" },
      ],
      novaLine: (
        <>
          Eid muslin trending <b style={{ color: "#C6F035" }}>3.2×</b> — campaign drafted, 38 lapsed buyers queued. Nothing sends without you.
        </>
      ),
      review: "Review",
      dismiss: "Dismiss",
    },
    ads: {
      n: "Ads Gallery",
      d: "Pick a product. Get the ad.",
      product: "Muslin Saree",
      creatives: ["EID DROP", "-20%"],
    },
    supplier: {
      n: "Supplier Network",
      d: "Sell without inventory — verified suppliers hold stock, Dakio ships every order.",
      flow: [
        { n: "Supplier", j: "HOLDS STOCK" },
        { n: "Your store", j: "SELLS" },
        { n: "Dakio", j: "PACKS + SHIPS" },
        { n: "Doorstep", j: "COD COLLECTED" },
      ],
    },
  },

  trust: {
    h2: "You hold the guardrails.",
    receipt: {
      title: "Every action has a receipt",
      action: "Paused “Boishakh Reels” campaign",
      evidence: "CPA rose 43% over 3 days · evidence: 72h spend window",
      before: "BEFORE ৳1,200/day",
      after: "AFTER PAUSED",
      undo: "Undo · 24h window",
    },
    limits: {
      title: "You set the limits",
      rows: [
        { l: "Daily spend cap", v: "৳5,000" },
        { l: "Max discount", v: "15%" },
      ],
      noTouch: "No-touch list",
      note: "Refunds, bulk changes and contracts stay founder-only. Always.",
    },
    ladder: {
      title: "Authority is earned",
      levels: [
        { l: "L0", n: "Observe", note: "REPORTS ONLY", on: false },
        { l: "L1", n: "Suggest", note: "ASKS FIRST", on: false },
        { l: "L2", n: "Draft", note: "PREPARES, YOU APPROVE", on: false },
        { l: "L3", n: "Operator", note: "DAY-ONE DEFAULT", on: true },
        { l: "L4", n: "Acting CEO", note: "EARNED", on: false, lime: true },
      ],
      note: "Trust is computed from the ledger — approvals move Nova up, undos move it down.",
    },
  },

  bd: {
    h2: (
      <>
        Built for Bangladesh.<br /><span style={{ color: "#C6F035" }}>Not translated for it.</span>
      </>
    ),
    p: "Payments, language and the retail calendar are design inputs here — not plugins.",
    chips: ["৳ everywhere", "bKash · Nagad", "Cash on delivery", "বাংলা + English", "Bangla voice calls", "Dhaka timezone"],
    seasonNote: "Nova proposes the Eid playbook 3 weeks early — one approval runs the month.",
  },

  switch: {
    h2: (
      <>
        Leaving Shopify?<br />Bring it over a <Mark>weekend</Mark>.
      </>
    ),
    p: "Concierge migration moves products, customers and order history. Your store keeps selling the whole time.",
    cta: "Plan my switch",
    rows: [
      { i: "1", t: "Concierge import", d: "Products, customers, orders and reviews — we move them, you review." },
      { i: "2", t: "COD + bKash native", d: "No payment plugins, no USD fees. The checkout Bangladesh actually uses." },
      { i: "3", t: "And you gain a CEO", d: "Shopify gives you tools. Dakio staffs the whole back office from day one." },
    ],
  },

  pricing: {
    h2: "Taka. Not dollars.",
    popular: "POPULAR",
    // FALLBACK ONLY. The cards on the page come from the live catalogue via
    // lib/plans.js#getHomePricing; these render only if the API is unreachable.
    // There is no free tier here any more — it was withdrawn from sale, and a
    // "Free / forever" card sent visitors to a signup that cannot deliver it.
    plans: [
      { n: "Growth", pr: "৳1,490", sub: "/month", d: "Unlimited products, supplier network, Grow Suite, Nova Operator — 750 tasks/mo.", cta: "Start 14-day free trial", dark: true, pop: true },
      { n: "Business", pr: "৳3,990", sub: "/month", d: "Complete Nova access — 2,500 tasks, voice calls, playbooks, staff logins. Acting CEO autonomy unlocks as trust is earned.", cta: "Start 14-day free trial", dark: false },
    ],
    foot: "Every plan includes Nova. Autonomy is earned, not bought.",
    footLink: "Full pricing →",
  },

  cta: {
    h2: (
      <>
        Your store. Your CEO.<br />Today.
      </>
    ),
    primary: "Start your free trial",
    secondary: "Then appoint Nova",
  },
};

export default home;
