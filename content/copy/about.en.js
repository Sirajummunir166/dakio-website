// About copy — English. The About/Blog/Contact family uses sentence-case
// section labels rather than mono kickers, so these do get translated.

import Mark from "../../components/Mark";

const about = {
  meta: {
    title: "About Dakio | Built in Bangladesh by Digidhaka",
    description:
      "We started by giving Bangladesh's entrepreneurs world-class tools, then a team: every Dakio store gets Nova, an AI CEO, on day one. Now open to businesses everywhere.",
  },

  hero: {
    badge: "Digidhaka Communication Limited",
    h1: <>Meet <Mark>Dakio</Mark></>,
    sub: (
      <>
        We started by giving Bangladesh&apos;s entrepreneurs world-class tools. Then we realized tools weren&apos;t the real gap: <b style={{ color: "#1A1D12" }}>a team was</b>. So every Dakio store now comes with an AI CEO, and Dakio is open to businesses everywhere.
      </>
    ),
    ctaPrimary: "Open your store",
    ctaSecondary: "Get in touch",
  },

  stats: [
    { v: "1,000+", l: "Active Merchants" },
    { v: "100K+", l: "Orders Processed" },
    { v: "৳50Cr+", l: "GMV on Platform" },
    { v: "64", l: "Districts Reached" },
  ],

  story: {
    label: "Our story",
    h2: (
      <>
        Built in Bangladesh, <Mark bottom={3} height={11}>for the world.</Mark>
      </>
    ),
    paras: [
      "Dakio started with a simple observation: merchants in Bangladesh were stitching together five or six different tools just to run a basic online store. One for orders. One for couriers. One for payments. One for products. One for customers. None of them talking to each other.",
      "The founders of Digidhaka Communication Limited had worked closely with hundreds of local merchants and saw this problem up close. These merchants were smart, hardworking, and determined. But the tools available to them were either built for foreign markets, too expensive, or too complicated to use.",
      "So we built Dakio. One platform that handles everything a merchant needs, from the first product listing to the thousandth order delivery, with integrations built for Bangladesh first: bKash, Nagad, Pathao, RedX, Steadfast and more.",
      <>
        And then we went further. Tools solve the evening&apos;s work; they don&apos;t solve running a whole business alone. So we built <b style={{ color: "#1A1D12" }}>Nova</b>, an AI CEO every store gets on day one. Nova runs the day to day, inside limits the founder sets, with a receipt for everything it touches.
      </>,
      "Today, more than 1,000 merchants across Bangladesh's 64 districts run their businesses on Dakio, and none of them run alone. Now we are opening Dakio to businesses in every country.",
    ],
  },

  mission: {
    label: "Our mission",
    h2: "Give every merchant the team that was only available to big brands.",
    p: "A small business in Khulna, Lagos or Lima deserves what a funded company has: a marketing team, a support desk, an operations lead. Dakio levels the field with one appointment: Nova. The best product wins, not the best-staffed one.",
    points: [
      "Make powerful business tools simple enough for a first-time owner.",
      "Integrate the platforms merchants actually use in their own country, not just the global ones.",
      "Keep pricing honest. No hidden fees. No surprise charges.",
      "Make AI accountable: every Nova action carries a receipt and stays inside your limits.",
    ],
  },

  values: {
    label: "What we stand for",
    h2: "Our values",
    items: [
      { t: "Merchants first", d: "Every feature we build starts with one question: does this make life easier for a merchant? If the answer is no, we don't build it." },
      { t: "Zero friction", d: "A merchant shouldn't need a developer, an IT team, or a manual to run their business. Dakio handles the complexity so they can focus on their customers." },
      { t: "Local where it matters", d: "In Bangladesh we work with bKash, Nagad, Pathao, RedX and Steadfast, the services merchants there actually use. Each new country gets what its merchants use, not one size for all." },
      { t: "Trust through transparency", d: "No hidden fees, no surprise charges. Merchants see exactly what they're paying, what they're getting, and what they're earning." },
    ],
  },

  contact: {
    label: "Find us",
    h2: "Get in touch",
    hq: { label: "HQ", body: <>House 5, Road 5, Priyanka City,<br />Sector 12, Uttara, Dhaka</> },
    registered: { label: "Registered office", body: <>253-254, Dr. Kudrat-e-Khuda Road,<br />(Kataban), Dhaka</> },
    email: { label: "Email" },
    phone: { label: "Phone" },
    send: "Send a message",
  },

  cta: {
    h2: "Join 1,000+ merchants who don't run alone.",
    p: "Open your store today — and appoint your CEO on day one. No setup fee.",
    primary: "Open your store",
    secondary: "Meet Nova",
  },
};

export default about;
