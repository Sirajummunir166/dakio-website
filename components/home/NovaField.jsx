"use client";

// THE ORGANIZATION — Nova's office as a living field, replacing the radial org chart.
// Every ring is a department; its colour and steadiness is the department's grade. A line
// from the core to a ring is Nova connected to that department (several at once). Amber
// slabs inside a ring are decisions held for the founder. A whole store day passes in
// `daySeconds` of real time, so a visitor sees the night shift, the 06:00 brief and the
// morning checks without waiting.
//
// Engine + data are the SAME files the design prototypes use — keep them byte-identical:
//   public/nova/nova-field-3d.js     <nova-field-3d> web component (three.js r128 UMD)
//   public/nova/nova-office-data.js  the demo store: rooms, duties, decisions, ledger
// Scripts load only once the section is within 600px of the viewport (nothing touches
// first paint or LCP), rendering pauses while off-screen, and if WebGL or the scripts
// fail the caption + legend still stand — only the canvas is missing.

import { useEffect, useRef } from "react";
import Link from "next/link";

// Self-host if preferred: copy three.min.js (r128) to public/nova/ and point this there.
const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
const ENGINE_SRC = "/nova/nova-field-3d.js";
const DATA_SRC = "/nova/nova-office-data.js";
// The engine paints its in-canvas labels in these families (next/font exposes the site's own
// fonts only as hashed CSS variables, so the canvas can't reach them). Loaded with the engine.
const FONTS_HREF = "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500&display=swap";
const MONO = "var(--dk-font-mono), monospace";
const TZ = "+06";

const loading = {};
function load(src) {
  if (!loading[src]) {
    loading[src] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src; s.async = true; s.onload = resolve; s.onerror = () => reject(new Error("failed " + src));
      document.head.appendChild(s);
    });
  }
  return loading[src];
}
function loadFonts() {
  if (document.querySelector('link[data-nova-fonts]')) return;
  const l = document.createElement("link");
  l.rel = "stylesheet"; l.href = FONTS_HREF; l.setAttribute("data-nova-fonts", "1");
  document.head.appendChild(l);
}

const pad = n => (n < 10 ? "0" : "") + n;
function parseTime(s) {
  const m = /^\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*$/i.exec(String(s));
  if (!m) return 5 * 3600 + 30 * 60;
  let h = +m[1] % 24; const mi = Math.min(59, +(m[2] || 0));
  if (m[3]) h = (h % 12) + (m[3].toLowerCase() === "pm" ? 12 : 0);
  return h * 3600 + mi * 60;
}
function fmtMin(mn) { mn = Math.round(mn); const h = Math.floor(mn / 60) % 24, m = ((mn % 60) + 60) % 60; return (h % 12 || 12) + ":" + pad(m) + " " + (h < 12 ? "am" : "pm"); }
function fill(tpl, vars) { return String(tpl || "").replace(/\{(\w+)\}/g, (_, k) => (vars[k] == null ? "" : vars[k])); }
// mono label, never translated (see home.en.js MONO)
function skyWord(h) { return h < 5 ? "NIGHT" : h < 7 ? "DAWN" : h < 12 ? "MORNING" : h < 17 ? "AFTERNOON" : h < 19.5 ? "DUSK" : "NIGHT"; }

