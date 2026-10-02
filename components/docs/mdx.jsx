import Code from "./Code";
import SmartLink from "../SmartLink";

// The docs' MDX component map. Passed to each page's <Content components={…}>
// so it wins over the blog's global map in mdx-components.jsx.
//
// Tables and notes are components rather than markdown syntax: the site's MDX
// compiler runs without GFM (the blog doesn't need it), so `| a | b |` would
// come out as text.

const INK = "#1A1D12";
const MUTED = "#5B5E50";
const BODY = { fontSize: 15.5, lineHeight: 1.75, color: "#2E3126" };
const MONO = "var(--dk-font-mono), monospace";

export const slugify = s => String(s).toLowerCase().replace(/<[^>]+>/g, "").replace(/[`'’"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const textOf = node => (typeof node === "string" ? node : Array.isArray(node) ? node.map(textOf).join("") : node?.props?.children ? textOf(node.props.children) : "");

function Heading({ as: Tag, style, children }) {
  const id = slugify(textOf(children));
  return (
    <Tag id={id} style={{ scrollMarginTop: 90, color: INK, ...style }}>
      <a href={`#${id}`} style={{ color: "inherit", textDecoration: "none" }}>{children}</a>
    </Tag>
  );
}

function Pre({ children }) {
  const code = children?.props?.children ?? "";
  const cls = children?.props?.className || "";
  const lang = (cls.match(/language-([\w-]+)/) || [])[1] || "js";
  return <Code code={typeof code === "string" ? code : textOf(code)} lang={lang} />;
}

export function Note({ tone = "info", title, children }) {
  const tones = {
    info: { bg: "#EEF4D4", line: "#C6F035", fg: "#3A5212" },
    warn: { bg: "#FBF0DC", line: "#E2A63B", fg: "#7A4B0B" },
  };
  const t = tones[tone] || tones.info;
  return (
    <div style={{ margin: "20px 0 0", padding: "14px 18px", borderRadius: 14, background: t.bg, borderLeft: `3px solid ${t.line}` }}>
      {title && <div style={{ fontSize: 13.5, fontWeight: 800, color: t.fg, marginBottom: 4 }}>{title}</div>}
      <div style={{ fontSize: 14.5, lineHeight: 1.7, color: "#2E3126" }}>{children}</div>
    </div>
  );
}

/** `<Table head={["Call", "Returns"]} rows={[["store.get()", "…"]]} />` — cells may be JSX. */
export function Table({ head, rows, mono = [0] }) {
  return (
    <div style={{ margin: "18px 0 0", overflowX: "auto", border: "1px solid rgba(26,29,18,0.09)", borderRadius: 14 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, lineHeight: 1.6 }}>
        <thead>
          <tr>{head.map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", background: "#F4F2EA", color: MUTED, fontWeight: 700, fontSize: 12, borderBottom: "1px solid rgba(26,29,18,0.09)" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: "10px 14px", verticalAlign: "top", borderTop: i ? "1px solid rgba(26,29,18,0.06)" : "none", color: "#2E3126", ...(mono.includes(j) ? { fontFamily: MONO, fontSize: 12.5, whiteSpace: "nowrap", color: INK } : {}) }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const docsComponents = {
  h2: props => <Heading as="h2" style={{ margin: "44px 0 0", fontSize: 24, letterSpacing: "-0.5px", fontWeight: 800, lineHeight: 1.3 }} {...props} />,
  h3: props => <Heading as="h3" style={{ margin: "30px 0 0", fontSize: 18, letterSpacing: "-0.3px", fontWeight: 750, lineHeight: 1.4 }} {...props} />,
  p: props => <p style={{ margin: "14px 0 0", ...BODY }} {...props} />,
  ul: props => <ul style={{ margin: "14px 0 0", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 7, ...BODY }} {...props} />,
  ol: props => <ol style={{ margin: "14px 0 0", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 7, ...BODY }} {...props} />,
  li: props => <li style={{ lineHeight: 1.7 }} {...props} />,
  strong: props => <strong style={{ color: INK, fontWeight: 750 }} {...props} />,
  a: props => <SmartLink style={{ color: "#3E7A45", fontWeight: 650, textDecoration: "underline", textUnderlineOffset: 3 }} {...props} />,
  code: props => <code style={{ fontFamily: MONO, fontSize: "0.86em", padding: "2px 6px", borderRadius: 6, background: "#EEEBDF", color: INK }} {...props} />,
  pre: Pre,
  hr: () => <hr style={{ margin: "36px 0 0", border: "none", borderTop: "1px solid rgba(26,29,18,0.1)" }} />,
  blockquote: props => <Note {...props} />,
  Note,
  Table,
  Code,
};
