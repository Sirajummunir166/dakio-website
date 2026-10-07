// Developer docs (dakio.io/developers/docs) — the registry. English only, like
// the legal pages: developers read English docs, and the SDK, its errors and
// its code are English. The /developers landing page is bilingual.
//
// Each page is an MDX file in content/docs/ (no frontmatter, same as the blog:
// metadata lives here). `slug: ''` is the docs home, the quickstart.

import Quickstart from "../content/docs/quickstart.mdx";
import Keys from "../content/docs/keys.mdx";
import TestMode from "../content/docs/test-mode.mdx";
import Catalog from "../content/docs/catalog.mdx";
import Checkout from "../content/docs/checkout.mdx";
import ReactDoc from "../content/docs/react.mdx";
import NextDoc from "../content/docs/nextjs.mdx";
import Tracking from "../content/docs/tracking.mdx";
import Abandoned from "../content/docs/abandoned-carts.mdx";
import Pixel from "../content/docs/pixel.mdx";
import DataLayer from "../content/docs/datalayer.mdx";
import Bangladesh from "../content/docs/bangladesh.mdx";
import SecretKeys from "../content/docs/secret-keys.mdx";
import Webhooks from "../content/docs/webhooks.mdx";
import Api from "../content/docs/api.mdx";
import GoingLive from "../content/docs/going-live.mdx";

export const DOCS_ROUTE = "/developers/docs";

export const DOC_SECTIONS = [
  {
    title: "Start",
    pages: [
      { slug: "", title: "Quickstart", description: "From an empty folder to a product on screen and a test order, in five minutes.", Content: Quickstart },
      { slug: "keys", title: "Keys & security", description: "Client keys, secret keys, test and live, allowed websites and limits.", Content: Keys },
      { slug: "test-mode", title: "Test mode", description: "Build with test keys: real checks, test orders, fixed codes.", Content: TestMode },
    ],
  },
  {
    title: "Build a store",
    pages: [
      { slug: "catalog", title: "Store & catalog", description: "The store, categories, products, variants and delivery charges.", Content: Catalog },
      { slug: "checkout", title: "Bag, quote & checkout", description: "Server-priced quotes, cash-on-delivery checkout, the code step and idempotency.", Content: Checkout },
      { slug: "react", title: "React", description: "CartProvider, useCart, useCheckout, useAbandonedCart and useVisitPing.", Content: ReactDoc },
      { slug: "nextjs", title: "Next.js", description: "Server-rendered catalog, SEO helpers, sitemap and instant refresh by webhook.", Content: NextDoc },
      { slug: "tracking", title: "Tracking & my orders", description: "Order tracking by number and phone, and a buyer's orders by SMS code.", Content: Tracking },
      { slug: "abandoned-carts", title: "Abandoned carts", description: "Send unfinished checkouts to Incomplete Orders and Nova's follow-up.", Content: Abandoned },
      { slug: "pixel", title: "Meta Pixel", description: "Browser events that dedupe with Dakio's Conversions API events.", Content: Pixel },
      { slug: "datalayer", title: "Storefront dataLayer & GTM", description: "The shopping events every Dakio storefront pushes, and how to send them to GA4, TikTok and other platforms with Google Tag Manager.", Content: DataLayer },
      { slug: "bangladesh", title: "Bangladesh helpers", description: "Districts, thanas, phone numbers, the Dhaka delivery rule and taka.", Content: Bangladesh },
    ],
  },
  {
    title: "Your server",
    pages: [
      { slug: "secret-keys", title: "Secret keys", description: "Read orders, check out from a server with the buyer's IP, manage webhooks.", Content: SecretKeys },
      { slug: "webhooks", title: "Webhooks", description: "Product, stock, order and store events — signed, retried, verified.", Content: Webhooks },
    ],
  },
  {
    title: "Reference",
    pages: [
      { slug: "api", title: "HTTP API", description: "Every endpoint, header, response shape and error code of /api/sdk/v1.", Content: Api },
      { slug: "going-live", title: "Going live", description: "The checklist before real buyers arrive.", Content: GoingLive },
    ],
  },
];

export const docs = DOC_SECTIONS.flatMap(s => s.pages.map(p => ({ ...p, section: s.title })));

export const docHref = slug => (slug ? `${DOCS_ROUTE}/${slug}` : DOCS_ROUTE);

export const getDoc = slug => docs.find(d => d.slug === (slug || "")) || null;

export function neighbours(slug) {
  const i = docs.findIndex(d => d.slug === (slug || ""));
  return { prev: i > 0 ? docs[i - 1] : null, next: i >= 0 && i < docs.length - 1 ? docs[i + 1] : null };
}
