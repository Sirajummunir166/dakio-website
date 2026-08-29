// Structured-data copy — English. Feeds lib/seo.js (Organization,
// SoftwareApplication, BreadcrumbList names, FAQPage entries).

const seo = {
  home: "Home",

  organizationDescription:
    "Dakio is the commerce OS for Bangladesh — store, couriers, bKash, Nagad & COD, plus Nova, an AI Acting CEO in every store.",

  applicationDescription:
    "All-in-one e-commerce platform for Bangladesh with Nova, an AI Acting CEO: storefront, couriers, bKash/Nagad/COD payments, marketing and support — every action receipted and undoable.",

  // FALLBACK ONLY — the emitted offers come from the live catalogue
  // (lib/plans.js#getJsonLdOffers). The withdrawn Starter tier is gone: a
  // schema.org Offer at price 0 is a rich-result promise Google keeps showing.
  offers: [
    { name: "Growth", price: "1490", priceCurrency: "BDT", description: "৳1,490/month — Nova Operator, 750 tasks/mo, Grow Suite, Supplier Network." },
    { name: "Business", price: "3990", priceCurrency: "BDT", description: "৳3,990/month — Nova L4 Acting CEO, 2,500 tasks/mo, voice minutes, playbooks." },
  ],

  pageNames: {
    "/": "Home",
    "/nova": "Nova",
    "/store": "The Complete Store",
    "/store-studio": "Store Studio",
    "/grow": "Grow Suite",
    "/ads": "Ads Gallery",
    "/front-office": "Front Office",
    "/switch": "Switch to Dakio",
    "/pricing": "Pricing",
    "/about": "About",
    "/blog": "Blog",
    "/contact": "Contact",
  },

  pricingFaq: [
    ["Why not unlimited AI?", "Nova does real work on real compute — unlimited would mean either fake AI or hidden throttling. We'd rather sell you an honest meter with receipts than a soft lie."],
    ["What happens when my tasks run out?", "Nova shifts to Draft mode: it keeps preparing everything but executes nothing until you top up (৳250 / 250 tasks) or the month resets. Nothing is lost, nothing is silent."],
    ["What do couriers cost?", "Per-delivery, passed through at the courier's rate (Steadfast, Pathao, RedX) on every plan — we don't mark up shipping."],
    ["I'm not in Bangladesh — can I use Dakio?", "Soon. We built for Bangladesh first — ৳, bKash, COD, Bangla — and global markets open next with local pricing, not conversions. Join the waitlist from the signup page."],
  ],

  switchFaq: [
    ["Will my Google ranking break?", "No — every old URL gets a permanent redirect to its new home, and your domain stays yours. Rankings follow the redirects."],
    ["What happens to my theme?", "Themes don't transfer between platforms — instead you rebuild in Store Studio in an afternoon: theme gallery, your brand colors, Bangla fonts, no developer."],
    ["Am I locked in?", "No contract, monthly billing, and your data (products, customers, orders) exports to CSV anytime. We keep you by being better, not by holding the door."],
  ],
};

export default seo;
