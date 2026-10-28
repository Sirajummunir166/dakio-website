"use client";

// The "What do you sell?" switch (HOME_COPY.md, hero).
//
// The sections stay server-rendered with every variant in the markup; this
// only holds the choice and writes it to data-aud on the wrapper. app/home.css
// then hides what does not apply, by each element's data-show:
//   shop / svc        shown for that choice and for "both"
//   shop-only / svc-only / both-only   shown for that choice alone
// So the page reads right with JS off (Products is the server default) and a
// switch costs no re-render of the sections.

import { createContext, useContext, useState } from "react";

const AudienceContext = createContext({ aud: "shop", setAud: () => {} });

export function AudienceRoot({ initial = "shop", children }) {
  const [aud, setAud] = useState(initial);
  return (
    <AudienceContext.Provider value={{ aud, setAud }}>
      <div className="hm" data-aud={aud}>{children}</div>
    </AudienceContext.Provider>
  );
}

export function AudienceSwitch({ label, opts }) {
  const { aud, setAud } = useContext(AudienceContext);
  return (
    <div className="hm-ask">
      <span className="hm-ask-label" id="hm-ask-label">{label}</span>
      <div className="hm-seg" role="group" aria-labelledby="hm-ask-label">
        {["shop", "svc", "both"].map(k => (
          <button key={k} type="button" aria-pressed={aud === k} onClick={() => setAud(k)}>{opts[k]}</button>
        ))}
      </div>
    </div>
  );
}
