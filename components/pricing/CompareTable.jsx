"use client";

// The plan comparison table (DAKIO_GROWTH_SYSTEM.md §25.1): Free, Growth and
// Business side by side, rows grouped the same for every plan, Business
// highlighted. Built from lib/compare.js (plain data) and styled in
// app/pricing.css (pt-*).
//
// The sticky top row holds what you decide with: plan name, its line, the price
// and the button. The row under it (launch price, what is billed, the saving)
// scrolls with the table. On a phone it is the same table, one plan column at a
// time, picked with the switcher at the top of the sticky row.
//
// `compact` (the home page) shows the short row set from lib/compare.js
// instead of every section, and no closing buttons. `kind` makes the Shops /
// Services wording controlled from outside (the home page's own switch); the
// table's switch is then hidden.

import { useState } from "react";
import { FREE_URL, buyHref } from "../../lib/urls";

function Diamond({ title }) {
  return <span className="pt-dia" title={title} aria-label={title}>◆</span>;
}

function Tick() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-label="yes" role="img"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  );
}

function Value({ v }) {
  if (v === true) return <span className="pt-yes"><Tick /></span>;
  if (v === false || v == null) return <span className="pt-no" role="img" aria-label="no" />;
  return <span>{v}</span>;
}

/** A small two-way pill switch, same look as the billing tabs. */
export function Seg({ value, onChange, opts, label, T = {}, className }) {
  return (
    <div role="group" aria-label={label} className={["pt-seg", className].filter(Boolean).join(" ")}>
      {opts.map((o) => (
        <button key={o.key} type="button" aria-pressed={value === o.key} onClick={() => onChange(o.key)} style={T.label}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// The price for one column, one currency, one period.
function Price({ v, rec, T, notSold }) {
  if (!v) return <div className="pt-price-none" style={T.chip}>{notSold}</div>;
  return (
    <div className="pt-price">
      {v.strike && <span className="pt-strike">{v.strike}</span>}
      <span className={`pt-amount${rec ? " is-rec" : ""}`}>{v.price}</span>
      <span className="pt-per" style={T.chip}>{v.per}</span>
    </div>
  );
}

function Details({ v, T }) {
  if (!v) return null;
  return (
    <>
      {v.launchLine && <div className="pt-launch" style={T.chip}><i aria-hidden="true" />{v.launchLine}</div>}
      {v.save && <div className="pt-save" style={T.h3}>{v.save}</div>}
      <div className="pt-billed" style={T.chip}>{v.billed}</div>
    </>
  );
}

export default function CompareTable({ compare, copy, period, T = {}, notSold, compact = false, kind: kindProp }) {
  const cols = compare.columns;
  const recIdx = Math.max(0, cols.findIndex((c) => c.recommended));
  const [pick, setPick] = useState(recIdx);
  const [kindState, setKind] = useState("shop");
  const kind = kindProp || kindState;
  const groups = compact ? [{ key: "compact", rows: compare.compact || [] }] : compare.groups;
  const usd = cols.some((c) => c.price.USD);
  const dia = copy.diamondNote;

  // Taka always; dollars beside it when on sale (CSS shows the visitor's, lib/region.js).
  const sets = [{ cur: "BDT", cls: usd ? "cur-bdt" : undefined }, ...(usd ? [{ cur: "USD", cls: "cur-usd" }] : [])];
  const href = (c) => (c.free ? FREE_URL : buyHref(c.code, period));

  return (
    <div className={`pt${compact ? " is-compact" : ""}`} data-pick={pick} style={{ "--pt-cols": cols.length }}>
      <div className="pt-tools">
        {kindProp ? <span /> : (
          <div className="pt-kind">
            <span className="pt-kind-label" style={T.chip}>{copy.kindLabel}</span>
            <Seg value={kind} onChange={setKind} label={copy.kindLabel} T={T}
              opts={[{ key: "shop", label: copy.kinds.shop }, { key: "svc", label: copy.kinds.svc }]} />
          </div>
        )}
        <span className="pt-key" style={T.chip}><Diamond title={dia} /> {dia}</span>
      </div>

      <div className="pt-grid" role="table">
        {/* Sticky top row: plan, line, price, button. */}
        <div className="pt-sticky" role="rowgroup">
          <Seg className="pt-pick" value={pick} onChange={setPick} label="Plan" T={T}
            opts={cols.map((c, i) => ({ key: i, label: c.name }))} />
          <div className="pt-row pt-head" role="row">
            <div className="pt-cell pt-corner" role="columnheader" />
            {cols.map((c, i) => (
              <div key={c.code} className={`pt-cell pt-plan${c.recommended ? " is-rec" : ""}`} data-col={i} role="columnheader">
                {c.recommended && <span className="pt-pop" style={T.chip}>{copy.popular}</span>}
                <div className="pt-name">
                  <b>{c.name}</b>
                  <span className="pt-tag" style={T.chip}>{c.tag}{c.diamond && <> <Diamond title={dia} /></>}</span>
                </div>
                <div className="pt-line" style={T.small}>{c.line}</div>
                {sets.map((s) => (
                  <div key={s.cur} className={["pt-pw", s.cls].filter(Boolean).join(" ")}>
                    <Price v={c.price[s.cur]?.[period]} rec={c.recommended} T={T} notSold={notSold} />
                  </div>
                ))}
                <a href={href(c)} className={`pt-btn${c.recommended ? " is-rec" : c.free ? " is-free" : ""}`} style={T.label}>{c.cta}</a>
              </div>
            ))}
          </div>
        </div>

        {/* What the price means: launch price, the saving, what is billed. */}
        <div className="pt-row pt-detail" role="row">
          <div className="pt-cell pt-corner" role="cell" />
          {cols.map((c, i) => (
            <div key={c.code} className={`pt-cell${c.recommended ? " is-rec" : ""}`} data-col={i} role="cell">
              {sets.map((s) => (
                <div key={s.cur} className={s.cls}><Details v={c.price[s.cur]?.[period]} T={T} /></div>
              ))}
            </div>
          ))}
        </div>

        {groups.map((g) => (
          <div key={g.key} className="pt-group" role="rowgroup">
            {g.rows.map((r) => (
              <div key={r.key} className={`pt-row${r.strong ? " is-strong" : ""}${r.values ? "" : " is-head"}`} role="row">
                <div className="pt-cell pt-label" role="rowheader" style={r.strong ? T.h3 : T.small}>
                  {r.label[kind]}{r.diamond && <> <Diamond title={dia} /></>}
                </div>
                {cols.map((c, i) => (
                  <div key={c.code} className={`pt-cell pt-val${c.recommended ? " is-rec" : ""}`} data-col={i} role="cell" style={T.small}>
                    {r.values ? <Value v={r.values[kind][i]} /> : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        {/* The buttons again at the end of a long table. */}
        {!compact && <div className="pt-row pt-foot" role="row">
          <div className="pt-cell pt-corner" role="cell" />
          {cols.map((c, i) => (
            <div key={c.code} className={`pt-cell${c.recommended ? " is-rec" : ""}`} data-col={i} role="cell">
              <a href={href(c)} className={`pt-btn${c.recommended ? " is-rec" : c.free ? " is-free" : ""}`} style={T.label}>{c.cta}</a>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}
