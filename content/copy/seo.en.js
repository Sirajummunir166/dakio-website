// Structured-data copy — English. Feeds lib/seo.js (Organization,
// SoftwareApplication, BreadcrumbList names, FAQPage entries).

const seo = {
  home: "Home",

  organizationDescription:
    "Dakio runs a whole business in one app: website, orders, customers, couriers, bookings and payments, with Nova, an AI CEO, working in every part. Made in Bangladesh.",

  applicationDescription:
    "One app for shops and service businesses in Bangladesh, with Nova, an AI CEO: website, inbox, orders, couriers, bookings, customer pages, bKash, Nagad and cash on delivery.",

  // FALLBACK ONLY — the emitted offers come from the live catalogue
  // (lib/plans.js#getJsonLdOffers). The withdrawn Starter tier is gone: a
  // schema.org Offer at price 0 is a rich-result promise Google keeps showing.
  offers: [
    { name: "Growth", price: "1490", priceCurrency: "BDT", description: "৳1,490/month — Nova Operator, 7,500 Nova credits/month, Grow Suite, Supplier Network." },
    { name: "Business", price: "3990", priceCurrency: "BDT", description: "৳3,990/month — Nova with voice, 25,000 Nova credits/month, voice minutes, playbooks." },
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
    "/shops": "For shops",
    "/services": "For services",
    "/pricing": "Pricing",
    "/about": "About",
    "/blog": "Blog",
    "/contact": "Contact",
    "/developers": "Developers",
    "/themes": "Themes",
  },

  pricingFaq: [
    ["Why not unlimited AI?", "Nova does real work on real compute — unlimited would mean either fake AI or hidden throttling. We'd rather sell you an honest meter with receipts than a soft lie."],
    ["What happens when my credits run out?", "Nova shifts to Draft mode: it keeps preparing everything but executes nothing until you top up (৳250 / 250 credits) or the month resets. Nothing is lost, nothing is silent."],
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
