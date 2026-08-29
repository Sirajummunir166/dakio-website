import { jsonLdFor } from "../lib/seo";

// Renders the JSON-LD blocks for a route (BreadcrumbList site-wide, plus
// Organization/SoftwareApplication on /, FAQPage on /pricing and /switch).
// `lang` selects the locale's copy and keeps the emitted URLs on the right
// locale prefix.
// `offers` (optional) are the LIVE plan offers from lib/plans.js. Passed in
// rather than fetched here because this is a sync component and the fetch belongs
// to the page that already revalidates. Omitted → the committed copy is used.
export default function PageJsonLd({ route, lang = "en", offers = null }) {
  return jsonLdFor(route, lang, { offers }).map((data, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ));
}
