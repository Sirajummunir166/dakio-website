"use client";

// Every page of a design, all of them at once: the whole-page screenshots of the
// live demo (public/themes/<id>/pages/), stacked top to bottom on a laptop, or
// side by side on phones, so the visitor gets the feel of the full site. The
// chips jump to a page.

import { useState } from "react";

export default function ThemePages({ id, pages, lang, labels, base }) {
  const [device, setDevice] = useState("desktop");
  const name = p => p.label?.[lang] || p.label?.en || p.key;
  const src = p => `${base || ""}/themes/${id}/pages/${p.key}-${device}.webp`;
  const phone = device === "phone";
  const jump = (e, key) => { e.preventDefault(); document.getElementById(`pg-${id}-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  return (
    <div>
      <div style={{ position: "sticky", top: 70, zIndex: 20, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", padding: "10px 0", background: "linear-gradient(#F4F2EA 80%, rgba(244,242,234,0))" }}>
        <div className="th-tabs" aria-label={labels.title}>
          {pages.map(p => <a key={p.key} href={`#pg-${id}-${p.key}`} onClick={e => jump(e, p.key)} className="th-tab" style={{ textDecoration: "none" }}>{name(p)}</a>)}
        </div>
        <div className="th-tabs">
          {[["desktop", labels.laptop], ["phone", labels.phone]].map(([d, l]) => (
            <button key={d} type="button" className="th-tab" aria-pressed={device === d} onClick={() => setDevice(d)}>{l}</button>
          ))}
        </div>
      </div>
      <div style={phone ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 22, alignItems: "start", marginTop: 8 } : { display: "grid", gap: 28, maxWidth: 960, margin: "8px auto 0" }}>
        {pages.map(p => (
          <section key={p.key} id={`pg-${id}-${p.key}`} style={{ scrollMarginTop: 150 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 2px 10px", flexWrap: "wrap" }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, letterSpacing: "-0.3px", color: "#1A1D12" }}>{name(p)}</h3>
              <code style={{ fontFamily: "var(--dk-font-mono), monospace", fontSize: 11.5, color: "#6B6D60" }}>{p.path}</code>
            </div>
            {phone ? (
              <div style={{ borderRadius: 30, background: "#EEF0E6", padding: 12 }}>
                <div style={{ border: "8px solid #111", borderRadius: 28, overflow: "hidden", background: "#111" }}>
                  <img src={src(p)} alt={`${name(p)}: ${labels.phone}`} width={390} loading="lazy" style={{ display: "block", width: "100%", height: "auto", borderRadius: 20 }} />
                </div>
              </div>
            ) : (
              <div style={{ borderRadius: 18, background: "#EEF0E6", padding: 12 }}>
                <div className="th-frame" style={{ borderRadius: 10 }}>
                  <img src={src(p)} alt={`${name(p)}: ${labels.laptop}`} width={960} loading="lazy" style={{ aspectRatio: "auto", objectFit: "initial" }} />
                </div>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
