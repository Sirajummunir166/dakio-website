"use client";

// The kiosk screen for dakio.io/nsgt26 — read from a few steps away at a busy
// stall, so it says ONE thing: the event film, one line about Nova, and one
// offer card (70%, the code, one QR). The #DakioNovaDay gift is a single quiet
// line; staff explain the rest in person.
//
// It keeps the display awake, reloads itself every 10 minutes (recovers from a
// dropped connection), hides the cursor, and goes full screen on the first tap.
// After the offer ends it thanks people instead of showing a dead code.

import { useEffect, useRef, useState } from "react";

const RELOAD_MS = 10 * 60 * 1000;

function useEnded(offerEnds) {
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    const end = new Date(offerEnds).getTime();
    const tick = () => setEnded(Date.now() >= end);
    tick();
    const id = setInterval(tick, 30 * 1000);
    return () => clearInterval(id);
  }, [offerEnds]);
  return ended;
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

function Stage({ video }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  if (video && !failed) {
    return (
      <div className="kz-stage">
        <video ref={ref} src={video.src} poster={video.poster} autoPlay muted={muted} loop playsInline onError={() => setFailed(true)} />
        <button type="button" className="kz-sound" aria-label={muted ? "শব্দ চালু করুন" : "শব্দ বন্ধ করুন"} onClick={() => { setMuted(m => !m); ref.current?.play?.(); }}>
          {muted ? "🔇" : "🔊"}
        </button>
      </div>
    );
  }
  // No film: Nova herself, quietly.
  return (
    <div className="kz-stage kz-stage-nova" aria-hidden>
      <div className="kz-orb" />
    </div>
  );
}

export default function EventKiosk({ code, signupUrl, offerEnds, firstPayments, qrSvg, contest, video }) {
  useKioskBehaviour();
  const ended = useEnded(offerEnds);

  return (
    <div className="kz">
      <Stage video={video} />

      <section className="kz-panel">
        <header className="kz-top">
          <img src="/brand/dakio-wordmark-cream.svg" alt="dakio" className="kz-logo" />
          <span className="kz-event">এনএস পুনর্মিলনী ২০২৬</span>
        </header>

        <div className="kz-hero">
          <h1 className="kz-h1">আপনার ব্যবসার হাল ধরুক<br /><span>একজন AI CEO</span></h1>
          <p className="kz-lede"><b>Nova</b> কাস্টমারের উত্তর দেয়, অর্ডার নেয় — আপনি ঘুমালেও।</p>
        </div>

        {ended ? (
          <div className="kz-offer kz-ended">
            <div>
              <div className="kz-offer-big kz-ended-big">ধন্যবাদ!</div>
              <p>পুনর্মিলনীর অফার শেষ হয়েছে। #DakioNovaDay-এর বিজয়ীদের নাম Dakio পেজে ঘোষণা করা হবে।</p>
            </div>
          </div>
        ) : (
          <div className="kz-offer">
            <div className="kz-offer-main">
              <div className="kz-offer-kicker">শুধু আজ</div>
              <div className="kz-offer-big">70% <span>ছাড়</span></div>
              <div className="kz-offer-sub">{firstPayments}, কোড দিয়ে</div>
              <div className="kz-code">{code}</div>
            </div>
            <div className="kz-qr">
              <div className="kz-qr-box" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <b>স্ক্যান করে শুরু করুন</b>
              <a className="kz-cta" href={signupUrl}>70% ছাড়ে শুরু করুন →</a>
            </div>
          </div>
        )}

        {/* Facebook's promotion rules: entry may not require sharing to a
            timeline or tagging friends, and it must say Facebook has no part
            in it. Following the page stays an invitation. */}
        {!ended && contest && (
          <p className="kz-gift">
            🎁 Nova-র সঙ্গে কথা বলে <b>{contest.hashtag}</b> দিয়ে পোস্ট করুন — লটারিতে {contest.winners} জন পাবেন উপহার
          </p>
        )}

        <footer className="kz-foot">
          <span>বিস্তারিত Dakio স্টলে · fb.com/dakio.official · এই আয়োজনের সঙ্গে Facebook-এর সম্পর্ক নেই</span>
          <span className="kz-url">dakio.io/nsgt26</span>
        </footer>
      </section>
    </div>
  );
}
