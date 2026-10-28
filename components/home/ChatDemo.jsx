"use client";

// The live chat in "After the chat": a phone plays one conversation where
// Nova turns a customer's messages into an order (shop) or a booking
// (services). Nova's turns show a typing bubble first. When the order or
// booking card lands, the five steps beside the phone light up one by one,
// then the scene holds, fades and plays again. "Both" alternates the two.
//
// The server renders the whole conversation, still, so the section reads
// complete with JS off; reduced motion keeps it that way. Off screen or in a
// hidden tab the scene waits.

import { useEffect, useRef, useState } from "react";
import { useAudience } from "./Audience";

const THEIR_GAP = 1500;   // pause before a customer message
const TYPING = 1400;      // Nova's typing bubble
const STEP_GAP = 1000;    // between lit steps after the card
const HOLD = 3200;        // the finished scene stays this long
const FADE = 500;

export default function ChatDemo({ chat, flow }) {
  const { aud } = useAudience();
  const [kind, setKind] = useState(aud === "svc" ? "svc" : "shop");
  const [shown, setShown] = useState(chat[aud === "svc" ? "svc" : "shop"].length);
  const [typing, setTyping] = useState(false);
  const [lit, setLit] = useState(0);
  const [fading, setFading] = useState(false);
  const [live, setLive] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setKind(aud === "svc" ? "svc" : "shop");
      return undefined;
    }
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.2 });
    if (box.current) io.observe(box.current);

    let timer;
    let cancelled = false;
    const wait = ms => new Promise(res => {
      const tick = () => {
        if (cancelled) return;
        if (!visible || document.hidden) { timer = setTimeout(tick, 400); return; }
        timer = setTimeout(res, ms);
      };
      tick();
    });

    let round = 0;
    const play = async () => {
      setLive(true);
      while (!cancelled) {
        const k = aud === "both" ? (round % 2 ? "svc" : "shop") : aud;
        const script = chat[k];
        setKind(k); setShown(0); setLit(0); setTyping(false); setFading(false);
        await wait(700);
        for (let i = 0; i < script.length && !cancelled; i++) {
          if (script[i].from === "nova") {
            setTyping(true); await wait(TYPING); setTyping(false);
          } else {
            await wait(THEIR_GAP);
          }
          setShown(i + 1);
          if (script[i].from === "nova") await wait(500);
        }
        for (let s = 1; s <= flow[k].length && !cancelled; s++) { await wait(STEP_GAP); setLit(s); }
        await wait(HOLD);
        setFading(true); await wait(FADE);
        round++;
      }
    };
    play();
    return () => { cancelled = true; clearTimeout(timer); io.disconnect(); };
  }, [aud, chat, flow]);

  const script = chat[kind];
  const head = chat.head[kind];

  return (
    <div className="hm-chatdemo" ref={box}>
      <div className={`hm-phone${fading ? " is-fading" : ""}`}>
        <div className="hm-phone-head">
          <span className="hm-phone-av" aria-hidden="true">{head.name.slice(0, 1)}</span>
          <span className="hm-phone-name">{head.name}</span>
          <span className="hm-phone-ch">{head.channel}</span>
        </div>
        <div className="hm-phone-body" aria-live="off">
          {script.slice(0, shown).map((m, i) => (
            <Message key={`${kind}-${i}`} m={m} animate={live} />
          ))}
          {typing ? (
            <div className="hm-msg hm-msg-nova hm-typing-bubble" aria-label={chat.typing}><i /><i /><i /></div>
          ) : null}
        </div>
        <div className="hm-phone-input"><span>{chat.input}</span></div>
      </div>

      <div className="hm-chatsteps">
        <ol className="hm-steps hm-steps-v">
          {flow[kind].map((t, i) => (
            <li key={`${kind}-${i}`} className={!live || lit > i ? "is-lit" : undefined} style={{ "--i": i }}>
              <span className="hm-step-n">{i + 1}</span><span className="hm-body">{t}</span>
            </li>
          ))}
        </ol>
        <p className="hm-chat-cap">{chat.caption}</p>
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
