// Site chrome copy — nav + footer. English.
//
// Mono/all-caps labels (RUN BY NOVA, PRODUCT, COMPANY, ৳ BANGLADESH …) are
// deliberately absent from the Bangla file too: Bengali has no uppercase and
// breaks under the 0.14em tracking these carry, so they stay English in both
// locales and live here as shared constants.

export const MONO_LABELS = {
  navNova: "RUN BY NOVA",
  navBuild: "BUILD & GROW",
  navCompany: "COMPANY",
  navRegion: "৳ BANGLADESH · GOING GLOBAL SOON",
  footProduct: "PRODUCT",
  footTryLive: "TRY IT LIVE",
  footCompany: "COMPANY",
  footRegion: "৳ BANGLADESH · GOING GLOBAL SOON",
  footPayments: "CHECKOUT PAYMENTS · VERIFIED BY SSLCOMMERZ",
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
    novaItems: {
      HQ: { n: "Nova HQ", d: "Supervise your Acting CEO" },
      FO: { n: "Front Office", d: "Nova sells in your inbox" },
    },
    buildItems: {
      CS: { n: "The Complete Store", d: "Everything included, working from day one" },
      SS: { n: "Store Studio", d: "Design without a developer" },
      GL: { n: "Grow Labs", d: "The business Grow Studio" },
      AD: { n: "Ads Gallery", d: "Product → on-brand ad" },
      SN: { n: "Supplier Network", d: "Sell with zero inventory" },
    },
    tour: {
      title: "The 60-second tour",
      sub: "Every room, clickable — real product, not mockups.",
      cta: "Take it",
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
      grow: "Grow Labs",
      ads: "Ads Gallery",
      frontOffice: "Front Office",
      pricing: "Pricing",
    },
    tryLive: {
      hq: "Nova HQ",
      studio: "Store Studio builder",
      grow: "The Grow Studio",
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
