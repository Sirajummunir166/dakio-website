"use client";

// Nova's machine: the hero visual, a small 3D line (machineScene.js does the
// three.js side). A chat comes in, Nova answers, the app records it, and the
// line delivers it: a parcel for shops, a reminder for services. Drag to look
// around, tap a station to fly to it.
//
// three.js loads only when the section comes near the screen. The server
// renders the heading and the four steps, so the section reads with JS off
// or without WebGL. Off screen or in a hidden tab the scene stops; reduced
// motion gets the finished frame, still.

import { useEffect, useRef, useState } from "react";
import { useAudience } from "./Audience";

const KEYS = ["in", "nova", "app", "outShop", "outSvc"];

// What the monitor and the desk calendar show. App screens stay in English,
// as the app's own labels are; the chats come from the page's language.
const SCREENS = {
  shop: {
    title: "Orders", sub: "Saril · today", menu: ["Orders", "Products", "Customers", "Inbox", "Couriers"], byNova: "BY NOVA",
    cols: [{ h: "Order", x: 0 }, { h: "Area", x: 140 }, { h: "Items", x: 300 }, { h: "Total", x: 580 }, { h: "Payment", x: 700 }],
    fresh: ["#6BB-VHQ6", "Mirpur 10", "Marigold Yellow Panjabi · 40", "৳2,260", "COD"],
    rows: [
      ["#8CG-HH5N", "Dhanmondi", "2 items", "৳4,170", "bKash"],
      ["#5XW-LWHP", "Khilgaon", "1 item", "৳2,420", "COD"],
      ["#AXW-C5M5", "Mohammadpur", "1 item", "৳3,520", "COD"],
      ["#MJD-EKTN", "Sylhet", "2 items", "৳3,370", "COD"],
      ["#DHX-R8MD", "Banani", "1 item", "৳6,820", "bKash"],
    ],
  },
  svc: {
    title: "Bookings", sub: "Glow Studio · Friday", menu: ["Bookings", "Services", "Clients", "Inbox", "Calendar"], byNova: "BY NOVA",
    cols: [{ h: "Time", x: 0 }, { h: "Client", x: 130 }, { h: "Service", x: 280 }, { h: "Price", x: 520 }, { h: "Status", x: 640 }],
    fresh: ["4:00 PM", "Nusrat", "Bridal trial", "৳1,500", "Confirmed"],
    rows: [
      ["11:00 AM", "Mim", "Facial", "৳1,200", "Confirmed"],
      ["12:30 PM", "Tania", "Hair spa", "৳1,000", "Confirmed"],
      ["2:00 PM", "Rupa", "Threading", "৳150", "Confirmed"],
      ["6:00 PM", "Sadia", "Party makeup", "৳2,500", "Confirmed"],
    ],
  },
  cal: {
    day: "Friday", store: "Glow Studio",
    slots: [
      { time: "11:00", what: "Facial · Mim" },
      { time: "2:00", what: "Threading · Rupa" },
      { time: "4:00", what: "Bridal trial · Nusrat", fresh: true },
      { time: "6:00", what: "Party makeup · Sadia" },
    ],
  },
};

