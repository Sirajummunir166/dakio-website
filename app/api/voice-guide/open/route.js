// The Nova voice guide's front door (DAKIO_VOICE_GUIDE_PLAN.md, cut 2).
//
// The widget asks here — not at dakio-api directly — so Vercel's bot check can
// run before a model session is set aside for the visitor. A human gets their
// request forwarded with the shared secret, their IP and their country; the api
// refuses /open without that secret, so this check cannot be walked around.
//
// Only the ticket goes through here, once per call. The audio itself never
// touches this server or the api: the browser talks to the model directly.

import { checkBotId } from "botid/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE = process.env.DAKIO_API_URL || process.env.NEXT_PUBLIC_DAKIO_API_URL || "https://dakio-api-production.up.railway.app";

export async function POST(request) {
  const bot = await checkBotId();
  if (bot.isBot && !bot.isVerifiedBot) {
    return Response.json({ ok: false, reason: "forbidden", message: "Voice is only for people." }, { status: 403 });
  }
  if (bot.isVerifiedBot) {
    // A search crawler has no business opening a microphone.
    return Response.json({ ok: false, reason: "forbidden" }, { status: 403 });
  }

  let body = {};
  try { body = await request.json(); } catch { /* an empty body is a default call */ }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "";
  const headers = { "Content-Type": "application/json" };
  if (process.env.VOICE_GUIDE_PROXY_SECRET) headers["x-voice-guide-proxy"] = process.env.VOICE_GUIDE_PROXY_SECRET;
  if (ip) headers["x-visitor-ip"] = ip;
  const country = request.headers.get("x-vercel-ip-country");
  if (country) headers["x-visitor-country"] = country;

  try {
    const res = await fetch(`${API_BASE}/api/public/voice-guide/open`, {
      method: "POST",
      headers,
      body: JSON.stringify({ lang: body?.lang === "bn" ? "bn" : "en", page: typeof body?.page === "string" ? body.page.slice(0, 200) : "/" }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json().catch(() => ({ ok: false, reason: "error" }));
    return Response.json(data, { status: res.status, headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ ok: false, reason: "error", message: "Nova could not pick up. Please try again." }, { status: 502 });
  }
}
