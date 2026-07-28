import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "../../../lib/og";
import { LOCALES } from "../../../lib/i18n";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Dakio";

// Both locales prerender, so the cards stay static files rather than
// per-request renders.
export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default function Image() {
  return ogImage("/blog");
}
