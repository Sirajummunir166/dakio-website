// Developers copy — English. The landing page for @dakio/sdk (DAKIO_SDK_PLAN.md
// §7). The docs under /developers/docs are English-only MDX (content/docs/);
// this page is bilingual like the rest of the site.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "DAKIO FOR DEVELOPERS · @dakio/sdk",
  install: "INSTALL",
  seamKicker: "HOW IT SPLITS",
  you: "YOU BUILD",
  dakio: "DAKIO RUNS",
  stepsKicker: "FIVE MINUTES",
  flowKicker: "CHECKOUT",
  startersKicker: "STARTERS",
  react: "REACT · VITE",
  next: "NEXT.JS · APP ROUTER",
  keysKicker: "KEYS",
  agencyKicker: "FOR AGENCIES",
  orderNo: "#TEST-K3P9QX",
  ctaStrip: "EVERY PLAN INCLUDES API KEYS · TEST KEYS FREE · MIT-LICENSED SDK",
};

const dev = {
  meta: {
    title: "Dakio for Developers — Build Any Store on Dakio's Commerce Backend",
    description:
      "@dakio/sdk: your own React or Next.js storefront with Dakio behind it — cash-on-delivery checkout with fake-order protection, couriers, stock, abandoned carts, Meta Pixel and Nova. No backend needed.",
  },

  navCta: "Get a key",

  hero: {
    h1: (
      <>
        Build any store.<br />Dakio runs the <Mark bottom={6} height={14}>business</Mark>.
      </>
    ),
    sub: "Your own React or Next.js site, with Dakio's whole back office behind it: cash-on-delivery checkout with fake-order protection, couriers, stock, abandoned carts, the Pixel — and Nova. No backend to write.",
    ctaPrimary: "Read the quickstart",
    ctaSecondary: "Get a key",
    codeTitle: "app.js",
  },

  seam: {
    h2: (
      <>
        Your design.<br />Our back office.
      </>
    ),
    sub: "Store Studio stops where its sections stop. With the SDK the storefront is yours, every pixel of it — and everything behind the Place order button is Dakio's.",
    you: ["Pages, layout and brand", "Any framework: React, Next.js, plain JS", "Your domain and your hosting", "Features only your store has"],
    dakio: [
      "Catalog, variants and live sale prices",
      "One server-priced quote that checkout charges",
      "Cash on delivery, with an SMS code on risky orders",
      "Stock, orders, and Steadfast · Pathao · RedX",
      "Abandoned carts → Incomplete Orders → Nova",
      "Meta Pixel + Conversions API, deduplicated",
      "Tracking and “my orders” by phone",
      "Webhooks the moment anything changes",
    ],
    graphicAlt: "A website on one side, Dakio's back office on the other, joined by one key.",
  },

  steps: {
    h2: "Five minutes to a product on screen.",
    items: [
      { t: "Create a test key", d: "Settings → Developers. It works on localhost and only makes test orders." },
      { t: "Install the SDK", d: "No dependencies. Browser, Node, Next.js, Vercel, Cloudflare.", code: "npm install @dakio/sdk" },
      { t: "Show your products", d: "Prices already include any running sale.", code: "const { data } = await dakio.products.list()" },
      { t: "Take an order", d: "Cash on delivery, straight into the store's Orders.", code: "await dakio.checkout.create({ customer, items })" },
    ],
    cta: "The full quickstart",
  },

  flow: {
    h2: "A checkout that knows Bangladesh.",
    sub: "The very checkout Dakio's own stores run on — shared, not copied. Prices come from the server, a double tap never orders twice, and a risky order asks the buyer for a code first.",
    nodes: ["Bag", "Priced by Dakio", "Checkout", "Code, if risky", "Order placed"],
    chips: ["Cash on delivery", "SMS code on risky orders", "64 districts & thanas", "Dhaka delivery rule", "Coupons & live sales", "Steadfast · Pathao · RedX", "Abandoned-cart follow-up"],
  },

  starters: {
    h2: "Start from a whole store.",
    sub: "Two complete stores — home, shop, product, bag, checkout with the code step, tracking and “my orders”. Plain enough to restyle, good enough to ship.",
    react: { t: "React + Vite", d: "No backend at all. Deploys anywhere static: Vercel, Netlify, even cPanel hosting." },
    next: { t: "Next.js", d: "Server-rendered catalog with JSON-LD, sitemap and robots — and pages that refresh the moment a product changes." },
    deploy: "Deploy to Vercel",
    code: "View code",
  },

  keys: {
    h2: "A key that's safe in plain sight.",
    sub: "A client key can only do what a shopper can: see products, place cash-on-delivery orders, track an order. A live key works only on the websites you list. Your customers, money and settings stay out of reach.",
    rows: [
      { k: "dk_pub_test_…", t: "Test", d: "Any website, localhost included. Test orders only." },
      { k: "dk_pub_live_…", t: "Live", d: "Only on the websites you list. Real orders." },
      { k: "dk_sec_live_…", t: "Secret", d: "Your server only: order sync, webhooks, server checkout. Shown once." },
    ],
    cta: "Keys & security",
  },

  agency: {
    h2: (
      <>
        Build for clients.<br />Earn on every one.
      </>
    ),
    sub: "Agencies and freelance developers: put your clients' stores on Dakio and, through the partner program, earn 10% of what each client pays Dakio — on every payment.",
    cta: "Become a partner",
    note: "Invite-only for now. Tell us about your work.",
    stat: "10%",
    statLabel: "of every payment your clients make",
  },

  faq: {
    h2: "Questions developers ask",
    items: [
      { q: "Is it safe to put the key in my website's code?", a: "Yes — a client key (dk_pub_) is made for it. It can only do what a shopper can already do on the store, a live key only works on the websites you list, and revoking one takes a click. A secret key (dk_sec_) is different: it stays on your server." },
      { q: "Do I need a backend?", a: "No. Catalog, bag, checkout, tracking and abandoned carts all run from the browser with a client key. A server only adds extras: order sync, webhooks and server-side checkout." },
      { q: "What does it cost?", a: "API keys come with every Dakio plan at no extra charge. The store pays its usual plan, and building with test keys is free." },
      { q: "Which payments does checkout take?", a: "Cash on delivery, with Dakio's fake-order protection — the same as the built-in store today." },
      { q: "Does it work with Vue, Svelte or plain HTML?", a: "Anything that runs JavaScript can use it: React, Next.js, Vue, Svelte, or a plain script with an ES module import. The starters are React and Next.js." },
      { q: "Where do the orders show up?", a: "In Dakio → Orders like any other, tagged Website. Confirmation, couriers, returns and the books run there — and Nova sees them all." },
    ],
  },

  cta: {
    h2: "Hand your developer a key.",
    primary: "Open your store",
    secondary: "Read the docs",
  },

  copy: "Copy",
  copied: "Copied",
};

export default dev;
