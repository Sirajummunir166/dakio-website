"use client";

// Reveal-on-scroll, ported verbatim from the hardened componentDidMount in the
// .dc.html sources: sections marked [data-reveal] start opacity:0 /
// translateY(22px), IntersectionObserver at threshold 0.14 reveals with .7s
// ease, plus an unconditional scroll/resize fallback and a 1200ms sweep.
// Without JS nothing is hidden — content stays fully readable.

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    els.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = "opacity .7s ease, transform .7s ease";
    });
    const reveal = (el, animate) => {
      if (!animate) el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.dataset.revealed = "1";
    };
    const inView = el => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < (window.innerHeight || 800);
    };
    els.forEach(el => { if (inView(el)) reveal(el, false); });
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            reveal(e.target, true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    els.forEach(el => { if (!el.dataset.revealed) io.observe(el); });
    const onScroll = () => {
      els.forEach(el => { if (!el.dataset.revealed && inView(el)) reveal(el, true); });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const t = setTimeout(onScroll, 1200);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t);
    };
  }, []);
  return null;
}
