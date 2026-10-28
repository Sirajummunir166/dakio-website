// Nova's machine, the three.js side (loaded on demand by NovaMachine.jsx).
//
// A line drawing on the hero's ink: the channels, the phone (inbox), Nova on
// her pedestal, the Dakio app on a monitor, and the two ends of the line (a
// courier belt for shops, a desk calendar for services). Every shape is a
// dark fill with light outlines, so hidden lines stay hidden. Lime is kept
// for what matters: the cable, the pulse that carries each chat, Nova (the
// one solid thing), and the station at work, whose outline turns lime. Every
// cycle plays one real conversation from the home copy, end to end.
//
// Labels are HTML (NovaMachine.jsx); this file only moves them. No faces on
// Nova, ever: she is the lime ball and her highlight is her gaze.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";

const COL = { bg: 0x0F120B, fill: 0x13170E, line: 0xE9EFDC, lime: 0xC6F035 };
const CSS = {
  bg: "#13170E", line: "rgba(233,239,220,0.55)", soft: "rgba(233,239,220,0.22)", text: "#E9EFDC",
  dim: "rgba(233,239,220,0.5)", lime: "#C6F035", limeSoft: "rgba(198,240,53,0.1)", ink0: "#0F120B",
};

// The cycle, in seconds. A chat comes in, Nova answers, the app records it,
// the line delivers it, then the scene rests before the next one.
const T = { phoneFrom: 1.1, phoneStep: 0.55, novaIn: [1.3, 2.1], think: [2.1, 4.4], toApp: [4.4, 5.3], toOut: [5.7, 6.6], cycle: 11 };
const PHASES = [["in", 0], ["nova", 2.1], ["app", 5.3], ["out", 6.6]];

const ANCHORS = {
  in: [-6.35, 1.1, 2.15],
  nova: [0, 2.7, 0.3],
  app: [3.6, 4.0, -2.42],
  outShop: [4.4, 0.25, 2.6],
  outSvc: [7.7, 1.9, -0.75],
};

