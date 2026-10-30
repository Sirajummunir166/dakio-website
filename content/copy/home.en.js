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
    title: "Dakio | One app to run your whole business, with an AI CEO built in",
    description:
      "Website, products and stock, orders, couriers, bookings, clients and money in one app, made in Bangladesh. Nova, your AI CEO, works in every part. Bangla first, bKash and cash on delivery built in.",
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
    accent: "With an AI CEO built in.",
    ask: "What do you sell?",
    opts: { shop: "Products", svc: "Services", both: "Both" },
    sub: {
      shop: "Website, stock, orders, couriers and money in one app. Nova answers customers and takes the orders.",
      svc: "Website, bookings, clients and invoices in one app. Nova answers, books and reminds.",
      both: "Orders, bookings, stock, clients and money in one app. Nova runs it with you.",
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
    nova: "Nova works in every part",
    shop: [
      { t: "Products", items: ["Sizes, colours, photos", "Edit many at once"] },
      { t: "Stock", items: ["Every warehouse", "Low stock flagged"] },
      { t: "Sell", items: ["Website, chats, comments", "POS at the counter"] },
      { t: "Orders", items: ["One list for all", "Fake order check"] },
      { t: "Deliver", items: ["Steadfast, Pathao, RedX", "Tracking in the chat"] },
      { t: "Money and team", items: ["Payments and expenses", "Staff and leave"] },
    ],
    svc: [
      { t: "Services", items: ["Prices and durations", "Who does what"] },
      { t: "Get found", items: ["Your booking website", "Chats and comments"] },
      { t: "Book", items: ["Only free times", "Google Calendar in step"] },
      { t: "Remind", items: ["SMS or email", "Each person's day list"] },
      { t: "Clients", items: ["One page per client", "Enquiry to won"] },
      { t: "Money", items: ["Quotes and invoices", "Part or full payments"] },
    ],
    note: "Every part above is in the app today.",
  },


  // Nova's machine (components/home/NovaMachine.jsx): a 3D line from a chat
  // to a delivered order or a kept appointment. Every station is a built
  // feature; the courier is booked by the owner from the order page.
  machine: {
    sub: "The line Nova runs, day and night. Tap a station.",
    hint: { drag: "Drag to look around · Tap a station", touch: "Tap a station" },
    pause: "Pause",
    play: "Play",
    back: "Back to the whole line",
    stations: {
      in: { t: "Chats come in", d: "Messenger, Instagram, WhatsApp and website chat, in one inbox." },
      nova: { t: "Nova decides", d: "She checks price, stock and free times, and answers in seconds." },
      app: {
        shop: { t: "Order is made", d: "Order #6BB-VHQ6, ৳2,420 cash on delivery. Stock goes down by itself." },
        svc: { t: "Booking is made", d: "Bridal trial, Friday 4 PM. On the calendar and on Rina's day list." },
      },
      out: {
        shop: { t: "Parcel goes out", d: "Receipt and tracking are in the chat. You book the courier in one tap." },
        svc: { t: "Client is reminded", d: "An SMS the day before. Your artist gets her list in the morning." },
      },
    },
  },

  // The real app (components/home/AppScreens.jsx): screenshots of the merchant
  // app with two example stores, Saril (clothing) and Glow Studio (parlour).
  app: {
    kicker: "THE REAL APP",
    h2: "This is what you get. Not a mock-up.",
    sub: "Real screens, two example stores.",
    screens: [
      { key: "shop-orders", show: "shop", tab: "Orders", url: "app.dakio.io/orders", alt: "Dakio Orders page for Saril: order counts by status and a list of orders with photos, customers, totals and couriers", cap: "Every order in one list, with its courier." },
      { key: "shop-products", show: "shop", tab: "Products and stock", url: "app.dakio.io/products", alt: "Dakio Products page for Saril: products with photos, category, purchase and selling price, and stock", cap: "Photos, prices and stock." },
      { key: "shop-inbox", show: "shop", tab: "Inbox", url: "app.dakio.io/front-office", alt: "Dakio Front Office inbox: chats from Messenger and Instagram, and Nova taking an order for a Peacock Teal Panjabi", cap: "Every chat in one inbox. Here Nova takes an order." },
      { key: "svc-calendar", show: "svc", tab: "Calendar", url: "app.dakio.io/bookings", alt: "Dakio Bookings calendar for Glow Studio: a week of bookings with the client, service and artist", cap: "The week at a glance, with Nova's bookings marked." },
      { key: "svc-client", show: "svc", tab: "Client page", url: "app.dakio.io/customers", alt: "Dakio client page for a bride: wedding date, area, budget, next booking, open deal and balance due", cap: "One page per client: dates, deals and dues." },
      { key: "svc-pipeline", show: "svc", tab: "Pipeline", url: "app.dakio.io/pipeline", alt: "Dakio Pipeline board for Glow Studio: enquiries by stage with value and who handles each", cap: "Every enquiry, stage by stage." },
    ],
  },

  contrast: {
    kicker: "WHY DAKIO",
    h2: "Other tools answer messages. Nova operates the business.",
    sub: "A chatbot stops at the reply. Nova keeps working.",
    cols: ["A chatbot", "Dakio with Nova"],
    rows: [
      { head: "In the inbox" },
      { t: "Answers in Bangla, voice notes too", bot: true },
      { t: "Takes the order, stock checked", show: "shop-only" },
      { t: "Books only free times", show: "svc-only" },
      { t: "Takes orders and bookings", show: "both-only" },
      { head: "After the reply, only Nova", dark: true },
      { t: "Updates every buyer: shipped, delivered", show: "shop-only" },
      { t: "Reminds clients before the visit", show: "svc-only" },
      { t: "Updates buyers, reminds clients", show: "both-only" },
      { t: "Follows up quiet chats, asks for reviews", show: "shop-only" },
      { t: "Follows up quiet enquiries", show: "svc-only" },
      { t: "Follows up quiet chats", show: "both-only" },
      { t: "Answers comments, sends the price to the inbox" },
      { t: "Drafts posts for you to approve", show: "shop" },
      { t: "Briefs you every morning" },
    ],
    under: "Refunds and angry customers always come to you.",
  },

  parts: {
    kicker: "WHERE NOVA WORKS",
    h2: "Nova works in every part, not only the inbox.",
    cards: {
      inbox: { t: "Inbox", d: "Every chat in one list. The hard ones come to you." },
      customers: { t: "Customers", d: "One page per customer. Nova remembers what they said." },
      orders: { t: "Orders and delivery", d: "One list, with Steadfast, Pathao and RedX built in." },
      bookings: { t: "Bookings", d: "Your team's calendar. Never double booked." },
      marketing: { t: "Marketing", d: "Offers by SMS and chat. Posts drafted for you." },
      money: { t: "Money", d: "Payments, expenses and courier cash in one place." },
      website: { t: "Website", d: "Your own designed site, with Nova in the chat." },
    },
    link: "See the website designs",
    // A small preview of Nova at work in each part (HomeSections.jsx PartPreview).
    previews: {
      inbox: { them: "Navy panjabi ta 42 e ase?", nova: "Ji, ase! ৳2,890, 2 dine pouchabe.", voice: "Voice note · heard: delivery koto?" },
      customers: { name: "Nusrat Jahan", facts: ["Wedding 12 Dec", "Uttara", "Budget ৳35,000"], saved: "Saved by Nova", task: "Call back tomorrow, 11:00" },
      orders: { id: "#6BB-VHQ6", status: "Shipped · Steadfast", msg: "Nova: Your parcel is on the way. Tracking link sent." },
      bookings: { day: "Friday", slots: [["2:00", "Threading · Rupa"], ["4:00", "Bridal trial · Nusrat"], ["6:00", "Party makeup · Sadia"]], note: "Reminder goes out Thursday" },
      marketing: { tag: "Draft post", text: "New in: Magenta Satin Silk Saree, hand-finished border. ৳3,450.", approve: "Approve", edit: "Edit" },
      money: { title: "Weekly money note", lines: [["Came in", "৳38,500"], ["Orders", "21"], ["Couriers holding", "৳12,400"]] },
      website: { store: "Saril", nav: ["New in", "Panjabi", "Saree"], bubble: "Ask Nova" },
    },
  },

  flow: {
    kicker: "AFTER THE CHAT",
    h2: { shop: "From the first message to the doorstep.", svc: "From the first message to the appointment.", both: "From the first message to the doorstep or the appointment." },
    shop: [
      "The order is written, price and stock checked.",
      "Receipt and tracking link land in the chat.",
      "You book the courier in one tap.",
      "Shipped, delivered: Nova tells the buyer.",
      "Then she asks for a review.",
    ],
    svc: [
      "The booking lands on your calendar.",
      "The client gets the details in the chat.",
      "A reminder goes out the day before.",
      "Quote or invoice, accepted online.",
      "Their whole history on one page.",
    ],
    label: { shop: "For shops", svc: "For services" },
    bottom: "Made for Bangladesh: taka, bKash, cash on delivery, Bangla.",
  },

  // The live chat in "After the chat" (components/home/ChatDemo.jsx). The
  // English page shows Banglish because that is how customers write. Each
  // Nova move is a built feature: product from a screenshot, product card,
  // delivery fee and time, chat order with receipt; free slots as tap
  // chips, booking with a reminder SMS.
  chat: {
    typing: "Nova is typing",
    input: "Message",
    soundOn: "Turn the chat sounds on",
    soundOff: "Turn the chat sounds off",
    soundAsk: "Tap for sound",
    caption: "Example store. Nova's side is how she answers today.",
    // What is happening, one line per message (ChatDemo.jsx, right side).
    beats: {
      shop: [
        "A customer sends a screenshot of your post.",
        "Nova finds the product and shows the sizes in stock.",
        "They pick a size and ask about delivery.",
        "Nova gives the fee, the time and the total.",
        "They say yes and send the address.",
        "Order made. It is in your Orders, receipt sent.",
      ],
      svc: [
        "A client asks for a bridal trial on Friday.",
        "Nova offers only the times you are free.",
        "The client taps a time.",
        "Nova asks for a name and phone.",
        "The client sends them.",
        "Booked, on your calendar, reminder set.",
      ],
    },
    after: "Then Dakio carries on, without you:",
    head: { shop: { name: "Saril", channel: "Messenger" }, svc: { name: "Glow Studio", channel: "Instagram" } },
    // Who is talking, and what the special bubbles are (ChatDemo.jsx).
    // Each chat's title card when both play (ChatDemo.jsx).
    intro: {
      shop: { tag: "For shops", name: "Saril, a clothing shop", sub: "Sells on Facebook and Instagram", line: "First, a shop: a customer messages Saril late at night." },
      svc: { tag: "For services", name: "Glow Studio, a beauty parlour", sub: "Takes bookings on Instagram", line: "Now a service: a client asks Glow Studio for a bridal trial." },
    },
    who: { them: "Customer", nova: "Nova" },
    customer: { shop: "Tanvir", svc: "Nusrat" },
    tags: { shot: "Screenshot of your post", product: "Product card from your shop", chips: "Free times as buttons", tap: "Tapped a time", order: "Order created", booking: "Booking made" },
    shop: [
      { from: "them", shot: "Saril · Peacock Teal Panjabi", img: "/demo/saril/peacock-teal-panjabi.jpg", t: "Eta ase?" },
      { from: "nova", t: "Ji, ase! Eta amader Peacock Teal Panjabi.", product: { n: "Peacock Teal Panjabi", p: "৳2,350", note: "38 to 46 in stock", img: "/demo/saril/peacock-teal-panjabi.jpg" } },
      { from: "them", t: "40 size. Mirpur e delivery koto?" },
      { from: "nova", t: "Mirpur e delivery ৳70, 2 dine pouchabe. Total ৳2,420. Order kore dibo?" },
      { from: "them", t: "Ha den. Mirpur 10, 01711-xxxxxx" },
      { from: "nova", t: "Order confirmed! Receipt pathalam. Parcel pathale janabo.", card: { t: "Order #6BB-VHQ6 · ৳2,420", d: "Cash on delivery · now in your Orders" } },
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
    h2: "Nova starts work in 5 minutes.",
    steps: [
      { t: "Connect your page", d: "Facebook, Instagram, WhatsApp or your website chat." },
      {
        t: { shop: "Add your products and prices", svc: "Add your services and hours" },
        d: { shop: "A photo, a price and the sizes you have.", svc: "Price, duration and your opening hours." },
      },
      { t: "Turn Nova on", d: "One switch on. One tap off." },
    ],
    // Small previews of each step (HomeSections.jsx SetupPreview).
    previews: {
      channels: [["Messenger", true], ["Instagram", true], ["WhatsApp", false], ["Website chat", true]],
      connected: "Connected",
      connect: "Connect",
      product: { n: "Mehfil Velvet Three-Piece", p: "৳7,450", img: "/demo/saril/mehfil-velvet-three-piece.jpg", sizes: ["S", "M", "L", "XL", "XXL"] },
      service: { n: "Bridal makeup", p: "from ৳15,000", dur: "3 hours", hours: "Sat to Thu · 10 AM to 8 PM" },
      on: "Answer customer messages",
      live: "Nova is answering · 3 chats today",
    },
  },

  charge: {
    kicker: "YOU STAY IN CHARGE",
    h2: "Nova manages. You decide.",
    points: [
      { t: "One switch", d: "Turn Nova on or off, any time." },
      { t: "Hard ones come to you", d: "Refunds and angry customers come straight to you." },
      { t: "Everything in front of you", d: "Read every chat and step in any time." },
    ],
    note: {
      shop: "Prices, stock and delivery come only from your shop. Nova never makes them up.",
      svc: "Prices and free times come only from your calendar. Nova never makes them up.",
      both: "Prices, stock and free times come only from your shop. Nova never makes them up.",
    },
  },

  pricing: {
    kicker: "PRICING",
    h2: "Less than one manager's salary.",
    sub: {
      shop: "A shop manager costs ৳15,000+ a month. Nova works day and night, in every plan.",
      svc: "A receptionist costs ৳12,000+ a month. Nova books day and night, in every plan.",
      both: "A manager costs ৳15,000+ a month. Nova works day and night, in every plan.",
    },
    svcLine: "For services, both plans include bookings, reminders, invoices and a booking site.",
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
      { q: "What is Nova?", a: "Nova is the AI CEO inside Dakio. She runs the day to day, day and night: your inbox, orders, bookings and customer pages, and she briefs you every morning. You make the big calls." },
      { q: "How is this different from a chatbot?", a: "A chatbot stops at the reply. Nova takes the order or the booking, keeps the customer updated, follows up, and does it inside the app where your website, couriers and accounts already live." },
      { not: "svc", q: "Can I replace my stock sheet and my POS?", a: "Yes. Products with sizes and colours, stock in every warehouse, purchases from your suppliers and a POS for the counter are all in Dakio. A sale at the counter and an order from chat take stock from the same place." },
      { q: "Can my staff use it?", a: "Yes. Each person gets a login with their own role: sales staff see their own customers, and attendance, leave and advances are in Employees. On a service business, each person gets their day's bookings every morning. Staff logins come with the Business plan." },
      { q: "Does Nova understand Bangla?", a: "Yes: Bangla, English and Banglish, typed or as a voice message. She also recognises a product from a screenshot or a photo of your post." },
      { q: "What if she says something wrong?", a: "She quotes prices, stock and delivery only from your shop. Anything risky, she leaves for you. You can read every chat and reply yourself at any time." },
      { q: "Will my Facebook page work?", a: "Yes. Connect it in a few clicks. Your page, posts and old chats stay as they are, and Nova answers comments under your posts too." },
      { not: "svc", q: "I already sell on Facebook and use a courier. What changes?", a: "Your page stays as it is. Connect it, add your products, and enter your Steadfast, Pathao or RedX keys once. Orders from chats, comments and your new website land in one list, and you book the courier from there." },
      { q: "Do I pay per message?", a: "No. Every plan includes a monthly allowance for Nova, enough for well over a thousand customer chats. If a month is busier, add more from the app." },
      { not: "shop", q: "I run a parlour, a coaching centre or a chamber. Is this for me?", a: "Yes. Pick Services when you sign up. Nova books appointments, classes and visits, and you get a calendar, reminders, invoices and a booking website." },
      { q: "Can I stop any time?", a: "Yes. One switch turns Nova off, and your business keeps running in Dakio without her." },
    ],
  },

  cta: {
    h2: "Give your business an AI CEO tonight.",
    primary: "Get started",
    under: "Live in 5 minutes. Turn Nova off any time.",
  },

  shops: {
    meta: {
      title: "Dakio for online shops | One app for products, orders, couriers and customers, with an AI CEO built in",
      description: "Nova answers your page in Bangla, day and night, takes the order and keeps the buyer updated. Website, couriers, bKash, cash on delivery and customer list in the same app.",
    },
    badge: "FOR ONLINE SHOPS",
    h1: "Run your online shop from one app.",
    accent: "With an AI CEO built in.",
    sub: "Products and stock, your website, orders, couriers, bKash and cash on delivery, and every customer, in one app. Nova answers your page in Bangla day and night, takes the order and keeps the buyer updated.",
    closing: "Tonight's orders are already waiting in your inbox. Let Nova take them.",
  },

  services: {
    meta: {
      title: "Dakio for services | One app for bookings, clients and invoices, with an AI CEO built in",
      description: "For parlours, salons, coaching centres, chambers and photographers. Nova answers, offers your free times, books the client and reminds them. Calendar, client pages, invoices and a booking website in one app.",
    },
    badge: "FOR SERVICE BUSINESSES",
    h1: "Run your bookings, clients and team from one app.",
    accent: "With an AI CEO built in.",
    sub: "For parlours, salons, coaching centres, chambers, photographers and every business that sells its time. The calendar, client pages, quotes and invoices and a booking website in one app. Nova answers, offers your free times, books the client and reminds them.",
    closing: "Your next booking could come in tonight. Let Nova take it.",
  },
};

export default home;
