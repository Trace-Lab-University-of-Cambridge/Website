/* Figure 2 (hapi_framework): the care pathway as a flow.
   --------------------------------------------------------------------------
   Resting state is the paper's drawing. While the figure is on screen a
   single dot carries the case through the calls in the order of the paper's
   story (data-step in the SVG, Section 2.2):

     On the ward       1 asks nurse            "Grade her breathlessness."
                       2 nurse sees patient    (she sees her herself, and back)
                       3 nurse replies         "Worse than at admission."
                       4 shows consultant      the record and open items
                       5 consultant decides    "Discharge on Friday."
     After discharge   6 asks patient  7 patient reports
                       8 asks caregiver  9 caregiver replies
                      10 scale reports  11 shows scale report (community nurse)

   Between calls the dot glides through the agent, which is how the work
   actually moves: every call goes out from it and every answer comes back to
   it, except the nurse's own visit to the patient. Each time an answer
   reaches the agent the box pulses once: the call is recorded. The caption
   repeats only text that is already in the drawing; the phase names are the
   paper's own words ("on the ward", "after discharge"). */

const NS = 'http://www.w3.org/2000/svg';
const TRAVEL_MS = 1150;   // one call along its arrow
const VISIT_MS = 1900;    // the nurse's visit: out along the dashed link and back
const DWELL_MS = 900;     // time to read the call before the next one starts
const GLIDE_MS = 380;     // through the agent between calls
const REST_MS = 1600;     // pause at the end of a round

// Who each step joins (data-actor values in the SVG), and the phase.
const ENDS = {
  1: ['agent', 'nurse'], 2: ['nurse', 'patient'], 3: ['nurse', 'agent'],
  4: ['agent', 'consultant'], 5: ['consultant', 'agent'],
  6: ['agent', 'patient'], 7: ['patient', 'agent'],
  8: ['agent', 'caregiver'], 9: ['caregiver', 'agent'],
  10: ['devices', 'agent'], 11: ['agent', 'community'],
};
const phaseOf = (k) => (k <= 5 ? 'On the ward' : 'After discharge');

const mk = (name, attrs) => {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
};
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clean = (s) => s.replace(/\s+/g, ' ').trim();
const once = (token, fn) => { token.cancel.push(fn); return () => { const i = token.cancel.indexOf(fn); if (i >= 0) token.cancel.splice(i, 1); }; };
const wait = (ms, token) => new Promise((res) => {
  let drop = () => {};
  const id = setTimeout(() => { drop(); res(); }, ms);
  drop = once(token, () => { clearTimeout(id); res(); });
});
const frames = (ms, fn, token) => new Promise((resolve) => {
  let res = resolve;
  const t0 = performance.now();
  let id = 0;
  const tick = () => {
    if (token.dead) return res();
    const u = Math.min(1, (performance.now() - t0) / ms);
    fn(u);
    if (u < 1) id = requestAnimationFrame(tick); else res();
  };
  const drop = once(token, () => { cancelAnimationFrame(id); res(); });
  const done = res; res = (v) => { drop(); done(v); };
  id = requestAnimationFrame(tick);
});

