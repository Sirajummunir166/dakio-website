import pricingEn from "../content/copy/pricing.en";
import pricingBn from "../content/copy/pricing.bn";

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
  },
};

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
  };
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

/** Top-up copy, from the real pack rows rather than a hardcoded "৳250 / 250 tasks". */
function topUpLabel(packs, lang) {
  const pack = (packs || []).find((p) => p.service === "nova.task");
  if (!pack) return null;
  return lang === "bn"
    ? `টপ আপ — ${tk(pack.price)} / ${NUM.format(pack.quantity)} টাস্ক`
    : `Top up — ${tk(pack.price)} / ${NUM.format(pack.quantity)} tasks`;
}

/**
 * Fetch the live catalogue and merge it over the committed copy.
 *
 * Returns the SAME shape `PricingClient` already takes, so the view stays a pure
 * renderer and the fallback path is indistinguishable to it.
 */
export async function getPricingCopy(lang = "en") {
  const base = STATIC[lang] || STATIC.en;

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

  const livePlans = payload?.plans?.filter((p) => (p.bullets || []).length > 0 || p.prices) || [];
  if (livePlans.length === 0) {
    return { ...base, live: false };
  }

  const cards = livePlans.map((p, i) => toCard(p, i, livePlans.length, lang));
  const note = trialNote(cards, lang);
  const topUp = topUpLabel(payload.packs, lang);

  // The payroll comparison prints a specific plan's price ("Nova — Acting CEO,
  // ৳3,990/month, Business plan"). Left as committed copy it would keep quoting
  // an old number after a price change, on the one section of the page whose
  // entire argument is that number.
  const topCard = cards[cards.length - 1];
  const anchor = topCard && topCard.prMo !== "—"
    ? {
        ...base.anchor,
        nova: {
          ...base.anchor.nova,
          price: topCard.prMo,
          per: lang === "bn"
            ? `/মাস, ${topCard.n} প্ল্যান`
            : `/month, ${topCard.n} plan`,
        },
      }
    : base.anchor;

  return {
    ...base,
    plans: cards,
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
