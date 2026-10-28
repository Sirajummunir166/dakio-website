// A request to the Dakio team from dakio.io: Nova's leave_request (voice or
// chat) and the contact form. Runs the bot check, then forwards to dakio-api
// with the shared secret and the visitor's IP (see /api/voice-guide/open).

import { checkBotId } from "botid/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.DAKIO_API_URL || process.env.NEXT_PUBLIC_DAKIO_API_URL || "https://dakio-api-production.up.railway.app";
const FIELDS = ["name", "phone", "email", "business", "need", "subject", "message", "source", "lang", "page"];

export async function POST(request) {
  const bot = await checkBotId();
  if (bot.isBot) return Response.json({ ok: false, error: "Please email hello@dakio.io." }, { status: 403 });

  let body = {};
  try { body = await request.json(); } catch { /* validated on the api */ }
  const clean = Object.fromEntries(FIELDS.filter((k) => typeof body?.[k] === "string").map((k) => [k, body[k].slice(0, 2000)]));

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "";
  const headers = { "Content-Type": "application/json" };
  if (process.env.VOICE_GUIDE_PROXY_SECRET) headers["x-voice-guide-proxy"] = process.env.VOICE_GUIDE_PROXY_SECRET;
  if (ip) headers["x-visitor-ip"] = ip;
  const country = request.headers.get("x-vercel-ip-country");
  if (country) headers["x-visitor-country"] = country;

  try {
    const res = await fetch(`${API_BASE}/api/public/enquiry`, { method: "POST", headers, body: JSON.stringify(clean), cache: "no-store", signal: AbortSignal.timeout(10_000) });
    const data = await res.json().catch(() => ({ ok: false }));
    return Response.json(data, { status: res.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ok: false, error: "Could not send. Please email hello@dakio.io." }, { status: 502 });
  }
}
