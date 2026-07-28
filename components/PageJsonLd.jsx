import { jsonLdFor } from "../lib/seo";

// Renders the JSON-LD blocks for a route (BreadcrumbList site-wide, plus
// Organization/SoftwareApplication on /, FAQPage on /pricing and /switch).
export default function PageJsonLd({ route }) {
  return jsonLdFor(route).map((data, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  ));
}
