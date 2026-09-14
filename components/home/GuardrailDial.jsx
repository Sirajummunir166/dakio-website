// The one graphic of the "You hold the guardrails" section — an instrument,
// not an illustration. Deliberately unlike the light-green room/step
// graphics: ink hairlines, amber posts, a sand instrument face.
//
//   outer gauge   the authority ladder L0→L4, L3 lit (day-one default),
//                 L4 dashed amber (earned, not yet)
//   the fence     a rounded hexagon the founder drew — the boundary Nova
//                 works inside; three of its posts carry the limits
//   inside        Nova roams a looped path; each bend leaves a receipt,
//                 one of them carries the undo badge
//
// Server component, inline SVG. Labels arrive as props so they stay
// editable/localizable and crawlable — nothing is baked into the drawing.

const MONO = "var(--dk-font-mono), monospace";

// Canvas is 640 wide with the 560×560 face offset 40px so ring labels clear the edges.
// Gauge geometry: r=236, 270° sweep from 135° (bottom-left) clockwise to
// 45° (bottom-right), five 48° segments with 6° gaps.
const SEGMENTS = [
  { d: "M104.6 437.9A236 236 0 0 1 45.3 255.3", lx: 112, ly: 466, anchor: "end", dx: 0 },
  { d: "M49.2 230.9A236 236 0 0 1 162 75.6", lx: 73.7, ly: 130, anchor: "end", dx: -10 },
  { d: "M184 64.4A236 236 0 0 1 376 64.4", lx: 280, ly: 25, anchor: "middle", dx: 0 },
  { d: "M398 75.6A236 236 0 0 1 510.8 230.9", lx: 486.3, ly: 130, anchor: "start", dx: 10 },
  { d: "M514.7 255.3A236 236 0 0 1 455.4 437.9", lx: 448, ly: 466, anchor: "start", dx: 0 },
];

const FENCE = "M299 139L392.6 193Q411.6 204 411.6 226L411.6 334Q411.6 356 392.6 367L299 421Q280 432 261 421L167.4 367Q148.4 356 148.4 334L148.4 226Q148.4 204 167.4 193L261 139Q280 128 299 139Z";
const POSTS = [[280, 128], [411.6, 204], [411.6, 356], [280, 432], [148.4, 356], [148.4, 204]];
const TRAIL = "M240 250C300 200 360 260 330 320C300 380 210 350 220 300C225 275 230 260 240 250Z";

function Receipt({ x, y, undo }) {
  return (
    <g transform={`translate(${x - 9} ${y - 11})`}>
      <rect width="18" height="22" rx="3" fill="#FFFDF8" stroke="#1A1D12" strokeWidth="2" />
      <path d="M4.5 7h9M4.5 11.5h9M4.5 16h5" stroke="#1A1D12" strokeWidth="1.6" strokeLinecap="round" />
      {undo ? (
        <g transform="translate(12 -4)">
          <circle r="7" fill="#E3B54A" stroke="#1A1D12" strokeWidth="1.6" />
          <path d="M-2.6 -0.8v2.4h2.4M-2.4 1.5a3 3 0 1 0 0.6-3.3" fill="none" stroke="#1A1D12" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
    </g>
  );
}

function Pill({ x, y, anchor = "start", children, lock }) {
  // width is estimated from the label; the pill only needs to read as a tag
  const w = children.length * 6.6 + (lock ? 34 : 20);
  const left = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
  return (
    <g transform={`translate(${left} ${y - 11})`}>
      <rect width={w} height="22" rx="11" fill="#1A1D12" />
      {lock ? (
        <g transform="translate(11 6)">
          <rect x="0" y="4" width="10" height="7" rx="1.5" fill="#E3B54A" />
          <path d="M2 4V2.5a3 3 0 0 1 6 0V4" fill="none" stroke="#E3B54A" strokeWidth="1.6" />
        </g>
      ) : null}
      <text x={lock ? 27 : 10} y="15" fontFamily={MONO} fontSize="10" fontWeight="600" letterSpacing=".06em" fill="#FFFDF8">{children}</text>
    </g>
  );
}

export default function GuardrailDial({ levels, spend, discount, noTouch, style }) {
  return (
    <svg viewBox="0 0 640 560" role="img" aria-hidden="true" style={{ display: "block", width: "100%", height: "auto", ...style }}>
      <g transform="translate(40 0)">
      {/* instrument face */}
      <circle cx="280" cy="280" r="262" fill="none" stroke="#1A1D12" strokeOpacity=".22" strokeWidth="10" strokeDasharray="1.5 44.2" />
      <circle cx="280" cy="280" r="212" fill="none" stroke="#1A1D12" strokeOpacity=".08" strokeWidth="1" />
      <circle cx="280" cy="280" r="176" fill="none" stroke="#1A1D12" strokeOpacity=".08" strokeWidth="1" strokeDasharray="3 6" />

      {/* authority gauge */}
      {SEGMENTS.map((s, i) => {
        const lv = levels[i] || {};
        const lit = i === 3;
        const earned = i === 4;
        return (
          <g key={i}>
            <path d={s.d} fill="none" strokeLinecap="round"
              stroke={lit ? "#C6F035" : earned ? "#E3B54A" : "#1A1D12"}
              strokeOpacity={lit || earned ? 1 : 0.28}
              strokeWidth={lit ? 12 : 4}
              strokeDasharray={earned ? "2 9" : undefined} />
            {lit ? <path d={s.d} fill="none" stroke="#1A1D12" strokeWidth="1.5" strokeLinecap="round" /> : null}
            <text x={s.lx + s.dx} y={s.ly} textAnchor={s.anchor} fontFamily={MONO} fontSize="10.5" fontWeight="600" letterSpacing=".08em" fill={lit ? "#1A1D12" : earned ? "#9A7A22" : "#6B6D60"}>
              {lv.l}{lv.n ? ` · ${String(lv.n).toUpperCase()}` : ""}
            </text>
          </g>
        );
      })}

      {/* the fence — the boundary the founder drew */}
      <path d={FENCE} fill="#FFFDF8" stroke="#1A1D12" strokeWidth="4" strokeLinejoin="round" />
      <path d={FENCE} fill="none" stroke="#E3B54A" strokeWidth="1.5" strokeDasharray="4 7" transform="translate(280 280) scale(.9) translate(-280 -280)" />

      {/* receipts trail + Nova roaming inside */}
      <path d={TRAIL} fill="none" stroke="#1A1D12" strokeOpacity=".4" strokeWidth="2" strokeDasharray="1.5 7" strokeLinecap="round" />
      <Receipt x={240} y={250} />
      <Receipt x={330} y={320} undo />
      <Receipt x={220} y={300} />
      <g>
        <animateMotion dur="16s" repeatCount="indefinite" path={TRAIL} />
        <circle r="34" fill="#C6F035" opacity=".22" />
        <circle r="20" fill="#C6F035" stroke="#1A1D12" strokeWidth="2.5" />
        <circle cx="-7" cy="-7" r="5.5" fill="#FFFDF8" />
      </g>

      {/* fence posts; three of them carry the limits */}
      {POSTS.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="7" fill="#E3B54A" stroke="#1A1D12" strokeWidth="2.5" />)}
      <path d="M418 204h12M142 204h-12M280 439v10" stroke="#1A1D12" strokeWidth="2" strokeLinecap="round" />
      <Pill x={432} y={204}>{spend}</Pill>
      <Pill x={128} y={204} anchor="end">{discount}</Pill>
      <Pill x={280} y={462} anchor="middle" lock>{noTouch}</Pill>
      </g>
    </svg>
  );
}
