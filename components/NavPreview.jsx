// Explore mega-menu preview vignettes (SiteNav column 4).
//
// Port of the <sc-if value="{{ pvStore }}"> … blocks in SiteNav.dc.html. Each
// key renders the middle slot of the dark preview card; the card frame, mono
// header and lime CTA live in SiteNav. These are live HTML on purpose — the
// design note says real GIFs may replace them later, so the slot stays a plain
// swap of one component for another.

import { PREVIEW_MONO as PM } from "../content/copy/chrome.en";

const MONO = "var(--dk-font-mono), monospace";

const row = { display: "flex", alignItems: "center", gap: 7, padding: "8px 11px", borderRadius: 10, background: "rgba(255,255,255,0.06)", fontSize: 11, color: "#E9EFDC" };
const check = { marginLeft: "auto", color: "#8CBF33" };
const monoFoot = { fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#8CBF33" };

export default function NavPreview({ pv, copy, T }) {
  const c = copy[pv];

  if (pv === "store") {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 11px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(198,242,62,0.3)" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#FBFBF4" }}>{c.handle}</span>
          <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.1em", color: "#8CBF33" }}>{PM.available}</span>
        </div>
        <div style={{ padding: "8px 11px", borderRadius: 10, background: "rgba(255,255,255,0.05)", fontFamily: MONO, fontSize: 9.5, color: "#C6F035" }}>{c.domain}</div>
        <div style={{ fontSize: 10.5, color: "#A9AD98", lineHeight: 1.5, ...T.chip }}>{c.note}</div>
      </>
    );
  }

  if (pv === "switch") {
    return (
      <>
        {c.rows.map(r => (
          <div key={r.l} style={{ ...row, ...T.chip }}>{r.l} <span style={check}>{r.v}</span></div>
        ))}
        <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.1em", color: "#878B76" }}>{PM.weekend}</div>
      </>
    );
  }

  if (pv === "supplier") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {c.rows.map(r => (
          <div key={r} style={{ padding: "7px 11px", borderRadius: 9, background: "rgba(255,255,255,0.06)", fontSize: 10.5, color: "#E9EFDC", ...T.chip }}>{r}</div>
        ))}
        <div style={{ padding: "7px 11px", borderRadius: 9, background: "rgba(198,242,62,0.12)", border: "1px solid rgba(198,242,62,0.3)", fontSize: 10.5, fontWeight: 700, color: "#C6F035", ...T.chip }}>{c.payout}</div>
      </div>
    );
  }

  if (pv === "nova") {
    return (
      <>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#FBFBF4", ...T.label }}>{c.title}</div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 2 }}>
          {PM.ladder.map((l, i) => {
            const base = { padding: "4px 8px", borderRadius: 99, fontFamily: MONO, fontSize: 8 };
            if (i === 3) return <span key={l} style={{ ...base, background: "#C6F035", fontWeight: 600, color: "#0F120B" }}>{l}</span>;
            if (i === 4) return <span key={l} style={{ ...base, border: "1px dashed rgba(198,242,62,0.5)", color: "#C6F035" }}>{l}</span>;
            return <span key={l} style={{ ...base, border: "1px solid rgba(255,255,255,0.18)", color: "#A9AD98" }}>{l}</span>;
          })}
        </div>
        <div style={{ fontSize: 10.5, color: "#A9AD98", lineHeight: 1.5, ...T.chip }}>{c.note}</div>
      </>
    );
  }

  if (pv === "novahq") {
    return (
      <>
        <div style={{ padding: "10px 12px", borderRadius: 11, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(198,242,62,0.25)" }}>
          <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.1em", color: "#E3B54A" }}>{PM.decision}</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#FBFBF4", marginTop: 5, ...T.chip }}>{c.decision}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            <span style={{ padding: "5px 12px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 9.5, fontWeight: 700, ...T.chip }}>{c.approve}</span>
            <span style={{ padding: "5px 10px", borderRadius: 99, border: "1px solid rgba(233,239,220,0.2)", fontSize: 9.5, color: "#A9AD98", ...T.chip }}>{c.later}</span>
          </div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.08em", color: "#8CBF33" }}>{PM.decisionEst}</div>
      </>
    );
  }

  if (pv === "front") {
    return (
      <>
        <div style={{ alignSelf: "flex-start", maxWidth: "90%", padding: "7px 10px", borderRadius: "10px 10px 10px 3px", background: "rgba(255,255,255,0.09)", fontSize: 10.5, color: "#E9EFDC", ...T.chip }}>{c.customer}</div>
        <div style={{ alignSelf: "flex-end", maxWidth: "90%", padding: "7px 10px", borderRadius: "10px 10px 3px 10px", background: "#C6F035", fontSize: 10.5, color: "#0F120B", ...T.chip }}>{c.nova}</div>
        <div style={{ alignSelf: "center", padding: "5px 10px", borderRadius: 99, background: "rgba(140,191,51,0.15)", fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.08em", color: "#8CBF33" }}>{PM.confirmed}</div>
      </>
    );
  }

  if (pv === "complete") {
    return (
      <>
        {c.rows.map(r => (
          <div key={r.l} style={{ display: "flex", alignItems: "center", padding: "8px 11px", borderRadius: 10, background: "rgba(255,255,255,0.06)", fontSize: 10.5, color: "#E9EFDC", ...T.chip }}>{r.l} <span style={check}>{r.v}</span></div>
        ))}
        <div style={{ fontSize: 10.5, color: "#A9AD98", ...T.chip }}>{c.note}</div>
      </>
    );
  }

  if (pv === "studio") {
    return (
      <>
        <div style={{ padding: "10px 12px", borderRadius: 11, background: "#F6EFE3" }}>
          <div style={{ height: 26, borderRadius: 7, background: "#3A2418", display: "flex", alignItems: "center", padding: "0 9px" }}>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: "#F6EFE3", fontFamily: "Georgia,serif" }}>{c.headline}</span>
          </div>
          <div style={{ display: "flex", gap: 5, marginTop: 8, alignItems: "center" }}>
            {["#8C2F1B", "#C6F035", "#1F6E63", "#171420"].map(sw => (
              <span key={sw} style={{ width: 13, height: 13, borderRadius: 99, background: sw, border: "2px solid #fff" }} />
            ))}
            <span style={{ fontSize: 8.5, fontWeight: 700, color: "#6B6D60", marginLeft: 3, ...T.chip }}>{c.looks}</span>
          </div>
        </div>
        <div style={monoFoot}>{PM.studioFoot}</div>
      </>
    );
  }

  if (pv === "grow") {
    return (
      <>
        <div style={{ padding: "10px 12px", borderRadius: 11, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(198,242,62,0.25)" }}>
          <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.1em", color: "#8CBF33" }}>{PM.opportunity}</div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#FBFBF4", marginTop: 5, ...T.chip }}>{c.title}</div>
          <div style={{ fontSize: 10, color: "#A9AD98", marginTop: 3, ...T.chip }}>{c.sub}</div>
        </div>
        <span style={{ alignSelf: "flex-start", padding: "6px 13px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 10, fontWeight: 700, ...T.chip }}>{c.button}</span>
      </>
    );
  }

  if (pv === "ads") {
    const tiles = [
      { h: 52, bg: "linear-gradient(160deg, #3A2418, #8C2F1B)", fg: "#FFF1EA" },
      { h: 64, bg: "linear-gradient(160deg, #1F2A16, #4C7A3F)", fg: "#F2F6E9" },
      { h: 78, bg: "linear-gradient(170deg, #171420, #3A4C8C)", fg: "#EDF0FC" },
    ];
    return (
      <>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
          {tiles.map((t, i) => (
            <div key={PM.adRatios[i]} style={{ flex: 1, height: t.h, borderRadius: 8, background: t.bg, position: "relative" }}>
              <span style={{ position: "absolute", top: 5, right: 6, fontFamily: MONO, fontSize: 6, color: t.fg, opacity: 0.7 }}>{PM.adRatios[i]}</span>
            </div>
          ))}
        </div>
        <div style={monoFoot}>{PM.adsFoot}</div>
      </>
    );
  }

  // default: the 60-second tour
  return (
    <>
      <div style={{ fontSize: 14.5, fontWeight: 800, color: "#FBFBF4", lineHeight: 1.3, ...T.label }}>{c.title}</div>
      <div style={{ fontSize: 11, color: "#A9AD98", lineHeight: 1.55, ...T.chip }}>{c.body}</div>
      <div style={{ fontSize: 10.5, color: "#878B76", marginTop: 4, ...T.chip }}>{c.hint}</div>
    </>
  );
}
