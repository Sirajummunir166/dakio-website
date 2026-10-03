// Which Nova guide is on — "voice", "text" or "off"? (DAKIO_VOICE_GUIDE_PLAN.md, cut 4.)
//
// Every page asks once, after it is idle, so the answer is cached for a minute
// at Vercel's edge (s-maxage): an admin mode change reaches every page within
// about a minute without dakio-api hearing from every visitor.

export const dynamic = "force-dynamic";

const API_BASE = process.env.DAKIO_API_URL || process.env.NEXT_PUBLIC_DAKIO_API_URL || "https://dakio-api-production.up.railway.app";

export async function GET() {
  let mode = "off";
  let fresh = false;
  try {
    const r = await fetch(`${API_BASE}/api/public/voice-guide/status`, { cache: "no-store", signal: AbortSignal.timeout(4_000) });
    const data = await r.json();
    mode = ["voice", "text"].includes(data?.mode) ? data.mode : "off";
    fresh = true;
  } catch {
    // Unknown is off: a button that cannot connect is worse than no button.
  }
  return Response.json({ mode }, {
    headers: { "Cache-Control": fresh ? "public, s-maxage=60, stale-while-revalidate=300" : "public, s-maxage=15" },
  });
}
