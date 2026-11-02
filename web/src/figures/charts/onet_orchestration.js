/* ==========================================================================
   Figure 8: routing a mixed human/agent pool from inferred profiles.
   A replica of figures/src/onet_orchestration.py. (a) Share of tasks cleared
   against tasks routed, one line per policy with a ±1 s.e. band and seven
   end-of-line direct labels pushed apart as the .py does (no legend);
   (b) per skill block, the share of tasks routed to a human by Split-Σ and
   random (bars, ±1 s.e. whiskers, value labels) against the oracle (a rule),
   with its legend below the panel. Side by side unless the column is under
   560px.
   On top: (a) a crosshair with a tooltip of the visible policies at the
   hovered bin, and the direct labels toggle their series (click, Enter or
   Space); (b) each row has a hover/focus tooltip with value ± s.e. and the
   oracle; the legend items toggle the bars and the oracle rule.
   ========================================================================== */
import data from '../data/onet_orchestration.json';
import { el, html, linear, tooltip, dataTable, fmt } from '../lib.js';
import {
  PAPER, responsive, canvas, axes, xlabel, ylabel, title, text, dash, linePath, bandPath,
  mplLegend, toggle, hoverLayer, paperTip, tipRows, applyVisibility, figPos, svgToFig, measure,
} from './_experiments.js';

/* LINES in the .py, in drawing order so Split-Σ sits on top. */
const LINES = [
  { key: 'oracle', name: 'oracle', color: PAPER.ref, text: PAPER.inkFaint, dash: [3, 2], lw: 1.0 },
  { key: 'random', name: 'random assignment', color: PAPER.inkFaint, dash: [1, 1.6], lw: 0.9 },
  { key: 'agent-only', name: 'Agent-only', color: PAPER.accentLight, text: PAPER.accentText, dash: null, lw: 1.0 },
  { key: 'human-only', name: 'Human-only', color: PAPER.inkSoft, dash: null, lw: 1.0 },
  { key: 'no-transfer', name: 'Diag-Σ', color: PAPER.accent, text: PAPER.accentText, dash: [4, 2], lw: 1.0 },
  { key: 'single-prior', name: 'Σ', color: PAPER.accent, text: PAPER.accentText, dash: [1, 1.4], lw: 1.0 },
  { key: 'hybrid', name: 'Split-Σ', color: PAPER.accent, text: PAPER.accentText, dash: null, lw: 1.6 },
];
const BLOCKS = [
  { key: 'knowledge', label: ['knowledge'] },
  { key: 'cognitive', label: ['cognitive'] },
  { key: 'social', label: ['social'] },
  { key: 'sensory', label: ['sensory'] },
  { key: 'physical', label: ['physical', 'and technical'] },
];
const BARS = [
  { key: 'hybrid', name: 'Split-Σ', color: PAPER.accent, text: PAPER.accentText, off: 0.17 },
  { key: 'random', name: 'random', color: PAPER.ref, text: PAPER.inkFaint, off: -0.17 },
];
const FIG_W = 425.2, FIG_H = 176.4; // figsize (5.906, 2.45) in points

/* Each bin is the mean over 100 tasks, so it sits at the bin midpoint; the
   first segment is carried back to the origin at its own bin's value. */
function curveOf(policy) {
  const d = data.curve[policy];
  return [{ x: 0, y: d[0].success, se: d[0].se }, ...d.map((p) => ({ x: p.bin + 50, y: p.success, se: p.se }))];
}

/* spread() in the .py: push label heights apart by `gap` inside [lo, hi],
   keeping their order. */
function spread(ys, gap, lo, hi) {
  const order = ys.map((_, i) => i).sort((a, b) => ys[a] - ys[b]);
  const y = order.map((i) => ys[i]);
  for (let i = 1; i < y.length; i++) y[i] = Math.max(y[i], y[i - 1] + gap);
  y[y.length - 1] = Math.min(y[y.length - 1], hi);
  for (let i = y.length - 2; i >= 0; i--) y[i] = Math.min(y[i], y[i + 1] - gap);
  y[0] = Math.max(y[0], lo);
  for (let i = 1; i < y.length; i++) y[i] = Math.max(y[i], y[i - 1] + gap);
  const out = new Array(ys.length);
  order.forEach((oi, j) => { out[oi] = y[j]; });
  return out;
}

