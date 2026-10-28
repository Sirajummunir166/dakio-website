// Home copy, English. Mirrors the section order of app/[lang]/page.js.
// The full deck with the reasoning behind every line is HOME_COPY.md.
// House rule: no en dash or em dash anywhere in this file.
//
// `shop` / `svc` / `both` keys follow the "What do you sell?" switch in the
// hero (components/home/Audience.jsx). The /shops and /services pages reuse
// the same sections with the switch preset, plus their own blocks below.

// Brand names in the "works with" strip. "Website chat" and "Cash on delivery"
// are words, so each locale carries its own list.
export const MARQUEE = ["Messenger", "Instagram", "WhatsApp", "Website chat", "bKash", "Nagad", "Cash on delivery", "Steadfast", "Pathao", "RedX"];

const home = {
  meta: {
    title: "Dakio | One app to run your whole business, with an AI manager built in",
    description:
      "Website, products and stock, orders, couriers, bookings, clients and money in one app, made in Bangladesh. Nova, your AI manager, works in every part. Bangla first, bKash and cash on delivery built in.",
  },

  hero: {
    badge: "FOR SHOPS AND SERVICE BUSINESSES IN BANGLADESH",
    h1: "Run your whole business from one app.",
    // The rotating headline (components/home/RotatingHead.jsx): shops and
    // service businesses in turn; "fallback" is what phones and search see.
    rot: {
      pre: "Run your",
      post: "from one app.",
      fallback: "shop or service business",
      kinds: [
        { t: "clothing shop", k: "shop" }, { t: "beauty parlour", k: "svc" }, { t: "gadget shop", k: "shop" },
        { t: "coaching centre", k: "svc" }, { t: "grocery shop", k: "shop" }, { t: "doctor's chamber", k: "svc" },
        { t: "photography studio", k: "svc" }, { t: "men's salon", k: "svc" },
      ],
    },
    showing: "Showing",
    accent: "With an AI manager built in.",
    ask: "What do you sell?",
    opts: { shop: "Products", svc: "Services", both: "Both" },
    sub: {
      shop: "Website, products and stock, orders, couriers, payments and your team, all in Dakio. Nova answers customers, takes orders, keeps buyers updated and tells you what needs you.",
      svc: "Website, bookings and calendar, clients, invoices and your team, all in Dakio. Nova answers, books, reminds clients and tells you what needs you.",
      both: "Products and services, orders and bookings, stock, clients and money, all in Dakio. Nova works in every part of it.",
    },
    cta: "Get started",
    under: "Live in 5 minutes · No developer needed",
    second: "See Nova at work",
  },

  works: { label: "Works with what you already use" },

  // Everything to run it (HomeSections.jsx Run): the system, stage by stage,
  // per audience. Only what is in the app today.
  run: {
    kicker: "EVERYTHING TO RUN IT",
    h2: { shop: "From the product on your shelf to the money in your account.", svc: "From your price list to the money in your account.", both: "Everything a shop or a service business runs on." },
    sub: "Dakio is the whole system, not a chat tool. Nova works in every part of it.",
    nova: "Nova works in every part",
    shop: [
      { t: "Products", items: ["Sizes, colours and photos", "Categories and brands", "Edit many at once"] },
      { t: "Stock", items: ["Stock in every warehouse", "Purchases from suppliers", "Low stock flagged by Nova"] },
      { t: "Sell", items: ["Your own website", "Chats and comments", "POS at your counter"] },
      { t: "Orders", items: ["Every order in one list", "Fake order check", "Coupons and add-ons"] },
      { t: "Deliver", items: ["Steadfast, Pathao, RedX", "Tracking in the chat", "Returns tracked"] },
      { t: "Money and team", items: ["Payments, expenses, ledger", "Courier cash matched", "Staff attendance and leave"] },
    ],
    svc: [
      { t: "Services", items: ["Prices and durations", "Who does what", "Opening hours"] },
      { t: "Get found", items: ["Your own booking website", "Enquiry form and QR code", "Chats and comments"] },
      { t: "Book", items: ["Only times that are free", "Day and week calendar", "Google Calendar in step"] },
      { t: "Remind", items: ["SMS or email reminders", "Each person's day list", "Follow-up tasks"] },
      { t: "Clients", items: ["One page per client", "Pipeline from enquiry to won", "Offers by SMS, email, chat"] },
      { t: "Money", items: ["Quotes and invoices", "Client accepts online", "Payments, part or full"] },
    ],
    note: "Every part above is in the app today.",
  },


  // Nova's machine (components/home/NovaMachine.jsx): a 3D line from a chat
  // to a delivered order or a kept appointment. Every station is a built
  // feature; the courier is booked by the owner from the order page.
  machine: {
    sub: "This is the line Nova runs all day and all night. Drag to look around, or tap a station.",
    hint: { drag: "Drag to look around · Tap a station", touch: "Tap a station" },
    pause: "Pause",
    play: "Play",
    back: "Back to the whole line",
    stations: {
      in: { t: "Chats come in", d: "Messenger, Instagram, WhatsApp and the chat on your website land in one inbox." },
      nova: { t: "Nova decides", d: "She reads the message, checks the price, the stock and the free times, and answers in Bangla or English in seconds." },
      app: {
        shop: { t: "Order is made", d: "Order #6BB-VHQ6: Marigold Yellow Panjabi, size 40, ৳2,260 cash on delivery. Stock goes down by one on its own, and nobody typed a thing." },
        svc: { t: "Booking is made", d: "Bridal trial, Friday 4 PM, confirmed. It is on the calendar and on Rina's day list, and the client's deal moves to Trial / booking by itself." },
      },
      out: {
        shop: { t: "Parcel goes out", d: "The receipt and tracking link are already in the chat. You book the courier from the order page in one tap." },
        svc: { t: "Client is reminded", d: "An SMS or email the day before, so she comes. Your artist gets her list in the morning." },
      },
    },
  },

  // The real app (components/home/AppScreens.jsx): screenshots of the merchant
  // app with two example stores, Saril (clothing) and Glow Studio (parlour).
  app: {
    kicker: "THE REAL APP",
    h2: "This is what you get. Not a mock-up.",
    sub: "Real screens from Dakio, with two example stores: Saril, a clothing shop, and Glow Studio, a beauty parlour.",
    screens: [
      { key: "shop-orders", show: "shop", tab: "Orders", url: "app.dakio.io/orders", alt: "Dakio Orders page for Saril: order counts by status and a list of orders with photos, customers, totals and couriers", cap: "Every order in one list, from chats, comments, your website and the counter, with its status and courier." },
      { key: "shop-products", show: "shop", tab: "Products and stock", url: "app.dakio.io/products", alt: "Dakio Products page for Saril: products with photos, category, purchase and selling price, and stock", cap: "Your catalogue with photos, purchase and selling price, and the stock you have." },
      { key: "shop-inbox", show: "shop", tab: "Inbox", url: "app.dakio.io/front-office", alt: "Dakio Front Office inbox: chats from Messenger and Instagram, and Nova taking an order for a Marigold Yellow Panjabi", cap: "Messenger, Instagram and WhatsApp in one inbox. Here Nova takes the Marigold Yellow Panjabi order." },
      { key: "svc-calendar", show: "svc", tab: "Calendar", url: "app.dakio.io/bookings", alt: "Dakio Bookings calendar for Glow Studio: a week of bookings with the client, service and artist", cap: "The week at a glance: who comes, when, for what and with which artist. The sparkle marks a booking Nova made." },
      { key: "svc-client", show: "svc", tab: "Client page", url: "app.dakio.io/customers", alt: "Dakio client page for a bride: wedding date, area, budget, next booking, open deal and balance due", cap: "One page per client: her wedding date and budget, the next booking, the deal and what she still owes." },
      { key: "svc-pipeline", show: "svc", tab: "Pipeline", url: "app.dakio.io/pipeline", alt: "Dakio Pipeline board for Glow Studio: enquiries by stage with value and who handles each", cap: "Every enquiry from the first message to won, with its value and who is on it." },
    ],
  },

  contrast: {
    kicker: "WHY DAKIO",
    h2: "Other tools answer messages. Nova runs the business behind them.",
    cols: ["A chatbot", "Dakio with Nova"],
    rows: [
      { t: "Answers messages in Bangla", bot: true },
      { t: "Takes the order with stock and price checked", show: "shop-only" },
      { t: "Courier, cash on delivery and bKash in the same place", show: "shop-only" },
      { t: "Inventory, purchases and POS in the same app", show: "shop-only" },
      { t: "Books only the times you are really free", show: "svc-only" },
      { t: "Calendar, staff and reminders in the same place", show: "svc-only" },
      { t: "Quotes and invoices your client accepts online", show: "svc-only" },
      { t: "Takes orders and bookings, with stock and free times checked", show: "both-only" },
      { t: "Courier, calendar and reminders in the same place", show: "both-only" },
      { t: "Inventory, POS and invoices in the same app", show: "both-only" },
      { t: "Every customer's full history on one page" },
      { t: "Your own website, ready on day one" },
      { t: "Follows up and brings customers back" },
      { t: "Reports to you every morning" },
    ],
    under: "One app, one bill. No more stitching five tools together.",
  },

  parts: {
    kicker: "WHERE NOVA WORKS",
    h2: "Nova works in every part, not only the inbox.",
    cards: {
      inbox: { t: "Inbox", d: "Messenger, Instagram, WhatsApp and website chat in one list. Nova answers, understands voice messages and screenshots, and leaves the hard ones for you." },
      customers: { t: "Customers", d: "Every chat, order, booking and payment on one page per customer. Nova saves what they tell her and reminds you who to call back." },
      orders: { t: "Orders and delivery", d: "Orders from chat and from your website in one list, with Steadfast, Pathao and RedX built in. Nova keeps every buyer updated." },
      bookings: { t: "Bookings", d: "A calendar for you and your team, with no double booking. Nova offers free times, books and sends reminders." },
      marketing: { t: "Marketing", d: "Offers by SMS, email and chat to the customers you pick. Nova drafts posts from your product photos for you to approve." },
      money: { t: "Money", d: "Payments, invoices, expenses and courier cash in one ledger. Nova tells you every morning what came in." },
      website: { t: "Website", d: "A designed shop or booking site from day one, on your own domain, with Nova in the chat bubble." },
    },
    link: "See the website designs",
  },

  flow: {
    kicker: "AFTER THE CHAT",
    h2: { shop: "From the first message to the doorstep.", svc: "From the first message to the appointment.", both: "From the first message to the doorstep or the appointment." },
    shop: [
      "The order is written down. Price, size and stock are checked, with the customer's phone and address.",
      "A receipt arrives in the chat, with a tracking link.",
      "You book the courier from the order page. Cash on delivery or bKash.",
      "Shipped, on the way, delivered: Nova tells the customer in the same chat.",
      "After delivery, Nova asks for a review. Customers who went quiet get a follow-up.",
    ],
    svc: [
      "The booking lands on your calendar: the time, the service and who does it.",
      "The client gets every detail in the chat where they asked.",
      "A reminder goes out the day before by SMS or email, so fewer people forget to come.",
      "Send a quote or an invoice. The client accepts online and you record what they paid.",
      "The client stays on one page with their whole history, ready for your next offer.",
    ],
    label: { shop: "For shops", svc: "For services" },
    bottom: "Made for Bangladesh: taka, bKash, Nagad, cash on delivery, Bangla and English, Dhaka time.",
  },

  // The live chat in "After the chat" (components/home/ChatDemo.jsx). The
  // English page shows Banglish because that is how customers write. Each
  // Nova move is a built feature: product from a screenshot, product card,
  // delivery fee and time, chat order with receipt; free slots as tap
  // chips, booking with a reminder SMS.
  chat: {
    typing: "Nova is typing",
    input: "Message",
    caption: "Example store. Nova's side is how she answers today.",
    head: { shop: { name: "Saril", channel: "Messenger" }, svc: { name: "Glow Studio", channel: "Instagram" } },
    shop: [
      { from: "them", shot: "Saril · Marigold Yellow Panjabi", img: "/demo/saril/marigold-yellow-panjabi.jpg", t: "Eta ase?" },
      { from: "nova", t: "Ji, ase! Eta amader Marigold Yellow Panjabi.", product: { n: "Marigold Yellow Panjabi", p: "৳2,190", note: "38 to 46 in stock", img: "/demo/saril/marigold-yellow-panjabi.jpg" } },
      { from: "them", t: "40 size. Mirpur e delivery koto?" },
      { from: "nova", t: "Mirpur e delivery ৳70, 2 dine pouchabe. Total ৳2,260. Order kore dibo?" },
      { from: "them", t: "Ha den. Mirpur 10, 01711-xxxxxx" },
      { from: "nova", t: "Order confirmed! Receipt pathalam. Parcel pathale janabo.", card: { t: "Order #6BB-VHQ6 · ৳2,260", d: "Cash on delivery · now in your Orders" } },
    ],
    svc: [
      { from: "them", t: "Friday bridal trial kora jabe?" },
      { from: "nova", t: "Ji! Friday bikel 4ta ar 6ta khali ase. Trial ৳1,500, ek ghonta lage.", chips: ["4:00 PM", "6:00 PM"] },
      { from: "them", tap: true, t: "4:00 PM" },
      { from: "nova", t: "Apnar nam ar phone number ta diben?" },
      { from: "them", t: "Nusrat, 01812-xxxxxx" },
      { from: "nova", t: "Booked! Friday 4 PM, bridal trial. Ager din SMS e mone koriye dibo.", card: { t: "Booking · Friday 4:00 PM", d: "Bridal trial · reminder SMS on Thursday" } },
    ],
  },

  setup: {
    kicker: "SET UP",
    h2: "Your manager starts work in 5 minutes.",
    steps: [
      { t: "Connect your page", d: "Facebook, Instagram, WhatsApp, or the chat on your Dakio website. Your old chats stay where they are." },
      {
        t: { shop: "Add your products and prices", svc: "Add your services and hours" },
        d: { shop: "A photo, a price and the sizes you have. Nova quotes only what is in your shop.", svc: "What you offer, the price, how long it takes and when you are open. Nova offers only the times you are free." },
      },
      { t: "Turn Nova on", d: "One switch. She starts right away, and one tap turns her off." },
    ],
  },

  charge: {
    kicker: "YOU STAY IN CHARGE",
    h2: "Nova manages. You decide.",
    points: [
      { t: "One switch", d: "Turn Nova on or off for messages and for comments, any time." },
      { t: "Hard ones come to you", d: "A complaint, a refund, an angry customer. Nova leaves those chats for you and tells you right away." },
      { t: "Everything in front of you", d: "Read every chat, step in whenever you like, and teach her with your own best replies." },
    ],
    note: {
      shop: "Prices, stock and delivery charges come only from your shop. Nova does not make them up.",
      svc: "Prices and free times come only from your services and your calendar. Nova does not make them up.",
      both: "Prices, stock, delivery charges and free times come only from your shop and your calendar. Nova does not make them up.",
    },
  },

  pricing: {
    kicker: "PRICING",
    h2: "Less than one manager's salary.",
    sub: {
      shop: "A shop manager costs ৳15,000 or more a month and works ten hours a day. Nova works all day and all night, and every plan includes her.",
      svc: "A receptionist costs ৳12,000 or more a month and goes home in the evening. Nova answers and books all day and all night, and every plan includes her.",
      both: "A manager costs ৳15,000 or more a month and works ten hours a day. Nova works all day and all night, and every plan includes her.",
    },
    svcLine: "For services, both plans include bookings, the calendar, reminders, quotes and invoices and a booking website.",
    busy: "Busy month? Add more from the app any time.",
    popular: "POPULAR",
    // FALLBACK ONLY. The cards come from the live catalogue via
    // lib/plans.js#getHomePricing and render from here only if the API is down.
    plans: [
      { n: "Growth", audience: "For a business that sells every day", pr: "৳1,490", sub: "/month", yr: "or ৳1,242/month billed annually", level: "NOVA MANAGER", cta: "Choose Growth", dark: false, pop: true,
        feats: ["Unlimited products, no daily order cap", "Nova answers, sells and follows up", "Website, couriers, bKash and cash on delivery", "Customer pages, follow-ups and reviews"] },
      { n: "Business", audience: "For a busy business with a team", pr: "৳3,990", sub: "/month", yr: "or ৳3,325/month billed annually", level: "NOVA MANAGER + VOICE", cta: "Choose Business", dark: true, pop: false,
        feats: ["Everything in Growth", "60 minutes a month to talk to Nova by voice", "Logins for your staff", "Video ads from your product photos"] },
    ],
    footLink: "See full pricing",
  },

  faq: {
    kicker: "QUESTIONS",
    h2: "Questions people ask",
    items: [
      { q: "What is Nova?", a: "Nova is the AI manager inside Dakio. She works in your inbox, orders, bookings and customer pages, and reports to you every morning." },
      { q: "How is this different from a chatbot?", a: "A chatbot stops at the reply. Nova takes the order or the booking, keeps the customer updated, follows up, and does it inside the app where your website, couriers and accounts already live." },
      { q: "Can I replace my stock sheet and my POS?", a: "Yes. Products with sizes and colours, stock in every warehouse, purchases from your suppliers and a POS for the counter are all in Dakio. A sale at the counter and an order from chat take stock from the same place." },
      { q: "Can my staff use it?", a: "Yes. Each person gets a login with their own role: sales staff see their own customers, and attendance, leave and advances are in Employees. On a service business, each person gets their day's bookings every morning. Staff logins come with the Business plan." },
      { q: "Does Nova understand Bangla?", a: "Yes: Bangla, English and Banglish, typed or as a voice message. She also recognises a product from a screenshot or a photo of your post." },
      { q: "What if she says something wrong?", a: "She quotes prices, stock and delivery only from your shop. Anything risky, she leaves for you. You can read every chat and reply yourself at any time." },
      { q: "Will my Facebook page work?", a: "Yes. Connect it in a few clicks. Your page, posts and old chats stay as they are, and Nova answers comments under your posts too." },
      { q: "I already sell on Facebook and use a courier. What changes?", a: "Your page stays as it is. Connect it, add your products, and enter your Steadfast, Pathao or RedX keys once. Orders from chats, comments and your new website land in one list, and you book the courier from there." },
      { q: "Do I pay per message?", a: "No. Every plan includes a monthly allowance for Nova, enough for well over a thousand customer chats. If a month is busier, add more from the app." },
      { q: "I run a parlour, a coaching centre or a chamber. Is this for me?", a: "Yes. Pick Services when you sign up. Nova books appointments, classes and visits, and you get a calendar, reminders, invoices and a booking website." },
      { q: "Can I stop any time?", a: "Yes. One switch turns Nova off, and your business keeps running in Dakio without her." },
    ],
  },

  cta: {
    h2: "Give your business a manager tonight.",
    primary: "Get started",
    under: "Live in 5 minutes. Turn Nova off any time.",
  },

  shops: {
    meta: {
      title: "Dakio for online shops | One app for products, orders, couriers and customers, with an AI manager built in",
      description: "Nova answers your page in Bangla, day and night, takes the order and keeps the buyer updated. Website, couriers, bKash, cash on delivery and customer list in the same app.",
    },
    badge: "FOR ONLINE SHOPS",
    h1: "Run your online shop from one app.",
    accent: "With an AI manager built in.",
    sub: "Products and stock, your website, orders, couriers, bKash and cash on delivery, and every customer, in one app. Nova answers your page in Bangla day and night, takes the order and keeps the buyer updated.",
    extraKicker: "MADE FOR SHOPS",
    extraH2: "What a shop needs, already here.",
    extra: [
      { t: "Comments too", d: "Someone writes \"price?\" under your post, and Nova sends the price to their inbox." },
      { t: "Understands what they send", d: "Screenshots of your post, voice messages, a reply to an older message." },
      { t: "No stock? Sell from suppliers", d: "Pick products from verified suppliers, and Dakio packs and ships every order." },
      { t: "Posts and video ads", d: "Turn a product photo into a post or a short video ad, and schedule it." },
    ],
    closing: "Tonight's orders are already waiting in your inbox. Let Nova take them.",
  },

  services: {
    meta: {
      title: "Dakio for services | One app for bookings, clients and invoices, with an AI manager built in",
      description: "For parlours, salons, coaching centres, chambers and photographers. Nova answers, offers your free times, books the client and reminds them. Calendar, client pages, invoices and a booking website in one app.",
    },
    badge: "FOR SERVICE BUSINESSES",
    h1: "Run your bookings, clients and team from one app.",
    accent: "With an AI manager built in.",
    sub: "For parlours, salons, coaching centres, chambers, photographers and every business that sells its time. The calendar, client pages, quotes and invoices and a booking website in one app. Nova answers, offers your free times, books the client and reminds them.",
    kindsKicker: "READY SETUPS",
    kindsH2: "A ready setup for your kind of business.",
    kinds: [
      { n: "Beauty parlour", d: "Bridal trials, party makeup, facials" },
      { n: "Men's salon", d: "Haircuts and grooming by the slot" },
      { n: "Coaching centre", d: "Admission enquiries and trial classes" },
      { n: "Home tutor", d: "Trial lessons and monthly fees" },
      { n: "Doctor's chamber", d: "Serials by day and time" },
      { n: "Photographer", d: "Shoot dates and packages" },
      { n: "Event hall", d: "Date enquiries and visits to see the hall" },
      { n: "Home repair", d: "Home visits and quotes" },
      { n: "Interior and events", d: "Consultations and quotes" },
    ],
    teamH2: "The right person for every booking.",
    team: "Give each service to the people on your team who do it. Nova books only when one of them is free, and each one gets their day's list in the morning.",
    gcal: "Already on Google Calendar? Connect it and both stay in step.",
    closing: "Your next booking could come in tonight. Let Nova take it.",
  },
};

export default home;
