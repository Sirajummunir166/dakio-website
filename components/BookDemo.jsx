"use client";

// "Book a free demo" (DAKIO_BOOKING_LINK_PLAN.md, cut 2): opens the Dakio
// Store's booking page in a popup through its widget, on the demo service, so
// the visitor picks a free time without leaving dakio.io. Until the widget has
// loaded (or if it is blocked) the link opens the booking page in a new tab.

import Script from "next/script";
import { BOOKING_ORIGIN, BOOKING_STORE, DEMO_SERVICE, bookDemoUrl } from "../lib/urls";

export default function BookDemo({ lang = "en", className, style, children }) {
  return (
    <>
      <Script
        id="dakio-book-widget"
        src={`${BOOKING_ORIGIN}/book.js`}
        strategy="afterInteractive"
        data-button="none"
        data-lang={lang === "en" ? "en" : "bn"}
        data-service={DEMO_SERVICE}
        {...(BOOKING_STORE ? { "data-store": BOOKING_STORE } : {})}
      />
      <a href={bookDemoUrl(lang)} target="_blank" rel="noopener" data-dakio-book={DEMO_SERVICE} className={className} style={style}>
        {children}
      </a>
    </>
  );
}
