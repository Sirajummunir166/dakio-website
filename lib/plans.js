import pricingEn from "../content/copy/pricing.en";
import pricingBn from "../content/copy/pricing.bn";
import homeEn from "../content/copy/home.en";
import homeBn from "../content/copy/home.bn";
import { REGISTER_URL } from "./urls";

/**
 * The pricing page's numbers, fetched from the API instead of typed here.
 *
 * WHY. Until Stage 12 this site hand-wrote its plan cards in
 * `content/copy/pricing.en.js`, the signup screen hand-wrote a different set of
 * numbers, and SSLCommerz charged a third set from a JS constant. A customer
 * could read ৳1,490 here and be charged ৳14,950 at the till. Now the founder
 * edits a price once in the admin app and this page, the signup picker and the
 * gateway all move together, with no deploy.
 *
 * FALLBACK IS THE STATIC COPY, NOT AN ERROR. If the API is unreachable — a
 * Railway restart during a Vercel build, a network blip on revalidate — this
 * returns the committed copy and marks the result `live: false`. A marketing
 * page that renders yesterday's prices is a small problem; one that renders an
 * empty pricing section, or fails the build, is a much bigger one. The tradeoff
 * is stated here because it is the reason a stale price can appear at all.
 *
 * ISR: 5 minutes. Short enough that a founder who changes a price and reloads
 * the page sees it, long enough that the API is not serving the pricing page on
 * every request.
 */

const API_BASE = process.env.DAKIO_API_URL || "https://dakio-api-production.up.railway.app";
const STATIC = { en: pricingEn, bn: pricingBn };
const STATIC_HOME = { en: homeEn, bn: homeBn };

const NUM = new Intl.NumberFormat("en-US");
const tk = (n) => `৳${NUM.format(Math.round(n))}`;

/**
 * The Nova capability chip, derived from what the plan actually grants.
 *
 * The committed copy carried three fixed labels indexed by card POSITION
 * (`mono.planLevels[i]`). With the free tier withdrawn there are two public
 * plans, so position 0 became Growth and Growth would have been labelled
 * "ADVISOR" — describing it as read-only when it is the plan that lets Nova act.
 * Reading the entitlement map instead means the chip cannot contradict the
 * product.
 */
function novaLevel(plan, lang) {
  const has = (k) => (plan.features || []).includes(k);
  const en = has("novaVoice") || has("seasonalPlaybooks")
    ? "NOVA L4 ACTING CEO"
    : has("novaOperator")
      ? "NOVA L3 OPERATOR"
      : "NOVA L0–L1 ADVISOR";
  if (lang !== "bn") return en;
  return {
    "NOVA L4 ACTING CEO": "NOVA L4 ভারপ্রাপ্ত সিইও",
    "NOVA L3 OPERATOR": "NOVA L3 অপারেটর",
    "NOVA L0–L1 ADVISOR": "NOVA L0–L1 উপদেষ্টা",
  }[en];
}

/** Interval → the copy this site prints, per language. */
const PHRASES = {
  en: {
    perMonth: "/month",
    billedMonthly: "billed monthly",
    billedYearly: (amount) => `billed ${tk(amount)}/year`,
    noYearly: "monthly billing",
    startTrial: (days) => `Start ${days}-day free trial`,
    choose: (name) => `Choose ${name}`,
    free: "Free",
    forever: "forever",
    noCard: "no card needed",
    annualEq: (perMonth, pct) => `or ${tk(perMonth)}/month billed yearly${pct > 0 ? ` — save ${pct}%` : ""}`,
  },
  bn: {
    perMonth: "/মাস",
    billedMonthly: "মাসিক বিলিং",
    billedYearly: (amount) => `বার্ষিক ${tk(amount)} বিল`,
    noYearly: "মাসিক বিলিং",
    startTrial: (days) => `${days} দিনের ফ্রি ট্রায়াল শুরু করুন`,
    choose: (name) => `${name} বেছে নিন`,
    free: "ফ্রি",
    forever: "সারাজীবন",
    noCard: "কার্ড লাগবে না",
    annualEq: (perMonth, pct) => `বার্ষিক বিলে মাসে ${tk(perMonth)}${pct > 0 ? ` — ${pct}% সাশ্রয়` : ""}`,
  },
};

