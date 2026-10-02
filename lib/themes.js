// Dakio Themes — the storefront templates in the dakio-templates repo
// (github.com/alasim/dakio-templates, one Next.js app per templates/<dir>).
// Language-free facts live here; words are in content/copy/themes.{en,bn}.js.
//
// Screenshots in public/themes/<key>/ come from production builds of each
// theme on its demo catalog: hero/product at 1440×900, full = the whole home
// page at 960 wide, phone = 390×844 @2x, phoneFull = the whole home at 390.
//
// `demo` is the public demo address; null shows "demo coming soon". When the
// <key>.themes.dakio.io sites go live, set them here.

export const THEMES = [
  {
    key: "saril", dir: "fashion", name: "SARIL", num: "01",
    wordmark: { font: "var(--tf-cormorant)", weight: 500, tracking: "0.32em", upper: true },
    palette: ["#fbf8f3", "#f7f1e8", "#211b17", "#7d2227", "#4f1417", "#b08a4e"],
    fonts: { display: "Cormorant Garamond", body: "Jost", accent: "Pinyon Script" },
    products: 30, categories: 8,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/about", "/help", "/home-2"],
    shots: ["full", "phoneFull", "product", "home2"],
    demo: "https://dakio-templates.vercel.app",
  },
  {
    key: "bloome", dir: "beauty", name: "bloomé", num: "02",
    wordmark: { font: "var(--tf-bricolage)", weight: 600, tracking: "-0.02em" },
    palette: ["#fdf6ec", "#f1e8da", "#13261a", "#0f2d17", "#1d8028", "#f2711c"],
    fonts: { display: "Newsreader", body: "Inter", accent: "Caveat" },
    products: 19, categories: 6,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
  {
    key: "lumira", dir: "jewelry", name: "LUMIRA", num: "03",
    wordmark: { font: "var(--tf-cormorant)", weight: 500, tracking: "0.28em", upper: true },
    palette: ["#fbf6ee", "#f3e9db", "#1b1c1c", "#c99b62", "#9a6b2f", "#b4402a"],
    fonts: { display: "Newsreader", body: "Inter", accent: "Cormorant Garamond" },
    products: 25, categories: 9,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
  {
    key: "nook", dir: "furniture", name: "nook.", num: "04",
    wordmark: { font: "var(--tf-dmsans)", weight: 700, tracking: "-0.03em" },
    palette: ["#f8f1e8", "#f3e6d5", "#1d1a17", "#8a5a32", "#8b857c", "#f7941d"],
    fonts: { display: "Newsreader", body: "DM Sans", accent: "Nothing You Could Do" },
    products: 23, categories: 15,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/saved", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
  {
    key: "freshcart", dir: "grocery", name: "freshcart", num: "05",
    wordmark: { font: "var(--tf-jakarta)", weight: 800, tracking: "-0.03em" },
    palette: ["#fbf9f0", "#14301c", "#138a36", "#0f3d22", "#fbe48e", "#b4402a"],
    fonts: { display: "Plus Jakarta Sans", body: "Plus Jakarta Sans", accent: "Newsreader" },
    products: 28, categories: 9,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/saved", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
  {
    key: "tinyjoy", dir: "baby", name: "tinyjoy", num: "06",
    wordmark: { font: "var(--tf-lexend)", weight: 600, tracking: "-0.01em" },
    palette: ["#fdf8f0", "#132a52", "#d9232d", "#1b1d2b", "#f3e9db", "#f2711c"],
    fonts: { display: "Kalam", body: "Nunito", accent: "Lexend" },
    products: 24, categories: 8,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/saved", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
  {
    key: "safiyah", dir: "modest", name: "safiyah", num: "07",
    wordmark: { font: "var(--tf-newsreader)", weight: 500, tracking: "0.01em" },
    palette: ["#fcf8f2", "#f6ebe0", "#1a1a1a", "#171818", "#9a6a45", "#8f8981"],
    fonts: { display: "Newsreader", body: "Figtree", accent: "Allura" },
    products: 30, categories: 8,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/saved", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
  {
    key: "papyr", dir: "books", name: "papyr", num: "08",
    wordmark: { font: "var(--tf-dmsans)", weight: 700, tracking: "-0.02em" },
    palette: ["#fbf6ef", "#f6ecdf", "#1a1d1b", "#0f3d2e", "#8a5a32", "#b4402a"],
    fonts: { display: "Newsreader", body: "DM Sans", accent: "Nothing You Could Do" },
    products: 26, categories: 8,
    pages: ["/", "/shop", "/collections/[slug]", "/p/[slug]", "/checkout", "/order/[number]", "/track", "/saved", "/about", "/help"],
    shots: ["full", "phoneFull", "product"],
    demo: null,
  },
];

export const THEME_KEYS = THEMES.map(t => t.key);
export const themeByKey = key => THEMES.find(t => t.key === key) || null;
export const shot = (key, name) => `/themes/${key}/${name}.webp`;

export const wordmarkStyle = t => ({
  fontFamily: `${t.wordmark.font}, Georgia, serif`,
  fontWeight: t.wordmark.weight,
  letterSpacing: t.wordmark.tracking,
  textTransform: t.wordmark.upper ? "uppercase" : "none",
});
