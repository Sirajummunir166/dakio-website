// How Dakio helps, one angle at a time: the /shops and /services pages
// (copy in content/copy/angles.<lang>.js, styles in app/angles.css).
//
// Server components. Worries is the row of chips under the hero: the owner
// taps the problem they have and lands on the angle that answers it. Each
// Angle opens with that worry in the owner's words, answers it next to a real
// app screen with Nova's note on it, and ends with one result line. The dark
// pill with the glowing ball is kept for the Talk to Nova button alone. Angles
// alternate sides; an angle without a screen yet is left out.

const CHECK = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>;

const num = i => String(i + 1).padStart(2, "0");

export function Worries({ x }) {
  return (
    <div className="hm-wrap ag-worries">
      <p className="ag-ask">{x.ask}</p>
      <nav className="ag-chips" aria-label={x.ask}>
        {x.angles.map((a, i) => (
          <a key={a.id} href={`#${a.id}`} className="ag-chip">
            <span className="ag-chip-n">{num(i)}</span>{a.chip}
          </a>
        ))}
      </nav>
    </div>
  );
}

// Nova's note as a callout: a pulsing dot on the exact spot (shot.pin), a line
// of thin moving dashes from it, through shot.via when it needs to turn round something,
// to the note just outside the screen (shot.at, y "top" or "bottom"). All in % of the screen below
// the browser bar; the svg uses the screenshot's own pixels, so the line keeps
// one width.
function Callout({ shot }) {
  const { pin, via, size: [w, h] } = shot;
  // "top" and "bottom" put the note just outside the screen, about 60px above
  // it (clear of the browser bar) or 40px below, for a screen `width` px wide.
  const outside = (y, width) => {
    const out = px => (px * w * 100) / (width * h);
    return y === "top" ? -out(60) : y === "bottom" ? 100 + out(40) : y;
  };
  const pt = p => `${(p.x * w) / 100} ${(p.y * h) / 100}`;
  const path = pts => `M${pts.map(pt).join(" L")}`;
  const turns = [pin, ...(via ? [via] : [])];
  // Laptops: the note sits at at.x. Phones (a screen about 358px wide): the
  // note is centred, so the line turns along to the middle to meet it.
  const lg = { x: shot.at.x, y: outside(shot.at.y, 680) };
  const sm = { x: shot.at.x, y: outside(shot.at.y, 358) };
  const style = { strokeWidth: w / 640, strokeDasharray: `${w / 200} ${w / 260}`, "--dash": `${-(w / 200 + w / 260)}` };
  return (
    <div className="ag-over" aria-hidden="true">
      <svg className="ag-line" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path className="ag-path-lg" d={path([...turns, lg])} style={style} />
        <path className="ag-path-sm" d={path([...turns, sm, { x: 50, y: sm.y }])} style={{ ...style, strokeWidth: w / 360 }} />
      </svg>
      <span className="ag-pin" style={{ "--x": `${pin.x}%`, "--y": `${pin.y}%` }} />
      <span className="ag-note ag-note-pinned" style={{ "--x": `${lg.x}%`, "--y": `${lg.y}%`, "--ym": `${sm.y}%` }}>
        <span className="ag-note-dot" />{shot.note}
      </span>
    </div>
  );
}

export function Angles({ x }) {
  return x.angles.map((a, i) => (a.shot ? (
    <section key={a.id} id={a.id} className="hm-wrap hm-sec ag" data-flip={i % 2 ? "1" : undefined} data-reveal>
      <div className="ag-text">
        <div className="ag-kicker"><span>{num(i)}</span>{a.n}</div>
        <blockquote className="ag-worry">{a.worry}</blockquote>
        <h2 className="ag-h">{a.h}</h2>
        <p className="ag-d">{a.d}</p>
        <ul className="ag-points">
          {a.points.map(p => <li key={p}>{CHECK}{p}</li>)}
        </ul>
        <p className="ag-result">{CHECK}{a.result}</p>
      </div>
      <figure className="ag-shot">
        <div className="ag-frame">
          <div className="ag-bar" aria-hidden="true"><i /><i /><i /><span>{a.shot.url}</span></div>
          <img src={`/app/${a.shot.key}.webp`} alt={a.shot.alt} width={a.shot.size[0]} height={a.shot.size[1]} loading="lazy" decoding="async" />
        </div>
        {a.shot.pin ? <Callout shot={a.shot} /> : (
          <figcaption className="ag-note" style={{ "--x": `${a.shot.at.x}%`, "--y": `${a.shot.at.y}%` }}>
            <span className="ag-note-dot" aria-hidden="true" />{a.shot.note}
          </figcaption>
        )}
      </figure>
    </section>
  ) : null));
}