/**
 * The billing periods the API can sell (dakio-api lib/pricing.js INTERVALS), in
 * the order the tab row shows them. A period appears on the page only when at
 * least one public plan has a live price for it — adding a 6-month price in the
 * admin package manager is all it takes for a "6 months" tab to show up.
 */
const PERIODS = [
  { key: "MONTHLY",  months: 1,  en: "Monthly",  bn: "মাসিক" },
  { key: "SIXMONTH", months: 6,  en: "6 months", bn: "৬ মাস" },
  { key: "YEARLY",   months: 12, en: "Yearly",   bn: "বার্ষিক" },
];

const PERIOD_PHRASES = {
  en: {
    save: (pct) => `Save ${pct}%`,
    saveUpTo: (pct) => `Save up to ${pct}%`,
    billedEvery: (total, months) => months === 12 ? `billed ${tk(total)} once a year` : `billed ${tk(total)} every ${months} months`,
    youSave: (amount, months) => months === 12 ? `You save ${tk(amount)} a year` : `You save ${tk(amount)} every ${months} months`,
    vsMonthly: "vs. paying monthly",
    nudge: (amount, label) => label === "Yearly" ? `Pay yearly and save ${tk(amount)}` : `Pay for ${label} and save ${tk(amount)}`,
    best: "Best value",
    notSold: "Not sold on this period",
  },
  bn: {
    save: (pct) => `${pct}% সাশ্রয়`,
    saveUpTo: (pct) => `${pct}% পর্যন্ত সাশ্রয়`,
    billedEvery: (total, months) => months === 12 ? `বছরে একবার ${tk(total)} বিল` : `প্রতি ${months} মাসে ${tk(total)} বিল`,
    youSave: (amount, months) => months === 12 ? `বছরে ${tk(amount)} সাশ্রয়` : `প্রতি ${months} মাসে ${tk(amount)} সাশ্রয়`,
    vsMonthly: "মাসিক পেমেন্টের তুলনায়",
    nudge: (amount, label) => `${label} নিলে ${tk(amount)} সাশ্রয়`,
    best: "সেরা ডিল",
    notSold: "এই মেয়াদে পাওয়া যায় না",
  },
};

/**
 * One plan's numbers for one period. The saving is measured against paying the
 * MONTHLY price for the same number of months — the comparison a shop owner
 * actually makes — not against `compareAt`, which is a hand-typed display
 * field that goes stale the moment the monthly price moves (it still said
 * ৳17,880 = 12 × ৳1,490 after Growth monthly went to ৳5,000).
 */
function periodView(plan, period) {
  const price = plan.prices?.[period.key];
  if (!price) return null;
  const monthly = plan.prices?.MONTHLY?.amount ?? null;
  const total = price.amount;
  const perMonth = total / period.months;
  const fullPrice = monthly != null ? monthly * period.months : null;
  const saveAmount = fullPrice != null && period.months > 1 ? Math.max(0, fullPrice - total) : 0;
  const savePct = saveAmount > 0 ? Math.floor((saveAmount / fullPrice) * 100) : 0;
  return { total, perMonth, months: period.months, monthly, saveAmount, savePct };
}

/**
 * Reshape one live plan into the props `PricingClient` already renders.
 *
 * The annual price is shown as its MONTHLY EQUIVALENT (৳14,900/yr reads as
 * ৳1,242/month) because that is the number a shop owner compares against a
 * salary, and it is how the page has always been written. The real amount
 * charged is spelled out underneath — showing only the divided figure would be
 * the kind of quiet half-truth this whole rework exists to remove.
 */
