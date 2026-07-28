# Handoff build notes — gaps & decisions

1:1 port of `Dakio Website - Next.js handoff.zip` per HANDOFF.md. Next.js 15.5 (App Router), all routes SSG. Every route verified side-by-side against its `.dc.html` source at 1440px.

## Gaps I could not close (reported, not approximated)

1. **HANDOFF §3 names "Hanken Grotesk" as the UI font — the sources render Archivo.**
   Every marketing page sets `font-family:var(--dk-font-sans)` and the shipped `_ds/tokens/tokens.css` defines that as **Archivo**. No marketing page loads Hanken Grotesk (it appears only inside the embedded product prototypes, which load their own fonts). Per "HTML files are the source of truth," the site uses **Archivo** via `next/font`. Also: §3's "Noto Serif Bengali" is only used inside the Store Studio prototype, so it is not loaded site-wide.

2. **Blog post detail page doesn't exist in the handoff — closed later.**
   The source linked cards to `Dakio Blog Post.dc.html`, which is not in the zip. Per the founder, the detail page was ported from dakio-landing instead: 8 MDX posts (`content/blog/`, metadata in `lib/blog-meta.js` via `scripts/import-blog-posts.mjs`), `/blog/[slug]` statically generated, custom blocks (Lead/Callout/Steps/MidCTA) in `components/blog/blocks.jsx`, list page now data-driven with real links. Blog list order is registry newest-first, which can differ from the handoff's hand-arranged grid order.

3. **Lighthouse: accessibility 95, performance 68–78 locally.**
   - The only remaining a11y failure is **color-contrast** on brand-mandated pairs (e.g. `#878B76` mono labels on ink, lime accents) straight from the source design. Fixing it means changing colors = redesign, so left as-is.
   - Performance was measured on a loaded dev machine against `next start` on localhost; TBT/LCP there are not representative. All pages are fully static (SSG), fonts via `next/font`, ~103 kB shared JS. Re-measure on the Vercel deployment before judging the ≥95 bar.
   - Best-practices 100, SEO 100.

4. **OG images are Latin-only.** `next/og`'s bundled font has no Bengali glyphs, so the Blog OG uses its English claim and no ৳ appears in OG text. Claims otherwise follow the SEO doc.

5. **hreflang deferred** per SEO doc §2.6 — "as the bn content lands." Only the Home hero has bn copy today (client-side toggle, exactly like the source).

## Decisions worth knowing

- **Prototypes** (`Nova HQ v7`, `Store Studio`, `Grow Modules`, `Nova Motion Ads`, `Nova Inbox`, `Supplier Dashboard`) are served verbatim from `public/prototypes/` with their original filenames, `support.js`, `_ds/` and assets — iframed by the play-first pages and linked from footer "TRY IT LIVE", Home rooms bento, and the mega-menu Supplier Network entry. `robots.txt` disallows `/prototypes/` (duplicate/off-index content).
- **`style-hover` attributes** port to CSS classes in `app/hover.css` (support.js turns them into `:hover` rules — same mechanism, values verbatim).
- **Reveal-on-scroll** is the hardened version from the sources (IO threshold 0.14 + scroll/resize fallback + 1200ms sweep) in `components/Reveal.jsx`; without JS nothing is hidden.
- **Interactivity** matches source logic classes exactly: mega-menu 260ms close grace/click toggle/outside click; Home EN↔বাং hero swap; Nova decision-card Approve → EXECUTED receipt; Pricing Monthly↔Annual repricing (৳1,490→৳1,242, ৳3,990→৳3,325, billed ৳…/year); Blog category filter; Contact send → sent card.
- **Legal pages** at `/privacy`, `/terms`, `/refund-policy`, `/data-deletion` carry the real policy copy ported verbatim from `dakio-landing/src/pages/` (Privacy/Terms/RefundPolicy/DataDeletion), restyled to the v3 site chrome in `components/legal/LegalLayout.jsx`.
- **Auth links are live**: Log in → `https://app.dakio.io/`, every signup/start-free CTA → `https://app.dakio.io/register` (constants in `lib/urls.js`, same convention as dakio-landing's APP_URL). No dead `#` links remain — blog cards now resolve to `/blog/[slug]` (gap #2 closed).
- **Brand assets** (added later per founder request): `public/brand/` has mark/wordmark/lockup variants (ink/lime/cream), app icons, favicon — generated from the byte-identical paths in `components/Logo.jsx` by `scripts/export-brand-assets.mjs`, plus the three raw uploads from the Design System zip. The footer now uses the real dark-bg lockup (lime mark + cream wordmark) instead of the placeholder orb — the one deliberate deviation from the handoff HTML, at the founder's request.
- `metadataBase` is `https://dakio.io` — change in `app/layout.js` + `lib/seo.js` if the site ships elsewhere.
