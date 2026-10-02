"use client";

import { useState } from "react";

// The one client bit of a code block: copy to clipboard, "Copied" for 1.6 s.
export default function CopyButton({ text, label, done }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1600); })}
      style={{
        border: "1px solid rgba(26,29,18,0.12)", background: copied ? "#C6F035" : "#FFFFFF", color: "#1A1D12",
        borderRadius: 99, padding: "4px 11px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "var(--dk-font-sans), sans-serif",
      }}
    >
      {copied ? done || "Copied" : label || "Copy"}
    </button>
  );
}
