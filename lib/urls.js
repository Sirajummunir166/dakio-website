// Merchant app auth URLs (same convention as dakio-landing's APP_URL).
export const APP_URL = "https://app.dakio.io";
export const LOGIN_URL = `${APP_URL}/`;
export const REGISTER_URL = `${APP_URL}/register`;

// The "Start your free trial" / "Open your store" buttons. Signup opens a bare
// /register link in BUY mode (the paid options, trial as a side door — the
// owner's call, so a visitor who came to pay is never steered away from it).
// Any `?plan=<code>` without a period opens it in TRIAL mode on that package,
// so a button that promises a free trial must carry one. Growth is the
// entry trial; an unknown code falls back to the popular plan's trial.
export const TRIAL_URL = `${REGISTER_URL}?plan=growth`;
