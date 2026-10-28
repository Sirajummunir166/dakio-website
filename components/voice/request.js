// Nova's leave_request tool and the contact form share this: one request to
// the team, through the website's own route (bot check + shared secret),
// saved as a Lead in admin and emailed to the team.

import { initBot } from "../../lib/botid";

export async function sendRequest({ source, lang, ...fields }) {
  try {
    await initBot();
    const r = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, source, lang, page: typeof window !== "undefined" ? window.location.pathname : null }),
    });
    const d = await r.json().catch(() => ({}));
    return r.ok && d.ok ? { ok: true } : { ok: false, error: d.error || "Could not send." };
  } catch {
    return { ok: false, error: "Could not send." };
  }
}

/** What Nova is told after leave_request, so she says the right thing. */
export function requestToolOutput(res) {
  return res.ok
    ? { sent: true, note: "Sent. Tell them the team will reply within one business day, and ask if there is anything else you can help with." }
    : { sent: false, error: res.error, note: "It did not go through. Apologise and give them the team's email, hello@dakio.io, or the phone 01521305403." };
}
