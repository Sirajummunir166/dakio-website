import CopyButton from "./CopyButton";
import { highlight, CODE_COLORS } from "../../lib/highlight";

// A light code card: cream, hairline, mono, coloured by lib/highlight.js.
// Server-rendered; only the copy button ships JS.

const MONO = "var(--dk-font-mono), monospace";

export function CodeTokens({ code, lang }) {
  return highlight(code, lang).map(([text, kind], i) =>
    kind ? (
      <span key={i} style={{ color: CODE_COLORS[kind], fontStyle: kind === "comment" ? "italic" : undefined }}>{text}</span>
    ) : (
      text
    ),
  );
}

export default function Code({ code, lang = "js", title, copy = true, copyLabel, copiedLabel, style }) {
  const text = String(code).replace(/\n+$/, "");
  return (
    <div style={{ position: "relative", borderRadius: 16, background: "#FBFAF5", border: "1px solid rgba(26,29,18,0.09)", margin: "18px 0 0", overflow: "hidden", ...style }}>
      {(title || copy) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "8px 10px 8px 16px", borderBottom: "1px solid rgba(26,29,18,0.07)", background: "#F4F2EA" }}>
          <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.06em", color: "#6B6D60" }}>{title || lang}</span>
          {copy && <CopyButton text={text} label={copyLabel} done={copiedLabel} />}
        </div>
      )}
      <pre style={{ margin: 0, padding: "14px 16px 16px", overflowX: "auto", fontFamily: MONO, fontSize: 12.8, lineHeight: 1.7, color: "#1A1D12", tabSize: 2 }}>
        <code><CodeTokens code={text} lang={lang} /></code>
      </pre>
    </div>
  );
}