export default function NovaMachine({ m, chat, dark = false }) {
  const { aud } = useAudience();
  const stage = useRef(null);
  const canvas = useRef(null);
  const pins = useRef({});
  const api = useRef(null);
  const [state, setState] = useState("idle"); // idle | ready | failed
  const [phase, setPhase] = useState(null);
  const [kind, setKind] = useState("shop");
  const [focus, setFocus] = useState(null);
  const [paused, setPaused] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const audRef = useRef(aud);
  audRef.current = aud;

  useEffect(() => {
    const el = stage.current;
    if (!el) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setCoarse(isCoarse);
    if (reduced) setPaused(true);
    let alive = true;
    let visible = false;
    let ro;
    const sync = () => {
      if (!api.current) return;
      if (visible && !document.hidden) api.current.start(); else api.current.stop();
    };

    const boot = async () => {
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) throw new Error("no webgl");
        const [{ createMachine }] = await Promise.all([import("./machineScene"), document.fonts?.ready]);
        if (!alive) return;
        const fontFamily = getComputedStyle(el).fontFamily || "sans-serif";
        const phone = k => ({ name: chat.head[k].name, channel: chat.head[k].channel, img: chat.shop[0].img, msgs: chat[k] });
        api.current = createMachine({
          canvas: canvas.current,
          labels: pins.current,
          data: { phone: { shop: phone("shop"), svc: phone("svc") }, app: { shop: SCREENS.shop, svc: SCREENS.svc }, cal: SCREENS.cal, chips: m.chips },
          fontFamily, reduced, coarse: isCoarse, dark,
          onPhase: (p, k) => { setPhase(p); setKind(k); },
          onPick: k => setFocus(k),
        });
        ro = new ResizeObserver(([en]) => api.current?.resize(en.contentRect.width, en.contentRect.height));
        ro.observe(el);
        const r = el.getBoundingClientRect();
        api.current.resize(r.width, r.height);
        api.current.setAudience(audRef.current);
        setState("ready");
        sync();
      } catch {
        if (alive) setState("failed");
      }
    };

    let booted = false;
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      if (visible && !booted) { booted = true; boot(); }
      sync();
    }, { rootMargin: "200px 0px" });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      alive = false;
      io.disconnect();
      ro?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      api.current?.dispose();
      api.current = null;
    };
  }, [chat, dark]);

  useEffect(() => { api.current?.setAudience(aud); setFocus(null); }, [aud]);
  useEffect(() => { api.current?.focus(focus); }, [focus]);
  useEffect(() => { api.current?.setPaused(paused); }, [paused]);

  const s = m.stations;
  const text = {
    in: s.in,
    nova: s.nova,
    app: s.app[kind] || s.app.shop,
    outShop: s.out.shop,
    outSvc: s.out.svc,
  };
  const num = { in: "01", nova: "02", app: "03", outShop: "04", outSvc: "04" };
  const show = { outShop: "shop", outSvc: "svc" };
  const current = focus || phase;
  const steps = [["in", s.in], ["nova", s.nova], ["app", s.app], ["out", s.out]];

  return (
    <div className={`hm-mach${dark ? " hm-mach-dark" : ""}`}>
      <div ref={stage} className={`hm-mach-stage is-${state}`}>
        <canvas ref={canvas} className="hm-mach-canvas" aria-label={m.sub} role="img" />
        {state !== "failed" ? (
          <div className="hm-mach-pins" aria-hidden={state !== "ready"}>
            {KEYS.map(k => (
              <button
                key={k}
                type="button"
                ref={el => { pins.current[k] = el; }}
                data-show={show[k]}
                className={`hm-mach-pin${current === k ? " is-on" : ""}`}
                onClick={() => setFocus(focus === k ? null : k)}
              >
                <span className="hm-mach-n">{num[k]}</span>{text[k].t}<i className="hm-mach-dot" aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : null}
        {state === "idle" ? <div className="hm-mach-wait" aria-hidden="true"><span className="hm-orb" /></div> : null}
        {state === "ready" ? (
          <>
            <div className="hm-mach-cap" aria-live="polite">
              {current ? (
                <>
                  <b><span className="hm-mach-n">{num[current]}</span>{text[current].t}</b>
                  <span>{text[current].d}</span>
                  {focus ? <button type="button" className="hm-mach-back" onClick={() => setFocus(null)}>{m.back}</button> : null}
                </>
              ) : <span>{m.sub}</span>}
            </div>
            <button type="button" className="hm-mach-pause" onClick={() => setPaused(p => !p)} aria-pressed={paused}>
              {paused ? (
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor" /></svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor" /></svg>
              )}
              {paused ? m.play : m.pause}
            </button>
            <div className="hm-mach-hint">{coarse ? m.hint.touch : m.hint.drag}</div>
          </>
        ) : null}
      </div>

      <ol className="hm-mach-steps">
        {steps.map(([k, v], i) => {
          const pick = k === "out" ? (aud === "svc" ? "outSvc" : "outShop") : k;
          const on = current === pick || (k === "out" && (current === "outShop" || current === "outSvc"));
          const one = v.shop ? null : v;
          return (
            <li key={k} className={on ? "is-on" : undefined}>
              <button type="button" onClick={() => state === "ready" && setFocus(pick)}>
                <span className="hm-mach-n">{`0${i + 1}`}</span>
                {one ? <b>{one.t}</b> : (
                  <>
                    <b data-show="shop-only">{v.shop.t}</b>
                    <b data-show="svc-only">{v.svc.t}</b>
                    <b data-show="both-only">{`${v.shop.t} / ${v.svc.t}`}</b>
                  </>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
