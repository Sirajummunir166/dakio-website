"use client";

// Every page of a design as a masonry wall (the Pinterest way): the
// whole-page screenshots of the live demo (public/themes/<id>/pages/), each as
// tall as the page really is, on a laptop or on phones. Click one (or a page
// name) to read it big, whole, in a scrolling window.

import { useEffect, useState } from "react";

export default function ThemePages({ id, pages, lang, labels, base }) {
  const [device, setDevice] = useState("desktop");
  const [openKey, setOpenKey] = useState(null);
  const name = p => p.label?.[lang] || p.label?.en || p.key;
  const src = (p, d = device) => `${base || ""}/themes/${id}/pages/${p.key}-${d}.webp`;
  const phone = device === "phone";
  const cur = pages.find(p => p.key === openKey);
  useEffect(() => {
    if (!cur) return;
    const onKey = e => { if (e.key === "Escape") setOpenKey(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [cur]);
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div className="th-tabs" aria-label={labels.title}>
          {pages.map(p => <button key={p.key} type="button" className="th-tab" onClick={() => setOpenKey(p.key)}>{name(p)}</button>)}
        </div>
        <div className="th-tabs">
          {[["desktop", labels.laptop], ["phone", labels.phone]].map(([d, l]) => (
            <button key={d} type="button" className="th-tab" aria-pressed={device === d} onClick={() => setDevice(d)}>{l}</button>
          ))}
        </div>
      </div>

      <div className={`th-wall th-wall-${device}`}>
        {pages.map(p => (
          <button key={`${device}-${p.key}`} type="button" className="th-wall-item" onClick={() => setOpenKey(p.key)} aria-label={`${name(p)}: ${phone ? labels.phone : labels.laptop}`}>
            <span className={phone ? "th-wall-pframe" : "th-wall-laptop"}>
              <img src={src(p)} alt="" width={phone ? 390 : 960} height={phone ? p.ph : p.dh} loading="lazy" style={{ aspectRatio: phone ? `390 / ${p.ph}` : `960 / ${p.dh}` }} />
            </span>
            <span className="th-wall-cap"><b>{name(p)}</b><code>{p.path}</code></span>
          </button>
        ))}
      </div>

      {cur ? (
        <div role="dialog" aria-modal="true" aria-label={name(cur)} className="th-lightbox" onClick={() => setOpenKey(null)}>
          <div className="th-lightbox-card" onClick={e => e.stopPropagation()}>
            <div className="th-lightbox-bar">
              <b>{name(cur)}</b><code>{cur.path}</code>
              <span style={{ flex: 1 }} />
              {[["desktop", labels.laptop], ["phone", labels.phone]].map(([d, l]) => (
                <button key={d} type="button" className="th-tab" aria-pressed={device === d} onClick={() => setDevice(d)}>{l}</button>
              ))}
              <button type="button" className="th-tab" onClick={() => setOpenKey(null)} aria-label={labels.close}>✕</button>
            </div>
            <div className="th-lightbox-body">
              <img src={src(cur)} alt={`${name(cur)}: ${phone ? labels.phone : labels.laptop}`} style={{ display: "block", width: phone ? 390 : "100%", maxWidth: "100%", height: "auto", margin: "0 auto", borderRadius: phone ? 20 : 8 }} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
