import { jsonLdFor } from "../lib/seo";

// Renders the JSON-LD blocks for a route (BreadcrumbList site-wide, plus
// Organization/SoftwareApplication on /, FAQPage on /pricing and /switch).
// `lang` selects the locale's copy and keeps the emitted URLs on the right
// locale prefix.
export default function PageJsonLd({ route, lang = "en" }) {
  return jsonLdFor(route, lang).map((data, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ));
}
