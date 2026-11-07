"use client";

// Meta Pixel on dakio.io (lib/analytics.js#META_PIXEL_ID): PageView on every
// page, including the client-side moves between pages, and Lead on any click
// that heads to signup (app.dakio.io/register: "Open your store", a plan's
// "Choose", the trial line, a coupon strip). One delegated listener, so no
// button has to remember to report itself. Production only, like GA.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID } from "../lib/analytics";

function boot() {
  if (window.fbq) return;
  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  window.fbq("init", META_PIXEL_ID);
}

/** What a signup link was for: the plan and period in ?plan=, or the trial. */
export function signupIntent(href) {
  try {
    const u = new URL(href);
    if (u.hostname !== "app.dakio.io" || !u.pathname.startsWith("/register")) return null;
    const plan = u.searchParams.get("plan") || "";
    const [code, period] = plan.split(":");
    return { content_name: code || "open_store", ...(period ? { content_category: period.toLowerCase() } : {}), ...(u.searchParams.get("code") ? { coupon: u.searchParams.get("code") } : {}) };
  } catch {
    return null;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const last = useRef(null);

  useEffect(() => {
    boot();
    const onClick = (e) => {
      const a = e.target?.closest?.("a[href]");
      const intent = a && signupIntent(a.href);
      if (intent) window.fbq?.("track", "Lead", intent);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (last.current === pathname) return;
    last.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
