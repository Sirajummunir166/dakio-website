"use client";

// "Everything to run it" on laptops and tablets: Nova walks the line.
// Shops on the left, services on the right, each stage facing its twin, and
// a lime line down the middle. As you scroll, the Nova orb glides down the
// line and every row it reaches lights up on both sides (the node fills, the
// icon turns lime, the words darken). With Products or Services picked it is
// one column beside the line. Phones use the stacking cards in Run instead.
// Reduced motion: everything lit, no orb.

import { useEffect, useRef, useState } from "react";
import { useAudience } from "./Audience";

// Line icons on a 24 grid, one per stage, in the order of the copy.
const ICONS = {
  shop: [
    <><path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9z" /><circle cx="7.5" cy="7.5" r="1.4" /></>,
    <><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
    <><path d="M4 10v10h16V10" /><path d="M3 4h18l-1.5 6h-15z" /><path d="M10 20v-5h4v5" /></>,
    <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>,
    <><path d="M2 6h11v10H2zM13 10h4l3 3v3h-7" /><circle cx="6" cy="17.5" r="1.8" /><circle cx="16.5" cy="17.5" r="1.8" /></>,
    <><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 7l12-3v3" /><circle cx="16.5" cy="13.5" r="1.3" /></>,
  ],
  svc: [
    <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1.2" /><circle cx="4.5" cy="12" r="1.2" /><circle cx="4.5" cy="18" r="1.2" /></>,
    <><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21" /></>,
    <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M8.5 15l2 2 4-4" /></>,
    <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
    <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
    <><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 7l12-3v3" /><circle cx="16.5" cy="13.5" r="1.3" /></>,
  ],
};

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);

function Stage({ st, i, kind }) {
  return (
    <div className="hm-walk-stage">
      <span className="hm-walk-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICONS[kind][i]}</svg>
      </span>
      <div>
        <span className="hm-walk-n">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="hm-walk-t">{st.t}</h3>
        <ul className="hm-walk-items">{st.items.map(it => <li key={it}><Tick />{it}</li>)}</ul>
      </div>
    </div>
  );
}

export default function RunWalk({ x, groups }) {
  const { aud } = useAudience();
  const box = useRef(null);
  const rows = useRef([]);
  const [orb, setOrb] = useState(-1);      // px down the line
  const [mids, setMids] = useState([]);    // each row's middle, px
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStill(true); return undefined; }
    let raf = 0;
    const read = () => {
      raf = 0;
      const el = box.current;
      if (!el || !el.offsetParent) return;
      const r = el.getBoundingClientRect();
      const m = rows.current.filter(Boolean).map(row => row.offsetTop + row.offsetHeight / 2);
      setMids(m);
      const first = m[0] ?? 0, last = m[m.length - 1] ?? r.height;
      // The orb sits where the middle of the screen is, kept on the line.
      setOrb(Math.min(last, Math.max(first, window.innerHeight * 0.55 - r.top)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, [aud]);

  const kinds = aud === "both" ? ["shop", "svc"] : [null, aud]; // one side: beside the line
  const n = x.shop.length;
  const first = mids[0] ?? 0, last = mids[n - 1] ?? 0;
  const lit = i => still || (mids[i] != null && orb >= mids[i] - 24);

  return (
    <div ref={box} className={`hm-walk${aud === "both" ? " is-both" : " is-one"}${still ? " is-still" : ""}`}>
      <div className="hm-walk-head">
        {aud === "both" ? <span className="hm-walk-group">{groups.shop}</span> : <span />}
        <span className="hm-walk-nova"><i className="hm-walk-orb-sm" aria-hidden="true" />{x.nova}</span>
        {aud === "both" ? <span className="hm-walk-group">{groups.svc}</span> : <span />}
      </div>

      <div className="hm-walk-body">
        <div className="hm-walk-rail" aria-hidden="true" style={{ top: first, height: Math.max(0, last - first) }}>
          <i className="hm-walk-fill" style={{ height: still ? "100%" : Math.max(0, orb - first) }} />
        </div>
        {!still && orb >= 0 ? <i className="hm-walk-orb" aria-hidden="true" style={{ top: orb }} /> : null}

        {x.shop.map((_, i) => (
          <div key={i} ref={el => { rows.current[i] = el; }} className={`hm-walk-row${lit(i) ? " is-lit" : ""}`}>
            <div className="hm-walk-cell is-left">{kinds[0] && <Stage st={x[kinds[0]][i]} i={i} kind={kinds[0]} />}</div>
            <span className="hm-walk-node" aria-hidden="true" />
            <div className="hm-walk-cell is-right">{kinds[1] && <Stage st={x[kinds[1]][i]} i={i} kind={kinds[1]} />}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
