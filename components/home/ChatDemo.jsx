"use client";

// The live chat in "After the chat", driven by scrolling. The phone stays
// pinned while you scroll through the section: each stretch of scrolling
// brings the next message (Nova's come after her typing dots), and the line
// on the right says what is happening in that message. When the order or
// booking card lands, the right side becomes "Then Dakio carries on" with
// the five steps after the chat, ticking in as you scroll. "Both" plays the
// shop chat, then the booking chat.
//
// Reduced motion gets the whole chat and the five steps, still, with no pin.

import { useEffect, useRef, useState } from "react";
import { useAudience } from "./Audience";

const TYPING = 0.45; // share of a Nova beat spent on the typing dots

export default function ChatDemo({ chat, flow }) {
  const { aud } = useAudience();
  const kinds = aud === "both" ? ["shop", "svc"] : [aud];
  const per = kinds.map(k => chat[k].length + 1);       // messages + the "after" beat
  const total = per.reduce((a, b) => a + b, 0);
  const [x, setX] = useState(0);                         // beats scrolled, 0..total
  const [still, setStill] = useState(false);
  const track = useRef(null);
  const pin = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return undefined; }
    let raf = 0;
    const read = () => {
      raf = 0;
      const t = track.current, p = pin.current;
      if (!t || !p) return;
      const room = t.offsetHeight - p.offsetHeight;
      const done = Math.min(Math.max(-t.getBoundingClientRect().top + parseFloat(getComputedStyle(p).top), 0), room);
      setX(room > 0 ? (done / room) * total * 0.999 : 0);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [total]);

  // Which chat, which beat, and how far into it.
  let k = 0, b = x;
  while (k < kinds.length - 1 && b >= per[k]) { b -= per[k]; k++; }
  const kind = kinds[k];
  const script = chat[kind];
  const beat = still ? script.length : Math.floor(b);
  const frac = b - Math.floor(b);
  const after = beat >= script.length;
  const novaTurn = !after && script[beat].from === "nova";
  const typing = !still && novaTurn && frac < TYPING;
  const shown = after ? script.length : typing ? beat : beat + 1;
  const ticked = still ? flow[kind].length : Math.min(flow[kind].length, Math.ceil(frac * (flow[kind].length + 1)));
  const head = chat.head[kind];

  return (
    <div ref={track} className={`hm-chat-track${still ? " is-still" : ""}`} style={{ "--beats": total }}>
      <div ref={pin} className="hm-chatdemo">
        <div className="hm-phone">
          <div className="hm-phone-head">
            <span className="hm-phone-av" aria-hidden="true">{head.name.slice(0, 1)}</span>
            <span className="hm-phone-name">{head.name}</span>
            <span className="hm-phone-ch">{head.channel}</span>
          </div>
          <div className="hm-phone-body" aria-live="off">
            {script.slice(0, shown).map((m, i) => (
              <Message key={`${kind}-${i}`} m={m} animate={!still} />
            ))}
            {typing ? (
              <div className="hm-msg hm-msg-nova hm-typing-bubble" aria-label={chat.typing}><i /><i /><i /></div>
            ) : null}
          </div>
          <div className="hm-phone-input"><span>{chat.input}</span></div>
        </div>

        <div className="hm-chatside">
          {after ? (
            <div className="hm-chatafter" key={`${kind}-after`}>
              <p className="hm-chatafter-t">{chat.after}</p>
              <ol className="hm-chatafter-list">
                {flow[kind].map((t, i) => (
                  <li key={i} className={i < ticked ? "is-on" : undefined}>
                    <span className="hm-chatafter-tick" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="hm-chatbeat" key={`${kind}-${beat}`}>
              <span className="hm-chatbeat-n">{String(beat + 1).padStart(2, "0")} / {String(script.length).padStart(2, "0")}</span>
              <p className={`hm-chatbeat-t${novaTurn ? " is-nova" : ""}`}>{chat.beats[kind][beat]}</p>
            </div>
          )}
          <div className="hm-chatdots" aria-hidden="true">
            {script.map((_, i) => <i key={i} className={i < shown ? "is-on" : undefined} />)}
            <i className={`is-end${after ? " is-on" : ""}`} />
          </div>
          <p className="hm-chat-cap">{chat.caption}</p>
        </div>
      </div>
    </div>
  );
}

function Message({ m, animate }) {
  const mine = m.from === "nova";
  const cls = `hm-msg ${mine ? "hm-msg-nova" : "hm-msg-them"}${m.tap ? " hm-msg-tap" : ""}${animate ? " is-in" : ""}`;
  return (
    <div className={`hm-msg-wrap ${mine ? "is-nova" : "is-them"}${animate ? " is-in" : ""}`}>
      {m.shot ? (
        <div className="hm-shot" aria-hidden="true">
          {m.img ? <img className="hm-shot-img" src={m.img} alt="" width={150} height={150} loading="lazy" /> : null}
          <span className="hm-shot-cap">{m.shot}</span>
        </div>
      ) : null}
      <div className={cls}>{m.t}</div>
      {m.product ? (
        <div className="hm-pcard">
          {m.product.img ? <img className="hm-pcard-img" src={m.product.img} alt="" width={44} height={56} loading="lazy" /> : null}
          <span className="hm-pcard-txt">
            <b>{m.product.n}</b>
            <span>{m.product.p} · {m.product.note}</span>
          </span>
        </div>
      ) : null}
      {m.chips ? <div className="hm-chips">{m.chips.map(c => <span key={c}>{c}</span>)}</div> : null}
      {m.card ? (
        <div className="hm-rcard">
          <span className="hm-rcard-tick" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </span>
          <span className="hm-rcard-txt"><b>{m.card.t}</b><span>{m.card.d}</span></span>
        </div>
      ) : null}
    </div>
  );
}
