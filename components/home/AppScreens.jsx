"use client";

// The real app: screenshots of the merchant app (public/app/*.webp, taken on
// the example stores Saril and Glow Studio).
//
// Laptops: the feature list and the framed screen stay pinned while you
// scroll through the section; each stretch of scrolling brings the next
// feature, and the bar under the active one fills as you go. So a quick
// scroll still passes every feature. A click scrolls to that feature.
// Phones: a stack of cards, one per feature with its own screen, each
// sticking under the menu as the next slides over it.
//
// The list follows the Products / Services switch; Both shows all six under
// two small headings.

import { useEffect, useRef, useState } from "react";
import { useAudience } from "./Audience";

export default function AppScreens({ screens, groups }) {
  const { aud } = useAudience();
  const visible = screens.filter(s => aud === "both" || s.show === aud);
  const n = visible.length;
  const [idx, setIdx] = useState(0);
  const [part, setPart] = useState(0); // how far through the active feature, 0..1
  const track = useRef(null);
  const pin = useRef(null);

  // Where the reader is in the section decides the feature.
  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const t = track.current, p = pin.current;
      if (!t || !p || !p.offsetParent) return;
      const room = t.offsetHeight - p.offsetHeight;
      const done = Math.min(Math.max(-t.getBoundingClientRect().top + parseFloat(getComputedStyle(p).top), 0), room);
      const x = room > 0 ? (done / room) * n : 0;
      const i = Math.min(n - 1, Math.floor(x));
      setIdx(i);
      setPart(Math.min(1, x - i));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [n]);

  const go = (i) => {
    const t = track.current, p = pin.current;
    if (!t || !p) return;
    const room = t.offsetHeight - p.offsetHeight;
    const top = t.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(p).top);
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + ((i + 0.15) / n) * room, behavior: smooth ? "smooth" : "auto" });
  };

  const cur = visible[Math.min(idx, n - 1)] || visible[0];
  let lastGroup = null;

  return (
    <>
    <div ref={track} className="hm-app-track" style={{ "--n": n }}>
      <div ref={pin} className="hm-app">
        <ul className="hm-app-list" role="tablist" aria-orientation="vertical">
          {visible.map((s, i) => {
            const on = cur?.key === s.key;
            const head = aud === "both" && s.show !== lastGroup ? groups[s.show] : null;
            lastGroup = s.show;
            return (
              <li key={s.key} role="presentation">
                {head ? <div className="hm-app-group">{head}</div> : null}
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  className={`hm-app-item${on ? " is-on" : ""}`}
                  onClick={() => go(i)}
                >
                  <span className="hm-app-item-t">{s.tab}</span>
                  <span className="hm-app-item-d"><span>{s.cap}</span></span>
                  <span className="hm-app-bar-run" aria-hidden="true"><i style={{ transform: `scaleX(${on ? part : 0})` }} /></span>
                </button>
              </li>
            );
          })}
        </ul>

        <figure className="hm-app-frame">
          <div className="hm-app-bar" aria-hidden="true">
            <span className="hm-app-dots"><i /><i /><i /></span>
            <span className="hm-app-url">{cur?.url}</span>
          </div>
          <div className="hm-app-shot">
            {screens.map(s => (
              <img
                key={s.key}
                src={`/app/${s.key}.webp`}
                alt={s.alt}
                width={1600}
                height={800}
                loading="lazy"
                decoding="async"
                className={cur?.key === s.key ? "is-on" : undefined}
              />
            ))}
          </div>
        </figure>
      </div>
    </div>

    {/* Phones: one card per feature with its own screen, stacking as you scroll. */}
    <ol className="hm-app-stack">
      {visible.map((s, i) => (
        <li key={s.key} className="hm-app-card" style={{ "--i": i }}>
          {aud === "both" ? <span className="hm-app-group">{groups[s.show]}</span> : null}
          <h3 className="hm-app-card-t">{s.tab}</h3>
          <p className="hm-app-card-d">{s.cap}</p>
          <div className="hm-app-card-shot">
            <img src={`/app/${s.key}.webp`} alt={s.alt} width={1600} height={800} loading="lazy" decoding="async" />
          </div>
        </li>
      ))}
    </ol>
    </>
  );
}
