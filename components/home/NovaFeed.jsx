"use client";

// Nova's feed, the moving card in the hero.
//
// Work arrives one line at a time, in the order of her day, starting from the
// real time in Dhaka: the card opens on the last few lines before now, then
// the next ones come in every GAP_MIN to GAP_MAX ms and loop round the day.
// Each line carries its own time. A new line grows in at the top so the
// others slide down smoothly, flashes once, and the orb pulses; the oldest
// fades out under the bottom edge. Lines come from the copy file
// (day.shop / day.svc) and follow the Products / Services / Both switch.
//
// The server renders a fixed late-evening frame (complete with JS off, and
// hydration matches); reduced motion keeps the real-time frame still.
// Off screen or in a hidden tab nothing new arrives.

import { useEffect, useMemo, useRef, useState } from "react";
import { useAudience } from "./Audience";

const SHOWN = 5;
const GAP_MIN = 4000;
const GAP_MAX = 6500;
const FIRST_GAP = 2500;
const SSR_NOW = 23 * 60 + 50;

const toMin = s => {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const bnNum = s => String(s).replace(/\d/g, d => BN_DIGITS[d]);
const bnPart = h => (h < 4 ? "রাত" : h < 6 ? "ভোর" : h < 12 ? "সকাল" : h < 15 ? "দুপুর" : h < 18 ? "বিকেল" : h < 20 ? "সন্ধ্যা" : "রাত");

function fmt(min, lang) {
  const h = Math.floor(min / 60) % 24;
  const m = String(min % 60).padStart(2, "0");
  const h12 = h % 12 === 0 ? 12 : h % 12;
  if (lang === "bn") return `${bnPart(h)} ${bnNum(`${h12}:${m}`)}`;
  return `${h12}:${m} ${h < 12 ? "AM" : "PM"}`;
}

function dhakaNow() {
  const d = new Date();
  return ((d.getUTCHours() + 6) % 24) * 60 + d.getUTCMinutes();
}

/** Index of the last line at or before `now` in a day-sorted list (wraps to the last line). */
function lastBefore(lines, now) {
  let idx = -1;
  lines.forEach((l, i) => { if (l.m <= now) idx = i; });
  return idx === -1 ? lines.length - 1 : idx;
}

/** The SHOWN lines ending at `idx`, newest first, each with a unique arrival number. */
function frameAt(lines, idx) {
  const n = lines.length;
  return Array.from({ length: Math.min(SHOWN, n) }, (_, k) => ({ line: lines[(idx - k + n * 2) % n], n: -k }));
}

export default function NovaFeed({ d, lang = "en" }) {
  const { aud } = useAudience();
  const lines = useMemo(() => {
    const pick = aud === "svc" ? [["svc", d.svc]] : aud === "both" ? [["shop", d.shop], ["svc", d.svc]] : [["shop", d.shop]];
    return pick
      .flatMap(([k, list]) => list.map((e, i) => ({ ...e, m: toMin(e.at), id: `${k}${i}` })))
      .sort((a, b) => a.m - b.m);
  }, [aud, d]);

  const [feed, setFeed] = useState(() => frameAt(lines, lastBefore(lines, SSR_NOW)));
  const [running, setRunning] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    let idx = lastBefore(lines, dhakaNow());
    setFeed(frameAt(lines, idx));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.1 });
    if (box.current) io.observe(box.current);

    let n = 1;
    let timer;
    const next = () => {
      if (visible && !document.hidden) {
        idx = (idx + 1) % lines.length;
        const row = { line: lines[idx], n: n++ };
        setFeed(cur => [row, ...cur].slice(0, SHOWN));
      }
      timer = setTimeout(next, GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN));
    };
    setRunning(true);
    timer = setTimeout(next, FIRST_GAP);
    return () => { clearTimeout(timer); io.disconnect(); };
  }, [lines]);

  const newest = feed[0];

  return (
    <div className="hm-day" ref={box} aria-label={d.title}>
      <div className="hm-day-head">
        <span className="hm-orb-wrap" aria-hidden="true">
          <span className="hm-orb" />
          {running && newest?.n > 0 ? <span key={newest.n} className="hm-orb-ring" /> : null}
        </span>
        <span className="hm-day-title">{d.title}</span>
        <span className="hm-live"><span className="hm-live-dot" />{d.live}</span>
        {aud !== "both" ? <span className="hm-day-store">{d.store[aud]}</span> : null}
      </div>

      <div className="hm-status">
        <span className="hm-typing" aria-hidden="true"><i /><i /><i /></span>
        <span>{d.status}</span>
      </div>

      <ol className="hm-day-list">
        {feed.map((r, i) => (
          <li key={`${r.line.id}-${r.n}`} className={i === 0 && r.n > 0 ? "is-new" : undefined}>
            <div className="hm-day-row">
              <span className="hm-day-at">{fmt(r.line.m, lang)}</span>
              <span className="hm-day-body">
                <span className="hm-day-t">{r.line.t}</span>
                <span className="hm-day-tag">{r.line.tag}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <div className="hm-day-cap">{d.caption}</div>
    </div>
  );
}
