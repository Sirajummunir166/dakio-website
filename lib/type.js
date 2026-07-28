// Per-locale typography deltas.
//
// The pages carry their type in inline style objects ported 1:1 from the
// .dc.html sources, so CSS can't reach them. Instead each display role exposes
// a delta object that gets spread over the existing style:
//
//   <h1 style={{ ...H1_BASE, ...T.h1 }}>
//
// English deltas are empty by construction — the EN render stays byte-identical
// to the source HTML. Bangla gets Noto Sans Bengali, no negative tracking
// (Bengali conjuncts break under it), looser leading for the matra line, and a
// size step down so the taller glyphs occupy the same optical block.

const BN = "var(--dk-font-bn), sans-serif";

const EN_TYPE = {
  h1: {}, h1c: {}, h2: {}, h2b: {}, ctaH2: {}, h3: {},
  lead: {}, body: {}, small: {}, chip: {}, label: {},
};

const BN_TYPE = {
  // Hero headline — 68/-2.8/1.02 in EN.
  h1: { fontFamily: BN, fontSize: 58, letterSpacing: "normal", lineHeight: 1.15 },
  // Centred play-first headline — 62/-2.5/1.03 in EN.
  h1c: { fontFamily: BN, fontSize: 52, letterSpacing: "normal", lineHeight: 1.16 },
  // Section headline — 44/-1.7/1.06 in EN.
  h2: { fontFamily: BN, fontSize: 37, letterSpacing: "normal", lineHeight: 1.2 },
  // Section headline on a dark band — same metrics, kept separate so the two
  // can drift independently if the founder tunes one.
  h2b: { fontFamily: BN, fontSize: 37, letterSpacing: "normal", lineHeight: 1.2 },
  // Closing CTA headline — 56/-2.3/1.03 in EN.
  ctaH2: { fontFamily: BN, fontSize: 47, letterSpacing: "normal", lineHeight: 1.16 },
  // Card titles.
  h3: { fontFamily: BN, letterSpacing: "normal", lineHeight: 1.35 },
  // Hero/section standfirst.
  lead: { fontFamily: BN, lineHeight: 1.75 },
  // Body paragraphs and card descriptions.
  body: { fontFamily: BN, lineHeight: 1.75 },
  small: { fontFamily: BN, lineHeight: 1.7 },
  // Pills and chips — Bengali needs the extra vertical room.
  chip: { fontFamily: BN, lineHeight: 1.5 },
  // Inline Bengali inside an otherwise-Latin run.
  label: { fontFamily: BN },
};

/** Type deltas for a locale. `type("en")` is all-empty by design. */
export const type = lang => (lang === "bn" ? BN_TYPE : EN_TYPE);

export default type;
