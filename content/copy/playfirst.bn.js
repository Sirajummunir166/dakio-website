// Copy for the three play-first pages — Bangla.
//
// These pages dare the visitor to touch the real product, so the Bangla stays
// imperative throughout ("ছুঁয়ে দেখুন", "একটা বানান") instead of describing.
// The demo browser-bar URLs are literal app URLs and stay as they are.

import { Highlight } from "../../components/PlayFirstPage";

const playfirst = {
  shared: {
    fullScreen: "ফুল স্ক্রিন",
    back: "Dakio-তে ফিরুন",
  },

  studio: {
    meta: {
      title: "Store Studio — ডেভেলপার ছাড়াই দোকান ডিজাইন করুন | Dakio",
      description:
        "আসল স্টোরফ্রন্ট সরাসরি এডিট করুন: থিম গ্যালারি, বাংলা ফন্ট, ডার্ক মোড, এক ট্যাপে নতুন লুক। কিছুই নষ্ট হবে না — Undo হাতের কাছেই। লাইভ বিল্ডারটা ছুঁয়ে দেখুন।",
    },
    navCta: "Store Studio খুলুন",
    h1: <>পড়ে সময় নষ্ট নয়।<br /><Highlight>ডিজাইন করুন</Highlight>।</>,
    sub: "নিচে Store Studio নিজেই — থিম বদলান, হেডলাইন লিখুন, সেকশন সাজান, ডার্ক করে দিন। কিছুই ভাঙবে না; Undo ঠিক পাশেই আছে।",
    barUrl: "app.dakio.io/studio — Shahrqee (demo store)",
    iframeTitle: "Store Studio — লাইভ",
    tryChips: [
      "Theme ট্যাব → গ্যালারি থেকে একটা লুক",
      "হেডলাইনে ক্লিক করে লিখুন",
      "ডার্ক স্টোরফ্রন্ট চালু করুন",
      "মোবাইল প্রিভিউতে যান",
      "তারপর Undo চাপুন",
    ],
    featsH2: "এইমাত্র যা ছুঁলেন, তার সবটাই প্রতিটা দোকানে থাকে।",
    feats: ["Theme Studio", "থিম গ্যালারি", "বাংলা ফন্ট প্যাক", "ডার্ক স্টোরফ্রন্ট", "14 রকম সেকশন", "জায়গাতেই এডিট", "মোবাইল কন্ট্রোল", "Undo আর ভার্সন"],
    note: "ডেভেলপার নেই, থিম কেনা নেই, পাবলিশ করার ভয় নেই — ক্যানভাসটাই আপনার দোকান।",
    ctaH2: <>ডেমো দোকানটা ভালো লাগল?<br />নিজেরটা বানান।</>,
    ctaPrimary: "ফ্রি শুরু করুন — কার্ড লাগে না",
  },

  ads: {
    meta: {
      title: "Ads Gallery — প্রোডাক্ট বাছুন, অ্যাড পেয়ে যান | Dakio",
      description:
        "এক ক্লিকে যেকোনো প্রোডাক্ট হয়ে যায় এডিটযোগ্য, ব্র্যান্ড-মানানসই অ্যাড — 3 সাইজে, স্থির আর মোশন দুটোতেই। যাওয়ার আগে Creative Doctor যাচাই করে। বাংলাতেও।",
    },
    navCta: "Ads Gallery খুলুন",
    h1: <>প্রোডাক্ট বাছুন।<br /><Highlight>অ্যাড পেয়ে যান</Highlight>।</>,
    sub: "এক ক্লিকেই তিন সাইজে পুরো এডিটযোগ্য, ব্র্যান্ড-মানানসই অ্যাড — স্থির আর মোশন। নিচেরটাই আসল এডিটর। একটা বানিয়ে ফেলুন।",
    barUrl: "app.dakio.io/content/ads — Shahrqee (demo catalogue)",
    iframeTitle: "Ads Gallery — লাইভ",
    tryChips: [
      "পাশের সারি থেকে প্রোডাক্ট নিন",
      "টেমপ্লেটে ট্যাপ করুন — নিজেই ভরে যাবে",
      "1:1 / 4:5 / 9:16 বদলান",
      "Animate চেপে মোশন দেখুন",
      "Creative Doctor চালান",
    ],
    featsH2: "শুরু থেকেই ব্র্যান্ডের মতো। যাওয়ার আগে যাচাই করা।",
    feats: ["10টি টেমপ্লেট + আপনার নিজের", "ব্র্যান্ড ইঞ্জিন — 11টি কালার রোল", "3 সাইজ, একবার এডিট", "5টি মোশন রেসিপি", "Creative Doctor যাচাই", "ব্যাকগ্রাউন্ড মুছে ফেলা", "আসল PNG এক্সপোর্ট", "বাংলা অ্যাড টেক্সট"],
    noteBefore: "একটাই স্টোর থিম আপনার দোকান ",
    noteEm: "আর",
    noteAfter: " অ্যাড — দুটোই চালায়। একবার ঠিক করে নিন ",
    noteLink: "Store Studio",
    noteEnd: "-তে।",
    ctaH2: "পরের অ্যাডটা এক ক্লিক দূরে।",
    ctaPrimary: "ফ্রি শুরু করুন — কার্ড লাগে না",
  },

  frontOffice: {
    meta: {
      title: "Front Office — যে AI আপনার ইনবক্সেই বিক্রি করে | Dakio",
      description:
        "Messenger, Instagram, WhatsApp আর ইমেইল একটাই থ্রেডে। Nova বাংলায় উত্তর দেয়, কাস্টমার কনফার্ম করার পরেই অর্ডার নেয়, RTO কমায়। আপনি যেকোনো সময় নিজে ধরতে পারেন।",
    },
    navCta: "Front Office খুলুন",
    h1: <>Nova বিক্রি করে<br />আপনার <Highlight>ইনবক্সেই</Highlight>।</>,
    sub: "Messenger, Instagram, WhatsApp, ইমেইল — প্রতিটার একটা করে থ্রেড, Nova বাংলায় উত্তর দিচ্ছে, কাস্টমার হ্যাঁ বললে তবেই অর্ডার নিচ্ছে। নিচেরটাই আসল।",
    barUrl: "app.dakio.io/inbox — Shahrqee (demo threads)",
    iframeTitle: "Front Office — লাইভ",
    tryChips: [
      "একটা NOVA HANDLING থ্রেড খুলুন",
      "উত্তরের রসিদের সারিটা খুলে দেখুন",
      "পাশের কাস্টমার 360 দেখুন",
      "T0–T3 অটোনমি ডায়াল ঘোরান",
      "CONTEXT BRIEF হ্যান্ডওভার দেখুন",
    ],
    featsH2: "এমন একজন সেলসম্যান, যার নিয়ম ভাঙার উপায় নেই।",
    feats: ["Messenger · IG · WhatsApp · ইমেইল", "বাংলায় উত্তর, মানুষের গতিতে", "“হ্যাঁ, কনফার্ম” ছাড়া অর্ডার নয়", "RTO Shield — পাঠানোর আগে কনফার্ম", "প্রেক্ষাপট লিখে আপনাকে দেয়", "আপনি সাথে সাথেই ধরতে পারেন", "EST আর MEASURED, কখনো যোগ হয় না", "প্রতিটা উত্তরের রসিদ"],
    hardLinesLabel: "যে সীমা কখনো ভাঙে না:",
    ctaH2: <>মাঝরাতে আর “দাম কত?”<br />-এর উত্তর দিতে হবে না।</>,
    ctaPrimary: "Nova-কে ডেস্কে বসান",
  },
};

export default playfirst;
