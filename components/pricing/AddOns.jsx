// The add-ons shelf on the pricing page (DAKIO_GROWTH_SYSTEM.md §3.5): six
// paid add-ons on top of Growth, all included in Business. Compact on purpose:
// name, one line, price a month. There is no public add-on API yet, so the
// names and prices come from the committed copy (content/copy/pricing.<lang>.js).

export default function AddOns({ addons, T = {}, maxWidth = 800, className }) {
  if (!addons?.items?.length) return null;
  return (
    <div className={className} style={{ maxWidth, margin: "48px auto 0" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "8px 16px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.4px", ...T.h3 }}>{addons.h2}</div>
          <div style={{ fontSize: 13, color: "#6B6D60", marginTop: 3, ...T.small }}>{addons.sub}</div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", ...T.chip }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
          {addons.included}
        </span>
      </div>
      <div className="m-grid2 m-tiles" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10, marginTop: 16 }}>
        {addons.items.map((a) => (
          <div key={a.n} style={{ padding: "16px 18px", borderRadius: 18, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.2px", ...T.h3 }}>{a.n}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#6B6D60", marginTop: 4, flex: 1, ...T.small }}>{a.d}</div>
            <div style={{ marginTop: 10, fontSize: 14, fontWeight: 800 }}>
              {a.price}<span style={{ fontSize: 12, fontWeight: 600, color: "#6B6D60", ...T.chip }}>{addons.per}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
