"use client";

// The thin bar a visitor sees after arriving from an influencer link
// (dakio.io/c/RAFI20 → middleware saves the code in the `dakio_coupon` cookie and
// lands here with ?coupon=RAFI20). It asks dakio-api whether the code is live,
// says what it is worth, and sends "Start free" to signup with the code attached.
// The app also reads the cookie, so the code survives even if they wander off
// and come back through the nav.
//
// It shows nothing for a dead code — never an error on the marketing site — and
// a dismiss only hides the bar for this browser session; the code stays saved.
// The discount itself is decided where money moves (dakio-api), not here.

import { useEffect, useState } from "react";
import { REGISTER_URL } from "../lib/urls";

const API_BASE = process.env.NEXT_PUBLIC_DAKIO_API_URL || "https://dakio-api-production.up.railway.app";
const CODE_RE = /^[A-Z0-9_-]{3,32}$/;
const HIDE_KEY = "dakio_coupon_hidden";

const COPY = {
  en: { lead: "Code", saved: "saved", onPlan: "on your first plan payment", cta: "Start free", close: "Hide" },
  bn: { lead: "কোড", saved: "সেভ হয়েছে", onPlan: "প্রথম প্ল্যান পেমেন্টে", cta: "ফ্রি শুরু করুন", close: "লুকান" },
};

// Said out loud when a code only fits some billing periods, so nobody is surprised at checkout.
const PERIODS = {
  en: { MONTHLY: "monthly", SIXMONTH: "6-month", YEARLY: "yearly", tail: "plans only" },
  bn: { MONTHLY: "মাসিক", SIXMONTH: "৬ মাসের", YEARLY: "বার্ষিক", tail: "প্ল্যানে" },
};
const periods = (c, lang) => {
  const p = PERIODS[lang] || PERIODS.en;
  const list = (c.intervals || []).filter(i => p[i]);
  return list.length ? ` (${list.map(i => p[i]).join(" / ")} ${p.tail})` : "";
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = s => String(s).replace(/\d/g, d => BN_DIGITS[d]);
const taka = (n, lang) => {
  const s = `৳${Number(n).toLocaleString("en-US")}`;
  return lang === "bn" ? toBn(s) : s;
};

/** "20% off (up to ৳500)" / "২০% ছাড় (সর্বোচ্চ ৳৫০০)" — built here so Bangla reads as Bangla. */
function label(c, lang) {
  if (c.discountType === "FIXED") return lang === "bn" ? `${taka(c.discountValue, lang)} ছাড়` : `${taka(c.discountValue, lang)} off`;
  if (lang === "bn") return `${toBn(c.discountValue)}% ছাড়${c.maxDiscount ? ` (সর্বোচ্চ ${taka(c.maxDiscount, lang)})` : ""}`;
  return `${c.discountValue}% off${c.maxDiscount ? ` (up to ${taka(c.maxDiscount, lang)})` : ""}`;
}

function readCode() {
  try {
    const q = new URLSearchParams(window.location.search).get("coupon");
    if (q) return q.trim().toUpperCase();
    const m = document.cookie.match(/(?:^|;\s*)dakio_coupon=([^;]+)/);
    return m ? decodeURIComponent(m[1]).trim().toUpperCase() : "";
  } catch {
    return "";
  }
}

export default function CouponStrip({ lang = "en" }) {
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    const code = readCode();
    if (!CODE_RE.test(code)) return;
    try { if (sessionStorage.getItem(HIDE_KEY) === code) return; } catch { /* storage blocked: just show it */ }
    let alive = true;
    fetch(`${API_BASE}/api/public/plan-coupons/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then(r => r.json())
      .then(d => { if (alive && d?.ok && d.discountType) setCoupon(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  if (!coupon) return null;
  const t = COPY[lang] || COPY.en;
  const hide = () => {
    try { sessionStorage.setItem(HIDE_KEY, coupon.code); } catch { /* ignore */ }
    setCoupon(null);
  };

  return (
    <div
      role="status"
      style={{
        background: "var(--dk-ink)", color: "var(--dk-cream)",
        fontFamily: lang === "bn" ? "var(--dk-font-bn)" : "var(--dk-font-sans)",
        fontSize: 14, lineHeight: 1.4,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
        <span>
          {t.lead}{" "}
          <b style={{ fontFamily: "var(--dk-font-mono)", letterSpacing: "0.06em", color: "var(--dk-lime)" }}>{coupon.code}</b>{" "}
          {t.saved} · <b>{label(coupon, lang)}</b> {t.onPlan}{periods(coupon, lang)}
        </span>
        <a
          href={`${REGISTER_URL}?code=${encodeURIComponent(coupon.code)}`}
          style={{ background: "var(--dk-lime)", color: "var(--dk-ink)", fontWeight: 700, padding: "6px 14px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap" }}
        >
          {t.cta}
        </a>
        <button
          type="button"
          onClick={hide}
          aria-label={t.close}
          style={{ background: "transparent", border: 0, color: "var(--dk-cream)", opacity: 0.7, cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4 }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
