"use client";

// Nova's clock, the moving card in the hero.
//
// One example day replays fast (SPEED Nova minutes per real second, so a day
// takes about a minute and a half), starting at the visitor's real Dhaka time.
// As the clock passes a duty, that work slides into the feed, its dot on the
// day track lights up and the orb pulses. The lines come from the copy file
// (day.shop / day.svc) and follow the Products / Services / Both switch.
//
// The server renders a fixed late-evening frame, so the card reads complete
// with JS off and hydration matches. Reduced motion keeps that still frame at
// the real time. Off screen or in a hidden tab the clock stops.

import { useEffect, useMemo, useRef, useState } from "react";
import { useAudience } from "./Audience";

const SPEED = 15;
const TICK_MS = 100;
const DAY = 1440;
const SHOWN = 5;
const SSR_T = 23 * 60 + 50;

const toMin = s => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnNum = s => String(s).replace(/\d/g, d => BN_DIGITS[d]);
const bnPart = h => (h < 4 ? "রাত" : h < 6 ? "ভোর" : h < 12 ? "সকাল" : h < 15 ? "দুপুর" : h < 18 ? "বিকেল" : h < 20 ? "সন্ধ্যা" : "রাত");

function fmt(min, lang) {
  const h = Math.floor(min / 60) % 24;
  const m = String(Math.floor(min % 60)).padStart(2, "0");
  const h12 = h % 12 === 0 ? 12 : h % 12;
  if (lang === "bn") return `${bnPart(h)} ${bnNum(`${h12}:${m}`)}`;
  return `${h12}:${m} ${h < 12 ? "AM" : "PM"}`;
}

function dhakaNow() {
  const d = new Date();
  return ((d.getUTCHours() + 6) % 24) * 60 + d.getUTCMinutes();
}

export default function NovaClock({ d, lang = "en" }) {
  const { aud } = useAudience();
  const [t, setT] = useState(SSR_T);
  const [running, setRunning] = useState(false);
  const box = useRef(null);

  const events = useMemo(() => {
    const pick = aud === "svc" ? [["svc", d.svc]] : aud === "both" ? [["shop", d.shop], ["svc", d.svc]] : [["shop", d.shop]];
    return pick
      .flatMap(([k, list]) => list.map((e, i) => ({ ...e, m: toMin(e.at), key: `${k}${i}` })))
      .sort((a, b) => a.m - b.m);
  }, [aud, d]);

  useEffect(() => {
    setT(dhakaNow());
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.1 });
    if (box.current) io.observe(box.current);
    setRunning(true);
    const id = setInterval(() => {
      if (!visible || document.hidden) return;
      setT(x => (x + (SPEED * TICK_MS) / 1000) % DAY);
    }, TICK_MS);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  // Newest first: today's events up to now, then last night's later ones.
  const shown = useMemo(() => {
    const done = events.filter(e => e.m <= t).reverse();
    const before = events.filter(e => e.m > t).reverse();
    return [...done, ...before].slice(0, SHOWN);
  }, [events, t]);
  const newest = shown[0]?.key;

  return (
    <div className="hm-day" ref={box} aria-label={d.title}>
      <div className="hm-day-head">
        <span className="hm-orb-wrap" aria-hidden="true">
          <span className="hm-orb" />
          {running ? <span key={newest} className="hm-orb-ring" /> : null}
        </span>
        <span className="hm-day-title">{d.title}</span>
        <span className="hm-live"><span className="hm-live-dot" />{d.live}</span>
        <span className="hm-clock" aria-live="off">{fmt(t, lang)}</span>
      </div>

      <div className="hm-status">
        <span className="hm-typing" aria-hidden="true"><i /><i /><i /></span>
        <span>{d.status}</span>
        {aud !== "both" ? <span className="hm-day-store">{d.store[aud]}</span> : null}
      </div>

      <div className="hm-track" aria-hidden="true">
        <div className="hm-track-bar">
          <div className="hm-track-fill" style={{ width: `${(t / DAY) * 100}%` }} />
          {events.map(e => (
            <span key={e.key} className={`hm-track-dot${e.m <= t ? " is-done" : ""}${e.key === newest ? " is-now" : ""}`} style={{ left: `${(e.m / DAY) * 100}%` }} />
          ))}
          <span className="hm-track-cursor" style={{ left: `${(t / DAY) * 100}%` }} />
        </div>
        <div className="hm-track-marks">{d.marks.map((mk, i) => <span key={mk} style={{ left: `${i * 25}%` }}>{mk}</span>)}</div>
      </div>

      <ol className="hm-day-list">
        {shown.map(e => (
          <li key={e.key} className={e.key === newest && running ? "is-new" : undefined}>
            <span className="hm-day-at">{fmt(e.m, lang)}</span>
            <span className="hm-day-t">{e.t}</span>
            <span className="hm-day-tag">{e.tag}</span>
          </li>
        ))}
      </ol>
      <div className="hm-day-cap">{d.caption}</div>
    </div>
  );
}
