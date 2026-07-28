// Nova page copy — English.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "NOVA — ACTING CEO · EVERY DAKIO STORE",
  heroRole: "STARTING ROLE — L3 OPERATOR · EARNS THE FULL CEO SEAT",
  heroOrbit: "10 DEPARTMENT AGENTS · ONE LEDGER · ONE DESK",
  dayKicker: "A DAY ON DUTY",
  ruleKicker: "THE ONE RULE THAT NEVER BENDS",
  pipeline: ["STEP 1", "STEP 2", "STEP 3", "STEP 4"],
  deskKicker: "THE DECISION DESK",
  deskTrust: "TRUST — FROM THE LEDGER",
  deskTrustPct: "68%",
  deskWaiting: "WAITING ON YOU · 1 OF 3",
  deskPromotion: "PROMOTION EARNED",
  cardTag: "DECISION · INVENTORY",
  cardConfidence: "CONFIDENCE 91%",
  cardExecuted: "EXECUTED · PO #1187 CREATED · RECEIPT #A-4472 · UNDO 24H",
  voiceKicker: "NOVA VOICE",
  agentsKicker: "THE TEAM UNDER YOUR CEO",
  agentModes: ["COORDINATES", "AUTONOMOUS", "ASSISTED"],
  founderOnly: "REFUNDS · GUARDRAILS · CONTRACT SIGNING",
  ctaStrip: "L3 OPERATOR ON DAY ONE · GUARDRAILS YOURS · EVERYTHING UNDOABLE",
};

const nova = {
  meta: {
    title: "Nova — Your Store's AI Acting CEO, On Duty 24/7 | Dakio",
    description:
      "Not a chatbot. Nova plans, executes and reports around the clock inside guardrails you set — every action receipted, everything undoable. Appoint your CEO today.",
  },

  hero: {
    h1: (
      <>
        Not hired.<br /><span style={{ color: "#C6F035" }}>Appointed.</span>
      </>
    ),
    sub: "Nova observes, plans, executes and reports across your whole store — 24/7, inside guardrails you set, with a receipt for everything.",
    ctaPrimary: "Appoint Nova as your CEO",
    ctaSecondary: "Walk into HQ →",
  },

  day: {
    h2: "It never clocks out.",
    items: [
      { t: "00:00", n: "Night shift", d: "Deep analysis, trend hunting, campaigns prepared, prices checked — all receipted.", lime: false },
      { t: "06:00", n: "Morning brief", d: "“While you slept…” — the overnight story plus the decisions that need you. Readable or as a call.", lime: true },
      { t: "09:00", n: "On watch", d: "Executes inside guardrails all day. If something breaks, the watchdog calls you first.", lime: false },
      { t: "23:00", n: "Tonight's plan", d: "Posts its intent for the night, per department. Tomorrow it reports planned vs. done.", lime: false },
    ],
  },

  rule: {
    h2: "Nova never touches your store directly.",
    pipeline: ["Authority check", "Execute", "Ledger receipt", "Lands in a door"],
    note: "A capability that can’t honor this pipeline doesn’t ship. That’s the product.",
  },

  desk: {
    h2: (
      <>
        Big moves wait<br />for <Mark>you</Mark>.
      </>
    ),
    p: "Anything above Nova’s authority becomes a decision card — reason, evidence, before/after. One tap approves. Approvals build trust; trust unlocks autonomy.",
    trustNote: "50 clean approvals → Nova earns its L4 promotion. You confirm it.",
    card: {
      title: "Reorder 60 × Jamdani stole before Eid week",
      body: "Sell-through 3.2×/wk · stockout in 9 days · supplier lead time 12 days. Waiting costs an est. ৳38,000.",
      approve: "Approve",
      later: "Later",
    },
    promotion: (
      <>
        Trust review complete — <b style={{ color: "#E9EFDC" }}>50 tasks, 100% approved.</b> Nova is ready for L4 Acting CEO. Your call.
      </>
    ),
  },

  voice: {
    h2: "It calls you first.",
    p: "Morning brief as a phone call. Watchdog alerts before small fires get big. Even customer confirmation calls — in Bangla or English. Every call recorded, transcribed, receipted.",
    calling: "Nova is calling…",
    callingSub: "Ad spend spiked 3.1× on “Boishakh Reels” — I paused it. 40 seconds to decide what’s next?",
    answer: "Answer",
    sendToDesk: "Send to desk",
    chips: ["Briefing calls", "Alert calls", "Customer calls"],
    chipLangs: "বাংলা + English",
  },

  agents: {
    h2: "Ten agents. One ledger.",
    p: "Promote Marketing-Nova to autonomous while Finance-Nova still asks first — authority is per agent, and CEO-Nova coordinates them all.",
    list: [
      ["CEO-Nova", "COORDINATES"], ["Marketing", "AUTONOMOUS"], ["Sales", "AUTONOMOUS"], ["Support", "AUTONOMOUS"],
      ["Research", "ASSISTED"], ["Inventory", "ASSISTED"], ["Shipping", "AUTONOMOUS"], ["Finance", "ASSISTED"],
      ["Operations", "ASSISTED"], ["Growth", "ASSISTED"],
    ],
    founderOnlyLabel: "Founder-only, forever:",
  },

  cta: {
    h2: "Give your store its CEO.",
    primary: "Appoint Nova",
    secondary: "Back to Dakio",
  },
};

export default nova;
