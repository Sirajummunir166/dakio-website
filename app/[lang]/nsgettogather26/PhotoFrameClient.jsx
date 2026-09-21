"use client";

import { useRef, useState, useEffect } from "react";

const SIZE = 1500;

// Per-frame badge geometry: where the "শিক্ষাবর্ষ:" value goes (left edge,
// vertical center, max available width) so the typed session text fits
// inside the same green box the label was printed on in the source PNG.
const FRAMES = [
  {
    key: "participant",
    label: "অংশগ্রহণকারী",
    src: "/assets/nsgettogather26/frames/frame-participant.png",
    box: { x: 66, centerY: 1015, width: 182, maxSize: 34, minSize: 15 },
  },
  {
    key: "volunteer",
    label: "স্বেচ্ছাসেবক",
    src: "/assets/nsgettogather26/frames/frame-volunteer.png",
    box: { x: 66, centerY: 1015, width: 182, maxSize: 34, minSize: 15 },
  },
  {
    key: "sponsor",
    label: "স্পন্সর",
    src: "/assets/nsgettogather26/frames/frame-sponsor.png",
    box: { x: 66, centerY: 1015, width: 182, maxSize: 34, minSize: 15 },
  },
  {
    key: "organizer",
    label: "দায়িত্বশীল",
    src: "/assets/nsgettogather26/frames/frame-organizer.png",
    box: { x: 66, centerY: 1015, width: 182, maxSize: 34, minSize: 15 },
  },
];

