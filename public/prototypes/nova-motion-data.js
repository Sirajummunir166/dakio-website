/* Nova Motion Ads — data module (products, store theme → ad brand engine, templates, motion recipes)
   Loaded as a classic script; exposes window.NMA_DATA. Kept separate from the DC so engineering can pull it standalone. */
window.NMA_DATA = (() => {
  // ---- formats ----
  const FORMATS = {
    square:   { w:1080, h:1080, label:'1:1',  sub:'Feed · 1080×1080',  safe:{ top:54,  bottom:54  } },
    portrait: { w:1080, h:1350, label:'4:5',  sub:'Feed · 1080×1350',  safe:{ top:54,  bottom:54  } },
    story:    { w:1080, h:1920, label:'9:16', sub:'Story · 1080×1920', safe:{ top:220, bottom:250 } } };
  const FMT_KEYS = ['square','portrait','story'];

  // ---- store theme model — mirrors Dakio Store Studio (theme = {p,f,c} into PAL/FON/COR) ----
  const PAL = {
    porcelain:{name:'Porcelain & Ink', bg:'#FAF7F1', surface:'#FFFFFF', ink:'#1D1A16', accent:'#1D1A16', accentInk:'#FAF7F1'},
    sage:{name:'Sage Court', bg:'#F1F4EA', surface:'#FBFCF7', ink:'#22291C', accent:'#4C7A3F', accentInk:'#F2F6E9'},
    terra:{name:'Terracotta', bg:'#F8F1E8', surface:'#FFFBF4', ink:'#2B211B', accent:'#C05A38', accentInk:'#FFF3EC'},
    noir:{name:'Noir', bg:'#141511', surface:'#1E1F1A', ink:'#F0EFE6', accent:'#D8CB9A', accentInk:'#191713'},
    lime:{name:'Lime & Ink', bg:'#EFF1E9', surface:'#FBFCF7', ink:'#1A1D12', accent:'#C6F035', accentInk:'#1A1D12'},
    blush:{name:'Blush Clay', bg:'#F9F1EF', surface:'#FFFAF8', ink:'#33221E', accent:'#B4574E', accentInk:'#FFF3F0'} };
  const FON = {
    clean:{name:'Clean', h:"'Hanken Grotesk',sans-serif", b:"'Hanken Grotesk',sans-serif", hw:700, ls:-0.03},
    editorial:{name:'Editorial', h:"'Instrument Serif',serif", b:"'Hanken Grotesk',sans-serif", hw:400, ls:-0.015},
    bold:{name:'Statement', h:"'Archivo',sans-serif", b:"'Archivo',sans-serif", hw:800, ls:-0.04},
    boutique:{name:'Boutique', h:"'Cormorant Garamond',serif", b:"'Karla',sans-serif", hw:600, ls:-0.005} };
  const COR = { sharp:{n:'Sharp', img:6, btn:8}, soft:{n:'Soft', img:28, btn:22}, round:{n:'Round', img:40, btn:999} };

  const STORE = { name:'Shahrqee', logoText:'SHAHRQEE', tagline:'Handloom fashion from Narayanganj',
    url:'shahrqee.dakio.shop', theme:{ p:'porcelain', f:'editorial', c:'soft' } };

  // ---- color math ----
  const rgb = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const hex = (r,g,b) => '#' + [r,g,b].map(x => Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0')).join('').toUpperCase();
  const mix = (a,b,t) => { const A=rgb(a), B=rgb(b); return hex(A[0]+(B[0]-A[0])*t, A[1]+(B[1]-A[1])*t, A[2]+(B[2]-A[2])*t); };
  const lum = h => { const [r,g,b] = rgb(h).map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055,2.4); }); return 0.2126*r+0.7152*g+0.0722*b; };
  const contrast = (a,b) => { const l1=lum(a), l2=lum(b); return (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05); };
  const isWarm = h => { const [r,g,b]=rgb(h); return r>g && r>b; };

  /* Brand engine: expands the 5-color store palette + font pairing + corner scale into
     the 11 semantic ad roles. Deterministic — no AI calls. Returns {roles, fonts, corners, checks, notes}. */
  function deriveBrand(theme, mode){ // mode: 'brand' | 'light' | 'dark' | 'template'
    const notes = [];
    if(mode === 'template'){
      const roles = { background:'#F2F0EB', surface:'#FFFFFF', primary:'#1C1C1C', secondary:'#75756A', heading:'#141414',
        body:'#3C3C36', muted:'#8C8C82', offer:'#C24234', cta:'#141414', ctaText:'#FFFFFF', decorativeAccent:'#DDD9CB' };
      return { roles, fonts:{ h:FON.clean.h, b:FON.clean.b, hw:700, ls:-0.03, bn:"'Hind Siliguri',sans-serif" },
        corners:{ img:24, btn:14 }, checks:checks(roles), notes:['Neutral template style — store brand not applied'] };
    }
    const P = PAL[theme.p] || PAL.porcelain, F = FON[theme.f] || FON.editorial, C = COR[theme.c] || COR.soft;
    const dark = mode === 'dark' || (mode === 'brand' && lum(P.bg) < 0.35);
    let bg, ink;
    if(dark){ bg = lum(P.bg) < 0.35 ? P.bg : mix(P.ink,'#0C0B08',0.55); ink = lum(P.ink) > 0.5 ? P.ink : mix(P.bg,'#FFFFFF',0.7);
      if(mode==='dark' && lum(P.bg) >= 0.35) notes.push('Dark surfaces derived from your ink color'); }
    else { bg = lum(P.bg) >= 0.35 ? P.bg : '#F7F4EC'; ink = lum(P.ink) < 0.5 ? P.ink : '#221F1A';
      if(mode==='light' && lum(P.bg) < 0.35) notes.push('Light surfaces derived — your palette is dark'); }
    const surface = dark ? mix(bg,'#FFFFFF',0.06) : (lum(P.surface) >= 0.35 && mode!=='dark' ? P.surface : mix(bg,'#FFFFFF',0.55));
    let cta = P.accent, ctaText = P.accentInk;
    if(contrast(cta, ctaText) < 4.5){ ctaText = lum(cta) > 0.4 ? '#1A1D12' : '#FFFFFF'; notes.push('CTA text re-derived for contrast'); }
    if(contrast(cta, bg) < 1.3){ cta = dark ? mix(P.accent,'#FFFFFF',0.25) : mix(P.accent,'#000000',0.25); ctaText = lum(cta) > 0.4 ? '#1A1D12' : '#FFFFFF'; notes.push('CTA shade shifted off the background'); }
    const accentIsInk = P.accent.toUpperCase() === P.ink.toUpperCase();
    const primary = accentIsInk ? ink : (contrast(P.accent, bg) >= 2.2 ? P.accent : mix(P.accent, ink, 0.45));
    if(primary !== P.accent && !accentIsInk) notes.push('Primary deepened for readability');
    let offer = isWarm(P.accent) && !accentIsInk ? mix(P.accent,'#8A1F12',0.35) : (dark ? '#E4685A' : '#B03A2E');
    if(contrast(offer, bg) < 3){ offer = dark ? mix(offer,'#FFFFFF',0.3) : mix(offer,'#000000',0.3); notes.push('Offer red adjusted for contrast'); }
    let muted = mix(ink, bg, 0.45);
    if(contrast(muted, bg) < 3){ muted = mix(ink, bg, 0.3); if(contrast(muted, bg) < 3) muted = mix(ink, bg, 0.15); }
    const roles = { background:bg, surface, primary, secondary:mix(primary, bg, 0.35), heading:ink,
      body:mix(ink, bg, 0.18), muted, offer, cta, ctaText, decorativeAccent:mix(accentIsInk ? ink : P.accent, bg, 0.8) };
    return { roles, fonts:{ h:F.h, b:F.b, hw:F.hw, ls:F.ls, bn:"'Hind Siliguri',sans-serif" },
      corners:{ img:C.img, btn:C.btn }, checks:checks(roles), notes };
  }
  function checks(R){ const row = (label,a,b,min) => ({ label, ratio:Math.round(contrast(a,b)*10)/10, ok:contrast(a,b) >= min });
    return [ row('Heading on background', R.heading, R.background, 4.5), row('Body on background', R.body, R.background, 4.5),
      row('CTA label on CTA', R.ctaText, R.cta, 4.5), row('Offer on background', R.offer, R.background, 3) ]; }

  // ---- catalogue (Shahrqee — same items as Store Studio's catalog) ----
  const PRODUCTS = [
    { id:'pr1', name:'Jamdani Wrap Saree', price:6800, was:8200, cat:'Sarees', stock:12, sold:'1,200+ sold',
      benefit:'Handwoven on pit looms in Narayanganj', features:['Fine 84-count cotton', 'Woven by 34 weaving families', 'Ships in 2 days, nationwide'],
      problem:'Tired of “handloom” that turns out to be powerloom?', review:{ text:'The weave is unreal — my mother thought it was her wedding jamdani. অসাধারণ!', name:'Farhana R., Dhanmondi', rating:'4.9' },
      pair:'pr7', img:{ a:'#6E2B26', b:'#C99A5B', st:'#F1E4CE', mono:'JW' },
      imgs:[ { label:'Front drape', pat:'weave', flip:0, a:'#6E2B26', b:'#C99A5B', st:'#F1E4CE', mono:'JW' },
        { label:'Weave close-up', pat:'check', flip:0.22, a:'#7A3A2E', b:'#D9B072', st:'#F6ECD8', mono:'JW' },
        { label:'Border detail', pat:'diagonal', flip:0.1, a:'#5C241F', b:'#C08A4B', st:'#EFE0C6', mono:'JW' },
        { label:'On model', pat:'weave', flip:0.35, a:'#84403A', b:'#D9AE86', st:'#F8EFE2', mono:'JW' } ] },
    { id:'pr9', name:'Half-silk Saree — Teal', price:5400, was:6200, cat:'Sarees', stock:6, sold:'380+ sold',
      benefit:'Half-silk sheen, everyday weight', features:['60% silk, 40% cotton', 'Colourfast azo-free dye', 'Free blouse piece included'],
      problem:'Silk look, but make it wearable on a Tuesday?', review:{ text:'Wore it to a mehndi and got asked for the link five times.', name:'Nusrat J., Uttara', rating:'4.8' },
      pair:'pr5', img:{ a:'#1F5E63', b:'#8FC1BE', st:'#E7F2EF', mono:'HS' },
      imgs:[ { label:'Front', pat:'weave', flip:0, a:'#1F5E63', b:'#8FC1BE', st:'#E7F2EF', mono:'HS' },
        { label:'Pallu detail', pat:'diagonal', flip:0.15, a:'#174A4E', b:'#7BB0AC', st:'#DDEDE9', mono:'HS' },
        { label:'Customer photo', lowRes:true, pat:'check', flip:0.4, a:'#3A6E70', b:'#A8C8C4', st:'#EAF2EF', mono:'HS' } ] },
    { id:'pr3', name:'Silk Kameez Set', price:4950, was:null, cat:'Kameez & Kurtis', stock:8, sold:'210+ sold',
      benefit:'Three-piece set, ready to wear', features:['Kameez, salwar & dupatta', 'Pre-shrunk, machine washable', 'Sizes 36–46'],
      problem:'Eid outfit still not sorted?', review:{ text:'Fit was perfect straight out of the packet. Zero alterations.', name:'Sadia K., Chattogram', rating:'4.7' },
      pair:'pr4', img:{ a:'#5A3A6B', b:'#C9A5D6', st:'#F0E6F4', mono:'SK' },
      imgs:[ { label:'Full set', pat:'weave', flip:0, a:'#5A3A6B', b:'#C9A5D6', st:'#F0E6F4', mono:'SK' },
        { label:'Customer photo', lowRes:true, pat:'check', flip:0.38, a:'#6E4E7E', b:'#D6BCE0', st:'#F4ECF7', mono:'SK' } ] },
    { id:'pr6', name:'Linen Panjabi', price:2900, was:null, cat:'Menswear', stock:10, sold:'540+ sold',
      benefit:'Breathes through a Dhaka summer', features:['European flax linen', 'Mother-of-pearl buttons', 'Regular & slim cuts'],
      problem:'Panjabi that soaks through by the second adhan?', review:{ text:'Jummah to office to dawat — didn’t crease, didn’t cling.', name:'Tanvir A., Banani', rating:'4.8' },
      pair:'pr4', img:{ a:'#2E3A59', b:'#AAB4C8', st:'#E9EDF4', mono:'LP' },
      imgs:[ { label:'Front', pat:'weave', flip:0, a:'#2E3A59', b:'#AAB4C8', st:'#E9EDF4', mono:'LP' },
        { label:'Collar detail', pat:'check', flip:0.18, a:'#26304A', b:'#96A2BA', st:'#E1E7F0', mono:'LP' },
        { label:'On model', pat:'diagonal', flip:0.32, a:'#3C4A6E', b:'#BCC6D8', st:'#EFF2F8', mono:'LP' } ] },
    { id:'pr4', name:'Block-print Scarf', price:1150, was:null, cat:'Accessories', stock:30, sold:'890+ sold',
      benefit:'Hand-blocked in Old Dhaka, no two alike', features:['Soft mul-mul cotton', 'Natural vegetable dyes', 'Gift-wrapped on request'],
      problem:'Need a gift under ৳1,500 that doesn’t look it?', review:{ text:'Bought one as a gift, kept it, ordered two more. Oops.', name:'Lamia H., Sylhet', rating:'4.9' },
      pair:'pr7', img:{ a:'#B4553C', b:'#E8C9A0', st:'#F8EEDD', mono:'BS' },
      imgs:[ { label:'Front', pat:'diagonal', flip:0, a:'#B4553C', b:'#E8C9A0', st:'#F8EEDD', mono:'BS' },
        { label:'Flat lay', pat:'check', flip:0.2, a:'#9E4630', b:'#DDB88C', st:'#F3E6D0', mono:'BS' } ] },
    { id:'pr7', name:'Brass Jhumka Earrings', price:950, was:null, cat:'Accessories', stock:3, sold:'1,050+ sold',
      benefit:'Hand-cast brass, featherweight on the ear', features:['Nickel-free plating', 'Antique matte finish', 'Comes in a kantha pouch'],
      problem:'Statement earrings that don’t pull by 9pm?', review:{ text:'Light enough to forget, loud enough that nobody else does.', name:'Puja S., Khulna', rating:'4.8' },
      pair:'pr1', img:{ a:'#7A5A18', b:'#E3C878', st:'#F6ECCF', mono:'BJ' },
      imgs:[ { label:'Front', pat:'weave', flip:0, a:'#7A5A18', b:'#E3C878', st:'#F6ECCF', mono:'BJ' } ] } ];

  const IMG_VARIANTS = [ { pat:'weave', flip:0 }, { pat:'diagonal', flip:0.18 }, { pat:'check', flip:0.32 } ];
  const CTA_OPTIONS = ['Shop now', 'Order now', 'অর্ডার করুন', 'See the collection', 'bKash · Nagad · COD'];
  const taka = n => '৳' + n.toLocaleString('en-IN');

  // ---- semantic slots (with fallbacks for missing fields) ----
  function slots(P){ const pct = P.was ? Math.round((1 - P.price/P.was)*100) : null;
    const pair = PRODUCTS.find(x => x.id === P.pair) || null;
    const bundle = pair ? Math.round((P.price + pair.price)*0.88/10)*10 : null;
    return { kicker:(STORE.logoText + ' · ' + P.cat).toUpperCase(), productTitle:P.name,
      currentPrice:taka(P.price), previousPrice:P.was ? taka(P.was) : null, discountLabel:pct ? '−' + pct + '%' : null,
      primaryBenefit:P.benefit, b1:P.features[0] || null, b2:P.features[1] || null, b3:P.features[2] || null,
      ctaText:'Shop now', offerBadge:pct ? 'SAVE ' + pct + '%' : 'NEW IN', logoText:STORE.logoText, storeUrl:STORE.url,
      reviewText:'“' + P.review.text + '”', reviewName:P.review.name + ' · Verified buyer', rating:'★★★★★', ratingNum:P.review.rating,
      deliveryBn:'ঢাকায় ফ্রি ডেলিভারি', deliverySub:'Free delivery inside Dhaka — this week only', payLine:'bKash · Nagad · Cash on delivery',
      stockUrgency:P.stock <= 10 ? 'Only ' + P.stock + ' left in stock' : null, sold:P.sold || null,
      problem:P.problem || 'Still scrolling for the right one?', solution:P.benefit,
      pairName:pair ? pair.name : null, bundlePrice:bundle ? taka(bundle) : null,
      bundleWas:pair ? taka(P.price + pair.price) : null, tagline:STORE.tagline };
  }

  // ---- element factories (closured over brand B) ----
  function makers(B){ const R = B.roles, lsPx = s => Math.round(B.fonts.ls * s);
    const el = o => ({ rot:0, op:1, vis:true, lock:false, h:0, bind:null, ...o });
    const tx = (id,bind,text,x,y,w,s={}) => el({ id, type:'text', bind, text, x, y, w,
      style:{ font:s.font||'head', size:s.size||44, weight:s.weight ?? B.fonts.hw, color:R[s.role||'heading'], colorRole:s.role||'heading',
        align:s.align||'left', lh:s.lh||1.06, ls:s.ls ?? lsPx(s.size||44), bg:null, pad:0, rad:0, shadow:!!s.shadow } });
    const body = (id,bind,text,x,y,w,s={}) => tx(id,bind,text,x,y,w,{ font:'body', weight:s.weight??500, size:s.size||30, lh:s.lh||1.42, ls:s.ls??0, role:s.role||'body', align:s.align, shadow:s.shadow });
    const sh = (id,x,y,w,h,s={}) => el({ id, type:'shape', x, y, w, h, rot:s.rot||0, op:s.op??1, lock:!!s.lock,
      style:{ fill:s.fill===null?null:R[s.role||'surface'], fillRole:s.fill===null?null:(s.role||'surface'), rad:s.rad??0,
        border:s.border?R[s.borderRole||'heading']:null, borderRole:s.border?(s.borderRole||'heading'):null, bw:s.bw||0, dash:!!s.dash, shadow:!!s.shadow } });
    const im = (id,x,y,w,h,s={}) => el({ id, type:'product-image', x, y, w, h, imgIdx:s.v||0, imgOf:s.of||'main', rot:s.rot||0,
      style:{ rad:s.rad??B.corners.img, fit:'cover', shadow:!!s.shadow, bri:100, con:100, sat:100, cz:100, cx:50, cy:50 } });
    const bd = (id,bind,text,x,y,w,h,s={}) => el({ id, type:'badge', bind, text, x, y, w, h, rot:s.rot||0,
      style:{ font:s.font||'body', size:s.size||26, weight:s.weight||700, color:R[s.role||'ctaText'], colorRole:s.role||'ctaText',
        bg:R[s.bgRole||'cta'], bgRole:s.bgRole||'cta', rad:s.rad??B.corners.btn, ls:s.ls??1.5, align:'center', lh:1, shadow:!!s.shadow } });
    const logo = (id,x,y,s={}) => tx(id,'logoText','SHAHRQEE',x,y,s.w||420,{ font:'body', size:s.size||27, weight:700, ls:s.ls??5, role:s.role||'heading', align:s.align||'left', lh:1 });
    const url = (id,x,y,w,s={}) => body(id,'storeUrl',STORE.url,x,y,w,{ size:s.size||24, role:s.role||'muted', align:s.align||'center', ls:1, weight:600 });
    return { el, tx, body, sh, im, bd, logo, url };
  }

  // ---- templates: 10 families × 3 deliberate layouts ----
  const TEMPLATES = [
  { id:'spotlight', name:'Product Spotlight', objective:'Conversions', cat:'Any product', desc:'One hero product, price and a clear CTA.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?680:560, ix = (W-iw)/2, iy = st?560:(po?360:300), ty = st?296:(po?128:104);
      const a = [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.sh('ring',ix-70,iy-70,iw+140,iw+140,{role:'decorativeAccent',rad:999,op:0.55}),
        m.im('product',ix,iy,iw,iw,{shadow:true}),
        m.tx('kicker','kicker',S.kicker,90,ty,W-180,{font:'body',size:26,weight:700,ls:6,role:'muted',align:'center'}),
        m.tx('headline','productTitle',S.productTitle,70,ty+52,W-140,{size:st?92:76,align:'center'}),
        m.tx('price','currentPrice',S.currentPrice,90,st?1330:(po?1064:830),W-180,{font:'body',size:st?74:62,weight:800,role:'primary',align:'center',ls:0}) ];
      if(S.previousPrice) a.push(m.body('prev','previousPrice',S.previousPrice,90,st?1412:(po?1140:898),W-180,{size:32,role:'muted',align:'center',strike:true}));
      a.push(m.bd('cta','ctaText',S.ctaText,(W-380)/2,st?1520:(po?1180:938),380,92,{size:30}),
        m.logo('logo',70,st?236:64,{}), m.url('url',0,H-(st?454:(po?68:44)),W));
      return a; } },
  { id:'flash', name:'Flash Sale', objective:'Promotion', cat:'Discounted items', desc:'Loud offer band, big discount, urgency line.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?560:(po?480:430), iy = st?840:(po?560:430), hasPrev = !!S.previousPrice;
      const priceY = st?1424:(po?1058:876), ctaY = st?1508:(po?1140:948), urgY = st?1612:(po?1246:1042);
      const a = [ m.sh('bg',0,0,W,H,{role:'offer',lock:true}),
        m.sh('band',-80,st?520:(po?300:240),W+160,st?230:(po?190:175),{role:'heading',rot:-4}),
        m.tx('headline',null,'FLASH SALE',60,st?300:(po?100:66),W-120,{font:'body',size:st?150:(po?128:118),weight:900,role:'surface',align:'center',ls:-2,lh:0.95}),
        m.tx('sub',null,'This weekend only',0,st?566:(po?352:288),W,{font:'body',size:st?38:36,weight:700,role:'background',align:'center',ls:3}),
        m.im('product',(W-iw)/2,iy,iw,iw,{shadow:true,rad:24}) ];
      if(S.discountLabel) a.push(m.bd('disc','discountLabel',S.discountLabel,W-(st?340:330),iy-60,240,150,{size:64,bgRole:'surface',role:'offer',rot:6,shadow:true,ls:0,weight:900}));
      a.push(m.tx('price','currentPrice',S.currentPrice,0,priceY,hasPrev?W/2-24:W,{font:'body',size:st?64:(po?60:56),weight:900,role:'surface',align:hasPrev?'right':'center',ls:0}));
      if(hasPrev) a.push(m.body('prev','previousPrice',S.previousPrice,W/2+24,priceY+(st?20:18),300,{size:st?32:30,role:'background',align:'left',strike:true}));
      a.push(m.bd('cta','ctaText',S.ctaText,(W-360)/2,ctaY,360,st?92:84,{bgRole:'surface',role:'offer',size:st?32:30}),
        m.body('urgency',null,'Ends Sunday midnight',0,urgY,W,{size:st?26:24,role:'background',align:'center',ls:2,weight:700}));
      return a; } },
  { id:'arrival', name:'New Arrival', objective:'Awareness', cat:'New items', desc:'Editorial, airy — let the product breathe.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const cw = st?720:640, cx = (W-cw)/2, cy = st?520:(po?350:300);
      return [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.sh('rule',90,st?300:100,W-180,3,{role:'heading',op:0.85}),
        m.tx('kicker',null,'NEW ARRIVAL — ' + (S.kicker.split(' · ')[1]||'IN STORE'),90,st?340:136,W-180,{font:'body',size:27,weight:700,ls:7,role:'muted'}),
        m.tx('headline','productTitle',S.productTitle,90,st?400:(po?196:176),W-180,{size:st?104:88,weight:B.fonts.hw,lh:1.02}),
        m.sh('card',cx-30,cy-30,cw+60,cw+60,{role:'surface',rad:B.corners.img+12,shadow:true}),
        m.im('product',cx,cy,cw,cw,{}),
        m.body('benefit1','primaryBenefit',S.primaryBenefit,90,cy+cw+(st?90:66),W-180,{size:32,role:'body'}),
        m.bd('cta','ctaText',S.ctaText,W-90-360,st?H-480:H-170,360,88,{bgRole:'heading',role:'background',size:29}),
        m.logo('logo',90,H-(st?390:(po?152:132)),{size:24,ls:6,role:'muted'}) ]; } },
  { id:'feature', name:'Feature Focus', objective:'Consideration', cat:'Spec-led products', desc:'Product beside the three reasons to buy.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?640:480, ix = st?(W-iw)/2:70, iy = st?420:(po?300:270), tx0 = st?90:600, tw = st?W-180:W-660;
      const by0 = st?1240:(po?560:520);
      const a = [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.im('product',ix,iy,iw,st?760:540,{shadow:true}),
        m.tx('kicker','kicker',S.kicker,st?90:70,st?280:110,W-180,{font:'body',size:25,weight:700,ls:6,role:'muted'}),
        m.tx('headline','productTitle',S.productTitle,st?90:tx0,st?330:(po?200:270),st?W-180:tw,{size:st?84:64}) ];
      ['b1','b2','b3'].forEach((k,i) => { if(!S[k]) return;
        a.push(m.sh('tick'+(i+1),st?90:tx0,by0+i*(st?110:96)+10,26,26,{role:'primary',rad:999}),
          m.body('benefit'+(i+1),k,S[k],(st?90:tx0)+48,by0+i*(st?110:96),st?W-230:tw-48,{size:st?34:29,lh:1.3})); });
      a.push(m.tx('price','currentPrice',S.currentPrice,st?90:tx0,st?1520:(po?920:850),400,{font:'body',size:54,weight:800,role:'primary',ls:0}),
        m.bd('cta','ctaText',S.ctaText,st?W-90-340:tx0,st?1512:(po?1010:940),340,84,{size:28}),
        m.url('url',0,H-(st?304:60),W,{align:st?'center':'right'}));
      return a; } },
  { id:'stock', name:'Limited Stock', objective:'Urgency', cat:'Low-stock items', desc:'Dark, tense, count-what’s-left.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?620:(po?520:480), iy = st?640:(po?430:350);
      return [ m.sh('bg',0,0,W,H,{role:'heading',lock:true}),
        m.im('product',(W-iw)/2,iy,iw,iw,{shadow:true}),
        m.bd('badge',null,(S.stockUrgency||'LOW STOCK').toUpperCase(),(W-520)/2,st?400:(po?200:150),520,86,{bgRole:'offer',role:'surface',size:30,ls:2}),
        m.tx('headline','productTitle',S.productTitle,80,st?520:(po?320:266),W-160,{size:st?88:70,role:'background',align:'center'}),
        m.tx('price','currentPrice',S.currentPrice,0,iy+iw+(st?70:(po?24:60)),W,{font:'body',size:64,weight:800,role:'background',align:'center',ls:0}),
        m.sh('strip',0,st?H-470:(po?H-200:iy+iw),W,st?110:(po?96:60),{role:'offer',op:0.16}),
        m.body('urgency',null,'When it’s gone, the loom takes 6 weeks',0,st?H-442:(po?H-172:iy+iw+8),W,{size:28,role:'background',align:'center',weight:600}),
        m.bd('cta','ctaText',S.ctaText,(W-380)/2,st?H-400:(po?H-290:H-104),380,90,{size:30}) ]; } },
  { id:'delivery', name:'Free Delivery', objective:'Reach', cat:'Any product', desc:'Bangla-first delivery offer with payment line.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?520:(po?440:420);
      return [ m.sh('bg',0,0,W,H,{role:'cta',lock:true}),
        m.sh('frame',50,st?270:50,W-100,H-(st?620:100),{fill:null,border:true,borderRole:'ctaText',bw:3,dash:true,rad:B.corners.img}),
        m.tx('headline','deliveryBn',S.deliveryBn,80,st?420:(po?190:150),W-160,{font:'bn',size:st?116:96,weight:700,role:'ctaText',align:'center',lh:1.15,ls:0}),
        m.body('sub','deliverySub',S.deliverySub,80,st?640:(po?390:330),W-160,{size:34,role:'ctaText',align:'center',weight:600}),
        m.im('product',(W-iw)/2,st?820:(po?520:440),iw,iw,{shadow:true,rad:999}),
        m.body('pay','payLine',S.payLine,80,st?1408:(po?1000:872),W-160,{size:30,role:'ctaText',align:'center',weight:700,ls:1}),
        m.bd('cta',null,'অর্ডার করুন',(W-380)/2,st?1470:(po?1060:926),380,92,{font:'bn',bgRole:'ctaText',role:'cta',size:32,ls:0}),
        m.logo('logo',0,st?320:(po?H-70:H-56),{align:'center',w:W,role:'ctaText',size:24,ls:6}) ]; } },
  { id:'bestseller', name:'Bestseller', objective:'Trust', cat:'Top sellers', desc:'Rank badge, stars and social proof.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?660:(po?540:500), iy = st?600:(po?400:320);
      return [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.sh('ring',(W-iw)/2-60,iy-60,iw+120,iw+120,{role:'decorativeAccent',rad:999,op:0.6}),
        m.im('product',(W-iw)/2,iy,iw,iw,{shadow:true}),
        m.bd('badge',null,'#1 BESTSELLER',(W-420)/2,st?400:(po?170:120),420,84,{bgRole:'heading',role:'background',size:30,ls:3}),
        m.tx('headline','productTitle',S.productTitle,80,st?520:(po?290:240),W-160,{size:st?86:68,align:'center'}),
        m.tx('stars','rating',S.rating,0,iy+iw+(st?60:(po?40:16)),W,{font:'body',size:52,role:'primary',align:'center',ls:10}),
        m.body('sold','sold',S.sold||'Loved across Bangladesh',0,iy+iw+(st?140:(po?116:82)),W,{size:30,role:'muted',align:'center',weight:600}),
        m.bd('cta','ctaText',S.ctaText,(W-380)/2,st?H-460:H-(po?180:130),380,90,{size:30}) ]; } },
  { id:'review', name:'Customer Review', objective:'Trust', cat:'Rated products', desc:'One loud quote over a quiet card.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const cy = st?460:(po?200:150), ch = st?1080:(po?920:760);
      return [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.sh('card',70,cy,W-140,ch,{role:'surface',rad:B.corners.img+10,shadow:true}),
        m.tx('quote',null,'“',110,cy+10,200,{size:230,role:'decorativeAccent',lh:1,op:0.9}),
        m.tx('review','reviewText',S.reviewText,140,cy+230,W-280,{size:st?56:48,lh:1.28,weight:B.fonts.hw}),
        m.tx('stars','rating',S.rating,140,cy+ch-230,500,{font:'body',size:40,role:'primary',ls:8}),
        m.body('name','reviewName',S.reviewName,140,cy+ch-160,W-280,{size:28,role:'muted',weight:600}),
        m.im('thumb',W-140-130,cy+ch-190,130,130,{rad:999}),
        m.body('headline','productTitle',S.productTitle,140,cy+ch+(st?60:34),W-620,{size:30,weight:700,role:'heading'}),
        m.bd('cta','ctaText',S.ctaText,W-140-320,cy+ch+(st?40:14),320,80,{size:27}) ]; } },
  { id:'problem', name:'Problem / Solution', objective:'Consideration', cat:'Any product', desc:'Name the itch, then hand them the fix.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const split = st?820:(po?560:470), iw = st?540:420;
      return [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.sh('top',0,0,W,split,{role:'heading',lock:true}),
        m.tx('kicker',null,'THE PROBLEM',90,st?300:80,W-180,{font:'body',size:25,weight:700,ls:6,role:'decorativeAccent'}),
        m.tx('problem','problem',S.problem,90,st?360:140,W-180,{size:st?76:60,role:'background',lh:1.12}),
        m.tx('kicker2',null,'THE FIX',90,split+60,W-180,{font:'body',size:25,weight:700,ls:6,role:'primary'}),
        m.tx('solution','solution',S.solution,90,split+120,st?W-180:W-560,{size:st?68:54,lh:1.12}),
        m.im('product',st?(W-iw)/2:W-iw-70,st?split+400:split+90,iw,iw,{shadow:true}),
        m.tx('price','currentPrice',S.currentPrice,90,st?H-500:H-190,400,{font:'body',size:50,weight:800,role:'primary',ls:0}),
        m.bd('cta','ctaText',S.ctaText,90,st?H-400:H-120,340,84,{size:28}) ]; } },
  { id:'bundle', name:'Bundle Offer', objective:'Order value', cat:'Paired products', desc:'Two pieces, one better price.',
    build(f,W,H,S,B){ const m = makers(B), st = f==='story', po = f==='portrait';
      const iw = st?430:370, gap = 90, x1 = (W-iw*2-gap)/2, iy = st?640:(po?420:360);
      const a = [ m.sh('bg',0,0,W,H,{role:'background',lock:true}),
        m.bd('badge',null,'BUNDLE & SAVE',(W-400)/2,st?400:(po?180:120),400,80,{bgRole:'offer',role:'surface',size:28,ls:3}),
        m.tx('headline',null,'Better together',80,st?510:(po?290:230),W-160,{size:st?92:72,align:'center'}),
        m.im('product',x1,iy,iw,iw,{shadow:true}), m.im('product2',x1+iw+gap,iy,iw,iw,{shadow:true,of:'pair',v:1}),
        m.tx('plus',null,'+',(W-60)/2,iy+iw/2-46,60,{font:'body',size:76,weight:800,role:'primary',align:'center',lh:1,ls:0}),
        m.body('names',null,(S.productTitle||'') + '  ×  ' + (S.pairName||'a matching piece'),80,iy+iw+(st?56:38),W-160,{size:29,role:'muted',align:'center',weight:600}) ];
      if(S.bundlePrice) a.push(m.body('prev','bundleWas',S.bundleWas,0,iy+iw+(st?130:(po?96:82)),W,{size:30,role:'muted',align:'center',strike:true}),
        m.tx('price','bundlePrice',S.bundlePrice,0,iy+iw+(st?186:(po?146:132)),W,{font:'body',size:66,weight:900,role:'primary',align:'center',ls:0}));
      a.push(m.bd('cta',null,'Get the bundle',(W-420)/2,st?H-460:H-(po?170:124),420,92,{size:30}));
      return a; } } ];

  // ---- motion presets & recipes ----
  const PRESETS = {
    enter:['fade','slide-up','slide-down','slide-left','slide-right','scale-in','pop','wipe','blur','rotate-in'],
    emphasis:['pulse','bounce','shake','glow','price-pop'],
    exit:['fade-out','scale-out','slide-out','blur-out'],
    continuous:['float','slow-zoom','sway','drift'] };
  const EASINGS = ['out','in-out','overshoot','linear'];

  // per-role rows: [preset, start, dur, ease, intensity]
  const RECIPES = {
    clean:{ label:'Clean', bg:['fade',0,500,'out'], band:['wipe',100,700,'out'], top:['wipe',0,600,'out'], ring:['scale-in',100,700,'out'], card:['fade',150,600,'out'], frame:['fade',100,600,'out'], rule:['wipe',100,500,'out'], strip:['fade',900,500,'out'],
      product:['scale-in',200,800,'out'], product2:['scale-in',350,800,'out'], thumb:['scale-in',900,500,'out'], plus:['fade',700,400,'out'],
      kicker:['fade',450,500,'out'], kicker2:['fade',1200,500,'out'], headline:['slide-up',550,650,'out'], sub:['fade',800,500,'out'], quote:['fade',300,600,'out'], review:['slide-up',500,700,'out'], problem:['slide-up',400,650,'out'], solution:['slide-up',1300,650,'out'],
      price:['fade',950,500,'out'], prev:['fade',1050,450,'out'], disc:['scale-in',1000,500,'out'], badge:['scale-in',350,500,'out'], benefit:['slide-up',900,550,'out'], tick:['scale-in',850,400,'out'],
      stars:['fade',900,500,'out'], sold:['fade',1050,450,'out'], name:['fade',1100,450,'out'], names:['fade',900,450,'out'], urgency:['fade',1150,500,'out'], pay:['fade',1100,500,'out'],
      cta:['fade',1400,550,'out'], logo:['fade',250,550,'out'], url:['fade',1500,500,'out'], _stagger:170 },
    bold:{ label:'Bold', bg:['fade',0,300,'out'], band:['slide-left',80,500,'overshoot',1.2], top:['slide-down',0,450,'out',1.2], ring:['pop',80,550,'overshoot'], card:['pop',100,500,'overshoot'], frame:['scale-in',80,450,'out'], rule:['wipe',80,400,'out'], strip:['slide-up',700,400,'out'],
      product:['pop',150,650,'overshoot',1.15], product2:['pop',300,650,'overshoot',1.15], thumb:['pop',750,450,'overshoot'], plus:['pop',600,400,'overshoot',1.4],
      kicker:['slide-up',300,350,'out',1.3], kicker2:['slide-up',900,350,'out',1.3], headline:['slide-up',380,450,'overshoot',1.4], sub:['slide-up',520,400,'out'], quote:['pop',250,450,'overshoot'], review:['slide-up',420,500,'overshoot'], problem:['slide-up',350,450,'overshoot'], solution:['slide-up',1000,450,'overshoot'],
      price:['pop',650,450,'overshoot',1.5,['price-pop',2600,700,'out',1.2]], prev:['fade',780,350,'out'], disc:['pop',800,500,'overshoot',1.7,['pulse',2900,800,'in-out',1.3]], badge:['pop',600,450,'overshoot',1.5,['pulse',3100,800,'in-out']], benefit:['slide-left',700,400,'out',1.2], tick:['pop',650,350,'overshoot',1.4],
      stars:['slide-up',800,400,'overshoot'], sold:['fade',950,350,'out'], name:['fade',950,350,'out'], names:['slide-up',780,400,'out'], urgency:['slide-up',950,400,'out',1.3], pay:['slide-up',900,400,'out'],
      cta:['slide-up',1100,400,'overshoot',1.3,['pulse',3600,800,'in-out',1.2]], logo:['fade',200,400,'out'], url:['fade',1250,350,'out'], _stagger:130 },
    premium:{ label:'Premium', bg:['fade',0,900,'in-out'], band:['blur',200,1000,'in-out'], top:['fade',0,900,'in-out'], ring:['scale-in',200,1200,'in-out'], card:['blur',200,1000,'in-out'], frame:['fade',300,1000,'in-out'], rule:['wipe',200,900,'in-out'], strip:['fade',1400,700,'in-out'],
      product:['blur',350,1300,'in-out',1,null,['slow-zoom',1700]], product2:['blur',550,1300,'in-out',1,null,['slow-zoom',1900]], thumb:['fade',1400,700,'in-out'], plus:['fade',1200,600,'in-out'],
      kicker:['fade',700,800,'in-out'], kicker2:['fade',1700,800,'in-out'], headline:['blur',900,1100,'in-out'], sub:['fade',1200,800,'in-out'], quote:['fade',500,900,'in-out'], review:['blur',800,1100,'in-out'], problem:['blur',600,1000,'in-out'], solution:['blur',1800,1000,'in-out'],
      price:['fade',1600,800,'in-out'], prev:['fade',1750,700,'in-out'], disc:['fade',1700,800,'in-out'], badge:['fade',900,800,'in-out'], benefit:['fade',1500,800,'in-out'], tick:['fade',1450,600,'in-out'],
      stars:['fade',1500,800,'in-out'], sold:['fade',1700,700,'in-out'], name:['fade',1800,700,'in-out'], names:['fade',1600,700,'in-out'], urgency:['fade',1900,700,'in-out'], pay:['fade',1800,700,'in-out'],
      cta:['fade',2200,900,'in-out'], logo:['fade',400,900,'in-out'], url:['fade',2400,700,'in-out'], _stagger:220 },
    playful:{ label:'Playful', bg:['fade',0,400,'out'], band:['rotate-in',100,600,'overshoot',1.3], top:['slide-down',0,500,'overshoot'], ring:['pop',100,600,'overshoot',1.2,null,['sway',1200]], card:['rotate-in',120,550,'overshoot'], frame:['scale-in',100,500,'overshoot'], rule:['wipe',100,450,'out'], strip:['slide-up',800,450,'overshoot'],
      product:['pop',180,700,'overshoot',1.25,null,['float',1400]], product2:['pop',360,700,'overshoot',1.25,null,['float',1700]], thumb:['pop',850,500,'overshoot',1.3], plus:['rotate-in',650,450,'overshoot',1.5],
      kicker:['slide-down',350,400,'overshoot'], kicker2:['slide-down',1000,400,'overshoot'], headline:['rotate-in',450,550,'overshoot',1.2], sub:['slide-up',600,450,'overshoot'], quote:['rotate-in',300,500,'overshoot',1.4], review:['slide-up',500,550,'overshoot'], problem:['rotate-in',400,500,'overshoot'], solution:['pop',1100,500,'overshoot'],
      price:['pop',750,500,'overshoot',1.4], prev:['fade',880,400,'out'], disc:['rotate-in',900,550,'overshoot',1.8,null,['sway',1600]], badge:['pop',700,500,'overshoot',1.6,['bounce',2800,900,'out',1.2]], benefit:['slide-right',800,450,'overshoot'], tick:['pop',750,400,'overshoot',1.5],
      stars:['pop',850,450,'overshoot',1.2], sold:['fade',1000,400,'out'], name:['fade',1050,400,'out'], names:['slide-up',880,450,'overshoot'], urgency:['slide-up',1050,450,'overshoot'], pay:['slide-up',1000,450,'overshoot'],
      cta:['pop',1250,500,'overshoot',1.35,['bounce',3400,900,'out',1.2]], logo:['slide-down',250,450,'overshoot'], url:['fade',1400,400,'out'], _stagger:150 },
    urgent:{ label:'Urgent', bg:['fade',0,250,'out'], band:['slide-left',60,350,'out',1.4], top:['slide-down',0,300,'out',1.4], ring:['scale-in',60,400,'out',1.2], card:['slide-up',80,350,'out',1.3], frame:['fade',60,300,'out'], rule:['wipe',60,300,'out'], strip:['wipe',650,400,'out',1.2],
      product:['slide-up',120,400,'out',1.3], product2:['slide-up',240,400,'out',1.3], thumb:['scale-in',650,350,'out'], plus:['fade',520,250,'out'],
      kicker:['slide-up',240,280,'out',1.4], kicker2:['slide-up',760,280,'out',1.4], headline:['slide-up',300,340,'out',1.5], sub:['slide-up',420,300,'out',1.3], quote:['fade',200,300,'out'], review:['slide-up',340,380,'out',1.4], problem:['slide-up',280,340,'out',1.4], solution:['slide-up',850,340,'out',1.4],
      price:['pop',540,380,'overshoot',1.5,['price-pop',2300,600,'out',1.4]], prev:['fade',640,280,'out'], disc:['pop',600,400,'overshoot',1.8,['shake',2500,650,'out',1.4]], badge:['pop',480,380,'overshoot',1.7,['shake',2200,650,'out',1.5]], benefit:['slide-left',600,320,'out',1.3], tick:['scale-in',560,280,'out'],
      stars:['slide-up',640,320,'out'], sold:['fade',760,280,'out'], name:['fade',800,280,'out'], names:['slide-up',700,320,'out'], urgency:['wipe',820,380,'out',1.3,['pulse',2900,650,'in-out',1.3]], pay:['slide-up',780,320,'out'],
      cta:['slide-up',920,340,'out',1.4,['pulse',3200,700,'in-out',1.4]], logo:['fade',150,300,'out'], url:['fade',1050,280,'out'], _stagger:100 } };

  function recipeFor(styleName, elId){ const rec = RECIPES[styleName]; if(!rec) return null;
    const root = elId.replace(/\d+$/,''), idx = Math.max(0, (parseInt(elId.match(/\d+$/)?.[0] || '1',10) || 1) - 1);
    const row = rec[root] || rec[elId] || ['fade',600,500,'out'];
    const lag = (root === 'benefit' || root === 'tick') ? idx*(rec._stagger||150) : 0;
    const mkE = r => r ? { p:r[0], s:r[1]+lag, d:r[2], e:r[3]||'out', i:r[4]||1 } : null;
    const anim = { enter:mkE(row) };
    if(row[5]) anim.emphasis = mkE(row[5]);
    if(row[6]) anim.continuous = { p:row[6][0], s:row[6][1], i:row[6][2]||1 };
    return anim; }

  // ---- binding metadata, template taxonomy, Nova direction composer ----
  const BINDS = [
    { k:'', label:'None — static text' },
    { k:'productTitle', label:'Product name' }, { k:'currentPrice', label:'Current price' },
    { k:'previousPrice', label:'Previous price' }, { k:'discountLabel', label:'Discount %' },
    { k:'primaryBenefit', label:'Product benefit' }, { k:'b1', label:'Feature 1' }, { k:'b2', label:'Feature 2' }, { k:'b3', label:'Feature 3' },
    { k:'problem', label:'Problem hook' }, { k:'ctaText', label:'CTA text' }, { k:'offerBadge', label:'Offer badge' },
    { k:'logoText', label:'Store name' }, { k:'storeUrl', label:'Store URL' }, { k:'tagline', label:'Store tagline' },
    { k:'deliveryBn', label:'Delivery offer (বাংলা)' }, { k:'deliverySub', label:'Delivery sub-line' }, { k:'payLine', label:'Payment methods' },
    { k:'stockUrgency', label:'Stock urgency' }, { k:'sold', label:'Social proof' },
    { k:'reviewText', label:'Customer review' }, { k:'reviewName', label:'Reviewer' }, { k:'rating', label:'Stars' }, { k:'ratingNum', label:'Rating number' },
    { k:'kicker', label:'Kicker (store · category)' }, { k:'pairName', label:'Paired product name' }, { k:'bundlePrice', label:'Bundle price' }, { k:'bundleWas', label:'Bundle was-price' } ];
  const TPL_CATEGORIES = ['Any product','Discounted items','New items','Top sellers','Low-stock items','Seasonal','Fashion','Accessories'];
  const TPL_OBJECTIVES = ['Conversions','Promotion','Awareness','Consideration','Urgency','Reach','Trust','Order value'];
  const DIRECTIONS = [
    { m:/flash|sale|discount|deal|% ?off|offer/i, tpl:'flash', motion:'bold', mode:'brand' },
    { m:/premium|luxur|launch|elegant|editorial|beauty/i, tpl:'arrival', motion:'premium', mode:'dark' },
    { m:/minimal|clean|simple|quiet|calm/i, tpl:'spotlight', motion:'clean', mode:'light' },
    { m:/deliver|shipping|free d|cod/i, tpl:'delivery', motion:'clean', mode:'brand' },
    { m:/new|arrival|drop|fresh|just in/i, tpl:'arrival', motion:'playful', mode:'brand' },
    { m:/review|trust|social proof|testimonial/i, tpl:'review', motion:'clean', mode:'brand' },
    { m:/stock|limited|urgen|hurry|last|scarce/i, tpl:'stock', motion:'urgent', mode:'brand' },
    { m:/bundle|pair|together|combo|set/i, tpl:'bundle', motion:'clean', mode:'brand' },
    { m:/best ?sell|popular|top|favorite/i, tpl:'bestseller', motion:'bold', mode:'brand' },
    { m:/feature|spec|detail|benefit|why/i, tpl:'feature', motion:'clean', mode:'brand' },
    { m:/bold|loud|punchy/i, tpl:'flash', motion:'bold', mode:'brand' } ];
  function parseDirection(text){ const t = text || ''; const hit = DIRECTIONS.find(d => d.m.test(t)) || { tpl:'spotlight', motion:'clean', mode:'brand' };
    const fmt = /story|9.?16|reel|vertical|tall/i.test(t) ? 'story' : (/portrait|4.?5/i.test(t) ? 'portrait' : 'square');
    return { tpl:hit.tpl, motion:/motion|animate|video|move/i.test(t) && hit.motion === 'clean' ? 'playful' : hit.motion,
      mode:/dark|noir|night/i.test(t) ? 'dark' : (/light|bright|airy/i.test(t) ? 'light' : hit.mode), fmt, matched:DIRECTIONS.some(d => d.m.test(t)) }; }

  return { FORMATS, FMT_KEYS, PAL, FON, COR, STORE, PRODUCTS, IMG_VARIANTS, CTA_OPTIONS,
    TEMPLATES, PRESETS, EASINGS, RECIPES, recipeFor, slots, deriveBrand, taka, mix, contrast, lum,
    BINDS, TPL_CATEGORIES, TPL_OBJECTIVES, parseDirection };
})();
