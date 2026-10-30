// How Dakio helps, one angle at a time: the /shops and /services pages
// (copy in content/copy/angles.<lang>.js, styles in app/angles.css).
//
// Server components. Worries is the row of chips under the hero: the owner
// taps the problem they have and lands on the angle that answers it. Each
// Angle opens with that worry in the owner's words, answers it next to a real
// app screen with Nova's note on it, and ends with one result line. The dark
// pill with the glowing ball is kept for the Talk to Nova button alone. Angles
// alternate sides; an angle without a screen yet is left out. On phones the
// screen is cropped taller, around shot.focus (how far right the action is).

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
          <img style={{ "--fx": `${a.shot.focus ?? 0}%` }} src={`/app/${a.shot.key}.webp`} alt={a.shot.alt} width={a.shot.size[0]} height={a.shot.size[1]} loading="lazy" decoding="async" />
        </div>
        <figcaption className="ag-note" style={{ "--x": `${a.shot.at.x}%`, "--y": `${a.shot.at.y}%` }}>
          <span className="ag-note-dot" aria-hidden="true" />{a.shot.note}
        </figcaption>
      </figure>
    </section>
  ) : null));
}
