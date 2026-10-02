import Link from "next/link";
import { Nav, Footer } from "../Chrome";
import LogoDefs from "../Logo";
import { DOC_SECTIONS, docHref, neighbours } from "../../lib/docs";
import { docsComponents } from "./mdx";
import { APP_URL } from "../../lib/urls";

// Docs page frame: site nav, a left index (a fold-out list on phones), the
// page, previous / next. English only (see lib/docs.js).

const MONO = "var(--dk-font-mono), monospace";

function Index({ current }) {
  return (
    <nav aria-label="Developer docs">
      {DOC_SECTIONS.map(s => (
        <div key={s.title} style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: "#6B6D60", marginBottom: 8 }}>{s.title.toUpperCase()}</div>
          {s.pages.map(p => {
            const on = p.slug === current
            return (
              <Link key={p.slug} href={docHref(p.slug)} aria-current={on ? "page" : undefined} style={{
                display: "block", padding: "6px 10px", margin: "0 0 2px -10px", borderRadius: 9, fontSize: 13.5,
                fontWeight: on ? 750 : 550, color: on ? "#1A1D12" : "#4A4D40", background: on ? "#E6EFC9" : "transparent",
              }}>{p.title}</Link>
            )
          })}
        </div>
      ))}
      <a href={`${APP_URL}/settings/developers`} style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, padding: "8px 14px", borderRadius: 99, background: "#1A1D12", color: "#C6F035", fontSize: 12.5, fontWeight: 700 }}>Get a key →</a>
    </nav>
  )
}

export default function DocsLayout({ doc }) {
  const { prev, next } = neighbours(doc.slug);
  const { Content } = doc;
  return (
    <div style={{ fontFamily: "var(--dk-font-sans), sans-serif", color: "#1A1D12", background: "#F4F2EA", minHeight: "100vh", overflowX: "hidden" }}>
      <LogoDefs mkId="mk" wmId="wm" />
      <Nav lang="en" route="/developers" active="developers" style={{ position: "sticky", top: 0, zIndex: 60 }} />

      <div className="docs-grid" style={{ maxWidth: 1180, margin: "0 auto", padding: "36px 28px 40px", display: "grid", gridTemplateColumns: "220px minmax(0, 1fr)", gap: 48 }}>
        <aside className="docs-aside" style={{ position: "sticky", top: 90, alignSelf: "start", maxHeight: "calc(100vh - 110px)", overflowY: "auto", paddingRight: 6 }}>
          <Link href="/developers" style={{ display: "inline-block", fontSize: 12.5, fontWeight: 700, color: "#3E7A45", marginBottom: 18 }}>← Dakio for developers</Link>
          <Index current={doc.slug} />
        </aside>

        <main style={{ minWidth: 0, maxWidth: 780 }}>
          <details className="docs-mobile-index" style={{ marginBottom: 22, borderRadius: 14, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.09)", padding: "12px 16px" }}>
            <summary style={{ cursor: "pointer", fontSize: 13.5, fontWeight: 700 }}>Docs · {doc.title}</summary>
            <div style={{ marginTop: 14 }}><Index current={doc.slug} /></div>
          </details>

          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", color: "#3E7A45" }}>{doc.section.toUpperCase()}</div>
          <h1 style={{ margin: "10px 0 0", fontSize: 40, lineHeight: 1.1, letterSpacing: "-1.4px", fontWeight: 800 }}>{doc.title}</h1>
          <p style={{ margin: "12px 0 0", fontSize: 17, lineHeight: 1.6, color: "#5B5E50" }}>{doc.description}</p>

          <article style={{ marginTop: 10 }}>
            <Content components={docsComponents} />
          </article>

          <div className="m-wrap" style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 56, paddingTop: 22, borderTop: "1px solid rgba(26,29,18,0.1)" }}>
            {prev ? (
              <Link href={docHref(prev.slug)} style={{ display: "block", padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(26,29,18,0.1)", background: "#FBFAF5", minWidth: 0 }}>
                <div style={{ fontSize: 11.5, color: "#6B6D60" }}>← Previous</div>
                <div style={{ fontSize: 14.5, fontWeight: 750, marginTop: 2 }}>{prev.title}</div>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={docHref(next.slug)} style={{ display: "block", padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(26,29,18,0.1)", background: "#FBFAF5", textAlign: "right", minWidth: 0 }}>
                <div style={{ fontSize: 11.5, color: "#6B6D60" }}>Next →</div>
                <div style={{ fontSize: 14.5, fontWeight: 750, marginTop: 2 }}>{next.title}</div>
              </Link>
            ) : <span />}
          </div>
          <p style={{ marginTop: 22, fontSize: 13, color: "#6B6D60" }}>
            Something unclear or wrong? <Link href="/contact" style={{ color: "#3E7A45", fontWeight: 700, textDecoration: "underline" }}>Tell us</Link> — or open an issue on <a href="https://github.com/alasim/dakio-sdk" style={{ color: "#3E7A45", fontWeight: 700, textDecoration: "underline" }}>GitHub</a>.
          </p>
        </main>
      </div>

      <Footer lang="en" />
    </div>
  );
}
