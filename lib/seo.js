// SEO pack per docs/SEO - Meta & Strategy.md: Organization + SoftwareApplication
// + FAQPage (/pricing, /switch) + BreadcrumbList site-wide.

export const SITE_URL = "https://dakio.io";

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dakio",
  legalName: "Digidhaka Communication Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  identifier: "Trade License TRAD/DSCC/041467/2021",
  email: "hello@dakio.io",
  telephone: "+8801521305403",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House 5, Road 5, Priyanka City, Sector 12, Uttara",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  description:
    "Dakio is the commerce OS for Bangladesh — store, couriers, bKash, Nagad & COD, plus Nova, an AI Acting CEO in every store.",
};

export const SOFTWARE_APPLICATION = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dakio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "All-in-one e-commerce platform for Bangladesh with Nova, an AI Acting CEO: storefront, couriers, bKash/Nagad/COD payments, marketing and support — every action receipted and undoable.",
  offers: [
    { "@type": "Offer", name: "Starter", price: "0", priceCurrency: "BDT", description: "Free forever — store, orders, couriers and Nova Advisor (50 tasks/mo)." },
    { "@type": "Offer", name: "Growth", price: "1490", priceCurrency: "BDT", description: "৳1,490/month — Nova Operator, 750 tasks/mo, Grow Labs, Supplier Network." },
    { "@type": "Offer", name: "Business", price: "3990", priceCurrency: "BDT", description: "৳3,990/month — Nova L4 Acting CEO, 2,500 tasks/mo, voice minutes, playbooks." },
  ],
};

const faq = qas => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: qas.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const PRICING_FAQ = faq([
  ["Why not unlimited AI?", "Nova does real work on real compute — unlimited would mean either fake AI or hidden throttling. We'd rather sell you an honest meter with receipts than a soft lie."],
  ["What happens when my tasks run out?", "Nova shifts to Draft mode: it keeps preparing everything but executes nothing until you top up (৳250 / 250 tasks) or the month resets. Nothing is lost, nothing is silent."],
  ["What do couriers cost?", "Per-delivery, passed through at the courier's rate (Steadfast, Pathao, RedX) on every plan — we don't mark up shipping."],
  ["I'm not in Bangladesh — can I use Dakio?", "Soon. We built for Bangladesh first — ৳, bKash, COD, Bangla — and global markets open next with local pricing, not conversions. Join the waitlist from the signup page."],
]);

export const SWITCH_FAQ = faq([
  ["Will my Google ranking break?", "No — every old URL gets a permanent redirect to its new home, and your domain stays yours. Rankings follow the redirects."],
  ["What happens to my theme?", "Themes don't transfer between platforms — instead you rebuild in Store Studio in an afternoon: theme gallery, your brand colors, Bangla fonts, no developer."],
  ["Am I locked in?", "No contract, monthly billing, and your data (products, customers, orders) exports to CSV anytime. We keep you by being better, not by holding the door."],
]);

export const PAGE_NAMES = {
  "/": "Home",
  "/nova": "Nova",
  "/store": "The Complete Store",
  "/store-studio": "Store Studio",
  "/grow": "Grow Labs",
  "/ads": "Ads Gallery",
  "/front-office": "Front Office",
  "/switch": "Switch to Dakio",
  "/pricing": "Pricing",
  "/about": "About",
  "/blog": "Blog",
  "/contact": "Contact",
};

export const breadcrumbs = route => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement:
    route === "/"
      ? [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }]
      : [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: PAGE_NAMES[route], item: `${SITE_URL}${route}` },
        ],
});

export function jsonLdFor(route) {
  const blocks = [breadcrumbs(route)];
  if (route === "/") blocks.push(ORGANIZATION, SOFTWARE_APPLICATION);
  if (route === "/pricing") blocks.push(PRICING_FAQ);
  if (route === "/switch") blocks.push(SWITCH_FAQ);
  return blocks;
}
