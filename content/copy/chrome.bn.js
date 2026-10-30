// Site chrome copy — nav + footer. Bangla.
//
// Written as Bangla marketing copy, not a translation of the English file:
// short, spoken, imperative. Product surface names (Nova, Front Office) stay
// in English, as merchants see them inside the app. The footer's all-caps
// labels come from chrome.en.js and are shared.

const chrome = {
  nav: {
    explore: "ঘুরে দেখুন",
    nova: "Nova",
    switch: "Dakio-তে আসুন",
    shops: "দোকানের জন্য",
    services: "সার্ভিসের জন্য",
    pricing: "প্ল্যান ও দাম",
    login: "লগ ইন",
    cta: "শুরু করুন",
    homeAria: "Dakio হোম",
    languageLabel: "ভাষা",
    toBangla: "ভাষা বাংলা করুন",
    toEnglish: "ভাষা ইংরেজি করুন",
    openMenu: "মেনু খুলুন",
    closeMenu: "মেনু বন্ধ করুন",
    groups: {
      shops: {
        title: "দোকানের জন্য",
        sub: "আপনি পণ্য বিক্রি করেন",
        items: {
          inbox: { n: "প্রতিটি মেসেজের উত্তর", d: "Messenger, Instagram, WhatsApp, ওয়েবসাইট চ্যাট", note: "Nova প্রতিটি কাস্টমারের উত্তর দেয়, চ্যাটেই অর্ডার করে দেয়।" },
          fake: { n: "ভুয়া অর্ডার কম", d: "পাঠানোর আগেই ঝুঁকির কাস্টমার চিহ্নিত", note: "আগের রিটার্ন আর কুরিয়ারের ইতিহাস অর্ডারেই দেখা যায়, পাঠানোর আগে।" },
          courier: { n: "কুরিয়ার ও COD", d: "পিকআপ বুক করুন, টাকা ফেরত আসা দেখুন", note: "প্রতিটি পার্সেল আর COD-র প্রতিটি টাকা এক তালিকায়।" },
          website: { n: "নিজের ওয়েবসাইট", d: "সাজানো স্টোর, কয়েক মিনিটেই চালু", note: "আপনার দোকানের মতো একটি লুক বাছুন। চেকআউট আর ডেলিভারি আগে থেকেই আছে।" },
          stock: { n: "স্টক ছাড়াই বিক্রি", d: "সাপ্লায়ার রাখে, Dakio পাঠায়", note: "যাচাই করা সাপ্লায়ারের পণ্য যোগ করুন। প্রতিটি অর্ডার প্যাক করে পাঠায় Dakio।" },
        },
      },
      services: {
        title: "সার্ভিসের জন্য",
        sub: "আপনি সময় ও দক্ষতা বিক্রি করেন",
        items: {
          bookings: { n: "অনলাইনে বুকিং", d: "ক্লায়েন্ট দিন রাত যেকোনো সময় বুক করে", note: "আপনার পেজ বা চ্যাট থেকে বুকিং, সরাসরি আপনার ক্যালেন্ডারে।" },
          noshow: { n: "না আসা কমে", d: "রিমাইন্ডার নিজে থেকেই যায়", note: "প্রতিটি বুকিংয়ের আগে রিমাইন্ডার, আপনাকে পাঠাতে হয় না।" },
          team: { n: "টিমের দিন", d: "কে কখন কাজ করবে, এক ক্যালেন্ডারে", note: "প্রতিটি বুকিং, সাথে কে কাজটি করবে।" },
          paid: { n: "টাকা আদায়", d: "কোটেশন, ইনভয়েস আর পেমেন্ট", note: "ইনভয়েস পাঠান, কোনটা পরিশোধ হলো আর কোনটা বাকি দেখুন।" },
          pipeline: { n: "লিড ও ডিল", d: "প্রতিটি এনকোয়ারি ধাপে ধাপে", note: "কোনো এনকোয়ারি হারায় না। জেতা বা হারা পর্যন্ত প্রতিটি নিজের ধাপে থাকে।" },
        },
      },
      more: {
        title: "Nova ও আরও",
        sub: "সব ধরনের ব্যবসার জন্য",
        items: {
          nova: { n: "Nova, আপনার AI সিইও", d: "রোজকার কাজ চালায়, বড় সিদ্ধান্ত আপনার", note: "Nova মেসেজ আর কমেন্টের উত্তর দেয়, চ্যাটেই অর্ডার করে, ফলো আপ করে। দাম, রিফান্ড আর ঝুঁকির সিদ্ধান্ত আসে আপনার কাছে।" },
          ads: { n: "অ্যাড ও ক্রিয়েটিভ", d: "আপনার পণ্য থেকে অ্যাডের ছবি ও ভিডিও", note: "একটি পণ্য থেকে অ্যাডের ছবি বা ছোট ভিডিও বানান।" },
          posts: { n: "পোস্ট ও ক্যাম্পেইন", d: "Nova-র সাথে সপ্তাহের পোস্ট প্ল্যান", note: "পোস্ট আর ক্যাম্পেইন লিখে দেয় Nova, আপনি অনুমোদন দেন।" },
          switch: { n: "Dakio-তে চলে আসুন", d: "প্রোডাক্ট, কাস্টমার আর ডোমেইন নিয়ে আসুন", note: "আপনার যা আছে, আমরা নিয়ে আসি।" },
          developers: { n: "ডেভেলপার", d: "নিজের সাইট, পেছনে Dakio", note: "নিজের React বা Next.js সাইট। চেকআউট, কুরিয়ার আর Nova আসে Dakio থেকে।" },
        },
      },
    },
    start: {
      title: "নতুন? আপনার ব্যবসা দিয়ে শুরু করুন",
      body: "আপনার মতো ব্যবসার জন্য Dakio কী করে দেখুন, অ্যাপের আসল স্ক্রিনে।",
      shops: "আমি পণ্য বিক্রি করি",
      services: "আমি সার্ভিস দিই",
      chat: "অথবা দেখুন Nova কীভাবে আসল চ্যাটের উত্তর দেয়",
    },
    see: "দেখুন কীভাবে",
    region: "বাংলাদেশে তৈরি, শিগগির বিশ্বজুড়ে",
    company: "কোম্পানি",
    about: "Dakio সম্পর্কে",
    blog: "ব্লগ",
    contact: "যোগাযোগ",
  },
  footer: {
    tagline: "পুরো ব্যবসা এক অ্যাপে, সাথে আপনার AI সিইও Nova।",
    product: {
      nova: "Nova, আপনার AI সিইও",
      store: "The Complete Store",
      studio: "Store Studio",
      grow: "Grow Suite",
      ads: "Ads Gallery",
      frontOffice: "Front Office",
      pricing: "প্ল্যান ও দাম",
      developers: "ডেভেলপার",
      themes: "থিম",
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
    payAlt: "Visa, Mastercard, bKash, Nagad, Rocket-সহ 40টির বেশি মাধ্যমে পেমেন্ট করা যায়, SSLCommerz দ্বারা যাচাইকৃত",
    legalLine: (
      <>
        © 2026 Dakio, Digidhaka Communication Limited। সর্বস্বত্ব সংরক্ষিত।
        <br />
        ট্রেড লাইসেন্স TRAD/DSCC/041467/2021 · বাংলাদেশের উদ্যোক্তাদের জন্য তৈরি
      </>
    ),
    privacy: "গোপনীয়তা নীতি",
    terms: "ব্যবহারের শর্ত",
    refund: "রিটার্ন ও রিফান্ড নীতি",
    dataDeletion: "ডেটা মুছে ফেলা",
    cta: "শুরু করুন",
  },
};

export default chrome;
