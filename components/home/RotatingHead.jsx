"use client";

// The headline that names the business: "Run your clothing shop / beauty
// parlour / coaching centre ... from one app." It cycles through shops and
// service businesses alike, so the first thing a visitor reads says Dakio is
// for both, whatever the switch says. With Products or Services picked it
// cycles only that side.
//
// The server renders the plain sentence ("Run your shop or service business
// from one app."), which is also what phones, reduced motion and search
// engines get.

import { useEffect, useState } from "react";
import { useAudience } from "./Audience";

const EVERY = 2200;

export default function RotatingHead({ r }) {
  const { aud } = useAudience();
  const [on, setOn] = useState(false);
  const [i, setI] = useState(0);
  const list = r.kinds.filter(k => aud === "both" || k.k === aud);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => { setI(0); }, [aud]);

  useEffect(() => {
    if (!on || list.length < 2) return undefined;
    const id = setInterval(() => { if (!document.hidden) setI(n => (n + 1) % list.length); }, EVERY);
    return () => clearInterval(id);
  }, [on, list.length]);

  const word = on ? list[i % list.length]?.t : r.fallback;
  return (
    <span className="hm-h1-main">
      {r.pre}{" "}
      <span className="hm-rot" aria-live="off">
        <span key={on ? `${aud}-${i}` : "fallback"} className={on ? "hm-rot-word is-in" : "hm-rot-word"}>{word}</span>
      </span>
      <br />
      {r.post}
    </span>
  );
}
