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
import { initBot } from "../../lib/botid";

export const VOICE_COPY = {
  en: {
    launch: "Talk to Nova",
    launchText: "Chat with Nova",
    note: "Voice is processed by our AI provider. We keep a text transcript for 30 days, never the audio.",
    opening: "Connecting…",
    title: "Nova",
    refusedTitle: "Nova can't talk right now",
    email: "Email the team",
    startFree: "Get started",
    close: "Close",
    hello: "Hi, I'm Nova, Dakio's AI manager.",
    ask: "Can I help you understand Dakio, or find what your business needs?",
    pick: "Which language do you prefer?",
    typeInstead: "Type instead",
    hear: "Hear Nova say hello",
    hearSub: "Tap to unmute · free, no microphone",
    speaking: "Nova is speaking…",
    stop: "Stop",
    again: "Hear again",
  },
  bn: {
    launch: "Nova-র সাথে কথা বলুন",
    launchText: "Nova-কে লিখুন",
    note: "ভয়েস আমাদের AI প্রোভাইডার প্রসেস করে। আমরা ৩০ দিন লেখা ট্রান্সক্রিপ্ট রাখি, অডিও কখনো না।",
    opening: "সংযোগ হচ্ছে…",
    title: "Nova",
    refusedTitle: "Nova এখন কথা বলতে পারছে না",
    email: "টিমকে ইমেইল করুন",
    startFree: "শুরু করুন",
    close: "বন্ধ করুন",
    hello: "হ্যালো, আমি Nova, Dakio-র AI ম্যানেজার।",
    ask: "Dakio বুঝতে বা আপনার ব্যবসার যা দরকার খুঁজে পেতে সাহায্য করব?",
    pick: "কোন ভাষায় কথা বলবেন?",
    typeInstead: "লিখে কথা বলুন",
    hear: "Nova-র হ্যালো শুনুন",
    hearSub: "সাউন্ড চালু করতে চাপুন · ফ্রি, মাইক লাগবে না",
    speaking: "Nova কথা বলছে…",
    stop: "থামান",
    again: "আবার শুনুন",
  },
};

const TICKET_FRESH_MS = 4 * 60 * 1000; // tickets live 5 minutes on the api
const WELCOME_AFTER_MS = 8000;
const WELCOME_KEY = "dakio-nova-welcome";

/** Event kiosk screens: a full-screen display at a stall, nobody to call from it. */
const KIOSK_PATHS = ["/nsgt26"];

