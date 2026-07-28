// Structured-data copy — Bangla. Feeds lib/seo.js for the /bn graph, so the
// FAQ rich results that show up on Bangla searches are in Bangla.
// Plan names and payment brands stay English, matching the pricing page.

const seo = {
  home: "হোম",

  organizationDescription:
    "Dakio বাংলাদেশের কমার্স OS — দোকান, কুরিয়ার, bKash, Nagad আর ক্যাশ অন ডেলিভারি, সাথে Nova, প্রতিটা দোকানের AI Acting CEO।",

  applicationDescription:
    "বাংলাদেশের জন্য অল-ইন-ওয়ান ই-কমার্স প্ল্যাটফর্ম, সাথে Nova নামের AI Acting CEO: স্টোরফ্রন্ট, কুরিয়ার, bKash/Nagad/COD পেমেন্ট, মার্কেটিং আর সাপোর্ট — প্রতিটা কাজের রসিদ থাকে, চাইলে ফিরিয়ে নেওয়া যায়।",

  offers: [
    { name: "Starter", price: "0", priceCurrency: "BDT", description: "চিরকাল ফ্রি — দোকান, অর্ডার, কুরিয়ার আর Nova Advisor (মাসে 50 কাজ)।" },
    { name: "Growth", price: "1490", priceCurrency: "BDT", description: "৳1,490/মাস — Nova Operator, মাসে 750 কাজ, Grow Labs, Supplier Network।" },
    { name: "Business", price: "3990", priceCurrency: "BDT", description: "৳3,990/মাস — Nova L4 Acting CEO, মাসে 2,500 কাজ, ভয়েস মিনিট, প্লেবুক।" },
  ],

  pageNames: {
    "/": "হোম",
    "/nova": "Nova",
    "/store": "The Complete Store",
    "/store-studio": "Store Studio",
    "/grow": "Grow Labs",
    "/ads": "Ads Gallery",
    "/front-office": "Front Office",
    "/switch": "Dakio-তে চলে আসুন",
    "/pricing": "প্ল্যান ও দাম",
    "/about": "আমাদের কথা",
    "/blog": "ব্লগ",
    "/contact": "যোগাযোগ",
  },

  pricingFaq: [
    ["আনলিমিটেড AI কেন নয়?", "Nova আসল কাজ করে, আসল কম্পিউটে। আনলিমিটেড মানে হয় নকল AI, নয়তো লুকানো থ্রটলিং। মিষ্টি মিথ্যার বদলে আমরা সৎ একটা মিটার দিই — প্রতিটা কাজের রসিদসহ।"],
    ["কাজের কোটা শেষ হলে কী হয়?", "Nova Draft মোডে চলে যায় — সব তৈরি করতে থাকে, কিন্তু কিছুই চালায় না। টপ-আপ করলে (৳250-এ 250 কাজ) বা মাস ঘুরলে আবার চালু। কিছু হারায় না, কিছু চুপচাপ হয়ও না।"],
    ["কুরিয়ারের খরচ কত?", "প্রতি ডেলিভারিতে কুরিয়ারের নিজের রেট (Steadfast, Pathao, RedX) — সব প্ল্যানেই। শিপিংয়ে আমরা কোনো লাভ রাখি না।"],
    ["আমি বাংলাদেশের বাইরে — Dakio ব্যবহার করতে পারব?", "শিগগিরই। আমরা আগে বাংলাদেশের জন্য বানিয়েছি — ৳, bKash, COD, বাংলা। এরপর অন্য দেশ, সেখানেও স্থানীয় দামে, কনভার্ট করা দামে নয়। সাইনআপ পেজ থেকে ওয়েটলিস্টে নাম দিন।"],
  ],

  switchFaq: [
    ["আমার Google র‍্যাংকিং কি নষ্ট হবে?", "না — পুরোনো প্রতিটা URL স্থায়ীভাবে নতুন ঠিকানায় রিডাইরেক্ট হয়, ডোমেইনও আপনারই থাকে। র‍্যাংকিং রিডাইরেক্টের সাথেই যায়।"],
    ["আমার থিমের কী হবে?", "থিম এক প্ল্যাটফর্ম থেকে আরেকটায় যায় না — বদলে Store Studio-তে এক বিকেলেই নতুন করে বানিয়ে ফেলবেন: থিম গ্যালারি, আপনার ব্র্যান্ড কালার, বাংলা ফন্ট, ডেভেলপার লাগে না।"],
    ["আমি কি আটকে যাব?", "কোনো চুক্তি নেই, মাসে মাসে বিল, আর আপনার ডেটা (প্রোডাক্ট, কাস্টমার, অর্ডার) যেকোনো সময় CSV-তে নামিয়ে নিতে পারবেন। আমরা দরজা আটকে নয়, ভালো সার্ভিস দিয়ে ধরে রাখি।"],
  ],
};

export default seo;
