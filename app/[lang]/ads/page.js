// Ads Gallery — 1:1 port of "Dakio Ads Page.dc.html".

import PlayFirstPage, { Highlight } from "../../../components/PlayFirstPage";

export const metadata = {
  title: "Ads Gallery — Pick a Product, Get the Ad | Dakio",
  description:
    "One click turns any product into an editable, on-brand ad in 3 sizes, static and motion — checked by the Creative Doctor before it ships. In Bangla too.",
  alternates: { canonical: "/ads" },
};

const PROTO = "/prototypes/Dakio Nova Motion Ads.dc.html";

export default function AdsPage() {
  return (
    <PlayFirstPage
      route="/ads"
      active="ads"
      navCtaHref={PROTO}
      navCtaLabel="Open Ads Gallery"
      kicker="ADS GALLERY · THE REAL EDITOR, LIVE"
      h1={<>Pick a product.<br /><Highlight>Get the ad</Highlight>.</>}
      h1MaxWidth={720}
      sub="One click fills a fully editable, on-brand ad in three sizes — static and motion. Below is the actual editor. Make one."
      subMaxWidth={470}
      barUrl="app.dakio.io/content/ads — Shahrqee (demo catalogue)"
      liveLabel="LIVE — MAKE AN AD"
      iframeSrc={PROTO}
      iframeTitle="Ads Gallery — live"
      tryChips={[
        "Pick a product from the rail",
        "Tap a template — it fills itself",
        "Switch 1:1 / 4:5 / 9:16",
        "Hit Animate → play a motion recipe",
        "Run the Creative Doctor",
      ]}
      featsH2="On-brand by default. Checked before it ships."
      featsH2MaxWidth={700}
      feats={["10 templates + your own", "Brand engine — 11 color roles", "3 sizes, one edit", "5 motion recipes", "Creative Doctor checks", "Background removal", "Real PNG export", "বাংলা ad text"]}
      featsMaxWidth={880}
      featsNote={
        <div data-reveal style={{ marginTop: 20, fontSize: 13, color: "#6B6D60" }}>
          One store theme powers your storefront <i>and</i> your ads — set it once in{" "}
          <a href="/store-studio" style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>Store Studio</a>.
        </div>
      }
      ctaH2="Your next ad is one click in."
      ctaH2MaxWidth={720}
      ctaPrimaryLabel="Start free — no card"
      ctaMonoLine="3 SIZES · STATIC + MOTION · CREATIVE DOCTOR ✓ · REAL PNG EXPORT"
    />
  );
}