export async function render(container) {
  const hidden = new Set();
  const tip = paperTip(container, tooltip);
  const curves = Object.fromEntries(LINES.map((l) => [l.key, curveOf(l.key)]));
  const xs = curves.hybrid.map((p) => p.x);

  responsive(container, (host, W) => {
    const wide = W >= 640; // below this the 12px Archivo labels collide side by side
    let s, fs, H, A, B;
    if (wide) {
      // subplots_adjust(left=0.085, right=0.985, top=0.905, bottom=0.235,
      // wspace=0.34), width_ratios [1.22, 1].
      s = W / FIG_W; fs = Math.max(s, 12 / 8.1);
      H = FIG_H * s;
      const span = 0.985 - 0.085;
      const u = span / (2.22 + 0.34 * 1.11);
      const wa = 1.22 * u, gap = 0.34 * 1.11 * u;
      const y0 = (1 - 0.905) * H, h = (0.905 - 0.235) * H;
      A = { x: 0.085 * W, y: y0, w: wa * W, h };
      B = { x: (0.085 + wa + gap) * W, y: y0, w: u * W, h };
      // Archivo runs wider than the paper's face: if panel (b)'s two-line
      // tick label would reach panel (a), move (b)'s left spine right,
      // keeping its right edge where the paper has it.
      const need = A.x + A.w + 6 + measure('and technical', 8.1 * fs) + 5.5 * s;
      if (B.x < need) { B.w -= need - B.x; B.x = need; }
    } else {
      s = fs = 12 / 8.1;
      const ha = Math.round(Math.min(280, (W - 64) * 0.7));
      A = { x: 56, y: 26, w: W - 56 - 6, h: ha };
      B = { x: 100, y: A.y + ha + 50 + 30, w: W - 100 - 8, h: 250 };
      H = B.y + B.h + 50 + 30;
    }
    const svg = canvas(W, H, 'Figure 8: (a) share of tasks cleared against tasks routed per policy; (b) share of tasks routed to a human per skill block, Split-Σ and random against the oracle.');
    const root = el('g');
    svg.append(root);

    // --- (a) clearance over the run ------------------------------------------
    const ga = el('g');
    root.append(ga);
    const xa = linear([0, 1560], [0, A.w]);
    const ya = linear([0.17, 0.84], [A.h, 0]);
    const XA = (v) => A.x + xa(v), YA = (v) => A.y + ya(v);
    const tickWa = axes(ga, { box: A, x: xa, y: ya, xticks: [0, 250, 500, 750, 1000], yticks: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
      xfmt: String, yfmt: (v) => fmt.num(v, 1), s, fs });
    const cid = `f8clip-${Math.random().toString(36).slice(2, 7)}`;
    svg.append(el('clipPath', { id: cid }, el('rect', { x: A.x, y: A.y, width: A.w, height: A.h })));
    const marks = el('g', { 'clip-path': `url(#${cid})` });
    ga.append(marks);
    // fill_between at zorder 1 under every line at zorder 3.
    for (const l of LINES) {
      const c = curves[l.key];
      marks.append(el('path', { d: bandPath(c.map((p) => [p.x, p.y - p.se, p.y + p.se]), XA, YA), fill: l.color, 'fill-opacity': 0.13, 'data-series': l.key }));
    }
    for (const l of LINES) {
      const c = curves[l.key];
      marks.append(el('path', { d: linePath(c.map((p) => [p.x, p.y]), XA, YA), fill: 'none', stroke: l.color, 'stroke-width': l.lw * s,
        'stroke-dasharray': dash(l.dash, l.lw, s), 'data-series': l.key }));
    }
    // Direct labels at the line ends, pushed apart (gap 0.052) with leaders.
    const ends = LINES.map((l) => { const c = curves[l.key]; return c[c.length - 1]; });
    const labY = spread(ends.map((e) => e.y), 0.052, 0.17 + 0.02, 0.84 - 0.02);
    LINES.forEach((l, i) => {
      const e = ends[i], yl = labY[i];
      const lg = el('g', { class: 'direct-label' });
      if (Math.abs(yl - e.y) > 0.012) {
        lg.append(el('line', { x1: XA(e.x + 2), x2: XA(e.x + 15), y1: YA(e.y), y2: YA(yl), stroke: l.color, 'stroke-width': 0.5 * s, 'stroke-opacity': 0.8 }));
      }
      // 8 pt in the paper; held at 12px so 'random assignment' ends inside the axes as it does there.
      const size = Math.min(8 * fs, 12);
      text(lg, { x: XA(e.x + 18), y: YA(yl), str: l.name, size, fill: l.text || l.color, va: 'center' });
      lg.append(el('rect', { x: XA(e.x + 16), y: YA(yl) - size * 0.62, width: measure(l.name, size) + 6, height: size * 1.24, fill: 'transparent' }));
      ga.append(lg);
      toggle(lg, l.name, (on) => {
        if (on) hidden.delete(l.key); else hidden.add(l.key);
        applyVisibility(svg, hidden);
        clearA();
      });
      if (hidden.has(l.key)) lg.setAttribute('aria-pressed', 'false');
    });
    title(ga, A, '(a) clearance over the run', s, fs);
    xlabel(ga, A, 'tasks routed', s, fs);
    ylabel(ga, A, ['share of tasks cleared'], tickWa, s, fs);

    const hg = el('g', { style: 'display:none', 'pointer-events': 'none' });
    const cross = el('line', { class: 'crosshair', y1: A.y, y2: A.y + A.h, 'stroke-width': 1 });
    hg.append(cross);
    const dots = LINES.map((l) => { const d = el('circle', { class: 'hover-dot', r: 3.5, stroke: l.color }); hg.append(d); return d; });
    ga.append(hg);
    const clearA = () => { hg.style.display = 'none'; tip.hide(); };
    const hov = hoverLayer(svg, ga, container, { box: { ...A, w: xa(1000) + 6 }, xs, x: xa,
      onMove: (i, pos) => {
        hg.style.display = '';
        const xv = xs[i];
        cross.setAttribute('x1', XA(xv)); cross.setAttribute('x2', XA(xv));
        LINES.forEach((l, j) => {
          dots[j].style.display = hidden.has(l.key) ? 'none' : '';
          dots[j].setAttribute('cx', XA(xv)); dots[j].setAttribute('cy', YA(curves[l.key][i].y));
        });
        const rows = [...LINES].reverse().filter((l) => !hidden.has(l.key))
          .sort((p, q) => curves[q.key][i].y - curves[p.key][i].y)
          .map((l) => {
            const p = curves[l.key][i];
            return { color: l.color, dash: l.dash ? l.dash.map((v) => v * 1.4).join(' ') : null, width: Math.max(1.4, l.lw * 1.4),
              name: l.name, value: fmt.num(p.y, 3), extra: `± ${fmt.num(p.se, 3)}` };
          });
        const bin = i === 0 ? 'tasks 0–100' : `tasks ${xv - 50}–${xv + 50}`;
        tip.show(tipRows(`${bin} · share of tasks cleared`, rows), pos.px, pos.py);
      },
      onLeave: clearA });
    // The direct labels sit right of x = 1000, outside the hover area, so they stay clickable.
    svg.setAttribute('tabindex', '0');
    svg.addEventListener('keydown', (e) => { if (e.target === svg) hov.key(e); });
    svg.addEventListener('blur', () => { hov.reset(); clearA(); });

    // --- (b) the split it finds ----------------------------------------------
    const gb = el('g');
    root.append(gb);
    const xb = linear([0, 1.06], [0, B.w]);
    const yb = linear([-0.684, 4.684], [B.h, 0]);
    const XB = (v) => B.x + xb(v), YB = (v) => B.y + yb(v);
    const rowsY = BLOCKS.map((_, i) => BLOCKS.length - 1 - i);
    axes(gb, { box: B, x: xb, y: yb, xticks: [0, 0.2, 0.4, 0.6, 0.8, 1.0], yticks: rowsY, xfmt: (v) => fmt.num(v, 1),
      ylabels: BLOCKS.map((b) => b.label), grid: 'x', s, fs });
    const hb = 0.34 * 0.92;
    const rowHits = el('g');
    for (const bar of BARS) {
      const sg = el('g', { 'data-series': `bar-${bar.key}` });
      BLOCKS.forEach((b, i) => {
        const d = data.blocks[bar.key][b.key];
        const yc = rowsY[i] + bar.off;
        sg.append(el('rect', { x: XB(0), y: YB(yc + hb / 2), width: xb(d.human_share), height: yb(yc - hb / 2) - yb(yc + hb / 2), fill: bar.color }));
      });
      gb.append(sg);
    }
    // Value labels (zorder 3), then the oracle rule (4), then the whiskers (6).
    for (const bar of BARS) {
      const sg = el('g', { 'data-series': `bar-${bar.key}` });
      BLOCKS.forEach((b, i) => {
        const d = data.blocks[bar.key][b.key];
        const yc = rowsY[i] + bar.off;
        const inside = d.human_share + d.se > 0.84;
        text(sg, { x: XB(inside ? d.human_share - d.se - 0.02 : d.human_share + d.se + 0.02), y: YB(yc), str: fmt.num(d.human_share, 2),
          size: 7.6 * fs, fill: inside ? PAPER.ink : (bar.text || bar.color), anchor: inside ? 'end' : 'start', va: 'center' });
      });
      gb.append(sg);
    }
    const og = el('g', { 'data-series': 'oracle-rule' });
    BLOCKS.forEach((b, i) => {
      const v = data.blocks.oracle[b.key].human_share;
      og.append(el('line', { x1: XB(v), x2: XB(v), y1: YB(rowsY[i] - 0.44), y2: YB(rowsY[i] + 0.44), stroke: PAPER.ink,
        'stroke-width': 0.8 * s, 'stroke-opacity': 0.85 }));
    });
    gb.append(og);
    for (const bar of BARS) {
      const sg = el('g', { 'data-series': `bar-${bar.key}` });
      BLOCKS.forEach((b, i) => {
        const d = data.blocks[bar.key][b.key];
        const yc = YB(rowsY[i] + bar.off);
        const lo = XB(d.human_share - d.se), hi = XB(d.human_share + d.se), c = 0.7 * s;
        sg.append(el('path', { d: `M${lo},${yc}H${hi}M${lo},${yc - c}V${yc + c}M${hi},${yc - c}V${yc + c}`, stroke: PAPER.inkSoft,
          'stroke-width': 0.6 * s, fill: 'none' }));
      });
      gb.append(sg);
    }
    title(gb, B, '(b) the split it finds', s, fs);
    xlabel(gb, B, 'share of tasks routed to a human', s, fs);

    // Row hover and focus: the row's two bars ± s.e. and the oracle.
    const tint = el('rect', { class: 'row-tint', x: B.x, width: B.w, fill: PAPER.panel, style: 'display:none', 'pointer-events': 'none' });
    gb.insertBefore(tint, gb.firstChild);
    BLOCKS.forEach((b, i) => {
      const top = YB(rowsY[i] + 0.5), bot = YB(rowsY[i] - 0.5);
      const o = data.blocks.oracle[b.key];
      const name = b.label.join(' ');
      const hit = el('rect', { x: B.x, y: top, width: B.w, height: bot - top, fill: 'transparent', tabindex: 0, role: 'img', class: 'row-hit',
        'aria-label': `${name}: Split-Σ ${fmt.num(data.blocks.hybrid[b.key].human_share, 2)} ± ${fmt.num(data.blocks.hybrid[b.key].se, 2)}, random ${fmt.num(data.blocks.random[b.key].human_share, 2)} ± ${fmt.num(data.blocks.random[b.key].se, 2)}, oracle ${fmt.num(o.human_share, 2)}` });
      const show = (pos) => {
        tint.setAttribute('y', top); tint.setAttribute('height', bot - top); tint.style.display = '';
        tip.show(tipRows(`${name} · share routed to a human`, [
          ...BARS.map((bar) => { const d = data.blocks[bar.key][b.key]; return { color: bar.color, swatch: 'rect', name: bar.name, value: fmt.num(d.human_share, 2), extra: `± ${fmt.num(d.se, 2)}` }; }),
          { color: PAPER.ink, name: 'oracle', value: fmt.num(o.human_share, 2), extra: `± ${fmt.num(o.se, 2)}` },
        ]), pos.px, pos.py);
      };
      const hide = () => { tint.style.display = 'none'; tip.hide(); };
      hit.addEventListener('pointermove', (evt) => show(figPos(evt, container)));
      hit.addEventListener('pointerleave', hide);
      hit.addEventListener('focus', () => show(svgToFig(svg, container, B.x + B.w * 0.5, (top + bot) / 2)));
      hit.addEventListener('blur', hide);
      rowHits.append(hit);
    });
    gb.append(rowHits);

    // Legend below panel (b): upper centre at (0.5, -0.20) in axes units.
    mplLegend(gb, {
      cols: [
        { key: 'oracle-rule', name: 'oracle', draw: (ig, x0, cy, hl) => ig.append(el('line', { x1: x0, x2: x0 + hl, y1: cy, y2: cy, stroke: PAPER.ink, 'stroke-width': 0.8 * s })) },
        ...BARS.map((bar) => ({ key: `bar-${bar.key}`, name: bar.name, draw: (ig, x0, cy, hl) => ig.append(el('rect', { x: x0, y: cy - 0.35 * 8 * fs, width: hl, height: 0.7 * 8 * fs, fill: bar.color })) })),
      ].map((it) => [it]),
      x: B.x + B.w / 2, y: B.y + B.h + 0.2 * B.h + (0.5 + 0.2) * 8 * s, valign: 'top', size: 8 * fs, s,
      handlelength: 1.1, handletextpad: 0.5, columnspacing: 1.4, labelspacing: 0.5, color: PAPER.inkSoft,
      onItem: (ig, it) => {
        toggle(ig, it.name, (on) => {
          if (on) hidden.delete(it.key); else hidden.add(it.key);
          applyVisibility(svg, hidden);
          tip.hide();
        });
        if (hidden.has(it.key)) ig.setAttribute('aria-pressed', 'false');
      },
    });

    applyVisibility(svg, hidden);
    host.append(html('div', { class: 'fig__panel' }, svg));
  });

  dataTable(container, {
    summary: 'Show the data for (a)',
    caption: 'Figure 8(a) data: share of tasks cleared per policy and 100-task bin, mean over 24 trials with one standard error.',
    columns: ['policy', 'tasks', 'share cleared', 's.e.'],
    rows: [...LINES].reverse().flatMap((l) => data.curve[l.key].map((p) => [l.name, `${p.bin}–${p.bin + 100}`, fmt.num(p.success, 3), fmt.num(p.se, 3)])),
  });
  dataTable(container, {
    summary: 'Show the data for (b)',
    caption: 'Figure 8(b) data: share of tasks routed to a human in the last quarter of the run, by skill block, with one standard error.',
    columns: ['skill block', 'Split-Σ', 's.e.', 'random', 's.e.', 'oracle', 's.e.'],
    rows: BLOCKS.map((b) => {
      const h = data.blocks.hybrid[b.key], r = data.blocks.random[b.key], o = data.blocks.oracle[b.key];
      return [b.label.join(' '), fmt.num(h.human_share, 3), fmt.num(h.se, 3), fmt.num(r.human_share, 3), fmt.num(r.se, 3), fmt.num(o.human_share, 3), fmt.num(o.se, 3)];
    }),
  });
}
