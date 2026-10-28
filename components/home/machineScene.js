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
  in: [-6.35, 1.55, 2.15],
  nova: [0, 2.9, 0.3],
  app: [3.6, 4.0, -2.42],
  outShop: [4.4, 0.78, 2.6],
  outSvc: [7.7, 2.1, -0.75],
};

export function createMachine({ canvas, labels, data, fontFamily, reduced, coarse, onPhase, onPick }) {
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
  const box = (w, h, d, parent = world, tone = "main") => shape(new THREE.BoxGeometry(w, h, d), parent, tone);
  const cyl = (rt, rb, h, parent = world, seg = 40, tone = "main") => shape(new THREE.CylinderGeometry(rt, rb, h, seg), parent, tone);

  // ---------- canvas textures ----------
  const font = (w, px) => `${w} ${px}px ${fontFamily}`;
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
  function wrap(ctx, text, maxW) {
    const words = String(text).split(" ");
    const lines = []; let cur = "";
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      if (ctx.measureText(next).width > maxW && cur) { lines.push(cur); cur = w; } else cur = next;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function fit(ctx, text, maxW) {
    let t = String(text);
    if (ctx.measureText(t).width <= maxW) return t;
    while (t.length > 1 && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1);
    return t + "…";
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

  // Floor: a fine grid that fades out.
  {
    const g = canvasTex(1024, 1024);
    const ctx = g.ctx;
    ctx.strokeStyle = "rgba(233,239,220,0.05)"; ctx.lineWidth = 1.2;
    for (let i = 0; i <= 1024; i += 1024 / 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke(); }
    ctx.globalCompositeOperation = "destination-in";
    const fade = ctx.createRadialGradient(512, 512, 120, 512, 512, 512);
    fade.addColorStop(0, "rgba(0,0,0,1)"); fade.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fade; ctx.fillRect(0, 0, 1024, 1024);
    g.tex.needsUpdate = true;
    const grid = plane(40, 40, g.tex, world, true);
    grid.rotation.x = -Math.PI / 2; grid.position.set(0.5, 0.002, 0.4);
  }

  // ---------- station 01: channels + phone ----------
  const st = {};
  st.in = new THREE.Group(); world.add(st.in);
  box(5.0, 0.18, 1.5, st.in, "soft").position.set(-6.35, 0.09, 2.3);
  const CHANNELS = [
    { n: "Messenger", draw: glyphMessenger },
    { n: "Instagram", draw: glyphInstagram },
    { n: "WhatsApp", draw: glyphWhatsApp },
    { n: "Website", draw: glyphWeb },
  ];
  const chanX = [-8.0, -6.9, -5.8, -4.7];
  const chanTiles = CHANNELS.map((ch, i) => {
    cyl(0.05, 0.05, 0.4, st.in, 16, "soft").position.set(chanX[i], 0.38, 2.15);
    const tile = new THREE.Group();
    tile.position.set(chanX[i], 0.98, 2.15);
    tile.rotation.x = -0.12;
    tile.userData.base = tile.position.y;
    st.in.add(tile);
    const t = box(0.84, 0.84, 0.12, tile, "main");
    tile.userData.edges = t.children[0];
    const face = canvasTex(256, 256, 2);
    ch.draw(face.ctx); face.tex.needsUpdate = true;
    plane(0.62, 0.62, face.tex, tile, true).position.z = 0.062;
    // The channel's name, printed on the plinth.
    const name = canvasTex(256, 56, 2);
    name.ctx.fillStyle = CSS.dim; name.ctx.font = font(600, 28); name.ctx.textAlign = "center"; name.ctx.textBaseline = "middle";
    name.ctx.fillText(ch.n, 128, 30); name.tex.needsUpdate = true;
    const n = plane(0.96, 0.21, name.tex, st.in, true);
    n.rotation.x = -Math.PI / 2; n.position.set(chanX[i], 0.184, 2.72);
    return tile;
  });

  box(1.9, 0.2, 1.6, st.in, "soft").position.set(-3.8, 0.1, 0.2);
  const phoneStand = box(0.9, 1.3, 0.04, st.in, "soft");
  phoneStand.position.set(-3.8, 0.84, -0.12); phoneStand.rotation.x = 0.32;
  const phone = new THREE.Group();
  phone.position.set(-3.8, 1.42, 0.3);
  phone.rotation.x = -0.16;
  st.in.add(phone);
  box(1.18, 2.32, 0.08, phone, "main");
  const phoneTex = canvasTex(512, 1000, 1.5);
  plane(1.06, 2.18, phoneTex.tex, phone).position.z = 0.042;

  // ---------- station 02: Nova ----------
  st.nova = new THREE.Group(); world.add(st.nova);
  box(2.7, 0.2, 2.3, st.nova, "soft").position.set(0, 0.1, 0.3);
  // One pedestal. Its top is a lens ringed in lime light, and Nova floats over it.
  const PED = { w: 1.6, h: 0.95 };
  const block = box(PED.w, PED.h, PED.w, st.nova, "main");
  block.position.set(0, 0.2 + PED.h / 2, 0.3);
  const top = 0.2 + PED.h;
  const ring = new THREE.Mesh(keep(new THREE.TorusGeometry(0.52, 0.014, 12, 128)), keep(new THREE.MeshBasicMaterial({ color: COL.lime })));
  ring.rotation.x = Math.PI / 2; ring.position.set(0, top + 0.01, 0.3); st.nova.add(ring);
  const plate = canvasTex(256, 64, 2);
  plate.ctx.fillStyle = CSS.lime; plate.ctx.font = font(700, 28); plate.ctx.textAlign = "center"; plate.ctx.textBaseline = "middle";
  if ("letterSpacing" in plate.ctx) plate.ctx.letterSpacing = "8px";
  plate.ctx.fillText("NOVA", 128, 34); plate.tex.needsUpdate = true;
  const plateMesh = plane(0.56, 0.14, plate.tex, block, true);
  plateMesh.position.set(0, 0.08, PED.w / 2 + 0.002);

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
  box(1.4, 0.04, 1.05, st.app, "soft").position.set(3.6, 0.02, -2.25);
  const arm = box(0.9, 1.85, 0.04, st.app, "soft");
  arm.position.set(3.6, 0.95, -2.62); arm.rotation.x = 0.2;
  const monitor = new THREE.Group(); monitor.position.set(3.6, 2.66, -2.42); monitor.rotation.x = -0.04; st.app.add(monitor);
  box(4.3, 2.62, 0.1, monitor, "main");
  const appTex = canvasTex(1100, 660, 1.5);
  plane(4.12, 2.44, appTex.tex, monitor).position.z = 0.052;

  // What else the order or booking changed (stock, money, the day list, the
  // deal): two notes that rise beside the monitor when it lands.
  const chips = [0, 1].map((i) => {
    const t = canvasTex(560, 96, 2);
    const sp = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: t.tex, transparent: true, depthWrite: false })));
    sp.center.set(0, 0.5);
    sp.scale.set(3.5, 0.6, 1);
    sp.position.set(5.95, 3.45 - i * 0.78, -2.3);
    sp.userData = { t, base: sp.position.y, t0: null };
    sp.visible = false;
    st.app.add(sp);
    return sp;
  });
  function drawChip(sp, text) {
    const { ctx, tex } = sp.userData.t;
    ctx.clearRect(0, 0, 560, 96);
    ctx.font = font(600, 30);
    const w = Math.min(552, ctx.measureText(text).width + 88);
    ctx.fillStyle = "rgba(15,18,11,0.85)"; rr(ctx, 4, 10, w, 76, 38); ctx.fill();
    ctx.strokeStyle = CSS.line; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.fillStyle = CSS.lime; ctx.beginPath(); ctx.arc(44, 48, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CSS.text; ctx.textBaseline = "middle"; ctx.textAlign = "left"; ctx.fillText(text, 68, 50);
    tex.needsUpdate = true;
  }

  // ---------- station 04a: courier belt (shops) ----------
  st.outShop = new THREE.Group(); world.add(st.outShop);
  const BELT = { x: 5.3, z: 2.6, y: 0.66, len: 4.2 };
  for (const z of [BELT.z - 0.64, BELT.z + 0.64]) box(BELT.len + 0.4, 0.14, 0.06, st.outShop, "soft").position.set(BELT.x, BELT.y + 0.02, z);
  for (const x of [BELT.x - 2.0, BELT.x + 2.0]) for (const z of [BELT.z - 0.6, BELT.z + 0.6]) box(0.06, BELT.y - 0.05, 0.06, st.outShop, "soft").position.set(x, (BELT.y - 0.05) / 2, z);
  for (const x of [BELT.x - BELT.len / 2, BELT.x + BELT.len / 2]) {
    const r = cyl(0.1, 0.1, 1.18, st.outShop, 40, "main"); r.rotation.x = Math.PI / 2; r.position.set(x, BELT.y, BELT.z);
  }
  box(BELT.len, 0.08, 1.16, st.outShop, "main").position.set(BELT.x, BELT.y, BELT.z);
  // The belt's ribs: light lines that run while a parcel rides.
  const ribs = canvasTex(512, 64);
  ribs.ctx.strokeStyle = "rgba(233,239,220,0.22)"; ribs.ctx.lineWidth = 2;
  for (let x = 16; x < 512; x += 32) { ribs.ctx.beginPath(); ribs.ctx.moveTo(x, 6); ribs.ctx.lineTo(x, 58); ribs.ctx.stroke(); }
  ribs.tex.wrapS = THREE.RepeatWrapping; ribs.tex.repeat.set(2.4, 1); ribs.tex.needsUpdate = true;
  const beltTop = plane(BELT.len - 0.1, 1.1, ribs.tex, st.outShop, true);
  beltTop.rotation.x = -Math.PI / 2; beltTop.position.set(BELT.x, BELT.y + 0.042, BELT.z);
  cyl(0.03, 0.03, 2.1, st.outShop, 12, "soft").position.set(8.3, 1.05, 2.6);
  const signTex = canvasTex(256, 256, 2); glyphCourier(signTex.ctx); signTex.tex.needsUpdate = true;
  const signDisc = cyl(0.5, 0.5, 0.04, st.outShop, 64, null);
  signDisc.rotation.x = Math.PI / 2; signDisc.position.set(8.3, 2.25, 2.6);
  plane(1.0, 1.0, signTex.tex, st.outShop, true).position.set(8.3, 2.25, 2.625);
  const labelTex = canvasTex(256, 160, 2); drawShippingLabel(labelTex.ctx); labelTex.tex.needsUpdate = true;
  const parcels = [0, 1, 2].map(() => {
    const p = new THREE.Group();
    box(0.72, 0.5, 0.62, p, "main");
    const l = plane(0.34, 0.21, labelTex.tex, p, true); l.rotation.x = -Math.PI / 2; l.position.set(0.12, 0.252, 0.1);
    p.visible = false; st.outShop.add(p);
    return { g: p, t0: -1 };
  });

  // ---------- station 04b: desk calendar (services) ----------
  st.outSvc = new THREE.Group(); world.add(st.outSvc);
  box(3.0, 0.18, 1.8, st.outSvc, "soft").position.set(7.9, 0.09, -0.6);
  const cal = new THREE.Group(); cal.position.set(7.7, 1.16, -0.7); cal.rotation.x = -0.22; st.outSvc.add(cal);
  box(2.2, 1.72, 0.06, cal, "main");
  const calTex = canvasTex(640, 500, 2);
  plane(2.1, 1.62, calTex.tex, cal).position.z = 0.032;
  const bell = new THREE.Group(); bell.position.set(9.05, 0.18, -0.25); st.outSvc.add(bell);
  shape(new THREE.LatheGeometry([[0.02, 0.62], [0.12, 0.6], [0.16, 0.5], [0.2, 0.3], [0.3, 0.14], [0.33, 0.1], [0.33, 0.0]].map(([x, y]) => new THREE.Vector2(x, y)), 40), bell, null);
  outline(bell.children[0], "main", 12);
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
  // A cable is one lime line, with a small ring where it meets a station.
  function cable(path, parent) {
    const pts = path.getSpacedPoints(Math.ceil(path.getLength() * 12));
    const g = keep(new LineGeometry());
    g.setPositions(pts.flatMap(p => [p.x, p.y, p.z]));
    parent.add(new Line2(g, L.cable));
    for (const u of [0, 1]) {
      const end = new THREE.Mesh(keep(new THREE.RingGeometry(0.05, 0.075, 24)), keep(new THREE.MeshBasicMaterial({ color: COL.lime, transparent: true, opacity: 0.7 })));
      end.rotation.x = -Math.PI / 2; end.position.copy(path.getPointAt(u)).setY(Y + 0.002); parent.add(end);
    }
    return path;
  }
  const R = {
    chan: chanX.map((x) => cable(route([[x, 1.62], [x, 1.3], [-3.8, 1.3], [-3.8, 1.0]]), st.in)),
    toNova: cable(route([[-2.85, 0.2], [-1.35, 0.2]]), st.nova),
    toApp: cable(route([[1.35, 0.3], [2.2, 0.3], [2.2, -2.4], [2.9, -2.4]]), st.app),
    toShop: cable(route([[4.15, -1.72], [4.15, 1.9]]), st.outShop),
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
  const img = new Image();
  img.src = data.phone.shop.img;
  img.onload = () => { dirty = true; drawPhone(); };

  let kind = "shop";
  let phoneShown = 0;
  let appNew = false;
  let calLit = false;

  function drawPhone() {
    const { ctx, cv, tex } = phoneTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const p = data.phone[kind];
    ctx.fillStyle = CSS.bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 112); ctx.lineTo(W, 112); ctx.stroke();
    ctx.strokeStyle = CSS.lime; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(58, 60, 24, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = CSS.lime; ctx.font = font(700, 26); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(p.name.slice(0, 1), 58, 61);
    ctx.textAlign = "left"; ctx.fillStyle = CSS.text; ctx.font = font(700, 28); ctx.fillText(p.name, 98, 50);
    ctx.fillStyle = CSS.dim; ctx.font = font(500, 21); ctx.fillText(p.channel, 98, 80);

    // Lay the shown messages out bottom up, newest at the bottom.
    const msgs = p.msgs.slice(0, phoneShown);
    const blocks = msgs.map(m => {
      ctx.font = font(500, 25);
      const lines = wrap(ctx, m.t, 300);
      const bw = Math.max(...lines.map(l => ctx.measureText(l).width)) + 36;
      const imgH = m.img && img.complete && img.naturalWidth ? 210 : 0;
      const cardH = m.card ? 92 : 0;
      return { m, lines, bw, h: lines.length * 33 + 26 + imgH + (imgH ? 10 : 0) + (cardH ? cardH + 10 : 0), imgH, cardH };
    });
    let y = H - 36 - (phoneTyping ? 66 : 0);
    const placed = [];
    for (let i = blocks.length - 1; i >= 0; i--) { y -= blocks[i].h; placed.unshift({ ...blocks[i], y }); y -= 16; }
    ctx.save(); ctx.beginPath(); ctx.rect(0, 114, W, H - 114); ctx.clip();
    for (const b of placed) {
      const mine = b.m.from === "nova";
      let yy = b.y;
      if (b.imgH) {
        const iw = 168, ih = b.imgH;
        ctx.save(); rr(ctx, 26, yy, iw, ih, 18); ctx.clip();
        ctx.filter = "grayscale(1) brightness(0.85)"; ctx.drawImage(img, 26, yy, iw, ih); ctx.filter = "none";
        ctx.restore();
        ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; rr(ctx, 26, yy, iw, ih, 18); ctx.stroke();
        yy += ih + 10;
      }
      const bh = b.lines.length * 33 + 26;
      const x = mine ? W - 26 - b.bw : 26;
      ctx.fillStyle = mine ? CSS.limeSoft : "rgba(233,239,220,0.04)"; rr(ctx, x, yy, b.bw, bh, 22); ctx.fill();
      ctx.strokeStyle = mine ? CSS.lime : CSS.line; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = mine ? CSS.lime : CSS.text; ctx.font = font(500, 25); ctx.textBaseline = "top";
      b.lines.forEach((l, i) => ctx.fillText(l, x + 18, yy + 14 + i * 33));
      yy += bh + 10;
      if (b.cardH) {
        const cw = 360, cx = W - 26 - cw;
        ctx.strokeStyle = CSS.lime; ctx.lineWidth = 2.5; rr(ctx, cx, yy, cw, b.cardH, 18); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + 34, yy + b.cardH / 2, 15, 0, Math.PI * 2); ctx.stroke();
        ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(cx + 27, yy + b.cardH / 2); ctx.lineTo(cx + 32, yy + b.cardH / 2 + 6); ctx.lineTo(cx + 42, yy + b.cardH / 2 - 6); ctx.stroke();
        ctx.fillStyle = CSS.text; ctx.font = font(700, 23); ctx.fillText(fit(ctx, b.m.card.t, cw - 80), cx + 62, yy + 20);
        ctx.fillStyle = CSS.dim; ctx.font = font(500, 19); ctx.fillText(fit(ctx, b.m.card.d, cw - 80), cx + 62, yy + 52);
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
    ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(210, 0); ctx.lineTo(210, H); ctx.stroke();
    ctx.fillStyle = CSS.lime; ctx.font = font(800, 34); ctx.textBaseline = "middle"; ctx.textAlign = "left";
    ctx.fillText("dakio", 30, 50);
    a.menu.forEach((m, i) => {
      const on = i === 0;
      if (on) { ctx.strokeStyle = CSS.line; ctx.lineWidth = 2; rr(ctx, 16, 104 + i * 52, 178, 42, 12); ctx.stroke(); }
      ctx.fillStyle = on ? CSS.text : CSS.dim; ctx.font = font(on ? 700 : 500, 21);
      ctx.fillText(m, 34, 125 + i * 52);
    });
    ctx.fillStyle = CSS.text; ctx.font = font(800, 44); ctx.fillText(a.title, 250, 64);
    ctx.fillStyle = CSS.dim; ctx.font = font(500, 20); ctx.fillText(a.sub, 250, 104);
    // The table.
    const cols = a.cols;
    const top = 140;
    ctx.fillStyle = CSS.dim; ctx.font = font(700, 16);
    cols.forEach(c => ctx.fillText(c.h.toUpperCase(), 250 + c.x, top + 10));
    const rows = appNew ? [a.fresh, ...a.rows] : a.rows;
    rows.slice(0, 6).forEach((r, i) => {
      const y = top + 34 + i * 76;
      const fresh = appNew && i === 0;
      if (fresh) { ctx.fillStyle = CSS.limeSoft; rr(ctx, 236, y, W - 266, 64, 14); ctx.fill(); ctx.strokeStyle = CSS.lime; ctx.lineWidth = 2.5; ctx.stroke(); }
      else { ctx.strokeStyle = CSS.soft; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(236, y + 66); ctx.lineTo(W - 30, y + 66); ctx.stroke(); }
      cols.forEach((c, j) => {
        ctx.fillStyle = fresh ? CSS.lime : CSS.text;
        ctx.font = font(j === 0 || fresh ? 700 : 500, 21);
        ctx.fillText(fit(ctx, r[j], (cols[j + 1]?.x ?? W - 300) - c.x - 16), 250 + c.x, y + 32);
      });
      if (fresh) {
        ctx.font = font(800, 15);
        const label = a.byNova;
        const tw = ctx.measureText(label).width + 26;
        ctx.strokeStyle = CSS.lime; ctx.lineWidth = 2; rr(ctx, W - 50 - tw, y + 18, tw, 28, 14); ctx.stroke();
        ctx.fillStyle = CSS.lime; ctx.fillText(label, W - 50 - tw + 13, y + 33);
      }
    });
    tex.needsUpdate = true;
  }

  function drawCal() {
    const { ctx, cv, tex } = calTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const c = data.cal;
    ctx.fillStyle = CSS.bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 96); ctx.lineTo(W, 96); ctx.stroke();
    ctx.fillStyle = CSS.lime; ctx.font = font(800, 40); ctx.textBaseline = "middle"; ctx.textAlign = "left";
    ctx.fillText(c.day, 34, 50);
    ctx.fillStyle = CSS.dim; ctx.font = font(500, 24); ctx.textAlign = "right"; ctx.fillText(c.store, W - 34, 52);
    ctx.textAlign = "left";
    c.slots.forEach((s, i) => {
      const y = 120 + i * 92;
      const lit = s.fresh && calLit;
      if (s.fresh && !calLit) {
        ctx.setLineDash([10, 8]); ctx.strokeStyle = CSS.soft; ctx.lineWidth = 2.5; rr(ctx, 30, y, W - 60, 76, 16); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = CSS.dim; ctx.font = font(600, 26); ctx.fillText(s.time, 54, y + 38);
        return;
      }
      if (lit) { ctx.fillStyle = CSS.limeSoft; rr(ctx, 30, y, W - 60, 76, 16); ctx.fill(); }
      ctx.strokeStyle = lit ? CSS.lime : CSS.soft; ctx.lineWidth = lit ? 3 : 2; rr(ctx, 30, y, W - 60, 76, 16); ctx.stroke();
      ctx.fillStyle = lit ? CSS.lime : CSS.text; ctx.font = font(800, 26); ctx.fillText(s.time, 54, y + 38);
      ctx.font = font(lit ? 700 : 500, 26); ctx.fillText(fit(ctx, s.what, W - 300), 210, y + 38);
    });
    tex.needsUpdate = true;
  }

  // The shipping label on each parcel.
  function drawShippingLabel(ctx) {
    ctx.strokeStyle = CSS.line; ctx.lineWidth = 3; rr(ctx, 4, 4, 248, 152, 14); ctx.stroke();
    ctx.fillStyle = CSS.text; ctx.font = font(800, 30); ctx.textBaseline = "top"; ctx.fillText("Saril", 20, 18);
    ctx.font = font(600, 20); ctx.fillStyle = CSS.dim; ctx.fillText("#6BB-VHQ6 · Mirpur 10", 20, 58);
    ctx.fillStyle = CSS.dim; for (let i = 0; i < 26; i++) ctx.fillRect(20 + i * 8, 100, i % 3 ? 2 : 4, 40);
  }

  // Channel glyphs: line drawings, no logos, no brand colours.
  function bubble(ctx) {
    ctx.beginPath(); ctx.ellipse(128, 118, 82, 70, 0, 0.62 * Math.PI, 2.5 * Math.PI); ctx.lineTo(70, 214); ctx.closePath(); ctx.stroke();
  }
  function glyphMessenger(ctx) {
    pen(ctx); bubble(ctx);
    ctx.beginPath(); ctx.moveTo(86, 136); ctx.lineTo(116, 104); ctx.lineTo(140, 128); ctx.lineTo(170, 96); ctx.stroke();
  }
  function glyphInstagram(ctx) {
    pen(ctx); rr(ctx, 50, 50, 156, 156, 44); ctx.stroke();
    ctx.beginPath(); ctx.arc(128, 128, 36, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(172, 84, 6, 0, Math.PI * 2); ctx.fill();
  }
  function glyphWhatsApp(ctx) {
    pen(ctx); ctx.beginPath(); ctx.arc(128, 124, 80, 0.7 * Math.PI, 2.62 * Math.PI); ctx.lineTo(56, 210); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(100, 96); ctx.quadraticCurveTo(96, 150, 156, 156); ctx.stroke();
  }
  function glyphWeb(ctx) {
    pen(ctx); ctx.beginPath(); ctx.arc(128, 128, 80, 0, Math.PI * 2); ctx.stroke();
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
  function drawSms(ctx) {
    ctx.fillStyle = "rgba(15,18,11,0.85)"; rr(ctx, 8, 8, 240, 92, 30); ctx.fill();
    ctx.strokeStyle = CSS.lime; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = CSS.lime; ctx.font = font(800, 42); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("SMS", 128, 56);
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
    chips.forEach((c, i) => { drawChip(c, data.chips?.[kind]?.[i] ?? ""); c.visible = false; c.userData.t0 = null; });
    lastPhase = null;
  }
  // The finished frame, for reduced motion: the whole story at once.
  function poseStill() {
    phoneShown = data.phone[kind].msgs.length; appNew = true; calLit = true;
    drawPhone(); drawApp(); drawCal();
    if (kind === "shop" || aud === "both") { const p = parcels[0]; p.g.visible = true; p.g.position.set(5.6, BELT.y + 0.32, BELT.z); }
    pulse.visible = false;
    lightStation(null);
    chips.forEach((c) => { c.visible = !!data.chips; c.material.opacity = 1; c.position.y = c.userData.base + 0.2; });
    onPhase?.(null, kind);
  }

  // ---------- the cycle ----------
  let tCycle = 0;
  let lastPhase = null;
  let curKey = "in";
  const tmp = new THREE.Vector3();
  const ease = x => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const chanIndex = () => (data.phone[kind].channel === "Instagram" ? 1 : 0);

  function placePulse(path, a, b, t) {
    if (t < a || t > b) return false;
    path.getPointAt(ease((t - a) / (b - a)), tmp);
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
      placePulse(R.chan[ci], 0.15, T.phoneFrom, t) ||
      placePulse(R.toNova, T.novaIn[0], T.novaIn[1], t) ||
      placePulse(R.toApp, T.toApp[0], T.toApp[1], t) ||
      placePulse(kind === "shop" ? R.toShop : R.toSvc, T.toOut[0], T.toOut[1], t);

    // The channel the chat came from hops.
    chanTiles.forEach((s, i) => {
      const k = i === ci && t < 1.0 ? Math.sin(Math.min(1, t / 0.6) * Math.PI) : 0;
      s.position.y = s.userData.base + k * 0.3;
      s.rotation.y = k * 0.5;
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

    if (crossed(T.toApp[1])) { appNew = true; drawApp(); if (data.chips) chips.forEach((c, i) => { c.userData.t0 = t + 0.25 + i * 0.55; }); }
    for (const c of chips) {
      if (c.userData.t0 == null) continue;
      const u = t - c.userData.t0;
      c.visible = u > 0;
      c.material.opacity = Math.min(1, Math.max(0, u) / 0.4) * Math.min(1, Math.max(0, T.cycle - 0.3 - t) / 0.7);
      c.position.y = c.userData.base + Math.min(Math.max(u, 0), 2.5) * 0.08;
    }
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
      p.g.position.set(Math.min(x, 7.9), BELT.y + 0.32 - drop * drop * 1.6, BELT.z);
      if (p.g.position.y < -0.4) { p.g.visible = false; p.t0 = -1; }
    }
    if (parcels.some(p => p.t0 >= 0)) ribs.tex.offset.x -= dt * 1.15 / (BELT.len / ribs.tex.repeat.x);
    // The bell rings and the SMS rises.
    if (sms.visible) {
      const u = t - sms.userData.t0;
      bell.rotation.z = Math.sin(u * 22) * 0.25 * Math.max(0, 1 - u / 1.4);
      sms.position.y = 1.0 + Math.min(u, 2) * 0.35;
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
