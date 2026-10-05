"use client";

// Home — the plan cards under PRICING. With the live catalogue they carry the
// same billing-period tabs as /pricing (Monthly / 6 months / Yearly, opening
// on the longest), so the front page quotes the price Dakio actually sells
// rather than only the monthly one. The committed fallback copy has no
// periods and keeps its single monthly price.

import { useState } from "react";
import { REGISTER_URL } from "../../lib/urls";
import { PeriodTabs, PeriodPrice } from "../pricing/Periods";

const MONOFONT = "var(--dk-font-mono), monospace";

export default function HomePlans({ pricing, T }) {
  const billing = pricing.billing;
  const live = Boolean(billing?.tabs?.length);
  const [period, setPeriod] = useState(live ? billing.defaultKey : null);
  const plans = pricing.plans;

  return (
    <>
      {live && billing.tabs.length > 1 ? (
        <div data-reveal style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <PeriodTabs billing={billing} value={period} onChange={setPeriod} T={T} />
        </div>
      ) : null}
      {/* Columns follow the plan count. Hardcoding 3 left a phantom third
          column the day the free tier was withdrawn from sale. */}
      <div className="m-grid" style={{ display: "grid", gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))`, gap: 14, maxWidth: plans.length < 3 ? 820 : "none", margin: "0 auto" }} data-reveal>
        {plans.map(p => (
          <div key={p.n} style={{ padding: 28, borderRadius: 26, display: "flex", flexDirection: "column", ...(p.dark ? { background: "#0F120B", color: "#E9EFDC", boxShadow: "0 24px 54px rgba(15,18,11,0.3)" } : { background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.07)" }) }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.n}</span>
              {p.pop ? <span style={{ padding: "4px 10px", borderRadius: 99, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", ...(p.dark ? { background: "rgba(198,240,53,0.16)", color: "#C6F035" } : { background: "#1A1D12", color: "#C6F035" }) }}>{pricing.popular}</span> : null}
            </div>
            {p.audience ? <div style={{ marginTop: 3, fontSize: 12.5, color: p.dark ? "#A9AD98" : "#6B6D60", ...T.chip }}>{p.audience}</div> : null}
            {live ? (
              <PeriodPrice p={{ ...p, sub: p.perMonth }} v={p.periods?.[period]} T={T} notSold={billing.notSold} onNudge={() => setPeriod(billing.bestKey)} />
            ) : (
              <>
                <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1.4px", ...(p.dark ? { color: "#FBFBF4" } : {}) }}>{p.pr}</span>
                  <span style={{ fontSize: 13, color: p.dark ? "#878B76" : "#6B6D60", ...T.chip }}>{p.sub}</span>
                </div>
                {p.yr ? <div style={{ marginTop: 4, fontSize: 12, color: p.dark ? "#878B76" : "#6B6D60", ...T.small }}>{p.yr}</div> : null}
              </>
            )}
            {p.level ? <div style={{ marginTop: 14, display: "inline-flex", alignSelf: "flex-start", padding: "4px 10px", borderRadius: 99, fontFamily: MONOFONT, fontSize: 8.5, letterSpacing: "0.1em", ...(p.dark ? { border: "1px solid rgba(198,240,53,0.4)", color: "#C6F035" } : { background: "rgba(62,122,69,0.1)", color: "#3E7A45" }) }}>{p.level}</div> : null}
            <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {(p.feats || []).map(f => (
                <li key={f} style={{ display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, lineHeight: 1.5, color: p.dark ? "#C9CDB8" : "#4C4F42", ...T.small }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.dark ? "#C6F035" : "#3E7A45"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}><path d="M20 6L9 17l-5-5" /></svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href={p.href || REGISTER_URL} style={{ marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 0", borderRadius: 99, fontSize: 14, fontWeight: 700, ...(p.dark ? { background: "#C6F035", color: "#0F120B" } : { border: "1.5px solid rgba(26,29,18,0.2)", color: "#1A1D12" }), ...T.label }}>{p.cta}</a>
          </div>
        ))}
      </div>
    </>
  );
}
