/* nova-field-3d.js — <nova-field-3d>: Nova's office in 2050 (Three.js r128 UMD → window.THREE).
   No floor, no walls, no desks. PURE VIEW, generated from setData({stations, store}): every station (a department)
   is a ring of light on an orbit around the core (the store, the founder's seat). A ring's colour and steadiness is
   its grade; the currents running through it are its duties (bright = running, still = paused, faint = not built);
   amber slabs floating inside it are decisions held for the founder; threads back to the core are receipts.
   Nova has no body: she is the light in the filament between the core and whichever station is working.
   The sky is the clock (setClock hours) and the day runs round the core as a ring (setDay ticks).
   API    setData(d) · update(stations) · setDay(ticks[{min,label,status}]) · setClock(hours) · setNova({room,dutyId,state})
          focusRoom(key) · overview() · flyTo({target,yaw,pitch,radius}) · setAutoOrbit(bool) · resolve(roomKey, verdict) · stationPos(key)
   Events field-ready · field-select{key} · field-hover{key|null} · field-interact · field-arrive{key} */
(function () {
  'use strict';
  if (window.customElements && customElements.get('nova-field-3d')) return;

  var SANS = '"Hanken Grotesk","Archivo",system-ui,sans-serif';
  var MONO = '"JetBrains Mono",ui-monospace,Menlo,monospace';
  var HEX = { lime: '#c6f035', cream: '#f4f2ea', muted: '#9a9c8c', dim: '#5c6052', warn: '#e3b25b', err: '#e06a5e', ok: '#7fbf85', ink: '#1a1d12', hidden: '#3b3e32', slate: '#3a4450' };
  var TONE = { working: HEX.lime, waiting: HEX.warn, failing: HEX.err, quiet: HEX.muted, hidden: HEX.hidden, watch: HEX.ok, gather: HEX.cream };
  var KCOL = { work: HEX.lime, live: HEX.lime, gather: HEX.cream, watch: HEX.muted };
  // Nova herself, as in the app (nova-orb.js): one soft sphere with a gaze spot, a fresnel rim and ripples when something lands
  var ORB_VERT = 'varying vec3 vN; varying vec3 vP; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vP = normalize(position); gl_Position = projectionMatrix * mv; }';
  var ORB_FRAG = [
    'uniform float uTime; uniform float uEnergy; uniform float uFlash; uniform vec3 uGaze; uniform vec3 uLime; uniform float uRip[3];',
    'varying vec3 vN; varying vec3 vP; varying vec3 vV;',
    'void main(){',
    '  float ndv = max(dot(vN, vV), 0.0); float fres = pow(1.0 - ndv, 2.6);',
    '  vec3 g = normalize(uGaze); float d = dot(vP, g); float ang = acos(clamp(d, -1.0, 1.0));',
    '  float en = 0.45 + 0.55 * uEnergy;',
    '  float halo = smoothstep(-0.2, 0.92, d); float core = smoothstep(0.70, 0.985, d); float hot = smoothstep(0.955, 1.0, d);',
    '  float rip = 0.0;',
    '  for (int i = 0; i < 3; i++) { float a = uTime - uRip[i]; if (a > 0.0 && a < 1.4) { float w = a * 2.4; rip += smoothstep(0.16, 0.0, abs(ang - w)) * (1.0 - a / 1.4); } }',
    '  vec3 col = vec3(0.075, 0.09, 0.05) + uLime * 0.06 * en;',
    '  col += uLime * halo * halo * 0.42 * en;',
    '  col = mix(col, uLime * (1.05 + 0.35 * uFlash), core);',
    '  col = mix(col, vec3(1.0, 1.0, 0.93), hot * 0.85);',
    '  col += uLime * fres * (0.35 + 0.55 * en);',
    '  float spec = pow(max(dot(vN, normalize(vec3(-0.45, 0.75, 0.6))), 0.0), 48.0); col += vec3(0.9, 0.95, 0.85) * spec * 0.35;',
    '  col += uLime * rip * 0.6 + uLime * uFlash * 0.35;',
    '  gl_FragColor = vec4(col, 0.94 + 0.06 * fres);',
    '}'].join('\n');
  var WOB = { A: 0, B: 0.05, C: 0.13, D: 0.22, F: 0.3 };
  var SKY = { night: { top: [0.014, 0.018, 0.045], hor: [0.05, 0.06, 0.085], bot: [0.02, 0.023, 0.03] }, day: { top: [0.13, 0.21, 0.31], hor: [0.5, 0.58, 0.62], bot: [0.07, 0.08, 0.09] } };
  var R = 11.5, CORE_Y = 1.0, RING_R = 1.7, DAY_R = 4.6, TILT = Math.PI / 2 - 0.5;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function wrap(a) { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; }
  function col(h) { return new THREE.Color(h).convertSRGBToLinear(); }
  function basic(h, o) { var m = new THREE.MeshBasicMaterial(Object.assign({ color: col(h), toneMapped: false }, o || {})); m.userData.own = true; return m; }
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function fit(ctx, s, maxW) { s = String(s == null ? '' : s); if (ctx.measureText(s).width <= maxW) return s; while (s.length > 1 && ctx.measureText(s + '…').width > maxW) s = s.slice(0, -1); return s + '…'; }
  function txt(ctx, s, x, y, font, color, align, ls, maxW) {
    ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    try { ctx.letterSpacing = (ls || 0) + 'px'; } catch (e) {}
    ctx.fillText(maxW ? fit(ctx, s, maxW) : String(s == null ? '' : s), x, y);
    try { ctx.letterSpacing = '0px'; } catch (e) {}
  }
  function radial(stops) { var c = document.createElement('canvas'); c.width = c.height = 128; var g = c.getContext('2d'); var gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); stops.forEach(function (s) { gr.addColorStop(s[0], s[1]); }); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); }
  function ringTexture() {
    var c = document.createElement('canvas'); c.width = c.height = 256; var g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    [[0.6, 'rgba(255,255,255,0)'], [0.78, 'rgba(255,255,255,0.28)'], [0.85, 'rgba(255,255,255,1)'], [0.91, 'rgba(255,255,255,0.3)'], [1, 'rgba(255,255,255,0)']].forEach(function (s) { gr.addColorStop(s[0], s[1]); });
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256); return new THREE.CanvasTexture(c);
  }
  function gradeTone(g) { return g === 'A' ? HEX.lime : g === 'B' ? HEX.ok : g === 'C' ? HEX.warn : g ? HEX.err : HEX.muted; }
  function dispose(g) { g.traverse(function (o) { if (o.geometry) o.geometry.dispose(); var m = o.material; if (m && m.userData && m.userData.own) { if (m.map) m.map.dispose(); m.dispose(); } }); }
  function streamLook(d, hidden) {
    if (hidden) return { color: HEX.hidden, op: 0.12, speed: 0, size: 0.3 };
    if (d.failing) return { color: HEX.err, op: 0.85, speed: 1.6, size: 0.42 };
    if (d.status === 'paused') return { color: HEX.muted, op: 0.55, speed: 0, size: 0.34 };
    if (d.status === 'locked') return { color: HEX.dim, op: 0.2, speed: 0.12, size: 0.3 };
    if (d.status === 'in_build') return { color: HEX.cream, op: 0.26, speed: 0.3, size: 0.3 };
    if (d.phase === 'running') return { color: HEX.lime, op: 1, speed: 2.8, size: 0.52 };
    if (d.live) return { color: HEX.ok, op: 0.7, speed: 1.1, size: 0.36 };
    return { color: HEX.lime, op: 0.42, speed: 0.45, size: 0.34 };
  }

  /* ---------- canvas painters (the few words that float in the field) ---------- */
  function paintStation(ctx, w, h, d) {
    ctx.fillStyle = 'rgba(10,12,8,0.84)'; rr(ctx, 3, 3, w - 6, h - 6, 44); ctx.fill();
    ctx.strokeStyle = d.hidden ? 'rgba(244,242,234,0.12)' : 'rgba(198,240,53,0.36)'; ctx.lineWidth = 3; ctx.stroke();
    var gw = 132, gx = w - gw - 30;
    txt(ctx, d.title, 44, 74, '600 66px ' + SANS, d.hidden ? '#8a8c7c' : HEX.cream, 'left', -1.5, gx - 70);
    txt(ctx, String(d.live || '').toUpperCase(), 46, 140, '500 26px ' + MONO, d.liveColor || HEX.muted, 'left', 3, gx - 70);
    ctx.fillStyle = d.grade ? HEX.cream : 'rgba(244,242,234,0.08)'; rr(ctx, gx, 26, gw, h - 52, 24); ctx.fill();
    txt(ctx, d.grade || '—', gx + gw / 2, h / 2 - 10, '700 96px ' + SANS, d.grade ? HEX.ink : 'rgba(244,242,234,0.45)', 'center', -3);
    txt(ctx, d.grade ? '14 DAYS' : 'NO GRADE', gx + gw / 2, h - 48, '500 15px ' + MONO, d.grade ? '#6b6d60' : 'rgba(244,242,234,0.4)', 'center', 2);
  }
  function paintCore(ctx, w, h, d) {
    ctx.fillStyle = 'rgba(10,12,8,0.86)'; rr(ctx, 3, 3, w - 6, h - 6, 44); ctx.fill();
    ctx.strokeStyle = 'rgba(198,240,53,0.5)'; ctx.lineWidth = 3; ctx.stroke();
    var gw = 132, gx = w - gw - 30;
    txt(ctx, 'THE CORE · YOUR SEAT', 44, 50, '500 23px ' + MONO, HEX.lime, 'left', 4);
    txt(ctx, d.name || '', 44, 108, '600 62px ' + SANS, HEX.cream, 'left', -1.5, gx - 70);
    txt(ctx, String(d.live || '').toUpperCase(), 46, 166, '500 24px ' + MONO, d.liveColor || HEX.muted, 'left', 3, gx - 70);
    ctx.fillStyle = d.grade ? HEX.cream : 'rgba(244,242,234,0.08)'; rr(ctx, gx, 26, gw, h - 52, 24); ctx.fill();
    txt(ctx, d.grade || '—', gx + gw / 2, h / 2 - 10, '700 96px ' + SANS, d.grade ? HEX.ink : 'rgba(244,242,234,0.45)', 'center', -3);
    txt(ctx, d.grade ? 'BUILDING' : 'NO GRADE', gx + gw / 2, h - 48, '500 15px ' + MONO, d.grade ? '#6b6d60' : 'rgba(244,242,234,0.4)', 'center', 2);
  }
  function paintHeld(ctx, w, h) {
    ctx.fillStyle = 'rgba(227,178,91,0.22)'; rr(ctx, 4, 4, w - 8, h - 8, 18); ctx.fill();
    ctx.strokeStyle = 'rgba(227,178,91,0.95)'; ctx.lineWidth = 5; ctx.stroke();
    txt(ctx, 'HELD', 22, 34, '600 22px ' + MONO, HEX.warn, 'left', 3);
    ctx.fillStyle = 'rgba(244,242,234,0.55)'; for (var i = 0; i < 4; i++) { rr(ctx, 22, 66 + i * 26, (i === 3 ? 0.45 : 0.75) * (w - 44), 10, 5); ctx.fill(); }
    ctx.fillStyle = HEX.warn; rr(ctx, 22, h - 44, 54, 20, 10); ctx.fill(); ctx.fillStyle = 'rgba(244,242,234,0.25)'; rr(ctx, 84, h - 44, 54, 20, 10); ctx.fill();
  }
  function paintSmall(ctx, w, h, s, color) { txt(ctx, String(s || '').toUpperCase(), w / 2, h / 2, '500 44px ' + MONO, color || HEX.muted, 'center', 4, w - 10); }

  class NovaField3D extends HTMLElement {
    constructor() {
      super();
      this._ready = false; this._built = false; this._st = []; this._byKey = {}; this._hits = []; this._texes = [];
      this._hover = null; this._selected = null; this._raf = 0; this._auto = true; this._lastInput = 0; this._lastInteractEvt = 0; this._pending = null;
      this._focus = null; this._flying = false; this._hour = 5.8; this._daylight = 0; this._night = 1; this._ticks = []; this._fils = []; this._flights = [];
      this._nova = { room: null, state: 'idle' }; this._ticksPending = null; this._store = {};
    }
    connectedCallback() {
      if (this._container) return;
      var self = this;
      this.style.display = 'block';
      if (!this.style.width) this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
      if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
      this.style.overflow = 'hidden';
      var c = document.createElement('div'); c.style.cssText = 'position:absolute;inset:0;'; this.appendChild(c); this._container = c;
      var tip = document.createElement('div');
      tip.style.cssText = 'position:absolute;left:0;top:0;transform:translate(-50%,-130%);padding:9px 13px;border-radius:14px;background:#1a1d12;color:#f4f6ec;font-family:"Hanken Grotesk",system-ui,sans-serif;font-size:13px;font-weight:600;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .12s ease;z-index:5;border:1px solid rgba(198,240,53,0.3);box-shadow:0 10px 24px rgba(0,0,0,0.35);';
      this.appendChild(tip); this._tip = tip;
      this._waitThree(function () { if (self.isConnected && !self._ready) self._setup(); });
    }
    disconnectedCallback() { var self = this; requestAnimationFrame(function () { if (!self.isConnected) self._teardown(); }); }
    _waitThree(cb) { if (window.THREE) return cb(); var tries = 0, t = setInterval(function () { if (window.THREE) { clearInterval(t); cb(); } else if (++tries > 400) clearInterval(t); }, 50); }
    _fontsReady() {
      var f = document.fonts; if (!f || !f.load) return Promise.resolve();
      var p = Promise.all([f.load('600 40px "Hanken Grotesk"'), f.load('500 24px "JetBrains Mono"')]).then(function () { return f.ready; }).catch(function () {});
      return Promise.race([p, new Promise(function (r) { setTimeout(r, 1800); })]);
    }

    /* ---------- scene ---------- */
    _setup() {
      var T3 = THREE, self = this;
      try { this._renderer = new T3.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true }); }
      catch (e) { this._container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:13px;color:#9a9c8c;font-family:system-ui">3D field unavailable on this device</div>'; return; }
      var r = this._renderer;
      this._q = 2; this._ema = 0.016; this._slowFor = 0;   // quality governor: 2 = full, 1 = 1x pixels, 0 = 0.75x
      r.outputEncoding = T3.sRGBEncoding; r.toneMapping = T3.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
      r.domElement.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:none;';
      this._container.appendChild(r.domElement);
      this._scene = new T3.Scene();
      this._camera = new T3.PerspectiveCamera(40, 1, 0.1, 900);
      var center = new T3.Vector3(0, CORE_Y - 0.2, 0);
      this._o = { target: center.clone(), yaw: 0.55, pitch: 0.62, rad: 40 }; this._og = { target: center.clone(), yaw: 0.55, pitch: 0.62, rad: 40 };
      this._ovRad = 40; this._gp = new T3.Vector3(); this._look = center.clone();
      this._camera.position.set(40 * Math.sin(0.55) * Math.cos(0.62), CORE_Y + 40 * Math.sin(0.62), 40 * Math.cos(0.55) * Math.cos(0.62)); this._camera.lookAt(center);
      this._ambient = new T3.AmbientLight(col('#2a2e22'), 0.5); this._scene.add(this._ambient);
      this._hemi = new T3.HemisphereLight(col('#3a4150'), col('#1a1d12'), 0.5); this._scene.add(this._hemi);
      this._glowTex = radial([[0, 'rgba(255,255,240,0.95)'], [0.18, 'rgba(198,240,53,0.55)'], [0.5, 'rgba(198,240,53,0.1)'], [1, 'rgba(198,240,53,0)']]);
      this._softTex = radial([[0, 'rgba(255,255,255,0.55)'], [0.45, 'rgba(255,255,255,0.12)'], [1, 'rgba(255,255,255,0)']]);
      this._dotTex = radial([[0, 'rgba(255,255,255,1)'], [0.3, 'rgba(255,255,255,0.7)'], [1, 'rgba(255,255,255,0)']]);
      this._whiteGlow = radial([[0, 'rgba(255,255,255,0.95)'], [0.2, 'rgba(255,255,255,0.45)'], [0.55, 'rgba(255,255,255,0.08)'], [1, 'rgba(255,255,255,0)']]);
      this._ringTex = ringTexture();
      this._heldTex = this._tex(160, 220, paintHeld);
      this._buildSky(); this._buildCore(); this._buildDay();
      this._bindInput();
      this._ro = new ResizeObserver(function () { self._onResize(); }); this._ro.observe(this); this._onResize();
      this._ready = true; this._clock = new T3.Clock(); this.setClock(this._hour); this._loop();
      if (this._pending) { var p = this._pending; this._pending = null; this.setData(p); }
    }
    _teardown() {
      cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      if (this._renderer) { this._renderer.dispose(); this._renderer.forceContextLoss && this._renderer.forceContextLoss(); }
    }
    _onResize() {
      if (!this._renderer) return;
      var w = this.clientWidth || 800, h = this.clientHeight || 600;
      this._renderer.setPixelRatio(this._dpr(w, h)); this._renderer.setSize(w, h, false); this._camera.aspect = w / h; this._camera.updateProjectionMatrix();
      this._ovRad = 38 * Math.max(1, 1.5 / (w / h));
      if (!this._focus && !this._flying) this._og.rad = this._ovRad;
    }
    // pixel budget: never more than ~2.4M device pixels at full quality; the governor steps down from there
    _dpr(w, h) { var cap = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2.4e6 / Math.max(1, w * h))); return this._q === 2 ? Math.max(0.75, cap) : this._q === 1 ? Math.min(cap, 1) : Math.min(cap, 0.75); }
    _govern(dt) {
      this._ema += (dt - this._ema) * 0.05;
      if (this._ema > 0.03 && this._q > 0) { this._slowFor += dt; if (this._slowFor > 2.5) { this._q--; this._slowFor = 0; this._ema = 0.016; this._onResize(); } } else this._slowFor = Math.max(0, this._slowFor - dt);
    }
    _tex(w, h, draw) {
      var c = document.createElement('canvas'); c.width = w; c.height = h; var ctx = c.getContext('2d');
      var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8;
      var o = { tex: t, canvas: c, draw: draw, paint: function (fn) { if (fn) o.draw = fn; ctx.clearRect(0, 0, w, h); o.draw(ctx, w, h); t.needsUpdate = true; } };
      o.paint(); this._texes.push(o); return o;
    }
    _texRaw(w, h, draw) { var c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 4; return t; }
    _glow(scale, opacity, tex, hex) {
      var mat = new THREE.SpriteMaterial({ map: tex || this._glowTex, transparent: true, depthWrite: false, opacity: opacity == null ? 0.6 : opacity, toneMapped: false, color: col(hex || '#ffffff') }); mat.userData.own = true;
      var s = new THREE.Sprite(mat); s.scale.set(scale, scale, 1); s.renderOrder = 4; return s;
    }

    _buildSky() {
      var T3 = THREE;
      this._skyU = { top: { value: new T3.Color(0.014, 0.018, 0.045) }, hor: { value: new T3.Color(0.05, 0.06, 0.085) }, bot: { value: new T3.Color(0.02, 0.023, 0.03) }, glow: { value: new T3.Color(0.85, 0.5, 0.28) }, glowDir: { value: new T3.Vector3(1, 0.05, 0) }, glowAmt: { value: 0 } };
      var mat = new T3.ShaderMaterial({ side: T3.BackSide, depthWrite: false, uniforms: this._skyU,
        vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
        fragmentShader: 'uniform vec3 top; uniform vec3 hor; uniform vec3 bot; uniform vec3 glow; uniform vec3 glowDir; uniform float glowAmt; varying vec3 vP; void main(){ vec3 d = normalize(vP); float h = d.y; vec3 c = h > 0.0 ? mix(hor, top, pow(h, 0.55)) : mix(hor, bot, pow(-h, 0.45)); float g = max(0.0, dot(d, normalize(glowDir))); c += glow * glowAmt * (pow(g, 8.0) * 0.9 + pow(g, 2.0) * 0.22) * (1.0 - min(1.0, abs(h) * 2.2)); gl_FragColor = vec4(c, 1.0); }' });
      var dome = new T3.Mesh(new T3.SphereGeometry(400, 40, 20), mat); dome.frustumCulled = false; dome.renderOrder = -10; this._scene.add(dome);
      var n = 1400, arr = new Float32Array(n * 3);
      for (var i = 0; i < n; i++) { var u = Math.random(), ph = Math.random() * Math.PI * 2, y = 0.04 + u * u * 0.95, rr2 = Math.sqrt(Math.max(0, 1 - y * y)); arr[i * 3] = rr2 * Math.cos(ph) * 360; arr[i * 3 + 1] = y * 360; arr[i * 3 + 2] = rr2 * Math.sin(ph) * 360; }
      var sg = new T3.BufferGeometry(); sg.setAttribute('position', new T3.BufferAttribute(arr, 3));
      this._stars = new T3.Points(sg, new T3.PointsMaterial({ size: 1.8, sizeAttenuation: false, color: col('#dfe6ff'), transparent: true, opacity: 0.8, depthWrite: false, toneMapped: false }));
      this._stars.frustumCulled = false; this._scene.add(this._stars);
      this._sun = this._glow(90, 0.5, this._whiteGlow, '#ffb36b'); this._sun.renderOrder = -5; this._scene.add(this._sun);
      this._moon = this._glow(30, 0.35, this._whiteGlow, '#c9d4ea'); this._moon.position.set(-170, 210, -190); this._scene.add(this._moon);
      var mist = new T3.Mesh(new T3.PlaneGeometry(460, 460), new T3.MeshBasicMaterial({ map: this._softTex, transparent: true, opacity: 0.4, depthWrite: false, color: col(HEX.slate), toneMapped: false }));
      mist.rotation.x = -Math.PI / 2; mist.position.y = -9; this._scene.add(mist); this._mist = mist;
      var pts = []; for (var k = 0; k <= 180; k++) { var a = k / 180 * Math.PI * 2; pts.push(new T3.Vector3(Math.sin(a) * R, 0, Math.cos(a) * R)); }
      this._path = new T3.Line(new T3.BufferGeometry().setFromPoints(pts), new T3.LineBasicMaterial({ color: col(HEX.cream), transparent: true, opacity: 0.1, toneMapped: false })); this._scene.add(this._path);
    }
    _buildCore() {
      var T3 = THREE, g = new T3.Group(); g.position.set(0, CORE_Y, 0); this._scene.add(g);
      // the core is Nova: one soft orb that breathes and looks at you, one glow, one thin grade ring. Nothing else competes.
      this._orbU = { uTime: { value: 0 }, uEnergy: { value: 0.3 }, uFlash: { value: 0 }, uGaze: { value: new T3.Vector3(0, 0.2, 1).normalize() }, uLime: { value: new T3.Vector3(0xC6 / 255, 0xF0 / 255, 0x35 / 255) }, uRip: { value: [-10, -10, -10] } };
      var orb = new T3.Mesh(new T3.SphereGeometry(1.15, 64, 48), new T3.ShaderMaterial({ uniforms: this._orbU, transparent: true, vertexShader: ORB_VERT, fragmentShader: ORB_FRAG })); g.add(orb);
      var glow = this._glow(4.2, 0.3, this._softTex, HEX.lime); glow.material.depthTest = false; glow.renderOrder = 1; g.add(glow);
      var light = new T3.PointLight(col(HEX.lime), 1.4, 40, 2); g.add(light);
      var ringG = new T3.Group(); ringG.rotation.x = Math.PI / 2 - 0.35; g.add(ringG);
      var ring = new T3.Mesh(new T3.TorusGeometry(2.4, 0.018, 8, 160), basic(HEX.muted, { transparent: true, opacity: 0.4 })); ringG.add(ring);
      var rg = new T3.Mesh(new T3.RingGeometry(2.4 * 0.62 / 0.85, 2.4 / 0.85, 96), new T3.MeshBasicMaterial({ map: this._ringTex, transparent: true, opacity: 0.1, blending: T3.AdditiveBlending, depthWrite: false, side: T3.DoubleSide, toneMapped: false, color: col(HEX.muted) })); rg.renderOrder = 2; ringG.add(rg);
      var sel = new T3.Mesh(new T3.TorusGeometry(3.0, 0.014, 6, 160), basic(HEX.cream, { transparent: true, opacity: 0 })); ringG.add(sel);
      var label = this._tex(760, 200, function (ctx, w, h) { paintCore(ctx, w, h, { name: '' }); });
      var ls = new T3.Sprite(new T3.SpriteMaterial({ map: label.tex, transparent: true, depthWrite: false, toneMapped: false })); ls.scale.set(5.7, 1.5, 1); ls.position.set(0, 3.5, 0); ls.renderOrder = 6; g.add(ls);
      var hit = new T3.Mesh(new T3.SphereGeometry(2.7, 12, 8), new T3.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })); hit.userData.key = 'home'; g.add(hit); this._hits.push(hit);
      this._core = { key: 'home', group: g, orb: orb, glow: glow, light: light, ringG: ringG, ring: ring, rg: rg, sel: sel, selGoal: 0, label: label, ls: ls, lsOp: 1, wob: 0.06, sig: '', data: {}, flash: 0, prevFlash: 0, energy: 0.3, rip: [-10, -10, -10], ripI: 0, waiting: 0 };
      this._gaze = new T3.Vector3();
    }
    _buildDay() {
      var T3 = THREE, g = new T3.Group(); g.position.set(0, CORE_Y - 0.7, 0); this._scene.add(g);
      var ring = new T3.Mesh(new T3.TorusGeometry(DAY_R, 0.014, 6, 180), basic(HEX.cream, { transparent: true, opacity: 0.22 })); ring.rotation.x = Math.PI / 2; g.add(ring);
      var hourLabels = [];
      for (var h = 0; h < 24; h++) {
        var a = h / 24 * Math.PI * 2, x = Math.sin(a), z = -Math.cos(a), big = h % 6 === 0;
        var d = this._glow(big ? 0.34 : 0.18, big ? 0.6 : 0.28, this._whiteGlow, HEX.cream); d.position.set(x * DAY_R, 0, z * DAY_R); g.add(d);
        if (big) {
          var s = (h < 10 ? '0' : '') + h, tex = this._texRaw(128, 64, (function (s) { return function (ctx, w, hh) { txt(ctx, s, w / 2, hh / 2, '500 40px ' + MONO, HEX.cream, 'center', 3); }; })(s));
          var sp = new T3.Sprite(new T3.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, opacity: 0.7 })); sp.scale.set(0.9, 0.45, 1); sp.position.set(x * (DAY_R + 0.75), 0, z * (DAY_R + 0.75)); g.add(sp); hourLabels.push(sp);
        }
      }
      var marker = this._glow(0.7, 1, this._whiteGlow, HEX.lime); g.add(marker);
      var hp = new Float32Array(6), hg = new T3.BufferGeometry(); hg.setAttribute('position', new T3.BufferAttribute(hp, 3));
      var hand = new T3.Line(hg, new T3.LineBasicMaterial({ color: col(HEX.lime), transparent: true, opacity: 0.7, toneMapped: false })); hand.frustumCulled = false; g.add(hand);
      var arcN = 288, ap = []; for (var k = 0; k <= arcN; k++) { var aa = k / arcN * Math.PI * 2; ap.push(new T3.Vector3(Math.sin(aa) * DAY_R, 0.005, -Math.cos(aa) * DAY_R)); }
      var arc = new T3.Line(new T3.BufferGeometry().setFromPoints(ap), new T3.LineBasicMaterial({ color: col(HEX.lime), transparent: true, opacity: 0.55, toneMapped: false })); arc.geometry.setDrawRange(0, 0); arc.frustumCulled = false; g.add(arc);
      this._day = { group: g, ring: ring, marker: marker, hand: hand, handPos: hp, arc: arc, arcN: arcN, hourLabels: hourLabels };
    }

    /* ---------- data in ---------- */
    setData(data) {
      if (!this._ready) { this._pending = data; return; }
      var self = this; this._pendingBuild = data;
      this._fontsReady().then(function () { if (self._pendingBuild === data && self.isConnected) { self._pendingBuild = null; self._build(data); } });
    }
    update(stations) { if (!this._built) return; var self = this; (stations || []).forEach(function (d) { if (d.key === 'home') self._applyCore(d); else { var st = self._byKey[d.key]; if (st && st !== self._core) self._applyStation(st, d); } }); }
    setAutoOrbit(b) { this._auto = !!b; }
    // for embeds: stop rendering while scrolled out of view
    setPaused(p) { p = !!p; if (p === !!this._paused) return; this._paused = p; if (p) { cancelAnimationFrame(this._raf); this._raf = 0; } else if (this._ready) { this._clock.getDelta(); this._loop(); } }
    stationPos(key) { var st = this._byKey[key]; if (!st) return null; var p = st === this._core ? this._core.group.position : st.base; return [p.x, p.y, p.z]; }

    _clear() {
      var self = this;
      this._st.forEach(function (st) {
        self._scene.remove(st.group); dispose(st.group); st.label.tex.dispose();
        st.threads.forEach(function (l) { self._scene.remove(l); l.geometry.dispose(); l.material.dispose(); });
        self._scene.remove(st.web); st.web.geometry.dispose(); st.web.material.dispose();
        st.streams.forEach(function (s) { s.geo.dispose(); s.mat.dispose(); });
      });
      this._fils.forEach(function (f) { self._killFil(f); }); this._fils = [];
      this._flights.forEach(function (f) { self._scene.remove(f.mesh); f.mesh.material.dispose(); }); this._flights = [];
      this._st = []; this._byKey = {}; this._hits = this._hits.filter(function (h) { return h.userData.key === 'home'; }); this._built = false;
    }
    _build(data) {
      this._clear();
      var self = this, T3 = THREE, list = (data.stations || []).filter(function (s) { return s.key !== 'home'; }).sort(function (a, b) { return a.order - b.order; }), N = Math.max(1, list.length);
      this._store = data.store || {};
      list.forEach(function (d, i) {
        var a = i / N * Math.PI * 2 + 0.35, x = Math.sin(a) * R, z = Math.cos(a) * R, y = 0.45 * Math.sin(i * 2.4);
        var g = new T3.Group(); g.position.set(x, y, z); self._scene.add(g);
        var rings = new T3.Group(); rings.rotation.order = 'YXZ'; rings.rotation.set(TILT, a, 0); g.add(rings);
        var torus = new T3.Mesh(new T3.TorusGeometry(RING_R, 0.04, 8, 112), basic(HEX.muted, { transparent: true, opacity: 0.8 })); rings.add(torus);
        var ghost = new T3.Mesh(new T3.TorusGeometry(RING_R * 1.03, 0.025, 6, 96), basic(HEX.muted, { transparent: true, opacity: 0.3 })); ghost.visible = false; rings.add(ghost);
        var cp = []; for (var k = 0; k <= 96; k++) { var ca = k / 96 * Math.PI * 2; cp.push(new T3.Vector3(Math.cos(ca) * RING_R, Math.sin(ca) * RING_R, 0)); }
        var dm = new T3.LineDashedMaterial({ color: col(HEX.muted), dashSize: 0.16, gapSize: 0.14, transparent: true, opacity: 0.55, toneMapped: false }); dm.userData.own = true;
        var dashed = new T3.Line(new T3.BufferGeometry().setFromPoints(cp), dm); dashed.computeLineDistances(); dashed.visible = false; rings.add(dashed);
        var rgm = new T3.MeshBasicMaterial({ map: self._ringTex, transparent: true, opacity: 0.6, blending: T3.AdditiveBlending, depthWrite: false, side: T3.DoubleSide, toneMapped: false, color: col(HEX.muted) }); rgm.userData.own = true;
        var rg = new T3.Mesh(new T3.RingGeometry(RING_R * 0.62 / 0.85, RING_R / 0.85, 80), rgm); rg.renderOrder = 2; rings.add(rg);
        var sel = new T3.Mesh(new T3.TorusGeometry(RING_R * 1.22, 0.03, 6, 112), basic(HEX.cream, { transparent: true, opacity: 0 })); rings.add(sel);
        var glow = self._glow(3.2, 0, self._whiteGlow, HEX.lime); glow.position.y = 0.1; g.add(glow);
        var label = self._tex(720, 200, function (ctx, w, h) { paintStation(ctx, w, h, { title: d.title, live: d.live, grade: d.grade }); });
        var lsm = new T3.SpriteMaterial({ map: label.tex, transparent: true, depthWrite: false, toneMapped: false }); lsm.userData.own = true;
        var ls = new T3.Sprite(lsm); ls.scale.set(5.0, 1.39, 1); ls.position.set(0, 2.55, 0); ls.renderOrder = 6; g.add(ls);
        var slabG = new T3.Group(); g.add(slabG);
        var hm = new T3.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }); hm.userData.own = true;
        var hit = new T3.Mesh(new T3.SphereGeometry(2.4, 12, 8), hm); hit.userData.key = d.key; g.add(hit); self._hits.push(hit);
        var a0 = new T3.Vector3(x, y + 0.05, z), b0 = new T3.Vector3(0, CORE_Y - 0.3, 0), m0 = a0.clone().add(b0).multiplyScalar(0.5); m0.y -= 1.0;
        var web = new T3.Line(new T3.BufferGeometry().setFromPoints(new T3.QuadraticBezierCurve3(a0, m0, b0).getPoints(40)), new T3.LineBasicMaterial({ color: col(HEX.cream), transparent: true, opacity: 0.05, toneMapped: false })); self._scene.add(web);
        var st = { key: d.key, i: i, angle: a, data: {}, group: g, rings: rings, torus: torus, ghost: ghost, dashed: dashed, rg: rg, rgBase: 0.2, sel: sel, selGoal: 0, glow: glow, glowBase: 0, label: label, ls: ls, lsOp: 1, lsBase: 1, slabG: slabG, slabs: [], streams: [], streamSig: '', threads: [], threadSig: '', web: web, sig: '',
          base: new T3.Vector3(x, y, z), dir: new T3.Vector3(Math.sin(a), 0, Math.cos(a)), present: 0, presentGoal: 0, wob: 0, flash: 0, novaHere: false, tone: 'quiet', hidden: false, cam: { target: [x, y + 0.5, z], yaw: a, pitch: 0.2, radius: 7.4 } };
        self._st.push(st); self._byKey[d.key] = st;
        self._applyStation(st, d);
      });
      this._byKey.home = this._core;
      var home = (data.stations || []).filter(function (s) { return s.key === 'home'; })[0]; if (home) this._applyCore(home);
      this._built = true;
      if (this._ticksPending) { var tp = this._ticksPending; this._ticksPending = null; this.setDay(tp); }
      this._retarget(true);
      this.dispatchEvent(new CustomEvent('field-ready', { bubbles: true }));
    }
    _applyStation(st, d) {
      st.data = d; var hidden = !!d.hidden; st.hidden = hidden;
      var tone = hidden ? 'hidden' : (d.stateKey === 'failing' ? 'failing' : (d.liveTone || 'quiet')); st.tone = tone;
      var tc = TONE[tone] || HEX.muted;
      var sig = [d.title, d.live, tc, d.grade, hidden].join('|');
      if (sig !== st.sig) { st.sig = sig; st.label.paint(function (ctx, w, h) { paintStation(ctx, w, h, { title: d.title, live: d.live, liveColor: tc, grade: d.grade, hidden: hidden }); }); }
      var g = d.grade, gc = hidden ? HEX.hidden : gradeTone(g);
      st.torus.material.color.copy(col(gc)); st.torus.material.opacity = hidden ? 0.35 : 0.9; st.torus.visible = hidden || !!g;
      st.dashed.visible = !hidden && !g;
      st.ghost.visible = !hidden && (g === 'C' || g === 'D' || g === 'F'); st.ghost.material.color.copy(col(gc));
      st.rg.material.color.copy(col(gc)); st.rgBase = hidden ? 0.12 : g ? 0.6 : 0.2;
      st.wob = hidden ? 0 : g ? (WOB[g] || 0) : 0.04;
      st.glow.material.color.copy(col(tc));
      st.glowBase = hidden ? 0 : tone === 'working' ? 0.9 : tone === 'waiting' ? 0.55 : tone === 'failing' ? 0.7 : tone === 'gather' ? 0.5 : tone === 'watch' ? 0.45 : 0.12;
      st.lsBase = hidden ? 0.55 : 1;
      this._syncSlabs(st, hidden ? 0 : Math.min(4, d.waiting || 0));
      this._syncStreams(st, d.duties || []);
      this._syncThreads(st, d.threads || []);
    }
    _applyCore(d) {
      var C = this._core; C.data = d; var tc = TONE[d.liveTone] || HEX.muted, name = this._store.name || '';
      var sig = [name, d.live, tc, d.grade].join('|');
      if (sig !== C.sig) { C.sig = sig; C.label.paint(function (ctx, w, h) { paintCore(ctx, w, h, { name: name, live: d.live, liveColor: tc, grade: d.grade }); }); }
      var gc = gradeTone(d.grade); C.ring.material.color.copy(col(gc)); C.rg.material.color.copy(col(gc)); C.ring.material.opacity = d.grade ? 0.75 : 0.3; C.wob = d.grade ? (WOB[d.grade] || 0) : 0.05; C.waiting = d.waiting || 0;
    }
    _makeSlab(st) {
      var mat = new THREE.MeshBasicMaterial({ map: this._heldTex.tex, transparent: true, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }); mat.userData.own = true;
      var m = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.69), mat); m.renderOrder = 5; st.slabG.add(m); return m;
    }
    _syncSlabs(st, n) {
      while (st.slabs.length > n) { var s = st.slabs.pop(); st.slabG.remove(s); s.material.dispose(); s.geometry.dispose(); }
      while (st.slabs.length < n) st.slabs.push(this._makeSlab(st));
    }
    _makeStream(st, j, total) {
      var n = 30, geo = new THREE.BufferGeometry(), arr = new Float32Array(n * 3);
      geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
      var mat = new THREE.PointsMaterial({ size: 0.34, map: this._dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: col(HEX.lime), opacity: 0.5, toneMapped: false });
      var pts = new THREE.Points(geo, mat); pts.frustumCulled = false; pts.renderOrder = 3; pts.rotation.order = 'YXZ';
      pts.rotation.set(TILT + (j - (total - 1) / 2) * 0.55, st.angle + j * 0.9, 0);
      st.group.add(pts);
      return { pts: pts, arr: arr, geo: geo, mat: mat, n: n, phase: Math.random() * Math.PI * 2, speed: 0.5, radius: RING_R * (0.78 + 0.1 * j), look: { op: 0.5 }, running: false };
    }
    _syncStreams(st, duties) {
      var self = this, ids = duties.map(function (d) { return d.id; }).join(',');
      if (ids !== st.streamSig) {
        st.streamSig = ids;
        st.streams.forEach(function (s) { st.group.remove(s.pts); s.geo.dispose(); s.mat.dispose(); }); st.streams = [];
        duties.forEach(function (d, j) { st.streams.push(self._makeStream(st, j, duties.length)); });
      }
      duties.forEach(function (d, j) { var s = st.streams[j]; if (!s) return; var L = streamLook(d, st.hidden); s.look = L; s.speed = L.speed; s.mat.color.copy(col(L.color)); s.mat.opacity = L.op; s.mat.size = L.size; s.running = d.phase === 'running'; });
    }
    _syncThreads(st, statuses) {
      var sig = statuses.join(','); if (sig === st.threadSig) return; st.threadSig = sig;
      var self = this; st.threads.forEach(function (l) { self._scene.remove(l); l.geometry.dispose(); l.material.dispose(); }); st.threads = [];
      var a = st.base.clone().add(new THREE.Vector3(0, 0.1, 0)), b = new THREE.Vector3(0, CORE_Y - 0.2, 0);
      statuses.forEach(function (s, k) {
        var mid = a.clone().add(b).multiplyScalar(0.5); mid.y -= 1.4 + k * 0.35;
        mid.add(new THREE.Vector3(-st.dir.z, 0, st.dir.x).multiplyScalar((k % 2 ? 1 : -1) * (0.4 + k * 0.25)));
        var c = s === 'executed' ? HEX.lime : s === 'prepared' ? HEX.warn : s === 'blocked' ? HEX.err : HEX.muted, faint = s === 'undone' || s === 'rejected';
        var line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(48)), new THREE.LineBasicMaterial({ color: col(c), transparent: true, opacity: faint ? 0.06 : 0.17, toneMapped: false }));
        self._scene.add(line); st.threads.push(line);
      });
    }
    setDay(ticks) {
      this._ticksPending = ticks; if (!this._built) return; this._ticksPending = null;
      var self = this, D = this._day;
      this._ticks.forEach(function (t) { D.group.remove(t.dot); D.group.remove(t.ls); t.ls.material.map.dispose(); t.ls.material.dispose(); t.dot.material.dispose(); }); this._ticks = [];
      var prevMin = -1e9, level = 0;
      (ticks || []).slice().sort(function (a, b) { return a.min - b.min; }).forEach(function (t) {
        level = (t.min - prevMin < 40) ? level + 1 : 0; prevMin = t.min;
        var a = (t.min / 1440) * Math.PI * 2, x = Math.sin(a), z = -Math.cos(a);
        var c = t.status === 'done' || t.status === 'running' ? HEX.lime : t.status === 'skipped' ? HEX.muted : HEX.cream;
        var op = t.status === 'done' ? 0.95 : t.status === 'running' ? 1 : t.status === 'skipped' ? 0.22 : 0.45;
        var dot = self._glow(t.status === 'running' ? 0.8 : 0.42, op, self._whiteGlow, c); dot.position.set(x * DAY_R, 0, z * DAY_R); D.group.add(dot);
        var lt = self._texRaw(360, 80, function (ctx, w, h) { paintSmall(ctx, w, h, t.label, c); });
        var ls = new THREE.Sprite(new THREE.SpriteMaterial({ map: lt, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 })); ls.scale.set(2.1, 0.47, 1);
        var lr = DAY_R + 1.5 + level * 0.52; ls.position.set(x * lr, 0.02, z * lr); D.group.add(ls);
        self._ticks.push({ dot: dot, ls: ls, running: t.status === 'running', lsOp: t.status === 'skipped' ? 0.35 : t.status === 'coming' ? 0.6 : 0.9 });
      });
    }
    setClock(h) {
      this._hour = h; if (!this._skyU) return;
      var day = Math.max(0, Math.sin((h - 6) / 12 * Math.PI)), dawn = Math.exp(-Math.pow(h - 6.3, 2) / 0.8) + Math.exp(-Math.pow(h - 18.2, 2) / 0.8), night = 1 - Math.min(1, day * 1.6);
      this._daylight = day; this._night = night;
      var az = (h - 6) / 12 * Math.PI, el = Math.sin(az), dir = new THREE.Vector3(-Math.cos(az) * 0.95, el, 0.32).normalize();
      var U = this._skyU, mix = function (a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; };
      var top = mix(SKY.night.top, SKY.day.top, day), hor = mix(SKY.night.hor, SKY.day.hor, day), bot = mix(SKY.night.bot, SKY.day.bot, day);
      U.top.value.setRGB(top[0], top[1], top[2]); U.hor.value.setRGB(hor[0], hor[1], hor[2]); U.bot.value.setRGB(bot[0], bot[1], bot[2]);
      U.glowDir.value.copy(dir); U.glowAmt.value = dawn * 0.9 + day * 0.22;
      this._sun.position.copy(dir).multiplyScalar(330); this._sun.material.opacity = el > -0.04 ? 0.3 + day * 0.4 : 0; this._sun.material.color.copy(col('#ffb36b')).lerp(col('#fff6e8'), Math.min(1, day / 0.4));
      this._stars.material.opacity = Math.pow(night, 2) * 0.85; this._moon.material.opacity = night * 0.35;
      this._hemi.intensity = 0.35 + day * 0.7; this._hemi.color.copy(col('#3a4150')).lerp(col('#d7dccd'), day); this._ambient.intensity = 0.45 + day * 0.4;
      this._mist.material.color.copy(col('#2b3340')).lerp(col('#7e8b96'), day).lerp(col('#7a4a2e'), Math.min(1, dawn) * 0.5); this._mist.material.opacity = 0.35 + day * 0.2;
    }

    /* ---------- Nova: the light in the filaments ---------- */
    /* Nova is concurrent: links[] = [{room, dutyId, kind: 'work'|'live'|'gather'|'watch'}]. One filament per linked station; a station with several links shows its strongest. */
    setNova(spec) {
      spec = spec || {}; var links = spec.links;
      if (!links) links = (spec.room && spec.room !== 'home' && spec.state && spec.state !== 'idle') ? [{ room: spec.room, dutyId: spec.dutyId || null, kind: spec.state === 'working' ? 'work' : 'watch' }] : [];
      this._nova = { room: spec.room || null, state: spec.state || 'idle', duty: spec.dutyId || null, links: links };
      if (this._built) this._retarget(false);
    }
    _retarget(silent) {
      var self = this, want = {}, rank = { work: 3, gather: 2, live: 1, watch: 0 };
      (this._nova.links || []).forEach(function (l) { if (!l.room || l.room === 'home' || !self._byKey[l.room]) return; var cur = want[l.room]; if (!cur || rank[l.kind] > rank[cur]) want[l.room] = l.kind; });
      this._fils.forEach(function (f) {
        if (!want[f.key]) { f.dying = true; return; }
        f.dying = false; if (f.kind !== want[f.key]) { f.kind = want[f.key]; f.mat.color.copy(col(KCOL[f.kind] || HEX.lime)); f.mat2.color.copy(col(KCOL[f.kind] || HEX.lime)); }
      });
      Object.keys(want).forEach(function (k) { if (!self._fils.some(function (f) { return f.key === k && !f.dying; })) self._fils.push(self._makeFil(self._byKey[k], want[k], silent)); });
      this._st.forEach(function (s) { s.novaHere = want[s.key] === 'work'; });
    }
    _makeFil(st, kind, silent) {
      var T3 = THREE, a = new T3.Vector3(0, CORE_Y + 0.4, 0), b = st.base.clone().add(new T3.Vector3(0, 0.15, 0)), c = KCOL[kind] || HEX.lime;
      var p1 = a.clone().lerp(b, 0.3); p1.y += 2.4; var p2 = a.clone().lerp(b, 0.85); p2.y += 0.5;  // rises from the core, arrives at ring height under the label
      var curve = new T3.CubicBezierCurve3(a, p1, p2, b);
      var geo = new T3.TubeGeometry(curve, 80, 0.05, 6, false), mat = new T3.MeshBasicMaterial({ color: col(c), transparent: true, opacity: 0, blending: T3.AdditiveBlending, depthWrite: false, toneMapped: false });
      var mesh = new T3.Mesh(geo, mat); mesh.frustumCulled = false; mesh.renderOrder = 3; this._scene.add(mesh);
      var geo2 = new T3.TubeGeometry(curve, 80, 0.22, 6, false), mat2 = new T3.MeshBasicMaterial({ color: col(c), transparent: true, opacity: 0, blending: T3.AdditiveBlending, depthWrite: false, toneMapped: false });
      var mesh2 = new T3.Mesh(geo2, mat2); mesh2.frustumCulled = false; mesh2.renderOrder = 2; this._scene.add(mesh2);
      return { key: st.key, st: st, kind: kind, curve: curve, mesh: mesh, mat: mat, geo: geo, mesh2: mesh2, mat2: mat2, geo2: geo2, packets: [], arrived: !!silent, dying: false, alpha: silent ? 1 : 0, burst: 0, nextBurst: 2 + Math.random() * 6, seed: Math.random() };
    }
    _killFil(f) {
      var self = this; this._scene.remove(f.mesh); this._scene.remove(f.mesh2); f.geo.dispose(); f.geo2.dispose(); f.mat.dispose(); f.mat2.dispose();
      f.packets.forEach(function (p) { self._scene.remove(p); p.material.dispose(); });
    }
    resolve(key, verdict) {
      var st = this._byKey[key]; if (!st || st === this._core || !this._built) return;
      var slab = st.slabs.pop() || this._makeSlab(st);
      var wp = new THREE.Vector3(); slab.updateWorldMatrix(true, false); slab.getWorldPosition(wp); st.slabG.remove(slab); this._scene.add(slab); slab.position.copy(wp);
      var to = new THREE.Vector3(0, CORE_Y + 0.5, 0), mid = wp.clone().add(to).multiplyScalar(0.5); mid.y += 2.6;
      this._flights.push({ mesh: slab, curve: new THREE.QuadraticBezierCurve3(wp.clone(), mid, to), t: 0, verdict: verdict, from: wp.clone() });
    }

    /* ---------- cameras ---------- */
    focusRoom(key) {
      var st = this._byKey[key]; if (!st) return;
      this._focus = key; this._flying = true;
      if (st === this._core) { this._og.target.set(0, CORE_Y, 0); this._og.pitch = 0.3; this._og.rad = 10.5; }
      else { var c = st.cam; this._og.target.set(c.target[0], c.target[1], c.target[2]); this._og.yaw = this._o.yaw + wrap(c.yaw - this._o.yaw); this._og.pitch = c.pitch; this._og.rad = c.radius; }
      this._setSelected(key);
    }
    overview() {
      this._focus = null; this._flying = false;
      this._og.target.set(0, CORE_Y - 0.2, 0); this._og.pitch = 0.62; this._og.rad = this._ovRad;
      this._setSelected(null);
    }
    flyTo(spec) {
      spec = spec || {}; this._focus = null; this._flying = true;
      if (spec.target) this._og.target.set(spec.target[0], spec.target[1], spec.target[2]);
      if (spec.yaw != null) this._og.yaw = this._o.yaw + wrap(spec.yaw - this._o.yaw);
      if (spec.pitch != null) this._og.pitch = spec.pitch; if (spec.radius != null) this._og.rad = spec.radius;
      this._setSelected(null);
    }
    _setSelected(key) {
      this._selected = key;
      this._st.forEach(function (s) { s.presentGoal = s.key === key ? 1 : 0; s.selGoal = s.key === key ? 0.9 : 0; });
      this._core.selGoal = key === 'home' ? 0.45 : 0;
    }

    /* ---------- input ---------- */
    _touch() {
      this._lastInput = performance.now();
      if (this._lastInput - this._lastInteractEvt > 400) { this._lastInteractEvt = this._lastInput; this.dispatchEvent(new CustomEvent('field-interact', { bubbles: true })); }
    }
    _bindInput() {
      var self = this, el = this._renderer.domElement, down = null, moved = 0;
      el.addEventListener('pointerdown', function (e) { down = { x: e.clientX, y: e.clientY }; moved = 0; try { el.setPointerCapture(e.pointerId); } catch (err) {} el.style.cursor = 'grabbing'; self._touch(); });
      el.addEventListener('pointermove', function (e) {
        self._mouse = { x: e.clientX, y: e.clientY }; self._hoverDirty = true;
        if (!down) return;
        var dx = e.clientX - down.x, dy = e.clientY - down.y; down = { x: e.clientX, y: e.clientY }; moved += Math.abs(dx) + Math.abs(dy);
        self._og.yaw -= dx * 0.005; self._og.pitch = clamp(self._og.pitch + dy * 0.004, 0.06, 1.5); self._o.yaw = self._og.yaw - wrap(self._og.yaw - self._o.yaw);
        self._touch();
      });
      el.addEventListener('pointerup', function () { if (!down) return; down = null; el.style.cursor = 'grab'; if (moved < 6) self._click(); });
      el.addEventListener('pointercancel', function () { down = null; el.style.cursor = 'grab'; });
      el.addEventListener('pointerleave', function () { self._mouse = null; self._setHover(null); });
      el.addEventListener('wheel', function (e) { e.preventDefault(); self._touch(); self._og.rad = clamp(self._og.rad * (1 + Math.sign(e.deltaY) * 0.08), 4, 90); }, { passive: false });
    }
    _pick() {
      if (!this._mouse || !this._hits.length) return null;
      var rect = this._renderer.domElement.getBoundingClientRect();
      var nx = ((this._mouse.x - rect.left) / rect.width) * 2 - 1, ny = -((this._mouse.y - rect.top) / rect.height) * 2 + 1;
      this._ray = this._ray || new THREE.Raycaster(); this._ray.setFromCamera({ x: nx, y: ny }, this._camera);
      var hits = this._ray.intersectObjects(this._hits, false);
      return hits.length ? hits[0].object.userData.key : null;
    }
    _click() { var key = this._pick(); if (!key) return; this.focusRoom(key); this.dispatchEvent(new CustomEvent('field-select', { bubbles: true, detail: { key: key } })); }
    _setHover(key) {
      if (key === this._hover) { if (key && this._mouse && this._tip) this._placeTip(); return; }
      this._hover = key; var self = this;
      this._st.forEach(function (s) { if (s.key !== self._selected) s.selGoal = s.key === key ? 0.45 : 0; });
      if (this._selected !== 'home') this._core.selGoal = key === 'home' ? 0.4 : 0;
      if (this._tip) { if (key && this._byKey[key]) { var d = this._byKey[key].data || {}, title = key === 'home' ? (this._store.name || 'The core') : (d.title || key); this._tip.textContent = title + (d.live ? ' · ' + d.live : ''); this._tip.style.opacity = '1'; this._placeTip(); } else this._tip.style.opacity = '0'; }
      this._renderer.domElement.style.cursor = key ? 'pointer' : 'grab';
      this.dispatchEvent(new CustomEvent('field-hover', { bubbles: true, detail: { key: key } }));
    }
    _placeTip() { var rect = this.getBoundingClientRect(); this._tip.style.left = (this._mouse.x - rect.left) + 'px'; this._tip.style.top = (this._mouse.y - rect.top) + 'px'; }

    /* ---------- frame ---------- */
    _loop() {
      if (this._paused) { this._raf = 0; return; }
      var self = this; this._raf = requestAnimationFrame(function () { self._loop(); });
      var raw = this._clock.getDelta(), dt = Math.min(0.05, raw), t = this._clock.elapsedTime, now = performance.now(), cam = this._camera;
      if (raw < 0.5) this._govern(raw);
      if (this._auto && now - this._lastInput > 4000) { if (!this._focus && !this._flying) this._og.yaw += dt * 0.04; else this._og.yaw += Math.cos(t * 0.25) * dt * 0.015; }
      var o = this._o, g = this._og, k = 1 - Math.exp(-dt * 3.2);
      o.yaw += wrap(g.yaw - o.yaw) * k; o.pitch += (g.pitch - o.pitch) * k; o.rad += (g.rad - o.rad) * k; o.target.lerp(g.target, k);
      var gp = this._gp; gp.set(o.target.x + o.rad * Math.sin(o.yaw) * Math.cos(o.pitch), o.target.y + o.rad * Math.sin(o.pitch), o.target.z + o.rad * Math.cos(o.yaw) * Math.cos(o.pitch));
      var kc = 1 - Math.exp(-dt * 6); cam.position.lerp(gp, kc); this._look.lerp(o.target, kc); cam.lookAt(this._look);
      if (this._hoverDirty && this._mouse) { this._hoverDirty = false; this._setHover(this._pick()); }
      var dl = this._daylight, right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion), rl = Math.hypot(right.x, right.z) || 1, rx = right.x / rl, rz = right.z / rl;
      var working = this._nova.state === 'working', vh = this._renderer.domElement.clientHeight || 600, tanF = Math.tan(cam.fov * Math.PI / 360), focusAny = !!this._focus, focusHome = this._focus === 'home', tmp = this._tmpV || (this._tmpV = new THREE.Vector3());
      // labels keep a near-constant screen size (a little bigger near, smaller far), shrink with small canvases, and thin out when you fly in — the sheet carries the words then
      var lk = clamp(vh / 760, 0.55, 1), fitLabel = function (sprite, aspect, basePx, minPx, maxPx) { sprite.getWorldPosition(tmp); var d = cam.position.distanceTo(tmp), px = clamp(basePx * lk * Math.pow(26 / d, 0.35), minPx * lk, maxPx * lk), hgt = px * 2 * d * tanF / vh; sprite.scale.set(hgt * aspect, hgt, 1); return d; };
      var cv = this._coreView || 0, cvGoal = focusHome ? 1 : (!focusAny && o.rad < 22 ? clamp((22 - o.rad) / 8, 0, 1) : 0); cv += (cvGoal - cv) * Math.min(1, dt * 4); this._coreView = cv; var nearCore = cv;
      for (var i = 0; i < this._st.length; i++) {
        var st = this._st[i];
        st.present += (st.presentGoal - st.present) * Math.min(1, dt * 3);
        st.group.position.set(st.base.x + st.dir.x * 0.9 * st.present, st.base.y + 0.35 * st.present, st.base.z + st.dir.z * 0.9 * st.present);
        var w = st.wob; st.rings.rotation.x = TILT + w * Math.sin(t * 1.7 + st.i); st.rings.rotation.z = w * Math.sin(t * 1.3 + st.i * 0.7);
        if (st.ghost.visible) { st.ghost.rotation.x = w * 1.6 * Math.sin(t * 2.3 + st.i); st.ghost.rotation.y = w * 1.6 * Math.cos(t * 1.9 + st.i); }
        st.flash = Math.max(0, st.flash - dt * 0.7); var fl = st.flash;
        st.rg.material.opacity = st.rgBase + fl * 0.6;
        st.sel.material.opacity += (st.selGoal - st.sel.material.opacity) * Math.min(1, dt * 6);
        var ld = fitLabel(st.ls, 3.6, 44, 24, 56), farSide = clamp((ld - o.rad) / (R * 0.9), 0, 1), lsGoal = focusAny ? (st.key === this._focus ? 0 : 0.28) : st.lsBase * clamp(1.25 - (ld - 26) / 40, 0.55, 1) * (1 - 0.7 * farSide);  // stations behind the core step back
        st.lsOp += (lsGoal - st.lsOp) * Math.min(1, dt * 5); st.ls.material.opacity = st.lsOp;
        var wk = st.novaHere && working, pulse = wk ? 1 + 0.18 * Math.sin(t * 5) : 1 + 0.05 * Math.sin(t * 1.4 + st.i);
        st.glow.material.opacity = Math.min(1, (st.glowBase + fl * 0.5) * (1 - dl * 0.4) * pulse); var gs = 3.2 * pulse * (wk ? 1.35 : 1) * clamp(ld / 12, 0.5, 1); st.glow.scale.set(gs, gs, 1);
        for (var j = 0; j < st.slabs.length; j++) { var s = st.slabs[j], n = st.slabs.length, off = (j - (n - 1) / 2) * 0.46; s.quaternion.copy(cam.quaternion); s.position.set(rx * off, 0.62 + 0.06 * Math.sin(t * 1.6 + j), rz * off); }
        for (var q = 0; q < st.streams.length; q++) {
          var sm = st.streams[q]; sm.phase += sm.speed * dt; var arr = sm.arr, pn = sm.n, rad = sm.radius;
          for (var p = 0; p < pn; p++) { var u = p / pn, a = sm.phase - u * u * 4.4; arr[p * 3] = Math.cos(a) * rad; arr[p * 3 + 1] = Math.sin(a) * rad; arr[p * 3 + 2] = Math.sin(a * 3 + sm.phase) * 0.05; }
          sm.geo.attributes.position.needsUpdate = true;
          if (sm.running) sm.mat.opacity = sm.look.op * (0.8 + 0.2 * Math.sin(t * 6));
        }
      }
      // the core breathes slowly when no work is out (live lines stay open all day and don't count); quicker while she works
      var C = this._core, U = this._orbU, home = !this._fils.some(function (f) { return !f.dying && f.kind !== 'live'; }), breathe = Math.sin(t * Math.PI * 2 / (home ? 4 : 2.6));
      C.flash = Math.max(0, C.flash - dt * 1.4); if (C.flash > C.prevFlash + 0.5) { C.rip[C.ripI % 3] = t; C.ripI++; U.uRip.value = C.rip.slice(); } C.prevFlash = C.flash;
      var eT = (home ? 0.28 : 0.6) + breathe * 0.04 + C.flash * 0.5; C.energy += (eT - C.energy) * Math.min(1, dt * 2);
      var gz = this._gaze; gz.copy(cam.position).sub(C.group.position).normalize();
      var lead = this._fils.filter(function (f) { return !f.dying && f.kind !== 'live'; })[0];
      if (lead) { tmp.copy(lead.st.base).sub(C.group.position).normalize(); gz.lerp(tmp, 0.35).normalize(); }
      U.uGaze.value.lerp(gz, Math.min(1, dt * 2.5)).normalize(); U.uTime.value = t; U.uEnergy.value = C.energy; U.uFlash.value = C.flash;
      var sc = 1 + breathe * 0.012; C.orb.scale.set(sc, sc, sc);
      var gs = 4.2 + C.energy * 1.2 + C.flash * 1.5; C.glow.scale.set(gs, gs, 1); C.glow.material.opacity = Math.min(1, 0.2 + C.energy * 0.45 + C.flash * 0.6) * (1 - dl * 0.4);
      C.light.intensity = (0.9 + C.energy * 1.2) * (1 - dl * 0.4);
      C.ringG.rotation.x = Math.PI / 2 - 0.35 + C.wob * Math.sin(t * 1.5); C.ringG.rotation.z = C.wob * Math.sin(t * 1.1);
      C.sel.material.opacity += (C.selGoal - C.sel.material.opacity) * Math.min(1, dt * 6);
      fitLabel(C.ls, 3.8, 46, 26, 58); var cGoal = focusAny ? (focusHome ? 0 : 0.28) : 1; C.lsOp += (cGoal - C.lsOp) * Math.min(1, dt * 5); C.ls.material.opacity = C.lsOp;
      // the day ring
      var D = this._day, ha = this._hour / 24 * Math.PI * 2, hx = Math.sin(ha), hz = -Math.cos(ha), mp = 1 + 0.25 * Math.sin(t * 3);
      D.marker.position.set(hx * DAY_R, 0, hz * DAY_R); D.marker.scale.set(0.7 * mp, 0.7 * mp, 1);
      var hp = D.handPos; hp[0] = hx * (DAY_R - 0.9); hp[2] = hz * (DAY_R - 0.9); hp[3] = hx * DAY_R; hp[5] = hz * DAY_R; D.hand.geometry.attributes.position.needsUpdate = true;
      D.arc.geometry.setDrawRange(0, Math.max(0, Math.floor((D.arcN + 1) * this._hour / 24)));
      D.ring.material.opacity = 0.2 + 0.2 * nearCore;
      for (var hl = 0; hl < D.hourLabels.length; hl++) { var HL = D.hourLabels[hl]; fitLabel(HL, 2, 13, 10, 15); HL.material.opacity = 0.2 + 0.6 * nearCore; }
      for (var m = 0; m < this._ticks.length; m++) { var tk = this._ticks[m]; fitLabel(tk.ls, 4.5, 14, 11, 16); tk.ls.material.opacity = tk.lsOp * nearCore; if (tk.running) { var ps = 1 + 0.3 * Math.sin(t * 4); tk.dot.scale.set(0.8 * ps, 0.8 * ps, 1); } }
      // filaments are connections, not traffic: a link fades in whole, holds with a soft shimmer, and lets go when the work is done
      var KF = { work: { op: 0.9, halo: 0.16 }, gather: { op: 0.5, halo: 0.1 }, live: { op: 0.2, halo: 0.05 }, watch: { op: 0.35, halo: 0.08 } };
      for (var fi = this._fils.length - 1; fi >= 0; fi--) {
        var f = this._fils[fi], K = KF[f.kind] || KF.work;
        if (!f.dying) { f.alpha = Math.min(1, f.alpha + dt * 1.4); if (!f.arrived && f.alpha >= 1) { f.arrived = true; f.st.flash = 1; this.dispatchEvent(new CustomEvent('field-arrive', { bubbles: true, detail: { key: f.key } })); } }
        else { f.alpha -= dt * 1.2; if (f.alpha <= 0) { if (f.kind === 'work' || f.kind === 'gather') C.flash = 1; this._killFil(f); this._fils.splice(fi, 1); continue; } }
        // a live line brightens as a whole when something comes in and is answered
        var boost = 0;
        if (f.kind === 'live') { f.nextBurst -= dt; if (f.nextBurst <= 0) { f.burst = 1.8; f.nextBurst = 6 + Math.random() * 9; } if (f.burst > 0) { f.burst -= dt; boost = clamp(f.burst / 1.8, 0, 1); } }
        var shimmer = 1 + 0.08 * Math.sin(t * 2.2 + f.seed * 6);
        f.mat.opacity = (K.op + boost * 0.5) * f.alpha * (1 - dl * 0.35) * shimmer; f.mat2.opacity = (K.halo + boost * 0.08) * f.alpha * shimmer;
      }
      // decisions in flight: approved flies to the core, rejected sinks
      for (var xi = this._flights.length - 1; xi >= 0; xi--) {
        var fx = this._flights[xi]; fx.t += dt / (fx.verdict === 'approved' ? 1.2 : 1.0); var tt = Math.min(1, fx.t), e = 1 - Math.pow(1 - tt, 3);
        fx.mesh.quaternion.copy(cam.quaternion);
        if (fx.verdict === 'approved') { fx.mesh.position.copy(fx.curve.getPoint(e)); var sc = 1 - 0.75 * e; fx.mesh.scale.set(sc, sc, 1); fx.mesh.material.opacity = 1 - tt * 0.5; fx.mesh.rotateZ(dt * 3); if (tt >= 1) C.flash = 1; }
        else { fx.mesh.position.set(fx.from.x, fx.from.y - 2.2 * tt * tt, fx.from.z); fx.mesh.material.opacity = 1 - tt; fx.mesh.rotateX(-dt * 1.6); }
        if (tt >= 1) { this._scene.remove(fx.mesh); fx.mesh.material.dispose(); fx.mesh.geometry.dispose(); this._flights.splice(xi, 1); }
      }
      this._renderer.render(this._scene, this._camera);
    }
  }
  customElements.define('nova-field-3d', NovaField3D);
})();