export default function PhotoFrameClient() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const frameImagesRef = useRef({});
  const userImgRef = useRef(null);

  const baseScaleRef = useRef(1);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });

  const [frameType, setFrameType] = useState("participant");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [session, setSession] = useState("");

  const frameTypeRef = useRef(frameType);
  const sessionRef = useRef(session);
  useEffect(() => {
    frameTypeRef.current = frameType;
  }, [frameType]);
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  const currentFrame = () => FRAMES.find(f => f.key === frameTypeRef.current) || FRAMES[0];

  const fitFontSize = (ctx, text, box) => {
    let size = box.maxSize;
    while (size > box.minSize) {
      ctx.font = `700 ${size}px 'Archivo','Noto Sans Bengali',sans-serif`;
      if (ctx.measureText(text).width <= box.width) break;
      size -= 1;
    }
    return size;
  };

  const drawSessionText = ctx => {
    const text = sessionRef.current.trim();
    if (!text) return;
    const { box } = currentFrame();
    const size = fitFontSize(ctx, text, box);
    ctx.font = `700 ${size}px 'Archivo','Noto Sans Bengali',sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(text, box.x, box.centerY);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, SIZE, SIZE);

    const userImg = userImgRef.current;
    if (userImg) {
      const s = baseScaleRef.current * scaleRef.current;
      const w = userImg.width * s;
      const h = userImg.height * s;
      const x = (SIZE - w) / 2 + offsetRef.current.x;
      const y = (SIZE - h) / 2 + offsetRef.current.y;
      ctx.drawImage(userImg, x, y, w, h);
    }

    const frameImg = frameImagesRef.current[frameTypeRef.current];
    if (frameImg && frameImg.complete) {
      ctx.drawImage(frameImg, 0, 0, SIZE, SIZE);
    }

    drawSessionText(ctx);
  };

  useEffect(() => {
    FRAMES.forEach(f => {
      const img = new Image();
      img.src = f.src;
      img.onload = draw;
      frameImagesRef.current[f.key] = img;
    });
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clampOffsets = () => {
    const userImg = userImgRef.current;
    if (!userImg) return;
    const s = baseScaleRef.current * scaleRef.current;
    const w = userImg.width * s;
    const h = userImg.height * s;
    const maxX = Math.max(0, (w - SIZE) / 2);
    const maxY = Math.max(0, (h - SIZE) / 2);
    offsetRef.current.x = Math.min(maxX, Math.max(-maxX, offsetRef.current.x));
    offsetRef.current.y = Math.min(maxY, Math.max(-maxY, offsetRef.current.y));
  };

  const handleFrameSelect = key => {
    setFrameType(key);
    frameTypeRef.current = key;
    draw();
  };

  const handleSessionChange = e => {
    const val = e.target.value;
    setSession(val);
    sessionRef.current = val;
    draw();
  };

  const handleFile = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        userImgRef.current = img;
        baseScaleRef.current = Math.max(SIZE / img.width, SIZE / img.height);
        scaleRef.current = 1;
        offsetRef.current = { x: 0, y: 0 };
        setZoom(100);
        setHasPhoto(true);
        draw();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleZoom = e => {
    const val = Number(e.target.value);
    setZoom(val);
    scaleRef.current = val / 100;
    clampOffsets();
    draw();
  };

  const toCanvasDelta = (dxClient, dyClient) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const ratio = SIZE / rect.width;
    return { dx: dxClient * ratio, dy: dyClient * ratio };
  };

  const startDrag = (clientX, clientY) => {
    if (!userImgRef.current) return;
    dragRef.current = { dragging: true, lastX: clientX, lastY: clientY };
  };
  const moveDrag = (clientX, clientY) => {
    if (!dragRef.current.dragging || !userImgRef.current) return;
    const d = toCanvasDelta(clientX - dragRef.current.lastX, clientY - dragRef.current.lastY);
    offsetRef.current.x += d.dx;
    offsetRef.current.y += d.dy;
    dragRef.current.lastX = clientX;
    dragRef.current.lastY = clientY;
    clampOffsets();
    draw();
  };
  const endDrag = () => {
    dragRef.current.dragging = false;
  };

  const canDownload = hasPhoto && session.trim().length > 0;

  const handleDownload = () => {
    if (!canDownload) return;
    const canvas = canvasRef.current;
    canvas.toBlob(async blob => {
      if (!blob) return;
      const fileName = `NS-Get-Together-2026-${frameTypeRef.current}.png`;
      const file = new File([blob], fileName, { type: "image/png" });

      // On phones, navigator.share's native sheet offers "Save Image" /
      // "Save to Photos" — that lands in the gallery. A plain <a download>
      // instead drops into internal storage/Downloads, invisible in the
      // gallery app, so prefer share whenever the OS can share this file.
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: fileName });
          return;
        } catch (err) {
          if (err && err.name === "AbortError") return;
          // fall through to the download link on any other failure
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    }, "image/png");
  };

  return (
    <div style={styles.page}>
      <p style={styles.brand}>dakio presents</p>
      <h1 style={styles.h1}>
        এস এস পুর্মিলনী ২০২৬
        <br />
        ফটো ফ্রেম
      </h1>
      <p style={styles.sub}>ধরন বাছাই করুন, ছবি আপলোড করুন, ফ্রেমে বসিয়ে ডাউনলোড করুন</p>

      <div style={styles.typeSelect}>
        {FRAMES.map(f => (
          <button
            key={f.key}
            type="button"
            onClick={() => handleFrameSelect(f.key)}
            style={{ ...styles.typeBtn, ...(frameType === f.key ? styles.typeBtnActive : null) }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        ref={stageRef}
        style={styles.stage}
        onMouseDown={e => startDrag(e.clientX, e.clientY)}
        onMouseMove={e => moveDrag(e.clientX, e.clientY)}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={e => {
          const t = e.touches[0];
          startDrag(t.clientX, t.clientY);
        }}
        onTouchMove={e => {
          const t = e.touches[0];
          moveDrag(t.clientX, t.clientY);
        }}
        onTouchEnd={endDrag}
      >
        <canvas ref={canvasRef} width={SIZE} height={SIZE} style={styles.canvas} />
        {!hasPhoto && (
          <div style={styles.placeholder}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 40, height: 40, opacity: 0.6 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span>এখানে আপনার ছবি প্রিভিউ দেখা যাবে</span>
          </div>
        )}
      </div>

      <div style={styles.controls}>
        <div style={styles.field}>
          <label htmlFor="sessionInput" style={styles.fieldLabel}>
            শিক্ষাবর্ষ লিখুন
          </label>
          <input
            id="sessionInput"
            type="text"
            value={session}
            onChange={handleSessionChange}
            placeholder="যেমন: দাখিল ২০২৩"
            maxLength={40}
            style={styles.fieldInput}
          />
        </div>

        <div style={styles.row}>
          <label style={styles.uploadBtn} htmlFor="fileInput">
            📷 ছবি আপলোড করুন
          </label>
          <input id="fileInput" type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <button
            type="button"
            onClick={handleDownload}
            disabled={!canDownload}
            style={{ ...styles.button, ...(canDownload ? styles.downloadBtnActive : styles.downloadBtnDisabled) }}
          >
            ⬇ ডাউনলোড করুন
          </button>
        </div>

        {hasPhoto && (
          <div style={styles.zoomWrap}>
            <span style={styles.zoomLabel}>ছবি জুম / সাইজ ঠিক করুন</span>
            <input type="range" min="100" max="300" value={zoom} onChange={handleZoom} style={styles.range} />
          </div>
        )}

        <p style={styles.hint}>ছবি টেনে (ড্র্যাগ) সরিয়ে পজিশন ঠিক করতে পারবেন</p>
      </div>

      <footer style={styles.footer}>
        <a href="https://www.dakio.io/" target="_blank" rel="noopener" style={styles.footerLink}>
          <span>Visit</span>
          <img src="/assets/nsgettogather26/dakio-logo.svg" alt="dakio.io" style={{ height: 17, width: "auto", display: "block" }} />
        </a>
      </footer>
    </div>
  );
}

const GREEN = "#1e5c46";
const LIME = "#c6f035";
const BG = "#f4f5ef";
const INK = "#1a1d12";

const styles = {
  page: {
    margin: 0,
    fontFamily: "var(--dk-font-bn), var(--dk-font-sans), sans-serif",
    background: BG,
    color: INK,
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    overflowX: "hidden",
    padding: "20px 16px calc(40px + env(safe-area-inset-bottom))",
    boxSizing: "border-box",
  },
  brand: {
    margin: "0 0 2px",
    textAlign: "center",
    fontSize: "clamp(11px,3vw,13px)",
    fontWeight: 600,
    letterSpacing: ".03em",
    color: "#8a8f7d",
    textTransform: "lowercase",
  },
  h1: {
    fontSize: "clamp(18px,5.2vw,22px)",
    lineHeight: 1.35,
    textAlign: "center",
    margin: "0 0 4px",
    color: GREEN,
  },
  sub: {
    margin: "0 0 16px",
    textAlign: "center",
    color: "#555",
    fontSize: "clamp(12.5px,3.4vw,14px)",
    padding: "0 8px",
  },
  typeSelect: {
    width: "min(94vw, 480px)",
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  typeBtn: {
    flex: "1 1 calc(50% - 4px)",
    border: "1.5px solid #d8dccb",
    background: "#fff",
    color: "#555",
    padding: "10px 6px",
    borderRadius: 10,
    fontSize: "clamp(12px,3.4vw,13.5px)",
    fontWeight: 600,
    textAlign: "center",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  typeBtnActive: { background: GREEN, borderColor: GREEN, color: "#fff" },
  stage: {
    position: "relative",
    width: "min(94vw, 480px)",
    maxWidth: "100%",
    aspectRatio: "1/1",
    background: "#e9ebe1",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
    touchAction: "none",
  },
  canvas: { width: "100%", height: "100%", display: "block" },
  placeholder: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: "#8a8f7d",
    fontSize: 14,
    textAlign: "center",
    padding: 20,
    pointerEvents: "none",
  },
  controls: {
    width: "min(94vw, 480px)",
    maxWidth: "100%",
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    background: "#fff",
    padding: "12px 14px",
    borderRadius: 10,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  fieldLabel: { fontSize: 13, color: "#666", fontWeight: 600 },
  fieldInput: {
    border: "1.5px solid #d8dccb",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 15,
    fontFamily: "inherit",
    color: INK,
    outline: "none",
  },
  row: { display: "flex", gap: 10, flexWrap: "wrap" },
  uploadBtn: {
    flex: "1 1 140px",
    background: GREEN,
    color: "#fff",
    padding: "13px 14px",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: 600,
    fontSize: "clamp(13.5px,3.8vw,15px)",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  button: {
    flex: "1 1 140px",
    border: "none",
    padding: "13px 14px",
    borderRadius: 10,
    fontWeight: 600,
    fontSize: "clamp(13.5px,3.8vw,15px)",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
  downloadBtnActive: { background: LIME, color: INK },
  downloadBtnDisabled: { background: "#dfe3d3", color: "#9aa08a", cursor: "not-allowed" },
  zoomWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    background: "#fff",
    padding: "12px 14px",
    borderRadius: 10,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  zoomLabel: { fontSize: 13, color: "#666" },
  range: { width: "100%", accentColor: GREEN },
  hint: { textAlign: "center", fontSize: 12.5, color: "#8a8f7d", marginTop: 4 },
  footer: {
    marginTop: 28,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "clamp(12px,3.2vw,13px)",
    color: "#8a8f7d",
    textAlign: "center",
  },
  footerLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    lineHeight: 1,
    color: GREEN,
    fontWeight: 600,
    textDecoration: "none",
    padding: "6px 4px",
  },
};
