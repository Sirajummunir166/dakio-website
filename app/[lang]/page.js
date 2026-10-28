// Home. Nova as the AI manager for the whole business (HOME_COPY.md).
// Copy lives in content/copy/home.<lang>.js; the sections are shared with
// /shops and /services (components/home/HomeSections.jsx, styles in app/home.css).

import "../home.css";
import { Nav, Footer } from "../../components/Chrome";
import Reveal from "../../components/Reveal";
import LogoDefs from "../../components/Logo";
import PageJsonLd from "../../components/PageJsonLd";
import { AudienceRoot } from "../../components/home/Audience";
import { Hero, Works, Run, Contrast, Parts, Flow, Setup, Charge, Pricing, Faq, Closing } from "../../components/home/HomeSections";
import { href, languageAlternates } from "../../lib/i18n";
import { type } from "../../lib/type";
import homeEn, { MARQUEE as MARQUEE_EN } from "../../content/copy/home.en";
import homeBn, { MARQUEE as MARQUEE_BN } from "../../content/copy/home.bn";
import { getHomePricing, getJsonLdOffers } from "../../lib/plans";

const COPY = { en: homeEn, bn: homeBn };
const MARQUEE = { en: MARQUEE_EN, bn: MARQUEE_BN };

// The pricing strip and the JSON-LD offers read live prices from the API (see
// lib/plans.js), so this page revalidates instead of being frozen at build time.
export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, "/"), languages: languageAlternates("/") },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);
  const [pricing, offers] = await Promise.all([getHomePricing(lang), getJsonLdOffers(lang)]);

  return (
    <AudienceRoot initial="shop">
      <PageJsonLd route="/" lang={lang} offers={offers} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />
      <Nav lang={lang} route="/" active="home" style={{ position: "sticky", top: 0, zIndex: 60 }} />
      <Hero c={c} lang={lang} L={L} />
      <Works c={c} marquee={MARQUEE[lang] || MARQUEE_EN} />
      <Run c={c} />
      <Contrast c={c} />
      <Parts c={c} L={L} />
      <Flow c={c} />
      <Setup c={c} />
      <Charge c={c} />
      <Pricing c={c} pricing={pricing} T={T} L={L} />
      <Faq c={c} />
      <Closing c={c} />
      <Footer lang={lang} />
    </AudienceRoot>
  );
}
