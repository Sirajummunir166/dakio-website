// Store Studio — 1:1 port of "Dakio Store Studio Page.dc.html".

import PlayFirstPage, { Highlight } from "../../../components/PlayFirstPage";

export const metadata = {
  title: "Store Studio — Design a Storefront Without a Developer | Dakio",
  description:
    "Edit the real storefront live: theme gallery, Bangla fonts, dark mode, one-tap looks. You can't break anything — Undo is right there. Try the live builder.",
  alternates: { canonical: "/store-studio" },
};

const PROTO = "/prototypes/Dakio Store Studio.dc.html";

export default function StoreStudioPage() {
  return (
    <PlayFirstPage
      route="/store-studio"
      active="store-studio"
      navCtaHref={PROTO}
      navCtaLabel="Open Store Studio"
      kicker="STORE STUDIO · THIS IS THE REAL BUILDER, LIVE"
      h1={<>Don&apos;t read about it.<br /><Highlight>Design</Highlight>.</>}
      h1MaxWidth={720}
      sub="Below is Store Studio itself — theme it, edit the headlines, reorder sections, flip it dark. You can't break anything; Undo is right there."
      subMaxWidth={460}
      barUrl="app.dakio.io/studio — Shahrqee (demo store)"
      liveLabel="LIVE — GO AHEAD, CLICK THINGS"
      iframeSrc={PROTO}
      iframeTitle="Store Studio — live"
      tryChips={[
        "Theme tab → tap a gallery look",
        "Click a headline & type",
        "Flip dark storefront on",
        "Switch to mobile preview",
        "Then hit Undo",
      ]}
      featsH2="Everything you just touched ships with every store."
      featsH2MaxWidth={640}
      feats={["Theme Studio", "Theme gallery", "বাংলা font packs", "Dark storefront", "14 section types", "Inline editing", "Mobile control", "Undo & versions"]}
      featsMaxWidth={840}
      featsNote={<div data-reveal style={{ marginTop: 20, fontSize: 13, color: "#6B6D60" }}>No developer, no theme marketplace, no publish anxiety — the canvas is the store.</div>}
      ctaH2={<>Liked the demo store?<br />Make yours.</>}
      ctaH2MaxWidth={700}
      ctaPrimaryLabel="Start free — no card"
      ctaMonoLine="LIVE CANVAS · THEME GALLERY · বাংলা FONTS · EVERYTHING UNDOABLE"
    />
  );
}
