import ContactClient from "../../../components/contact/ContactClient";
import PageJsonLd from "../../../components/PageJsonLd";
import { href, languageAlternates } from "../../../lib/i18n";
import contactEn from "../../../content/copy/contact.en";
import contactBn from "../../../content/copy/contact.bn";

const COPY = { en: contactEn, bn: contactBn };
const ROUTE = "/contact";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: { canonical: href(lang, ROUTE), languages: languageAlternates(ROUTE) },
  };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const c = COPY[lang] || COPY.en;

  return (
    <>
      <PageJsonLd route={ROUTE} lang={lang} />
      <ContactClient lang={lang} copy={c} />
    </>
  );
}
