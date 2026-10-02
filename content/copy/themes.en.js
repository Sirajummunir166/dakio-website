// Themes copy — English. /themes (the showroom) and /themes/<key> (one theme).
// Facts that don't change with language (palette, fonts, pages) are in
// lib/themes.js.

export const MONO = {
  kicker: "DAKIO THEMES",
  count: "8 STOREFRONTS",
  template: "TEMPLATE",
  includesKicker: "IN EVERY THEME",
  stepsKicker: "GOING LIVE",
  colours: "COLOURS",
  type: "TYPE",
  sections: "HOME PAGE, TOP TO BOTTOM",
  pages: "PAGES",
  look: "THE LOOK",
  ctaStrip: "CASH ON DELIVERY · SMS-CODE CHECKOUT · YOUR OWN DOMAIN",
};

const themes = {
  meta: {
    title: "Dakio Themes — Designer Storefronts for Every Kind of Shop",
    description:
      "Eight complete storefront designs for Bangladeshi shops: fashion, beauty, jewelry, furniture, grocery, baby, modest wear and books. Your own website, with Dakio's catalog, cash-on-delivery checkout and couriers behind it.",
  },
  navCta: "Open your store",

  hero: {
    h1: "A storefront made for your kind of shop.",
    sub: "Eight complete store designs, one for each kind of shop Bangladeshi sellers start with. Each becomes your own website on your own domain, and Dakio runs everything behind it: products, prices, cash-on-delivery checkout, couriers and Nova.",
    ctaPrimary: "See the themes",
    ctaSecondary: "Open your store",
  },

  card: {
    demo: "Live demo",
    soon: "Demo coming soon",
    look: "Look inside",
    products: n => `${n} demo products`,
    categories: n => `${n} categories`,
    pages: n => `${n} pages`,
  },

  // One per theme, keyed like lib/themes.js.
  items: {
    saril: {
      category: "Fashion & clothing",
      line: "For clothing brands selling sarees, three-piece, panjabi and kidswear. A warm editorial look: full-bleed photos, cream and maroon, italic serif headlines.",
      sections: [
        "Announcement bar and header",
        "Full-bleed hero with six category photo tiles",
        "New this week",
        "The Eid edit: one photo, two featured pieces",
        "The Panjabi Room, a maroon band of men's wear",
        "Find your occasion: a three-door category mosaic",
        "Best sellers in tabs",
        "Made in Dhaka story with photos and numbers",
        "Promises: cash on delivery, all of Bangladesh, 7-day exchange",
        "Maroon footer",
      ],
    },
    bloome: {
      category: "Beauty & skincare",
      line: "For skincare and beauty shops that want a warm, natural look: cream backgrounds, deep green serif headlines, handwritten notes and soft amber product photos.",
      sections: [
        "Header over the hero photo",
        "Hero with a Find My Routine button and four trust icons",
        "Shop by skin concern, beside a daily-routine card",
        "Bestsellers with ratings and quick add",
        "Glow Naturally banner",
        "Shop by category",
        "Ingredients you can trust",
        "Simple routines in tabs",
        "Customer stories",
        "Closing banner",
        "Footer with newsletter signup",
      ],
    },
    lumira: {
      category: "Jewelry & accessories",
      line: "For jewelry shops selling rings, necklaces, earrings, bangles, watches and gift sets. Cream and gold, large serif headlines and soft photos of every piece.",
      sections: [
        "Hero with a handwritten note and six category tiles",
        "Find the perfect gift: for her, for him, for occasions",
        "Shop by occasion: everyday, weddings, festive, gifts",
        "Bestsellers with ratings and wishlist hearts",
        "New arrivals banner",
        "Quality, packaging, payment and returns strip",
        "Shop by category",
        "Two promos: gifts and personalized jewelry",
        "Customer photo grid",
        "Footer with newsletter signup",
      ],
    },
    nook: {
      category: "Furniture & home",
      line: "For furniture and home-decor shops that want a calm, warm look: big room photos, serif headlines and handwritten notes, shopped by room and by category.",
      sections: [
        "Full-bleed room photo with a Complete the Room panel",
        "Shop by room",
        "Shop by category",
        "Two promo banners",
        "Bestsellers with ratings and wishlist hearts",
        "Story banner with a handwritten note",
        "Why choose us: four trust points",
        "Inspiration for your home",
        "Newsletter strip",
        "Footer",
      ],
    },
    freshcart: {
      category: "Grocery & daily needs",
      line: "For grocery and fresh-food shops that deliver fast across the city: a bright, friendly supermarket look with fresh-green buttons and big produce photos.",
      sections: [
        "Header with delivery area, search and aisles",
        "Hero with a delivery-time pill and an aisle list",
        "Shop by need, beside today's fresh picks",
        "Farm fresh banner",
        "Bestsellers with quick add",
        "Promises: fresh, fast, fair prices, easy returns",
        "Daily deals and healthy choices",
        "Shop by category",
        "Fresh recipes",
        "Get the app banner",
        "Footer",
      ],
    },
    tinyjoy: {
      category: "Baby & kids",
      line: "For shops selling baby and kids essentials: diapers, feeding, bath, clothes and toys, with hand-lettered navy and red headlines and playful doodles.",
      sections: [
        "Hand-lettered hero with shop by age",
        "Six essentials tiles",
        "Newborn and play-and-learn banners",
        "Bestsellers with ratings",
        "Safe, fast delivery, easy returns strip",
        "Shop by category",
        "Clothing banner",
        "Tips and guides",
        "Newsletter signup",
        "Footer with app badges",
      ],
    },
    safiyah: {
      category: "Modest fashion",
      line: "For shops selling hijabs, abayas, panjabis, kids' modest wear and prayer sets: a warm cream-and-black storefront with large lifestyle photos.",
      sections: [
        "Hero with Ramadan and everyday collection cards",
        "Two collection banners",
        "New arrivals with wishlist and quick add",
        "Why choose us strip",
        "Shop by category",
        "Story banner with a script note",
        "Community photo rail",
        "Footer with newsletter signup",
      ],
    },
    papyr: {
      category: "Books, stationery & gifts",
      line: "For bookshops and stationery stores: book and desk photos on warm cream paper, serif headlines, handwritten notes and deep green buttons.",
      sections: [
        "Header with search, saved items and cart",
        "Hero with shop by mood: read, create, gift, study",
        "Six category tiles",
        "Books and stationery banners",
        "Bestsellers",
        "Why choose us strip",
        "Shop by category",
        "Gift story banner",
        "Ideas and inspiration",
        "Newsletter bar",
        "Footer",
      ],
    },
  },

  showroom: {
    h2: "Eight shops, eight looks.",
    sub: "Every theme is a whole store: home, collections, product pages, cart, checkout with an SMS code, and order pages. Open any theme to see its home page on a laptop and on a phone, and a product page.",
  },

  includes: {
    h2: "The parts your customers never see, already done.",
    sub: "Every theme runs on the same Dakio checkout as your Dakio store. You choose the look; the selling works the same.",
    items: [
      "Cash on delivery with an SMS code, so fake orders stop at checkout",
      "Delivery charges by district, set once in Dakio",
      "Products, prices and stock from your Dakio store, refreshed every minute",
      "Coupon codes at checkout",
      "Bangla product names in a proper Bangla font",
      "Designed for phones first",
    ],
  },

  steps: {
    h2: "From theme to your own website.",
    items: [
      { t: "Pick a theme", d: "Look through its pages here, or open its live demo where there is one." },
      { t: "Tell us which one", d: "Send us the theme and your Dakio store. We set it up with you." },
      { t: "Connect your Dakio store", d: "One website key from Dakio, under Settings → Developers. Your products, prices and delivery charges appear on their own." },
      { t: "Use your own domain", d: "Point your domain at it. Orders arrive in Dakio with a Website tag, ready for your couriers." },
    ],
  },

  detail: {
    back: "All themes",
    tabs: { full: "Home on a laptop", phoneFull: "Home on a phone", product: "Product page", home2: "Second home design" },
    captions: {
      full: "The whole home page, at laptop width.",
      phoneFull: "The whole home page on a phone.",
      product: "A product page, first screen.",
      home2: "A second home page that comes with the theme.",
    },
    typeLine: (display, body) => `${display} for headlines, ${body} for text.`,
    accent: a => `Accents in ${a}.`,
    stats: (p, c) => `${p} demo products in ${c} categories`,
    next: "Next theme",
    demoNote: "The demo runs on sample products. Orders there are not real.",
  },

  cta: {
    h2: "Your shop deserves its own look.",
    primary: "Open your store",
    secondary: "Talk to us",
  },

  // The home page band (components/home/ThemesBand.jsx).
  home: {
    kicker: "DAKIO THEMES",
    h2: "Your own website, in a look made for your shop.",
    sub: "Eight designer storefronts, from sarees to groceries. Dakio runs the checkout, couriers and Nova behind every one.",
    cta: "See all themes",
  },
};

export default themes;
