// Vercel BotID on the two routes a visitor can trigger that cost us something
// or reach the team: opening a Nova call and sending a request. Loaded on
// first need, once per page.
let ready = false;
export async function initBot() {
  if (ready) return;
  ready = true;
  try {
    const { initBotId } = await import("botid/client/core");
    initBotId({ protect: [{ path: "/api/voice-guide/open", method: "POST" }, { path: "/api/enquiry", method: "POST" }] });
  } catch {
    /* without it the api's own caps still hold */
  }
}
