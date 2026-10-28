"use client";

// The real app: screenshots of the merchant app (public/app/*.webp, taken on
// the example stores Saril and Glow Studio). The features are listed on the
// left; the screen on the right plays through them by itself, with a thin
// bar showing when the next one comes. A click picks one and play goes on
// from there. Hover, keyboard focus, an off-screen section or a hidden tab
// pause it; reduced motion never plays. The list follows the Products /
// Services switch, and Both shows all six under two small headings.
//
// Phones get a stack of cards instead, one per feature with its own screen,
// each sticking under the menu as the next slides over it (no autoplay).

import { useEffect, useRef, useState } from "react";
import { useAudience } from "./Audience";

const EVERY = 5500;

export default function AppScreens({ screens, groups }) {
  const { aud } = useAudience();
  const visible = screens.filter(s => aud === "both" || s.show === aud);
  const keys = visible.map(s => s.key).join(",");
  const [active, setActive] = useState(visible[0]?.key);
  const [hold, setHold] = useState(false);     // hover or focus
  const [seen, setSeen] = useState(false);     // on screen and tab visible
  const [motion, setMotion] = useState(false);
  const box = useRef(null);

  useEffect(() => { setActive(visible[0]?.key); }, [keys]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let inView = false;
    const sync = () => setSeen(inView && !document.hidden);
    const io = new IntersectionObserver(([en]) => { inView = en.isIntersecting; sync(); }, { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    document.addEventListener("visibilitychange", sync);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  const playing = motion && seen && !hold && visible.length > 1;
  useEffect(() => {
    if (!playing) return undefined;
    const id = setTimeout(() => {
      const i = visible.findIndex(s => s.key === active);
      setActive(visible[(i + 1) % visible.length].key);
    }, EVERY);
    return () => clearTimeout(id);
  }, [playing, active, keys]); // eslint-disable-line react-hooks/exhaustive-deps

  const cur = visible.find(s => s.key === active) || visible[0];
  let lastGroup = null;

  return (
    <>
    <div
      ref={box}
      className={`hm-app${playing ? " is-playing" : ""}`}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <ul className="hm-app-list" role="tablist" aria-orientation="vertical">
        {visible.map(s => {
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
                onClick={() => setActive(s.key)}
              >
                <span className="hm-app-item-t">{s.tab}</span>
                <span className="hm-app-item-d"><span>{s.cap}</span></span>
                <span className="hm-app-bar-run" aria-hidden="true"><i key={on ? `${s.key}-run` : s.key} style={{ animationDuration: `${EVERY}ms` }} /></span>
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
