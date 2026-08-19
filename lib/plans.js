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

export async function getPricingCopy(lang = "en") {
  const base = STATIC[lang] || STATIC.en;

  const payload = await fetchCatalogue(lang);
  if (!payload) return { ...base, live: false };
  const livePlans = payload.plans;

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
function toHomeCard(plan, i, popularIdx, lang) {
  const P = PHRASES[lang] || PHRASES.en;
  const monthly = plan.prices?.MONTHLY?.amount ?? null;
  const yearly = plan.prices?.YEARLY?.amount ?? null;
  const isFree = (monthly ?? 0) === 0 && !yearly;

  return {
    n: plan.name,
    code: plan.code,
    pr: isFree ? P.free : monthly != null ? tk(monthly) : yearly != null ? tk(yearly) : "—",
    sub: isFree ? P.forever : monthly != null ? P.perMonth : P.billedYearly(yearly),
    // The API's one-line `description` is written for exactly this slot. Bullets
    // are the fallback because a card with no sentence under the price reads as
    // a broken page, not as a minimal one.
    d: plan.description || (plan.bullets || []).slice(0, 3).join(" · "),
    cta: plan.trialDays > 0 ? P.startTrial(plan.trialDays) : P.choose(plan.name),
    /** Signup with this plan pre-selected — the card and the picker agree. */
    href: `${REGISTER_URL}?plan=${encodeURIComponent(plan.code)}`,
    /** The design's dark card is the recommended one, wherever it lands. */
    dark: i === popularIdx,
    pop: i === popularIdx,
  };
}

export async function getHomePricing(lang = "en") {
  const base = (STATIC_HOME[lang] || STATIC_HOME.en).pricing;

  const payload = await fetchCatalogue(lang);
  if (!payload) return { ...base, live: false };

  const plans = payload.plans;
  // "Popular" is a founder decision stored on the plan (`badge`). With no badge
  // set, the middle card is highlighted — never a card picked because it is the
  // most expensive one.
  const badged = plans.findIndex((p) => p.badge === "popular");
  const popularIdx = badged >= 0 ? badged : Math.floor((plans.length - 1) / 2);

  return {
    ...base,
    plans: plans.map((p, i) => toHomeCard(p, i, popularIdx, lang)),
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
