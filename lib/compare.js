import { NUM, money, pricesIn } from "./money";

/**
 * The plan comparison table on /pricing (DAKIO_GROWTH_SYSTEM.md §25.1).
 *
 * One table, three columns (Free, Growth, Business), rows grouped the same for
 * every plan. The numbers come from each plan's `table` in GET /api/public/plans
 * (limits, monthly allowances, feature flags), so an admin edit shows up here
 * without a deploy. Which feature a row stands for is the static map below; the
 * words are in content/copy/pricing.<lang>.js (`compare`).
 *
 * Everything returned is plain data (strings, booleans), because the table is a
 * client component and cannot receive functions.
 */

const AUTOPILOT = "followUps"; // the Business ◆ marker feature

/** Free, Growth or Business, from what the plan is and grants (never from its position). */
export function tierOf(plan) {
  const f = plan?.table?.features || {};
  const paid = Object.values(pricesIn(plan)).some((v) => v?.amount > 0);
  if (!paid) return "free";
  if (f[AUTOPILOT] || plan.code === "business") return "business";
  return "growth";
}

const n = (x) => NUM.format(x);

function storage(mb) {
  if (!(mb > 0)) return false;
  return mb >= 1024 ? `${n(Math.round((mb / 1024) * 10) / 10)} GB` : `${n(mb)} MB`;
}

/**
 * The rows. Each section starts with a strong row (its own values, or none when
 * it only heads the rows under it). A row's value per kind of business:
 * `true` = ✓, `false` = a drawn dash (no), a string = printed as is.
 */
// Values two row sets share (the full table and the home page's compact one).
const ordersValue = (V) => (p) => (p.l.maxOrders == null ? V.unlimited : p.l.orderSoftCap != null && p.l.orderSoftCap < p.l.maxOrders ? `${n(p.l.orderSoftCap)}, ${V.upTo} ${n(p.l.maxOrders)}` : n(p.l.maxOrders));
const creditsValue = (p) => (p.m.novaCredits > 0 ? n(p.m.novaCredits) : false);

/**
 * The home page's short table: the eight rows that sell the step up from Free
 * to Growth to Business (owner, 2026-11-06). CompareTable shows these instead
 * of the sections when `compact` is set.
 */
function compactRows(V) {
  return [
    { key: "orders", values: ordersValue(V) },
    { key: "ownDomain", values: (p) => Boolean(p.f.customDomain) },
    { key: "answersOn", values: (p) => (p.l.novaChannels === 1 ? V.oneChannel : p.f.commentReplies ? V.everyChannelPlusComments : V.everyChannel) },
    { key: "webchat", values: (p) => Boolean(p.f.webchat) },
    { key: "followUps", diamond: true, values: (p) => Boolean(p.f.followUps) },
    { key: "orderShield", diamond: true, values: (p) => Boolean(p.f.orderShield) },
    { key: "adVideos", diamond: true, values: (p) => Boolean(p.f.motionAds) },
    { key: "creditsMonth", values: creditsValue },
  ];
}

