// Blog post registry — metadata from lib/blog-meta.js (generated) joined with
// the compiled MDX bodies. Same API shape as dakio-landing's content/blog.

import { POST_META } from "./blog-meta";

import CodAccounting from "../content/blog/cod-accounting-guide.mdx";
import CourierReturns from "../content/blog/courier-returns-eating-profit.mdx";
import IncompleteOrders from "../content/blog/incomplete-orders-lost-sales.mdx";
import ConfirmationCalls from "../content/blog/order-confirmation-calls.mdx";
import SameBusiness from "../content/blog/same-business-different-cost.mdx";
import ServerSideTracking from "../content/blog/server-side-tracking-ad-spend.mdx";
import FakeOrders from "../content/blog/spot-fake-orders.mdx";
import StartUnder50k from "../content/blog/start-ecommerce-under-50k.mdx";

const CONTENT = {
  "cod-accounting-guide": CodAccounting,
  "courier-returns-eating-profit": CourierReturns,
  "incomplete-orders-lost-sales": IncompleteOrders,
  "order-confirmation-calls": ConfirmationCalls,
  "same-business-different-cost": SameBusiness,
  "server-side-tracking-ad-spend": ServerSideTracking,
  "spot-fake-orders": FakeOrders,
  "start-ecommerce-under-50k": StartUnder50k,
};

// Posts are locale-tagged rather than translated: every article was written in
// Bangla for a Bangladeshi merchant, so it is canonical under /bn/blog and the
// English blog links to it rather than to a machine-translated copy. Tag a
// future English post with `lang: "en"` in blog-meta.js and it falls into place.
export const DEFAULT_POST_LANG = "bn";

export const posts = POST_META.map(meta => ({ ...meta, lang: meta.lang || DEFAULT_POST_LANG, Content: CONTENT[meta.slug] })).filter(p => p.Content);

export const postsBySlug = Object.fromEntries(posts.map(p => [p.slug, p]));

export const getPost = slug => postsBySlug[slug] || null;

// The first entry is the "all" sentinel — BlogClient renders it with the
// locale's own label, but the value stays constant so filtering is locale-free.
export const ALL_CATEGORIES = "সব";

export const categories = [ALL_CATEGORIES, ...posts.reduce((acc, p) => {
  if (p.category && !acc.includes(p.category)) acc.push(p.category);
  return acc;
}, [])];

export const featuredPost = posts.find(p => p.featured) || posts[0] || null;

export function relatedPosts(slug, limit = 3) {
  const current = getPost(slug);
  if (!current) return [];
  const sameCat = posts.filter(p => p.slug !== slug && p.category === current.category);
  const rest = posts.filter(p => p.slug !== slug && p.category !== current.category);
  return [...sameCat, ...rest].slice(0, limit);
}

export function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
