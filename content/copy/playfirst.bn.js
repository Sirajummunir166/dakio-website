// Copy for the three play-first pages — Bangla.
//
// These pages dare the visitor to touch the real product, so the Bangla stays
// imperative throughout ("ছুঁয়ে দেখুন", "একটা বানান") instead of describing.
// The demo browser-bar URLs are literal app URLs and stay as they are.

import { Highlight } from "../../components/PlayFirstPage";

const playfirst = {
  shared: {
    fullScreen: "পূর্ণ পর্দায় দেখুন",
    back: "হোমে ফিরুন",
  },

  studio: {
    meta: {
      title: "Store Studio — ডেভেলপার ছাড়াই স্টোর সাজান | Dakio",
      description:
        "আসল স্টোরফ্রন্ট সরাসরি এডিট করুন—থিম গ্যালারি, বাংলা ফন্ট, ডার্ক মোড ও এক ট্যাপে নতুন লুক। কিছু নষ্ট হবে না; Undo হাতের কাছেই।",
    },
    navCta: "Store Studio খুলুন",
    h1: <>কথায় নয়।<br /><Highlight>নিজেই ডিজাইন করুন</Highlight>।</>,
    sub: "নিচেরটিই আসল Store Studio। থিম বদলান, হেডলাইন লিখুন, সেকশন সাজান বা স্টোরফ্রন্ট ডার্ক করুন। ভুল হলে পাশের Undo দিয়ে ফিরিয়ে নিন।",
    barUrl: "app.dakio.io/studio — Shahrqee (demo store)",
    iframeTitle: "Store Studio — লাইভ",
    tryChips: [
      "Theme tab → gallery থেকে একটি লুক নিন",
      "Headline-এ ক্লিক করে লিখুন",
      "Dark storefront চালু করুন",
      "Mobile preview দেখুন",
      "তারপর Undo চাপুন",
    ],
    featsH2: "এইমাত্র যা ব্যবহার করলেন, প্রতিটি স্টোরেই তার সব আছে।",
    feats: ["Theme Studio", "থিম গ্যালারি", "বাংলা ফন্ট প্যাক", "ডার্ক স্টোরফ্রন্ট", "14 ধরনের সেকশন", "সরাসরি এডিট", "মোবাইল কন্ট্রোল", "Undo ও ভার্সন"],
    note: "ডেভেলপার লাগবে না, আলাদা থিম কিনতে হবে না। ক্যানভাসে যা এডিট করছেন, সেটিই আপনার লাইভ স্টোর।",
    ctaH2: <>ডেমো স্টোর ভালো লেগেছে?<br />এবার নিজেরটি সাজান।</>,
    ctaPrimary: "ফ্রিতে শুরু করুন—কার্ড লাগবে না",
  },

  ads: {
    meta: {
      title: "Ads Gallery — প্রোডাক্ট বাছুন, অ্যাড পেয়ে যান | Dakio",
      description:
        "এক ক্লিকে যেকোনো প্রোডাক্ট থেকে তৈরি করুন পুরো এডিটযোগ্য, ব্র্যান্ডের সঙ্গে মানানসই অ্যাড—3 সাইজে, স্ট্যাটিক ও মোশন। এক্সপোর্টের আগে Creative Doctor যাচাই করবে।",
    },
    navCta: "Ads Gallery খুলুন",
    h1: <>প্রোডাক্ট বাছুন।<br /><Highlight>অ্যাড তৈরি করুন</Highlight>।</>,
    sub: "এক ক্লিকে তিন সাইজের পুরো এডিটযোগ্য, ব্র্যান্ডের সঙ্গে মানানসই অ্যাড তৈরি হবে—স্ট্যাটিক ও মোশন দুটোই। নিচেরটিই আসল এডিটর; একটি অ্যাড বানিয়ে দেখুন।",
    barUrl: "app.dakio.io/content/ads — Shahrqee (demo catalogue)",
    iframeTitle: "Ads Gallery — লাইভ",
    tryChips: [
      "পাশের তালিকা থেকে প্রোডাক্ট বাছুন",
      "Template-এ ট্যাপ করুন—লেখা ও ডিজাইন নিজে থেকেই বসবে",
      "1:1 / 4:5 / 9:16 বদলান",
      "Animate চেপে মোশন দেখুন",
      "Creative Doctor চালান",
    ],
    featsH2: "শুরু থেকেই আপনার ব্র্যান্ডের মতো। এক্সপোর্টের আগে যাচাই করা।",
    feats: ["10টি টেমপ্লেট + নিজের টেমপ্লেট", "Brand Engine — 11টি কালার রোল", "3 সাইজ, একবার এডিট", "5টি মোশন রেসিপি", "Creative Doctor যাচাই", "ব্যাকগ্রাউন্ড মুছে ফেলা", "আসল PNG এক্সপোর্ট", "বাংলা অ্যাড কপি"],
    noteBefore: "একই স্টোর থিম আপনার স্টোরফ্রন্ট ",
    noteEm: "আর",
    noteAfter: " অ্যাড—দুটোর ডিজাইন ঠিক রাখে। একবার সেটআপ করুন ",
    noteLink: "Store Studio",
    noteEnd: "-তে।",
    ctaH2: "আপনার পরের অ্যাড মাত্র এক ক্লিক দূরে।",
    ctaPrimary: "ফ্রিতে শুরু করুন—কার্ড লাগবে না",
  },

  frontOffice: {
    meta: {
      title: "Front Office — যে AI আপনার ইনবক্সেই বিক্রি করে | Dakio",
      description:
        "Messenger, Instagram, WhatsApp ও ইমেইলের কথোপকথন এক ইনবক্সে। Nova বাংলায় উত্তর দেয়, কাস্টমার নিশ্চিত করার পর অর্ডার নেয় এবং RTO কমায়।",
    },
    navCta: "Front Office খুলুন",
    h1: <>Nova বিক্রি করে<br />আপনার <Highlight>ইনবক্সেই</Highlight>।</>,
    sub: "Messenger, Instagram, WhatsApp ও ইমেইল—প্রতিটি কাস্টমারের কথা এক জায়গায়। Nova বাংলায় উত্তর দেয় এবং কাস্টমার সম্মতি দিলেই অর্ডার তৈরি করে। নিচেরটিই আসল Front Office।",
    barUrl: "app.dakio.io/inbox — Shahrqee (demo threads)",
    iframeTitle: "Front Office — লাইভ",
    tryChips: [
      "একটা NOVA HANDLING থ্রেড খুলুন",
      "Reply receipt খুলে প্রমাণ দেখুন",
      "পাশের Customer 360 দেখুন",
      "T0–T3 autonomy dial বদলান",
      "CONTEXT BRIEF হ্যান্ডওভার দেখুন",
    ],
    featsH2: "নিয়ম মেনে চলা একজন বিক্রয়কর্মী।",
    feats: ["Messenger · IG · WhatsApp · ইমেইল", "বাংলায় উত্তর, মানুষের স্বাভাবিক গতিতে", "কাস্টমার নিশ্চিত না করলে অর্ডার নয়", "RTO Shield — পাঠানোর আগে নিশ্চিত করা", "প্রয়োজনীয় তথ্যসহ আপনার কাছে পাঠায়", "আপনি সঙ্গে সঙ্গে কথোপকথনের দায়িত্ব নিতে পারেন", "EST ও MEASURED আলাদা থাকে", "প্রতিটি উত্তরের প্রমাণ"],
    hardLinesLabel: "যে নিয়ম কখনো ভাঙবে না:",
    ctaH2: <>মাঝরাতে আর “দাম কত?”<br />-এর উত্তর দিতে হবে না।</>,
    ctaPrimary: "Nova-কে ইনবক্সের দায়িত্ব দিন",
  },
};

export default playfirst;
