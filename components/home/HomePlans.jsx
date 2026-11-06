"use client";

// Home: the plans under PRICING. The same comparison table as /pricing
// (components/pricing/CompareTable.jsx), shown `compact`: the sticky plan row
// (plan, line, price, button) and the eight rows that sell the step up. Opens on
// Yearly with the launch price, Business highlighted, so a first visit lands on
// the best plan (owner, 2026-11-06). The wording follows the home page's own
// "What do you sell?" switch (Audience.jsx); "Both" reads as shops.

import { useState } from "react";
import { PeriodTabs } from "../pricing/Periods";
import CompareTable from "../pricing/CompareTable";
import { useAudience } from "./Audience";

export default function HomePlans({ pricing, T }) {
  const { aud } = useAudience();
  const [period, setPeriod] = useState(pricing.billing?.defaultKey || "YEARLY");
  if (!pricing.compareTable) return null;
  // Taka for Bangladesh, dollars everywhere else (lib/region.js): both tab rows
  // are rendered and CSS shows the visitor's.
  const usd = pricing.usd || null;
  const tabs = (billing, cls) => (
    <div className={cls} style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
      <PeriodTabs billing={billing} value={period} onChange={setPeriod} T={T} />
    </div>
  );
  return (
    <>
      {pricing.billing?.tabs?.length > 1 && tabs(pricing.billing, usd ? "cur-bdt" : undefined)}
      {usd && usd.billing?.tabs?.length > 1 && tabs(usd.billing, "cur-usd")}
      <CompareTable compact compare={pricing.compareTable} copy={pricing.compare} period={period} T={T}
        notSold={pricing.billing?.notSold} kind={aud === "svc" ? "svc" : "shop"} />
    </>
  );
}