export async function enhance(container, svg) {
  if (!svg) throw new Error('no svg');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---- read the steps from the drawing -----------------------------------
  const steps = [];
  for (const node of svg.querySelectorAll('[data-step]')) {
    const k = +node.dataset.step;
    const s = (steps[k - 1] ||= { k, arrow: null, label: null, quotes: [], els: [] });
    s.els.push(node);
    if (node.tagName === 'line' || node.tagName === 'path') s.arrow = node;
    else if (node.dataset.role === 'label') s.label = node;
    else s.quotes.push(node);
  }
  if (steps.length !== 11 || steps.some((s) => !s || !s.arrow || !s.label)) throw new Error('steps not found');
  for (const s of steps) {
    const quote = clean(s.quotes.map((q) => q.textContent).join(' '));
    s.caption = clean(s.label.textContent) + (quote ? ' — ' + quote : '');
    s.colour = s.arrow.getAttribute('stroke');
    s.visit = s.arrow.tagName === 'path';                 // the dashed meeting, there and back
    s.len = s.arrow.getTotalLength();
    s.end = s.visit ? s.len : Math.max(0, s.len - 6);     // stop short of the arrowhead
    s.answer = ENDS[s.k][1] === 'agent';                  // reaches the agent: a call recorded
  }
  const actors = {};
  for (const g of svg.querySelectorAll('[data-actor]')) actors[g.dataset.actor] = g;
  const agentBox = actors.agent.getBBox();
  const nearAgent = (p) => p.x > agentBox.x - 40 && p.x < agentBox.x + agentBox.width + 40
    && p.y > agentBox.y - 40 && p.y < agentBox.y + agentBox.height + 40;

  // ---- overlay: hit lines, the dot, and the "recorded" pulse -------------
  const layer = mk('g', { class: 'motion-layer' });
  for (const s of steps) {
    const hit = s.arrow.tagName === 'line'
      ? mk('line', ['x1', 'y1', 'x2', 'y2'].reduce((o, a) => ((o[a] = s.arrow.getAttribute(a)), o), {}))
      : mk('path', { d: s.arrow.getAttribute('d'), fill: 'none' });
    hit.setAttribute('class', 'step-hit');
    hit.setAttribute('stroke', 'transparent');
    hit.setAttribute('stroke-width', '12');
    hit.dataset.hit = s.k;
    layer.append(hit);
  }
  const pulse = mk('rect', {
    class: 'record-pulse', x: agentBox.x - 3, y: agentBox.y - 3,
    width: agentBox.width + 6, height: agentBox.height + 6, rx: 6,
    fill: 'none', stroke: '#f67552', 'stroke-width': 2, opacity: 0, 'pointer-events': 'none',
  });
  const dot = mk('circle', { r: 4.4, opacity: 0, 'pointer-events': 'none', stroke: '#FFFFFF', 'stroke-width': 1.3 });
  layer.append(pulse, dot);
  svg.append(layer);

  // ---- controls ----------------------------------------------------------
  const row = document.createElement('div');
  row.className = 'fig__controls fig__steps';
  const button = (label, aria) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'fig__btn';
    b.textContent = label;
    if (aria) b.setAttribute('aria-label', aria);
    return b;
  };
  const prev = button('← Prev', 'Previous call');
  const play = button('Pause');
  const next = button('Next →', 'Next call');
  const count = document.createElement('span');
  count.className = 'fig__count';
  const phase = document.createElement('span');
  phase.className = 'fig__phase';
  const caption = document.createElement('p');
  caption.className = 'fig__caption-live';
  caption.setAttribute('aria-live', 'polite');
  row.append(play, prev, next, count, phase);
  container.prepend(row);
  row.after(caption);
  svg.setAttribute('tabindex', '0');
  // Interactive now, not one image: name it, say how to drive it, and give
  // the eleven calls as text in story order (visually hidden).
  svg.setAttribute('role', 'group');
  svg.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight Escape');
  const help = document.createElement('p');
  help.className = 'visually-hidden';
  help.id = 'fig2-help';
  help.textContent = 'Left and Right arrow keys step through the calls; Escape returns to the drawing.';
  const list = document.createElement('ol');
  list.className = 'visually-hidden';
  list.setAttribute('aria-label', 'The calls in order');
  for (const st of steps) { const li = document.createElement('li'); li.textContent = st.caption; list.append(li); }
  container.append(help, list);
  svg.setAttribute('aria-describedby', 'fig2-help');

  // ---- drawing state -----------------------------------------------------
  let at = 0;            // 0 = resting, 1..11 = active call
  let pos = null;        // where the dot is now, in SVG units
  const dotAt = (p, colour) => {
    pos = { x: p.x, y: p.y };
    dot.setAttribute('cx', p.x.toFixed(2));
    dot.setAttribute('cy', p.y.toFixed(2));
    if (colour) dot.setAttribute('fill', colour);
  };
  const pointOn = (s, u) => {
    // The visit runs out along the dashed link and back again.
    const v = s.visit ? (u < 0.5 ? u * 2 : 2 - u * 2) : u;
    return s.arrow.getPointAtLength(s.end * v);
  };

  function show(k) {
    at = k;
    svg.classList.toggle('is-stepping', at > 0);
    for (const s of steps) for (const el of s.els) el.classList.toggle('is-on', s.k === at);
    const ends = at ? ENDS[at] : [];
    for (const [name, g] of Object.entries(actors)) g.classList.toggle('is-on', ends.includes(name));
    count.textContent = at ? `${at} / ${steps.length}` : `– / ${steps.length}`;
    phase.textContent = at ? phaseOf(at) : '';
    caption.textContent = at ? steps[at - 1].caption : '';
    if (!at) { dot.setAttribute('opacity', '0'); pos = null; }
  }

  function recorded() {
    if (reduce.matches) return;
    pulse.classList.remove('is-pulsing');
    void pulse.getBBox();                   // restart the CSS animation
    pulse.classList.add('is-pulsing');
  }

  // Animate one call, starting wherever the dot is.
  async function run(k, token) {
    const s = steps[k - 1];
    show(k);
    const start = pointOn(s, 0);
    dot.setAttribute('opacity', '1');
    if (reduce.matches) { dotAt(pointOn(s, s.visit ? 0.5 : 1), s.colour); if (s.answer) recorded(); return; }
    if (pos && Math.hypot(pos.x - start.x, pos.y - start.y) > 2) {
      if ((nearAgent(pos) && nearAgent(start)) || Math.hypot(pos.x - start.x, pos.y - start.y) < 160) {
        // Through the agent (the answer becomes the next call), or a short
        // hop at the same person (back from the visit to her reply).
        const from = pos;
        await frames(GLIDE_MS, (u) => {
          const e = ease(u);
          dotAt({ x: from.x + (start.x - from.x) * e, y: from.y + (start.y - from.y) * e });
        }, token);
      } else {
        // A new source (the scale): the dot appears there.
        dot.setAttribute('opacity', '0');
        await wait(160, token);
        dot.setAttribute('opacity', '1');
      }
    }
    if (token.dead) return;
    dotAt(start, s.colour);
    await frames(s.visit ? VISIT_MS : TRAVEL_MS, (u) => dotAt(pointOn(s, ease(u))), token);
    if (!token.dead && s.answer) recorded();
  }

  // ---- playback ----------------------------------------------------------
  let playing = !reduce.matches;   // flows by itself unless motion is reduced
  let onScreen = false;
  let token = null;

  function halt() {
    if (!token) return;
    token.dead = true;
    [...token.cancel].forEach((f) => f());
    token = null;
    if (!playing && at) { const st = steps[at - 1]; dotAt(pointOn(st, st.visit ? 0.5 : 1)); }
  }

  async function loop() {
    halt();
    const t = (token = { dead: false, cancel: [] });
    while (!t.dead) {
      const k = at >= steps.length ? 1 : at + 1;
      if (k === 1 && at === steps.length) { show(0); await wait(REST_MS, t); if (t.dead) break; }
      await run(k, t);
      if (t.dead) break;
      await wait(DWELL_MS, t);
    }
  }

  function sync() {
    const go = playing && onScreen && !document.hidden;
    if (go && !token) loop();
    if (!go) halt();
    play.textContent = playing ? 'Pause' : 'Play the pathway';
    // Autoplay is silent; a step the reader asks for is announced.
    caption.setAttribute('aria-live', playing ? 'off' : 'polite');
  }

  // Manual stepping pauses the flow and shows one call.
  function stepTo(k) {
    playing = false;
    halt();
    sync();
    const t = (token = { dead: false, cancel: [] });
    run(k, t).then(() => { if (token === t) token = null; });
  }
  const stepNext = () => (at >= steps.length ? (playing = false, halt(), sync(), show(0)) : stepTo(at + 1));
  const stepPrev = () => stepTo(at <= 1 ? steps.length : at - 1);

  play.addEventListener('click', () => { playing = !playing; if (playing) halt(); sync(); });
  prev.addEventListener('click', stepPrev);
  next.addEventListener('click', stepNext);

  svg.addEventListener('click', (e) => {
    const t = e.target.closest('[data-step], [data-hit]');
    if (t) stepTo(+(t.dataset.step || t.dataset.hit));
  });
  container.addEventListener('keydown', (e) => {
    if (e.target.closest('select, input, textarea, button')) return;
    if (e.key === 'ArrowRight') { stepNext(); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { stepPrev(); e.preventDefault(); }
    else if (e.key === 'Escape') { playing = false; halt(); sync(); show(0); }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      for (const e of entries) onScreen = e.isIntersecting;
      sync();
    }, { threshold: 0.25 }).observe(svg);
  } else {
    onScreen = true;
  }
  document.addEventListener('visibilitychange', sync);
  reduce.addEventListener?.('change', () => { if (reduce.matches) { playing = false; sync(); } });

  show(0);
  sync();
}
