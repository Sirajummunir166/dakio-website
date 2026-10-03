"use client";

// A typed chat with Nova — the guide's "text" mode (DAKIO_VOICE_GUIDE_PLAN.md).
// Loaded only after a visitor shows intent — see ./VoiceGuide.
//
// Same Nova, same facts, same two actions as the voice call, written instead
// of spoken: dakio-api streams each answer (POST /chat), built from the sheet
// it holds; the browser only sends the conversation and its one-chat ticket.
// "Open a page" and "Start free trial" run here — a page is a client-side
// navigation (the layout survives it, so the chat does too).

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { href } from "../../lib/i18n";
import { REGISTER_URL } from "../../lib/urls";

const COPY = {
  en: {
    ready: "Online",
    thinking: "Nova is typing…",
    you: "YOU",
    placeholder: "Ask Nova anything…",
    send: "Send",
    end: "End",
    startFree: "Start free trial",
    close: "Close",
    ended: "Thanks for chatting with Nova.",
    note: "Answers come from our AI. We keep the chat text for 30 days to improve answers.",
    error: "Nova could not answer. Please try again.",
  },
  bn: {
    ready: "অনলাইন",
    thinking: "Nova লিখছে…",
    you: "আপনি",
    placeholder: "Nova-কে যা খুশি জিজ্ঞেস করুন…",
    send: "পাঠান",
    end: "শেষ",
    startFree: "ফ্রি ট্রায়াল শুরু করুন",
    close: "বন্ধ করুন",
    ended: "Nova-র সাথে কথা বলার জন্য ধন্যবাদ।",
    note: "উত্তর দেয় আমাদের AI। উত্তর আরও ভালো করতে আমরা ৩০ দিন চ্যাটের লেখা রাখি।",
    error: "Nova উত্তর দিতে পারেনি। আবার চেষ্টা করুন।",
  },
};

const BN = /[ঀ-৿]/;
const textOf = (m) => (m.parts ?? []).filter((p) => p.type === "text").map((p) => p.text).join("").trim();

function track(name, params = {}) {
  try { window.gtag?.("event", name, params); } catch { /* never breaks the chat */ }
}

function signupUrl() {
  try {
    const m = document.cookie.match(/(?:^|;\s*)dakio_coupon=([^;]+)/);
    return m ? `${REGISTER_URL}?code=${encodeURIComponent(decodeURIComponent(m[1]))}` : REGISTER_URL;
  } catch { return REGISTER_URL; }
}

