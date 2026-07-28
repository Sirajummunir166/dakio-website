// Grow Labs copy — English.

import Mark from "../../components/Mark";

export const MONO = {
  heroBadge: "GROW LABS · THE BUSINESS GROW STUDIO",
  chartTitle: "SHAHRQEE · REVENUE, ONE QUARTER",
  chartLegendGrey: "— YOU, DOING EVERYTHING",
  chartLegendLime: "— YOU + NOVA",
  chartAxis: ["APRIL", "EID RAMP", "JUNE"],
  midnightKicker: "SAME SHOP · SAME MIDNIGHT",
  aloneStamp: "11:47 PM — YOU, ALONE",
  aloneFoot: "GROWTH TODAY: WHATEVER ENERGY WAS LEFT",
  novaStamp: "11:47 PM — NOVA IN THE STUDIO",
  novaFoot: "GROWTH TONIGHT: ৳9,200 · READY FOR YOUR 06:00 BRIEF",
  leversKicker: "SIX LEVERS, ONE STUDIO",
  leverJobs: ["PROMOTE", "CREATE", "REACH", "DISCOVER", "IMPROVE", "LEAD"],
  loopKicker: "WHY THE CURVE BENDS",
  loopNotes: ["THE NEXT WINNER", "ON THE SEASON", "REPEAT BUYERS", "PRICE & MARGIN", "NEXT TARGET"],
  loopRepeat: "REPEATS EVERY NIGHT",
  statsFoot: "SHAHRQEE DEMO STORE · ONE QUARTER · EVERY NUMBER TRACES TO A RECEIPT",
  ctaStrip: "SIX LEVERS · NOVA ON THE NIGHT SHIFT · EVERYTHING REVERSIBLE",
  receipt: "RECEIPT",
  waiting: "WAITING ON YOU",
};

const grow = {
  meta: {
    title: "Grow Labs — The Business Grow Studio | Dakio",
    description:
      "Six growth levers — campaigns, content, reach, research, pricing, goals — pulled professionally by Nova while you sleep. See the curve bend.",
  },

  navCta: "Appoint Nova",

  hero: {
    h1: (
      <>
        Growth you never <Mark>dared</Mark> to plan.
      </>
    ),
    sub: "Campaigns, content, reach, research, pricing, goals — six growth levers in one studio. You pull them by hand, or Nova pulls them around the clock.",
    ctaPrimary: "Start growing free",
    ctaSecondary: "See it live",
    pins: ["Cart won back · ৳2,300", "Reel hit 7:30 PM slot", "Eid campaign scaled", "Best month ever"],
    chartNote: "Demo store, one quarter in the Grow Studio. The grey line is the same shop without it.",
  },

  midnight: {
    h2: "The growth happens while you sleep.",
    aloneMood: "😮‍💨 still at the desk",
    novaMood: "you: asleep 😴",
    alone: [
      "23 unread DMs — “dam koto?” ×9",
      "Tomorrow's post: still undecided",
      "Ad running on a guess since Tuesday",
      "4 carts abandoned today, quietly",
      "Eid plan: “next week, inshallah”",
    ],
    withNova: [
      { t: "Replied to all 23 DMs, in Bangla", waiting: false },
      { t: "Tomorrow's reel scheduled — 7:30 PM", waiting: false },
      { t: "Weak ad set paused, budget shifted", waiting: false },
      { t: "3 carts recovered · ৳6,900", waiting: false },
      { t: "Eid playbook drafted — for your approval", waiting: true },
    ],
  },

  levers: {
    h2: "Every lever, pulled professionally.",
    p: "What you used to improvise at midnight, the studio runs like a marketing team — and Nova runs the studio.",
    nowLabel: "Now:",
    items: [
      { n: "Campaigns", before: "Boosted a post the night before Eid.", after: "The season is planned on a quarter Gantt — Eid, Puja, 11.11 — three weeks ahead.", from: "ROAS 1.2×", to: "ROAS 3.4×" },
      { n: "Content", before: "Posted whenever you remembered.", after: "A month of posts slotted at the hours your buyers actually scroll.", from: "REACH 900", to: "REACH 4,200" },
      { n: "Broadcast", before: "Mass-forwarded on WhatsApp, hoped.", after: "38 lapsed buyers, one targeted message, cool-off protected.", from: "REPEAT 5/MO", to: "REPEAT 19/MO" },
      { n: "Research", before: "Copied competitors after the trend peaked.", after: "Demand curves spot the next winner six weeks early, supplier margins attached.", from: "FOLLOWER", to: "FIRST MOVER" },
      { n: "Growth", before: "Gut-feel discounts when sales dipped.", after: "Every opportunity comes with evidence, math and risk — Apply or Not now.", from: "GUESSING", to: "৳1,14,200 BACK" },
      { n: "Goals", before: "Checked sales at midnight, felt anxious.", after: "Pace, forecast and the exact lever that closes the gap — named.", from: "HOPE", to: "ON TRACK 9/12" },
    ],
  },

  loop: {
    h2: "The levers hand off. The growth compounds.",
    steps: ["Research finds it", "Campaigns launch it", "Broadcast brings them back", "Growth sharpens it", "Goals re-aim"],
    stats: [
      { v: "+38%", l: "revenue vs last quarter" },
      { v: "৳1,14,200", l: "recovered by Growth" },
      { v: "0", l: "stockouts in Eid week" },
      { v: "6h 40m", l: "founder hours saved daily" },
    ],
  },

  cta: {
    h2: "Your curve is still the grey one.",
    primary: "Bend it — start free",
    secondary: "Open the Grow Studio",
  },
};

export default grow;