function sections(V) {
  const unlimited = (x) => (x == null ? V.unlimited : n(x));
  const auto = (p) => Boolean(p.f[AUTOPILOT]);
  return [
    {
      head: { key: "store", values: (p) => (p.f.customDomain ? V.ownDomain : V.subdomain) },
      rows: [
        {
          key: "products",
          shop: (p) => (p.l.maxProducts == null ? V.unlimited : p.l.maxDropshipProducts != null ? `${n(p.l.maxProducts)} (${n(p.l.maxDropshipProducts)} ${V.dropship})` : n(p.l.maxProducts)),
          svc: (p) => unlimited(p.l.maxProducts),
        },
        { key: "orders", values: ordersValue(V) },
        {
          key: "team",
          shop: (p) => (p.l.maxUsers == null ? V.unlimited : p.l.maxUsers <= 1 ? V.ownerOnly : p.f.hr ? `${n(p.l.maxUsers)}, ${V.withHr}` : n(p.l.maxUsers)),
          svc: (p) => (p.l.maxUsers == null ? V.unlimited : p.l.maxUsers <= 1 ? V.ownerOnly : n(p.l.maxUsers)),
        },
        // Shops: the counter. Services: quotes and invoices, a Growth-and-up tool.
        { key: "pos", shop: (p) => Boolean(p.f.pos), svc: (p) => p.tier !== "free" },
      ],
    },
    {
      head: { key: "answers", values: (p) => (p.l.novaChannels === 1 ? V.oneChannel : p.f.commentReplies ? V.everyChannelComments : p.f.webchat ? V.everyChannelChat : V.everyChannel) },
    },
    {
      head: { key: "acts", diamond: true },
      rows: [
        { key: "followUps", values: (p) => Boolean(p.f.followUps) },
        { key: "orderShield", values: (p) => Boolean(p.f.orderShield) },
        { key: "whatsapp", values: (p) => Boolean(p.f.whatsapp) },
        { key: "brief", values: auto },
      ],
    },
    {
      head: { key: "marketing" },
      rows: [
        { key: "adImages", values: (p) => (p.tier === "free" ? V.threeAMonth : true) },
        { key: "aiWriting", values: (p) => Boolean(p.f.aiProductAssistant) },
        { key: "adVideos", diamond: true, values: (p) => Boolean(p.f.motionAds) },
      ],
    },
    {
      head: { key: "money", values: (p) => (auto(p) ? V.moneyPro : p.f.advancedReports ? V.moneyFull : V.moneyBasic) },
    },
    {
      head: { key: "talk", diamond: true, values: (p) => Boolean(p.f.novaVoice) },
    },
    {
      head: { key: "monthly" },
      rows: [
        { key: "credits", values: creditsValue },
        { key: "sms", values: (p) => (p.m.sms > 0 ? n(p.m.sms) : false) },
        { key: "voice", values: (p) => (p.m.voiceMinutes > 0 ? n(p.m.voiceMinutes) : false) },
        { key: "storage", values: (p) => storage(p.m.storageMb) },
      ],
    },
    {
      head: { key: "topups", values: (p) => (p.m.voiceMinutes > 0 ? V.topupsVoice : V.topups) },
    },
  ];
}

/** One plan's price cell for one period and currency. Null when it is not sold that way. */
function priceView(plan, tier, period, cur, P) {
  const fmt = money(cur);
  if (tier === "free") {
    return { price: fmt(0), per: P.forever, billed: P.noCard };
  }
  const prices = pricesIn(plan, cur);
  const monthly = prices.MONTHLY?.amount ?? null;
  if (period === "MONTHLY") {
    if (monthly == null) return null;
    return { price: fmt(monthly), per: P.perMonth, billed: P.billedMonthly };
  }
  const yearly = prices.YEARLY?.amount ?? null;
  if (yearly == null) return null;
  const yearlyPm = yearly / 12;
  // Launch price (§25.6): taka, yearly only, and only when it is below the
  // yearly per-month price, the same rule the checkout charges by.
  const launchPm = cur === "BDT" ? Math.round(Number(plan.table?.launchPricePerMonth ?? plan.launchPricePerMonth) || 0) : 0;
  const launch = launchPm > 0 && launchPm < yearlyPm;
  const total = launch ? launchPm * 12 : yearly;
  const saving = monthly != null ? monthly * 12 - total : 0;
  return {
    price: fmt(launch ? launchPm : yearlyPm),
    per: P.perMonth,
    strike: launch ? fmt(yearlyPm) : null,
    launchLine: launch ? P.launch : null,
    billed: P.billedYear(fmt(total)),
    save: saving > 0 ? P.save(fmt(saving)) : null,
  };
}

const PHRASES = {
  en: {
    perMonth: "/month",
    forever: "forever",
    noCard: "no card needed",
    billedMonthly: "billed monthly",
    billedYear: (t) => `billed ${t} a year`,
    save: (t) => `Save ${t}`,
    launch: "Launch price for new stores",
    choose: (name) => `Choose ${name}`,
  },
  bn: {
    perMonth: "/মাস",
    forever: "সারাজীবন",
    noCard: "কার্ড লাগবে না",
    billedMonthly: "মাসে মাসে বিল",
    billedYear: (t) => `বছরে ${t} বিল`,
    save: (t) => `${t} সাশ্রয়`,
    launch: "নতুন স্টোরের লঞ্চ প্রাইস",
    choose: (name) => `${name} নিন`,
  },
};

/**
 * Build the table from the catalogue's plans (Free, Growth, Business; the
 * `trial` package is never a column). `copy` is the `compare` block of the
 * pricing copy. `usd` adds the dollar price cells (English pages, and only when
 * every paid plan is on sale in dollars).
 */
