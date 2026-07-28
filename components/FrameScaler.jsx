"use client";

// Scales the fixed 1440px-wide prototype iframe to the available width.
// Desktop keeps the source's exact zoom (0.88, 720px viewport height); below
// that the scale follows container width so the embed stays fully visible.

import { useEffect, useRef, useState } from "react";

const BASE_W = 1440;
const DESKTOP_ZOOM = 0.88;
const DESKTOP_VIEW_H = 720;
const INNER_H = Math.ceil(DESKTOP_VIEW_H / DESKTOP_ZOOM); // 819

export default function FrameScaler({ src, title }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(DESKTOP_ZOOM);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(DESKTOP_ZOOM, w / BASE_W));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const outerH = Math.min(DESKTOP_VIEW_H, Math.round(INNER_H * scale));

  return (
    <div ref={ref} style={{ width: "100%", height: outerH, overflow: "hidden", background: "#eff1e9" }}>
      <div style={{ width: BASE_W, height: INNER_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <iframe src={src} title={title} style={{ width: BASE_W, height: INNER_H, border: "none", display: "block" }} />
      </div>
    </div>
  );
}
