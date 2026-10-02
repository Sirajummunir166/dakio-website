"use client";

// The screenshot stage on /themes/<key>: the whole home on a laptop, the whole
// home on a phone, a product page, and (SARIL) the second home. The long
// full-page shots scroll inside the stage, so the page itself stays short.
// On a phone it opens on the phone view, which is the one readable there.

import { useEffect, useState } from "react";

export default function ThemeShots({ name, shots, tabs, captions, srcFor }) {
  const [view, setView] = useState(shots[0]);
  useEffect(() => {
    if (window.matchMedia("(max-width: 700px)").matches && shots.includes("phoneFull")) setView("phoneFull");
  }, [shots]);
  const phone = view === "phoneFull";
  return (
    <div>
      <div className="th-tabs">
        {shots.map(s => (
          <button key={s} type="button" className="th-tab" aria-pressed={view === s} onClick={() => setView(s)}>
            {tabs[s]}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16, borderRadius: 24, background: "#EEF0E6", padding: phone ? "24px 16px" : 18 }}>
        <div tabIndex={0} aria-label={`${name}: ${tabs[view]}`} style={{ maxHeight: "min(1100px, 78vh)", overflowY: "auto", borderRadius: phone ? 38 : 12 }}>
          {phone ? (
            <div className="th-mobframe">
              <img src={srcFor[view]} alt={`${name}: ${tabs[view]}`} width={390} />
            </div>
          ) : (
            <div className="th-frame" style={{ borderRadius: 12 }}>
              <img src={srcFor[view]} alt={`${name}: ${tabs[view]}`} width={960} style={{ aspectRatio: "auto", objectFit: "initial" }} />
            </div>
          )}
        </div>
        <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12.5, color: "#6B6D60" }}>{captions[view]}</p>
      </div>
    </div>
  );
}
