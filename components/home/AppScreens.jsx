"use client";

// The real app: screenshots of the merchant app (public/app/*.webp, taken on
// the example stores Saril and Glow Studio). Tabs pick the screen; the tabs
// follow the Products / Services switch, and Both shows all six. Every
// screen is in the markup, so the first one shows with JS off.

import { useEffect, useState } from "react";
import { useAudience } from "./Audience";

export default function AppScreens({ screens }) {
  const { aud } = useAudience();
  const visible = screens.filter(s => aud === "both" || s.show === aud);
  const [active, setActive] = useState(visible[0]?.key);
  useEffect(() => { setActive(visible[0]?.key); }, [aud]); // eslint-disable-line react-hooks/exhaustive-deps
  const cur = visible.find(s => s.key === active) || visible[0];

  return (
    <div className="hm-app">
      <div className="hm-app-tabs" role="tablist">
        {screens.map(s => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={cur?.key === s.key}
            data-show={s.show}
            className="hm-app-tab"
            onClick={() => setActive(s.key)}
          >{s.tab}</button>
        ))}
      </div>
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
        <figcaption className="hm-app-cap">{cur?.cap}</figcaption>
      </figure>
    </div>
  );
}
