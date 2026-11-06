// "Or start free, forever →": one small line under the home page's plan cards
// (lib/plans.js#freeOffer). Renders nothing when the catalogue has no Free plan.

import { FREE_URL } from "../../lib/urls";

export default function FreeLine({ free, T = {}, style }) {
  if (!free?.line) return null;
  return (
    <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, ...style }}>
      <a href={FREE_URL} style={{ color: "#3E7A45", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3, ...T.small }}>
        {free.line} →
      </a>
    </div>
  );
}
