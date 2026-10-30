"use client";

// The live chat in "After the chat", driven by scrolling. The phone stays
// pinned while you scroll through the section: each stretch of scrolling
// brings the next message (Nova's come after her typing dots), and the line
// on the right says what is happening in that message. When the order or
// booking card lands, the right side becomes "Then Dakio carries on" with
// the five steps after the chat, ticking in as you scroll. "Both" plays the
// shop chat, then the booking chat.
//
// To make it easy to follow: each bubble says who is talking (the customer's
// initial, or Nova's orb), the newest message is in focus and the earlier ones
// fade back, the special bubbles carry a tag (a screenshot of the post, a
// product card, the order), and a dashed line with a dot joins the line on the
// right to the message it explains.
//
// With "Both", each chat opens with its own title card inside the phone ("For
// shops: Saril, a clothing shop", then "For services: Glow Studio, a beauty
// parlour"), a pill on the right keeps saying which one is playing, and the
// service chat has its own header colour, so the two never blur together.
//
// Reduced motion gets the whole chat and the five steps, still, with no pin.
//
// Sounds (lib/sound.js), soft ticks like a phone keyboard: one when a
// customer's message lands, a faint one when Nova starts typing, a lower "tock"
// for her reply, a double tick for the order or booking card, and a tiny tick
// per step after the chat. Only
// going forward, never on the way back up, at most one sound per moment. The
// speaker in the phone turns them off (remembered); browsers play nothing
// until the visitor has tapped or clicked something, so until then the speaker
// is grey with "Tap for sound", and tapping it is that permission.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { play, canPlay, SOUNDS } from "../../lib/sound";
import { useAudience } from "./Audience";

const TYPING = 0.45; // share of a Nova beat spent on the typing dots
const KIND_ICON = {
  shop: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>,
  svc: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>,
};
const SOUND_KEY = "dakio-chat-sound"; // "off" when the visitor turned the sounds off

