// Locale-resolving wrappers around SiteNav / SiteFooter so pages only ever pass
// `lang` and their route. Both copy files are imported eagerly — these are
// server components, so nothing extra reaches the browser.

import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import chromeEn from "../content/copy/chrome.en";
import chromeBn from "../content/copy/chrome.bn";

const CHROME = { en: chromeEn, bn: chromeBn };

export const chromeFor = lang => CHROME[lang] || CHROME.en;

export function Nav({ lang = "en", ...props }) {
  return <SiteNav lang={lang} copy={chromeFor(lang).nav} {...props} />;
}

export function Footer({ lang = "en" }) {
  return <SiteFooter lang={lang} copy={chromeFor(lang).footer} />;
}
