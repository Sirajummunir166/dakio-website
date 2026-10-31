// Site chrome copy — nav + footer. English.
//
// The footer's mono/all-caps labels (PRODUCT, COMPANY, MADE IN BANGLADESH …) are
// deliberately absent from the Bangla file too: Bengali has no uppercase and
// breaks under the 0.14em tracking these carry, so they stay English in both
// locales and live here as shared constants.

export const MONO_LABELS = {
  footProduct: "PRODUCT",
  footTryLive: "TRY IT LIVE",
  footCompany: "COMPANY",
  footRegion: "MADE IN BANGLADESH · OPEN WORLDWIDE",
  footPayments: "CHECKOUT PAYMENTS · VERIFIED BY SSLCOMMERZ",
};

const chrome = {
  nav: {
    explore: "Explore",
    nova: "Nova",
    switch: "Switch to Dakio",
    shops: "For shops",
    services: "For services",
    pricing: "Pricing",
    login: "Log in",
    cta: "Get started",
    homeAria: "Dakio home",
    languageLabel: "Language",
    toBangla: "Switch language to Bangla",
    toEnglish: "Switch language to English",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    // The Explore menu: one group per kind of business, then Nova and the rest.
    // Each item names what the owner gets, in the words they would use; `note`
    // is the one line under its screenshot in the preview card.
    groups: {
      shops: {
        title: "For shops",
        sub: "You sell products",
        items: {
          inbox: { n: "Every message answered", d: "Messenger, Instagram, WhatsApp, website chat", note: "Nova answers each customer and makes the order in the chat." },
          fake: { n: "Fewer fake orders", d: "Risky buyers flagged before you ship", note: "Past returns and courier history show up on the order, before you send it." },
          courier: { n: "Couriers and COD", d: "Book pickups, see the cash come back", note: "Every parcel and every taka of COD in one list." },
          website: { n: "Your own website", d: "A designed store, live in minutes", note: "Pick a look made for your kind of shop. Checkout and delivery are already in it." },
          stock: { n: "Sell without stock", d: "Suppliers hold it, Dakio ships it", note: "Add products from verified suppliers. Dakio packs and ships each order." },
        },
      },
      services: {
        title: "For services",
        sub: "You sell your time",
        items: {
          bookings: { n: "Bookings online", d: "Clients pick a time, day or night", note: "Clients book from your page or the chat, and it lands in your calendar." },
          noshow: { n: "Fewer no shows", d: "Reminders go out on their own", note: "A reminder before every booking, without you sending it." },
          team: { n: "Your team's day", d: "Who works when, on one calendar", note: "Every booking with the person doing it." },
          paid: { n: "Getting paid", d: "Quotes, invoices and payments", note: "Send the invoice, see what is paid and what is not." },
          pipeline: { n: "Leads and deals", d: "Every enquiry, stage by stage", note: "No enquiry is forgotten. Each one sits at its stage until it is won or lost." },
        },
      },
      more: {
        title: "Nova and more",
        sub: "For every business",
        items: {
          nova: { n: "Nova, your AI CEO", d: "Runs the day to day, you make the big calls", note: "Nova answers messages and comments, makes the order in the chat and follows up. Prices, refunds and risky calls come to you." },
          ads: { n: "Ads and creatives", d: "Ad pictures and videos from your products", note: "Turn a product into an ad picture or a short video." },
          posts: { n: "Posts and campaigns", d: "Plan the week's posts with Nova", note: "Nova drafts the posts and campaigns, you approve them." },
          switch: { n: "Move to Dakio", d: "Bring your products, customers and domain", note: "We bring over what you already have." },
          developers: { n: "Developers", d: "Your own site with Dakio behind it", note: "Your own React or Next.js site. Checkout, couriers and Nova come from Dakio." },
        },
      },
    },
    // The preview card before the visitor points at anything.
    start: {
      title: "New here? Start with your business",
      body: "See what Dakio does for a business like yours, with real screens from the app.",
      shops: "I sell products",
      services: "I sell services",
      chat: "Or watch Nova answer a real chat",
    },
    see: "See how",
    region: "Made in Bangladesh, open worldwide",
    company: "Company",
    about: "About",
    blog: "Blog",
    contact: "Contact",
  },
  footer: {
    tagline: "Your whole business in one app, with Nova as your AI CEO.",
    product: {
      nova: "Nova, your AI CEO",
      store: "The Complete Store",
      studio: "Store Studio",
      grow: "Grow Suite",
      ads: "Ads Gallery",
      frontOffice: "Front Office",
      pricing: "Pricing",
      developers: "Developers",
      themes: "Themes",
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
    payAlt: "Pay with Visa, Mastercard, bKash, Nagad, Rocket and 40+ methods, verified by SSLCommerz",
    legalLine: (
      <>
        © 2026 Dakio by Digidhaka Communication Limited. All rights reserved.
        <br />
        Trade License No. TRAD/DSCC/041467/2021 · Made for entrepreneurs everywhere
      </>
    ),
    privacy: "Privacy",
    terms: "Terms",
    refund: "Return & Refund Policy",
    dataDeletion: "Data Deletion",
    cta: "Get started",
  },
};

export default chrome;
