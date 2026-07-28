// Placeholder blog thumbnail — Dakio mark on one of three brand backgrounds
// (ported from dakio-landing). Swap for real cover images later via a `cover`
// frontmatter field.

import { MK_PATH } from "../Logo";

const VARIANTS = {
  ink: { bg: "linear-gradient(135deg, #2a2e1f, #1A1D12)", mark: "rgba(198,240,53,0.28)" },
  lime: { bg: "rgba(198,240,53,0.4)", mark: "rgba(26,29,18,0.22)" },
  cream: { bg: "#E8E6DA", mark: "rgba(26,29,18,0.18)" },
};

export default function Thumb({ variant = "cream", height = 150, mark = 54, radius = 0, children, style = {} }) {
  const v = VARIANTS[variant] || VARIANTS.cream;
  return (
    <div style={{ position: "relative", height, borderRadius: radius, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", ...style }}>
      <svg width={mark} height={mark} viewBox="0 5.4 23 23" style={{ color: v.mark }}>
        <path fill="currentColor" d={MK_PATH} />
      </svg>
      {children}
    </div>
  );
}
