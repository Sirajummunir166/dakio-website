// The Complete Store copy — English.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "THE FOUNDATION · EVERYTHING INCLUDED",
  heroStrip: ["READY ON DAY ONE", "WORKS ON ITS OWN", "EVERY ৳ ON RECORD"],
  orderKicker: "PROOF · ORDER #1044, LAST TUESDAY",
  yourPart: "YOUR PART IN THIS ORDER",
  utilsKicker: "SIX PARTS · ALL INCLUDED · ALL AUTOMATIC",
  diffKicker: "THE DIFFERENCE",
  ctaStrip: "FREE TO START · ৳ · bKASH · NAGAD · COD · COURIERS WIRED",
  stageTimes: ["TUE 21:12", "21:14", "21:15", "WED 08:40", "WED 14:38", "WED 14:39"],
  stagePipes: ["FRONT OFFICE", "PAYMENT", "COURIER", "STOCK", "DELIVERY", "MONEY"],
  utilVerbs: ["READY AT SIGNUP", "PAYMENTS COME IN", "BOOKED FOR YOU", "ANSWERED FOR YOU", "SHIPPED FOR YOU", "COUNTED FOR YOU"],
};

const store = {
  meta: {
    title: "The Complete Store — Everything Included, From Day One | Dakio",
    description:
      "Payments, couriers, orders and stock already work on a Dakio store — bKash, Nagad, cards and cash on delivery, Steadfast, Pathao and RedX. Open your store free.",
  },

  hero: {
    h1: (
      <>
        A store that runs<br />itself<span style={{ color: "#C6F035" }}>.</span>
      </>
    ),
    sub: (
      <>
        Payments, couriers, orders, stock — on other platforms this is your daily work. On Dakio it <b style={{ color: "#E9EFDC" }}>happens on its own</b>, with proof you can check anytime.
      </>
    ),
  },

  order: {
    h2: (
      <>
        One order,<br />start to <Mark>finish</Mark>.
      </>
    ),
    p: "A real order, step by step. Every step has a time and a record — and the owner did none of it.",
    yourPartValue: "nothing.",
    stages: [
      { t: "A customer messages", d: "“Dam koto? M ase?” — Nova answers in Bangla, the customer says yes, order #1044 is created. No message missed." },
      { t: "Payment arrives by itself", d: "৳2,300 comes in over bKash — confirmed and recorded. Nagad, cards and cash on delivery work from day one too." },
      { t: "Courier gets booked", d: "Pathao pickup set for 9 AM, tracking number made, customer told. Steadfast and RedX as backup." },
      { t: "The product ships", d: "This one came from a trusted supplier — they hold the stock, Dakio packs and ships. Selling your own stock? The count simply updates: 125 → 124." },
      { t: "Delivered, Chattogram", d: "Delivery proof saved. If this were cash on delivery, the cash would reach your balance automatically." },
      { t: "Money counted, recorded", d: "Courier and gateway fees listed, profit calculated, record #A-1044 saved. Tomorrow’s 6 AM report will mention it." },
    ],
  },

  utils: {
    h2: "Everything included. Everything automatic.",
    items: [
      { mono: "SF", n: "Storefront & link", d: "A ready-made store at name.dakio.shop the moment you register — your own domain when you want it.", chips: ["name.dakio.shop", "own domain", "বাংলা + EN"] },
      { mono: "CK", n: "Checkout", d: "The payments Bangladesh actually uses, already set up — nothing to install, no dollar fees.", chips: ["bKash", "Nagad", "cards · SSLCommerz", "cash on delivery"] },
      { mono: "CR", n: "Couriers", d: "Order confirmed → pickup booked, tracking made, customer told. COD cash reaches your balance after delivery.", chips: ["Steadfast", "Pathao", "RedX"] },
      { mono: "OD", n: "Order desk", d: "Storefront, Messenger, Instagram, WhatsApp — one list. Nova replies, and places an order only after the customer says yes.", chips: ["one list", "asks first", "fewer fake orders"] },
      { mono: "ST", n: "Stock — yours or theirs", d: "Keep your own stock, or sell from trusted suppliers who hold it for you. Dakio ships either way.", chips: ["own stock", "supplier network", "no stock needed"] },
      { mono: "LG", n: "Money records", d: "Every taka in and out — fees, COD cash, courier charges — written down automatically. Profit you can trust.", chips: ["every ৳ on record", "profit view", "mistakes can be undone"] },
    ],
    note: "All of this comes with every store. Nothing extra to install, nothing extra to pay for.",
  },

  diff: {
    h2: (
      <>
        On other platforms, you do the work.<br /><span style={{ color: "#C6F035" }}>On Dakio, the work is done for you.</span>
      </>
    ),
    rows: [
      { old: "Set up payments yourself — forms, papers, monthly fees", now: "bKash payment reaches you from your very first order" },
      { old: "Book every courier yourself, copy-paste addresses", now: "Pickup is booked the moment an order confirms" },
      { old: "Buy stock first, hope it sells", now: "Sell first — a trusted supplier ships it for you" },
    ],
  },

  cta: {
    h2: (
      <>
        Everything ready.<br />Open your store today.
      </>
    ),
    primary: "Open your store",
    secondary: "Then appoint Nova",
  },
};

export default store;
