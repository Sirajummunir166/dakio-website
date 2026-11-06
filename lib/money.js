// Money formatting shared by the plan cards (lib/plans.js) and the comparison
// table (lib/compare.js). Numerals stay Western on both locales so prices match
// the app, the invoices and the checkout.

export const NUM = new Intl.NumberFormat("en-US");
export const tk = (n) => `৳${NUM.format(Math.round(n))}`;

/**
 * Money in one currency. Taka is whole; dollars show cents only when there are
 * any ("$15", "$12.50"). Dollars are what a business outside Bangladesh pays,
 * through Paddle (DAKIO_GLOBAL_BILLING_PLAN.md): the page renders both sets
 * and a head script shows the visitor's (lib/region.js).
 */
const CENTS = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const money = (cur) => cur === "USD"
  ? (n) => {
      const r = Math.round(n * 100) / 100;
      return `$${Number.isInteger(r) ? NUM.format(r) : CENTS.format(r)}`;
    }
  : tk;

/** A plan's prices in one currency: the API's `pricesByCurrency`, or the taka-only `prices`. */
export const pricesIn = (plan, cur = "BDT") => plan?.pricesByCurrency?.[cur] || (cur === "BDT" ? plan?.prices : null) || {};
