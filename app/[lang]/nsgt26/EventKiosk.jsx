"use client";

// The kiosk screen for dakio.io/nsgt26. One screen, no scrolling on the stall
// display: video on one side, the offer and the QR on the other. It keeps the
// display awake, reloads itself every 10 minutes (fresh prices, and it recovers
// from a dropped connection), hides the cursor, and goes full screen on the
// first tap. After the offer ends it says so instead of showing a dead code.

import { useEffect, useRef, useState } from "react";

const RELOAD_MS = 10 * 60 * 1000;

const NOVA_LINES = [
  "84টি মেসেজের উত্তর দিয়েছে",
  "কমেন্ট থেকে ইনবক্সে অর্ডার নিয়েছে",
  "অসম্পূর্ণ অর্ডার থেকে ৳2,300 বিক্রি",
];

const BENEFITS = [
  { t: "ইনবক্স ও কমেন্টে ২৪ ঘণ্টা উত্তর", d: "Messenger, Instagram আর পেজের কমেন্টে Nova দাম বলে, ছবি পাঠায়, অর্ডার নেয়।" },
  { t: "কয়েক মিনিটে নিজের ওয়েবসাইট", d: "bKash, ক্যাশ অন ডেলিভারি আর কুরিয়ার — প্রথম দিন থেকেই চালু।" },
  { t: "অর্ডার, স্টক, হিসাব — এক অ্যাপে", d: "কোডিং বা ডেভেলপার লাগবে না। নিয়ন্ত্রণ সবসময় আপনার হাতে।" },
];

const INTERVAL_BN = { MONTHLY: "মাসিক", YEARLY: "বার্ষিক" };
const PER_BN = { MONTHLY: "/মাস", YEARLY: "/বছর" };

function useNow() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useKioskBehaviour() {
  useEffect(() => {
    let lock = null;
    const awake = async () => {
      try { if (document.visibilityState === "visible" && navigator.wakeLock) lock = await navigator.wakeLock.request("screen"); } catch { /* not allowed: fine */ }
    };
    awake();
    document.addEventListener("visibilitychange", awake);

    const reload = setInterval(() => { if (navigator.onLine !== false) window.location.reload(); }, RELOAD_MS);

    let idle;
    const wake = () => {
      document.body.classList.remove("kz-idle");
      clearTimeout(idle);
      idle = setTimeout(() => document.body.classList.add("kz-idle"), 3000);
    };
    window.addEventListener("pointermove", wake);
    wake();

    const full = () => {
      if (window.innerWidth >= 900 && !document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    };
    window.addEventListener("pointerdown", full, { once: true });

    return () => {
      document.removeEventListener("visibilitychange", awake);
      clearInterval(reload);
      window.removeEventListener("pointermove", wake);
      clearTimeout(idle);
      lock?.release?.().catch(() => {});
    };
  }, []);
}

function Countdown({ ms }) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const pad = n => String(n).padStart(2, "0");
  const parts = [[Math.floor(s / 3600), "ঘণ্টা"], [Math.floor((s % 3600) / 60), "মিনিট"], [s % 60, "সেকেন্ড"]];
  return (
    <div className="kz-count" aria-label="অফার শেষ হতে বাকি">
      {parts.map(([v, l]) => (
        <span key={l}><b>{pad(v)}</b><i>{l}</i></span>
      ))}
    </div>
  );
}

function Stage({ video }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  if (video && !failed) {
    return (
      <div className="kz-stage">
        <video ref={ref} src={video.src} poster={video.poster} autoPlay muted={muted} loop playsInline onError={() => setFailed(true)} />
        <button type="button" className="kz-sound" onClick={() => { setMuted(m => !m); ref.current?.play?.(); }}>
          {muted ? "🔊 শব্দ চালু করুন" : "🔇 শব্দ বন্ধ"}
        </button>
      </div>
    );
  }
  // No video yet: Nova herself, with the kind of receipts she leaves.
  return (
    <div className="kz-stage kz-stage-nova" aria-hidden>
      <div className="kz-ring" />
      <div className="kz-orb"><span>NOVA</span></div>
      {NOVA_LINES.map((t, i) => (
        <div key={t} className={`kz-chip kz-chip-${i}`}><i />{t}<em>RECEIPT</em></div>
      ))}
      <div className="kz-duty">২৪ ঘণ্টা কাজে · প্রতিটি কাজের রসিদ</div>
    </div>
  );
}

