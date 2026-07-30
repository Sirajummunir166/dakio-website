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
    switch: "Dakio-তে চলে আসুন",
    pricing: "প্ল্যান ও দাম",
    login: "লগ ইন",
    cta: "স্টোর খুলুন",
    homeAria: "Dakio — হোম",
    languageLabel: "ভাষা",
    toBangla: "ভাষা বাংলা করুন",
    toEnglish: "ভাষা ইংরেজি করুন",
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    startItems: {
      GO: { n: "প্রথম দোকানটা খুলুন", d: "সাজানো দোকান, কয়েক মিনিটেই লাইভ" },
      MV: { n: "Dakio-তে চলে আসুন", d: "প্রোডাক্ট, কাস্টমার আর ডোমেইন — আমরা এনে দিই" },
      ZS: { n: "স্টক ছাড়াই বিক্রি করুন", d: "সাপ্লায়ার মাল রাখে, পাঠায়ও" },
    },
    novaItems: {
      NV: { n: "Nova", d: "আপনার AI Acting CEO-র সাথে পরিচয়" },
      HQ: { n: "Nova HQ", d: "সিদ্ধান্ত, রসিদ আর ফলাফল — সব চোখের সামনে" },
      FO: { n: "Front Office", d: "ইনবক্সেই Nova বিক্রি করে" },
    },
    buildItems: {
      CS: { n: "The Complete Store", d: "পেমেন্ট, কুরিয়ার, অর্ডার — প্রথম দিন থেকেই" },
      SS: { n: "Store Studio", d: "ডেভেলপার ছাড়াই স্টোরফ্রন্ট ডিজাইন" },
      GL: { n: "Grow Suite", d: "প্রচার, কনটেন্ট, নতুন সুযোগ, উন্নতি" },
      AD: { n: "Ads Gallery", d: "প্রোডাক্ট থেকে এক ক্লিকে ব্র্যান্ডের অ্যাড" },
      SN: { n: "Supplier Network", d: "স্টক না রেখেই বিক্রি" },
    },
    previews: {
      tour: {
        cta: "ট্যুর শুরু করুন",
        title: "Dakio কীভাবে দোকান চালায় দেখুন",
        body: "একটা সিদ্ধান্ত অনুমোদন করুন, স্টোরফ্রন্ট সাজান, মেসেজ থেকে অর্ডার বানান — প্রতিটা রুমই আসল প্রোডাক্ট।",
        hint: "যেকোনো আইটেমে হোভার করলে প্রিভিউ →",
      },
      store: {
        cta: "শূন্য থেকে শুরু",
        handle: "shahrqee",
        domain: "shahrqee.dakio.shop",
        note: "সাইন আপ করার সাথে সাথেই সাজানো স্টোরফ্রন্ট আপনার।",
      },
      switch: {
        cta: "আমার সুইচ প্ল্যান করুন",
        rows: [
          { l: "প্রোডাক্ট আর ছবি", v: "✓ এসেছে" },
          { l: "কাস্টমার আর অর্ডার", v: "✓ এসেছে" },
          { l: "আপনার ডোমেইন", v: "✓ যুক্ত" },
        ],
      },
      supplier: {
        cta: "কীভাবে চলে দেখুন",
        rows: ["সাপ্লায়ার মাল রাখে", "আপনার দোকান বিক্রি করে", "Dakio প্যাক করে পাঠায়"],
        payout: "COD-এর টাকা → আপনার ব্যালেন্সে",
      },
      nova: {
        cta: "Nova-কে দেখুন",
        title: (
          <>
            একটা নিয়োগ।<br />পুরো একটা ব্যাক অফিস।
          </>
        ),
        note: "ক্ষমতা অর্জন করতে হয় — প্রতিটা কাজের রসিদ থাকে।",
      },
      novahq: {
        cta: "Nova HQ খুলুন",
        decision: "“Muslin drop” ৳800 → ৳1,200/দিন করা হোক",
        approve: "অনুমোদন",
        later: "পরে",
      },
      front: {
        cta: "ইনবক্স দেখুন",
        customer: "দাম কত? M সাইজ আছে?",
        nova: "৳2,300, M আছে — অর্ডার করে দিই?",
      },
      complete: {
        cta: "ভেতরে কী কী আছে দেখুন",
        rows: [
          { l: "bKash ৳2,300", v: "পেয়েছি ✓" },
          { l: "Pathao পিকআপ", v: "বুক হয়েছে ✓" },
          { l: "লাভ আর ফি", v: "লেখা হয়েছে ✓" },
        ],
        note: "…আর আপনাকে কিছুই করতে হয়নি।",
      },
      studio: {
        cta: "বিল্ডারটা চালিয়ে দেখুন",
        headline: "Eid Muslin Collection",
        looks: "এক ট্যাপে চেহারা বদল",
      },
      grow: {
        cta: "ঘুরে দেখুন",
        title: "ঈদে মসলিনের খোঁজ বেড়েছে ×3.2",
        sub: "38 জন পুরোনো ক্রেতা এই কালেকশনের সাথে মেলে",
        button: "ক্যাম্পেইন সাজান",
      },
      ads: { cta: "একটা অ্যাড বানান" },
    },
    about: "আমাদের কথা",
    blog: "ব্লগ",
    contact: "যোগাযোগ",
  },
  footer: {
    tagline: "বাংলাদেশের কমার্স OS — প্রতিটা স্টোরে একজন AI CEO।",
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
      about: "আমাদের কথা",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
      switch: "Dakio-তে চলে আসুন",
    },
    payAlt: "ভিসা, মাস্টারকার্ড, bKash, Nagad, Rocket সহ ৪০+ মাধ্যমে পেমেন্ট — SSLCommerz ভেরিফায়েড",
    legalLine: (
      <>
        © ২০২৬ Dakio — Digidhaka Communication Limited। সর্বস্বত্ব সংরক্ষিত।
        <br />
        ট্রেড লাইসেন্স TRAD/DSCC/041467/2021 · বাংলাদেশের উদ্যোক্তাদের জন্য তৈরি
      </>
    ),
    privacy: "প্রাইভেসি",
    terms: "শর্তাবলি",
    refund: "রিটার্ন ও রিফান্ড",
    dataDeletion: "ডেটা ডিলিশন",
    cta: "স্টোর খুলুন",
  },
};

export default chrome;
