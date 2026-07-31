// Site chrome copy — nav + footer. Bangla.
//
// Written as Bangla marketing copy, not a translation of the English file:
// short, spoken, imperative. Product surface names (Nova, Store Studio, Grow
// Suite, Front Office, Ads Gallery, Supplier Network) stay in English — they are
// the names merchants see inside the app, and renaming them here would break
// the link between the site and the product. Mono/all-caps labels come from
// chrome.en.js and are shared.

const chrome = {
  nav: {
    explore: "ঘুরে দেখুন",
    nova: "Nova",
    switch: "Dakio-তে আসুন",
    pricing: "প্ল্যান ও দাম",
    login: "লগ ইন",
    cta: "ফ্রিতে স্টোর খুলুন",
    homeAria: "Dakio — হোম",
    languageLabel: "ভাষা",
    toBangla: "ভাষা বাংলা করুন",
    toEnglish: "ভাষা ইংরেজি করুন",
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    startItems: {
      GO: { n: "নতুন স্টোর খুলুন", d: "সাজানো স্টোর, কয়েক মিনিটেই প্রস্তুত" },
      MV: { n: "চলতি ব্যবসা Dakio-তে আনুন", d: "প্রোডাক্ট, কাস্টমার ও ডোমেইন—সব আমরা নিয়ে আসব" },
      ZS: { n: "স্টক ছাড়াই বিক্রি করুন", d: "সাপ্লায়ার পণ্য রাখবে, ডেলিভারি করবে Dakio" },
    },
    novaItems: {
      NV: { n: "Nova", d: "আপনার AI CEO-র সঙ্গে পরিচিত হন" },
      HQ: { n: "Nova HQ", d: "সিদ্ধান্ত, কাজের প্রমাণ ও ফল—সব এক জায়গায়" },
      FO: { n: "Front Office", d: "ইনবক্সে কথা বলে, অর্ডার নেয় Nova" },
    },
    buildItems: {
      CS: { n: "The Complete Store", d: "পেমেন্ট, কুরিয়ার ও অর্ডার—প্রথম দিন থেকেই প্রস্তুত" },
      SS: { n: "Store Studio", d: "ডেভেলপার ছাড়াই নিজের মতো স্টোর সাজান" },
      GL: { n: "Grow Suite", d: "ক্যাম্পেইন থেকে বিক্রি বাড়ানো—সব এক জায়গায়" },
      AD: { n: "Ads Gallery", d: "প্রোডাক্ট থেকে এক ক্লিকে ব্র্যান্ডের অ্যাড" },
      SN: { n: "Supplier Network", d: "নিজের স্টক ছাড়াই বিক্রি করুন" },
    },
    previews: {
      tour: {
        cta: "60 সেকেন্ডের ট্যুর শুরু করুন",
        title: "Dakio কীভাবে ব্যবসা চালায় দেখুন",
        body: "সিদ্ধান্ত অনুমোদন করুন, স্টোর সাজান, মেসেজ থেকে অর্ডার নিন—ডেমো নয়, প্রতিটি অংশই আসল প্রোডাক্ট।",
        hint: "প্রিভিউ দেখতে যেকোনো অপশনে মাউস রাখুন →",
      },
      store: {
        cta: "নতুন স্টোর খুলুন",
        handle: "shahrqee",
        domain: "shahrqee.dakio.shop",
        note: "সাইন আপ করলেই সাজানো স্টোর প্রস্তুত।",
      },
      switch: {
        cta: "Dakio-তে নিয়ে আসুন",
        rows: [
          { l: "প্রোডাক্ট ও ছবি", v: "✓ আনা হয়েছে" },
          { l: "কাস্টমার ও অর্ডার", v: "✓ আনা হয়েছে" },
          { l: "আপনার ডোমেইন", v: "✓ যুক্ত হয়েছে" },
        ],
      },
      supplier: {
        cta: "কীভাবে কাজ করে দেখুন",
        rows: ["সাপ্লায়ার পণ্য রাখে", "আপনার স্টোরে বিক্রি হয়", "Dakio প্যাক করে পাঠায়"],
        payout: "COD-এর টাকা → আপনার ব্যালেন্স",
      },
      nova: {
        cta: "Nova-কে জানুন",
        title: (
          <>
            একজন AI CEO।<br />সঙ্গে পুরো ব্যাক অফিস।
          </>
        ),
        note: "আস্থা বাড়লে দায়িত্ব বাড়ে—প্রতিটি কাজের প্রমাণ থাকে।",
      },
      novahq: {
        cta: "Nova HQ খুলুন",
        decision: "Muslin Drop-এর বাজেট ৳800 থেকে ৳1,200/দিন করার প্রস্তাব",
        approve: "অনুমোদন দিন",
        later: "পরে দেখব",
      },
      front: {
        cta: "ইনবক্স দেখুন",
        customer: "দাম কত? M সাইজ আছে?",
        nova: "দাম ৳2,300। M আছে—অর্ডারটা কনফার্ম করে দিই?",
      },
      complete: {
        cta: "সব সুবিধা দেখুন",
        rows: [
          { l: "bKash ৳2,300", v: "পেমেন্ট হয়েছে ✓" },
          { l: "Pathao পিকআপ", v: "বুক হয়েছে ✓" },
          { l: "লাভ ও ফি", v: "হিসাব হয়েছে ✓" },
        ],
        note: "…আর এর একটিও আপনাকে করতে হয়নি।",
      },
      studio: {
        cta: "বিল্ডার চালিয়ে দেখুন",
        headline: "Eid Muslin Collection",
        looks: "এক ট্যাপে নতুন লুক",
      },
      grow: {
        cta: "Grow Suite দেখুন",
        title: "ঈদে মসলিনের খোঁজ 3.2× বেড়েছে",
        sub: "এই কালেকশনের সঙ্গে মিলেছে আগের 38 জন ক্রেতা",
        button: "ক্যাম্পেইন প্রস্তুত করুন",
      },
      ads: { cta: "অ্যাড বানিয়ে দেখুন" },
    },
    about: "Dakio সম্পর্কে",
    blog: "ব্লগ",
    contact: "যোগাযোগ",
  },
  footer: {
    tagline: "বাংলাদেশের কমার্স OS—প্রতিটি স্টোরের সঙ্গে একজন AI CEO।",
    product: {
      nova: "Nova — আপনার CEO",
      store: "The Complete Store",
      studio: "Store Studio",
      grow: "Grow Suite",
      ads: "Ads Gallery",
      frontOffice: "Front Office",
      pricing: "প্ল্যান ও দাম",
    },
    tryLive: {
      hq: "Nova HQ",
      studio: "Store Studio বিল্ডার",
      grow: "Grow Suite",
      ads: "অ্যাড এডিটর",
      inbox: "ইনবক্স",
    },
    company: {
      about: "Dakio সম্পর্কে",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
      switch: "Dakio-তে আসুন",
    },
    payAlt: "Visa, Mastercard, bKash, Nagad, Rocket-সহ 40টির বেশি মাধ্যমে পেমেন্ট করা যায়—SSLCommerz দ্বারা যাচাইকৃত",
    legalLine: (
      <>
        © 2026 Dakio — Digidhaka Communication Limited। সর্বস্বত্ব সংরক্ষিত।
        <br />
        ট্রেড লাইসেন্স TRAD/DSCC/041467/2021 · বাংলাদেশের উদ্যোক্তাদের জন্য তৈরি
      </>
    ),
    privacy: "গোপনীয়তা নীতি",
    terms: "ব্যবহারের শর্ত",
    refund: "রিটার্ন ও রিফান্ড নীতি",
    dataDeletion: "ডেটা মুছে ফেলা",
    cta: "ফ্রিতে স্টোর খুলুন",
  },
};

export default chrome;
