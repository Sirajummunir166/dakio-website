// Contact copy — English.

import Mark from "../../components/Mark";

const contact = {
  meta: {
    title: "Contact Dakio — Talk to a Human",
    description:
      "Questions or help? Reach the Dakio team in Dhaka — email, phone or the form. A human answers here; Nova only runs the stores.",
  },

  hero: {
    badge: "Contact",
    h1: <>Get in <Mark bottom={5} height={12}>touch</Mark></>,
    sub: "Questions, feedback, or need help? A human answers here — Nova only runs the stores.",
  },

  info: {
    hq: { label: "HQ", body: "House 5, Road 5, Priyanka City, Sector 12, Uttara, Dhaka" },
    registered: { label: "Registered office", body: "253-254, Dr. Kudrat-e-Khuda Road, (Kataban), Dhaka" },
    email: { label: "Email" },
    phone: { label: "Phone" },
  },

  promo: {
    title: "Start for free",
    body: "Open a free account — and appoint your CEO on day one. No card required.",
    cta: "Start free",
  },

  form: {
    title: "Send a message",
    name: { label: "Your name", placeholder: "Enter your name" },
    phone: { label: "Phone number", placeholder: "01XXXXXXXXX" },
    email: { label: "Email", placeholder: "email@example.com" },
    subject: { label: "Subject", placeholder: "What would you like to discuss?" },
    message: { label: "Message", placeholder: "Write your question or message..." },
    submit: "Send message",
    sentTitle: "Message sent",
    sentBody: "Thanks for reaching out — we'll get back to you within one business day.",
  },
};

export default contact;
