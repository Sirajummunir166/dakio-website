// Blog chrome copy — English. The articles themselves are Bangla-native (see
// lib/blog.js), so the English page is a doorway to them, not a translation of
// them: the chrome is English, the post titles and excerpts stay as written.

import Mark from "../../components/Mark";

const blog = {
  meta: {
    title: "Dakio Blog — ই-কমার্স গ্রোথ গাইড ও রিসোর্স",
    description:
      "Practical guides in Bangla and English on selling online in Bangladesh: COD, couriers, bKash, Facebook selling and growing with an AI CEO.",
  },

  hero: {
    badge: "Blog",
    h1: <>Resources &amp; <Mark bottom={5} height={12}>Insights</Mark></>,
    sub: "ই-কমার্স ব্যবসা বাড়ানোর টিপস, গাইড এবং কৌশল — সরাসরি Dakio টিম থেকে।",
  },

  filterAll: "সব",
  read: "পড়ুন",
  minRead: "min read",
  min: "min",

  cta: {
    h2: "পড়া শেষ? এবার শুরু করুন।",
    p: "ফ্রি অ্যাকাউন্ট খুলুন — কোনো ক্রেডিট কার্ড লাগবে না।",
    button: "Start selling free",
  },

  post: {
    back: "সব লেখা",
    author: "Dakio টিম",
    minRead: "মিনিট পড়া",
    related: "আরও পড়ুন",
    allPosts: "সব লেখা",
  },
};

export default blog;
