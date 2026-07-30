// Site chrome copy — nav + footer. English.
//
// Mono/all-caps labels (RUN WITH NOVA, PRODUCT, COMPANY, ৳ BANGLADESH …) are
// deliberately absent from the Bangla file too: Bengali has no uppercase and
// breaks under the 0.14em tracking these carry, so they stay English in both
// locales and live here as shared constants.

export const MONO_LABELS = {
  navStart: "START HERE",
  navNova: "RUN WITH NOVA",
  navBuild: "BUILD & GROW",
  navCompany: "COMPANY",
  navRegion: "৳ BANGLADESH · GOING GLOBAL SOON",
  footProduct: "PRODUCT",
  footTryLive: "TRY IT LIVE",
  footCompany: "COMPANY",
  footRegion: "৳ BANGLADESH · GOING GLOBAL SOON",
  footPayments: "CHECKOUT PAYMENTS · VERIFIED BY SSLCOMMERZ",
};

// Explore preview card — the mono header label per item, plus the mono bits
// inside the vignettes themselves.
export const PREVIEW_MONO = {
  tour: "THE 60-SECOND TOUR",
  store: "OPEN YOUR FIRST STORE",
  switch: "MOVE TO DAKIO",
  supplier: "SUPPLIER NETWORK",
  nova: "NOVA · YOUR ACTING CEO",
  novahq: "NOVA HQ",
  front: "FRONT OFFICE",
  complete: "THE COMPLETE STORE",
  studio: "STORE STUDIO",
  grow: "GROW SUITE",
  ads: "ADS GALLERY",

  available: "AVAILABLE ✓",
  weekend: "OVER A GUIDED WEEKEND",
  ladder: ["L0", "L1", "L2", "L3 OPERATOR", "L4 CEO"],
  decision: "DECISION · MARKETING",
  decisionEst: "+৳9,400 EST · RECEIPT ATTACHED",
  confirmed: "CUSTOMER CONFIRMED → ORDER #1044",
  studioFoot: "DARK MODE · বাংলা FONTS · UNDO",
  opportunity: "OPPORTUNITY FOUND",
  adsFoot: "ONE CLICK · ON-BRAND · MOTION TOO",
  adRatios: ["1:1", "4:5", "9:16"],
};

const chrome = {
  nav: {
    explore: "Explore",
    nova: "Nova",
    switch: "Switch to Dakio",
    pricing: "Pricing",
    login: "Log in",
    cta: "Open your store",
    homeAria: "Dakio — home",
    languageLabel: "Language",
    toBangla: "Switch language to Bangla",
    toEnglish: "Switch language to English",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    startItems: {
      GO: { n: "Open your first store", d: "A designed store, live in minutes" },
      MV: { n: "Move to Dakio", d: "Products, customers & domain — brought over" },
      ZS: { n: "Sell without inventory", d: "Suppliers hold and ship for you" },
    },
    novaItems: {
      NV: { n: "Nova", d: "Meet your AI Acting CEO" },
      HQ: { n: "Nova HQ", d: "Supervise decisions, receipts and results" },
      FO: { n: "Front Office", d: "Nova sells in your inbox" },
    },
    buildItems: {
      CS: { n: "The Complete Store", d: "Payments, couriers, orders — ready day one" },
      SS: { n: "Store Studio", d: "Design a storefront without a developer" },
      GL: { n: "Grow Suite", d: "Promote, create, discover, improve" },
      AD: { n: "Ads Gallery", d: "Product → on-brand ad in one click" },
      SN: { n: "Supplier Network", d: "Sell without holding inventory" },
    },
    // One entry per preview state of the Explore card. `cta` is the lime
    // footer link; the rest is the vignette's own copy.
    previews: {
      tour: {
        cta: "Start the tour",
        title: "See Dakio run a store",
        body: "Approve a decision, restyle a storefront, turn a message into an order — every room is the real product.",
        hint: "Hover any item for a preview →",
      },
      store: {
        cta: "Start from zero",
        handle: "shahrqee",
        domain: "shahrqee.dakio.shop",
        note: "A designed storefront, yours the moment you sign up.",
      },
      switch: {
        cta: "Plan my switch",
        rows: [
          { l: "Products & photos", v: "✓ moved" },
          { l: "Customers & orders", v: "✓ moved" },
          { l: "Your domain", v: "✓ connected" },
        ],
      },
      supplier: {
        cta: "See how it works",
        rows: ["Supplier holds the stock", "Your store makes the sale", "Dakio packs & ships"],
        payout: "COD cash → your balance",
      },
      nova: {
        cta: "Meet Nova",
        title: (
          <>
            One appointment.<br />A whole back office.
          </>
        ),
        note: "Autonomy is earned — receipts for everything.",
      },
      novahq: {
        cta: "Open Nova HQ",
        decision: "Scale “Muslin drop” ৳800 → ৳1,200/day",
        approve: "Approve",
        later: "Later",
      },
      front: {
        cta: "See the inbox",
        customer: "Dam koto? Size M ase?",
        nova: "৳2,300, M ase — order kore dei?",
      },
      complete: {
        cta: "See everything included",
        rows: [
          { l: "bKash ৳2,300", v: "received ✓" },
          { l: "Pathao pickup", v: "booked ✓" },
          { l: "Profit & fees", v: "recorded ✓" },
        ],
        note: "…and you did none of it.",
      },
      studio: {
        cta: "Try the builder",
        headline: "Eid Muslin Collection",
        looks: "one-tap looks",
      },
      grow: {
        cta: "Walk the floors",
        title: "Eid Muslin searches up ×3.2",
        sub: "38 past buyers match this collection",
        button: "Prepare campaign",
      },
      ads: { cta: "Make an ad" },
    },
    about: "About",
    blog: "Blog",
    contact: "Contact",
  },
  footer: {
    tagline: "The commerce OS for Bangladesh — with an AI CEO in every store.",
    product: {
      nova: "Nova — your CEO",
      store: "The Complete Store",
      studio: "Store Studio",
      grow: "Grow Suite",
      ads: "Ads Gallery",
      frontOffice: "Front Office",
      pricing: "Pricing",
    },
    tryLive: {
      hq: "Nova HQ",
      studio: "Store Studio builder",
      grow: "The Grow Suite",
      ads: "Ads editor",
      inbox: "The inbox",
    },
    company: {
      about: "About",
      blog: "Blog",
      contact: "Contact",
      switch: "Switch to Dakio",
    },
    payAlt: "Pay with Visa, Mastercard, bKash, Nagad, Rocket and 40+ methods — verified by SSLCommerz",
    legalLine: (
      <>
        © 2026 Dakio by Digidhaka Communication Limited. All rights reserved.
        <br />
        Trade License No. TRAD/DSCC/041467/2021 · Made for Bangladesh&apos;s entrepreneurs
      </>
    ),
    privacy: "Privacy",
    terms: "Terms",
    refund: "Return & Refund Policy",
    dataDeletion: "Data Deletion",
    cta: "Open your store",
  },
};

export default chrome;
