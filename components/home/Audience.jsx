"use client";

// The "What do you sell?" choice (HOME_COPY.md, hero).
//
// The sections stay server-rendered with every variant in the markup; this
// only holds the choice and writes it to data-aud on the wrapper. app/home.css
// then hides what does not apply, by each element's data-show:
//   shop / svc        shown for that choice and for "both"
//   shop-only / svc-only / both-only   shown for that choice alone
// So the page reads right with JS off (Both is the home's default) and a
// switch costs no re-render of the sections.
//
// The home opens on Both, so nobody has to find the switch to see services.
// An ad can open it narrowed: ?for=shops, ?for=services or ?for=both.
// The choice can be changed in two places that stay in step: the hero, and a
// pill that follows you once the hero has scrolled away.

import { createContext, useContext, useEffect, useState } from "react";

const AudienceContext = createContext({ aud: "both", setAud: () => {}, switchable: false });

/** The current choice, for client components that render per audience. */
export const useAudience = () => useContext(AudienceContext);

const FROM_LINK = { shops: "shop", shop: "shop", products: "shop", services: "svc", service: "svc", svc: "svc", both: "both" };
const KEYS = ["shop", "svc", "both"];

export function AudienceRoot({ initial = "both", switchable = true, children }) {
  const [aud, setAud] = useState(initial);
  useEffect(() => {
    if (!switchable) return;
    const want = FROM_LINK[new URLSearchParams(window.location.search).get("for")?.toLowerCase()];
    if (want) setAud(want);
  }, [switchable]);
  return (
    <AudienceContext.Provider value={{ aud, setAud, switchable }}>
      <div className="hm" data-aud={aud}>{children}</div>
    </AudienceContext.Provider>
  );
}

function Seg({ opts, className = "hm-seg", labelledBy, label }) {
  const { aud, setAud } = useContext(AudienceContext);
  return (
    <div className={className} role="group" aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : label}>
      {KEYS.map(k => (
        <button key={k} type="button" aria-pressed={aud === k} onClick={() => setAud(k)}>{opts[k]}</button>
      ))}
    </div>
  );
}

export function AudienceSwitch({ label, opts }) {
  return (
    <div className="hm-ask">
      <span className="hm-ask-label" id="hm-ask-label">{label}</span>
      <Seg opts={opts} labelledBy="hm-ask-label" />
    </div>
  );
}

/** A pill that appears once the hero has scrolled out of view. */
export function StickySwitch({ label, opts }) {
  const { switchable } = useContext(AudienceContext);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!switchable) return undefined;
    const hero = document.querySelector(".hm-hero");
    const end = document.querySelector(".hm-sec-last");
    if (!hero) return undefined;
    let pastHero = false, atEnd = false;
    const io = new IntersectionObserver(entries => {
      for (const en of entries) {
        if (en.target === hero) pastHero = !en.isIntersecting && en.boundingClientRect.top < 0;
        if (en.target === end) atEnd = en.isIntersecting;
      }
      setShow(pastHero && !atEnd);
    });
    io.observe(hero);
    if (end) io.observe(end);
    return () => io.disconnect();
  }, [switchable]);
  if (!switchable) return null;
  return (
    <div className={`hm-sticky${show ? " is-on" : ""}`} aria-hidden={!show}>
      <span className="hm-sticky-label">{label}</span>
      <Seg opts={opts} className="hm-seg hm-seg-sticky" label={label} />
    </div>
  );
}

const SELLS = { shop: "products", svc: "services", both: "both" };

/** "Get started" that carries the choice to signup (?sells=), which preselects it. */
export function StartLink({ href, className, children }) {
  const { aud } = useContext(AudienceContext);
  return <a href={`${href}?sells=${SELLS[aud]}`} className={className}>{children}</a>;
}
