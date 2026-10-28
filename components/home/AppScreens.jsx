"use client";

// The real app: screenshots of the merchant app (public/app/*.webp, taken on
// the example stores Saril and Glow Studio), as a stack of cards, one per
// feature with its own screen. Each card sticks under the menu as the next
// slides over it, so scrolling passes every feature and the words never sit
// far from their screen. Laptops put the words left and the screen right;
// phones put the screen under the words.
//
// The list follows the Products / Services switch; Both shows all six, each
// card saying whether it is for shops or for services.

import { useAudience } from "./Audience";

export default function AppScreens({ screens, groups }) {
  const { aud } = useAudience();
  const visible = screens.filter(s => aud === "both" || s.show === aud);
  return (
    <ol className="hm-app-stack">
      {visible.map((s, i) => (
        <li key={s.key} className="hm-app-card" style={{ "--i": i }}>
          <div className="hm-app-card-text">
            {aud === "both" ? <span className="hm-app-group">{groups[s.show]}</span> : null}
            <h3 className="hm-app-card-t">{s.tab}</h3>
            <p className="hm-app-card-d">{s.cap}</p>
            <span className="hm-app-card-url">{s.url}</span>
          </div>
          <div className="hm-app-card-shot">
            <img src={`/app/${s.key}.webp`} alt={s.alt} width={1600} height={800} loading="lazy" decoding="async" />
          </div>
        </li>
      ))}
    </ol>
  );
}