export default function TextChat({ ticket, lang, onEnded }) {
  const copy = COPY[lang] || COPY.en;
  const router = useRouter();
  const [draft, setDraft] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [ended, setEnded] = useState(false);
  const signupClicked = useRef(false);
  const finished = useRef(false);
  const sentAt = useRef(0);
  const gaps = useRef([]);
  const startedAt = useRef(Date.now());
  const bottom = useRef(null);
  const input = useRef(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: ticket.chatUrl, body: { chatToken: ticket.chatToken } }), [ticket.chatUrl, ticket.chatToken]);

  const chat = useChat({
    transport,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    onToolCall: ({ toolCall }) => {
      const args = toolCall.input ?? {};
      if (toolCall.toolName === "open_page") {
        const path = typeof args.path === "string" && args.path.startsWith("/") ? args.path : "/";
        router.push(href(lang, path));
        track("voice_open_page", { path, mode: "text" });
        chat.addToolOutput({ tool: "open_page", toolCallId: toolCall.toolCallId, output: { opened: path } });
      } else if (toolCall.toolName === "start_signup") {
        setShowSignup(true);
        chat.addToolOutput({ tool: "start_signup", toolCallId: toolCall.toolCallId, output: { shown: "A Start free trial button is now under the chat. Ask them to tap it." } });
      }
    },
  });
  const { messages, status, sendMessage, error } = chat;
  const busy = status === "submitted" || status === "streaming";

  // Time to the first words of each answer — the text-mode speed number.
  const lastAssistantText = messages.length && messages[messages.length - 1].role === "assistant" ? textOf(messages[messages.length - 1]) : "";
  useEffect(() => {
    if (sentAt.current && lastAssistantText) {
      gaps.current.push(Math.round(performance.now() - sentAt.current));
      sentAt.current = 0;
    }
  }, [lastAssistantText]);

  useEffect(() => { bottom.current?.scrollIntoView({ block: "end" }); }, [messages, status]);
  useEffect(() => { input.current?.focus(); }, []);

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
    return {
      closeToken: ticket.closeToken,
      turns,
      usages: [],
      seconds: Math.round((Date.now() - startedAt.current) / 1000),
      endedBy,
      signupClicked: signupClicked.current,
    };
  }, [messages, ticket.closeToken]);

  const finish = useCallback(async (endedBy = "visitor") => {
    if (finished.current) return;
    finished.current = true;
    const body = report(endedBy);
    track("voice_end", { mode: "text", turns: body.turns.length, ended_by: endedBy });
    try {
      await fetch(ticket.closeUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), keepalive: true });
    } catch { /* best effort */ }
    setEnded(true);
  }, [report, ticket.closeUrl]);

  // A tab closed mid-chat still reports, once a message was sent.
  const reportRef = useRef(report);
  reportRef.current = report;
  const asked = messages.some((m) => m.role === "user");
  const askedRef = useRef(false);
  askedRef.current = asked;
  useEffect(() => {
    const bye = () => {
      if (finished.current || !askedRef.current) return;
      finished.current = true;
      try { navigator.sendBeacon(ticket.closeUrl, new Blob([JSON.stringify(reportRef.current("page_closed"))], { type: "text/plain" })); } catch { /* nothing more to do */ }
    };
    window.addEventListener("pagehide", bye);
    return () => { window.removeEventListener("pagehide", bye); bye(); };
  }, [ticket.closeUrl]);

  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy || ended) return;
    sentAt.current = performance.now();
    sendMessage({ text });
    setDraft("");
  };

  const bn = lang === "bn";
  const lines = messages.map((m) => ({ id: m.id, who: m.role, text: textOf(m) })).filter((l) => l.text);
  const errorText = error ? (() => { try { return JSON.parse(error.message)?.error; } catch { return null; } })() || copy.error : null;

  return (
    <div className="vg-panel" role="dialog" aria-label="Nova">
      <div className="vg-head">
        <div className="vg-orb" data-state={busy ? "speaking" : "idle-call"} style={{ width: 44, height: 44 }} aria-hidden />
        <div>
          <div className="vg-title">Nova</div>
          <div className={`vg-status${bn ? " vg-bn" : ""}`} aria-live="polite">{ended ? copy.ended : busy ? copy.thinking : copy.ready}</div>
        </div>
      </div>

      <div className="vg-captions" aria-live="polite" style={{ maxHeight: 300 }}>
        <div className={`vg-line-nova${bn ? " vg-bn" : ""}`}>{ticket.greeting}</div>
        {lines.map((l) => (
          <div key={l.id} className={`${l.who === "user" ? "vg-line-you" : "vg-line-nova"}${BN.test(l.text) ? " vg-bn" : ""}`} data-who={copy.you}>
            {l.text}
          </div>
        ))}
        {errorText ? <div className={`vg-line-note${bn ? " vg-bn" : ""}`}>{errorText}</div> : null}
        <div ref={bottom} />
      </div>

      {!ended ? (
        <form className="vg-type" onSubmit={send}>
          <input
            ref={input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            maxLength={1000}
            className={bn ? "vg-bn" : undefined}
          />
          <button type="submit" className={`vg-btn vg-btn-lime${bn ? " vg-btn-bn" : ""}`} disabled={busy || !draft.trim()}>{copy.send}</button>
        </form>
      ) : null}

      <div className="vg-actions">
        {showSignup || ended ? (
          <a
            className={`vg-btn vg-btn-lime${bn ? " vg-btn-bn" : ""}`}
            href={signupUrl()}
            target="_blank"
            rel="noopener"
            onClick={() => { signupClicked.current = true; track("voice_signup_click", { mode: "text" }); }}
          >
            {copy.startFree}
          </a>
        ) : null}
        {ended ? (
          <button type="button" className={`vg-btn vg-btn-end${bn ? " vg-btn-bn" : ""}`} onClick={onEnded}>{copy.close}</button>
        ) : (
          <button type="button" className={`vg-btn vg-btn-end${bn ? " vg-btn-bn" : ""}`} onClick={async () => { if (asked) await finish("visitor"); else { finished.current = true; onEnded(); } }}>{copy.end}</button>
        )}
      </div>
      <p className={`vg-note${bn ? " vg-bn" : ""}`}>{copy.note}</p>
    </div>
  );
}
