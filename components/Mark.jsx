// The lime highlighter behind a phrase. Ported from the .dc.html sources, where
// it is an absolutely-positioned bar tucked behind the text (zIndex -1).
// Sizes differ per headline scale, so bottom/height stay overridable.
//
// It lives in its own module because the copy files reference it: where the
// emphasis falls is a copywriting decision and differs per locale.

export default function Mark({ children, bottom = 5, height = 13, radius = 3 }) {
  return (
    <span style={{ position: "relative", whiteSpace: "nowrap" }}>
      {children}
      <span style={{ position: "absolute", left: 0, right: 0, bottom, height, background: "#C6F035", zIndex: -1, borderRadius: radius }} />
    </span>
  );
}
