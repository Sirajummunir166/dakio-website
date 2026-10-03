"use client";

// One live call with Nova (DAKIO_VOICE_GUIDE_PLAN.md, cut 3). Loaded only
// after a visitor shows intent — see ./VoiceGuide.
//
// The browser holds the microphone and talks to the model through the AI
// gateway directly; dakio-api only minted the ticket and keeps the books. The
// session's setup (who Nova is, the price list, the tools) came with the
// ticket, built on the server. The three tools are answered right here, with
// no request leaving the page: a look-up is a dictionary read, a page is a
// client-side navigation (the layout survives it, so the call does too).
//
// What we measure, because "fast" is the point: from the moment the visitor's
// voice stops (read off the microphone level) to Nova's first sound.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gateway } from "@ai-sdk/gateway";
import { experimental_useRealtime } from "@ai-sdk/react";
import { lookUpTopic } from "../../content/guide/topics";
import { href } from "../../lib/i18n";
import { REGISTER_URL } from "../../lib/urls";

const COPY = {
  en: {
    connecting: "Connecting…",
    listening: "Listening",
    speaking: "Nova is speaking",
    thinking: "One moment…",
    you: "YOU",
    mute: "Mute",
    unmute: "Unmute",
    end: "End",
    cantHear: "Can't hear Nova?",
    type: "Type instead",
    typePh: "Ask Nova anything…",
    send: "Send",
    startFree: "Start free trial",
    micBlocked: "Your microphone is blocked. You can type to Nova instead.",
    lowTime: "20 seconds left",
    ended: "Thanks for talking with Nova.",
    close: "Close",
    note: "Voice is processed by our AI provider. We keep a text transcript for 30 days to improve answers, never the audio.",
    error: "The call dropped. Please try again.",
  },
  bn: {
    connecting: "সংযোগ হচ্ছে…",
    listening: "শুনছে",
    speaking: "Nova বলছে",
    thinking: "এক মুহূর্ত…",
    you: "আপনি",
    mute: "মিউট",
    unmute: "আনমিউট",
    end: "শেষ",
    cantHear: "Nova-কে শুনতে পাচ্ছেন না?",
    type: "লিখে জিজ্ঞেস করুন",
    typePh: "Nova-কে যা খুশি জিজ্ঞেস করুন…",
    send: "পাঠান",
    startFree: "ফ্রি ট্রায়াল শুরু করুন",
    micBlocked: "আপনার মাইক্রোফোন বন্ধ আছে। চাইলে লিখে জিজ্ঞেস করতে পারেন।",
    lowTime: "আর ২০ সেকেন্ড",
    ended: "Nova-র সাথে কথা বলার জন্য ধন্যবাদ।",
    close: "বন্ধ করুন",
    note: "ভয়েস আমাদের AI প্রোভাইডার প্রসেস করে। উত্তর আরও ভালো করতে আমরা ৩০ দিন লেখা ট্রান্সক্রিপ্ট রাখি, অডিও কখনো না।",
    error: "কলটি কেটে গেছে। আবার চেষ্টা করুন।",
  },
};

const VOICE_RMS = 0.02; // above this the visitor is talking
const BN = /[ঀ-৿]/;
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const textOf = (m) => (m.parts ?? []).filter((p) => p.type === "text").map((p) => p.text).join("").trim();

function track(name, params = {}) {
  try { window.gtag?.("event", name, params); } catch { /* never breaks the call */ }
}

function signupUrl() {
  try {
    const m = document.cookie.match(/(?:^|;\s*)dakio_coupon=([^;]+)/);
    return m ? `${REGISTER_URL}?code=${encodeURIComponent(decodeURIComponent(m[1]))}` : REGISTER_URL;
  } catch { return REGISTER_URL; }
}

