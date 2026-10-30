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
import GREET from "./greetings.json";

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
    hear: "Talk to Nova",
    hearSub: "Tap and she'll say hello",
    speaking: "Nova is speaking…",
    stop: "Stop",
    again: "Hear again",
    voiceMsg: "Nova sent you a voice message",
    tapMe: "Yes, tap me 🙂",
    play: "Play Nova's voice message",
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
    hear: "Nova-র সাথে কথা বলুন",
    hearSub: "চাপলেই Nova হ্যালো বলবে",
    speaking: "Nova কথা বলছে…",
    stop: "থামান",
    again: "আবার শুনুন",
    voiceMsg: "Nova একটা ভয়েস মেসেজ পাঠিয়েছে",
    tapMe: "হ্যাঁ, চাপ দিন 🙂",
    play: "Nova-র ভয়েস মেসেজ শুনুন",
  },
};

const TICKET_FRESH_MS = 4 * 60 * 1000; // tickets live 5 minutes on the api
const WELCOME_AFTER_MS = 8000;
// A voice note's waveform: fixed heights, so it looks the same every time.
const WAVE = [5, 9, 14, 8, 17, 12, 6, 15, 19, 10, 7, 13, 18, 11, 6, 9, 16, 12, 8, 14, 10, 5, 12, 17, 9, 6, 11, 7];
const mmss = (sec) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, "0")}`;

/** Event kiosk screens: a full-screen display at a stall, nobody to call from it. */
const KIOSK_PATHS = ["/nsgt26"];

/** Pages the button stays off: legal copy, the developer reference, event kiosks. */
function hiddenOn(pathname) {
  const bare = String(pathname || "/").replace(/^\/(en|bn)(?=\/|$)/, "") || "/";
  return LEGAL_PATHS.includes(bare) || isEnglishOnlyPath(bare) || KIOSK_PATHS.includes(bare);
}

/** Which hello Nova says on this page (components/voice/greetings.json). */
function greetingFor(pathname) {
  const bare = String(pathname || "/").replace(/^\/(en|bn)(?=\/|$)/, "") || "/";
  const page = bare.split("/")[1] || "home";
  return GREET.pages[page] ? page : "home";
}

/**
 * Nova's gaze: her highlight (the faceless ball's only "eye") moves through two
 * CSS variables. On arrival she glances at the page, then at the visitor; after
 * that it follows the pointer. Phones and reduced motion keep her still.
 */
function useGaze(active, intro) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return undefined;
    const set = (x, y) => { el.style.setProperty("--gx", `${x}%`); el.style.setProperty("--gy", `${y}%`); };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timers = intro ? [window.setTimeout(() => set(14, 46), 650), window.setTimeout(() => set(46, 36), 1700)] : [];
    let raf = 0, follow = !intro;
    if (intro) timers.push(window.setTimeout(() => { follow = true; }, 2300));
    const move = (e) => {
      if (!follow || raf || e.pointerType === "touch") return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const dx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        const dy = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        set(Math.round(40 + dx * 24), Math.round(36 + dy * 20));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { timers.forEach(window.clearTimeout); window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [active, intro]);
  return ref;
}

// The wave that announces her message: the full screen once per visit
// (sessionStorage, so a reload in the same tab doesn't repeat it), a small
// ripple round her ball after that.
const WAVE_KEY = "dakio-nova-waved";

/** A soft two-note pop, made by the page. Browsers play it only once the
 *  visitor has tapped or clicked something on the site; before that it is
 *  silently skipped and the wave works alone. */
function chime(ctxRef) {
  if (!navigator.userActivation?.hasBeenActive) return;
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    const ctx = ctxRef.current || (ctxRef.current = new C());
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const now = ctx.currentTime;
    [[784, 0], [1175, 0.11]].forEach(([freq, at]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, now + at);
      g.gain.exponentialRampToValueAtTime(0.08, now + at + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.28);
      o.connect(g).connect(ctx.destination);
      o.start(now + at);
      o.stop(now + at + 0.3);
    });
  } catch { /* no sound is fine */ }
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
    quiet.current = true; // they talked to her: later messages arrive without a sound
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

  // The welcome: on EVERY page, a few seconds in, Nova sends a voice message:
  // her orb bounces in by the corner, glances at the page and then at the
  // visitor, and a Messenger-style bubble says "Nova sent you a voice message"
  // (unread dot, play, waveform, real length). It stays until it is tapped or
  // closed; each page sends its own (public/nova-guide/welcome-[<page>-]<lang>.mp3,
  // RECORDED, free to play). When the pointer comes near she leans in ("Yes,
  // tap me"). Browsers allow sound only after a tap or click, and the tap on
  // her message is that permission: she speaks and the bubble grows into the
  // card, which asks for a language. The live call, which costs, starts only
  // when they pick one.
  const page = greetingFor(pathname);
  const [welcome, setWelcome] = useState(false); // the full card
  const [teaser, setTeaser] = useState(false); // the voice message
  const [near, setNear] = useState(false); // the pointer is close: she leans in
  const [hearing, setHearing] = useState("off"); // off | ready | playing | none
  const [heard, setHeard] = useState(false); // she said hello: the languages are the next step
  const [dur, setDur] = useState(0); // the clip's seconds, for the voice note
  const clip = useRef(null);
  const stopClip = () => { try { clip.current?.pause(); } catch { /* fine */ } setHearing((h) => (h === "none" ? h : "ready")); };
  const greeting = welcome || teaser;
  useEffect(() => {
    if (!greeting) { stopClip(); return undefined; }
    const a = new Audio(`/nova-guide/welcome-${page === "home" ? "" : `${page}-`}${lang}.mp3`);
    a.preload = "auto";
    clip.current = a;
    setHeard(false);
    a.onloadedmetadata = () => { if (Number.isFinite(a.duration)) setDur(a.duration); };
    a.onplaying = () => setHearing("playing");
    a.onended = () => { setHearing("ready"); setHeard(true); };
    a.onerror = () => setHearing("none"); // no clip: the card works silently
    setHearing("ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (welcome && !teaser && navigator.userActivation?.isActive && !reduced) a.play().catch(() => { /* blocked: the Talk to Nova button stays */ });
    return () => { a.pause(); a.onloadedmetadata = a.onplaying = a.onended = a.onerror = null; };
    // The voice message turning into the card keeps the same clip (the tap plays it).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [greeting, lang, page]);
  const hear = () => { const a = clip.current; if (!a) return; a.currentTime = 0; a.play().catch(() => setHearing("none")); track("voice_welcome_hear", { lang, page }); };
  const hush = () => { try { clip.current?.pause(); } catch { /* fine */ } setHearing("ready"); setHeard(true); };
  const secs = dur ? Math.round(dur) : null;

  const tapTeaser = () => { setTeaser(false); setNear(false); setWelcome(true); hear(); track("voice_teaser_tap", { lang, page }); };
  const closeTeaser = () => { setTeaser(false); setNear(false); quiet.current = true; track("voice_teaser_closed", { page }); };

  // Each page sends its message: 8 seconds into the visit, 3 on later pages.
  const pagesSeen = useRef(0);
  const quiet = useRef(false); // closed a message or talked to her: no more sound
  const audio = useRef(null); // the page's one AudioContext for the pop
  const busy = useRef(false); // the card is open or a call is on: no message
  busy.current = welcome || phase !== "idle";
  useEffect(() => {
    setTeaser(false); setNear(false);
    if (mode === "off" || hiddenOn(pathname)) return undefined;
    const first = pagesSeen.current++ === 0;
    const t = window.setTimeout(() => {
      if (busy.current) return;
      setTeaser(true);
      track("voice_teaser_shown", { lang, page });
    }, first ? WELCOME_AFTER_MS : 3000);
    return () => window.clearTimeout(t);
  }, [mode, pathname, lang, page]);

  const teaserGaze = useGaze(teaser, true);
  // When she lands, a wave goes out from her ball, with the pop when allowed.
  const [ping, setPing] = useState(null); // { big, x, y, size, id }
  useEffect(() => {
    if (!teaser) return undefined;
    const land = window.setTimeout(() => {
      const r = teaserGaze.current?.getBoundingClientRect();
      if (!r) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let seen = false;
      try { seen = sessionStorage.getItem(WAVE_KEY) === "1"; } catch { /* storage may be off */ }
      const big = !seen && !reduced;
      if (big) { try { sessionStorage.setItem(WAVE_KEY, "1"); } catch { /* fine */ } }
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      setPing({ big, x, y, size: big ? reach * 2 : 240, id: Date.now() });
      if (!quiet.current) chime(audio);
      track("voice_teaser_wave", { big, sound: !quiet.current && !!navigator.userActivation?.hasBeenActive });
    }, 420); // the drop lands
    const done = window.setTimeout(() => setPing(null), 3200);
    return () => { window.clearTimeout(land); window.clearTimeout(done); };
  }, [teaser, teaserGaze]);
  // Lean in when the pointer comes close (with a little slack, so she doesn't flicker).
  useEffect(() => {
    if (!teaser) return undefined;
    let raf = 0;
    const move = (e) => {
      if (raf || e.pointerType === "touch") return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = teaserGaze.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        setNear((n) => (n ? d < 260 : d < 190));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, [teaser, teaserGaze]);
  const launchGaze = useGaze(!teaser && !welcome && phase === "idle", false);

  if ((mode === "off" || hiddenOn(pathname)) && phase !== "call") return null;

  const bn = lang === "bn";
  return (
    <div className="vg-root" lang={lang}>
      {ping ? (
        <div key={ping.id} className={`vg-wave${ping.big ? " is-big" : ""}`} style={{ "--wx": `${ping.x}px`, "--wy": `${ping.y}px`, "--ws": `${ping.size}px` }} aria-hidden>
          <i />
        </div>
      ) : null}
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
      ) : teaser && phase === "idle" ? (
        <div className={`vg-tz${near ? " is-near" : ""}`} role="dialog" aria-label={copy.voiceMsg}>
          <div className="vg-tz-bubble">
            <button type="button" className={`vg-tz-body${bn ? " vg-bn" : ""}`} onClick={tapTeaser} onPointerEnter={warm} aria-label={copy.play}>
              <span className="vg-tz-from"><i className="vg-tz-dot" aria-hidden />{near ? copy.tapMe : copy.voiceMsg}</span>
              <span className="vg-vn" aria-hidden>
                <span className="vg-vn-play"><svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 2.5v11l9.5-5.5z" fill="currentColor" /></svg></span>
                <span className="vg-vn-wave">{WAVE.map((h, i) => <i key={i} style={{ height: h }} />)}</span>
                <span className="vg-vn-len">{secs ? mmss(secs) : "0:15"}</span>
              </span>
            </button>
            <button type="button" className="vg-tz-x" onClick={closeTeaser} aria-label={copy.close}>×</button>
          </div>
          <button type="button" className="vg-tz-orb" onClick={tapTeaser} aria-label={copy.play}>
            <span ref={teaserGaze} className="vg-orb vg-gaze" aria-hidden />
          </button>
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
          <span ref={launchGaze} className="vg-orb vg-gaze" data-state={phase === "opening" ? "connecting" : undefined} aria-hidden />
          <span className={bn ? "vg-launch-bn" : undefined}>{phase === "opening" ? copy.opening : mode === "text" ? copy.launchText : copy.launch}</span>
        </button>
      )}
    </div>
  );
}
