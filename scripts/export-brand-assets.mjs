// Generates the reusable brand asset set in public/brand from the
// byte-identical logo paths in components/Logo.jsx (single source of truth).
// Run: node scripts/export-brand-assets.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoSrc = readFileSync(join(root, "components", "Logo.jsx"), "utf8");

const MK_PATH = logoSrc.match(/export const MK_PATH =\s*"([^"]+)"/)[1];
const WM_PATHS = [...logoSrc.matchAll(/^ {2}"(M[^"]+)",$/gm)].map(m => m[1]);
const WM_POLYGON = logoSrc.match(/export const WM_POLYGON =\s*"([^"]+)"/)[1];
const WM_RECT = '<rect x="103.1" y="6.4" width="5" height="22"/>';

if (WM_PATHS.length !== 4) throw new Error(`expected 4 wordmark paths, got ${WM_PATHS.length}`);

const INK = "#1A1D12";
const LIME = "#C6F035";
const CREAM = "#FBFBF4";

const wordmarkGroup = fill =>
  `<g fill="${fill}">${WM_PATHS.map(d => `<path d="${d}"/>`).join("")}<polygon points="${WM_POLYGON}"/>${WM_RECT}</g>`;

const svg = (viewBox, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${body}</svg>\n`;

// Mark alone — favicon, app icon, avatar, tiny spaces (viewBox from source pages)
const markSvg = fill => svg("0 5.4 23 23", `<path fill="${fill}" d="${MK_PATH}"/>`);

// Wordmark alone — sidebars, "Powered by" footers (viewBox from source pages)
const wordmarkSvg = fill => svg("31 0 104 29", wordmarkGroup(fill));

// Full lockup — mark + wordmark on one canvas (0 0 134.8 29, matching uploads).
// Mark viewBox y-offset 5.4 → translate up so both share the 0..29 canvas.
const lockupSvg = (markFill, wmFill) =>
  svg("0 0 134.8 29", `<g transform="translate(0 -5.4)"><path fill="${markFill}" d="${MK_PATH}"/></g>${wordmarkGroup(wmFill)}`);

// App icon — mark fills 92% of a rounded-square tile (rx 14 on a 64 grid),
// per the design system's brand/app-icon card.
const APP_ICON_G = `<g transform="translate(32 32) scale(2.611) translate(-11.728 -17.072)"><path fill="${LIME}" d="${MK_PATH}"/></g>`;
const appIconSvg = svg("0 0 64 64", `<rect width="64" height="64" rx="14" fill="${INK}"/>${APP_ICON_G}`);
const appIconCircleSvg = svg(
  "0 0 64 64",
  `<circle cx="32" cy="32" r="32" fill="${INK}"/><g transform="translate(32 32) scale(2.27) translate(-11.728 -17.072)"><path fill="${LIME}" d="${MK_PATH}"/></g>`
);

const out = join(root, "public", "brand");
mkdirSync(out, { recursive: true });

const files = {
  "dakio-mark-ink.svg": markSvg(INK),
  "dakio-mark-lime.svg": markSvg(LIME),
  "dakio-mark-cream.svg": markSvg(CREAM),
  "dakio-wordmark-ink.svg": wordmarkSvg(INK),
  "dakio-wordmark-cream.svg": wordmarkSvg(CREAM),
  "dakio-lockup-light-bg.svg": lockupSvg(INK, INK),
  "dakio-lockup-dark-bg.svg": lockupSvg(LIME, CREAM),
  "dakio-app-icon.svg": appIconSvg,
  "dakio-app-icon-circle.svg": appIconCircleSvg,
  "favicon.svg": appIconSvg,
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(out, name), content);
  console.log("wrote", name);
}