export default function ChatDemo({ chat, flow }) {
  const { aud } = useAudience();
  const kinds = aud === "both" ? ["shop", "svc"] : [aud];
  const both = kinds.length > 1;
  const per = kinds.map(k => chat[k].length + 1 + (both ? 1 : 0)); // [title card +] messages + the "after" beat
  const total = per.reduce((a, b) => a + b, 0);
  const [x, setX] = useState(0);                         // beats scrolled, 0..total
  const [still, setStill] = useState(false);
  const track = useRef(null);
  const pin = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return undefined; }
    // The scroll room is measured once, and again only when the width changes.
    // On phones the words under the phone are inside the pinned block, so its
    // height changes with every line; measuring it on each scroll let a new line
    // move the reading back to the previous message, and the chat flickered
    // between the two while you stopped to read. (A phone's address bar showing
    // or hiding fires resize without a width change; that is ignored too.)
    // On a small phone the pinned block can be taller than the screen, and it
    // grows when the steps list comes in; the room then only ever shrinks (the
    // tallest height seen so far), one step forward, never back and forth.
    // A thumb resting on the line between two messages moves a pixel or two;
    // backward moves under a tenth of a message are ignored, so it holds still.
    const SLACK = 0.1;
    let raf = 0, room = 0, top = 0, width = -1, tallest = 0, shownX = 0;
    const measure = () => {
      const t = track.current, p = pin.current;
      if (!t || !p) return;
      width = window.innerWidth;
      top = parseFloat(getComputedStyle(p).top) || 0;
      tallest = Math.max(p.offsetHeight, window.innerHeight - top);
      // Finish by the time the track's end reaches the bottom of the screen, so
      // the last step (the tallest, with its list) is read while still pinned.
      room = t.offsetHeight - tallest;
    };
    const read = () => {
      raf = 0;
      const t = track.current, p = pin.current;
      if (!t || !p) return;
      if (width !== window.innerWidth) measure();
      else if (p.offsetHeight > tallest) { tallest = p.offsetHeight; room = t.offsetHeight - tallest; }
      const done = Math.min(Math.max(-t.getBoundingClientRect().top + top, 0), room);
      const next = room > 0 ? (done / room) * total * 0.999 : 0;
      if (next < shownX && shownX - next < SLACK && next > 0) return;
      shownX = next;
      setX(next);
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
  const intro = both && !still && b < 1; // the chat's title card
  const bb = both && !still ? b - 1 : b;
  const beat = still ? script.length : intro ? 0 : Math.floor(bb);
  const frac = intro ? 0 : bb - Math.floor(bb);
  const after = beat >= script.length;
  const novaTurn = !after && script[beat].from === "nova";
  const typing = !still && novaTurn && frac < TYPING;
  const shown = intro ? 0 : after ? script.length : typing ? beat : beat + 1;
  const ticked = still ? flow[kind].length : Math.min(flow[kind].length, Math.ceil(frac * (flow[kind].length + 1)));
  const head = chat.head[kind];
  const who = { them: chat.who.them, nova: chat.who.nova, name: chat.customer[kind] };
  const latest = typing ? -1 : shown - 1;

  // The dashed line from the explanation to the message it explains.
  const demo = useRef(null);
  const beatText = useRef(null);
  const newest = useRef(null);
  const [line, setLine] = useState(null);
  useLayoutEffect(() => {
    if (still || after || intro) { setLine(null); return undefined; }
    const draw = () => {
      const box = demo.current?.getBoundingClientRect();
      const t = beatText.current?.getBoundingClientRect();
      const m = newest.current?.querySelector(".hm-msg")?.getBoundingClientRect();
      if (!box || !t || !m) { setLine(null); return; }
      const side = t.left > m.right; // laptops: the words sit beside the phone
      const pin = side
        ? { x: m.right - box.left, y: m.top + m.height / 2 - box.top }
        : { x: m.left + m.width / 2 - box.left, y: m.bottom - box.top };
      // Phones: straight down out of the phone, stopping above the words (and
      // above the shop / service pill when it is there).
      const below = (demo.current.querySelector(".hm-chatkind") || beatText.current).getBoundingClientRect();
      const end = side
        ? { x: t.left - box.left - 14, y: t.top + 20 - box.top }
        : { x: pin.x, y: below.top - box.top - 6 };
      const d = side
        ? `M${pin.x} ${pin.y} H${(pin.x + end.x) / 2} V${end.y} H${end.x}`
        : `M${pin.x} ${pin.y} V${end.y}`;
      setLine({ d, pin, w: box.width, h: box.height });
    };
    draw();
    const settle = window.setTimeout(draw, 480); // after the bubble's slide-in
    window.addEventListener("resize", draw);
    return () => { window.clearTimeout(settle); window.removeEventListener("resize", draw); };
  }, [kind, beat, shown, typing, after, still, intro]);

  // The sound for each new moment, going forward only.
  const [soundPref, setSoundPref] = useState(true);
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    try { setSoundPref(localStorage.getItem(SOUND_KEY) !== "off"); } catch { /* storage may be off */ }
    if (canPlay()) { setAllowed(true); return undefined; }
    // A tap on the speaker itself is handled by the speaker (it must not shrink mid-tap).
    const on = (e) => { if (!e.target.closest?.(".hm-phone-sound")) setAllowed(canPlay()); };
    window.addEventListener("pointerdown", on, { capture: true });
    window.addEventListener("keydown", on, { capture: true });
    return () => { window.removeEventListener("pointerdown", on, { capture: true }); window.removeEventListener("keydown", on, { capture: true }); };
  }, []);
  const soundOn = soundPref && allowed && !still;
  const reached = useRef(-1); // the furthest moment already played
  const moment = k * 1000 + (intro ? 0 : after ? 500 + ticked : 1 + shown * 2 + (typing ? 1 : 0));
  const sound = intro ? null : after ? (ticked > 0 ? "step" : null) : typing ? "typing" : script[shown - 1]?.card ? "done" : script[shown - 1]?.from === "nova" ? "nova" : "them";
  useEffect(() => {
    if (moment <= reached.current) return;
    const first = reached.current < 0;
    reached.current = moment;
    if (!first && soundOn && sound) play(SOUNDS[sound]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment]);
  // A tap on "Tap for sound" turns sound on; a tap on the lime speaker turns it off.
  const toggleSound = () => {
    const next = !soundOn;
    setAllowed(canPlay());
    setSoundPref(next);
    try { localStorage.setItem(SOUND_KEY, next ? "on" : "off"); } catch { /* fine */ }
    if (next) play(SOUNDS.them);
  };

  return (
    <div ref={track} className={`hm-chat-track${still ? " is-still" : ""}`} style={{ "--beats": total }}>
      <div ref={(el) => { pin.current = el; demo.current = el; }} className="hm-chatdemo">
        <div className={`hm-phone is-${kind}`}>
          <div className="hm-phone-head">
            <span className="hm-phone-av" aria-hidden="true">{head.name.slice(0, 1)}</span>
            <span className="hm-phone-name">{head.name}</span>
            <span className="hm-phone-ch">{head.channel}</span>
            {still ? null : (
              <button type="button" className={`hm-phone-sound${soundOn ? " is-on" : ""}${soundPref && !allowed ? " is-ask" : ""}`} onClick={toggleSound} aria-pressed={soundOn} aria-label={soundOn ? chat.soundOff : chat.soundOn} title={soundOn ? chat.soundOff : chat.soundOn}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
                  {soundOn ? <path d="M15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14" /> : <path d="M16 9l6 6M22 9l-6 6" />}
                </svg>
                {soundPref && !allowed ? <span className="hm-phone-sound-ask">{chat.soundAsk}</span> : null}
              </button>
            )}
          </div>
          <div className="hm-phone-body" aria-live="off">
            {intro ? (
              <div className="hm-chatcard" key={`${kind}-card`}>
                <span className="hm-chatcard-ic" aria-hidden="true">{KIND_ICON[kind]}</span>
                <span className="hm-chatcard-tag">{chat.intro[kind].tag}</span>
                <b className="hm-chatcard-t">{chat.intro[kind].name}</b>
                <span className="hm-chatcard-d">{chat.intro[kind].sub}</span>
              </div>
            ) : null}
            {script.slice(0, shown).map((m, i) => (
              <Message key={`${kind}-${i}`} m={m} animate={!still} who={who} tags={chat.tags} kind={kind}
                state={still ? null : i === latest ? "now" : "past"} wrapRef={i === latest ? newest : null} />
            ))}
            {typing ? (
              <div className="hm-msg hm-msg-nova hm-typing-bubble" aria-label={chat.typing}><i /><i /><i /></div>
            ) : null}
          </div>
          <div className="hm-phone-input"><span>{chat.input}</span></div>
        </div>

        <div className="hm-chatside">
          {both && !still ? (
            <span className={`hm-chatkind is-${kind}`}>{KIND_ICON[kind]}{chat.intro[kind].tag}<i>{k + 1} / {kinds.length}</i></span>
          ) : null}
          {intro ? (
            <div className="hm-chatbeat" key={`${kind}-intro`}>
              <p className="hm-chatbeat-t is-nova">{chat.intro[kind].line}</p>
            </div>
          ) : after ? (
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
              <p ref={beatText} className={`hm-chatbeat-t${novaTurn ? " is-nova" : ""}`}>{chat.beats[kind][beat]}</p>
            </div>
          )}
          <div className="hm-chatdots" aria-hidden="true">
            {script.map((_, i) => <i key={i} className={i < shown ? "is-on" : undefined} />)}
            <i className={`is-end${after ? " is-on" : ""}`} />
          </div>
          <p className="hm-chat-cap">{chat.caption}</p>
        </div>
        {line ? (
          <svg className="hm-chatline" width={line.w} height={line.h} viewBox={`0 0 ${line.w} ${line.h}`} aria-hidden="true">
            <path key={`${kind}-${beat}-${typing}`} d={line.d} />
            <circle cx={line.pin.x} cy={line.pin.y} r="5" />
          </svg>
        ) : null}
      </div>
    </div>
  );
}

