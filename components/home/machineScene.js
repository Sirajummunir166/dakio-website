// Nova's machine, the three.js side (loaded on demand by NovaMachine.jsx).
//
// One small world on a paper floor: the channels, the phone (inbox), Nova on
// her ink block, the Dakio app on a monitor, and the two ends of the line
// (a courier belt for shops, a desk calendar for services). A green cable
// joins them and a lime pulse carries each chat along it. Every cycle plays
// one real conversation from the home copy, end to end.
//
// Labels are HTML (NovaMachine.jsx); this file only moves them. No faces on
// Nova, ever: she is the lime ball and her highlight is her gaze.

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const COL = {
  bg: 0xF4F2EA, floor: 0xEBE8DC, grid: 0xE0DCCE, block: 0xFBFAF5, stand: 0xD9D6CA,
  ink: 0x1A1D12, ink2: 0x2A3020, lime: 0xC6F035, green: 0x3E7A45, kraft: 0xD6B88C, tape: 0xBE9A66,
};
const CSS = { ink: "#1A1D12", ink0: "#0F120B", paper: "#F4F2EA", card: "#FBFAF5", lime: "#C6F035", green: "#3E7A45", muted: "#6B6D60", line: "#E4E1D4", bubble: "#ECEAE0" };

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
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const pr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(COL.bg, 1);
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const scene = new THREE.Scene();
  const world = new THREE.Group();
  scene.add(world);

  // A soft studio around the scene: the reflections on glass, metal and the
  // glossy blocks come from here.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.85;
  pmrem.dispose();

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

  scene.add(new THREE.HemisphereLight(0xffffff, 0xE6E2D6, 0.55));
  const sun = new THREE.DirectionalLight(0xffffff, 2.0);
  sun.position.set(-5, 15, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -13; sun.shadow.camera.right = 13;
  sun.shadow.camera.top = 11; sun.shadow.camera.bottom = -11;
  sun.shadow.radius = 6;
  sun.shadow.intensity = 0.55;
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);

  // Ambient occlusion on capable screens: the soft contact shadows where
  // things meet the floor. Phones render straight, without it.
  let composer = null, gtao = null;
  if (!coarse) {
    try {
      const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: 4 });
      composer = new EffectComposer(renderer, rt);
      composer.setPixelRatio(pr);
      composer.addPass(new RenderPass(scene, camera));
      gtao = new GTAOPass(scene, camera, 4, 4);
      gtao.updateGtaoMaterial({ radius: 0.55, distanceExponent: 1.4, thickness: 1.2, scale: 1, samples: 16 });
      gtao.blendIntensity = 0.85;
      // Glows and see-through parts would cast AO halos: hide them from it.
      const hide = gtao._overrideVisibility.bind(gtao);
      gtao._overrideVisibility = () => {
        hide();
        scene.traverse(o => { if (o.visible && (o.isSprite || o.userData.noAO)) { o.visible = false; gtao._visibilityCache.push(o); } });
      };
      composer.addPass(gtao);
      composer.addPass(new OutputPass());
    } catch { composer = null; }
  }

  const disposables = [];
  const keep = x => { disposables.push(x); return x; };
  const phys = (color, extra = {}) => keep(new THREE.MeshPhysicalMaterial({ color, roughness: 0.5, metalness: 0, ...extra }));
  const M = {
    porcelain: phys(0xF7F6F1, { roughness: 0.55, clearcoat: 0.35, clearcoatRoughness: 0.35 }),
    white: phys(0xFFFFFF, { roughness: 0.42, clearcoat: 0.5, clearcoatRoughness: 0.25 }),
    alu: phys(0xCFD1CB, { metalness: 1, roughness: 0.3 }),
    aluDark: phys(0x8E918A, { metalness: 1, roughness: 0.38 }),
    ink: phys(0x14170E, { roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12 }),
    glass: phys(0x0B0D08, { roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04 }),
    rubber: phys(0x22261A, { roughness: 0.75 }),
    cable: phys(COL.green, { roughness: 0.32, clearcoat: 0.9, clearcoatRoughness: 0.2 }),
    kraft: phys(COL.kraft, { roughness: 0.88 }),
    tape: phys(COL.tape, { roughness: 0.4, clearcoat: 0.6 }),
    lime: phys(COL.lime, { emissive: COL.lime, emissiveIntensity: 0.9, roughness: 0.3 }),
    green: phys(COL.green, { roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 }),
  };

  function box(w, h, d, r, material, parent = world) {
    const g = keep(new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2)));
    const m = new THREE.Mesh(g, material);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function cyl(rt, rb, h, material, parent = world, seg = 32) {
    const m = new THREE.Mesh(keep(new THREE.CylinderGeometry(rt, rb, h, seg)), material);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m);
    return m;
  }

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
  function screen(w, h, tex, parent, z) {
    const m = new THREE.Mesh(keep(new THREE.PlaneGeometry(w, h)), keep(new THREE.MeshBasicMaterial({ map: tex })));
    m.position.z = z;
    parent.add(m);
    return m;
  }
  function decal(w, h, tex, parent) {
    const m = new THREE.Mesh(keep(new THREE.PlaneGeometry(w, h)), keep(new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.6 })));
    parent.add(m);
    return m;
  }

  // Floor: the page colour, a fine grid that fades out, and soft shadows.
  const shadowFloor = new THREE.Mesh(keep(new THREE.PlaneGeometry(80, 80)), keep(new THREE.ShadowMaterial({ opacity: 0.16 })));
  shadowFloor.rotation.x = -Math.PI / 2; shadowFloor.receiveShadow = true; world.add(shadowFloor);
  {
    const g = canvasTex(1024, 1024);
    const ctx = g.ctx;
    ctx.strokeStyle = "rgba(120,116,96,0.22)"; ctx.lineWidth = 1.2;
    for (let i = 0; i <= 1024; i += 1024 / 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 1024); ctx.moveTo(0, i); ctx.lineTo(1024, i); ctx.stroke(); }
    ctx.globalCompositeOperation = "destination-in";
    const fade = ctx.createRadialGradient(512, 512, 120, 512, 512, 512);
    fade.addColorStop(0, "rgba(0,0,0,1)"); fade.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = fade; ctx.fillRect(0, 0, 1024, 1024);
    g.tex.needsUpdate = true;
    const grid = new THREE.Mesh(keep(new THREE.PlaneGeometry(40, 40)), keep(new THREE.MeshBasicMaterial({ map: g.tex, transparent: true, depthWrite: false })));
    grid.rotation.x = -Math.PI / 2; grid.position.set(0.5, 0.003, 0.4); grid.userData.noAO = true; world.add(grid);
  }

  // ---------- station 01: channels + phone ----------
  const st = {};
  st.in = new THREE.Group(); world.add(st.in);
  box(5.0, 0.22, 1.5, 0.1, M.porcelain, st.in).position.set(-6.35, 0.11, 2.3);
  const CHANNELS = [
    { n: "Messenger", draw: drawMessenger, side: 0x5B5CFF },
    { n: "Instagram", draw: drawInstagram, side: 0xD3306E },
    { n: "WhatsApp", draw: drawWhatsApp, side: 0x25D366 },
    { n: "Website", draw: drawWeb, side: 0x0F120B },
  ];
  const chanX = [-8.0, -6.9, -5.8, -4.7];
  const chanTiles = CHANNELS.map((ch, i) => {
    // A small aluminium post, and on it the channel as a glossy 3D icon.
    cyl(0.07, 0.07, 0.34, M.alu, st.in).position.set(chanX[i], 0.39, 2.15);
    cyl(0.2, 0.22, 0.05, M.alu, st.in).position.set(chanX[i], 0.245, 2.15);
    const tile = new THREE.Group();
    tile.position.set(chanX[i], 0.98, 2.15);
    tile.rotation.x = -0.12;
    tile.userData.base = tile.position.y;
    st.in.add(tile);
    box(0.84, 0.84, 0.2, 0.22, phys(ch.side, { roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.08 }), tile);
    const face = canvasTex(256, 256, 2);
    face.ctx.save(); face.ctx.scale(256 / 176, 256 / 176); face.ctx.translate(-40, -24); ch.draw(face.ctx); face.ctx.restore();
    face.tex.needsUpdate = true;
    const f = new THREE.Mesh(keep(roundedPlane(0.8, 0.8, 0.2)), keep(new THREE.MeshPhysicalMaterial({ map: face.tex, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.06 })));
    f.position.z = 0.101; tile.add(f);
    // The channel's name, printed on the plinth.
    const name = canvasTex(256, 56, 2);
    name.ctx.fillStyle = "#55584B"; name.ctx.font = font(700, 30); name.ctx.textAlign = "center"; name.ctx.textBaseline = "middle";
    name.ctx.fillText(ch.n, 128, 30); name.tex.needsUpdate = true;
    const n = decal(0.96, 0.21, name.tex, st.in);
    n.rotation.x = -Math.PI / 2; n.position.set(chanX[i], 0.224, 2.72);
    return tile;
  });

  box(1.9, 0.24, 1.6, 0.1, M.porcelain, st.in).position.set(-3.8, 0.12, 0.2);
  // Phone on an aluminium stand.
  const phoneStand = box(0.9, 1.3, 0.05, 0.03, M.alu, st.in);
  phoneStand.position.set(-3.8, 0.86, -0.12); phoneStand.rotation.x = 0.32;
  box(1.0, 0.05, 0.7, 0.03, M.alu, st.in).position.set(-3.8, 0.265, 0.12);
  const phone = new THREE.Group();
  phone.position.set(-3.8, 1.42, 0.3);
  phone.rotation.x = -0.16;
  st.in.add(phone);
  box(1.18, 2.32, 0.1, 0.17, M.alu, phone);
  box(1.14, 2.28, 0.02, 0.15, M.glass, phone).position.z = 0.046;
  const phoneTex = canvasTex(512, 1000, 2);
  screen(1.04, 2.14, phoneTex.tex, phone, 0.058);

  // ---------- station 02: Nova ----------
  st.nova = new THREE.Group(); world.add(st.nova);
  box(2.7, 0.24, 2.3, 0.1, M.porcelain, st.nova).position.set(0, 0.12, 0.3);
  // One glossy pedestal. Its top is a dark lens ringed in lime light, and
  // Nova floats over it.
  const PED = { w: 1.6, h: 0.95 };
  const block = box(PED.w, PED.h, PED.w, 0.12, M.ink, st.nova);
  block.position.set(0, 0.24 + PED.h / 2, 0.3);
  const top = 0.24 + PED.h;
  const lens = cyl(0.5, 0.5, 0.012, M.glass, st.nova, 96);
  lens.position.set(0, top + 0.006, 0.3);
  const ring = new THREE.Mesh(keep(new THREE.TorusGeometry(0.52, 0.016, 16, 128)), M.lime);
  ring.rotation.x = Math.PI / 2; ring.position.set(0, top + 0.01, 0.3); st.nova.add(ring);
  const plate = canvasTex(256, 64, 2);
  plate.ctx.fillStyle = CSS.lime; plate.ctx.font = font(700, 30); plate.ctx.textAlign = "center"; plate.ctx.textBaseline = "middle";
  if ("letterSpacing" in plate.ctx) plate.ctx.letterSpacing = "6px";
  plate.ctx.fillText("NOVA", 128, 34); plate.tex.needsUpdate = true;
  const plateMesh = screen(0.56, 0.14, plate.tex, block, PED.w / 2 + 0.002);
  plateMesh.material.transparent = true;
  plateMesh.position.y = 0.08;

  const novaHome = new THREE.Vector3(0, top + 1.05, 0.3);
  const nova = new THREE.Group(); nova.position.copy(novaHome); st.nova.add(nova);
  const ballMat = keep(new THREE.MeshPhysicalMaterial({ color: 0xC6F035, emissive: 0x8DC21F, emissiveIntensity: 0.55, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06 }));
  const ball = new THREE.Mesh(keep(new THREE.SphereGeometry(0.55, 64, 48)), ballMat);
  ball.castShadow = true; nova.add(ball);
  const novaLight = new THREE.PointLight(0xC6F035, 2.2, 4.5, 2);
  nova.add(novaLight);
  const glowTex = radialTex([[0, "rgba(214,250,90,0.5)"], [0.35, "rgba(198,240,53,0.18)"], [1, "rgba(198,240,53,0)"]]);
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
  box(1.4, 0.05, 1.05, 0.03, M.alu, st.app).position.set(3.6, 0.025, -2.25);
  const arm = box(0.95, 1.85, 0.05, 0.03, M.alu, st.app);
  arm.position.set(3.6, 0.95, -2.62); arm.rotation.x = 0.2;
  const monitor = new THREE.Group(); monitor.position.set(3.6, 2.66, -2.42); monitor.rotation.x = -0.04; st.app.add(monitor);
  box(4.3, 2.62, 0.12, 0.09, M.alu, monitor);
  box(4.26, 2.58, 0.02, 0.07, M.glass, monitor).position.z = 0.062;
  const appTex = canvasTex(1100, 660, 2);
  screen(4.08, 2.4, appTex.tex, monitor, 0.074);

  // ---------- station 04a: courier belt (shops) ----------
  st.outShop = new THREE.Group(); world.add(st.outShop);
  const BELT = { x: 5.3, z: 2.6, y: 0.66, len: 4.2 };
  for (const z of [BELT.z - 0.66, BELT.z + 0.66]) box(BELT.len + 0.5, 0.2, 0.08, 0.03, M.alu, st.outShop).position.set(BELT.x, BELT.y, z);
  for (const x of [BELT.x - 2.0, BELT.x + 2.0]) for (const z of [BELT.z - 0.6, BELT.z + 0.6]) {
    box(0.1, BELT.y - 0.05, 0.1, 0.02, M.aluDark, st.outShop).position.set(x, (BELT.y - 0.05) / 2, z);
    cyl(0.1, 0.1, 0.03, M.rubber, st.outShop, 20).position.set(x, 0.015, z);
  }
  for (const x of [BELT.x - BELT.len / 2, BELT.x + BELT.len / 2]) {
    const r = cyl(0.11, 0.11, 1.22, M.alu, st.outShop, 32); r.rotation.x = Math.PI / 2; r.position.set(x, BELT.y, BELT.z);
  }
  box(BELT.len, 0.1, 1.2, 0.04, M.rubber, st.outShop).position.set(BELT.x, BELT.y, BELT.z);
  const ribs = canvasTex(512, 64);
  ribs.ctx.fillStyle = "#22261A"; ribs.ctx.fillRect(0, 0, 512, 64);
  ribs.ctx.fillStyle = "#30362A"; for (let x = 0; x < 512; x += 32) ribs.ctx.fillRect(x, 0, 6, 64);
  ribs.tex.wrapS = THREE.RepeatWrapping; ribs.tex.repeat.set(2.4, 1); ribs.tex.needsUpdate = true;
  const beltTop = new THREE.Mesh(keep(new THREE.PlaneGeometry(BELT.len - 0.05, 1.12)), keep(new THREE.MeshStandardMaterial({ map: ribs.tex, roughness: 0.7 })));
  beltTop.rotation.x = -Math.PI / 2; beltTop.position.set(BELT.x, BELT.y + 0.052, BELT.z); beltTop.receiveShadow = true; st.outShop.add(beltTop);
  cyl(0.045, 0.045, 2.1, M.alu, st.outShop, 16).position.set(8.3, 1.05, 2.6);
  cyl(0.2, 0.22, 0.05, M.alu, st.outShop).position.set(8.3, 0.025, 2.6);
  const signTex = canvasTex(256, 256, 2); drawCourier(signTex.ctx); signTex.tex.needsUpdate = true;
  const signBack = cyl(0.52, 0.52, 0.07, M.ink, st.outShop, 64);
  signBack.rotation.x = Math.PI / 2; signBack.position.set(8.3, 2.25, 2.62);
  const sign = new THREE.Mesh(keep(new THREE.CircleGeometry(0.47, 64)), keep(new THREE.MeshPhysicalMaterial({ map: signTex.tex, roughness: 0.2, clearcoat: 1 })));
  sign.position.set(8.3, 2.25, 2.66); st.outShop.add(sign);
  const labelTex = canvasTex(256, 160, 2); drawShippingLabel(labelTex.ctx); labelTex.tex.needsUpdate = true;
  const parcels = [0, 1, 2].map(() => {
    const p = new THREE.Group();
    box(0.72, 0.52, 0.62, 0.04, M.kraft, p);
    box(0.74, 0.012, 0.16, 0.005, M.tape, p).position.y = 0.262;
    const l = decal(0.34, 0.21, labelTex.tex, p); l.rotation.x = -Math.PI / 2; l.position.set(0.12, 0.27, 0.12);
    p.visible = false; st.outShop.add(p);
    return { g: p, t0: -1 };
  });

  // ---------- station 04b: desk calendar (services) ----------
  st.outSvc = new THREE.Group(); world.add(st.outSvc);
  box(3.0, 0.22, 1.8, 0.1, M.porcelain, st.outSvc).position.set(7.9, 0.11, -0.6);
  const cal = new THREE.Group(); cal.position.set(7.7, 1.18, -0.7); cal.rotation.x = -0.22; st.outSvc.add(cal);
  box(2.2, 1.72, 0.08, 0.05, M.white, cal);
  box(2.24, 1.76, 0.04, 0.05, M.alu, cal).position.z = -0.05;
  for (const x of [-0.6, 0.6]) {
    const t = new THREE.Mesh(keep(new THREE.TorusGeometry(0.09, 0.022, 12, 32)), M.alu);
    t.position.set(x, 0.86, 0); t.castShadow = true; cal.add(t);
  }
  const calTex = canvasTex(640, 500, 2);
  screen(2.08, 1.6, calTex.tex, cal, 0.042);
  const bell = new THREE.Group(); bell.position.set(9.05, 0.22, -0.25); st.outSvc.add(bell);
  const bellBody = new THREE.Mesh(keep(new THREE.LatheGeometry([[0.02, 0.62], [0.12, 0.6], [0.16, 0.5], [0.2, 0.3], [0.3, 0.14], [0.33, 0.1]].map(([x, y]) => new THREE.Vector2(x, y)), 48)), M.green);
  bellBody.castShadow = true; bell.add(bellBody);
  const bellTop = new THREE.Mesh(keep(new THREE.SphereGeometry(0.07, 20, 14)), M.alu); bellTop.position.y = 0.66; bell.add(bellTop);
  cyl(0.4, 0.42, 0.1, M.alu, bell, 48).position.y = 0.05;
  const smsTex = canvasTex(256, 128, 2); drawSms(smsTex.ctx); smsTex.tex.needsUpdate = true;
  const sms = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: smsTex.tex, transparent: true, depthWrite: false })));
  sms.scale.set(0.9, 0.45, 1); sms.visible = false; bell.add(sms);

  // ---------- cables ----------
  const Y = 0.08;
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
  const Yaxis = new THREE.Vector3(0, 1, 0);
  // A plug at each end of a cable: ink with a lime band.
  function plug(path, u, parent) {
    const p = path.getPointAt(u), dir = path.getTangentAt(u);
    if (u === 0) dir.negate();
    const g = new THREE.Group();
    g.position.copy(p).addScaledVector(dir, -0.1);
    g.quaternion.setFromUnitVectors(Yaxis, dir);
    cyl(0.11, 0.11, 0.26, M.ink, g, 24);
    cyl(0.115, 0.115, 0.04, M.lime, g, 24).position.y = -0.06;
    parent.add(g);
  }
  function cable(path, parent, ends = [true, true]) {
    const len = path.getLength();
    const m = new THREE.Mesh(keep(new THREE.TubeGeometry(path, Math.ceil(len * 16), 0.065, 12, false)), M.cable);
    m.castShadow = true; m.receiveShadow = true; parent.add(m);
    if (ends[0]) plug(path, 0, parent);
    if (ends[1]) plug(path, 1, parent);
    return path;
  }
  const R = {
    chan: chanX.map((x, i) => cable(route([[x, 1.62], [x, 1.3], [-3.8, 1.3], [-3.8, 1.0]]), st.in, [true, i === 3])),
    toNova: cable(route([[-2.85, 0.2], [-1.35, 0.2]]), st.nova),
    toApp: cable(route([[1.35, 0.3], [2.2, 0.3], [2.2, -2.4], [2.9, -2.4]]), st.app),
    toShop: cable(route([[4.15, -1.72], [4.15, 1.9]]), st.outShop),
    toSvc: cable(route([[4.3, -2.4], [6.0, -2.4], [6.0, -0.6], [6.4, -0.6]]), st.outSvc),
  };

  // The pulse that carries the chat.
  const pulse = new THREE.Group();
  pulse.add(new THREE.Mesh(keep(new THREE.SphereGeometry(0.12, 24, 16)), keep(new THREE.MeshBasicMaterial({ color: 0xE4FF8A }))));
  const pglow = new THREE.Sprite(keep(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true })));
  pglow.scale.set(1.2, 1.2, 1); pulse.add(pglow);
  const pulseLight = new THREE.PointLight(0xC6F035, 1.6, 2.2, 2); pulse.add(pulseLight);
  pulse.visible = false; world.add(pulse);

  // Invisible hit boxes, so a click on a station focuses it.
  const hitMat = keep(new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
  const hits = [];
  const hit = (key, w, h, d, x, y, z) => {
    const m = new THREE.Mesh(keep(new THREE.BoxGeometry(w, h, d)), hitMat);
    // Layer 1: the raycaster sees them, the camera and the AO pass do not.
    m.layers.set(1);
    m.position.set(x, y, z); m.userData.key = key; world.add(m); hits.push(m);
  };
  hit("in", 6.2, 3.2, 4.2, -5.8, 1.4, 1.1);
  hit("nova", 2.8, 3.0, 2.4, 0, 1.5, 0.3);
  hit("app", 4.5, 4.4, 1.4, 3.6, 2.2, -2.4);
  hit("outShop", 5.6, 2.4, 1.6, 5.6, 1.1, 2.6);
  hit("outSvc", 3.4, 2.4, 2.0, 8.0, 1.1, -0.6);

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
    ctx.fillStyle = CSS.card; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = CSS.ink0; ctx.fillRect(0, 0, W, 112);
    ctx.fillStyle = CSS.lime; ctx.beginPath(); ctx.arc(58, 64, 26, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CSS.ink0; ctx.font = font(800, 28); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(p.name.slice(0, 1), 58, 65);
    ctx.textAlign = "left"; ctx.fillStyle = "#FBFBF4"; ctx.font = font(800, 30); ctx.fillText(p.name, 98, 56);
    ctx.fillStyle = "#A9AD98"; ctx.font = font(500, 22); ctx.fillText(p.channel, 98, 86);

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
        ctx.save(); rr(ctx, 26, yy, iw, ih, 18); ctx.clip(); ctx.drawImage(img, 26, yy, iw, ih); ctx.restore();
        yy += ih + 10;
      }
      const bh = b.lines.length * 33 + 26;
      const x = mine ? W - 26 - b.bw : 26;
      ctx.fillStyle = mine ? CSS.lime : CSS.bubble; rr(ctx, x, yy, b.bw, bh, 22); ctx.fill();
      ctx.fillStyle = CSS.ink0; ctx.font = font(500, 25); ctx.textBaseline = "top";
      b.lines.forEach((l, i) => ctx.fillText(l, x + 18, yy + 14 + i * 33));
      yy += bh + 10;
      if (b.cardH) {
        const cw = 360, cx = W - 26 - cw;
        ctx.fillStyle = "#FFFFFF"; rr(ctx, cx, yy, cw, b.cardH, 18); ctx.fill();
        ctx.strokeStyle = "#D7E8A0"; ctx.lineWidth = 3; ctx.stroke();
        ctx.fillStyle = CSS.green; ctx.beginPath(); ctx.arc(cx + 34, yy + b.cardH / 2, 16, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 26, yy + b.cardH / 2); ctx.lineTo(cx + 32, yy + b.cardH / 2 + 7); ctx.lineTo(cx + 43, yy + b.cardH / 2 - 7); ctx.stroke();
        ctx.fillStyle = CSS.ink0; ctx.font = font(800, 23); ctx.fillText(fit(ctx, b.m.card.t, cw - 80), cx + 62, yy + 20);
        ctx.fillStyle = CSS.muted; ctx.font = font(500, 19); ctx.fillText(fit(ctx, b.m.card.d, cw - 80), cx + 62, yy + 52);
      }
    }
    if (phoneTyping) {
      const x = W - 26 - 96, yy = H - 36 - 52;
      ctx.fillStyle = CSS.lime; rr(ctx, x, yy, 96, 52, 22); ctx.fill();
      ctx.fillStyle = CSS.ink0;
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(x + 28 + i * 20, yy + 26, 6, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
    tex.needsUpdate = true;
  }
  let phoneTyping = false;

  function drawApp() {
    const { ctx, cv, tex } = appTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const a = data.app[kind];
    ctx.fillStyle = CSS.paper; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = CSS.ink0; ctx.fillRect(0, 0, 210, H);
    ctx.fillStyle = CSS.lime; ctx.font = font(800, 34); ctx.textBaseline = "middle"; ctx.textAlign = "left";
    ctx.fillText("dakio", 30, 50);
    a.menu.forEach((m, i) => {
      const on = i === 0;
      if (on) { ctx.fillStyle = "#2A3020"; rr(ctx, 16, 104 + i * 52, 178, 42, 12); ctx.fill(); }
      ctx.fillStyle = on ? CSS.lime : "#A9AD98"; ctx.font = font(on ? 700 : 500, 21);
      ctx.fillText(m, 34, 125 + i * 52);
    });
    ctx.fillStyle = CSS.ink0; ctx.font = font(800, 44); ctx.fillText(a.title, 250, 64);
    ctx.fillStyle = CSS.muted; ctx.font = font(500, 20); ctx.fillText(a.sub, 250, 104);
    // The table.
    const cols = a.cols;
    const top = 140;
    ctx.fillStyle = CSS.muted; ctx.font = font(700, 16);
    cols.forEach(c => ctx.fillText(c.h.toUpperCase(), 250 + c.x, top + 10));
    const rows = appNew ? [a.fresh, ...a.rows] : a.rows;
    rows.slice(0, 6).forEach((r, i) => {
      const y = top + 34 + i * 76;
      const fresh = appNew && i === 0;
      ctx.fillStyle = fresh ? "#F1FBD2" : CSS.card;
      rr(ctx, 236, y, W - 266, 64, 14); ctx.fill();
      if (fresh) { ctx.strokeStyle = CSS.lime; ctx.lineWidth = 3; ctx.stroke(); }
      ctx.fillStyle = CSS.ink0;
      cols.forEach((c, j) => {
        ctx.font = font(j === 0 || fresh ? 700 : 500, 21);
        ctx.fillText(fit(ctx, r[j], (cols[j + 1]?.x ?? W - 300) - c.x - 16), 250 + c.x, y + 32);
      });
      if (fresh) {
        ctx.font = font(800, 15);
        const label = a.byNova;
        const tw = ctx.measureText(label).width + 26;
        ctx.fillStyle = CSS.ink0; rr(ctx, W - 50 - tw, y + 18, tw, 28, 14); ctx.fill();
        ctx.fillStyle = CSS.lime; ctx.fillText(label, W - 50 - tw + 13, y + 33);
      }
    });
    tex.needsUpdate = true;
  }

  function drawCal() {
    const { ctx, cv, tex } = calTex;
    const W = cv.width / cv.k, H = cv.height / cv.k;
    const c = data.cal;
    ctx.fillStyle = CSS.card; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = CSS.ink0; ctx.fillRect(0, 0, W, 96);
    ctx.fillStyle = CSS.lime; ctx.font = font(800, 40); ctx.textBaseline = "middle"; ctx.textAlign = "left";
    ctx.fillText(c.day, 34, 50);
    ctx.fillStyle = "#A9AD98"; ctx.font = font(500, 24); ctx.textAlign = "right"; ctx.fillText(c.store, W - 34, 52);
    ctx.textAlign = "left";
    c.slots.forEach((s, i) => {
      const y = 120 + i * 92;
      const lit = s.fresh && calLit;
      if (s.fresh && !calLit) {
        ctx.setLineDash([10, 8]); ctx.strokeStyle = "#CFCBBB"; ctx.lineWidth = 3; rr(ctx, 30, y, W - 60, 76, 16); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "#A6A894"; ctx.font = font(600, 26); ctx.fillText(s.time, 54, y + 38);
        return;
      }
      ctx.fillStyle = lit ? CSS.lime : "#EEECE2"; rr(ctx, 30, y, W - 60, 76, 16); ctx.fill();
      ctx.fillStyle = CSS.ink0; ctx.font = font(800, 26); ctx.fillText(s.time, 54, y + 38);
      ctx.font = font(lit ? 700 : 500, 26); ctx.fillText(fit(ctx, s.what, W - 300), 210, y + 38);
    });
    tex.needsUpdate = true;
  }

  function fit(ctx, text, maxW) {
    let t = String(text);
    if (ctx.measureText(t).width <= maxW) return t;
    while (t.length > 1 && ctx.measureText(t + "…").width > maxW) t = t.slice(0, -1);
    return t + "…";
  }

  // A flat rounded rectangle with 0..1 UVs, for the icon faces.
  function roundedPlane(w, h, r) {
    const sh = new THREE.Shape();
    const x = -w / 2, y = -h / 2;
    sh.moveTo(x + r, y); sh.lineTo(x + w - r, y); sh.quadraticCurveTo(x + w, y, x + w, y + r);
    sh.lineTo(x + w, y + h - r); sh.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    sh.lineTo(x + r, y + h); sh.quadraticCurveTo(x, y + h, x, y + h - r);
    sh.lineTo(x, y + r); sh.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ShapeGeometry(sh, 10);
    const pos = g.attributes.position, uv = g.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5);
    return g;
  }
  // The shipping label on each parcel.
  function drawShippingLabel(ctx) {
    ctx.fillStyle = "#FFFFFF"; rr(ctx, 4, 4, 248, 152, 14); ctx.fill();
    ctx.fillStyle = CSS.ink0; ctx.font = font(800, 30); ctx.textBaseline = "top"; ctx.fillText("Saril", 20, 18);
    ctx.font = font(600, 20); ctx.fillStyle = CSS.muted; ctx.fillText("#1044 · Mirpur 10", 20, 58);
    ctx.fillStyle = CSS.ink0; for (let i = 0; i < 26; i++) ctx.fillRect(20 + i * 8, 100, i % 3 ? 3 : 5, 40);
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

  // Channel badges: plain shapes in each app's colour, no logos.
  function badge(ctx, fill) {
    ctx.save();
    ctx.fillStyle = fill; rr(ctx, 40, 24, 176, 176, 48); ctx.fill(); ctx.restore();
  }
  function bubbleGlyph(ctx, color) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(128, 106, 54, 46, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(92, 132); ctx.lineTo(82, 162); ctx.lineTo(116, 146); ctx.closePath(); ctx.fill();
  }
  function drawMessenger(ctx) {
    const g = ctx.createLinearGradient(40, 200, 216, 24); g.addColorStop(0, "#0A7CFF"); g.addColorStop(1, "#A033FF");
    badge(ctx, g); bubbleGlyph(ctx, "#FFFFFF");
    ctx.strokeStyle = "#0A7CFF"; ctx.lineWidth = 9; ctx.lineJoin = "round"; ctx.beginPath();
    ctx.moveTo(98, 116); ctx.lineTo(120, 94); ctx.lineTo(136, 110); ctx.lineTo(158, 88); ctx.stroke();
  }
  function drawInstagram(ctx) {
    const g = ctx.createLinearGradient(40, 200, 216, 24); g.addColorStop(0, "#F9A23A"); g.addColorStop(0.5, "#E1306C"); g.addColorStop(1, "#7A3CC8");
    badge(ctx, g);
    ctx.strokeStyle = "#FFFFFF"; ctx.lineWidth = 11; rr(ctx, 78, 62, 100, 100, 30); ctx.stroke();
    ctx.beginPath(); ctx.arc(128, 112, 24, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(157, 84, 7, 0, Math.PI * 2); ctx.fill();
  }
  function drawWhatsApp(ctx) {
    badge(ctx, "#25D366"); bubbleGlyph(ctx, "#FFFFFF");
    ctx.fillStyle = "#25D366"; rr(ctx, 106, 90, 44, 30, 10); ctx.fill();
  }
  function drawWeb(ctx) {
    badge(ctx, CSS.ink0); bubbleGlyph(ctx, CSS.lime);
    ctx.fillStyle = CSS.ink0; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(106 + i * 22, 106, 7, 0, Math.PI * 2); ctx.fill(); }
  }
  function drawCourier(ctx) {
    ctx.fillStyle = CSS.lime; ctx.beginPath(); ctx.arc(128, 128, 128, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = CSS.ink0;
    rr(ctx, 52, 92, 92, 64, 8); ctx.fill();
    ctx.beginPath(); ctx.moveTo(148, 108); ctx.lineTo(182, 108); ctx.lineTo(204, 132); ctx.lineTo(204, 156); ctx.lineTo(148, 156); ctx.closePath(); ctx.fill();
    for (const x of [82, 178]) { ctx.beginPath(); ctx.arc(x, 162, 17, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = CSS.lime; ctx.beginPath(); ctx.arc(x, 162, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = CSS.ink0; }
  }
  function drawSms(ctx) {
    ctx.fillStyle = CSS.ink0; rr(ctx, 8, 8, 240, 92, 30); ctx.fill();
    ctx.beginPath(); ctx.moveTo(60, 96); ctx.lineTo(48, 124); ctx.lineTo(90, 98); ctx.fill();
    ctx.fillStyle = CSS.lime; ctx.font = font(800, 44); ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("SMS", 128, 56);
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
    if (kind === "shop" || aud === "both") { const p = parcels[0]; p.g.visible = true; p.g.position.set(5.6, BELT.y + 0.32, BELT.z); }
    pulse.visible = false;
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
    composer?.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    homeDist = BASE_DIST * fitScale();
    if (!tween) { const dir = camera.position.clone().sub(controls.target).normalize(); camera.position.copy(controls.target).addScaledVector(dir, focused ? camera.position.distanceTo(controls.target) : homeDist); }
    dirty = true;
  }
  let focused = false;

  // ---------- loop ----------
  const clock = new THREE.Clock(false);
  let raf = 0;
  let running = false;
  let paused = !!reduced;
  let dirty = true;
  function frame() {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.25, clock.getDelta());
    const moving = !paused;
    if (moving) step(dt);
    stepTween(dt);
    controls.update();
    if (moving || tween || dirty || gazeDir.distanceTo(gazeWant) > 0.01) {
      animateNova(dt, moving);
      placeLabels();
      if (composer) composer.render(); else renderer.render(scene, camera);
      dirty = false;
    }
  }
  function start() { if (running) return; running = true; clock.start(); raf = requestAnimationFrame(frame); }
  function stop() { running = false; cancelAnimationFrame(raf); clock.stop(); }

  return {
    setAudience,
    focus(key) { focused = !!key; focus(key || (follow() ? curKey : null)); },
    setPaused(p) { paused = p; dirty = true; },
    resize, start, stop,
    dispose() {
      stop();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointermove", onMove);
      controls.dispose();
      disposables.forEach(d => d.dispose?.());
      composer?.dispose?.(); gtao?.dispose?.(); envRT.dispose();
      renderer.dispose();
    },
  };
}
