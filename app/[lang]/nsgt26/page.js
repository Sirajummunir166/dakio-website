// dakio.io/nsgt26 — the Dakio stall at the NS reunion (এনএস পুনর্মিলনী ২০২৬,
// Apon Bhubon Resort, Pubail, 16 Oct 2026). Runs full screen on the stall's
// kiosk display: the event video, Nova in one line, the 70% code NSGT26, and a
// QR that opens signup with the code already applied. On a phone the QR gives
// way to a button.
//
// The screen states the offer, not a price table: the only live fact it reads
// is how many payments NSGT26 discounts ("প্রথম পেমেন্টে"), from the API's own
// coupon check. Checkout shows the exact taka.
//
// Standalone like /nsgettogather26: no nav or footer, noindex, Bangla on both
// /nsgt26 and /bn/nsgt26 (the audience is one room in Gazipur).

import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import { REGISTER_URL } from "../../../lib/urls";
import EventKiosk from "./EventKiosk";
import "./kiosk.css";

const CODE = "NSGT26";
// The offer is good for the event day, Dhaka time.
const OFFER_ENDS = "2026-10-16T23:59:59+06:00";
const API_BASE = process.env.DAKIO_API_URL || "https://dakio-api-production.up.railway.app";
const SIGNUP_URL = `${REGISTER_URL}?code=${CODE}`;
// The #DakioNovaDay draw: post about Nova, 10 winners picked at random.
const HASHTAG = "#DakioNovaDay";
// Drop the event video here and push — the page picks it up on the next build.
const VIDEO = { file: "public/assets/nsgt26/event.mp4", src: "/assets/nsgt26/event.mp4", poster: "/assets/nsgt26/poster.jpg" };

// Short enough to re-check through the morning: an admin fixing the code's
// dates shows up on the kiosk within minutes (the kiosk reloads itself).
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

/** "প্রথম পেমেন্টে" or "প্রথম 3টি পেমেন্টে" — from the coupon itself when it is live. */
async function firstPaymentsLine() {
  const r = await checkCode({});
  const n = r?.ok ? Number(r.paidPeriods) || 1 : 1;
  return n > 1 ? `প্রথম ${n}টি পেমেন্টে` : "প্রথম পেমেন্টে";
}

export default async function NsGt26Page() {
  const [firstPayments, qr] = await Promise.all([
    firstPaymentsLine(),
    QRCode.toString(SIGNUP_URL, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0F120B", light: "#FFFFFF" } }),
  ]);
  const hasVideo = fs.existsSync(path.join(process.cwd(), VIDEO.file));
  const hasPoster = fs.existsSync(path.join(process.cwd(), "public/assets/nsgt26/poster.jpg"));

  return (
    <EventKiosk
      code={CODE}
      signupUrl={SIGNUP_URL}
      offerEnds={OFFER_ENDS}
      firstPayments={firstPayments}
      qrSvg={qr}
      contest={{ hashtag: HASHTAG, winners: 10 }}
      video={hasVideo ? { src: VIDEO.src, poster: hasPoster ? VIDEO.poster : undefined } : null}
    />
  );
}
