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
    listening: "Listening…",
    muted: "Muted",
    speaking: "Speaking",
    mute: "Mute",
    unmute: "Unmute",
    end: "End",
    startFree: "Start free trial",
    micBlocked: "Allow the microphone to talk to Nova",
    ended: "Thanks for talking with Nova.",
    close: "Close",
    error: "The call dropped. Please try again.",
  },
  bn: {
    connecting: "সংযোগ হচ্ছে…",
    listening: "শুনছি…",
    muted: "মিউট করা",
    speaking: "বলছি",
    mute: "মিউট",
    unmute: "আনমিউট",
    end: "শেষ",
    startFree: "ফ্রি ট্রায়াল শুরু করুন",
    micBlocked: "Nova-র সাথে কথা বলতে মাইক্রোফোন চালু করুন",
    ended: "Nova-র সাথে কথা বলার জন্য ধন্যবাদ।",
    close: "বন্ধ করুন",
    error: "কলটি কেটে গেছে। আবার চেষ্টা করুন।",
  },
};

const VOICE_RMS = 0.02; // above this the visitor is talking
const GREET_NOTE = "(The call has just connected. Greet the visitor now.)";
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
      if (!text || text === GREET_NOTE) continue;
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
      }
      if (cancelled) { media?.getTracks().forEach((t) => t.stop()); return; }
      if (media) setStream(media);
      try {
        await connect(media ? { stream: media } : { capture: false });
        if (cancelled) return;
        setStartedAt(Date.now());
        if (ticket.tapAt) track("voice_ready", { ms: Math.round(performance.now() - ticket.tapAt) });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once the call is up: open the microphone and let Nova speak first. The
  // SDK only REMEMBERS a stream handed to connect() — nothing is sent until
  // capture is started, which is why every call used to begin muted.
  const greeted = useRef(false);
  useEffect(() => {
    if (status !== "connected" || greeted.current) return;
    greeted.current = true;
    if (stream) {
      try { rt.startAudioCapture(stream); } catch { /* the mic button can still start it */ }
    }
    // A bare "your turn" is not enough for every model: Gemini Live waits for
    // something to answer. So the greeting rides on a hidden note — never
    // shown, never saved (see `report`).
    (async () => {
      await rt.sendEvent({ type: "conversation-item-create", item: { type: "text-message", role: "user", text: GREET_NOTE } });
      rt.requestResponse();
    })().catch(() => { /* without a greeting the visitor simply talks first */ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, stream]);

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

  const bn = lang === "bn";
  // Only what Nova is saying now: the conversation is heard, not read.
  const lastNova = [...messages].reverse().find((m) => m.role === "assistant" && textOf(m));
  const caption = lastNova ? textOf(lastNova) : "";
  const live = status === "connected" && !ended;
  const state = !live ? "connecting" : isPlaying ? "speaking" : "listening";
  const statusText = failed ? copy.error : ended ? copy.ended : micBlocked ? copy.micBlocked : !live ? copy.connecting : isPlaying ? copy.speaking : isCapturing ? copy.listening : copy.muted;
  const lean = state === "listening" && isCapturing ? 1 + level * 0.22 : 1;
  const late = live && ticket.maxSeconds - elapsed <= 20;

  return (
    <div className="vg-panel vg-call" role="dialog" aria-label="Nova">
      <div className="vg-head">
        <div
          className="vg-orb"
          data-state={state}
          style={state === "listening" ? { transform: `scale(${lean}, ${1 + (lean - 1) * 0.6})` } : undefined}
          aria-hidden
        />
        <div style={{ minWidth: 0 }}>
          <div className="vg-title">Nova</div>
          <div className={`vg-status${bn ? " vg-bn" : ""}`} aria-live="polite">{statusText}</div>
        </div>
        {live ? <div className="vg-clock" data-late={late}>{clock(elapsed)}</div> : null}
      </div>

      {caption ? <p className={`vg-caption${BN.test(caption) ? " vg-bn" : ""}`}>{caption}</p> : null}

      <div className="vg-actions">
        {ended || failed ? (
          <>
            <a className={`vg-btn vg-btn-lime${bn ? " vg-btn-bn" : ""}`} href={signupUrl()} onClick={() => { signupClicked.current = true; track("voice_signup_click"); }}>{copy.startFree}</a>
            <button type="button" className={`vg-btn vg-btn-end${bn ? " vg-btn-bn" : ""}`} onClick={async () => { if (!finished.current) await finish(failed ? "error" : "visitor"); onEnded(); }}>{copy.close}</button>
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
                className="vg-icon-btn"
                data-off={!isCapturing}
                onClick={() => (isCapturing ? rt.stopAudioCapture() : rt.resumeAudioCapture().catch(() => {}))}
                disabled={!live}
                aria-label={isCapturing ? copy.mute : copy.unmute}
                title={isCapturing ? copy.mute : copy.unmute}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
                  {!isCapturing ? <path d="M3 3l18 18" /> : null}
                </svg>
              </button>
            ) : null}
            <button type="button" className={`vg-btn vg-btn-hangup${bn ? " vg-btn-bn" : ""}`} onClick={() => finish("visitor")}>{copy.end}</button>
          </>
        )}
      </div>
    </div>
  );
}
