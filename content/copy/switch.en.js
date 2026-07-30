// Switch copy — English. The competitor name is a single constant so the page
// can be re-pointed at another platform without touching the prose.

import Mark from "../../components/Mark";

export const PLATFORM = "Shopify";

export const MONO = {
  heroBadge: `SWITCHING FROM ${PLATFORM.toUpperCase()}`,
  oldStack: `YOUR ${PLATFORM.toUpperCase()} STACK · MONTHLY`,
  newStack: "THE SAME STORE ON DAKIO",
  included: "INCLUDED",
  planKicker: "THE PLAN",
  days: ["FRIDAY", "SATURDAY", "SUNDAY"],
  whatMoves: "WHAT MOVES ·",
  gainKicker: "WHY IT’S WORTH THE WEEKEND",
  ctaStrip: "CONCIERGE MIGRATION · FREE ON GROWTH & BUSINESS PLANS · NO CONTRACT",
};

const sw = {
  meta: {
    title: "Switch from Shopify to Dakio in One Weekend — Free Migration",
    description:
      "Concierge migration moves products, customers and orders with SEO redirects intact. COD + bKash native, ৳ pricing — and on Monday your store has a CEO.",
  },

  navCta: "Plan my switch",

  hero: {
    h1: (
      <>
        Leave the tools.<br />Gain a <Mark bottom={6} height={14}>team</Mark>.
      </>
    ),
    sub: "Concierge migration over one weekend. Your store keeps selling the whole time — and on Monday it has a CEO.",
    ctaPrimary: "Plan my switch",
    ctaSecondary: "See the math",
  },

  math: {
    oldBill: [
      { n: "Platform subscription", d: "Basic plan, billed in USD", v: "≈ ৳4,700" },
      { n: "Apps & plugins", d: "COD forms, reviews, courier connectors", v: "≈ ৳3,800" },
      { n: "Payment workarounds", d: "Gateway + conversion fees", v: "≈ ৳2,000+" },
      { n: "Designer / agency", d: "Theme fixes, banners, ad creatives", v: "≈ ৳6,000+" },
    ],
    oldTotalLabel: "Typical total — and still no CEO",
    oldTotal: "≈ ৳16,500",
    perMonth: "/mo",
    newBill: [
      { n: "Store + Store Studio", d: "Design it yourself — theme gallery, Bangla fonts" },
      { n: "COD, bKash & Nagad", d: "Native checkout, no gateway workarounds" },
      { n: "Couriers + Grow Suite", d: "Steadfast · Pathao · RedX, campaigns, broadcasts" },
      { n: "Nova — your Acting CEO", d: "Marketing, support, ops. On duty 24/7" },
    ],
    newTotalLabel: "One plan — Growth",
    newTotal: "৳1,490",
    footnote:
      "Typical stack for a BD merchant on a $39 plan with paid apps and a designer retainer, at July 2026 rates. Your bill may differ — bring it, we’ll do the math with you.",
  },

  weekend: {
    h2: "One weekend. We carry the boxes.",
    days: [
      { t: "Export & hand over", b: "One CSV export and store access. We map products, variants, customers and order history overnight.", lime: false },
      { t: "Review your new store", b: "Everything imported, storefront rebuilt in Store Studio with a theme you pick. You click around and correct.", lime: true },
      { t: "Domain flips, Nova starts", b: "DNS + redirects go live, old links keep working. Nova begins its first night shift at 00:00.", lime: false },
    ],
    moves: ["Products & variants", "Customers", "Order history", "Reviews", "Images", "Domain & redirects"],
    movesNote: "SEO redirects included — your links keep working.",
  },

  gain: {
    h2: `What ${PLATFORM} never gave you.`,
    cards: [
      { t: "COD + bKash native", d: "The checkout Bangladesh actually uses — no plugins, no USD fees, no workarounds.", chips: ["bKash", "Nagad", "COD"] },
      { t: "Courier rails built in", d: "Steadfast, Pathao and RedX booked in one tap, with COD collection tracked to the taka.", chips: ["Steadfast", "Pathao", "RedX"] },
    ],
    nova: {
      t: "And a CEO",
      d: `${PLATFORM} gives you tools; you’re still every employee. Dakio staffs the back office from day one.`,
      cta: "Meet Nova",
    },
  },

  faq: {
    h2: "The three questions everyone asks.",
    items: [
      { q: "Will my Google ranking break?", a: "No — every old URL gets a permanent redirect to its new home, and your domain stays yours. Rankings follow the redirects." },
      { q: "What happens to my theme?", a: "Themes don't transfer between platforms — instead you rebuild in Store Studio in an afternoon: theme gallery, your brand colors, Bangla fonts, no developer." },
      { q: "Am I locked in?", a: "No contract, monthly billing, and your data (products, customers, orders) exports to CSV anytime. We keep you by being better, not by holding the door." },
    ],
  },

  cta: {
    h2: (
      <>
        Friday you export.<br />Monday you have a CEO.
      </>
    ),
    primary: "Plan my switch",
    secondary: "Back to Dakio",
  },
};

export default sw;
