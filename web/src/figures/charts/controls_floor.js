/* ==========================================================================
   Figure 9: what a human floor costs in output.
   A replica of figures/src/controls_floor.py: one plot, x the floor φ (share
   of work held human), y the share of tasks cleared in the last quarter of
   the stream. Realised output (solid, ±1 s.e. band, round markers), output
   predicted from the skills profiles (dashed, diamonds), the dashed no-floor
   rule and its label, the shaded expensive stretch past the knee, the
   sweet-spot callout with its leader line, and the legend inside the plot at
   bottom left. Colours are the site's for the paper's roles.
   On top: a crosshair with a tooltip at the nearest φ (arrow keys step when
   the figure has focus), legend items that toggle a series, a data table.
   ========================================================================== */
import data from '../data/controls_floor.json';
import { el, html, linear, tooltip, dataTable, fmt } from '../lib.js';
import {
  PAPER, responsive, canvas, axes, xlabel, ylabel, text, dash, linePath, bandPath,
  mplLegend, toggle, hoverLayer, paperTip, tipRows, applyVisibility, measure,
} from './_experiments.js';

const KNEE = 0.8;
const REAL = { key: 'realised', name: 'realised output', color: PAPER.ink, lw: 1.5 };
const PRED = { key: 'predicted', name: 'predicted output from skills profiles', color: PAPER.accent, lw: 1.1, dash: [3, 2] };
/* The saved figure is cropped to its tight bounding box: 1300 x 720 at the
   paper's scale, axes from (0.0838, 0.0292) to (0.9823, 0.8653). */
const FIG_W = 425.2, ASPECT = 720 / 1300;