export function createMachine({ canvas, labels, data, reduced, coarse, onPhase, onPick }) {
  // Default power: a laptop should not wake its big GPU for a hero. 1.5x is
  // sharp on Retina; the quality ladder below can drop it to 1x.
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  let pr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(pr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(COL.bg, 1);
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  const world = new THREE.Group();
  scene.add(world);

  const camera = new THREE.PerspectiveCamera(24, 16 / 9, 0.1, 160);
  const HOME_TARGET = new THREE.Vector3(0.5, 0.9, 0.4);
  const HOME_DIR = new THREE.Vector3(5.2, 8.4, 13).normalize();
  const BASE_DIST = 25;
  let homeDist = BASE_DIST;
  camera.position.copy(HOME_TARGET).addScaledVector(HOME_DIR, homeDist);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(HOME_TARGET);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.55;
  controls.minPolarAngle = 0.55;
  controls.maxPolarAngle = 1.22;
  const homeAz = Math.atan2(HOME_DIR.x, HOME_DIR.z);
  controls.minAzimuthAngle = homeAz - 0.8;
  controls.maxAzimuthAngle = homeAz + 0.8;
  if (coarse) controls.enableRotate = false; // a finger on a phone scrolls the page
  controls.update();

  // Only Nova is lit; everything else is drawn flat.
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1A1D12, 1.2));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(-5, 15, 8);
  scene.add(sun);

  const disposables = [];
  const keep = x => { disposables.push(x); return x; };

  // ---------- the line kit ----------
  // Shapes: a dark fill pushed back a little, so their own outlines win the
  // depth test and the lines behind them stay hidden.
  const FILL = keep(new THREE.MeshBasicMaterial({ color: COL.fill, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 }));
  const lineMats = [];
  const lineMat = (color, width, opacity) => {
    const m = keep(new LineMaterial({ color, linewidth: width, transparent: opacity < 1, opacity }));
    lineMats.push(m);
    return m;
  };
  const L = {
    main: lineMat(COL.line, 1.3, 0.62),
    soft: lineMat(COL.line, 1, 0.26),
    lime: lineMat(COL.lime, 1.6, 1),
    cable: lineMat(COL.lime, 1.8, 0.5),
  };
  // Every outline that belongs to a station, so the station at work can turn lime.
  const stationLines = new Map();
  function outline(mesh, tone = "main", threshold = 20) {
    const g = keep(new LineSegmentsGeometry().fromEdgesGeometry(keep(new THREE.EdgesGeometry(mesh.geometry, threshold))));
    const seg = new LineSegments2(g, L[tone]);
    seg.userData.tone = tone;
    mesh.add(seg);
    return seg;
  }
  function shape(geometry, parent, tone) {
    const m = new THREE.Mesh(keep(geometry), FILL);
    parent.add(m);
    if (tone) outline(m, tone);
    return m;
  }
  // A box with rounded corners. "face" rounds the front (screens, tiles);
  // "plan" rounds it seen from above (pedestal, belt, parcels). The outline
  // is the two rounded rims plus one line at each corner, where the eye
  // expects the side to turn.
  function box(w, h, d, parent = world, tone = "main", r = 0.08, round = "face") {
    const plan = round === "plan";
    const a = w, b = plan ? d : h, depth = plan ? h : d;
    const rad = Math.min(r, a / 2 - 0.001, b / 2 - 0.001);
    const sh = new THREE.Shape();
    const x0 = -a / 2, y0 = -b / 2;
    sh.moveTo(x0 + rad, y0); sh.lineTo(x0 + a - rad, y0); sh.absarc(x0 + a - rad, y0 + rad, rad, -Math.PI / 2, 0);
    sh.lineTo(x0 + a, y0 + b - rad); sh.absarc(x0 + a - rad, y0 + b - rad, rad, 0, Math.PI / 2);
    sh.lineTo(x0 + rad, y0 + b); sh.absarc(x0 + rad, y0 + b - rad, rad, Math.PI / 2, Math.PI);
    sh.lineTo(x0, y0 + rad); sh.absarc(x0 + rad, y0 + rad, rad, Math.PI, Math.PI * 1.5);
    const g = keep(new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: false, curveSegments: 10 }));
    g.translate(0, 0, -depth / 2);
    // Shape space to world: (x, y, z) stays, or for "plan" becomes (x, z, -y).
    const to = (x, y, z) => (plan ? [x, z, -y] : [x, y, z]);
    if (plan) g.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, FILL);
    parent.add(m);
    if (!tone) return m;
    const pos = [...new THREE.EdgesGeometry(g, 30).attributes.position.array];
    const k = Math.SQRT1_2 * rad;
    for (const [sx, sy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const cx = sx * (a / 2 - rad) + sx * k, cy = sy * (b / 2 - rad) + sy * k;
      pos.push(...to(cx, cy, -depth / 2), ...to(cx, cy, depth / 2));
    }
    const seg = new LineSegments2(keep(new LineSegmentsGeometry().setPositions(pos)), L[tone]);
    seg.userData.tone = tone;
    m.add(seg);
    return m;
  }
  const cyl = (rt, rb, h, parent = world, seg = 40, tone = "main") => shape(new THREE.CylinderGeometry(rt, rb, h, seg), parent, tone);

  // ---------- canvas textures ----------
  // Drawn in logical pixels, stored at k times that for crisp screens.
  function canvasTex(w, h, k = 1) {
    const cv = document.createElement("canvas");
    cv.width = w * k; cv.height = h * k; cv.k = k;
    const ctx = cv.getContext("2d");
    ctx.scale(k, k);
    const tex = keep(new THREE.CanvasTexture(cv));
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = aniso;
    return { cv, ctx, tex };
  }
  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function plane(w, h, tex, parent, transparent = false) {
    const m = new THREE.Mesh(keep(new THREE.PlaneGeometry(w, h)), keep(new THREE.MeshBasicMaterial({ map: tex, transparent, depthWrite: !transparent })));
    parent.add(m);
    return m;
  }
  function radialTex(stops) {
    const cv = document.createElement("canvas"); cv.width = cv.height = 128;
    const ctx = cv.getContext("2d");
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
    const t = keep(new THREE.CanvasTexture(cv)); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  // Light strokes on a clear canvas, for icons and signs.
  const pen = (ctx, color = CSS.text, width = 8) => { ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = "round"; ctx.lineJoin = "round"; };

  // ---------- station 01: channels + phone ----------
  const st = {};
  st.in = new THREE.Group(); world.add(st.in);
  const CHANNELS = [
    { n: "Messenger", draw: glyphMessenger },
    { n: "Instagram", draw: glyphInstagram },
    { n: "WhatsApp", draw: glyphWhatsApp },
    { n: "Website", draw: glyphWeb },
  ];
  const chanX = [-8.0, -6.9, -5.8, -4.7];
  // Each channel is a flat icon that always faces you, light at rest and
  // lime when a chat comes in through it.
  const chanTiles = CHANNELS.map((ch, i) => {
    const glyph = (color) => { const g = canvasTex(256, 256, 2); ch.draw(g.ctx, color); g.tex.needsUpdate = true; return g.tex; };
    const light = glyph(CSS.text), lime = glyph(CSS.lime);
    const icon = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: light, transparent: true, depthWrite: false })));
    icon.scale.set(0.9, 0.9, 1);
    icon.position.set(chanX[i], 0.62, 2.15);
    icon.userData = { base: icon.position.y, light, lime };
    st.in.add(icon);
    return icon;
  });

  const phone = new THREE.Group();
  phone.position.set(-3.8, 1.2, 0.3);
  phone.rotation.x = -0.16;
  st.in.add(phone);
  box(1.18, 2.32, 0.08, phone, "main", 0.18);
  const phoneTex = canvasTex(512, 1000, 1.5);
  plane(1.06, 2.18, phoneTex.tex, phone).position.z = 0.042;

  // ---------- station 02: Nova ----------
  st.nova = new THREE.Group(); world.add(st.nova);
  // One pedestal, its top ringed in lime light. Nova floats over it.
  const PED = { w: 1.6, h: 0.95 };
  const block = box(PED.w, PED.h, PED.w, st.nova, "main", 0.3, "plan");
  block.position.set(0, PED.h / 2, 0.3);
  const top = PED.h;
  const ring = new THREE.Mesh(keep(new THREE.TorusGeometry(0.52, 0.014, 12, 128)), keep(new THREE.MeshBasicMaterial({ color: COL.lime })));
  ring.rotation.x = Math.PI / 2; ring.position.set(0, top + 0.01, 0.3); st.nova.add(ring);

  const novaHome = new THREE.Vector3(0, top + 1.05, 0.3);
  const nova = new THREE.Group(); nova.position.copy(novaHome); st.nova.add(nova);
  const ballMat = keep(new THREE.MeshStandardMaterial({ color: 0xC6F035, emissive: 0x8DC21F, emissiveIntensity: 0.6, roughness: 0.3 }));
  const ball = new THREE.Mesh(keep(new THREE.SphereGeometry(0.55, 64, 48)), ballMat);
  nova.add(ball);
  const glowTex = radialTex([[0, "rgba(214,250,90,0.45)"], [0.35, "rgba(198,240,53,0.16)"], [1, "rgba(198,240,53,0)"]]);
  const glow = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })));
  glow.scale.set(1.9, 1.9, 1); nova.add(glow);
  // Her gaze: a soft highlight that turns toward whatever she is working on.
  const gazeTex = radialTex([[0, "rgba(255,255,255,0.95)"], [0.5, "rgba(255,255,255,0.35)"], [1, "rgba(255,255,255,0)"]]);
  const gaze = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: gazeTex, depthWrite: false, transparent: true })));
  gaze.scale.set(0.34, 0.34, 1); nova.add(gaze);
  const gazeDir = new THREE.Vector3(0.3, 0.35, 1).normalize();
  const gazeWant = gazeDir.clone();

  // ---------- station 03: the app on a monitor ----------
  st.app = new THREE.Group(); world.add(st.app);
  const arm = box(0.9, 1.85, 0.04, st.app, "soft", 0.1);
  arm.position.set(3.6, 0.95, -2.62); arm.rotation.x = 0.2;
  const monitor = new THREE.Group(); monitor.position.set(3.6, 2.66, -2.42); monitor.rotation.x = -0.04; st.app.add(monitor);
  box(4.3, 2.62, 0.1, monitor, "main", 0.14);
  const appTex = canvasTex(1100, 660, 1.5);
  plane(4.12, 2.44, appTex.tex, monitor).position.z = 0.052;

  // ---------- station 04a: courier belt (shops) ----------
  st.outShop = new THREE.Group(); world.add(st.outShop);
  const BELT = { x: 5.3, z: 2.6, y: 0.12, len: 4.2 };
  box(BELT.len, 0.08, 1.16, st.outShop, "main", 0.4, "plan").position.set(BELT.x, BELT.y, BELT.z);
  cyl(0.03, 0.03, 2.1, st.outShop, 12, "soft").position.set(8.3, 1.05, 2.6);
  const signTex = canvasTex(256, 256, 2); glyphCourier(signTex.ctx); signTex.tex.needsUpdate = true;
  const signDisc = cyl(0.5, 0.5, 0.04, st.outShop, 64, null);
  signDisc.rotation.x = Math.PI / 2; signDisc.position.set(8.3, 2.25, 2.6);
  plane(1.0, 1.0, signTex.tex, st.outShop, true).position.set(8.3, 2.25, 2.625);
  const labelTex = canvasTex(256, 160, 2); drawShippingLabel(labelTex.ctx); labelTex.tex.needsUpdate = true;
  const parcels = [0, 1, 2].map(() => {
    const p = new THREE.Group();
    box(0.72, 0.5, 0.62, p, "main", 0.1, "plan");
    const l = plane(0.34, 0.21, labelTex.tex, p, true); l.rotation.x = -Math.PI / 2; l.position.set(0.12, 0.252, 0.1);
    p.visible = false; st.outShop.add(p);
    return { g: p, t0: -1 };
  });

  // ---------- station 04b: desk calendar (services) ----------
  st.outSvc = new THREE.Group(); world.add(st.outSvc);
  const cal = new THREE.Group(); cal.position.set(7.7, 0.95, -0.7); cal.rotation.x = -0.22; st.outSvc.add(cal);
  box(2.2, 1.72, 0.06, cal, "main", 0.12);
  const calTex = canvasTex(640, 500, 2);
  plane(2.1, 1.62, calTex.tex, cal).position.z = 0.032;
  // The reminder rises from the calendar's corner.
  const bell = new THREE.Group(); bell.position.set(8.75, 0.75, -0.5); st.outSvc.add(bell);
  const smsTex = canvasTex(256, 128, 2); drawSms(smsTex.ctx); smsTex.tex.needsUpdate = true;
  const sms = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: smsTex.tex, transparent: true, depthWrite: false })));
  sms.scale.set(0.9, 0.45, 1); sms.visible = false; bell.add(sms);

  // ---------- cables ----------
  const Y = 0.06;
  const route = pts => {
    const path = new THREE.CurvePath();
    const v = pts.map(([x, z]) => new THREE.Vector3(x, Y, z));
    let from = v[0];
    for (let i = 1; i < v.length; i++) {
      const c = v[i];
      if (i < v.length - 1) {
        const r = Math.min(0.4, c.distanceTo(from) / 2, c.distanceTo(v[i + 1]) / 2);
        const a = c.clone().addScaledVector(c.clone().sub(from).normalize(), -r);
        const b = c.clone().addScaledVector(v[i + 1].clone().sub(c).normalize(), r);
        path.add(new THREE.LineCurve3(from, a));
        path.add(new THREE.QuadraticBezierCurve3(a, c, b));
        from = b;
      } else path.add(new THREE.LineCurve3(from, c));
    }
    return path;
  };
  // A cable is one lime line.
  function cable(path, parent) {
    const pts = path.getSpacedPoints(Math.ceil(path.getLength() * 12));
    const g = keep(new LineGeometry());
    g.setPositions(pts.flatMap(p => [p.x, p.y, p.z]));
    parent.add(new Line2(g, L.cable));
    return path;
  }
  const R = {
    // One cable in front of the icon row (so it never crosses an icon), then back to the phone.
    chan: cable(route([[-8.4, 2.95], [-3.8, 2.95], [-3.8, 0.45]]), st.in),
    toNova: cable(route([[-3.2, 0.3], [-0.8, 0.3]]), st.nova),
    toApp: cable(route([[0.8, 0.3], [2.2, 0.3], [2.2, -2.5], [3.4, -2.5]]), st.app),
    toShop: cable(route([[3.9, -2.4], [3.9, 2.0]]), st.outShop),
    toSvc: cable(route([[4.3, -2.4], [6.0, -2.4], [6.0, -0.6], [6.4, -0.6]]), st.outSvc),
  };

  // The pulse that carries the chat.
  const pulse = new THREE.Group();
  pulse.add(new THREE.Mesh(keep(new THREE.SphereGeometry(0.1, 24, 16)), keep(new THREE.MeshBasicMaterial({ color: 0xE4FF8A }))));
  const pglow = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })));
  pglow.scale.set(1.2, 1.2, 1); pulse.add(pglow);
  pulse.visible = false; world.add(pulse);

  // Invisible hit boxes, so a click on a station focuses it.
  const hitMat = keep(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  const hits = [];
  const hit = (key, w, h, d, x, y, z) => {
    const m = new THREE.Mesh(keep(new THREE.BoxGeometry(w, h, d)), hitMat);
    // Layer 1: the raycaster sees them, the camera does not.
    m.layers.set(1);
    m.position.set(x, y, z); m.userData.key = key; world.add(m); hits.push(m);
  };
  hit("in", 6.2, 3.2, 4.2, -5.8, 1.4, 1.1);
  hit("nova", 2.8, 3.0, 2.4, 0, 1.5, 0.3);
  hit("app", 4.5, 4.4, 1.4, 3.6, 2.2, -2.4);
  hit("outShop", 5.6, 2.4, 1.6, 5.6, 1.1, 2.6);
  hit("outSvc", 3.4, 2.4, 2.0, 8.0, 1.1, -0.6);

  // The station at work: its main outlines turn lime.
  for (const [key, g] of [["in", st.in], ["nova", st.nova], ["app", st.app], ["outShop", st.outShop], ["outSvc", st.outSvc]]) {
    const list = [];
    g.traverse(o => { if (o.isLineSegments2 && o.userData.tone === "main") list.push(o); });
    stationLines.set(key, list);
  }
  function lightStation(key) {
    for (const [k, list] of stationLines) for (const s of list) s.material = k === key ? L.lime : L.main;
    dirty = true;
  }

  // ---------- drawing the screens ----------
  let kind = "shop";
  let phoneShown = 0;
  let appNew = false;
  let calLit = false;

  // The screens are line sketches, not text: a bar stands for a line of
  // words (its length follows the real text), a box for a bubble or a row.
  // Only what Nova just did is lime.
  function bar(ctx, x, y, w, color, h = 6) { ctx.fillStyle = color; rr(ctx, x, y - h / 2, Math.max(h, w), h, h / 2); ctx.fill(); }
  function barW(text, max, k = 7.5) { return Math.min(max, 24 + String(text).length * k); }

  function drawPhone() {
    const { ctx, cv, tex } = phoneTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const p = data.phone[kind];
    ctx.fillStyle = CSS.bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 104); ctx.lineTo(W, 104); ctx.stroke();
    ctx.strokeStyle = CSS.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(58, 54, 22, 0, Math.PI * 2); ctx.stroke();
    bar(ctx, 98, 46, 150, CSS.line, 9); bar(ctx, 98, 70, 90, CSS.soft, 7);

    // Bubbles laid out bottom up, newest at the bottom.
    const msgs = p.msgs.slice(0, phoneShown).slice(-3);
    const blocks = msgs.map(m => {
      const n = Math.max(1, Math.min(2, Math.ceil(String(m.t).length / 30)));
      const bw = Math.min(320, 70 + String(m.t).length * 6.5);
      const imgH = m.img ? 150 : 0;
      const cardH = m.card ? 70 : 0;
      return { m, n, bw, h: n * 26 + 30 + (imgH ? imgH + 12 : 0) + (cardH ? cardH + 12 : 0), imgH, cardH };
    });
    let y = H - 36 - (phoneTyping ? 66 : 0);
    const placed = [];
    for (let i = blocks.length - 1; i >= 0; i--) { y -= blocks[i].h; placed.unshift({ ...blocks[i], y }); y -= 18; }
    ctx.save(); ctx.beginPath(); ctx.rect(0, 106, W, H - 106); ctx.clip();
    for (const b of placed) {
      const mine = b.m.from === "nova";
      let yy = b.y;
      if (b.imgH) {
        // The customer's photo: a frame with a hanger, no picture.
        ctx.strokeStyle = CSS.line; ctx.lineWidth = 2.5; rr(ctx, 26, yy, 130, b.imgH, 16); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(66, yy + 50); ctx.lineTo(91, yy + 34); ctx.lineTo(116, yy + 50); ctx.lineTo(108, yy + 120); ctx.lineTo(74, yy + 120); ctx.closePath(); ctx.stroke();
        yy += b.imgH + 12;
      }
      const bh = b.n * 26 + 30;
      const x = mine ? W - 26 - b.bw : 26;
      ctx.strokeStyle = mine ? CSS.lime : CSS.line; ctx.lineWidth = 2.5; rr(ctx, x, yy, b.bw, bh, 20); ctx.stroke();
      for (let i = 0; i < b.n; i++) bar(ctx, x + 20, yy + 28 + i * 26, (i === b.n - 1 && b.n > 1 ? 0.6 : 1) * (b.bw - 40), mine ? CSS.lime : CSS.dim, 7);
      yy += bh + 12;
      if (b.cardH) {
        const cw = 300, cx = W - 26 - cw;
        ctx.strokeStyle = CSS.lime; ctx.lineWidth = 2.5; rr(ctx, cx, yy, cw, b.cardH, 16); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + 34, yy + b.cardH / 2, 14, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(cx + 27, yy + b.cardH / 2); ctx.lineTo(cx + 32, yy + b.cardH / 2 + 6); ctx.lineTo(cx + 42, yy + b.cardH / 2 - 6); ctx.stroke();
        bar(ctx, cx + 62, yy + 26, 170, CSS.lime, 8); bar(ctx, cx + 62, yy + 46, 120, CSS.dim, 6);
      }
    }
    if (phoneTyping) {
      const x = W - 26 - 96, yy = H - 36 - 52;
      ctx.strokeStyle = CSS.lime; ctx.lineWidth = 2.5; rr(ctx, x, yy, 96, 52, 22); ctx.stroke();
      ctx.fillStyle = CSS.lime;
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 28 + i * 20, yy + 26, 5, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
    tex.needsUpdate = true;
  }
  let phoneTyping = false;

  function drawApp() {
    const { ctx, cv, tex } = appTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const a = data.app[kind];
    ctx.fillStyle = CSS.bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, 0); ctx.lineTo(200, H); ctx.stroke();
    bar(ctx, 34, 52, 80, CSS.lime, 12);
    a.menu.slice(0, 3).forEach((m, i) => bar(ctx, 34, 120 + i * 56, barW(m, 120, 9), i === 0 ? CSS.line : CSS.soft, 8));
    bar(ctx, 244, 60, barW(a.title, 260, 22), CSS.line, 18);
    bar(ctx, 244, 98, 220, CSS.soft, 7);
    // The table: one bar per cell, the new row in lime.
    const cols = a.cols;
    const top = 136;
    const rows = appNew ? [a.fresh, ...a.rows] : a.rows;
    rows.slice(0, 4).forEach((r, i) => {
      const y = top + 40 + i * 104;
      const fresh = appNew && i === 0;
      ctx.strokeStyle = fresh ? CSS.lime : CSS.soft; ctx.lineWidth = fresh ? 3 : 2; rr(ctx, 228, y, W - 258, 80, 16); ctx.stroke();
      // Who and how much: two bars a row.
      bar(ctx, 256, y + 40, 300, fresh ? CSS.lime : CSS.line, 9);
      bar(ctx, W - 200, y + 40, barW(r[cols.length - 2], 140, 10), fresh ? CSS.lime : CSS.dim, 9);
    });
    tex.needsUpdate = true;
  }

  function drawCal() {
    const { ctx, cv, tex } = calTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const c = data.cal;
    ctx.fillStyle = CSS.bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 92); ctx.lineTo(W, 92); ctx.stroke();
    bar(ctx, 34, 48, 140, CSS.line, 14);
    c.slots.slice(0, 3).forEach((s, i) => {
      const y = 122 + i * 120;
      const lit = s.fresh && calLit;
      if (s.fresh && !calLit) { ctx.setLineDash([10, 8]); ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2.5; rr(ctx, 30, y, W - 60, 74, 16); ctx.stroke(); ctx.setLineDash([]); return; }
      ctx.strokeStyle = lit ? CSS.lime : CSS.soft; ctx.lineWidth = lit ? 3 : 2; rr(ctx, 30, y, W - 60, 74, 16); ctx.stroke();
      bar(ctx, 56, y + 37, 70, lit ? CSS.lime : CSS.line, 8);
      bar(ctx, 170, y + 37, barW(s.what, W - 250, 9), lit ? CSS.lime : CSS.dim, 8);
    });
    tex.needsUpdate = true;
  }

  // The shipping label on each parcel: a frame, two lines and a barcode.
  function drawShippingLabel(ctx) {
    ctx.strokeStyle = CSS.line; ctx.lineWidth = 3; rr(ctx, 4, 4, 248, 152, 14); ctx.stroke();
    bar(ctx, 22, 34, 110, CSS.line, 10); bar(ctx, 22, 62, 170, CSS.dim, 7);
    ctx.fillStyle = CSS.dim; for (let i = 0; i < 26; i++) ctx.fillRect(22 + i * 8, 92, i % 3 ? 2 : 4, 44);
  }

  // Channel glyphs: line drawings in one colour, no logos, no brand colours.
  function bubble(ctx) {
    ctx.beginPath(); ctx.ellipse(128, 118, 82, 70, 0, 0.62 * Math.PI, 2.5 * Math.PI); ctx.lineTo(70, 214); ctx.closePath(); ctx.stroke();
  }
  function glyphMessenger(ctx, color) {
    pen(ctx, color, 9); bubble(ctx);
    ctx.beginPath(); ctx.moveTo(86, 136); ctx.lineTo(116, 104); ctx.lineTo(140, 128); ctx.lineTo(170, 96); ctx.stroke();
  }
  function glyphInstagram(ctx, color) {
    pen(ctx, color, 9); rr(ctx, 50, 50, 156, 156, 44); ctx.stroke();
    ctx.beginPath(); ctx.arc(128, 128, 36, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(172, 84, 6, 0, Math.PI * 2); ctx.fill();
  }
  function glyphWhatsApp(ctx, color) {
    pen(ctx, color, 9); ctx.beginPath(); ctx.arc(128, 124, 80, 0.7 * Math.PI, 2.62 * Math.PI); ctx.lineTo(56, 210); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(100, 96); ctx.quadraticCurveTo(96, 150, 156, 156); ctx.stroke();
  }
  function glyphWeb(ctx, color) {
    pen(ctx, color, 9); ctx.beginPath(); ctx.arc(128, 128, 80, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(128, 128, 34, 80, 0, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(48, 128); ctx.lineTo(208, 128); ctx.stroke();
  }
  function glyphCourier(ctx) {
    pen(ctx, CSS.lime, 7);
    ctx.beginPath(); ctx.arc(128, 128, 120, 0, Math.PI * 2); ctx.stroke();
    rr(ctx, 54, 92, 90, 62, 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(144, 108); ctx.lineTo(180, 108); ctx.lineTo(202, 132); ctx.lineTo(202, 154); ctx.lineTo(144, 154); ctx.stroke();
    for (const x of [84, 176]) { ctx.beginPath(); ctx.arc(x, 164, 14, 0, Math.PI * 2); ctx.fillStyle = CSS.ink0; ctx.fill(); ctx.stroke(); }
  }
  // The reminder going out: a lime chat bubble with three dots.
  function drawSms(ctx) {
    ctx.fillStyle = "rgba(15,18,11,0.85)"; rr(ctx, 48, 10, 160, 84, 30); ctx.fill();
    pen(ctx, CSS.lime, 3); rr(ctx, 48, 10, 160, 84, 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(82, 92); ctx.lineTo(72, 118); ctx.lineTo(104, 94); ctx.stroke();
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(102 + i * 26, 52, 6, 0, Math.PI * 2); ctx.fill(); }
  }

  // ---------- audience ----------
  let aud = "shop";
  let round = 0;
  function setAudience(a) {
    aud = a;
    st.outShop.visible = a !== "svc";
    st.outSvc.visible = a !== "shop";
    hits.forEach(h => { if (h.userData.key === "outShop") h.visible = a !== "svc"; if (h.userData.key === "outSvc") h.visible = a !== "shop"; });
    tCycle = reduced ? 9 : 0; round = 0;
    startCycle();
    if (reduced) poseStill();
    dirty = true;
  }
  function startCycle() {
    kind = aud === "both" ? (round % 2 ? "svc" : "shop") : aud;
    phoneShown = 0; phoneTyping = false; appNew = false; calLit = false;
    drawPhone(); drawApp(); drawCal();
    parcels.forEach(p => { p.g.visible = false; p.t0 = -1; });
    sms.visible = false;
    lastPhase = null;
  }
  // The finished frame, for reduced motion: the whole story at once.
  function poseStill() {
    phoneShown = data.phone[kind].msgs.length; appNew = true; calLit = true;
    drawPhone(); drawApp(); drawCal();
    if (kind === "shop" || aud === "both") { const p = parcels[0]; p.g.visible = true; p.g.position.set(5.6, BELT.y + 0.29, BELT.z); }
    pulse.visible = false;
    lightStation(null);
    onPhase?.(null, kind);
  }

  // ---------- the cycle ----------
  let tCycle = 0;
  let lastPhase = null;
  let curKey = "in";
  const tmp = new THREE.Vector3();
  const ease = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const chanIndex = () => (data.phone[kind].channel === "Instagram" ? 1 : 0);

  function placePulse(path, a, b, t, u0 = 0) {
    if (t < a || t > b) return false;
    path.getPointAt(u0 + ease((t - a) / (b - a)) * (1 - u0), tmp);
    pulse.position.copy(tmp).setY(Y + 0.1);
    return true;
  }

  function step(dt) {
    const prev = tCycle;
    tCycle += dt;
    const t = tCycle;
    const crossed = x => prev < x && t >= x;

    let ph = "in";
    for (const [k, at] of PHASES) if (t >= at) ph = k;
    if (ph !== lastPhase) {
      lastPhase = ph;
      const key = ph === "out" ? (kind === "shop" ? "outShop" : "outSvc") : ph;
      curKey = key;
      lightStation(key);
      onPhase?.(key, kind);
      if (follow() && !focused) focus(key);
    }

    // Pulse along the cable.
    const ci = chanIndex();
    pulse.visible =
      placePulse(R.chan, 0.15, T.phoneFrom, t, (chanX[ci] + 8.4) / R.chan.getLength()) ||
      placePulse(R.toNova, T.novaIn[0], T.novaIn[1], t) ||
      placePulse(R.toApp, T.toApp[0], T.toApp[1], t) ||
      placePulse(kind === "shop" ? R.toShop : R.toSvc, T.toOut[0], T.toOut[1], t);

    // The channel the chat came from turns lime and hops.
    chanTiles.forEach((s, i) => {
      const k = i === ci && t < 1.0 ? Math.sin(Math.min(1, t / 0.6) * Math.PI) : 0;
      s.position.y = s.userData.base + k * 0.25;
      const sc = 0.9 * (1 + k * 0.12); s.scale.set(sc, sc, 1);
      const map = i === ci && lastPhase === "in" ? s.userData.lime : s.userData.light;
      if (s.material.map !== map) s.material.map = map;
    });

    // The phone fills up, with Nova typing before each of her turns.
    const msgs = data.phone[kind].msgs;
    const want = Math.max(0, Math.min(msgs.length, Math.floor((t - T.phoneFrom) / T.phoneStep) + 1));
    const nextNova = msgs[want] && msgs[want].from === "nova";
    const typing = want < msgs.length && nextNova && t > T.phoneFrom && (t - T.phoneFrom) % T.phoneStep > T.phoneStep * 0.35;
    if (want !== phoneShown || typing !== phoneTyping) { phoneShown = want; phoneTyping = typing; drawPhone(); }

    // Nova thinks while the chat is being answered.
    const thinking = t >= T.think[0] && t < T.think[1];
    const now = clock.elapsedTime;
    const beat = thinking ? Math.sin(now * 9) * 0.5 + 0.5 : 0;
    ballMat.emissiveIntensity = 0.55 + beat * 0.45;
    glow.material.opacity = 0.5 + beat * 0.4;
    ring.rotation.z += dt * (thinking ? 4 : 0.6);

    if (crossed(T.toApp[1])) { appNew = true; drawApp(); }
    if (crossed(T.toOut[1])) {
      if (kind === "shop") { const p = parcels.find(q => q.t0 < 0) || parcels[0]; p.t0 = t; p.g.visible = true; }
      else { calLit = true; drawCal(); sms.visible = true; sms.userData.t0 = t; }
    }
    // Parcels ride the belt and drop off the end.
    for (const p of parcels) {
      if (p.t0 < 0) continue;
      const u = t - p.t0;
      const x = 3.4 + u * 1.15;
      const drop = Math.max(0, x - 7.3);
      p.g.position.set(Math.min(x, 7.9), BELT.y + 0.29 - drop * drop * 1.6, BELT.z);
      if (p.g.position.y < -0.6) { p.g.visible = false; p.t0 = -1; }
    }
    // The bell rings and the SMS rises.
    if (sms.visible) {
      const u = t - sms.userData.t0;
      bell.rotation.z = Math.sin(u * 22) * 0.25 * Math.max(0, 1 - u / 1.4);
      sms.position.y = 0.4 + Math.min(u, 2) * 0.3;
      sms.material.opacity = Math.max(0, 1 - Math.max(0, u - 2.4) / 0.8);
    }

    if (t >= T.cycle) { round++; tCycle = 0; startCycle(); }
  }

  // Nova floats, squashes a little on each beat, and looks at the work.
  function animateNova(dt, moving) {
    const now = clock.elapsedTime;
    const bob = moving ? Math.sin(now * 1.6) * 0.08 : 0;
    nova.position.y = novaHome.y + bob;
    const sq = moving ? Math.sin(now * 3.2) * 0.035 : 0;
    ball.scale.set(1 + sq, 1 - sq, 1 + sq);
    const look = { in: [-1, 0.1, 0.4], nova: [0.35, 0.4, 1], app: [0.7, 0.35, -0.5], outShop: [0.8, -0.2, 0.6], outSvc: [1, 0.1, -0.2] }[lastPhase] || [0.3, 0.35, 1];
    gazeWant.set(...look).normalize();
    gazeDir.lerp(gazeWant, Math.min(1, dt * 3)).normalize();
    gaze.position.copy(gazeDir).multiplyScalar(0.47);
  }

  // ---------- labels ----------
  const anchors = Object.fromEntries(Object.entries(ANCHORS).map(([k, v]) => [k, new THREE.Vector3(...v)]));
  let size = { w: 1, h: 1 };
  function placeLabels() {
    for (const [k, el] of Object.entries(labels)) {
      if (!el || !anchors[k]) continue;
      tmp.copy(anchors[k]); world.localToWorld(tmp); tmp.project(camera);
      const x = (tmp.x + 1) / 2 * size.w, y = (1 - tmp.y) / 2 * size.h;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, calc(-100% - 24px))`;
    }
  }

  // ---------- focus ----------
  // How close each station comes: never nearer than FOCUS, and far enough
  // that its width (WIDE) fits a narrow canvas.
  const FOCUS = { in: 10.5, nova: 9, app: 10.5, outShop: 10.5, outSvc: 9.5 };
  const WIDE = { in: 6.4, nova: 4.2, app: 5.2, outShop: 6.6, outSvc: 4.6 };
  const follow = () => camera.aspect < 1.2;
  let tween = null;
  function focus(key) {
    const target = key ? anchors[key].clone().setY(Math.max(0.8, anchors[key].y - 1.1)) : HOME_TARGET.clone();
    const dist = key ? Math.max(FOCUS[key], WIDE[key] / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect)) : homeDist;
    const dir = camera.position.clone().sub(controls.target).normalize();
    tween = { t: 0, fromPos: camera.position.clone(), fromTarget: controls.target.clone(), toTarget: target, toPos: target.clone().addScaledVector(key ? dir : HOME_DIR, dist) };
    dirty = true;
  }
  function stepTween(dt) {
    if (!tween) return;
    tween.t = Math.min(1, tween.t + dt / 0.9);
    const k = ease(tween.t);
    controls.target.lerpVectors(tween.fromTarget, tween.toTarget, k);
    camera.position.lerpVectors(tween.fromPos, tween.toPos, k);
    if (tween.t >= 1) tween = null;
  }

  // ---------- picking ----------
  const ray = new THREE.Raycaster();
  ray.layers.set(1);
  const ndc = new THREE.Vector2();
  let down = null;
  function pickAt(ev) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(hits.filter(h => h.visible), false)[0];
    return hit ? hit.object.userData.key : null;
  }
  const onDown = ev => { down = { x: ev.clientX, y: ev.clientY }; };
  const onUp = ev => {
    if (!down) return;
    const moved = Math.hypot(ev.clientX - down.x, ev.clientY - down.y);
    down = null;
    if (moved < 6) { const k = pickAt(ev); if (k) onPick?.(k); }
  };
  let hoverAt = 0;
  const onMove = ev => {
    if (coarse || ev.buttons) return;
    const now = performance.now(); if (now - hoverAt < 80) return; hoverAt = now;
    canvas.style.cursor = pickAt(ev) ? "pointer" : "grab";
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointermove", onMove);
  controls.addEventListener("change", () => { dirty = true; });

  // ---------- size ----------
  // A narrow canvas stands further back so the whole line still fits.
  const fitScale = () => Math.max(1, 1.95 / Math.max(0.55, camera.aspect));
  function resize(w, h) {
    size = { w, h };
    renderer.setSize(w, h, false);
    for (const m of lineMats) m.resolution.set(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    homeDist = BASE_DIST * fitScale();
    if (!tween) { const dir = camera.position.clone().sub(controls.target).normalize(); camera.position.copy(controls.target).addScaledVector(dir, focused ? camera.position.distanceTo(controls.target) : homeDist); }
    dirty = true;
  }
  let focused = false;

  // ---------- loop ----------
  // At most 60 frames a second (a 120 Hz screen would double the work), and
  // a quality ladder: if frames run slow, go to 1x.
  const clock = new THREE.Clock(false);
  let raf = 0;
  let running = false;
  let paused = !!reduced;
  let dirty = true;
  let lastAt = 0;
  const MIN_GAP = 1000 / 60 - 2;
  const gaps = [];
  let warm = 0;
  function degrade() {
    if (pr > 1) { pr = 1; renderer.setPixelRatio(1); renderer.setSize(size.w, size.h, false); }
    gaps.length = 0; warm = 0; dirty = true;
  }
  function watch(gap) {
    if (++warm < 90) return; // let shaders compile and textures upload first
    gaps.push(gap);
    if (gaps.length < 90) return;
    const sorted = [...gaps].sort((x, y) => x - y);
    gaps.length = 0;
    if (sorted[45] > 24 && pr > 1) degrade();
  }
  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (now - lastAt < MIN_GAP) return;
    if (lastAt) watch(now - lastAt);
    lastAt = now;
    const dt = Math.min(0.25, clock.getDelta());
    const moving = !paused;
    if (moving) step(dt);
    stepTween(dt);
    if (controls.update()) dirty = true;
    if (moving || tween || dirty || gazeDir.distanceTo(gazeWant) > 0.01) {
      animateNova(dt, moving);
      if (dirty || tween) placeLabels();
      renderer.render(scene, camera);
      dirty = false;
    }
  }
  function start() { if (running) return; running = true; lastAt = 0; warm = 0; gaps.length = 0; clock.start(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); clock.stop(); }

  // Compile every material now, hidden parts too, so the first parcel or
  // SMS does not stall a frame while its shader builds.
  {
    const hidden = [];
    scene.traverse(o => { if (!o.visible) { hidden.push(o); o.visible = true; } });
    renderer.compile(scene, camera);
    hidden.forEach(o => { o.visible = false; });
  }

  return {
    setAudience,
    focus(key) { focused = !!key; focus(key || (follow() ? curKey : null)); },
    setPaused(p) { paused = p; dirty = true; gaps.length = 0; warm = 0; },
    resize, start, stop,
    dispose() {
      stop();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointermove", onMove);
      controls.dispose();
      disposables.forEach(d => d.dispose?.());
      renderer.dispose();
    },
  };
}
