"use client";

// Nova's feed, the moving card in the hero.
//
// Work arrives one line at a time and keeps coming: each new line slides in on
// top with a flash and a "Just now" mark, the orb pulses, older lines slide
// down and fade out under the bottom edge. The order is shuffled and the gaps
// vary (GAP_MIN to GAP_MAX), so it reads like someone working, not a ticker.
// Lines come from the copy file (day.shop / day.svc) and follow the
// Products / Services / Both switch.
//
// The server renders the first SHOWN lines as a still frame, so the card is
// complete with JS off; reduced motion keeps that frame. Off screen or in a
// hidden tab nothing new arrives.

import { useEffect, useMemo, useRef, useState } from "react";
import { useAudience } from "./Audience";

const SHOWN = 5;
const GAP_MIN = 1400;
const GAP_MAX = 3200;
const FIRST_GAP = 1200;

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function NovaFeed({ d }) {
  const { aud } = useAudience();
  const lines = useMemo(() => {
    const pick = aud === "svc" ? [["svc", d.svc]] : aud === "both" ? [["shop", d.shop], ["svc", d.svc]] : [["shop", d.shop]];
    const all = pick.map(([k, list]) => list.map((e, i) => ({ ...e, id: `${k}${i}` })));
    // For "both", interleave the two lists so the still frame shows each kind.
    if (all.length === 1) return all[0];
    const out = [];
    for (let i = 0; i < Math.max(...all.map(l => l.length)); i++) all.forEach(l => { if (l[i]) out.push(l[i]); });
    return out;
  }, [aud, d]);

  // Each shown row: { line, n } where n makes the key unique per arrival.
  const [feed, setFeed] = useState(() => lines.slice(0, SHOWN).map((line, n) => ({ line, n })));
  const [running, setRunning] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    setFeed(lines.slice(0, SHOWN).map((line, n) => ({ line, n })));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.1 });
    if (box.current) io.observe(box.current);

    // Queue: everything not on screen first, then reshuffled rounds that never
    // repeat a line that is still visible.
    let queue = shuffle(lines.slice(SHOWN));
    let n = SHOWN;
    let timer;
    const next = () => {
      if (visible && !document.hidden) {
        setFeed(cur => {
          const onScreen = new Set(cur.map(r => r.line.id));
          if (!queue.length) queue = shuffle(lines.filter(l => !onScreen.has(l.id)));
          const line = queue.shift() ?? lines[0];
          return [{ line, n: n++ }, ...cur].slice(0, SHOWN);
        });
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
          {running ? <span key={newest?.n} className="hm-orb-ring" /> : null}
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
          <li key={`${r.line.id}-${r.n}`} className={i === 0 && running ? "is-new" : undefined}>
            <span className="hm-day-top">
              <span className="hm-day-tag">{r.line.tag}</span>
              {i === 0 && running ? <span className="hm-day-now">{d.now}</span> : null}
            </span>
            <span className="hm-day-t">{r.line.t}</span>
          </li>
        ))}
      </ol>
      <div className="hm-day-cap">{d.caption}</div>
    </div>
  );
}
