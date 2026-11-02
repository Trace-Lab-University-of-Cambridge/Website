/* Figure 1 (hapi_direction): the direction of calls, in motion.
   --------------------------------------------------------------------------
   The resting state is the paper's drawing: no pulse is drawn until motion
   runs, and pausing clears them again. In (a) work only flows down: items
   queue at each person and leave one at a time. In (b) the agent calls up
   (accent) and the reply comes back down (ink) on all nine channels at once.
   Motion runs only while the figure is on screen and the tab is visible, and
   never on its own under prefers-reduced-motion (an explicit Play still
   runs it). */

const NS = 'http://www.w3.org/2000/svg';
const ACCENT = '#f67552';
const INK = '#3d4f63';
const CYCLE = 3600; // ms

const mk = (name, attrs) => {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const lerp = (a, b, t) => a + (b - a) * t;

export async function enhance(container, svg) {
  if (!svg) throw new Error('no svg');
  const panels = {
    a: svg.querySelector('[data-panel="a"]'),
    b: svg.querySelector('[data-panel="b"]'),
  };
  if (!panels.a || !panels.b) throw new Error('panels not found');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // One overlay per panel, inside the panel group so it dims with it.
  const layer = {};
  for (const k of ['a', 'b']) {
    layer[k] = mk('g', { class: 'motion-layer', 'pointer-events': 'none', 'aria-hidden': 'true' });
    panels[k].append(layer[k]);
  }

  // (a): three down channels, each with a queue at the person.
  const down = [...panels.a.querySelectorAll('[data-chan="down"]')].map((l, i) => {
    const x = +l.getAttribute('x1'), y1 = +l.getAttribute('y1'), y2 = +l.getAttribute('y2');
    const dots = [0, 1, 2, 3].map(() => {
      const c = mk('circle', { r: 2.8, fill: INK, opacity: 0 });
      layer.a.append(c);
      return c;
    });
    return { x, y1, y2, dots, offset: i * 0.29 };
  });

  // (b): nine two-way channels; the call goes up, the reply comes down.
  const both = [...panels.b.querySelectorAll('[data-chan="both"]')].map((l, i) => {
    const p = { x: +l.getAttribute('x1'), y: +l.getAttribute('y1') }; // person end
    const a = { x: +l.getAttribute('x2'), y: +l.getAttribute('y2') }; // agent end
    const up = mk('circle', { r: 2.6, fill: ACCENT, opacity: 0, stroke: '#ffffff', 'stroke-width': 1.2 });
    const back = mk('circle', { r: 2.6, fill: INK, opacity: 0 });
    layer.b.append(up, back);
    return { p, a, up, back, offset: ((i * 4) % 9) / 9 };
  });

  const set = (c, x, y, o, r) => {
    c.setAttribute('cx', x.toFixed(2));
    c.setAttribute('cy', y.toFixed(2));
    c.setAttribute('opacity', o.toFixed(3));
    if (r != null) c.setAttribute('r', r.toFixed(2));
  };

  // One channel of (a) at phase p in [0,1). Slots sit left of the arrow's
  // start; slot 0 is the head of the queue. Each cycle one more item joins,
  // the head goes down to the agent, and the queue moves up one place, so
  // the end of a cycle looks exactly like its start.
  function drawDown(ch, p) {
    const slot = (k) => ch.x - 7.5 * k;
    const y0 = ch.y1 + 2;
    const [head, q1, q2, travel] = ch.dots;
    const q2in = clamp01((p - 0.12) / 0.18);
    const go = clamp01((p - 0.45) / 0.37);
    const shift = ease(clamp01((p - 0.84) / 0.16));
    if (go <= 0) {
      set(head, slot(0), y0, 1, 2.8 + 0.6 * Math.sin(p * Math.PI * 6) ** 2);
      set(travel, slot(0), y0, 0);
    } else {
      set(head, slot(0), y0, 0, 2.8);
      const fade = p < 0.82 ? 1 : Math.max(0, 1 - (p - 0.82) / 0.04);
      set(travel, ch.x, lerp(y0, ch.y2 - 4, ease(go)), fade);
    }
    set(q1, lerp(slot(1), slot(0), shift), y0, 1);
    set(q2, lerp(slot(2), slot(1), shift), y0, q2in);
  }

  // One channel of (b): up .00-.30, held .30-.42, reply down .42-.72.
  function drawBoth(ch, p) {
    const top = ch.p.y + 4, bot = ch.a.y - 4;
    if (p < 0.3) {
      const u = clamp01(p / 0.3), t = ease(u);
      set(ch.up, lerp(ch.a.x, ch.p.x, t), lerp(bot, top, t), Math.min(1, u * 6));
    } else {
      set(ch.up, ch.p.x, top, Math.max(0, 1 - (p - 0.3) / 0.06));
    }
    if (p >= 0.42 && p < 0.72) {
      const u = clamp01((p - 0.42) / 0.3), t = ease(u);
      set(ch.back, lerp(ch.p.x, ch.a.x, t), lerp(top, bot, t), Math.min(1, u * 6));
    } else if (p >= 0.72) {
      set(ch.back, ch.a.x, bot, Math.max(0, 1 - (p - 0.72) / 0.06));
    } else {
      set(ch.back, ch.p.x, top, 0);
    }
  }

  const clear = (k) => { for (const c of layer[k].children) c.setAttribute('opacity', '0'); };

  // ---- state -------------------------------------------------------------
  let playing = false; // the Play/Pause choice
  let chose = false;   // the reader pressed Play themselves
  let solo = null; // 'a' | 'b' while a panel is hovered or focused
  let onScreen = false;
  let raf = 0;
  let t0 = 0;
  let elapsed = 0;

  // Reduced motion: nothing moves on its own, but an explicit Play still runs.
  const runs = (k) => (!reduce.matches || chose) && onScreen && !document.hidden && (solo ? solo === k : playing);

  function frame(now) {
    raf = 0;
    const runA = runs('a'), runB = runs('b');
    if (!runA && !runB) { clear('a'); clear('b'); return; }
    if (!t0) t0 = now - elapsed;
    elapsed = now - t0;
    const base = elapsed / CYCLE;
    if (runA) for (const ch of down) drawDown(ch, (base + ch.offset) % 1);
    else clear('a');
    if (runB) for (const ch of both) drawBoth(ch, (base * 1.15 + ch.offset) % 1);
    else clear('b');
    raf = requestAnimationFrame(frame);
  }

  // ---- controls ----------------------------------------------------------
  const row = document.createElement('div');
  row.className = 'fig__controls fig__motion';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'fig__btn';
  const hint = document.createElement('span');
  hint.className = 'fig__hint';
  hint.textContent = 'Hover, tap or tab to (a) or (b) to run one panel alone.';
  row.append(btn, hint);
  container.prepend(row);

  function update() {
    if (runs('a') || runs('b')) {
      if (!raf) { t0 = 0; raf = requestAnimationFrame(frame); }
    } else {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      clear('a');
      clear('b');
    }
    svg.classList.toggle('is-solo', !!solo);
    for (const k of ['a', 'b']) panels[k].toggleAttribute('data-solo', solo === k);
    btn.textContent = playing ? 'Pause' : 'Play';
    btn.setAttribute('aria-label', playing ? 'Pause the motion' : 'Play the motion');
  }

  btn.addEventListener('click', () => { playing = !playing; chose = playing; update(); });

  // The figure is interactive now, not a single image.
  svg.setAttribute('role', 'group');
  const ring = mk('rect', { class: 'focus-ring', fill: 'none', rx: 4, 'pointer-events': 'none', 'aria-hidden': 'true', opacity: 0 });
  svg.append(ring);
  const showRing = (g) => {
    if (!g) { ring.setAttribute('opacity', '0'); return; }
    const b = g.getBBox();
    for (const [k, v] of Object.entries({ x: b.x - 4, y: b.y - 4, width: b.width + 8, height: b.height + 8 })) ring.setAttribute(k, v.toFixed(1));
    ring.setAttribute('opacity', '1');
  };
  for (const k of ['a', 'b']) {
    const g = panels[k];
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'group');
    g.setAttribute('aria-label', g.querySelector('title')?.textContent || k);
    g.addEventListener('pointerenter', () => { solo = k; update(); });
    g.addEventListener('pointerleave', () => {
      if (solo === k && document.activeElement !== g) { solo = null; update(); }
    });
    g.addEventListener('focus', () => { solo = k; showRing(g.matches(':focus-visible') ? g : null); update(); });
    g.addEventListener('blur', () => { showRing(null); if (solo === k) { solo = null; update(); } });
  }

  // Autoplay only when nobody asked for reduced motion (and only on screen).
  playing = !reduce.matches;
  reduce.addEventListener?.('change', () => { if (reduce.matches) { playing = false; chose = false; } update(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      for (const e of entries) onScreen = e.isIntersecting;
      update();
    }, { threshold: 0.15 }).observe(svg);
  } else {
    onScreen = true;
  }
  document.addEventListener('visibilitychange', update);
  update();
}
