"use client";

// Grid (four across, compact), Large (two across, the full card) or List: the
// templates page's view switch. It sets data-view on #th-views (app/themes.css
// does the rest) and remembers the choice in this browser.

import { useEffect, useState } from "react";

const KEY = "dk-template-view";
const ICON = {
  grid: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  large: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="8" rx="1.5" /><rect x="3" y="14" width="18" height="7" rx="1.5" /></svg>,
  list: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>,
};

export default function ViewToggle({ labels, label }) {
  const [view, setView] = useState("grid");
  useEffect(() => {
    let v = "grid";
    try { v = localStorage.getItem(KEY) || "grid"; } catch {}
    if (!["grid", "large", "list"].includes(v)) v = "grid";
    setView(v);
  }, []);
  useEffect(() => { const el = document.getElementById("th-views"); if (el) el.dataset.view = view; }, [view]);
  const pick = v => { setView(v); try { localStorage.setItem(KEY, v); } catch {} };
  return (
    <div role="group" aria-label={label} style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 99, background: "#E5E7DE" }}>
      {["grid", "large", "list"].map(v => (
        <button key={v} type="button" onClick={() => pick(v)} aria-pressed={view === v} title={labels[v]} className="th-view-btn">{ICON[v]}<span>{labels[v]}</span></button>
      ))}
    </div>
  );
}
