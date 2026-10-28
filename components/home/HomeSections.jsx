// The home page sections (HOME_COPY.md), shared by "/", "/shops" and "/services".
//
// Server components. Every audience variant is in the markup with a data-show
// attribute; AudienceRoot (Audience.jsx) sets data-aud on the wrapper and
// app/home.css hides what does not apply. Styles live in app/home.css (hm-*).

import Link from "next/link";
import { AudienceSwitch, SectionSwitch, StickySwitch, StartLink } from "./Audience";
import RotatingHead from "./RotatingHead";
import ChatDemo from "./ChatDemo";
import NovaMachine from "./NovaMachine";
import AppScreens from "./AppScreens";
import HomePlans from "./HomePlans";
import TrialLine from "../pricing/TrialLine";
import { REGISTER_URL } from "../../lib/urls";

function Arrow({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Check({ on = true }) {
  return on ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-label="yes"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-label="no"><path d="M7 7l10 10M17 7L7 17" /></svg>
  );
}

// Line icons for the "one app" cards, drawn on a 24 grid.
const ICONS = {
  inbox: <path d="M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5" />,
  customers: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.4c1.6.7 2.6 2.3 3 4.6" /></>,
  orders: <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M4 7.5l8 4.5 8-4.5M12 12v9" /></>,
  bookings: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M8 14h3" /></>,
  marketing: <><path d="M4 10v4h3l7 4V6l-7 4z" /><path d="M17.5 9.5a3.5 3.5 0 0 1 0 5" /></>,
  money: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M16 12.5h2M3 10h18" /></>,
  website: <><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18M6.5 6.8h.01M9 6.8h.01" /></>,
};

function Icon({ name }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>
  );
}

/* ---------------- 1 · Hero ---------------- */

