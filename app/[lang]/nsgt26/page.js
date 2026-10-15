// dakio.io/nsgt26 — the Dakio stall at the NS reunion (এনএস পুনর্মিলনী ২০২৬,
// Apon Bhubon Resort, Pubail, 16 Oct 2026). Runs full screen on the stall's
// kiosk display: the event video, Nova in one line, the 70% code NSGT26, and a
// QR that opens signup with the code already applied. On a phone the QR gives
// way to a button.
//
// Prices are not typed here. Each one is the API's own answer for "this plan,
// this period, with NSGT26" (/api/public/plan-coupons/check), so the kiosk shows
// exactly what checkout will charge. If the code is not live yet (or the API is
// unreachable) the page falls back to the list price × 30% and says nothing it
// cannot back — the headline is the offer the stall is making either way.
//
// Standalone like /nsgettogather26: no nav or footer, noindex, Bangla on both
// /nsgt26 and /bn/nsgt26 (the audience is one room in Gazipur).

import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import { fetchCatalogue } from "../../../lib/plans";
import { REGISTER_URL } from "../../../lib/urls";
import EventKiosk from "./EventKiosk";
import "./kiosk.css";

const CODE = "NSGT26";
// The offer is good for the event day, Dhaka time.
const OFFER_ENDS = "2026-10-16T23:59:59+06:00";
const API_BASE = process.env.DAKIO_API_URL || "https://dakio-api-production.up.railway.app";
const SIGNUP_URL = `${REGISTER_URL}?code=${CODE}`;
// The #DakioNovaDay draw: post about Nova, 10 winners picked at random.
const FB_PAGE = "https://www.facebook.com/dakio.official";
const HASHTAG = "#DakioNovaDay";
// Drop the event video here and push — the page picks it up on the next build.
const VIDEO = { file: "public/assets/nsgt26/event.mp4", src: "/assets/nsgt26/event.mp4", poster: "/assets/nsgt26/poster.jpg" };

// Short enough to re-check through the morning: an admin fixing the code's
// dates shows up on the kiosk within two minutes (the kiosk reloads itself).
export const revalidate = 120;

export const metadata = {
  title: "এনএস পুনর্মিলনী ২০২৬ — Dakio-তে আজ 70% ছাড় | কোড NSGT26",
  description: "শুধু পুনর্মিলনীর দিনে: কোড NSGT26 দিয়ে Dakio-র প্রথম পেমেন্টে 70% ছাড়। আপনার অনলাইন ব্যবসার AI CEO — Nova।",
  robots: { index: false, follow: false },
};

async function checkCode(body) {
  try {
    const res = await fetch(`${API_BASE}/api/public/plan-coupons/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: CODE, ...body }),
      next: { revalidate },
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

const tk = n => `৳${new Intl.NumberFormat("en-US").format(Math.round(n))}`;

async function offerPrices() {
  const [catalogue, general] = await Promise.all([fetchCatalogue("bn"), checkCode({})]);
  const plans = (catalogue?.plans || []).filter(p => ["growth", "business"].includes(p.code));
  const rows = [];
  for (const p of plans) {
    for (const interval of ["MONTHLY", "YEARLY"]) {
      const list = p.prices?.[interval]?.amount;
      if (!(list > 0)) continue;
      const r = await checkCode({ plan: p.code, interval });
      // Only a "wrong plan / wrong period" answer means this row is not on offer.
      if (r && !r.ok && ["wrong_plan", "wrong_interval", "too_small"].includes(r.reason)) continue;
      const exact = r?.ok && r.finalAmount != null;
      rows.push({
        plan: p.name, code: p.code, interval,
        list: tk(exact ? r.listAmount : list),
        final: tk(exact ? r.finalAmount : list * 0.3),
        exact,
      });
    }
  }
  return {
    rows,
    live: Boolean(general?.ok),
    reason: general?.ok ? null : general?.reason || "unreachable",
    paidPeriods: general?.ok ? Number(general.paidPeriods) || 1 : 1,
  };
}

export default async function NsGt26Page() {
  const qrOpts = { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0F120B", light: "#FFFFFF" } };
  const [offer, qr, fbQr] = await Promise.all([
    offerPrices(),
    QRCode.toString(SIGNUP_URL, qrOpts),
    QRCode.toString(FB_PAGE, qrOpts),
  ]);
  const hasVideo = fs.existsSync(path.join(process.cwd(), VIDEO.file));
  const hasPoster = fs.existsSync(path.join(process.cwd(), "public/assets/nsgt26/poster.jpg"));

  return (
    <EventKiosk
      code={CODE}
      signupUrl={SIGNUP_URL}
      offerEnds={OFFER_ENDS}
      offer={offer}
      qrSvg={qr}
      contest={{ hashtag: HASHTAG, page: FB_PAGE, qrSvg: fbQr, winners: 10 }}
      video={hasVideo ? { src: VIDEO.src, poster: hasPoster ? VIDEO.poster : undefined } : null}
    />
  );
}