export async function render(container) {
  const rows = data.floor;
  const base = rows[0].cleared;
  const phis = rows.map((p) => p.phi);
  // A negative cost is sampling noise, so the callout clips it at zero.
  const pts = rows.map((p) => ({ phi: p.phi, se: p.cleared_se, level: p.cleared, pred: base - p.ledger_late,
    cost: Math.max(0, base - p.cleared), predCost: p.ledger_late }));
  const ki = phis.reduce((b, v, i) => (Math.abs(v - KNEE) < Math.abs(phis[b] - KNEE) ? i : b), 0);
  const k = pts[ki];

  // matplotlib autoscale: the data extent with a 5% margin each side.
  const vals = pts.flatMap((p) => [p.level - p.se, p.level + p.se, p.pred]);
  const lo = Math.min(...vals), hi = Math.max(...vals), m = 0.05 * (hi - lo);
  const YD = [lo - m, hi + m];

  const hidden = new Set();
  const tip = paperTip(container, tooltip);

  responsive(container, (host, W) => {
    const wide = W >= 560;
    const s = Math.max(W / FIG_W, 0.9), fs = Math.max(W / FIG_W, 12 / 8.1);
    let H, box;
    if (wide) {
      H = W * ASPECT;
      box = { x: 0.0838 * W, y: 0.0292 * H, w: (0.9823 - 0.0838) * W, h: (0.8653 - 0.0292) * H };
    } else {
      H = Math.round(W * 0.78);
      box = { x: 62, y: 10, w: W - 62 - 6, h: H - 10 - 52 };
    }
    const svg = canvas(W, H, 'Figure 9: realised and predicted share of tasks cleared against the human floor φ. Arrow keys step through φ.');
    svg.setAttribute('tabindex', '0');
    const g = el('g');
    svg.append(g);
    const x = linear([-0.02, 1.02], [0, box.w]);
    const y = linear(YD, [box.h, 0]);
    const X = (v) => box.x + x(v), Y = (v) => box.y + y(v);

    // axvspan(KNEE, 1.02) at zorder 0, under the grid.
    g.append(el('rect', { x: X(KNEE), y: box.y, width: X(1.02) - X(KNEE), height: box.h, fill: PAPER.accent, 'fill-opacity': 0.09 }));
    const tickW = axes(g, { box, x, y, xticks: [0, 0.25, 0.5, 0.75, 1.0], yticks: [0.58, 0.60, 0.62, 0.64, 0.66, 0.68, 0.70, 0.72],
      xfmt: (v) => fmt.num(v, 2), yfmt: (v) => fmt.num(v, 2), s, fs });
    const cid = `f9clip-${Math.random().toString(36).slice(2, 7)}`;
    svg.append(el('clipPath', { id: cid }, el('rect', { x: box.x, y: box.y, width: box.w, height: box.h })));
    const marks = el('g', { 'clip-path': `url(#${cid})` });
    g.append(marks);

    marks.append(el('path', { d: bandPath(pts.map((p) => [p.phi, p.level - p.se, p.level + p.se]), X, Y), fill: REAL.color, 'fill-opacity': 0.15, 'data-series': REAL.key }));
    // The run with no floor: a dashed reference rule (zorder 2).
    marks.append(el('line', { x1: box.x, x2: box.x + box.w, y1: Y(base), y2: Y(base), stroke: PAPER.prior, 'stroke-width': 0.8 * s,
      'stroke-dasharray': dash([3, 2], 0.8, s) }));
    const rg = el('g', { 'data-series': REAL.key });
    rg.append(el('path', { d: linePath(pts.map((p) => [p.phi, p.level]), X, Y), fill: 'none', stroke: REAL.color, 'stroke-width': REAL.lw * s }));
    const pg = el('g', { 'data-series': PRED.key });
    pg.append(el('path', { d: linePath(pts.map((p) => [p.phi, p.pred]), X, Y), fill: 'none', stroke: PRED.color, 'stroke-width': PRED.lw * s,
      'stroke-dasharray': dash(PRED.dash, PRED.lw, s) }));
    for (const p of pts) rg.append(el('circle', { cx: X(p.phi), cy: Y(p.level), r: 1.45 * s, fill: REAL.color }));
    const dd = 1.9 * s; // markersize 1.7 plus the default 1 pt edge in the same colour
    for (const p of pts) {
      const cx = X(p.phi), cy = Y(p.pred);
      pg.append(el('path', { d: `M${cx},${cy - dd}L${cx + dd},${cy}L${cx},${cy + dd}L${cx - dd},${cy}Z`, fill: PRED.color }));
    }
    marks.append(rg, pg);

    // Labels: "no floor" over the rule, "expensive stretch" top right.
    const lab = 7.6 * fs;
    text(g, { x: X(0.02), y: Y(base + 0.010), str: 'no floor', size: lab, fill: PAPER.inkSoft, va: 'bottom' });
    text(g, { x: box.x + 0.985 * box.w, y: box.y + (1 - 0.965) * box.h, str: ['expensive', 'stretch'], size: lab, fill: PAPER.accentText, anchor: 'end', va: 'top' });

    // The sweet spot: callout text right-aligned at (KNEE - 0.11, level - 0.042),
    // a plain leader from its box to the point, and the marked point.
    const kx = X(KNEE), ky = Y(k.level);
    const lines = [`sweet spot at *φ* = ${KNEE.toFixed(1)}:`, `${Math.round(100 * KNEE)}% of work held human`,
      `costs ${Math.round(100 * k.cost)} points of output`, `(predicted ${Math.round(100 * k.predCost)})`];
    const tx = X(KNEE - 0.11), ty = Y(k.level - 0.042);
    const bw = Math.max(...lines.map((l) => measure(l, lab))), bh = lines.length * lab * 1.2;
    const bx0 = tx - bw, bx1 = tx, by0 = ty - bh / 2, by1 = ty + bh / 2;
    const cx0 = (bx0 + bx1) / 2, cy0 = ty;
    // Where the centre-to-point segment leaves the text box, then shrinkA/B.
    const dx = kx - cx0, dy = ky - cy0;
    const tEdge = Math.min(dx ? (dx > 0 ? (bx1 - cx0) / dx : (bx0 - cx0) / dx) : Infinity, dy ? (dy > 0 ? (by1 - cy0) / dy : (by0 - cy0) / dy) : Infinity);
    const len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
    const sx = cx0 + dx * tEdge + ux * 1 * s, sy = cy0 + dy * tEdge + uy * 1 * s;
    g.append(el('line', { x1: sx, y1: sy, x2: kx - ux * 3 * s, y2: ky - uy * 3 * s, stroke: PAPER.accent, 'stroke-width': 0.6 * s }));
    text(g, { x: tx, y: ty, str: lines, size: lab, fill: PAPER.accentText, anchor: 'end', va: 'center' });
    g.append(el('circle', { cx: kx, cy: ky, r: 2.1 * s, fill: PAPER.accent, stroke: '#ffffff', 'stroke-width': 0.6 * s }));

    xlabel(g, box, 'human floor *φ* (share of work held human)', s, fs);
    ylabel(g, box, ['share of tasks cleared'], tickW, s, fs);

    // Hover marks.
    const hg = el('g', { style: 'display:none', 'pointer-events': 'none' });
    const cross = el('line', { class: 'crosshair', y1: box.y, y2: box.y + box.h, 'stroke-width': 1 });
    const d1 = el('circle', { class: 'hover-dot', r: 4, stroke: REAL.color });
    const d2 = el('circle', { class: 'hover-dot', r: 4, stroke: PRED.color });
    hg.append(cross, d1, d2);
    g.append(hg);
    const clear = () => { hg.style.display = 'none'; tip.hide(); };
    const hov = hoverLayer(svg, g, container, { box, xs: phis, x,
      onMove: (i, pos) => {
        const p = pts[i];
        hg.style.display = '';
        cross.setAttribute('x1', X(p.phi)); cross.setAttribute('x2', X(p.phi));
        d1.style.display = hidden.has(REAL.key) ? 'none' : '';
        d2.style.display = hidden.has(PRED.key) ? 'none' : '';
        d1.setAttribute('cx', X(p.phi)); d1.setAttribute('cy', Y(p.level));
        d2.setAttribute('cx', X(p.phi)); d2.setAttribute('cy', Y(p.pred));
        const r = [];
        if (!hidden.has(REAL.key)) r.push({ color: REAL.color, width: 2, name: 'realised output', value: fmt.num(p.level, 3), extra: `± ${fmt.num(p.se, 3)}` });
        if (!hidden.has(PRED.key)) r.push({ color: PRED.color, dash: '4 3', width: 2, name: 'predicted output', value: fmt.num(p.pred, 3) });
        r.push({ color: PAPER.prior, dash: '3 2', width: 1.5, name: 'below no floor (realised / predicted)', value: `${(100 * p.cost).toFixed(1)} / ${(100 * p.predCost).toFixed(1)} pts` });
        tip.show(tipRows(`φ = ${fmt.num(p.phi, 1)} · ${Math.round(100 * p.phi)}% of work held human`, r), pos.px, pos.py);
      },
      onLeave: clear });

    // Legend inside the plot, lower left at (0.01, 0.02) of the axes.
    const ls = 7.4 * fs;
    mplLegend(g, {
      cols: [[REAL, PRED].map((sp) => ({ key: sp.key, name: sp.name, draw: (ig, x0, cy, hl) => ig.append(el('line', { x1: x0, x2: x0 + hl, y1: cy, y2: cy,
        stroke: sp.color, 'stroke-width': sp.lw * s, 'stroke-dasharray': dash(sp.dash, sp.lw, s) })) }))],
      x: box.x + 0.01 * box.w + 0.4 * ls, y: box.y + box.h - 0.02 * box.h - 0.4 * ls, anchor: 'start', valign: 'bottom',
      size: ls, s, handlelength: 1.6, handletextpad: 0.5, columnspacing: 2, labelspacing: 0.5, color: PAPER.ink,
      onItem: (ig, it) => {
        toggle(ig, it.name, (on) => {
          if (on) hidden.delete(it.key); else hidden.add(it.key);
          applyVisibility(svg, hidden);
          clear();
        });
        if (hidden.has(it.key)) ig.setAttribute('aria-pressed', 'false');
      },
    });

    svg.addEventListener('keydown', (e) => { if (e.target === svg) hov.key(e); });
    svg.addEventListener('blur', () => { hov.reset(); clear(); });
    applyVisibility(svg, hidden);
    host.append(html('div', { class: 'fig__panel' }, svg));
  });

  dataTable(container, {
    caption: 'Figure 9 data: per human floor φ, the realised share of tasks cleared in the last quarter (mean over 24 trials, one s.e.), the output predicted from the skills profiles, and both as a cost in points of output against the no-floor run.',
    columns: ['φ', 'realised output', 's.e.', 'predicted output', 'realised cost (pts)', 'predicted cost (pts)'],
    rows: pts.map((p) => [fmt.num(p.phi, 1), fmt.num(p.level, 3), fmt.num(p.se, 3), fmt.num(p.pred, 3),
      (100 * p.cost).toFixed(1), (100 * p.predCost).toFixed(1)]),
  });
}
