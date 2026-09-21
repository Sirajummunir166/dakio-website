// Standalone campaign tool for the "এস এস পুর্মিলনী ২০২৬" (NS Get-Together
// 2026) reunion event — upload a photo, it composites behind the event frame,
// download the result. Self-contained: no SiteNav/Footer chrome, not part of
// the marketing sitemap (noindex — this is a one-off community utility, not a
// page meant to rank).

import PhotoFrameClient from "./PhotoFrameClient";

export const metadata = {
  title: "এস এস পুর্মিলনী ২০২৬ ফটো ফ্রেম | dakio",
  description: "আপনার ছবি আপলোড করুন, পুর্মিলনী ২০২৬ ফ্রেমে বসিয়ে ডাউনলোড করুন।",
  robots: { index: false, follow: false },
};

export default function NsGetTogether26Page() {
  return <PhotoFrameClient />;
}
