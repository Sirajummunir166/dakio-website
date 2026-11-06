// Pricing copy — Bangla.
//
// The page's argument is a salary comparison, and salary talk in Bangladesh
// happens in Bangla, so this is the page where the Bangla should feel most at
// home. Prices, plan names and the ৳ figures stay exactly as billed.

import Mark from "../../components/Mark";

const pricing = {
  meta: {
    title: "Dakio প্ল্যান ও দাম: টাকায়, AI CEO-সহ",
    description:
      "সারাজীবন ফ্রি। বার্ষিকে Growth মাসে ৳2,980 থেকে, Business ৳7,980 থেকে। প্রতিটি প্ল্যানেই Nova আছে। কোনো লুকানো ফি নেই।",
  },

  hero: {
    h1: (
      <>
        একজন <Mark bottom={6} height={14}>কর্মীর বেতনের</Mark> চেয়েও কমে পুরো ব্যাক অফিস।
      </>
    ),
    sub: "একজন দোকান সহকারীর বেতন মাসে ৳12,000, কাজের সময় দিনে 10 ঘণ্টা। Nova কাজ করে 24 ঘণ্টা, প্রতিটি প্ল্যানে।",
  },

  plansNote: "সব প্ল্যানেই কুরিয়ার ডেলিভারি প্রতি শিপমেন্ট হিসেবে বিল হয়।",
  demo: "শুধু দেখছেন? Dakio চলতে দেখুন",

  // তুলনার টেবিল (pricing.en.js-এর নোট দেখুন)।
  compare: {
    kindLabel: "যার জন্য দেখবেন",
    kinds: { shop: "দোকান", svc: "সার্ভিস" },
    popular: "বেশিরভাগ স্টোর এটাই নেয়",
    startFree: "ফ্রি শুরু করুন",
    diamondNote: "Business: অটোপাইলট",
    tiers: {
      free: { tag: "শুরু", line: "আজই আপনার স্টোর চালু।" },
      growth: { tag: "আপনি চালান", line: "Nova উত্তর দেয়। সিদ্ধান্ত আপনার।" },
      business: { tag: "অটোপাইলট", line: "Nova নিজেই চালায়।" },
    },
    rows: {
      store: { shop: "আপনার স্টোর", svc: "আপনার বুকিং সাইট" },
      products: { shop: "প্রোডাক্ট", svc: "সার্ভিস" },
      orders: { shop: "মাসে অর্ডার", svc: "মাসে বুকিং" },
      team: { shop: "টিম", svc: "স্টাফের ক্যালেন্ডার" },
      pos: { shop: "দোকানের কাউন্টার (POS)", svc: "কোটেশন ও ইনভয়েস" },
      answers: "Nova উত্তর দেয়",
      acts: "Nova নিজে থেকেই কাজ করে",
      followUps: { shop: "ফলো-আপ ও কার্ট রিকভারি", svc: "চ্যাটেই বুকিং, রিমাইন্ডার" },
      orderShield: { shop: "কনফার্মেশন কল", svc: "না-আসা কাস্টমারকে ফলো-আপ" },
      whatsapp: { shop: "WhatsApp-এ অর্ডারের আপডেট", svc: "WhatsApp-এ বুকিংয়ের আপডেট" },
      brief: "প্রতিদিনের ব্রিফ, কাজসহ",
      marketing: "মার্কেটিং",
      adImages: "অ্যাডের ছবি",
      aiWriting: { shop: "AI দিয়ে প্রোডাক্টের লেখা", svc: "AI দিয়ে সার্ভিসের লেখা" },
      adVideos: "অ্যাড ভিডিও",
      money: "হিসাব",
      talk: "Nova-র সাথে কথা",
      monthly: "প্রতি মাসে পাবেন",
      credits: "Nova ক্রেডিট",
      sms: "SMS",
      voice: "Nova ভয়েস মিনিট",
      storage: "মিডিয়া স্টোরেজ",
      ownDomain: "নিজের ডোমেইন",
      answersOn: "Nova উত্তর দেয়",
      webchat: "ওয়েবসাইট চ্যাট",
      creditsMonth: "মাসে Nova ক্রেডিট",
      topups: "টপ-আপ",
    },
    v: {
      unlimited: "আনলিমিটেড",
      subdomain: "Dakio সাবডোমেইন, সব থিম",
      ownDomain: "নিজের ডোমেইন, Dakio ব্যাজ ছাড়া",
      dropship: "ড্রপশিপ",
      upTo: "সর্বোচ্চ",
      ownerOnly: "শুধু মালিক",
      withHr: "HR-সহ",
      oneChannel: "এক চ্যানেল",
      everyChannel: "সব চ্যানেল",
      everyChannelChat: "সব চ্যানেল + ওয়েবসাইট চ্যাট",
      everyChannelComments: "সব চ্যানেল, ওয়েবসাইট চ্যাট + কমেন্ট",
      threeAMonth: "মাসে 3টি",
      moneyBasic: "এই মাসের লাভ-ক্ষতি",
      moneyFull: "পুরো হিসাব",
      moneyPro: "পুরো হিসাব + প্রতি অর্ডার ও অ্যাডের লাভ",
      topups: "ক্রেডিট, SMS",
      everyChannelPlusComments: "সব চ্যানেল + কমেন্ট",
      topupsVoice: "ক্রেডিট, SMS, ভয়েস মিনিট",
    },
  },

  meter: {
    h2: "Nova-র একটি ক্রেডিট বলতে কী বোঝায়?",
    p: "সম্পন্ন একটি কাজ—token বা API call নয়। Hours Saved রিপোর্টে প্রতিটি ক্রেডিট, কত সময় বাঁচিয়েছে এবং তার মূল্য দেখতে পাবেন।",
    chips: ["কাস্টমারের প্রশ্নের উত্তর", "ছবি থেকে প্রোডাক্ট লিস্টিং", "অ্যাড ক্রিয়েটিভ তৈরি", "অসম্পূর্ণ অর্ডার থেকে বিক্রি ফিরিয়ে আনা", "পুনরায় স্টক অর্ডারের ড্রাফট"],
    voiceChip: "ভয়েস কল",
    draft: {
      h3: "ক্রেডিট শেষ হলেও Nova থেমে যায় না—Draft mode-এ চলে যায়।",
      quote: "“কাস্টমারের 12টি উত্তর ও 2টি ক্যাম্পেইন ড্রাফট করে রেখেছি। টপ-আপ বা নতুন মাস শুরু না হওয়া পর্যন্ত কিছু চালু হবে না। কোনো কাজ হারায়নি।”",
      topUp: "টপ-আপ — ৳250-এ 250 ক্রেডিট",
      wait: "নতুন মাস পর্যন্ত অপেক্ষা করুন",
      note: "টপ-আপ করলেই প্রস্তুত কাজগুলো চালু হবে। AI-এর কাজের মতো বিলিংও পরিষ্কার হওয়া উচিত।",
    },
  },

  anchor: {
    h2: (
      <>
        শুধু সফটওয়্যারের সঙ্গে তুলনা করবেন না।<br />একজন কর্মীর খরচের সঙ্গে করুন।
      </>
    ),
    employee: {
      title: "একজন দোকান সহকারী",
      price: "৳12,000",
      per: "/মাস",
      lines: ["দিনে 10 ঘণ্টা, সপ্তাহে 6 দিন", "একটি নির্দিষ্ট কাজ জানেন", "প্রশিক্ষণ, ছুটি ও তদারকি প্রয়োজন"],
    },
    nova: {
      title: "Nova — Acting CEO",
      price: "৳3,990",
      per: "/মাস, Business প্ল্যান",
      lines: ["24/7 — রাত, ঈদ ও বর্ষাতেও", "Messenger, Instagram, WhatsApp আর ওয়েবসাইটের চ্যাট", "প্রতিটি কাজের প্রমাণ, সম্ভব হলে Undo"],
    },
  },

  switchStrip: {
    stack: "অন্য প্ল্যাটফর্মের খরচ: ≈ ৳16,500/মাস।",
    ours: "Dakio Growth: মাসে {price}, AI CEO-সহ।",
    price: "৳2,980",
    cta: "পুরো খরচের হিসাব দেখুন",
  },

  faq: {
    h2: "যে প্রশ্নগুলো করা স্বাভাবিক।",
    items: [
      { q: "Free কি সত্যিই সারাজীবন ফ্রি?", a: "হ্যাঁ। কার্ড লাগে না, সময়সীমাও নেই। Free-এর সীমার মধ্যে আপনার স্টোর খোলা থাকে, বিক্রিও চলে।" },
      { q: "অটোপাইলট ট্রায়াল কী?", a: "একবারের জন্য 14 দিনের Business। স্টোর তৈরি হলে আপনি নিজে চালু করবেন। নিজে থেকে কখনো শুরু হয় না।" },
      { q: "মাসিক না বার্ষিক?", a: "মাসিক হলো পুরো দাম। বার্ষিকে 30% কম।" },
      { q: "ইনফ্লুয়েন্সার কোড ব্যবহার করা যাবে?", a: "হ্যাঁ, Business বার্ষিক প্ল্যানে। কোডের ছাড় পুরো এক বছরের মাসিক দামের ওপর, বার্ষিক সাশ্রয়ের বদলে।" },
    ],
  },

  cta: {
    h2: "আপনার স্টোর। আপনার AI CEO। শুরু হোক আজই।",
    primary: "স্টোর খুলুন",
    secondary: "হোমে ফিরুন",
  },
};

export default pricing;