export function Hero({ c, lang, L, head = null }) {
  const h = c.hero;
  return (
    <div className="hm-wrap hm-hero-wrap">
      <div className="hm-hero">
        <div className="hm-glow hm-glow-a" />
        <div className="hm-glow hm-glow-b" />
        <div className="hm-hero-top">
          <div className="hm-hero-text">
            <div className="hm-badge"><span className="hm-dot" />{head ? head.badge : h.badge}</div>
            <h1 className="hm-h1">{head ? <span className="hm-h1-main">{head.h1}</span> : <RotatingHead r={h.rot} />}<span className="hm-h1-accent">{head ? head.accent : h.accent}</span></h1>
          </div>
          <div className="hm-hero-act">
            {head ? null : <AudienceSwitch label={h.ask} opts={h.opts} />}
            {head ? (
              <p className="hm-lead">{head.sub}</p>
            ) : (
              <>
                <p className="hm-lead" data-show="shop-only">{h.sub.shop}</p>
                <p className="hm-lead" data-show="svc-only">{h.sub.svc}</p>
                <p className="hm-lead" data-show="both-only">{h.sub.both}</p>
              </>
            )}
          </div>
          <div className="hm-hero-go">
            <div className="hm-ctas">
              <StartLink href={REGISTER_URL} className="hm-btn hm-btn-lime">{h.cta} <Arrow /></StartLink>
              <Link href={L("/nova")} className="hm-btn hm-btn-ghost">{h.second}</Link>
            </div>
            <div className="hm-under">{h.under}</div>
          </div>
        </div>
        {head ? null : <StickySwitch label={h.showing} opts={h.opts} />}
        {/* Nova's machine: a chat becoming an order or a booking (NovaMachine.jsx). */}
        <div className="hm-hero-stage">
          <NovaMachine m={c.machine} chat={c.chat} dark />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Works with ---------------- */

export function Works({ c, marquee }) {
  const loop = [...marquee, ...marquee];
  return (
    <div className="hm-wrap">
      <div className="hm-works">
        <span className="hm-works-label">{c.works.label}</span>
        <div className="hm-works-belt">
          <div className="hm-works-run">
            {loop.map((t, i) => <span key={i} aria-hidden={i >= marquee.length ? "true" : undefined}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 1b · Everything to run it ---------------- */

// The system stage by stage, one line per audience; "Both" shows the two
// lines, each labelled. Nova's band runs over every stage.
export function Run({ c }) {
  const x = c.run;
  const line = (k, show) => (
    <div className="hm-run-block" data-show={show}>
      <div className="hm-run-label" data-show="both-only">{c.flow.label[k]}</div>
      <ol className="hm-run-line">
        {x[k].map((st, i) => (
          <li key={st.t} className="hm-run-stage">
            <span className="hm-run-dot" aria-hidden="true" />
            <span className="hm-run-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="hm-run-t">{st.t}</h3>
            <ul className="hm-run-items">
              {st.items.map(it => <li key={it}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>{it}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{x.kicker}</div>
        <h2 className="hm-h2" data-show="shop-only">{x.h2.shop}</h2>
        <h2 className="hm-h2" data-show="svc-only">{x.h2.svc}</h2>
        <h2 className="hm-h2" data-show="both-only">{x.h2.both}</h2>
        <p className="hm-lead-dark">{x.sub}</p>
      </div>
      <SectionSwitch label={c.hero.ask} opts={c.hero.opts} />
      <div className="hm-run">
        <div className="hm-run-nova"><span className="hm-run-orb" aria-hidden="true" />{x.nova}</div>
        {line("shop", "shop")}
        {line("svc", "svc")}
      </div>
      <p className="hm-note hm-center">{x.note}</p>
    </section>
  );
}

/* ---------------- 1c · The real app (AppScreens.jsx) ---------------- */

export function RealApp({ c }) {
  const x = c.app;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{x.kicker}</div>
        <h2 className="hm-h2">{x.h2}</h2>
        <p className="hm-lead-dark">{x.sub}</p>
      </div>
      <AppScreens screens={x.screens} groups={c.flow.label} />
    </section>
  );
}

/* ---------------- 2 · Other tools vs Dakio ---------------- */

export function Contrast({ c }) {
  const x = c.contrast;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{x.kicker}</div>
        <h2 className="hm-h2">{x.h2}</h2>
      </div>
      <div className="hm-vs" role="table">
        <div className="hm-vs-row hm-vs-top" role="row">
          <span role="columnheader" />
          <span role="columnheader">{x.cols[0]}</span>
          <span role="columnheader" className="hm-vs-us">{x.cols[1]}</span>
        </div>
        {x.rows.map(r => (
          <div className="hm-vs-row" role="row" key={r.t} data-show={r.show}>
            <span role="cell" className="hm-vs-t">{r.t}</span>
            <span role="cell" className={r.bot ? "hm-vs-yes" : "hm-vs-no"}><Check on={!!r.bot} /></span>
            <span role="cell" className="hm-vs-us hm-vs-yes"><Check /></span>
          </div>
        ))}
      </div>
      <p className="hm-note hm-center">{x.under}</p>
    </section>
  );
}

/* ---------------- 3 · Everything in one place ---------------- */

const PART_ORDER = [
  ["inbox", null], ["customers", null], ["orders", "shop"], ["bookings", "svc"],
  ["marketing", null], ["money", null], ["website", null],
];

export function Parts({ c, L }) {
  const p = c.parts;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{p.kicker}</div>
        <h2 className="hm-h2">{p.h2}</h2>
      </div>
      <div className="hm-parts">
        {PART_ORDER.map(([k, show]) => (
          <div key={k} className={`hm-part hm-part-${k}`} data-show={show || undefined}>
            <span className="hm-part-icon"><Icon name={k} /></span>
            <h3 className="hm-h3">{p.cards[k].t}</h3>
            <p className="hm-body">{p.cards[k].d}</p>
            {k === "website" ? <Link href={L("/themes")} className="hm-link">{p.link} <Arrow size={13} /></Link> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 4 · After the chat: the live chat (ChatDemo.jsx) ---------------- */

export function Flow({ c }) {
  const f = c.flow;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{f.kicker}</div>
        <h2 className="hm-h2" data-show="shop-only">{f.h2.shop}</h2>
        <h2 className="hm-h2" data-show="svc-only">{f.h2.svc}</h2>
        <h2 className="hm-h2" data-show="both-only">{f.h2.both}</h2>
      </div>
      <SectionSwitch label={c.hero.ask} opts={c.hero.opts} />
      <ChatDemo chat={c.chat} flow={{ shop: f.shop, svc: f.svc }} />
      <p className="hm-note hm-center">{f.bottom}</p>
    </section>
  );
}

/* ---------------- 5 · Set up in 5 minutes ---------------- */

export function Setup({ c }) {
  const s = c.setup;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{s.kicker}</div>
        <h2 className="hm-h2">{s.h2}</h2>
      </div>
      <ol className="hm-setup">
        {s.steps.map((st, i) => (
          <li key={i} className="hm-setup-card">
            <span className="hm-setup-n">{i + 1}</span>
            {typeof st.t === "string" ? (
              <>
                <h3 className="hm-h3">{st.t}</h3>
                <p className="hm-body">{st.d}</p>
              </>
            ) : (
              <>
                <h3 className="hm-h3" data-show="shop">{st.t.shop}</h3>
                <h3 className="hm-h3" data-show="svc-only">{st.t.svc}</h3>
                <p className="hm-body" data-show="shop">{st.d.shop}</p>
                <p className="hm-body" data-show="svc-only">{st.d.svc}</p>
              </>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ---------------- 6 · You stay in charge ---------------- */

export function Charge({ c }) {
  const x = c.charge;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-charge">
        <div className="hm-charge-head">
          <div className="hm-kicker hm-kicker-lime">{x.kicker}</div>
          <h2 className="hm-h2 hm-on-dark">{x.h2}</h2>
          <p className="hm-charge-note" data-show="shop-only">{x.note.shop}</p>
          <p className="hm-charge-note" data-show="svc-only">{x.note.svc}</p>
          <p className="hm-charge-note" data-show="both-only">{x.note.both}</p>
        </div>
        <div className="hm-charge-points">
          {x.points.map(pt => (
            <div key={pt.t} className="hm-charge-pt">
              <h3 className="hm-h3 hm-on-dark">{pt.t}</h3>
              <p className="hm-body hm-on-dark-2">{pt.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7 · Pricing ---------------- */

export function Pricing({ c, pricing, T, L }) {
  const x = c.pricing;
  return (
    <section id="plans" className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{x.kicker}</div>
        <h2 className="hm-h2">{x.h2}</h2>
        <p className="hm-lead-dark" data-show="shop-only">{x.sub.shop}</p>
        <p className="hm-lead-dark" data-show="svc-only">{x.sub.svc}</p>
        <p className="hm-lead-dark" data-show="both-only">{x.sub.both}</p>
      </div>
      <HomePlans pricing={pricing} T={T} />
      <p className="hm-note hm-center hm-plans-svc" data-show="svc">{x.svcLine}</p>
      <p className="hm-note hm-center">
        {x.busy}{" "}
        <Link href={L("/pricing")} className="hm-link">{x.footLink} <Arrow size={13} /></Link>
      </p>
      <TrialLine trial={pricing.trial} T={T} />
    </section>
  );
}

/* ---------------- 7a · Questions ---------------- */

export function Faq({ c }) {
  const x = c.faq;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{x.kicker}</div>
        <h2 className="hm-h2">{x.h2}</h2>
      </div>
      <div className="hm-faq">
        {x.items.map(it => (
          <details key={it.q}>
            <summary><span>{it.q}</span><span className="hm-faq-plus" aria-hidden="true" /></summary>
            <p className="hm-body">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 8 · Closing ---------------- */

export function Closing({ c, heading }) {
  const x = c.cta;
  return (
    <section className="hm-wrap hm-sec hm-sec-last" data-reveal>
      <div className="hm-cta">
        <h2 className="hm-cta-h2">{heading || x.h2}</h2>
        <StartLink href={REGISTER_URL} className="hm-btn hm-btn-ink"><span className="hm-dot" />{x.primary}</StartLink>
        <div className="hm-cta-under">{x.under}</div>
      </div>
    </section>
  );
}

/* ---------------- /shops and /services blocks ---------------- */

export function ShopExtras({ c }) {
  const x = c.shops;
  return (
    <section className="hm-wrap hm-sec" data-reveal>
      <div className="hm-head">
        <div className="hm-kicker">{x.extraKicker}</div>
        <h2 className="hm-h2">{x.extraH2}</h2>
      </div>
      <div className="hm-grid4">
        {x.extra.map(e => (
          <div key={e.t} className="hm-part">
            <h3 className="hm-h3">{e.t}</h3>
            <p className="hm-body">{e.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServiceKinds({ c }) {
  const x = c.services;
  return (
    <>
      <section className="hm-wrap hm-sec" data-reveal>
        <div className="hm-head">
          <div className="hm-kicker">{x.kindsKicker}</div>
          <h2 className="hm-h2">{x.kindsH2}</h2>
        </div>
        <div className="hm-kinds">
          {x.kinds.map(k => (
            <a key={k.n} href={REGISTER_URL} className="hm-kind">
              <span className="hm-h3">{k.n}</span>
              <span className="hm-body">{k.d}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="hm-wrap hm-sec" data-reveal>
        <div className="hm-team">
          <h2 className="hm-h2">{x.teamH2}</h2>
          <div>
            <p className="hm-body hm-team-p">{x.team}</p>
            <p className="hm-note">{x.gcal}</p>
          </div>
        </div>
      </section>
    </>
  );
}