/** Pages the button stays off: legal copy, the developer reference, event kiosks. */
function hiddenOn(pathname) {
  const bare = String(pathname || "/").replace(/^\/(en|bn)(?=\/|$)/, "") || "/";
  return LEGAL_PATHS.includes(bare) || isEnglishOnlyPath(bare) || KIOSK_PATHS.includes(bare);
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

  const fetchTicket = useCallback(async (callLang = lang, want = null) => {
    await initBot();
    const r = await fetch("/api/voice-guide/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: callLang, page: window.location.pathname, ...(want ? { want } : {}) }),
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

  // The language the visitor picked on the welcome card (the call runs in it;
  // pages Nova opens stay in the site's language).
  const [callLang, setCallLang] = useState(lang);

  const start = useCallback(async ({ lang: pick = lang, want = null } = {}) => {
    if (phase === "opening" || phase === "call") return;
    stopClip();
    setWelcome(false);
    setCallLang(pick);
    if (pick !== lang || want) {
      // A different language or "type instead" needs its own ticket and panel.
      mod.current = (want === "text" || mode === "text" ? import("./TextChat") : import("./VoiceCall")).catch((e) => { mod.current = null; throw e; });
      pending.current = { at: Date.now(), promise: fetchTicket(pick, want).catch(() => ({ ok: false, reason: "error" })) };
    } else {
      warm();
    }
    setPhase("opening");
    track("voice_open", { lang: pick, want: want || "", page: window.location.pathname });
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
      const panel = (t.mode === "text") === (want === "text" || mode === "text") ? m : await (t.mode === "text" ? import("./TextChat") : import("./VoiceCall"));
      setTicket({ ...t, tapAt });
      setCall(() => panel.default);
      setPhase("call");
    } catch {
      pending.current = null;
      setRefusal(null);
      setPhase("refused");
    }
  }, [phase, warm, lang, mode, fetchTicket]);

  const ended = useCallback(() => {
    setPhase("idle");
    setTicket(null);
  }, []);

  // A language switch mid-visit needs a ticket in the new language.
  useEffect(() => { pending.current = null; setCallLang(lang); }, [lang]);

  // The welcome: a few seconds in, once per visitor, Nova offers to help and
  // asks for a language. Her greeting is a RECORDED clip (public/nova-guide/
  // welcome-<lang>.mp3, free to play): it plays by itself if the visitor has
  // already tapped or clicked the page (browsers allow sound only after that),
  // otherwise the card offers "Hear Nova". The live call, which costs, starts
  // only when they pick a language.
  const [welcome, setWelcome] = useState(false);
  const [hearing, setHearing] = useState("off"); // off | ready | playing | none
  const [heard, setHeard] = useState(false); // she said hello: the languages are the next step
  const clip = useRef(null);
  const stopClip = () => { try { clip.current?.pause(); } catch { /* fine */ } setHearing((h) => (h === "none" ? h : "ready")); };
  useEffect(() => {
    if (!welcome) { stopClip(); return undefined; }
    const a = new Audio(`/nova-guide/welcome-${lang}.mp3`);
    clip.current = a;
    a.onplaying = () => setHearing("playing");
    a.onended = () => { setHearing("ready"); setHeard(true); };
    a.onerror = () => setHearing("none"); // no clip yet: the card works silently
    setHearing("ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (navigator.userActivation?.hasBeenActive && !reduced) a.play().catch(() => { /* blocked: "Hear Nova" stays */ });
    return () => { a.pause(); a.onplaying = a.onended = a.onerror = null; };
  }, [welcome, lang]);
  const hear = () => { const a = clip.current; if (!a) return; a.currentTime = 0; a.play().catch(() => setHearing("none")); track("voice_welcome_hear", { lang }); };
  const hush = () => { try { clip.current?.pause(); } catch { /* fine */ } setHearing("ready"); setHeard(true); };
  useEffect(() => {
    if (mode === "off" || hiddenOn(pathname)) return undefined;
    let seen = false;
    try { seen = !!window.localStorage.getItem(WELCOME_KEY); } catch { /* private window: show it */ }
    if (seen) return undefined;
    const t = window.setTimeout(() => {
      setWelcome((w) => w || true);
      try { window.localStorage.setItem(WELCOME_KEY, String(Date.now())); } catch { /* fine */ }
      track("voice_welcome_shown", { lang });
    }, WELCOME_AFTER_MS);
    return () => window.clearTimeout(t);
  }, [mode, pathname, lang]);

  if ((mode === "off" || hiddenOn(pathname)) && phase !== "call") return null;

  const bn = lang === "bn";
  return (
    <div className="vg-root" lang={lang}>
      {phase === "call" && Call && ticket ? (
        <Call ticket={ticket} lang={callLang} siteLang={lang} onEnded={ended} />
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
      ) : welcome && phase === "idle" ? (
        <div className="vg-panel vg-welcome" role="dialog" aria-label={copy.hello}>
          <div className="vg-head">
            <button type="button" className="vg-orb vg-orb-btn" data-state={hearing === "playing" ? "speaking" : undefined} style={{ width: 44, height: 44 }} onClick={hearing === "playing" ? hush : hear} disabled={hearing !== "ready" && hearing !== "playing"} aria-label={hearing === "playing" ? copy.stop : copy.hear} />
            <div className={`vg-title${bn ? " vg-bn" : ""}`}>{copy.hello}</div>
            <button type="button" className="vg-close-x" style={{ marginLeft: "auto", alignSelf: "flex-start" }} onClick={() => { setWelcome(false); track("voice_welcome_closed"); }} aria-label={copy.close}>×</button>
          </div>
          <p className={`vg-welcome-ask${bn ? " vg-bn" : ""}`}>{copy.ask}</p>
          {hearing === "playing" ? (
            <div className={`vg-hear is-playing${bn ? " vg-bn" : ""}`} role="status">
              <span className="vg-hear-bars" aria-hidden><i /><i /><i /><i /><i /></span>
              <span className="vg-hear-t">{copy.speaking}</span>
              <button type="button" className="vg-hear-stop" onClick={hush}>
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><rect width="10" height="10" rx="2" fill="currentColor" /></svg>
                {copy.stop}
              </button>
            </div>
          ) : hearing === "ready" && !heard ? (
            <button type="button" className={`vg-hear${bn ? " vg-bn" : ""}`} onClick={hear}>
              <span className="vg-hear-play" aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" /><path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" /></svg>
              </span>
              <span className="vg-hear-words">
                <span className="vg-hear-t">{copy.hear}</span>
                <span className="vg-hear-sub">{copy.hearSub}</span>
              </span>
            </button>
          ) : hearing === "ready" ? (
            <button type="button" className={`vg-hear-again${bn ? " vg-bn" : ""}`} onClick={hear}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7" /></svg>
              {copy.again}
            </button>
          ) : null}
          <div className={`vg-welcome-pick${bn ? " vg-bn" : ""}`}>{copy.pick}</div>
          <div className={`vg-welcome-langs${hearing === "ready" && !heard ? " is-quiet" : ""}`}>
            <button type="button" className="vg-btn vg-btn-lime vg-btn-bn" onPointerEnter={warm} onClick={() => start({ lang: "bn" })}>বাংলা</button>
            <button type="button" className="vg-btn vg-btn-lime" onPointerEnter={warm} onClick={() => start({ lang: "en" })}>English</button>
          </div>
          {mode === "voice" ? (
            <button type="button" className={`vg-welcome-type${bn ? " vg-bn" : ""}`} onClick={() => start({ lang, want: "text" })}>{copy.typeInstead}</button>
          ) : null}
          <p className={`vg-note${bn ? " vg-bn" : ""}`}>{copy.note}</p>
        </div>
      ) : (
        <button
          type="button"
          className="vg-launch"
          onPointerEnter={warm}
          onFocus={warm}
          onTouchStart={warm}
          onClick={() => { setWelcome(true); track("voice_launch_tap", { lang }); }}
          disabled={phase === "opening"}
          aria-label={mode === "text" ? copy.launchText : copy.launch}
          title={copy.note}
        >
          <span className="vg-orb" data-state={phase === "opening" ? "connecting" : undefined} aria-hidden />
          <span className={bn ? "vg-launch-bn" : undefined}>{phase === "opening" ? copy.opening : mode === "text" ? copy.launchText : copy.launch}</span>
        </button>
      )}
    </div>
  );
}