// Turns the demo store's registry into what the field draws at store-second S.
// Same derivation as the design prototype (Dakio Nova Field Embed.dc.html) — change both or neither.
function createFeed(D, o) {
  const speed = 86400 / Math.max(20, o.daySeconds || 120);
  const t0 = Date.now(), startSec = parseTime(o.startTime || "05:30");
  const base = D.rooms.slice().sort((a, b) => a.order - b.order);
  const names = {};
  base.filter(r => r.key !== "home").forEach((r, i) => { names[r.key] = (o.deptNames && o.deptNames[i]) || r.title; });
  const title = k => (k === "home" ? "The core" : names[k] || k);
  const order = base.filter(r => r.key !== "home" && !r.hidden).map(r => r.key);
  const storeSec = () => { const s = startSec + ((Date.now() - t0) / 1000) * speed; return ((s % 86400) + 86400) % 86400; };

  function model() {
    const S = storeSec(), min = S / 60, minDur = (3 * speed) / 60; // every duty holds ≥3 real seconds at demo speed
    const duties = D.duties.map(d => {
      let phase = null, start = null, end = null;
      if (d.at != null && d.status === "active") { start = d.at * 60; end = start + Math.max(d.dur, d.visits ? minDur * 2 : minDur) * 60; phase = S >= start && S < end ? "running" : S >= end ? "done" : "coming"; }
      return { ...d, phase, start, end };
    });
    const links = [];
    duties.filter(d => d.phase === "running").sort((a, b) => a.start - b.start).forEach(d => {
      if (d.room === "home" && !d.visits) { order.forEach(k => links.push({ room: k, dutyId: d.id, title: d.title, kind: "gather" })); return; }
      let room = d.room;
      if (d.visits) { const sub = (d.end - d.start) / d.visits.length; room = d.visits[Math.min(d.visits.length - 1, Math.floor((S - d.start) / sub))]; }
      if (room !== "home") links.push({ room, dutyId: d.id, title: d.title, kind: "work" });
    });
    duties.filter(d => d.live && d.status === "active").forEach(d => links.push({ room: d.room, dutyId: d.id, title: d.title, kind: "live" }));
    const work = links.filter(l => l.kind === "work"), gather = links.filter(l => l.kind === "gather"), live = links.filter(l => l.kind === "live");
    let nova;
    if (work.length) nova = { room: work[0].room, duty: work[0].dutyId, dutyTitle: work[0].title, state: "working" };
    else if (gather.length) nova = { room: "home", duty: gather[0].dutyId, dutyTitle: gather[0].title, state: "gather" };
    else {
      const slot = Math.floor(min / 60);
      if (min % 60 < 30 && order.length) { const k = order[slot % order.length]; nova = { room: k, duty: null, dutyTitle: null, state: "watch" }; links.push({ room: k, dutyId: null, title: "On watch", kind: "watch" }); }
      else nova = { room: "home", duty: null, dutyTitle: null, state: "idle" };
    }
    return { S, duties, nova: { ...nova, links, work, gather, live } };
  }

  function rooms(m) {
    const score = { A: 95, B: 80, C: 65, D: 50, F: 30 };
    const graded = base.filter(r => r.grade), avg = graded.length ? graded.reduce((s, r) => s + score[r.grade], 0) / graded.length : null;
    const ceo = avg == null ? null : avg >= 90 ? "A" : avg >= 75 ? "B" : avg >= 60 ? "C" : avg >= 45 ? "D" : "F";
    return base.map(r => {
      const duties = m.duties.filter(d => d.room === r.key), held = D.decisions.filter(c => c.room === r.key);
      const wl = m.nova.work.filter(l => l.room === r.key), ll = m.nova.live.filter(l => l.room === r.key);
      const gathering = r.key !== "home" && !r.hidden && m.nova.gather.length > 0, working = wl.length > 0;
      const watching = m.nova.state === "watch" && m.nova.room === r.key, failing = duties.some(d => d.failing);
      const next = duties.filter(d => d.phase === "coming").sort((a, b) => a.start - b.start)[0];
      let live, tone = "quiet";
      if (r.hidden) live = "Hidden";
      else if (working) { live = "Working now · " + wl.map(l => l.title).join(" + "); tone = "working"; }
      else if (gathering) { live = "Reporting in · " + m.nova.gather[0].title; tone = "gather"; }
      else if (watching) { live = "On watch · Nova is here"; tone = "watch"; }
      else if (held.length) { live = "Waiting on you · " + held.length; tone = "waiting"; }
      else if (next) live = "Queued · " + next.title + " at " + fmtMin(next.at);
      else if (ll.length) { live = "Live line open · " + ll[0].title; tone = "watch"; }
      else live = duties.length ? "On watch" : "No currents yet";
      const v = {
        key: r.key, title: title(r.key), module: r.module, order: r.order, hidden: !!r.hidden, grade: r.grade || null, live, liveTone: tone,
        stateKey: r.hidden ? "hidden" : failing ? "failing" : working ? "working" : gathering ? "gather" : held.length ? "waiting" : "quiet",
        waiting: held.length,
        threads: r.key === "home" ? [] : D.actions.filter(a => a.room === r.key && a.t * 60 <= m.S).sort((a, b) => a.t - b.t).map(a => a.status),
        duties: duties.map(d => ({ id: d.id, title: d.title, status: d.status, phase: d.phase, failing: !!d.failing, live: !!d.live })),
      };
      if (r.key === "home") {
        const W = m.nova.work;
        v.grade = ceo; v.waiting = D.decisions.length;
        v.live = W.length > 1 ? W.length + " filaments out" : W.length === 1 ? "Filament out · " + W[0].title : m.nova.state === "gather" ? "Gathering · " + m.nova.dutyTitle : m.nova.state === "watch" ? "Filament out · on watch" : "Nova is here · breathing";
        v.liveTone = m.nova.state === "idle" ? "watch" : m.nova.state === "gather" ? "gather" : "quiet";
      }
      return v;
    });
  }

  function dots(m) {
    return m.duties.filter(d => d.at != null && d.status !== "paused").sort((a, b) => a.at - b.at)
      .map(d => ({ min: d.at, label: d.short || d.title, status: d.status !== "active" ? "skipped" : d.phase }));
  }

  // the one sentence under the caption, from the locale's templates
  function line(m, L) {
    const W = m.nova.work, n = m.nova;
    if (W.length > 1) return fill(L.many, { n: W.length, duties: W.map(l => l.title).join(" · ") });
    if (W.length === 1) return fill(L.one, { room: title(W[0].room), duty: W[0].title });
    if (n.state === "gather") return fill(L.gather, { duty: n.dutyTitle });
    if (n.state === "watch") return fill(L.watch, { room: title(n.room) });
    return fill(L.idle, { n: n.live.length });
  }

  const clock = S => pad(Math.floor(S / 3600)) + ":" + pad(Math.floor(S / 60) % 60);
  return { model, rooms, dots, line, clock };
}

function Arrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LegendRow({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{icon}<span>{children}</span></div>
  );
}

export default function NovaField({
  copy = {},                          // c.org.field — caption, legend[3], link, idle, lines{many,one,gather,watch,idle}
  badge = "NOVA'S OFFICE · LIVE",     // MONO.orgFieldBadge
  storeName = "Shahrqee",             // painted on the core's label
  deptNames,                          // c.org.depts.map(d => d.n) — station names in the locale, data order
  href = "/nova",
  daySeconds = 120,                   // a whole store day in this many real seconds
  startTime = "05:30",                // store-local; the night shift has just finished, the morning checks are next
  T = {},                             // lib/type.js deltas
}) {
  const host = useRef(null), mount = useRef(null), clockRef = useRef(null), skyRef = useRef(null), lineRef = useRef(null);
  const deptKey = (deptNames || []).join("|");
  const lines = copy.lines || {};

  useEffect(() => {
    const root = host.current;
    if (!root) return undefined;
    let dead = false, el = null, timer = 0, io = null, near = null, paused = false;

    const start = async () => {
      try {
        loadFonts();
        await Promise.all([load(THREE_SRC), load(DATA_SRC), load(ENGINE_SRC)]);
        await customElements.whenDefined("nova-field-3d");
      } catch (e) { return; }
      const D = window.NovaOfficeData;
      if (dead || !D || !mount.current) return;
      const feed = createFeed(D, { storeName, deptNames, daySeconds, startTime });
      el = document.createElement("nova-field-3d");
      el.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      mount.current.appendChild(el);
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.setAutoOrbit(false);
      let lastPush = "", lastNova = "";
      const push = force => {
        const m = feed.model(), rooms = feed.rooms(m), dots = feed.dots(m), sig = JSON.stringify(rooms) + JSON.stringify(dots);
        if (force || sig !== lastPush) { lastPush = sig; el.update(rooms); el.setDay(dots); }
        el.setClock(m.S / 3600);
        const links = m.nova.links.map(l => ({ room: l.room, dutyId: l.dutyId, kind: l.kind })), nk = JSON.stringify(links) + m.nova.state;
        if (force || nk !== lastNova) { lastNova = nk; el.setNova({ room: m.nova.room, dutyId: m.nova.duty, state: m.nova.state, links }); }
        // written straight to the DOM: at demo speed a store-minute passes every ~80ms, too fast for setState
        if (clockRef.current) clockRef.current.textContent = feed.clock(m.S) + " " + TZ;
        if (skyRef.current) skyRef.current.textContent = skyWord(m.S / 3600);
        if (lineRef.current) lineRef.current.textContent = feed.line(m, lines);
      };
      el.addEventListener("field-ready", () => { lastPush = ""; lastNova = ""; push(true); });
      el.setData({ stations: feed.rooms(feed.model()), store: { name: storeName } });
      timer = window.setInterval(() => { if (!paused && !dead) push(false); }, 200);
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(es => { const on = es.some(e => e.isIntersecting); paused = !on; if (el && el.setPaused) el.setPaused(!on); }, { threshold: 0.05 });
        io.observe(root);
      }
    };

    if ("IntersectionObserver" in window) {
      near = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { near.disconnect(); near = null; start(); } }, { rootMargin: "600px 0px" });
      near.observe(root);
    } else start();

    return () => { dead = true; window.clearInterval(timer); if (io) io.disconnect(); if (near) near.disconnect(); if (el) el.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeName, deptKey, daySeconds, startTime]);

  const s0 = parseTime(startTime);
  const legend = copy.legend || [];

  return (
    <div ref={host} className="m-field" style={{ position: "relative", width: "100%", height: "clamp(380px, 44vw, 560px)", borderRadius: 28, overflow: "hidden", background: "#0F120B", color: "#E9EFDC", textAlign: "left", isolation: "isolate", boxShadow: "0 34px 80px rgba(15,18,11,0.35)" }}>
      <div ref={mount} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 50%, rgba(3,4,8,0.6) 100%)" }} />

      <div style={{ position: "absolute", left: 20, top: 20, display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", borderRadius: 99, background: "rgba(8,10,14,0.86)", border: "1px solid rgba(198,240,53,0.16)", fontFamily: MONO, fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", color: "#C6F035", whiteSpace: "nowrap" }}>
        <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite", flexShrink: 0 }} />
        <span>{badge}</span>
        <span style={{ width: 1, height: 12, background: "rgba(233,239,220,0.18)" }} />
        <span style={{ color: "#A9AD98", fontVariantNumeric: "tabular-nums" }}>
          <span ref={clockRef}>{pad(Math.floor(s0 / 3600)) + ":" + pad(Math.floor(s0 / 60) % 60) + " " + TZ}</span> · <span ref={skyRef}>{skyWord(s0 / 3600)}</span>
        </span>
      </div>

      <div style={{ position: "absolute", left: 20, right: 20, bottom: 20, display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px 28px" }}>
        <div style={{ maxWidth: 520, minWidth: 0 }}>
          <div className="m-field-caption" style={{ fontSize: "clamp(20px, 2.2vw, 28px)", fontWeight: 800, letterSpacing: "-0.6px", lineHeight: 1.15, color: "#FBFBF4", textWrap: "pretty", ...T.h3 }}>{copy.caption}</div>
          <div style={{ marginTop: 9, display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "#A9AD98", ...T.small }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: "#C6F035", animation: "pulseRing 2.2s infinite", flexShrink: 0 }} />
            <span ref={lineRef}>{copy.idle}</span>
          </div>
        </div>
        <div className="m-field-legend" style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 12.5, color: "#A9AD98", ...T.small }}>
          <LegendRow icon={<span style={{ width: 14, height: 14, borderRadius: 99, border: "2px solid #C6F035", flexShrink: 0 }} />}>{legend[0]}</LegendRow>
          <LegendRow icon={<span style={{ width: 14, height: 2, borderRadius: 2, background: "linear-gradient(90deg, #C6F035, rgba(198,240,53,0.3))", boxShadow: "0 0 8px rgba(198,240,53,0.7)", flexShrink: 0 }} />}>{legend[1]}</LegendRow>
          <LegendRow icon={<span style={{ width: 10, height: 14, borderRadius: 2, background: "rgba(227,181,74,0.35)", border: "1.5px solid #E3B54A", flexShrink: 0 }} />}>{legend[2]}</LegendRow>
          <Link href={href} className="hv-up2" style={{ marginTop: 4, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 99, background: "#C6F035", color: "#0F120B", fontSize: 13, fontWeight: 700, ...T.label }}>
            {copy.link} <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
