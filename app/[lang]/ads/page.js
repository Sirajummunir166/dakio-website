// Ads Gallery — 1:1 port of "Dakio Ads Page.dc.html", localized.

import PlayFirstPage from "../../../components/PlayFirstPage";
import pfEn, { MONO } from "../../../content/copy/playfirst.en";
import pfBn from "../../../content/copy/playfirst.bn";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";

const COPY = { en: pfEn, bn: pfBn };
const ROUTE = "/ads";
const PROTO = "/prototypes/Dakio Nova Motion Ads.dc.html";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = (COPY[lang] || COPY.en).ads;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function AdsPage({ params }) {
  const { lang } = await params;
  const pack = COPY[lang] || COPY.en;
  const c = pack.ads;
  const T = type(lang);

  return (
    <PlayFirstPage
      lang={lang}
      shared={pack.shared}
      route={ROUTE}
      active="ads"
      navCtaHref={PROTO}
      navCtaLabel={c.navCta}
      kicker={MONO.ads.kicker}
      h1={c.h1}
      h1MaxWidth={720}
      sub={c.sub}
      subMaxWidth={470}
      barUrl={c.barUrl}
      liveLabel={MONO.ads.live}
      iframeSrc={PROTO}
      iframeTitle={c.iframeTitle}
      tryLabel={MONO.try}
      tryChips={c.tryChips}
      featsH2={c.featsH2}
      featsH2MaxWidth={700}
      feats={c.feats}
      featsMaxWidth={880}
      featsNote={
        <div data-reveal style={{ marginTop: 20, fontSize: 13, color: "#6B6D60", ...T.small }}>
          {c.noteBefore}<i>{c.noteEm}</i>{c.noteAfter}
          <a href={href(lang, "/store-studio")} style={{ fontWeight: 700, color: "#1A1D12", borderBottom: "2px solid #C6F035", paddingBottom: 1 }}>{c.noteLink}</a>{c.noteEnd}
        </div>
      }
      ctaH2={c.ctaH2}
      ctaH2MaxWidth={720}
      ctaPrimaryLabel={c.ctaPrimary}
      ctaMonoLine={MONO.ads.ctaStrip}
    />
  );
}
