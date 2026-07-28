// Front Office — 1:1 port of "Dakio Front Office Page.dc.html", localized.

import PlayFirstPage from "../../../components/PlayFirstPage";
import pfEn, { MONO } from "../../../content/copy/playfirst.en";
import pfBn from "../../../content/copy/playfirst.bn";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";

const COPY = { en: pfEn, bn: pfBn };
const ROUTE = "/front-office";
const MONOFONT = "var(--dk-font-mono), monospace";
const PROTO = "/prototypes/Nova Inbox - Front Office.dc.html";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = (COPY[lang] || COPY.en).frontOffice;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function FrontOfficePage({ params }) {
  const { lang } = await params;
  const pack = COPY[lang] || COPY.en;
  const c = pack.frontOffice;
  const T = type(lang);

  return (
    <PlayFirstPage
      lang={lang}
      shared={pack.shared}
      route={ROUTE}
      active="front-office"
      navCtaHref={PROTO}
      navCtaLabel={c.navCta}
      kicker={MONO.frontOffice.kicker}
      h1={c.h1}
      h1MaxWidth={760}
      sub={c.sub}
      subMaxWidth={490}
      barUrl={c.barUrl}
      liveLabel={MONO.frontOffice.live}
      iframeSrc={PROTO}
      iframeTitle={c.iframeTitle}
      tryLabel={MONO.try}
      tryChips={c.tryChips}
      featsH2={c.featsH2}
      featsH2MaxWidth={700}
      feats={c.feats}
      featsMaxWidth={900}
      featsNote={
        <div data-reveal className="m-wrap" style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 99, background: "#1A1D12", color: "#F0EFE6", fontSize: 13, fontWeight: 600, ...T.label }}>
          {c.hardLinesLabel}&nbsp;<span style={{ fontFamily: MONOFONT, fontSize: 10, letterSpacing: "0.08em", color: "#C6F035" }}>{MONO.frontOffice.hardLines}</span>
        </div>
      }
      ctaH2={c.ctaH2}
      ctaH2MaxWidth={760}
      ctaPrimaryLabel={c.ctaPrimary}
      ctaMonoLine={MONO.frontOffice.ctaStrip}
    />
  );
}
