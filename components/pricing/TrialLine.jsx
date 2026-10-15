// "Not ready to buy? Get a free N-day trial →" — the only place the site offers
// the trial (lib/plans.js#trialOffer). Small and quiet under the plan cards;
// renders nothing when no package offers a trial.

import { TRIAL_URL } from "../../lib/urls";

export default function TrialLine({ trial, T = {}, style }) {
  if (!trial?.line) return null;
  return (
    <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, ...style }}>
      <a href={TRIAL_URL} style={{ color: "#3E7A45", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3, ...T.small }}>
        {trial.line} →
      </a>
    </div>
  );
}
