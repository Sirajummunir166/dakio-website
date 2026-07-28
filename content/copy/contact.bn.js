// Contact copy — Bangla. Addresses stay as registered; the form placeholders
// are what a Bangladeshi merchant would expect to see in a form.

import Mark from "../../components/Mark";

const contact = {
  meta: {
    title: "Dakio-র সাথে যোগাযোগ — ঢাকায় একজন মানুষই উত্তর দেন",
    description:
      "প্রশ্ন, মতামত বা দোকান নিয়ে সাহায্য দরকার? উত্তরার Dakio টিমের সাথে ফোনে, ইমেইলে বা ফর্মে যোগাযোগ করুন। উত্তর দেন একজন মানুষ।",
  },

  hero: {
    badge: "যোগাযোগ",
    h1: <>একটু <Mark bottom={5} height={12}>কথা</Mark> বলি</>,
    sub: "প্রশ্ন, মতামত, নাকি সাহায্য দরকার? এখানে উত্তর দেন একজন মানুষ — Nova শুধু দোকান চালায়।",
  },

  info: {
    hq: { label: "প্রধান কার্যালয়", body: "House 5, Road 5, Priyanka City, Sector 12, Uttara, Dhaka" },
    registered: { label: "নিবন্ধিত কার্যালয়", body: "253-254, Dr. Kudrat-e-Khuda Road, (Kataban), Dhaka" },
    email: { label: "ইমেইল" },
    phone: { label: "ফোন" },
  },

  promo: {
    title: "ফ্রিতে শুরু করুন",
    body: "একটা ফ্রি অ্যাকাউন্ট খুলুন — আর প্রথম দিনেই CEO নিয়োগ দিন। কার্ড লাগে না।",
    cta: "ফ্রি শুরু করুন",
  },

  form: {
    title: "মেসেজ পাঠান",
    name: { label: "আপনার নাম", placeholder: "নাম লিখুন" },
    phone: { label: "ফোন নম্বর", placeholder: "01XXXXXXXXX" },
    email: { label: "ইমেইল", placeholder: "email@example.com" },
    subject: { label: "বিষয়", placeholder: "কী নিয়ে কথা বলতে চান?" },
    message: { label: "মেসেজ", placeholder: "আপনার প্রশ্ন বা মেসেজ লিখুন..." },
    submit: "মেসেজ পাঠান",
    sentTitle: "মেসেজ চলে গেছে",
    sentBody: "যোগাযোগ করার জন্য ধন্যবাদ — এক কর্মদিবসের মধ্যেই আমরা ফিরে আসছি।",
  },
};

export default contact;
