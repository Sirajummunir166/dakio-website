// The billing-period tab row and one card's price for the selected period.
// Shared by the pricing page and the home page's plan strip, so the two quote
// the same deal the same way. Only imported from client components (the tabs
// and the nudge button need state from the parent).

export function PeriodTabs({ billing, value, onChange, T, style }) {
  const seg = on => ({
    padding: "9px 18px", borderRadius: 99, cursor: "pointer", fontSize: 13, fontWeight: 700,
    ...(on ? { background: "#1A1D12", color: "#C6F035" } : { color: "#6B6D60" }),
    ...T.label,
  });
  return (
    <div role="tablist" aria-label="Billing period" className="m-wrap" style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: 3, padding: 4, borderRadius: 22, background: "#E9EBE0", ...style }}>
      {billing.tabs.map((t) => {
        const on = value === t.key;
        const best = t.key === billing.bestKey;
        return (
          <button key={t.key} type="button" role="tab" aria-selected={on} onClick={() => onChange(t.key)}
            style={{ ...seg(on), border: "none", display: "inline-flex", alignItems: "center", gap: 8, padding: t.saving ? "8px 10px 8px 18px" : "9px 18px", fontFamily: "inherit" }}>
            {t.label}
            {t.saving && (
              <span style={{ padding: "4px 9px", borderRadius: 99, fontSize: 11, fontWeight: 800, whiteSpace: "nowrap",
                ...(on ? { background: "#C6F035", color: "#0F120B" } : best ? { background: "#1A1D12", color: "#C6F035" } : { background: "rgba(62,122,69,0.14)", color: "#3E7A45" }) }}>
                {t.saving}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// One card's price for the selected period: the struck-through monthly price,
// the per-month price, what is actually billed, and the saving in taka. A plan
// with no price on this period says so rather than showing another period's
// number under this tab's name.
export function PeriodPrice({ p, v, T, notSold, onNudge }) {
  const muted = p.dark ? "#878B76" : "#6B6D60";
  if (!v) {
    return (
      <div style={{ marginTop: 18, minHeight: 86, fontSize: 13, color: muted, ...T.chip }}>
        {notSold}
      </div>
    );
  }
  return (
    <div style={{ marginTop: 18, minHeight: 86 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
        {v.strike && (
          <span style={{ fontSize: 17, fontWeight: 700, textDecoration: "line-through", textDecorationThickness: 2, color: p.dark ? "#6B6F5C" : "#A3A596" }}>{v.strike}</span>
        )}
        <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px", ...(p.dark ? { color: "#C6F035" } : {}) }}>{v.price}</span>
        <span style={{ fontSize: 13, color: muted, ...T.chip }}>{p.sub}</span>
      </div>
      <div style={{ fontSize: 11.5, marginTop: 3, color: muted, ...T.chip }}>{v.billed || p.noteMo}</div>
      {v.save && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 10, padding: "5px 11px", borderRadius: 99, fontSize: 12, fontWeight: 800,
          ...(p.dark ? { background: "rgba(198,240,53,0.16)", color: "#C6F035" } : { background: "rgba(198,240,53,0.45)", color: "#1A1D12" }), ...T.chip }}>
          {v.save}{v.saveBadge && <span style={{ fontWeight: 600, opacity: 0.75 }}>· {v.saveBadge}</span>}
        </div>
      )}
      {!v.save && v.nudge && (
        <button type="button" onClick={onNudge} style={{ marginTop: 10, padding: 0, border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, color: p.dark ? "#C6F035" : "#3E7A45", textDecoration: "underline", textUnderlineOffset: 3, ...T.chip }}>{v.nudge} →</button>
      )}
    </div>
  );
}
