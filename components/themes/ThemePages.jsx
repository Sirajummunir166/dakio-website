"use client";

// Every page of a design, one tab each, on a laptop or a phone: the pictures are
// whole-page screenshots of the live demo (public/themes/<id>/pages/). The tall
// picture scrolls inside the stage, so the page itself stays short.

import { useState } from "react";

export default function ThemePages({ id, pages, lang, labels, base }) {
  const [key, setKey] = useState(pages[0]?.key);
  const [device, setDevice] = useState("desktop");
  const cur = pages.find(p => p.key === key) || pages[0];
  if (!cur) return null;
  const name = p => p.label?.[lang] || p.label?.en || p.key;
  const src = `${base || ""}/themes/${id}/pages/${cur.key}-${device}.webp`;
  const phone = device === "phone";
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <div className="th-tabs" role="tablist" aria-label={labels.title}>
          {pages.map(p => (
            <button key={p.key} type="button" role="tab" className="th-tab" aria-selected={cur.key === p.key} aria-pressed={cur.key === p.key} onClick={() => setKey(p.key)}>{name(p)}</button>
          ))}
        </div>
        <div className="th-tabs">
          {[["desktop", labels.laptop], ["phone", labels.phone]].map(([d, l]) => (
            <button key={d} type="button" className="th-tab" aria-pressed={device === d} onClick={() => setDevice(d)}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 16, borderRadius: 24, background: "#EEF0E6", padding: phone ? "24px 16px" : 18 }}>
        <div tabIndex={0} aria-label={`${name(cur)}: ${phone ? labels.phone : labels.laptop}`} style={{ maxHeight: "min(1100px, 78vh)", overflowY: "auto", borderRadius: phone ? 38 : 12 }}>
          {phone ? (
            <div className="th-mobframe"><img key={src} src={src} alt={`${name(cur)}: ${labels.phone}`} width={390} loading="lazy" /></div>
          ) : (
            <div className="th-frame" style={{ borderRadius: 12 }}><img key={src} src={src} alt={`${name(cur)}: ${labels.laptop}`} width={960} loading="lazy" style={{ aspectRatio: "auto", objectFit: "initial" }} /></div>
          )}
        </div>
        <p style={{ margin: "12px 0 0", textAlign: "center", fontSize: 12.5, color: "#6B6D60" }}><code style={{ fontFamily: "var(--dk-font-mono), monospace" }}>{cur.path}</code></p>
      </div>
    </div>
  );
}
