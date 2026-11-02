/* ==========================================================================
   Figure 7: five estimators recovering a held-out profile against budget.
   A replica of figures/src/onet_recovery_curves.py: three panels side by
   side on the same x (observations watched, k), (a) R(k), (b) Pearson r,
   (c) coverage against the 0.95 ± 0.01 target band, 95% bootstrap bands,
   one legend below the figure in two rows of three. The panels stack only
   when the column is narrower than 560px.
   On top: a crosshair shared by the three panels with a tooltip listing the
   visible estimators at the hovered k (arrow keys step through k when the
   figure has focus), legend items that toggle a series, and a data table.
   ========================================================================== */
import data from '../data/onet_recovery_curves.json';
import { el, html, linear, tooltip, dataTable, fmt } from '../lib.js';
import {
  PAPER, responsive, canvas, axes, xlabel, ylabel, title, text, dash, linePath, bandPath,
  mplLegend, toggle, hoverLayer, paperTip, tipRows, applyVisibility,
} from './_experiments.js';

/* SERIES_SPEC in the .py, in drawing order: covariance curves on top. */
const SPEC = [
  { key: 'diagonal', name: 'diagonal-Σ', color: PAPER.prior, dash: [4, 2], lw: 1.0 },
  { key: 'rank1', name: 'rank-1 (IRT-1D)', color: PAPER.warmGrey, dash: [1, 1.5], lw: 0.9 },
  { key: 'gmm', name: 'GMM-Σ', color: PAPER.ink, dash: null, lw: 1.0 },
  { key: 'sigma', name: 'Σ', color: PAPER.accent, dash: null, lw: 1.6 },
  { key: 'sigma-active', name: 'Σ-Active', color: PAPER.accent, dash: [3.5, 2], lw: 1.1 },
];
const byKey = (k) => SPEC.find((s) => s.key === k);
/* fig.legend(ncol=3) fills columns top to bottom. */
const LEGEND_COLS = [['sigma-active', 'sigma'], ['gmm', 'rank1'], ['diagonal']];
const TIP_ORDER = ['sigma-active', 'sigma', 'gmm', 'rank1', 'diagonal'];

const f1 = (v) => fmt.num(v, 1), f2 = (v) => fmt.num(v, 2);
const PANELS = [
  { key: 'R', title: '(a) squared error recovered', ylabel: ['share of squared error', 'removed, *R*(*k*)'],
    metric: 'R(k)', domain: [-0.02, 0.86], ticks: [0, 0.2, 0.4, 0.6, 0.8], tick: f1 },
  { key: 'r', title: '(b) shape recovered', ylabel: ['Pearson *r*, whole profile'],
    metric: 'Pearson r', domain: [0.52, 0.94], ticks: [0.6, 0.7, 0.8, 0.9], tick: f1 },
  { key: 'cov', title: '(c) calibration', ylabel: ['share of true levels', 'inside the 95% bar'],
    metric: 'coverage of the 95% bar', domain: [0.90, 1.00], ticks: [0.90, 0.92, 0.94, 0.96, 0.98, 1.00], tick: f2 },
];
const X_TICKS = [0, 10, 20, 30, 40, 50];
const FIG_W = 425.2, FIG_H = 216; // figsize (5.906, 3.0) in points