function toCard(plan, i, total, lang) {
  const P = PHRASES[lang] || PHRASES.en;
  const monthly = plan.prices?.MONTHLY?.amount ?? null;
  const yearly = plan.prices?.YEARLY?.amount ?? null;
  const isFree = (monthly ?? 0) === 0 && !yearly;

  const yearlyPerMonth = yearly != null ? yearly / 12 : null;

  return {
    n: plan.name,
    code: plan.code,
    audience: plan.audience || "",
    prMo: isFree ? P.free : monthly != null ? tk(monthly) : yearly != null ? tk(yearly) : "—",
    prYr: isFree
      ? P.free
      : yearlyPerMonth != null
        ? tk(yearlyPerMonth)
        : monthly != null ? tk(monthly) : "—",
    sub: isFree ? P.forever : plan.tagline || P.perMonth,
    noteMo: isFree ? P.noCard : P.billedMonthly,
    noteYr: isFree
      ? P.noCard
      : yearly != null ? P.billedYearly(yearly) : P.noYearly,
    cta: plan.trialDays > 0 ? P.startTrial(plan.trialDays) : P.choose(plan.name),
    feats: plan.bullets || [],
    trialDays: plan.trialDays || 0,
    level: novaLevel(plan, lang),
    /** The last card is the dark "full seat" one — the design's visual anchor. */
    dark: i === total - 1 && total > 1,
    pop: plan.badge === "popular",
    isFree,
    /** Per-period numbers for the tab row, keyed by interval. */
    periods: Object.fromEntries(PERIODS.map((pd) => [pd.key, periodView(plan, pd)]).filter(([, v]) => v)),
  };
}

/**
 * The tab row: every period some plan is sold on, each with the best saving any
 * plan gets on it ("Save up to 75%"), plus the copy the cards print under it.
 * The longest period is the default — it is the one Dakio wants to sell, and a
 * visitor lands on the price they are most likely to buy.
 */
function periodTabs(livePlans, cards, lang) {
  const PP = PERIOD_PHRASES[lang] || PERIOD_PHRASES.en;
  const tabs = PERIODS
    .filter((pd) => cards.some((c) => c.periods[pd.key]))
    .map((pd) => {
      const pcts = cards.map((c) => c.periods[pd.key]?.savePct || 0).filter((x) => x > 0);
      const best = pcts.length ? Math.max(...pcts) : 0;
      const same = pcts.length === cards.length && pcts.every((x) => x === best);
      return {
        key: pd.key,
        months: pd.months,
        label: pd[lang] || pd.en,
        saving: best > 0 ? (same ? PP.save(best) : PP.saveUpTo(best)) : null,
        savePct: best,
      };
    });
  const longest = tabs.length ? tabs[tabs.length - 1].key : "MONTHLY";
  const bestKey = tabs.some((t) => t.savePct > 0) ? longest : null;
  const bestTab = tabs.find((t) => t.key === bestKey);

  // Every string the cards print, computed here: PricingClient is a client
  // component and cannot receive the phrase functions as props.
  for (const c of cards) {
    const nudgeView = bestKey ? c.periods[bestKey] : null;
    for (const [key, v] of Object.entries(c.periods)) {
      v.price = tk(v.perMonth);
      v.strike = v.months > 1 && v.saveAmount > 0 && v.monthly != null ? tk(v.monthly) : null;
      v.billed = v.months > 1 ? PP.billedEvery(v.total, v.months) : null;
      v.save = v.saveAmount > 0 ? PP.youSave(v.saveAmount, v.months) : null;
      // The chip already says "You save ৳X" — beside it the percentage is just the number.
      v.saveBadge = v.savePct > 0 ? `−${v.savePct}%` : null;
      // On a short period, say what the long one would save — the reason to switch.
      v.nudge = key !== bestKey && nudgeView?.saveAmount > 0
        ? PP.nudge(nudgeView.saveAmount, bestTab.label)
        : null;
    }
  }
  return { tabs, defaultKey: longest, bestKey, bestLabel: PP.best, notSold: PP.notSold };
}

