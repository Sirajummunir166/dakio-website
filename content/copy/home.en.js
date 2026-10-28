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
    title: "Dakio | An AI manager for your whole business, made in Bangladesh",
    description:
      "Website, orders, customers, couriers, bookings and payments in one app, with Nova, your AI manager, working in every part. Bangla first, bKash and cash on delivery built in.",
  },

  hero: {
    badge: "FOR SHOPS AND SERVICE BUSINESSES IN BANGLADESH",
    h1: "An AI manager for your whole business.",
    ask: "What do you sell?",
    opts: { shop: "Products", svc: "Services", both: "Both" },
    sub: {
      shop: "Website, orders, customers, couriers and payments in one app, with Nova working in every part. She answers customers, takes orders, keeps buyers updated and tells you what needs you.",
      svc: "Website, bookings, calendar, clients and invoices in one app, with Nova working in every part. She answers, books, reminds clients and tells you what needs you.",
      both: "Products and services, orders and bookings, all in one app, with Nova working in every part of it.",
    },
    cta: "Get started",
    under: "Live in 5 minutes · No developer needed",
    second: "See Nova at work",
  },

  // Nova's feed in the hero (components/home/NovaFeed.jsx): one line at a
  // time, in a shuffled order, at an uneven pace. Every line is a real duty or automation: night_shift, morning_brief,
  // weekly_stock_check, comment_desk, weekly_shipping_summary, content_draft,
  // order updates, chat follow-ups, review requests, weekly_finance_summary,
  // pipeline_check, team agendas, booking reminders, the services desk.
  day: {
    title: "Nova on duty",
    live: "LIVE",
    status: "Watching Messenger, Instagram, WhatsApp and website chat",
    store: { shop: "Saril · fashion", svc: "Glow Studio · beauty parlour" },
    now: "Just now",
    shop: [
      { tag: "Inbox", t: "Answered Taspia on Messenger and took her order. ৳2,370, cash on delivery." },
      { tag: "Report", t: "Sent you the morning report: 23 orders, 84 chats answered, 3 that need you." },
      { tag: "Comments", t: "Answered 6 comments under today's post and sent the prices to their inboxes." },
      { tag: "Customers", t: "Followed up with 5 customers who stopped replying. 2 ordered." },
      { tag: "Marketing", t: "Drafted a Facebook post for the new Jamdani stole. Waiting for your OK." },
      { tag: "Stock", t: "Stock check: the Muslin saree in M is down to 2. Flagged it for restock." },
      { tag: "Courier", t: "Courier check: 2 parcels stuck with Pathao for 3 days. Flagged them for you." },
      { tag: "Orders", t: "Told Taspia her parcel is on the way." },
      { tag: "Reviews", t: "Asked 4 customers whose parcels arrived for a review." },
      { tag: "Money", t: "Money note: ৳46,200 came in this week, ৳3,100 more than last week." },
      { tag: "Inbox", t: "Answered 3 Instagram messages and took 1 order. ৳1,850." },
      { tag: "Night shift", t: "Reviewed today's sales and wrote tomorrow's list for you." },
    ],
    svc: [
      { tag: "Bookings", t: "Booked a bridal trial for Friday at 4 PM on Instagram." },
      { tag: "Report", t: "Sent you the morning report: 9 bookings today, 2 new enquiries, 1 that needs you." },
      { tag: "Team", t: "Sent each artist their bookings for the day." },
      { tag: "Inbox", t: "Answered 4 Instagram messages and booked 2 facials." },
      { tag: "Reminders", t: "Reminded tomorrow's 7 clients by SMS." },
      { tag: "Pipeline", t: "Pipeline check: 3 bridal enquiries waiting over 2 days. Listed them for you." },
      { tag: "Marketing", t: "Drafted a post for the Eid bridal package. Waiting for your OK." },
      { tag: "Clients", t: "Saved a new bride's wedding date and budget to her client page." },
      { tag: "Follow-up", t: "Reminded you to call Nadia back about her quote." },
      { tag: "Money", t: "Money note: ৳38,500 came in this week from 21 visits." },
      { tag: "Night shift", t: "Reviewed today's bookings and wrote tomorrow's list for you." },
    ],
    caption: "Example store. Every line is work Nova does today.",
  },


  works: { label: "Works with what you already use" },

  contrast: {
    kicker: "WHY DAKIO",
    h2: "Other tools answer messages. Nova runs the business behind them.",
    cols: ["A chatbot", "Dakio with Nova"],
    rows: [
      { t: "Answers messages in Bangla", bot: true },
      { t: "Takes the order with stock and price checked" },
      { t: "Courier, cash on delivery and bKash in the same place" },
      { t: "Every customer's full history on one page" },
      { t: "Bookings, calendar and reminders" },
      { t: "Your own website, ready on day one" },
      { t: "Follows up and brings customers back" },
      { t: "Reports to you every morning" },
    ],
    under: "One app, one bill. No more stitching five tools together.",
  },

  parts: {
    kicker: "ONE APP",
    h2: "Your whole business in one place. Nova works in every part.",
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
    h2: { shop: "From the first message to the doorstep.", svc: "From the first message to the appointment." },
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
    note: "Prices, stock and delivery charges come only from your shop. Nova does not make them up.",
  },

  pricing: {
    kicker: "PRICING",
    h2: "Less than one manager's salary.",
    sub: "A shop manager costs ৳15,000 or more a month and works ten hours a day. Nova works all day and all night, and every plan includes her.",
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
      { q: "Does Nova understand Bangla?", a: "Yes: Bangla, English and Banglish, typed or as a voice message. She also recognises a product from a screenshot or a photo of your post." },
      { q: "What if she says something wrong?", a: "She quotes prices, stock and delivery only from your shop. Anything risky, she leaves for you. You can read every chat and reply yourself at any time." },
      { q: "Will my Facebook page work?", a: "Yes. Connect it in a few clicks. Your page, posts and old chats stay as they are, and Nova answers comments under your posts too." },
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
      title: "Dakio for online shops | An AI manager for your page, orders and customers",
      description: "Nova answers your page in Bangla, day and night, takes the order and keeps the buyer updated. Website, couriers, bKash, cash on delivery and customer list in the same app.",
    },
    badge: "FOR ONLINE SHOPS",
    h1: "An AI manager for your page, your orders and your customers.",
    sub: "Nova answers your page in Bangla, day and night, takes the order and keeps the buyer updated. Your website, couriers, bKash, cash on delivery and customer list are already in the same app.",
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
      title: "Dakio for services | An AI manager for your bookings and clients",
      description: "For parlours, salons, coaching centres, chambers and photographers. Nova answers, offers your free times, books the client and reminds them. Calendar, client pages, invoices and a booking website in one app.",
    },
    badge: "FOR SERVICE BUSINESSES",
    h1: "An AI manager for your bookings, clients and team.",
    sub: "For parlours, salons, coaching centres, chambers, photographers and every business that sells its time. Nova answers, offers your free times, books the client and reminds them. You get the calendar, client pages, invoices and a booking website.",
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
