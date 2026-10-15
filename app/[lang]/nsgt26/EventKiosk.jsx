"use client";

// The kiosk screen for dakio.io/nsgt26 — read from a few steps away at a busy
// stall, so it says ONE thing: the event film, one line about Nova, and one
// offer card (70%, the code with a countdown, one QR, the prices). The #DakioNovaDay gift is a single quiet
// line; staff explain the rest in person.
//
// It keeps the display awake, reloads itself every 10 minutes (recovers from a
// dropped connection), hides the cursor, and goes full screen on the first tap.
// After the offer ends it thanks people instead of showing a dead code.

import { useEffect, useRef, useState } from "react";

const RELOAD_MS = 10 * 60 * 1000;

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

const VIEW_KEY = "kz-view";

/** Which card the screen shows. Staff switch it by tap (or 1/2, ←/→ on a
 *  keyboard); it survives the 10-minute self-reload, and ?view=nova opens on it. */
function useView() {
  const [view, setView] = useState("offer");
  useEffect(() => {
    let v = new URLSearchParams(window.location.search).get("view");
    try { v = v || sessionStorage.getItem(VIEW_KEY); } catch { /* storage blocked */ }
    if (v === "nova" || v === "offer") setView(v);
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(VIEW_KEY, view); } catch { /* storage blocked */ }
  }, [view]);
  useEffect(() => {
    const onKey = e => {
      if (e.key === "1" || e.key === "ArrowLeft") setView("offer");
      else if (e.key === "2" || e.key === "ArrowRight") setView("nova");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return [view, setView];
}

/** The #DakioNovaDay card: the three steps, and the Dakio page's QR. */
function NovaDayCard({ contest, ended }) {
  return (
    <div className="kz-nova">
      <div className="kz-nova-main">
        <div className="kz-nova-tag">{contest.hashtag}</div>
        <div className="kz-nova-h">পোস্ট করুন, উপহার জিতুন</div>
        {ended ? (
          <p className="kz-nova-done">ধন্যবাদ! লটারিতে বাছাই করা {contest.winners} জন বিজয়ীর নাম ১৭ অক্টোবর Dakio পেজে ঘোষণা করা হবে।</p>
        ) : (
          <ol className="kz-steps">
            <li><b>Nova-র সঙ্গে কথা বলুন</b><span>স্টলে আমাদের ডেমো স্টোরে কাস্টমার হয়ে প্রশ্ন করুন, অর্ডার দিন। চাইলে ভিডিও করে দেব।</span></li>
            <li><b>পাবলিক পোস্ট করুন</b><span><em>{contest.hashtag}</em> দিয়ে — CEO হিসেবে Nova-কে ১০-এ কত দেবেন?</span></li>
            <li><b>উপহার জিতুন</b><span>লটারিতে {contest.winners} জন পাবেন Dakio-র উপহার। বিজয়ী ঘোষণা ১৭ অক্টোবর।</span></li>
          </ol>
        )}
      </div>
      <div className="kz-qr kz-fbqr">
        <div className="kz-qr-box" dangerouslySetInnerHTML={{ __html: contest.qrSvg }} />
        <div className="kz-qr-text">
          <b>Dakio পেজ ফলো করুন</b>
          <span>বিজয়ীর ঘোষণা এখানেই</span>
        </div>
        <a className="kz-cta kz-cta-fb" href={contest.page} target="_blank" rel="noopener">Dakio পেজে যান →</a>
      </div>
      {!ended && <div className="kz-nova-foot">আজ রাত 11:59 পর্যন্ত পোস্ট করা যাবে</div>}
    </div>
  );
}

export default function EventKiosk({ code, signupUrl, offerEnds, offer, qrSvg, contest, video }) {
  const [view, setView] = useView();
  useKioskBehaviour();
  const now = useNow();
  const endMs = new Date(offerEnds).getTime();
  const ended = now != null && now >= endMs;
  const byPlan = offer.rows.reduce((m, r) => ((m[r.plan] = m[r.plan] || []).push(r), m), {});

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

        {contest && (
          <div className="kz-switch" role="tablist" aria-label="কী দেখাবে">
            <button type="button" role="tab" aria-selected={view === "offer"} onClick={() => setView("offer")}>70% অফার</button>
            <button type="button" role="tab" aria-selected={view === "nova"} onClick={() => setView("nova")}>🎁 {contest.hashtag}</button>
          </div>
        )}

        {contest && view === "nova" ? (
          <NovaDayCard contest={contest} ended={ended} />
        ) : ended ? (
          <div className="kz-offer kz-ended">
            <div>
              <div className="kz-offer-big kz-ended-big">ধন্যবাদ!</div>
              <p>পুনর্মিলনীর অফার শেষ হয়েছে। #DakioNovaDay-এর বিজয়ীদের নাম Dakio পেজে ঘোষণা করা হবে।</p>
            </div>
          </div>
        ) : (
          <div className="kz-offer">
            <div className="kz-offer-main">
              <div className="kz-offer-big">70% <span>ছাড়</span></div>
              <div className="kz-offer-sub">{offer.firstPayments} · শুধু আজ রাত 11:59 পর্যন্ত</div>
              <div className="kz-code-row">
                <div className="kz-code">কোড <b>{code}</b></div>
                {now != null && <Countdown ms={endMs - now} />}
              </div>
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

        {/* Facebook's promotion rules: entry may not require sharing to a
            timeline or tagging friends, so following the page stays an
            invitation. The "not associated with Facebook" line lives on the
            Dakio page's announcement post, not on this screen (owner's call). */}
        {!ended && contest && view === "offer" && (
          <p className="kz-gift">
            🎁 Nova-র সঙ্গে কথা বলে <b>{contest.hashtag}</b> দিয়ে পোস্ট করুন — লটারিতে {contest.winners} জন পাবেন উপহার
          </p>
        )}

        <footer className="kz-foot">
          <span>বিস্তারিত Dakio স্টলে · fb.com/dakio.official</span>
          <span className="kz-url">dakio.io/nsgt26</span>
        </footer>
      </section>
    </div>
  );
}
