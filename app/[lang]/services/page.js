// For services. Not the home page again: the hero, then the owner's worries as
// chips and one angle per worry, each answered with a real app screen
// (components/home/Angles.jsx), then pricing, questions and the closing.

import "../../home.css";
import "../../angles.css";
import { Nav, Footer } from "../../../components/Chrome";
import Reveal from "../../../components/Reveal";
import LogoDefs from "../../../components/Logo";
import PageJsonLd from "../../../components/PageJsonLd";
import { AudienceRoot } from "../../../components/home/Audience";
import { Hero, Pricing, Faq, Closing } from "../../../components/home/HomeSections";
import { Worries, Angles } from "../../../components/home/Angles";
import { href, languageAlternates } from "../../../lib/i18n";
import { type } from "../../../lib/type";
import homeEn from "../../../content/copy/home.en";
import homeBn from "../../../content/copy/home.bn";
import anglesEn from "../../../content/copy/angles.en";
import anglesBn from "../../../content/copy/angles.bn";
import { getHomePricing } from "../../../lib/plans";

const COPY = { en: homeEn, bn: homeBn };
const ANGLES = { en: anglesEn, bn: anglesBn };
const ROUTE = "/services";

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = (COPY[lang] || COPY.en).services;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  const x = (ANGLES[lang] || ANGLES.en).services;
  const T = type(lang);
  const L = p => href(lang, p);
  const pricing = await getHomePricing(lang);

  return (
    <AudienceRoot initial="svc" switchable={false}>
      <PageJsonLd route={ROUTE} lang={lang} />
      <Reveal />
      <LogoDefs mkId="mk" wmId="wm" />
      <Nav lang={lang} route={ROUTE} active="services" style={{ position: "sticky", top: 0, zIndex: 60 }} />
      <Hero c={c} lang={lang} L={L} head={c.services} />
      <Worries x={x} />
      <Angles x={x} />
      <Pricing c={c} pricing={pricing} T={T} L={L} />
      <Faq c={c} page="svc" />
      <Closing c={c} heading={c.services.closing} />
      <Footer lang={lang} />
    </AudienceRoot>
  );
}
