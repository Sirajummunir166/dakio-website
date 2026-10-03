// Nova voice guide — the long-tail facts behind its `look_up` tool.
//
// The facts themselves live in public/nova-guide/topics.json, so dakio-api can
// read the same file (www.dakio.io/nova-guide/topics.json) for the text chat,
// which puts them straight into Nova's sheet instead of behind a tool.
//
// The core sheet (public/nova-guide/core.md) answers the common questions with
// no tool call at all, because every tool call costs the visitor one more model
// round trip of silence. These are the rarer questions. The widget answers
// `look_up` from this module in the browser — no request leaves the page — so
// the only wait is the model's own.
//
import topics from "../../public/nova-guide/topics.json";

// Facts there must match the website copy (content/copy/*.en.js). Prices never
// live here: the api puts the live price list into the sheet.

export const GUIDE_TOPICS = topics;

export const GUIDE_TOPIC_KEYS = Object.keys(GUIDE_TOPICS);

/** The `look_up` answer: the topic's facts, or the honest list of what exists. */
export function lookUpTopic(topic) {
  const key = String(topic ?? "").toLowerCase().trim().replace(/[\s-]+/g, "_");
  if (GUIDE_TOPICS[key]) return { topic: key, facts: GUIDE_TOPICS[key] };
  const hit = GUIDE_TOPIC_KEYS.find((k) => key.includes(k) || k.includes(key));
  if (hit) return { topic: hit, facts: GUIDE_TOPICS[hit] };
  return { found: false, topics: GUIDE_TOPIC_KEYS, note: "No such topic. If the sheet does not answer it either, say you are not sure and offer the contact page." };
}
