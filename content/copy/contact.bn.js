// Contact copy — Bangla. Addresses stay as registered; the form placeholders
// are what a Bangladeshi merchant would expect to see in a form.

import Mark from "../../components/Mark";

const contact = {
  meta: {
    title: "Dakio-র সঙ্গে যোগাযোগ করুন | ঢাকা, বাংলাদেশ",
    description:
      "প্রশ্ন, মতামত বা স্টোর নিয়ে সহায়তা দরকার? ফোন, ইমেইল অথবা ফর্মের মাধ্যমে ঢাকার Dakio টিমের সঙ্গে যোগাযোগ করুন।",
  },

  hero: {
    badge: "যোগাযোগ",
    h1: <>চলুন, <Mark bottom={5} height={12}>কথা</Mark> বলি</>,
    sub: "প্রশ্ন, মতামত বা কোনো সহায়তা দরকার? এখানে মানুষই উত্তর দেয়—Nova শুধু আপনার স্টোর চালায়।",
  },

  info: {
    hq: { label: "প্রধান কার্যালয়", body: "House 5, Road 5, Priyanka City, Sector 12, Uttara, Dhaka" },
    registered: { label: "নিবন্ধিত কার্যালয়", body: "253-254, Dr. Kudrat-e-Khuda Road, (Kataban), Dhaka" },
    email: { label: "ইমেইল" },
    phone: { label: "ফোন" },
  },

  promo: {
    title: "ফ্রিতে স্টোর খুলুন",
    body: "ফ্রি অ্যাকাউন্ট খুলে প্রথম দিন থেকেই Nova-কে কাজে লাগান। কোনো কার্ড লাগবে না।",
    cta: "ফ্রিতে শুরু করুন",
  },

  form: {
    title: "মেসেজ পাঠান",
    name: { label: "আপনার নাম", placeholder: "নাম লিখুন" },
    phone: { label: "ফোন নম্বর", placeholder: "01XXXXXXXXX" },
    email: { label: "ইমেইল", placeholder: "email@example.com" },
    subject: { label: "বিষয়", placeholder: "কী নিয়ে কথা বলতে চান?" },
    message: { label: "মেসেজ", placeholder: "আপনার প্রশ্ন বা মেসেজ লিখুন..." },
    submit: "মেসেজ পাঠান",
    sentTitle: "মেসেজ পাঠানো হয়েছে",
    sentBody: "ধন্যবাদ। এক কর্মদিবসের মধ্যে আমাদের টিম আপনার সঙ্গে যোগাযোগ করবে।",
  },
};

export default contact;
