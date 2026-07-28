import PricingClient from "../../../components/pricing/PricingClient";
import PageJsonLd from "../../../components/PageJsonLd";
import { href, languageAlternates } from "../../../lib/i18n";
import pricingEn, { MONO } from "../../../content/copy/pricing.en";
import pricingBn from "../../../content/copy/pricing.bn";

const COPY = { en: pricingEn, bn: pricingBn };
const ROUTE = "/pricing";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function PricingPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;

  return (
    <>
      <PageJsonLd route={ROUTE} lang={lang} />
      <PricingClient lang={lang} copy={c} mono={MONO} />
    </>
  );
}
