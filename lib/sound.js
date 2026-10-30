// Small sounds made by the page itself (Web Audio), nothing to download.
// Browsers play sound only once the visitor has tapped or clicked something on
// the site; before that every call here is silently skipped.

let ctx = null;

export const canPlay = () => typeof navigator !== "undefined" && !!navigator.userActivation?.hasBeenActive;

let noise = null;

/** Each sound is a list of notes, played together:
 *  [frequency Hz, start s, length s, loudness]  a soft tone
 *  { click: frequency Hz, at, len, loud }       a short tick, like a phone keyboard:
 *                                               a burst of noise through a narrow filter */
export function play(notes) {
  if (!canPlay()) return;
  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return;
    ctx = ctx || new C();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const now = ctx.currentTime + 0.01;
    for (const n of notes) {
      const g = ctx.createGain();
      if (Array.isArray(n)) {
        const [freq, at, len, loud] = n;
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, now + at);
        g.gain.exponentialRampToValueAtTime(loud, now + at + 0.025); // a soft start, no click
        g.gain.exponentialRampToValueAtTime(0.0001, now + at + len);
        o.connect(g).connect(ctx.destination);
        o.start(now + at);
        o.stop(now + at + len + 0.02);
      } else {
        const { click, at = 0, len = 0.03, loud } = n;
        if (!noise) {
          noise = ctx.createBuffer(1, Math.round(ctx.sampleRate * 0.2), ctx.sampleRate);
          const d = noise.getChannelData(0);
          for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        const src = ctx.createBufferSource();
        src.buffer = noise;
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.value = click;
        f.Q.value = 1.2;
        g.gain.setValueAtTime(0.0001, now + at);
        g.gain.exponentialRampToValueAtTime(loud, now + at + 0.002);
        g.gain.exponentialRampToValueAtTime(0.0001, now + at + len);
        src.connect(f).connect(g).connect(ctx.destination);
        src.start(now + at, Math.random() * 0.15);
        src.stop(now + at + len + 0.01);
      }
    }
  } catch { /* no sound is fine */ }
}

// The chat ticks are soft (about a tenth of full volume at their peak); the
// pop is Nova's own sound, a little rounder.
export const SOUNDS = {
  pop: [[784, 0, 0.32, 0.07], [1175, 0.12, 0.34, 0.07]], // Nova's voice message
  them: [{ click: 2600, len: 0.03, loud: 0.18 }], // a customer's message lands
  typing: [{ click: 3400, len: 0.016, loud: 0.07 }], // Nova starts typing
  nova: [{ click: 1700, len: 0.04, loud: 0.2 }], // Nova's reply lands: a lower "tock"
  done: [{ click: 2200, len: 0.03, loud: 0.2 }, { click: 2200, at: 0.09, len: 0.035, loud: 0.2 }], // the order or booking is made: tick-tick
  step: [{ click: 3000, len: 0.02, loud: 0.1 }], // one step after the chat checks in
};