function Message({ m, animate, who, tags, kind, state, wrapRef }) {
  const mine = m.from === "nova";
  const cls = `hm-msg ${mine ? "hm-msg-nova" : "hm-msg-them"}${m.tap ? " hm-msg-tap" : ""}${animate ? " is-in" : ""}`;
  const Tag = ({ t }) => <span className="hm-tag">{t}</span>;
  return (
    <div ref={wrapRef} className={`hm-msg-wrap ${mine ? "is-nova" : "is-them"}${animate ? " is-in" : ""}${state ? ` is-${state}` : ""}`}>
      <span className="hm-who">
        {mine ? <i className="hm-who-orb" aria-hidden="true" /> : <i className="hm-who-av" aria-hidden="true">{who.name.slice(0, 1)}</i>}
        {mine ? who.nova : `${who.name} · ${who.them}`}
      </span>
      {m.shot ? (
        <>
          <Tag t={tags.shot} />
          <div className="hm-shot" aria-hidden="true">
            {m.img ? <img className="hm-shot-img" src={m.img} alt="" width={150} height={150} loading="lazy" /> : null}
            <span className="hm-shot-cap">{m.shot}</span>
          </div>
        </>
      ) : null}
      {m.tap ? <Tag t={tags.tap} /> : null}
      <div className={cls}>{m.t}</div>
      {m.product ? (
        <>
          <Tag t={tags.product} />
          <div className="hm-pcard">
            {m.product.img ? <img className="hm-pcard-img" src={m.product.img} alt="" width={44} height={56} loading="lazy" /> : null}
            <span className="hm-pcard-txt">
              <b>{m.product.n}</b>
              <span>{m.product.p} · {m.product.note}</span>
            </span>
          </div>
        </>
      ) : null}
      {m.chips ? (
        <>
          <Tag t={tags.chips} />
          <div className="hm-chips">{m.chips.map(c => <span key={c}>{c}</span>)}</div>
        </>
      ) : null}
      {m.card ? (
        <>
          <Tag t={kind === "svc" ? tags.booking : tags.order} />
          <div className="hm-rcard">
            <span className="hm-rcard-tick" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            <span className="hm-rcard-txt"><b>{m.card.t}</b><span>{m.card.d}</span></span>
          </div>
        </>
      ) : null}
    </div>
  );
}
