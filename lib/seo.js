// SEO pack per docs/SEO - Meta & Strategy.md: Organization + SoftwareApplication
// + FAQPage (/pricing, /switch) + BreadcrumbList site-wide.
//
// Localized: the structured data carries the same locale as the page it sits
// on, and every emitted URL goes through href() so the bn graph points at
// /bn/... The FAQ answers are marketing copy, so they live in
// content/copy/seo.<lang>.js next to the rest.

import { href } from "./i18n";
import seoEn from "../content/copy/seo.en";
import seoBn from "../content/copy/seo.bn";

export const SITE_URL = "https://dakio.io";

const PACKS = { en: seoEn, bn: seoBn };
const pack = lang => PACKS[lang] || PACKS.en;

/** Absolute URL for a route in a locale. */
export const abs = (lang, route) => `${SITE_URL}${href(lang, route) === "/" ? "" : href(lang, route)}`;

export const organization = (lang = "en") => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dakio",
  legalName: "Digidhaka Communication Limited",
  url: abs(lang, "/"),
  logo: `${SITE_URL}/opengraph-image`,
  identifier: "Trade License TRAD/DSCC/041467/2021",
  email: "hello@dakio.io",
  telephone: "+8801521305403",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House 5, Road 5, Priyanka City, Sector 12, Uttara",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  inLanguage: lang,
  description: pack(lang).organizationDescription,
});

export const softwareApplication = (lang = "en") => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dakio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: abs(lang, "/"),
  inLanguage: lang,
  description: pack(lang).applicationDescription,
  offers: pack(lang).offers.map(o => ({ "@type": "Offer", ...o })),
});

const faq = (qas, lang) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: lang,
  mainEntity: qas.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const pageNames = lang => pack(lang).pageNames;

export const breadcrumbs = (route, lang = "en") => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement:
    route === "/"
      ? [{ "@type": "ListItem", position: 1, name: pack(lang).home, item: abs(lang, "/") }]
      : [
          { "@type": "ListItem", position: 1, name: pack(lang).home, item: abs(lang, "/") },
          { "@type": "ListItem", position: 2, name: pack(lang).pageNames[route], item: abs(lang, route) },
        ],
});

export function jsonLdFor(route, lang = "en") {
  const blocks = [breadcrumbs(route, lang)];
  if (route === "/") blocks.push(organization(lang), softwareApplication(lang));
  if (route === "/pricing") blocks.push(faq(pack(lang).pricingFaq, lang));
  if (route === "/switch") blocks.push(faq(pack(lang).switchFaq, lang));
  return blocks;
}
