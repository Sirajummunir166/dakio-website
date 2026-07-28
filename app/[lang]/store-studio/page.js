// Store Studio — 1:1 port of "Dakio Store Studio Page.dc.html", localized.

import PlayFirstPage from "../../../components/PlayFirstPage";
import pfEn, { MONO } from "../../../content/copy/playfirst.en";
import pfBn from "../../../content/copy/playfirst.bn";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";

const COPY = { en: pfEn, bn: pfBn };
const ROUTE = "/store-studio";
const PROTO = "/prototypes/Dakio Store Studio.dc.html";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = (COPY[lang] || COPY.en).studio;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function StoreStudioPage({ params }) {
  const { lang } = await params;
  const pack = COPY[lang] || COPY.en;
  const c = pack.studio;
  const T = type(lang);

  return (
    <PlayFirstPage
      lang={lang}
      shared={pack.shared}
      route={ROUTE}
      active="store-studio"
      navCtaHref={PROTO}
      navCtaLabel={c.navCta}
      kicker={MONO.studio.kicker}
      h1={c.h1}
      h1MaxWidth={720}
      sub={c.sub}
      subMaxWidth={460}
      barUrl={c.barUrl}
      liveLabel={MONO.studio.live}
      iframeSrc={PROTO}
      iframeTitle={c.iframeTitle}
      tryLabel={MONO.try}
      tryChips={c.tryChips}
      featsH2={c.featsH2}
      featsH2MaxWidth={640}
      feats={c.feats}
      featsMaxWidth={840}
      featsNote={<div data-reveal style={{ marginTop: 20, fontSize: 13, color: "#6B6D60", ...T.small }}>{c.note}</div>}
      ctaH2={c.ctaH2}
      ctaH2MaxWidth={700}
      ctaPrimaryLabel={c.ctaPrimary}
      ctaMonoLine={MONO.studio.ctaStrip}
    />
  );
}