export async function render(container) {
  const methods = data.methods;
  const ks = methods.sigma.points.map((p) => p.k);
  const hidden = new Set();
  const tip = paperTip(container, tooltip);

  responsive(container, (host, W) => {
    const wide = W >= 640; // below this the 12px Archivo labels collide side by side
    let s, fs, H, boxes, legendY;
    if (wide) {
      // subplots_adjust(left=0.105, right=0.985, top=0.915, bottom=0.30, wspace=0.50)
      s = W / FIG_W; fs = Math.max(s, 12 / 8.1);
      H = FIG_H * s;
      const pw = 0.22 * W;
      boxes = [0.105, 0.435, 0.765].map((f) => ({ x: f * W, y: 0.085 * H, w: pw, h: 0.615 * H }));
      legendY = H - (0.5 + 0.4) * 8 * s;
    } else {
      // Stacked: one panel per row, the same proportions, the legend last.
      s = fs = 12 / 8.1;
      const left = 74, right = 8, ph = Math.round(Math.min(260, (W - left - right) * 0.62));
      const top = 30, below = 50;
      boxes = PANELS.map((_, i) => ({ x: left, y: top + i * (top + ph + below), w: W - left - right, h: ph }));
      H = boxes[2].y + ph + below + 2 * 8 * s * 1.35 + 14;
      legendY = H - (0.5 + 0.4) * 8 * s;
    }
    const svg = canvas(W, H, 'Figure 7: share of squared error removed, Pearson r and coverage of the 95% bar against observations watched k, for five estimators. Arrow keys step through k.');
    svg.setAttribute('tabindex', '0');
    const root = el('g');
    svg.append(root);
    const panels = [];
    const hovers = [];

    const clear = () => { for (const p of panels) p.clear(); tip.hide(); };
    const show = (i, pi, pos) => {
      for (const p of panels) p.set(i);
      const def = PANELS[pi];
      const rows = TIP_ORDER.map(byKey).filter((sp) => !hidden.has(sp.key)).map((sp) => {
        const p = methods[sp.key].points[i];
        return { color: sp.color, dash: sp.dash ? sp.dash.map((v) => v * 1.4).join(' ') : null, width: Math.max(1.4, sp.lw * 1.4),
          name: sp.name, value: fmt.num(p[def.key], 3), extra: `95% ${fmt.num(p[`${def.key}_lo`], 3)}–${fmt.num(p[`${def.key}_hi`], 3)}` };
      });
      tip.show(tipRows(`k = ${ks[i]} · ${def.metric}`, rows), pos.px, pos.py);
    };

    PANELS.forEach((def, pi) => {
      const box = boxes[pi];
      const g = el('g');
      root.append(g);
      const x = linear([-0.8, 50.8], [0, box.w]);
      const y = linear(def.domain, [box.h, 0]);
      const X = (v) => box.x + x(v), Y = (v) => box.y + y(v);
      // Clip marks to the axes, as matplotlib does.
      const cid = `f7clip${pi}-${Math.random().toString(36).slice(2, 7)}`;
      svg.append(el('clipPath', { id: cid }, el('rect', { x: box.x, y: box.y, width: box.w, height: box.h })));

      if (def.key === 'cov') {
        // axhspan(0.94, 0.96) with its two edges, under the grid.
        g.append(el('rect', { x: box.x, y: Y(0.96), width: box.w, height: Y(0.94) - Y(0.96), fill: PAPER.warn, 'fill-opacity': 0.10 }));
      }
      const tickW = axes(g, { box, x, y, xticks: X_TICKS, yticks: def.ticks, xfmt: String, yfmt: def.tick, s, fs });
      const marks = el('g', { 'clip-path': `url(#${cid})` });
      g.append(marks);
      if (def.key === 'cov') {
        for (const e of [0.94, 0.96]) marks.append(el('line', { x1: box.x, x2: box.x + box.w, y1: Y(e), y2: Y(e), stroke: PAPER.warn, 'stroke-width': 0.4 * s, 'stroke-opacity': 0.45 }));
      }
      // Bands (zorder 1) under every line (zorder 3).
      for (const sp of SPEC) {
        const pts = methods[sp.key].points.map((p) => [p.k, p[`${def.key}_lo`], p[`${def.key}_hi`]]);
        marks.append(el('path', { d: bandPath(pts, X, Y), fill: sp.color, 'fill-opacity': 0.15, 'data-series': sp.key }));
      }
      for (const sp of SPEC) {
        const pts = methods[sp.key].points.map((p) => [p.k, p[def.key]]);
        const sg = el('g', { 'data-series': sp.key });
        sg.append(el('path', { d: linePath(pts, X, Y), fill: 'none', stroke: sp.color, 'stroke-width': sp.lw * s,
          'stroke-dasharray': dash(sp.dash, sp.lw, s) }));
        for (const p of pts) sg.append(el('circle', { cx: X(p[0]).toFixed(2), cy: Y(p[1]).toFixed(2), r: 0.8 * s, fill: sp.color }));
        marks.append(sg);
      }
      if (def.key === 'cov') {
        // The 0.95 target, dotted, above the curves (zorder 4), and its label.
        marks.append(el('line', { x1: box.x, x2: box.x + box.w, y1: Y(0.95), y2: Y(0.95), stroke: PAPER.ink, 'stroke-width': 0.7 * s,
          'stroke-dasharray': dash([1, 1.4], 0.7, s) }));
        text(g, { x: X(0.8), y: Y(0.9455), str: '0.95 target ±0.01', size: 7.8 * fs, fill: PAPER.inkSoft, va: 'top' });
      }
      title(g, box, def.title, s, fs);
      ylabel(g, box, def.ylabel, tickW, s, fs);
      xlabel(g, box, 'observations watched, *k*', s, fs);

      // Hover marks: a crosshair and one ring per visible series.
      const hg = el('g', { style: 'display:none', 'pointer-events': 'none' });
      const cross = el('line', { class: 'crosshair', y1: box.y, y2: box.y + box.h, 'stroke-width': 1 });
      hg.append(cross);
      const dots = SPEC.map((sp) => { const d = el('circle', { class: 'hover-dot', r: 3.5, stroke: sp.color }); hg.append(d); return d; });
      g.append(hg);
      panels.push({
        set(i) {
          hg.style.display = '';
          const k = ks[i];
          cross.setAttribute('x1', X(k)); cross.setAttribute('x2', X(k));
          SPEC.forEach((sp, j) => {
            dots[j].style.display = hidden.has(sp.key) ? 'none' : '';
            dots[j].setAttribute('cx', X(k)); dots[j].setAttribute('cy', Y(methods[sp.key].points[i][def.key]));
          });
        },
        clear() { hg.style.display = 'none'; },
      });
      hovers.push(hoverLayer(svg, g, container, { box, xs: ks, x, onMove: (i, pos) => show(i, pi, pos), onLeave: clear }));
    });

    // The figure legend: lower centre, two rows of three.
    mplLegend(root, {
      cols: LEGEND_COLS.map((c) => c.map((k) => {
        const sp = byKey(k);
        return { key: k, name: sp.name, draw: (ig, x0, cy, hl) => {
          ig.append(el('line', { x1: x0, x2: x0 + hl, y1: cy, y2: cy, stroke: sp.color, 'stroke-width': sp.lw * s,
            'stroke-dasharray': dash(sp.dash, sp.lw, s) }));
          ig.append(el('circle', { cx: x0 + hl / 2, cy, r: 0.8 * s, fill: sp.color }));
        } };
      })),
      x: W / 2, y: legendY, size: 8 * fs, s, handlelength: 1.9, handletextpad: 0.45, columnspacing: 1.6, labelspacing: 0.35,
      color: PAPER.inkSoft,
      onItem: (ig, it) => {
        toggle(ig, it.name, (on) => {
          if (on) hidden.delete(it.key); else hidden.add(it.key);
          applyVisibility(svg, hidden);
          clear();
        });
        if (hidden.has(it.key)) ig.setAttribute('aria-pressed', 'false');
      },
    });

    svg.addEventListener('keydown', (e) => { if (e.target === svg) hovers[0].key(e); });
    svg.addEventListener('blur', () => { hovers[0].reset(); clear(); });
    applyVisibility(svg, hidden);
    host.append(html('div', { class: 'fig__panel' }, svg));
  });

  dataTable(container, {
    caption: 'Figure 7 data: per estimator and budget k, the share of squared error removed R(k), Pearson r over the whole profile and coverage of the 95% interval, each with its 95% bootstrap interval.',
    columns: ['estimator', 'k', 'R(k)', 'R lo', 'R hi', 'Pearson r', 'r lo', 'r hi', 'coverage', 'cov lo', 'cov hi'],
    rows: TIP_ORDER.flatMap((key) => methods[key].points.map((p) => [byKey(key).name, p.k,
      fmt.num(p.R, 3), fmt.num(p.R_lo, 3), fmt.num(p.R_hi, 3),
      fmt.num(p.r, 3), fmt.num(p.r_lo, 3), fmt.num(p.r_hi, 3),
      fmt.num(p.cov, 3), fmt.num(p.cov_lo, 3), fmt.num(p.cov_hi, 3)])),
  });
}