export default function EventKiosk({ code, signupUrl, offerEnds, offer, qrSvg, video }) {
  useKioskBehaviour();
  const now = useNow();
  const endMs = new Date(offerEnds).getTime();
  const ended = now != null && now >= endMs;
  const firstPayments = offer.paidPeriods > 1 ? `প্রথম ${offer.paidPeriods}টি পেমেন্টে` : "প্রথম পেমেন্টে";
  const byPlan = offer.rows.reduce((m, r) => ((m[r.plan] = m[r.plan] || []).push(r), m), {});

  return (
    <div className="kz">
      <Stage video={video} />

      <section className="kz-panel">
        <header className="kz-top">
          <img src="/brand/dakio-wordmark-cream.svg" alt="dakio" className="kz-logo" />
          <div className="kz-event">
            <b>এনএস পুনর্মিলনী ২০২৬</b>
            <span>নেছারাবাদের টানে এসো মিলি প্রাণে প্রাণে</span>
          </div>
        </header>

        <h1 className="kz-h1">আপনার ব্যবসার হাল ধরুক <span>একজন AI CEO</span></h1>
        <p className="kz-lede"><b>Nova</b> আপনার কাস্টমারের উত্তর দেয়, অর্ডার নেয়, স্টোর চালায় — আপনি ঘুমালেও।</p>

        <ul className="kz-benefits">
          {BENEFITS.map(b => (
            <li key={b.t}>
              <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              <div><b>{b.t}</b><span>{b.d}</span></div>
            </li>
          ))}
        </ul>

        {ended ? (
          <div className="kz-offer kz-ended">
            <div className="kz-offer-big">পুনর্মিলনীর অফার শেষ হয়েছে</div>
            <p>আমাদের স্টলে আসার জন্য ধন্যবাদ! Dakio এখনো 14 দিন ফ্রি ট্রায়ালে শুরু করা যায় — dakio.io</p>
          </div>
        ) : (
          <div className="kz-offer">
            <div className="kz-offer-main">
              <div className="kz-offer-big">70% <span>ছাড়</span></div>
              <div className="kz-offer-sub">{firstPayments} · শুধু আজ রাত 11:59 পর্যন্ত</div>
              <div className="kz-code">কোড <b>{code}</b></div>
              {now != null && <Countdown ms={endMs - now} />}
            </div>

            <div className="kz-qr">
              <div className="kz-qr-box" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <div className="kz-qr-text">
                <b>ফোনের ক্যামেরায় স্ক্যান করুন</b>
                <span>কোডসহ সাইন আপ খুলে যাবে</span>
              </div>
              <a className="kz-cta" href={signupUrl}>70% ছাড়ে শুরু করুন →</a>
            </div>
            {Object.keys(byPlan).length > 0 && (
              <div className="kz-prices">
                {Object.entries(byPlan).map(([plan, rows]) => (
                  <div key={plan} className="kz-price">
                    <b>{plan}</b>
                    {rows.map(r => (
                      <div key={r.interval}>
                        <span className="kz-iv">{INTERVAL_BN[r.interval]}</span>
                        <s>{r.list}</s>
                        <strong>{r.final}</strong>
                        <span className="kz-per">{PER_BN[r.interval]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <footer className="kz-foot">
          <span>১৬ অক্টোবর ২০২৬ · আপন ভুবন রিসোর্ট, পূবাইল · আয়োজনে Fans Family · প্রশ্ন থাকলে Dakio স্টলে আসুন</span>
          <span className="kz-url">dakio.io/nsgt26</span>
        </footer>
      </section>
    </div>
  );
}