export default function VoiceCall({ ticket, lang, onEnded }) {
  const copy = COPY[lang] || COPY.en;
  const router = useRouter();
  const [stream, setStream] = useState(null);
  const [micBlocked, setMicBlocked] = useState(false);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [level, setLevel] = useState(0);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Collected for the report. Refs, because the SDK hands its callbacks over
  // once and the report must read the latest values when the call ends.
  const usages = useRef([]);
  const gaps = useRef([]); // ms per reply, in order
  const lastVoiceAt = useRef(0);
  const seenResponse = useRef(new Set());
  const toolsUsed = useRef([]);
  const signupClicked = useRef(false);
  const finished = useRef(false);
  const captionsEnd = useRef(null);

  const model = useMemo(() => gateway.experimental_realtime(ticket.model), [ticket.model]);

  const onToolCall = useCallback(async ({ toolCall }) => {
    const input = toolCall.input ?? toolCall.args ?? {};
    toolsUsed.current.push(toolCall.toolName);
    if (toolCall.toolName === "look_up") return lookUpTopic(input.topic);
    if (toolCall.toolName === "open_page") {
      const path = typeof input.path === "string" && input.path.startsWith("/") ? input.path : "/";
      router.push(href(lang, path));
      track("voice_open_page", { path });
      return { opened: path, note: "The page is open behind this call panel." };
    }
    if (toolCall.toolName === "start_signup") {
      setShowSignup(true);
      return { shown: "A Start free trial button is now on their screen, in the call panel. Ask them to tap it." };
    }
    return { error: "unknown tool" };
  }, [router, lang]);

  const onEvent = useCallback((ev) => {
    if (ev?.type === "response-done" && ev.raw) usages.current.push(ev.raw);
    if (ev?.type === "audio-delta" && ev.responseId && !seenResponse.current.has(ev.responseId)) {
      seenResponse.current.add(ev.responseId);
      const since = performance.now() - lastVoiceAt.current;
      // Only a reply to something the visitor just SAID counts; a typed turn
      // or a reply after a long silence has no "end of voice" to measure from.
      gaps.current.push(lastVoiceAt.current && since < 8_000 ? Math.round(since) : null);
    }
  }, []);

  const rt = experimental_useRealtime({
    model,
    api: { token: ticket.setupUrl },
    sessionConfig: ticket.sessionConfig,
    onToolCall,
    onEvent,
    onError: () => setFailed(true),
  });
  const { status, messages, connect, close, isPlaying, isCapturing } = rt;

  /** The report: what was said, what it used, how fast it answered. */
  const report = useCallback((endedBy) => {
    const turns = [];
    let reply = 0;
    for (const m of messages) {
      const text = textOf(m);
      if (!text) continue;
      if (m.role === "user") turns.push({ said: text, reply: "", tools: [], gapMs: null });
      else {
        if (!turns.length || turns[turns.length - 1].reply) turns.push({ said: "", reply: "", tools: [], gapMs: null });
        const t = turns[turns.length - 1];
        t.reply = text;
        t.gapMs = gaps.current[reply] ?? null;
        reply += 1;
      }
    }
    if (turns.length) turns[turns.length - 1].tools = toolsUsed.current.slice(-5);
    return {
      closeToken: ticket.closeToken,
      turns,
      usages: usages.current,
      seconds: startedAt ? Math.round((Date.now() - startedAt) / 1000) : 0,
      endedBy,
      signupClicked: signupClicked.current,
    };
  }, [messages, ticket.closeToken, startedAt]);

  const finish = useCallback(async (endedBy = "visitor") => {
    if (finished.current) return;
    finished.current = true;
    try { await close(); } catch { /* a dropped call is still worth recording */ }
    stream?.getTracks().forEach((t) => t.stop());
    const body = report(endedBy);
    const medianGap = [...gaps.current].filter((g) => g != null).sort((a, b) => a - b)[Math.floor(gaps.current.filter((g) => g != null).length / 2)];
    track("voice_end", { seconds: body.seconds, turns: body.turns.length, ended_by: endedBy, median_gap_ms: medianGap ?? null });
    try {
      await fetch(ticket.closeUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), keepalive: true });
    } catch { /* best effort; the api counts the worst case if this never lands */ }
    setEnded(true);
  }, [close, report, stream, ticket.closeUrl]);

  // Open the microphone and the call. The tap that mounted us is the gesture.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let media = null;
      try {
        media = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      } catch {
        setMicBlocked(true);
        setTyping(true);
      }
      if (cancelled) { media?.getTracks().forEach((t) => t.stop()); return; }
      if (media) setStream(media);
      try {
        await connect(media ? { stream: media } : { capture: false });
        if (cancelled) return;
        setStartedAt(Date.now());
        // The greeting: Nova's own recorded voice, while the session settles.
        const hello = new Audio(`/nova-guide/greeting.${lang}.mp3`);
        hello.play().catch(() => { /* no clip yet: the caption greets */ });
        if (ticket.tapAt) track("voice_ready", { ms: Math.round(performance.now() - ticket.tapAt) });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The microphone level: drives the orb, and marks when the visitor stops talking.
  useEffect(() => {
    if (!stream) return undefined;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const src = ctx.createMediaStreamSource(stream);
    const an = ctx.createAnalyser();
    an.fftSize = 1024;
    src.connect(an);
    const buf = new Float32Array(an.fftSize);
    let raf = 0;
    let last = 0;
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 50) return;
      last = t;
      an.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i += 1) sum += buf[i] * buf[i];
      const rms = Math.sqrt(sum / buf.length);
      if (rms > VOICE_RMS) lastVoiceAt.current = performance.now();
      setLevel((prev) => prev * 0.6 + Math.min(1, rms * 8) * 0.4);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ctx.close().catch(() => {}); };
  }, [stream]);

  // The clock, and the cap.
  useEffect(() => {
    if (!startedAt || ended) return undefined;
    const t = setInterval(() => setElapsed(Math.round((Date.now() - startedAt) / 1000)), 500);
    const cap = setTimeout(() => finish("time_cap"), Math.max(0, startedAt + ticket.maxSeconds * 1000 - Date.now()));
    return () => { clearInterval(t); clearTimeout(cap); };
  }, [startedAt, ended, ticket.maxSeconds, finish]);

  // A tab closed mid-call (or a language switch, which remounts the layout)
  // still reports what it used. Only once the call is really open: React's
  // development double-mount unmounts us once before anything has started.
  const reportRef = useRef(report);
  reportRef.current = report;
  const opened = useRef(false);
  useEffect(() => { if (startedAt) opened.current = true; }, [startedAt]);
  useEffect(() => {
    const bye = () => {
      if (finished.current || !opened.current) return;
      finished.current = true;
      try { navigator.sendBeacon(ticket.closeUrl, new Blob([JSON.stringify(reportRef.current("page_closed"))], { type: "text/plain" })); } catch { /* nothing more to do */ }
    };
    window.addEventListener("pagehide", bye);
    return () => { window.removeEventListener("pagehide", bye); bye(); };
  }, [ticket.closeUrl]);

  useEffect(() => { captionsEnd.current?.scrollIntoView({ block: "end" }); }, [messages]);

  const bn = lang === "bn";
  const lines = messages.map((m) => ({ id: m.id, who: m.role, text: textOf(m) })).filter((l) => l.text).slice(-6);
  const live = status === "connected" && !ended;
  const state = !live ? "connecting" : isPlaying ? "speaking" : "listening";
  const statusText = failed ? copy.error : ended ? copy.ended : !live ? copy.connecting : isPlaying ? copy.speaking : copy.listening;
  const lean = state === "listening" ? 1 + level * 0.22 : 1;
  const late = live && ticket.maxSeconds - elapsed <= 20;

  return (
    <div className="vg-panel" role="dialog" aria-label="Nova">
      <div className="vg-head">
        <div
          className="vg-orb"
          data-state={state}
          style={state === "listening" ? { transform: `scale(${lean}, ${1 + (lean - 1) * 0.6})` } : undefined}
          aria-hidden
        />
        <div>
          <div className="vg-title">Nova</div>
          <div className={`vg-status${bn ? " vg-bn" : ""}`} aria-live="polite">{statusText}</div>
        </div>
        {live ? <div className="vg-clock" data-late={late}>{late ? copy.lowTime : `${clock(elapsed)} / ${clock(ticket.maxSeconds)}`}</div> : null}
      </div>

      <div className="vg-captions" aria-live="polite">
        {lines.length === 0 && !ended ? (
          <div className={`vg-line-nova${bn ? " vg-bn" : ""}`}>{ticket.greeting}</div>
        ) : (
          lines.map((l) => (
            <div
              key={l.id}
              className={`${l.who === "user" ? "vg-line-you" : "vg-line-nova"}${BN.test(l.text) ? " vg-bn" : ""}`}
              data-who={copy.you}
            >
              {l.text}
            </div>
          ))
        )}
        {micBlocked ? <div className={`vg-line-note${bn ? " vg-bn" : ""}`}>{copy.micBlocked}</div> : null}
        <div ref={captionsEnd} />
      </div>

      {typing && live ? (
        <form
          className="vg-type"
          onSubmit={(e) => {
            e.preventDefault();
            const text = draft.trim();
            if (!text) return;
            rt.sendTextMessage(text);
            setDraft("");
          }}
        >
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={copy.typePh} aria-label={copy.typePh} className={bn ? "vg-bn" : undefined} />
          <button type="submit" className={`vg-btn${bn ? " vg-btn-bn" : ""}`}>{copy.send}</button>
        </form>
      ) : null}

      <div className="vg-actions">
        {ended || failed ? (
          <>
            <a className={`vg-btn vg-btn-lime${bn ? " vg-btn-bn" : ""}`} href={signupUrl()} onClick={() => { signupClicked.current = true; track("voice_signup_click"); }}>{copy.startFree}</a>
            <button type="button" className={`vg-btn${bn ? " vg-btn-bn" : ""}`} onClick={async () => { if (!finished.current) await finish(failed ? "error" : "visitor"); onEnded(); }}>{copy.close}</button>
          </>
        ) : (
          <>
            {showSignup ? (
              <a
                className={`vg-btn vg-btn-lime${bn ? " vg-btn-bn" : ""}`}
                href={signupUrl()}
                target="_blank"
                rel="noopener"
                onClick={() => { signupClicked.current = true; track("voice_signup_click"); }}
              >
                {copy.startFree}
              </a>
            ) : null}
            {stream ? (
              <button
                type="button"
                className={`vg-btn${bn ? " vg-btn-bn" : ""}`}
                onClick={() => (isCapturing ? rt.stopAudioCapture() : rt.resumeAudioCapture().catch(() => {}))}
                disabled={!live}
              >
                {isCapturing ? copy.mute : copy.unmute}
              </button>
            ) : null}
            {!typing ? <button type="button" className={`vg-btn${bn ? " vg-btn-bn" : ""}`} onClick={() => setTyping(true)} disabled={!live}>{copy.type}</button> : null}
            <button type="button" className={`vg-btn vg-btn-end${bn ? " vg-btn-bn" : ""}`} onClick={() => finish("visitor")}>{copy.end}</button>
          </>
        )}
      </div>

      {live && !isPlaying && messages.some((m) => m.role === "assistant") ? (
        <button type="button" className="vg-note" style={{ background: "none", border: 0, padding: 0, cursor: "pointer", color: "#A3A693" }} onClick={() => rt.resumePlayback().catch(() => {})}>
          {copy.cantHear}
        </button>
      ) : null}
      <p className={`vg-note${bn ? " vg-bn" : ""}`}>{copy.note}</p>
    </div>
  );
}
