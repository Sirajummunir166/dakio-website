import PricingClient from "../../../components/pricing/PricingClient";
import PageJsonLd from "../../../components/PageJsonLd";
import { href, languageAlternates } from "../../../lib/i18n";
import pricingEn, { MONO } from "../../../content/copy/pricing.en";
import pricingBn from "../../../content/copy/pricing.bn";
import { getPricingCopy } from "../../../lib/plans";

const COPY = { en: pricingEn, bn: pricingBn };
const ROUTE = "/pricing";

// Prices come from the API (see lib/plans.js), so this page revalidates rather
// than being frozen at build time: a founder changing a price in the admin app
// must not need a deploy to change what this page prints.
export const revalidate = 300;

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
  // Live catalogue merged over the committed copy; falls back to the copy alone
  // if the API is unreachable, so the page always renders plans.
  const c = await getPricingCopy(lang);

  return (
    <>
      <PageJsonLd route={ROUTE} lang={lang} />
      <PricingClient lang={lang} copy={c} mono={MONO} />
    </>
  );
}
