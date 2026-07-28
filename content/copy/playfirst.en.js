// Copy for the three play-first pages (Store Studio / Ads / Front Office) —
// English. They share one skeleton (components/PlayFirstPage.jsx), so they
// share one copy file.

import { Highlight } from "../../components/PlayFirstPage";

export const MONO = {
  try: "TRY",
  studio: {
    kicker: "STORE STUDIO · THIS IS THE REAL BUILDER, LIVE",
    live: "LIVE — GO AHEAD, CLICK THINGS",
    ctaStrip: "LIVE CANVAS · THEME GALLERY · বাংলা FONTS · EVERYTHING UNDOABLE",
  },
  ads: {
    kicker: "ADS GALLERY · THE REAL EDITOR, LIVE",
    live: "LIVE — MAKE AN AD",
    ctaStrip: "3 SIZES · STATIC + MOTION · CREATIVE DOCTOR ✓ · REAL PNG EXPORT",
  },
  frontOffice: {
    kicker: "FRONT OFFICE · THE REAL INBOX, LIVE",
    live: "LIVE — READ THE THREADS",
    hardLines: "NO ORDER WITHOUT CONSENT · REFUNDS FOUNDER-ONLY · “BOT NAKI?” → HONEST ANSWER",
    ctaStrip: "STARTS IN SHADOW MODE · YOU PROMOTE IT · TAKE OVER ANY THREAD, INSTANTLY",
  },
};

const playfirst = {
  shared: {
    fullScreen: "Full screen",
    back: "Back to Dakio",
  },

  studio: {
    meta: {
      title: "Store Studio — Design a Storefront Without a Developer | Dakio",
      description:
        "Edit the real storefront live: theme gallery, Bangla fonts, dark mode, one-tap looks. You can't break anything — Undo is right there. Try the live builder.",
    },
    navCta: "Open Store Studio",
    h1: <>Don&apos;t read about it.<br /><Highlight>Design</Highlight>.</>,
    sub: "Below is Store Studio itself — theme it, edit the headlines, reorder sections, flip it dark. You can't break anything; Undo is right there.",
    barUrl: "app.dakio.io/studio — Shahrqee (demo store)",
    iframeTitle: "Store Studio — live",
    tryChips: [
      "Theme tab → tap a gallery look",
      "Click a headline & type",
      "Flip dark storefront on",
      "Switch to mobile preview",
      "Then hit Undo",
    ],
    featsH2: "Everything you just touched ships with every store.",
    feats: ["Theme Studio", "Theme gallery", "বাংলা font packs", "Dark storefront", "14 section types", "Inline editing", "Mobile control", "Undo & versions"],
    note: "No developer, no theme marketplace, no publish anxiety — the canvas is the store.",
    ctaH2: <>Liked the demo store?<br />Make yours.</>,
    ctaPrimary: "Start free — no card",
  },

  ads: {
    meta: {
      title: "Ads Gallery — Pick a Product, Get the Ad | Dakio",
      description:
        "One click turns any product into an editable, on-brand ad in 3 sizes, static and motion — checked by the Creative Doctor before it ships. In Bangla too.",
    },
    navCta: "Open Ads Gallery",
    h1: <>Pick a product.<br /><Highlight>Get the ad</Highlight>.</>,
    sub: "One click fills a fully editable, on-brand ad in three sizes — static and motion. Below is the actual editor. Make one.",
    barUrl: "app.dakio.io/content/ads — Shahrqee (demo catalogue)",
    iframeTitle: "Ads Gallery — live",
    tryChips: [
      "Pick a product from the rail",
      "Tap a template — it fills itself",
      "Switch 1:1 / 4:5 / 9:16",
      "Hit Animate → play a motion recipe",
      "Run the Creative Doctor",
    ],
    featsH2: "On-brand by default. Checked before it ships.",
    feats: ["10 templates + your own", "Brand engine — 11 color roles", "3 sizes, one edit", "5 motion recipes", "Creative Doctor checks", "Background removal", "Real PNG export", "বাংলা ad text"],
    noteBefore: "One store theme powers your storefront ",
    noteEm: "and",
    noteAfter: " your ads — set it once in ",
    noteLink: "Store Studio",
    noteEnd: ".",
    ctaH2: "Your next ad is one click in.",
    ctaPrimary: "Start free — no card",
  },

  frontOffice: {
    meta: {
      title: "Front Office — AI That Sells in Your Inbox | Dakio",
      description:
        "Messenger, Instagram, WhatsApp and email in one thread. Nova answers in Bangla, takes orders only after the customer confirms, and cuts RTO. You can take over anytime.",
    },
    navCta: "Open Front Office",
    h1: <>Nova sells<br />in your <Highlight>inbox</Highlight>.</>,
    sub: "Messenger, Instagram, WhatsApp, email — one thread each, Nova answering in Bangla, taking orders only after the customer says yes. Below is the real thing.",
    barUrl: "app.dakio.io/inbox — Shahrqee (demo threads)",
    iframeTitle: "Front Office — live",
    tryChips: [
      "Open a NOVA HANDLING thread",
      "Expand a receipt row on a reply",
      "Check the customer 360 rail",
      "Flip the autonomy dial T0–T3",
      "See a CONTEXT BRIEF handover",
    ],
    featsH2: "A salesperson with rules it can't break.",
    feats: ["Messenger · IG · WhatsApp · Email", "Replies in Bangla, human pacing", "Orders only after “hae, confirm”", "RTO Shield — pre-dispatch confirm", "Escalates with a context brief", "You take over instantly", "EST vs MEASURED, never summed", "Every reply receipted"],
    hardLinesLabel: "Hard lines, forever:",
    ctaH2: <>Stop answering &quot;dam koto?&quot;<br />at midnight.</>,
    ctaPrimary: "Put Nova on the desk",
  },
};

export default playfirst;
