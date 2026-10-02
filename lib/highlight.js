// A tiny server-side syntax colourer for the developer pages — JS/TS/JSX,
// bash and JSON. No dependency, no client JS: it splits code into
// [text, kind] pieces and <Code> paints them. It only has to make short
// examples easy to read, not to parse every edge of the language.

const KEYWORDS = "import|from|export|default|const|let|var|function|return|await|async|if|else|new|typeof|true|false|null|undefined|for|of|in|try|catch|throw|interface|type|extends"

const RULES = {
  js: new RegExp(
    [
      "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",                                   // 1 comment
      "(`(?:\\\\[\\s\\S]|[^`\\\\])*`|'(?:\\\\.|[^'\\\\\\n])*'|\"(?:\\\\.|[^\"\\\\\\n])*\")", // 2 string
      `\\b(${KEYWORDS})\\b`,                                                     // 3 keyword
      "\\b(\\d[\\d_]*(?:\\.\\d+)?)\\b",                                          // 4 number
      "([A-Za-z_$][\\w$]*)(?=\\()",                                              // 5 call
      "(<\\/?[A-Z][\\w.]*|<\\/?[a-z][\\w-]*(?=[\\s>/]))",                         // 6 jsx tag
    ].join("|"),
    "g",
  ),
  bash: /(#[^\n]*)|('[^'\n]*'|"(?:\\.|[^"\\\n])*")|\b(npm|npx|pnpm|yarn|cd|cp|curl|export)\b/g,
  json: /("(?:\\.|[^"\\\n])*")(\s*:)?|\b(true|false|null)\b|(-?\b\d+(?:\.\d+)?\b)/g,
}

const LANGS = { js: "js", jsx: "js", ts: "js", tsx: "js", javascript: "js", typescript: "js", bash: "bash", sh: "bash", shell: "bash", json: "json", http: "bash", env: "bash" }

/** `[[text, kind|null], …]` for a code string. */
export function highlight(code, lang = "js") {
  const rule = RULES[LANGS[lang] || "js"]
  if (!rule) return [[code, null]]
  const out = []
  let last = 0
  rule.lastIndex = 0
  for (let m; (m = rule.exec(code)); ) {
    if (m[0] === "") { rule.lastIndex++; continue }
    if (m.index > last) out.push([code.slice(last, m.index), null])
    let kind = null
    if (LANGS[lang] === "json") kind = m[1] ? (m[2] ? "key" : "string") : m[3] ? "keyword" : "number"
    else if (LANGS[lang] === "bash" || lang === "env") kind = m[1] ? "comment" : m[2] ? "string" : "keyword"
    else kind = m[1] ? "comment" : m[2] ? "string" : m[3] ? "keyword" : m[4] ? "number" : m[5] ? "call" : "tag"
    out.push([m[0], kind])
    last = m.index + m[0].length
  }
  if (last < code.length) out.push([code.slice(last), null])
  return out
}

/** Colours on the light code card (the cream page; no dark blocks). */
export const CODE_COLORS = {
  comment: "#8A8E7A",
  string: "#3E7A45",
  keyword: "#8A4B0F",
  number: "#B03A2E",
  call: "#1F5C7A",
  tag: "#1F5C7A",
  key: "#1A1D12",
}
