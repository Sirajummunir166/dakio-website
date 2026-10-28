// For shops. The home sections with the switch fixed on Products, plus what
// only shops need (HOME_COPY.md, "For shops").

import "../../home.css";
import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { AudienceRoot } from "../../../components/home/Audience";
import { Hero, Works, Run, RealApp, Contrast, Parts, Flow, Setup, Charge, Pricing, Faq, Closing, ShopExtras } from "../../../components/home/HomeSections";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import homeEn, { MARQUEE as MARQUEE_EN } from "../../../content/copy/home.en";
import homeBn, { MARQUEE as MARQUEE_BN } from "../../../content/copy/home.bn";
import { getHomePricing } from "../../../lib/plans";

const COPY = { en: homeEn, bn: homeBn };
const MARQUEE = { en: MARQUEE_EN, bn: MARQUEE_BN };
const ROUTE = "/shops";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = (COPY[lang] || COPY.en).shops;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function ShopsPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const T = type(lang);
  const L = p => href(lang, p);
  const pricing = await getHomePricing(lang);

  return (
    <AudienceRoot initial="shop">
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />
      <Nav lang={lang} route={ROUTE} active="shops" style={{ position: "sticky", top: 0, zIndex: 60 }} />
      <Hero c={c} lang={lang} L={L} head={c.shops} />
      <Works c={c} marquee={MARQUEE[lang] || MARQUEE_EN} />
      <Run c={c} />
      <RealApp c={c} />
      <Contrast c={c} />
      <Flow c={c} />
      <ShopExtras c={c} />
      <Parts c={c} L={L} />
      <Setup c={c} />
      <Charge c={c} />
      <Pricing c={c} pricing={pricing} T={T} L={L} />
      <Faq c={c} />
      <Closing c={c} heading={c.shops.closing} />
      <Footer lang={lang} />
    </AudienceRoot>
  );
}
