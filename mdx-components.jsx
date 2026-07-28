// Global MDX component map (App Router convention for @next/mdx) — markdown
// elements styled to the blog article spec, plus the author blocks so posts
// use them without imports. Ported from dakio-landing's components/blog/mdx.

import { Lead, Callout, Steps, Step, MidCTA } from "./components/blog/blocks";

const INK = "#1A1D12";
const BODY = { fontSize: 16.5, lineHeight: 1.85, color: "#3a3d30" };

export function useMDXComponents(components) {
  return {
    h2: props => <h2 style={{ margin: "44px 0 0", fontSize: 26, letterSpacing: "-0.6px", fontWeight: 750, color: INK, lineHeight: 1.4 }} {...props} />,
    h3: props => <h3 style={{ margin: "32px 0 0", fontSize: 20, letterSpacing: "-0.4px", fontWeight: 700, color: INK, lineHeight: 1.45 }} {...props} />,
    p: props => <p style={{ margin: "16px 0 0", ...BODY }} {...props} />,
    ul: props => <ul style={{ margin: "16px 0 0", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10, ...BODY }} {...props} />,
    ol: props => <ol style={{ margin: "16px 0 0", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 10, ...BODY }} {...props} />,
    li: props => <li style={{ lineHeight: 1.7 }} {...props} />,
    strong: props => <strong style={{ color: INK, fontWeight: 700 }} {...props} />,
    a: props => <a style={{ color: "#3E7A45", fontWeight: 600, textDecoration: "underline" }} {...props} />,
    blockquote: props => <blockquote style={{ margin: "28px 0 0", padding: "4px 0 4px 20px", borderLeft: "3px solid #C6F035", fontStyle: "italic", color: INK, fontSize: 18, lineHeight: 1.7 }} {...props} />,
    hr: () => <hr style={{ margin: "40px 0 0", border: "none", borderTop: "1px solid rgba(27,30,21,0.10)" }} />,
    Lead,
    Callout,
    Steps,
    Step,
    MidCTA,
    ...components,
  };
}
