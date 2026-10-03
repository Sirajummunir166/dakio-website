"use client";

// "Talk to Nova" / "Chat with Nova" — the Nova guide on every dakio.io page
// (DAKIO_VOICE_GUIDE_PLAN.md, cut 3). An admin picks the mode: voice, text or off.
//
// This file is the light part every page carries: one button. Everything that
// makes a call — the realtime SDK, the microphone, the captions — lives in
// ./VoiceCall (or the typed chat in ./TextChat) and is only fetched when a visitor shows intent (hover, focus or
// the first touch), so the site's page weight does not move.
//
// SPEED. The tap should not wait on anything that could have happened before
// it. On intent we start three things at once: the call module download, the
// bot check, and the ticket request (/api/voice-guide/open → dakio-api), which
// carries Nova's whole session setup. By the time the finger lifts, usually
// all three are done and the tap goes straight to the microphone.

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LEGAL_PATHS, isEnglishOnlyPath } from "../../lib/i18n";

export const VOICE_COPY = {
  en: {
    launch: "Talk to Nova",
    launchText: "Chat with Nova",
    opening: "Connecting…",
    title: "Nova",
    refusedTitle: "Nova can't talk right now",
    email: "Email the team",
    startFree: "Start free trial",
    close: "Close",
  },
  bn: {
    launch: "Nova-র সাথে কথা বলুন",
    launchText: "Nova-কে লিখুন",
    opening: "সংযোগ হচ্ছে…",
    title: "Nova",
    refusedTitle: "Nova এখন কথা বলতে পারছে না",
    email: "টিমকে ইমেইল করুন",
    startFree: "ফ্রি ট্রায়াল শুরু করুন",
    close: "বন্ধ করুন",
  },
};

const TICKET_FRESH_MS = 4 * 60 * 1000; // tickets live 5 minutes on the api

/** Pages the button stays off: legal copy and the developer reference. */
function hiddenOn(pathname) {
  const bare = String(pathname || "/").replace(/^\/(en|bn)(?=\/|$)/, "") || "/";
  return LEGAL_PATHS.includes(bare) || isEnglishOnlyPath(bare);
}

let botReady = false;
async function initBot() {
  if (botReady) return;
  botReady = true;
  try {
    const { initBotId } = await import("botid/client/core");
    initBotId({ protect: [{ path: "/api/voice-guide/open", method: "POST" }] });
  } catch {
    /* without it the api's own caps still hold */
  }
}

function track(name, params = {}) {
  try { window.gtag?.("event", name, params); } catch { /* analytics never breaks the call */ }
}

export default function VoiceGuide({ lang = "en" }) {
  const pathname = usePathname();
  const copy = VOICE_COPY[lang] || VOICE_COPY.en;
  const [phase, setPhase] = useState("idle"); // idle | opening | call | refused
  const [Call, setCall] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [refusal, setRefusal] = useState(null);
  const mod = useRef(null);
  const pending = useRef(null); // { at, promise }

  // Which guide is on — voice, text or off? Asked once the page is idle, from
  // a cached edge route, so an admin change reaches every page within a minute.
  const [mode, setMode] = useState("off");
  useEffect(() => {
    let alive = true;
    const ask = () => fetch("/api/voice-guide/status").then((r) => r.json()).then((d) => { if (alive) setMode(["voice", "text"].includes(d?.mode) ? d.mode : "off"); }).catch(() => {});
    const idle = window.requestIdleCallback ? window.requestIdleCallback(ask, { timeout: 3000 }) : window.setTimeout(ask, 1500);
    return () => { alive = false; (window.cancelIdleCallback || window.clearTimeout)(idle); };
  }, []);

  const fetchTicket = useCallback(async () => {
    await initBot();
    const r = await fetch("/api/voice-guide/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang, page: window.location.pathname }),
    });
    return r.json().catch(() => ({ ok: false, reason: "error" }));
  }, [lang]);

  /** Start everything the tap will need. Safe to call as often as you like. */
  const warm = useCallback(() => {
    if (!mod.current) mod.current = (mode === "text" ? import("./TextChat") : import("./VoiceCall")).catch((e) => { mod.current = null; throw e; });
    const p = pending.current;
    if (!p || Date.now() - p.at > TICKET_FRESH_MS) {
      const promise = fetchTicket().catch(() => ({ ok: false, reason: "error" }));
      pending.current = { at: Date.now(), promise };
    }
  }, [fetchTicket, mode]);

  const start = useCallback(async () => {
    if (phase === "opening" || phase === "call") return;
    warm();
    setPhase("opening");
    track("voice_open", { lang, page: window.location.pathname });
    const tapAt = performance.now();
    try {
      const [m, t] = await Promise.all([mod.current, pending.current.promise]);
      pending.current = null; // a ticket opens exactly one call
      if (!t?.ok) {
        setRefusal(t?.message || null);
        setPhase("refused");
        track("voice_refused", { reason: t?.reason || "error" });
        return;
      }
      // The server decides the mode; if it changed since this page asked, load the other panel.
      const panel = (t.mode === "text") === (mode === "text") ? m : await (t.mode === "text" ? import("./TextChat") : import("./VoiceCall"));
      setTicket({ ...t, tapAt });
      setCall(() => panel.default);
      setPhase("call");
    } catch {
      pending.current = null;
      setRefusal(null);
      setPhase("refused");
    }
  }, [phase, warm, lang, mode]);

  const ended = useCallback(() => {
    setPhase("idle");
    setTicket(null);
  }, []);

  // A language switch mid-visit needs a ticket in the new language.
  useEffect(() => { pending.current = null; }, [lang]);

  if ((mode === "off" || hiddenOn(pathname)) && phase !== "call") return null;

  const bn = lang === "bn";
  return (
    <div className="vg-root" lang={lang}>
      {phase === "call" && Call && ticket ? (
        <Call ticket={ticket} lang={lang} onEnded={ended} />
      ) : phase === "refused" ? (
        <div className="vg-panel" role="dialog" aria-label={copy.refusedTitle}>
          <div className="vg-head">
            <div className="vg-orb" style={{ width: 40, height: 40 }} aria-hidden />
            <div className={`vg-title${bn ? " vg-bn" : ""}`}>{copy.refusedTitle}</div>
            <button type="button" className="vg-close-x" style={{ marginLeft: "auto" }} onClick={() => setPhase("idle")} aria-label={copy.close}>×</button>
          </div>
          {refusal ? <p className="vg-note" style={{ fontSize: 13.5, color: "#C9CBBE" }}>{refusal}</p> : null}
          <div className="vg-actions">
            <a className={`vg-btn vg-btn-lime${bn ? " vg-btn-bn" : ""}`} href="https://app.dakio.io/register">{copy.startFree}</a>
            <a className={`vg-btn${bn ? " vg-btn-bn" : ""}`} href="mailto:hello@dakio.io">{copy.email}</a>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="vg-launch"
          onPointerEnter={warm}
          onFocus={warm}
          onTouchStart={warm}
          onClick={start}
          disabled={phase === "opening"}
          aria-label={mode === "text" ? copy.launchText : copy.launch}
        >
          <span className="vg-orb" data-state={phase === "opening" ? "connecting" : undefined} aria-hidden />
          <span className={bn ? "vg-launch-bn" : undefined}>{phase === "opening" ? copy.opening : mode === "text" ? copy.launchText : copy.launch}</span>
        </button>
      )}
    </div>
  );
}