/**
 * Note under the plan grid, built from what the plans actually offer.
 *
 * The committed copy says "every new store gets 14 days of Business, free" — a
 * sentence that was true of nothing until the trial was implemented, and that
 * would become false the moment a founder changed a trial length in the admin
 * app. Deriving it means the page cannot promise a trial that is not configured.
 */
function trialNote(cards, lang) {
  const withTrial = cards.filter((c) => c.trialDays > 0);
  if (withTrial.length === 0) return null;

  const allSame = withTrial.every((c) => c.trialDays === withTrial[0].trialDays);
  const days = withTrial[0].trialDays;

  if (lang === "bn") {
    return allSame && withTrial.length === cards.length
      ? `প্রতিটি প্যাকেজে ${days} দিনের ফ্রি ট্রায়াল — কার্ড লাগবে না। সব প্ল্যানে কুরিয়ার ডেলিভারি প্রতি শিপমেন্ট হিসেবে বিল হয়।`
      : `${withTrial.map((c) => `${c.n} — ${c.trialDays} দিন`).join(", ")} ফ্রি ট্রায়াল। সব প্ল্যানে কুরিয়ার ডেলিভারি প্রতি শিপমেন্ট হিসেবে বিল হয়।`;
  }
  return allSame && withTrial.length === cards.length
    ? `Every package starts with a ${days}-day free trial — no card needed. Courier deliveries are billed per shipment on all plans.`
    : `Free trials: ${withTrial.map((c) => `${c.n} — ${c.trialDays} days`).join(", ")}. Courier deliveries are billed per shipment on all plans.`;
}

/** Top-up copy, from the real pack rows rather than a hardcoded "৳250 / 250 credits". */
function topUpLabel(packs, lang) {
  const pack = (packs || []).find((p) => p.service === "nova.task");
  if (!pack) return null;
  return lang === "bn"
    ? `টপ আপ — ${tk(pack.price)} / ${NUM.format(pack.quantity)} ক্রেডিট`
    : `Top up — ${tk(pack.price)} / ${NUM.format(pack.quantity)} credits`;
}

/**
 * Fetch the live catalogue and merge it over the committed copy.
 *
 * Returns the SAME shape `PricingClient` already takes, so the view stays a pure
 * renderer and the fallback path is indistinguishable to it.
 */
/**
 * The one fetch. Every consumer on the site goes through here so the pricing
 * page, the home page cards and the JSON-LD offers can never disagree with each
 * other — they are three renderings of one payload, not three copies of a price.
 *
 * Returns `null` when the catalogue is unusable, which every caller reads as
 * "fall back to the committed copy".
 */
