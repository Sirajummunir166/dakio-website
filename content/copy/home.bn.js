// Home copy — Bangla. Written as Bangla ad copy, not a translation: short
// verb-first sentences, spoken register, the same swagger as the English page
// rather than the same words. Where English lands a pun the Bangla lands its
// own ("Not translated for it." → "অনুবাদ করা নয়।").
//
// Kept in English on purpose: product surface names (Nova, Nova HQ, Store
// Studio, Grow Suite, Front Office, Ads Gallery, Supplier Network), payment and
// courier brands, competitor names, and every mono/all-caps label (those come
// from home.en.js — Bengali has no uppercase and shatters under the tracking).
// Numerals stay Western so prices match the app, invoices and the ad accounts.

import Mark from "../../components/Mark";

const home = {
  meta: {
    title: "Dakio — আপনার অনলাইন দোকানে একজন AI CEO | বাংলাদেশ",
    description:
      "দোকান, কুরিয়ার, bKash, Nagad আর ক্যাশ অন ডেলিভারি — সাথে Nova, একজন AI CEO যে ২৪ ঘণ্টা মার্কেটিং, সাপোর্ট আর অপারেশন চালায়। প্রতিটা কাজের রসিদ থাকে। ফ্রিতে শুরু, কার্ড লাগে না।",
  },

  hero: {
    h1: (
      <>
        আপনার দোকানে<br />একজন CEO নিয়োগ দিন<span style={{ color: "#C6F035" }}>।</span>
      </>
    ),
    sub: (
      <>
        আপনার দোকান, কাস্টমার, অর্ডার, কুরিয়ার আর পেমেন্ট — সব চালায় <b style={{ color: "#E9EFDC" }}>Nova</b>, আপনার AI Acting CEO। আপনি ঘুমালেও।
      </>
    ),
    ctaPrimary: "স্টোর খুলুন",
    ctaSecondary: "Nova-কে দেখুন",
    chips: ["84টি মেসেজের উত্তর দেওয়া", "কার্ট ফেরত · ৳2,300", "দুর্বল অ্যাড সেট বন্ধ"],
  },

  marquee: { worksWith: "যাদের সাথে চলে" },

  paths: {
    h2: (
      <>
        আপনি কোথা থেকে<br />শুরু করছেন?
      </>
    ),
    fresh: {
      t: "প্রথম দোকানটা বানান",
      d: "সাজানো একটা দোকান, আপনার প্রোডাক্ট — বা সাপ্লায়ারের। ডেভেলপার লাগবে না।",
      cta: "শূন্য থেকে শুরু",
    },
    selling: {
      t: "ব্যবসাটা এখানে নিয়ে আসুন",
      d: "প্রোডাক্ট, কাস্টমার, ডোমেইন আর পুরো অপারেশন — আমরাই এনে দিই।",
      cta: "আমার সুইচ প্ল্যান করুন",
    },
  },

  launch: {
    h2: (
      <>
        নাম দিন। প্রোডাক্ট তুলুন। <Mark>দোকান লাইভ।</Mark>
      </>
    ),
    steps: [
      { time: "~30 SEC", t: "দোকানের একটা নাম দিন" },
      { time: "~5 MIN", t: "প্রোডাক্ট তুলুন" },
      { time: "LIVE", t: "লিংকটা শেয়ার করুন" },
    ],
    name: {
      handle: "shahrqee",
      domain: "shahrqee.dakio.shop",
      yours: "সাথে সাথেই আপনার",
      note: "সাইন আপ করলেই সাজানো একটা স্টোরফ্রন্ট রেডি — যখন খুশি বদলে নিন।",
    },
    products: {
      a: { n: "মসলিন শাড়ি — ক্রিমসন", p: "৳2,300" },
      b: { n: "জামদানি স্টোল — টিল", p: "৳1,850" },
      enough: "ছবি আর দাম দিলেই হবে",
      supplier: "স্টক নেই? সাপ্লায়ার থেকে নিন — Dakio পাঠিয়ে দেবে",
    },
    live: {
      domain: "shahrqee.dakio.shop",
      note: "ফেসবুক, ইনস্টাগ্রাম, যেখানে খুশি লিংক দিন — অর্ডার, bKash আর কুরিয়ার আগে থেকেই চালু।",
      ceo: "…আর আপনার CEO কাজে বসে গেল।",
    },
    foot: "কোড নেই, ডেভেলপার নেই। কয়েক মিনিটেই দোকান লাইভ — আর এটা তো শুধু শুরু।",
    footLink: "ভেতরে কী কী আছে দেখুন →",
  },

  brief: {
    h2: (
      <>
        ঘুম থেকে উঠে দেখুন<br />কাজ <Mark>শেষ</Mark>।
      </>
    ),
    p: "Nova রাতের শিফটে কাজ করে, সকাল ৬টায় রিপোর্ট দেয় — প্রতিটা লাইনের পেছনে প্রমাণ, নিজে যাচাই করতে পারবেন; যে কাজ ফেরানো যায়, সেটা ফিরিয়েও নিতে পারবেন।",
    link: "Nova HQ সরাসরি দেখুন",
    hearCall: "কল করে শুনুন",
    tiles: [
      { v: "৳46,200", l: "রাতারাতি বিক্রি" },
      { v: "23", l: "অর্ডার কনফার্ম" },
      { v: "84", l: "মেসেজের উত্তর" },
      { v: "11", l: "কার্ট ফেরত" },
      { v: "7", l: "নতুন ট্রেন্ড" },
      { v: "6h 40m", l: "আপনার বাঁচানো সময়" },
    ],
    focus: (
      <>
        আজকের ফোকাস: <b>Muslin drop</b> ক্যাম্পেইন বড় করা — আনুমানিক <b style={{ color: "#C6F035" }}>সপ্তাহে +14% লাভ</b>।{" "}
      </>
    ),
  },

  org: {
    h2: "এটাই এখন আপনার টিম।",
    stats: [
      { v: "1", l: "Acting CEO" },
      { v: "10", l: "ডিপার্টমেন্ট" },
      { v: "65", l: "নির্দিষ্ট দায়িত্ব" },
    ],
    ceo: "CEO অফিস",
    depts: [
      { n: "মার্কেটিং", j: "PROMOTES" }, { n: "সেলস", j: "CLOSES" }, { n: "সাপোর্ট", j: "ANSWERS" },
      { n: "রিসার্চ", j: "DISCOVERS" }, { n: "ইনভেন্টরি", j: "PREDICTS" }, { n: "শিপিং", j: "DELIVERS" },
      { n: "ফিন্যান্স", j: "COUNTS" }, { n: "অপারেশনস", j: "SOURCES" }, { n: "গ্রোথ", j: "EXPERIMENTS" },
    ],
    note: "প্রতিটা দায়িত্ব আসল একটা মডিউলে গিয়ে পড়ে — নিজে হাতেও চালাতে পারতেন। Nova শুধু কখনো ঘুমায় না।",
  },

  rooms: {
    h2: "আপনার CEO যেসব রুমে কাজ করে।",
    hq: {
      n: "Nova HQ",
      d: "CEO-কে দেখে রাখুন — সিদ্ধান্ত, রসিদ, লাইভ ফিড।",
      decision: "“Muslin drop” বাজেট ৳800 → ৳1,200/দিন করা হোক",
      approve: "অনুমোদন",
      later: "পরে",
      feed: [
        { t: "12 জন Messenger কাস্টমারকে উত্তর দেওয়া হয়েছে", at: "02:14" },
        { t: "কার্ট ফেরত · তাসপিয়া কে. · ৳2,300", at: "03:41" },
      ],
    },
    studio: {
      n: "Store Studio",
      d: "এমন দোকান বানান যেটা টেমপ্লেটের মতো দেখায় না।",
      previewDomain: "shahrqee.com",
      previewHeadline: "Eid Muslin Collection",
      themes: "THEMES",
      themesNote: "+ বাংলা ফন্ট · ডার্ক মোড",
    },
    frontOffice: {
      n: "Front Office",
      d: "সব চ্যানেলের একটাই ইনবক্স। Nova সেখানেই বিক্রি করে।",
      chat: [
        { from: "customer", t: "দাম কত? M সাইজ আছে?" },
        { from: "nova", t: "৳2,300, M স্টকে আছে। কনফার্ম করলে অর্ডার করে দিই?" },
        { from: "customer", t: "হ্যাঁ, কনফার্ম করেন ✓" },
      ],
      byNova: "BY NOVA",
    },
    grow: {
      n: "Grow Suite",
      d: "ব্যবসা বাড়ানোর পুরো Grow Suite — ছয়টা লিভার, একটাই টিম।",
      levers: [
        { n: "ক্যাম্পেইন", j: "PROMOTE" }, { n: "কনটেন্ট", j: "CREATE" }, { n: "ব্রডকাস্ট", j: "REACH" },
        { n: "রিসার্চ", j: "DISCOVER" }, { n: "গ্রোথ", j: "IMPROVE" }, { n: "লক্ষ্য", j: "LEAD" },
      ],
      novaLine: (
        <>
          ঈদে মসলিনের চাহিদা <b style={{ color: "#C6F035" }}>3.2×</b> — ক্যাম্পেইন ড্রাফট করা, 38 জন পুরোনো ক্রেতা লাইনে। আপনার অনুমতি ছাড়া কিছুই যাবে না।
        </>
      ),
      review: "দেখুন",
      dismiss: "বাদ দিন",
    },
    ads: {
      n: "Ads Gallery",
      d: "প্রোডাক্ট বাছুন। অ্যাড পেয়ে যান।",
      product: "মসলিন শাড়ি",
      creatives: ["EID DROP", "-20%"],
    },
    supplier: {
      n: "Supplier Network",
      d: "স্টক ছাড়াই বিক্রি — যাচাই করা সাপ্লায়ার মাল রাখে, প্রতিটা অর্ডার Dakio পাঠায়।",
      flow: [
        { n: "সাপ্লায়ার", j: "HOLDS STOCK" },
        { n: "আপনার দোকান", j: "SELLS" },
        { n: "Dakio", j: "PACKS + SHIPS" },
        { n: "গ্রাহকের দরজা", j: "COD COLLECTED" },
      ],
    },
  },

  trust: {
    h2: "লাগাম আপনার হাতেই।",
    receipt: {
      title: "প্রতিটা কাজের রসিদ থাকে",
      action: "“Boishakh Reels” ক্যাম্পেইন বন্ধ করা হয়েছে",
      evidence: "3 দিনে CPA বেড়েছে 43% · প্রমাণ: 72 ঘণ্টার খরচের হিসাব",
      before: "BEFORE ৳1,200/day",
      after: "AFTER PAUSED",
      undo: "ফিরিয়ে নিন · 24 ঘণ্টা সময়",
    },
    limits: {
      title: "সীমা আপনি ঠিক করেন",
      rows: [
        { l: "দিনে সর্বোচ্চ খরচ", v: "৳5,000" },
        { l: "সর্বোচ্চ ছাড়", v: "15%" },
      ],
      noTouch: "যেগুলোতে হাত দেওয়া নিষেধ",
      note: "রিফান্ড, একসাথে বড় পরিবর্তন আর চুক্তি — শুধু আপনার হাতে। সবসময়।",
    },
    ladder: {
      title: "ক্ষমতা অর্জন করতে হয়",
      levels: [
        { l: "L0", n: "দেখে", note: "REPORTS ONLY", on: false },
        { l: "L1", n: "পরামর্শ দেয়", note: "ASKS FIRST", on: false },
        { l: "L2", n: "ড্রাফট করে", note: "PREPARES, YOU APPROVE", on: false },
        { l: "L3", n: "অপারেটর", note: "DAY-ONE DEFAULT", on: true },
        { l: "L4", n: "Acting CEO", note: "EARNED", on: false, lime: true },
      ],
      note: "বিশ্বাস হিসাব হয় লেজার থেকে — অনুমোদনে Nova ওপরে ওঠে, ফিরিয়ে নিলে নিচে নামে।",
    },
  },

  bd: {
    h2: (
      <>
        বাংলাদেশের জন্য বানানো।<br /><span style={{ color: "#C6F035" }}>অনুবাদ করা নয়।</span>
      </>
    ),
    p: "পেমেন্ট, ভাষা আর ঈদ-পূজার ক্যালেন্ডার এখানে ডিজাইনের অংশ — কোনো প্লাগিন নয়।",
    chips: ["সবখানে ৳", "bKash · Nagad", "ক্যাশ অন ডেলিভারি", "বাংলা + English", "বাংলায় ভয়েস কল", "ঢাকার টাইমজোন"],
    seasonNote: "Nova ঈদের প্লেবুক 3 সপ্তাহ আগেই সাজিয়ে দেয় — একবার অনুমোদনেই পুরো মাস চলে।",
  },

  switch: {
    h2: (
      <>
        Shopify ছাড়ছেন?<br />এক <Mark>উইকেন্ডেই</Mark> সব নিয়ে আসুন।
      </>
    ),
    p: "কনসিয়ার্জ মাইগ্রেশন প্রোডাক্ট, কাস্টমার আর অর্ডারের ইতিহাস নিয়ে আসে। এই পুরো সময় আপনার দোকান বিক্রি করতেই থাকে।",
    cta: "আমার সুইচ প্ল্যান করুন",
    rows: [
      { i: "1", t: "কনসিয়ার্জ ইমপোর্ট", d: "প্রোডাক্ট, কাস্টমার, অর্ডার আর রিভিউ — আমরা সরাই, আপনি শুধু দেখে নেন।" },
      { i: "2", t: "COD আর bKash ভেতরেই", d: "পেমেন্ট প্লাগিন নেই, ডলারের ফি নেই। বাংলাদেশ যে চেকআউট আসলে ব্যবহার করে।" },
      { i: "3", t: "উপরি — একজন CEO", d: "Shopify টুল দেয়। Dakio প্রথম দিন থেকেই পুরো ব্যাক অফিসে লোক বসিয়ে দেয়।" },
    ],
  },

  pricing: {
    h2: "টাকায়। ডলারে নয়।",
    popular: "POPULAR",
    plans: [
      { n: "Starter", pr: "ফ্রি", sub: "চিরকাল", d: "দোকান, অর্ডার, কুরিয়ার আর L0–L1 লেভেলে Nova — বিশ্বাস করার আগে কাজ দেখে নিন।", cta: "ফ্রি শুরু করুন", dark: false },
      { n: "Growth", pr: "৳1,490", sub: "/মাস", d: "আনলিমিটেড প্রোডাক্ট, সাপ্লায়ার নেটওয়ার্ক, Grow Suite, Nova Operator — মাসে 750 কাজ।", cta: "Growth নিন", dark: true, pop: true },
      { n: "Business", pr: "৳3,990", sub: "/মাস", d: "Nova-র সবকিছু — 2,500 কাজ, ভয়েস কল, প্লেবুক, স্টাফ লগইন। Acting CEO-র স্বাধীনতা খোলে বিশ্বাস অর্জনের সাথে সাথে।", cta: "14 দিন ফ্রি ট্রায়াল", dark: false },
    ],
    foot: "সব প্ল্যানেই Nova আছে। স্বাধীনতা কেনা যায় না, অর্জন করতে হয়।",
    footLink: "পুরো প্রাইসিং →",
  },

  cta: {
    h2: (
      <>
        আপনার দোকান। আপনার CEO।<br />আজই।
      </>
    ),
    primary: "ফ্রিতে স্টোর খুলুন",
    secondary: "তারপর Nova নিয়োগ দিন",
  },
};

export default home;