export function buildCompare(plans, copy, lang = "en", { usd = false } = {}) {
  const P = PHRASES[lang] || PHRASES.en;
  const V = copy.v;
  const cols = plans
    .filter((p) => p.code !== "trial")
    .map((p) => ({ plan: p, tier: tierOf(p) }))
    .sort((a, b) => ["free", "growth", "business"].indexOf(a.tier) - ["free", "growth", "business"].indexOf(b.tier));
  if (cols.length < 2) return null;

  const ctx = cols.map(({ plan, tier }) => {
    const t = plan.table || {};
    return { tier, l: t.limits || {}, m: t.monthly || {}, f: t.features || {} };
  });

  const value = (row, kind) => ctx.map((p) => {
    const fn = row[kind] || row.values;
    return fn ? fn(p) : null;
  });
  const label = (key) => {
    const l = copy.rows[key];
    return typeof l === "string" ? { shop: l, svc: l } : l;
  };
  const toRow = (row, strong) => ({
    key: row.key,
    strong,
    diamond: Boolean(row.diamond),
    label: label(row.key),
    values: row.values || row.shop ? { shop: value(row, "shop"), svc: value(row, "svc") } : null,
  });

  const groups = sections(V).map((s) => ({
    key: s.head.key,
    rows: [toRow(s.head, true), ...(s.rows || []).map((r) => toRow(r, false))],
  }));

  const columns = cols.map(({ plan, tier }) => {
    const t = copy.tiers[tier];
    const view = (cur) => ({
      MONTHLY: priceView(plan, tier, "MONTHLY", cur, P),
      YEARLY: priceView(plan, tier, "YEARLY", cur, P),
    });
    return {
      code: plan.code,
      tier,
      name: plan.name,
      tag: t.tag,
      diamond: tier === "business",
      line: t.line,
      recommended: tier === "business",
      free: tier === "free",
      cta: tier === "free" ? copy.startFree : P.choose(plan.name),
      price: { BDT: view("BDT"), USD: usd ? view("USD") : null },
    };
  });

  const compact = compactRows(V).map((r) => toRow(r, false));
  return { columns, groups, compact };
}

/**
 * What the page prints when the API cannot be reached (a Railway restart during
 * a build): the production plans as of §25 (owner, 2026-11-06). A stale price
 * is a small problem; an empty pricing page is a big one.
 */
export const FALLBACK_PLANS = [
  {
    code: "launch_free", name: "Free",
    prices: { MONTHLY: { amount: 0 } },
    table: {
      limits: { maxProducts: 25, maxOrders: 50, orderSoftCap: 30, maxUsers: 1, maxDropshipProducts: 10, novaChannels: 1 },
      monthly: { novaCredits: 300, sms: 10, voiceMinutes: 0, storageMb: 500 },
      features: { finance: true, dropship: true, courierApi: true, novaAdvisor: true, supplierNetwork: true },
      launchPricePerMonth: null,
    },
  },
  {
    code: "growth", name: "Growth",
    prices: { MONTHLY: { amount: 2990 }, YEARLY: { amount: 23880 } },
    table: {
      limits: { maxProducts: null, maxOrders: null, orderSoftCap: null, maxUsers: 3, maxDropshipProducts: null, novaChannels: null },
      monthly: { novaCredits: 7500, sms: 300, voiceMinutes: 0, storageMb: 5120 },
      features: { pos: true, webchat: true, customDomain: true, advancedReports: true, aiProductAssistant: true, growSuite: true, novaOperator: true },
      launchPricePerMonth: null,
    },
  },
  {
    code: "business", name: "Business",
    prices: { MONTHLY: { amount: 6990 }, YEARLY: { amount: 59880 } },
    table: {
      limits: { maxProducts: null, maxOrders: null, orderSoftCap: null, maxUsers: 10, maxDropshipProducts: null, novaChannels: null },
      monthly: { novaCredits: 25000, sms: 1000, voiceMinutes: 60, storageMb: 15360 },
      features: {
        pos: true, webchat: true, customDomain: true, advancedReports: true, aiProductAssistant: true, growSuite: true, novaOperator: true,
        followUps: true, commentReplies: true, orderShield: true, whatsapp: true, motionAds: true, novaVoice: true, hr: true, seasonalPlaybooks: true,
      },
      launchPricePerMonth: null,
    },
  },
];