export async function fetchCatalogue(lang = "en") {
  let payload = null;
  try {
    const res = await fetch(`${API_BASE}/api/public/plans?lang=${lang}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) payload = await res.json();
  } catch {
    // Swallowed on purpose — see the FALLBACK note at the top of this file. The
    // build must not fail because the API was briefly unavailable.
  }
  const plans = payload?.plans?.filter((p) => (p.bullets || []).length > 0 || p.prices) || [];
  if (plans.length === 0) return null;
  return { ...payload, plans };
}

/**
 * The search-result description, from live prices. The committed sentence
 * quoted "Growth ৳1,490/mo, Business ৳3,990/mo" — numbers that stopped being
 * true when the monthly prices moved, on the one line Google shows for the page.
 * Each plan is quoted "from" its lowest per-month price (the longest period).
 */
function metaDescription(cards, billing, lang) {
  const trial = cards.find((c) => c.trialDays > 0)?.trialDays;
  const quote = cards
    .filter((c) => !c.isFree)
    .map((c) => {
      const views = Object.values(c.periods || {});
      if (!views.length) return null;
      const low = Math.min(...views.map((v) => v.perMonth));
      return lang === "bn" ? `${c.n} ৳${NUM.format(Math.round(low))}/মাস থেকে` : `${c.n} from ৳${NUM.format(Math.round(low))}/mo`;
    })
    .filter(Boolean)
    .join(", ");
  if (!quote) return null;
  if (lang === "bn") {
    return `${trial ? `${trial} দিনের ফ্রি ট্রায়াল, কার্ড লাগবে না। ` : ""}${quote}—প্রতিটি প্ল্যানেই Nova আছে। লম্বা মেয়াদে বেশি সাশ্রয়, কোনো লুকানো ফি নেই।`;
  }
  return `${trial ? `Start with a ${trial}-day free trial, no card. ` : ""}${quote} — every plan includes Nova. Longer terms save more; no hidden fees, courier rates passed through.`;
}

export async function getPricingCopy(lang = "en") {
  const base = STATIC[lang] || STATIC.en;

  const payload = await fetchCatalogue(lang);
  if (!payload) return { ...base, live: false };
  const livePlans = payload.plans;

  const cards = livePlans.map((p, i) => toCard(p, i, livePlans.length, lang));
  const billing = periodTabs(livePlans, cards, lang);
  const note = trialNote(cards, lang);
  const topUp = topUpLabel(payload.packs, lang);

  // The payroll comparison prints a specific plan's price ("Nova — Acting CEO,
  // ৳3,990/month, Business plan"). Left as committed copy it would keep quoting
  // an old number after a price change, on the one section of the page whose
  // entire argument is that number.
  //
  // It quotes the plan's per-month price on the period the page opens on (the
  // longest one) — the price Dakio is actually selling. Monthly is priced high
  // on purpose to push longer terms, so quoting it here would argue against Nova.
  const topCard = cards[cards.length - 1];
  const topView = topCard?.periods?.[billing.defaultKey];
  const anchorPer = topView && topView.months > 1
    ? (lang === "bn"
        ? `/মাস (${(PERIODS.find((pd) => pd.key === billing.defaultKey) || {}).bn} বিলে), ${topCard.n} প্ল্যান`
        : `/month billed ${billing.defaultKey === "YEARLY" ? "yearly" : `every ${topView.months} months`}, ${topCard.n} plan`)
    : (lang === "bn" ? `/মাস, ${topCard?.n} প্ল্যান` : `/month, ${topCard?.n} plan`);
  const anchor = topCard && topCard.prMo !== "—"
    ? {
        ...base.anchor,
        nova: {
          ...base.anchor.nova,
          price: topView ? tk(topView.perMonth) : topCard.prMo,
          per: anchorPer,
        },
      }
    : base.anchor;

  return {
    ...base,
    plans: cards,
    billing,
    meta: { ...base.meta, description: metaDescription(cards, billing, lang) || base.meta.description },
    anchor,
    // Only override the note when we could derive one; otherwise the committed
    // sentence is still better than nothing.
    plansNote: note || base.plansNote,
    meter: topUp
      ? { ...base.meter, draft: { ...base.meter.draft, topUp } }
      : base.meter,
    live: true,
  };
}

/**
 * The home page's three-card pricing strip, from the same live catalogue.
 *
 * WHY THIS EXISTS. The home page carried its cards as hand-typed copy in
 * `content/copy/home.<lang>.js` — including a "Starter / Free / forever" card
 * for a tier that has been withdrawn from sale. So the front page of the site
 * was advertising a free plan nobody can sign up for, next to two prices that
 * would silently go stale the next time the founder changed one in the admin app.
 * The pricing page was fixed and this page was not, which is the worse of the two
 * to leave wrong: it is the page most visitors see first.
 *
 * The card shape is exactly what the existing markup already renders, so the
 * layout is untouched — only where the numbers come from changes.
 */
function toHomeCard(plan, i, total, popularIdx, lang) {
  const P = PHRASES[lang] || PHRASES.en;
  const monthly = plan.prices?.MONTHLY?.amount ?? null;
  const yearly = plan.prices?.YEARLY?.amount ?? null;
  const isFree = (monthly ?? 0) === 0 && !yearly;
  return {
    n: plan.name,
    code: plan.code,
    audience: plan.audience || "",
    pr: isFree ? P.free : monthly != null ? tk(monthly) : yearly != null ? tk(yearly) : "—",
    sub: isFree ? P.forever : monthly != null ? P.perMonth : P.billedYearly(yearly),
    // The annual saving is the pricing page's second number; the home card
    // shows it as one quiet line so the two pages quote the same deal.
    yr: !isFree && monthly != null && yearly != null
      ? P.annualEq(yearly / 12, monthly > 0 ? Math.floor((1 - yearly / (monthly * 12)) * 100) : 0)
      : null,
    // The same bullets the pricing page prints, cut to the first four — not
    // the API's separate one-line description, which had drifted into a
    // different pitch from the page it links to.
    feats: (plan.bullets || []).slice(0, 4),
    level: novaLevel(plan, lang),
    trialDays: plan.trialDays || 0,
    cta: plan.trialDays > 0 ? P.startTrial(plan.trialDays) : P.choose(plan.name),
    /** Signup with this plan pre-selected — the card and the picker agree. */
    href: `${REGISTER_URL}?plan=${encodeURIComponent(plan.code)}`,
    /** Same visual grammar as the pricing page: the last card is the dark full seat, the badge marks the popular one. */
    dark: i === total - 1 && total > 1,
    pop: i === popularIdx,
  };
}

export async function getHomePricing(lang = "en") {
  const base = (STATIC_HOME[lang] || STATIC_HOME.en).pricing;
  // The lede and the note under the cards are the pricing page's own words, so
  // the home strip is a summary of that page rather than a second pitch.
  const pricingCopy = STATIC[lang] || STATIC.en;
  const shared = { sub: pricingCopy.hero.sub, foot: pricingCopy.plansNote };

  const payload = await fetchCatalogue(lang);
  if (!payload) return { ...base, ...shared, live: false };

  const plans = payload.plans;
  // "Popular" is a founder decision stored on the plan (`badge`). With no badge
  // set, the middle card is highlighted — never a card picked because it is the
  // most expensive one.
  const badged = plans.findIndex((p) => p.badge === "popular");
  const popularIdx = badged >= 0 ? badged : Math.floor((plans.length - 1) / 2);

  const cards = plans.map((p, i) => toHomeCard(p, i, plans.length, popularIdx, lang));
  return {
    ...base,
    ...shared,
    plans: cards,
    foot: trialNote(cards, lang) || shared.foot,
    live: true,
  };
}

/**
 * schema.org Offer list for the SoftwareApplication block.
 *
 * Left as committed copy this emitted `{ name: "Starter", price: "0" }` to
 * Google — a rich-result promise of a free tier that no longer exists, and the
 * kind of claim a search engine keeps showing long after the page changed.
 */
export async function getJsonLdOffers(lang = "en") {
  const payload = await fetchCatalogue(lang);
  if (!payload) return null;

  return payload.plans
    .map((p) => {
      const monthly = p.prices?.MONTHLY?.amount ?? null;
      const yearly = p.prices?.YEARLY?.amount ?? null;
      const amount = monthly ?? (yearly != null ? yearly / 12 : null);
      if (amount == null) return null;
      return {
        name: p.name,
        price: String(Math.round(amount)),
        priceCurrency: p.prices?.MONTHLY?.currency || payload.currency || "BDT",
        description: p.description || (p.bullets || []).join(" · "),
      };
    })
    .filter(Boolean);
}
