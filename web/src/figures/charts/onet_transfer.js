/* ==========================================================================
   Figure 6: one observation moving a whole profile on O*NET.
   --------------------------------------------------------------------------
   A replica of the paper's figure (hybrid-workforces-overleaf/figures/src/
   onet_transfer.py), drawn in the same point geometry (canvas 425.2 pt):
   (a) a radar over the seven features with the prior (grey dashed, dots,
   grey fill), the target occupation (ink dashed, triangles), the posterior
   (accent, dots, accent fill) and the observation (accent star on the
   observed spoke, whose label is set in accent with a star); (b) the 7 x 7
   correlation submatrix, every cell labelled, the observed row and column
   outlined, with a horizontal colour bar. The 2 x 2 key sits below. Only
   the typeface differs (Archivo).
   Added on top: a control row above the figure (observed feature and the
   value y); the posterior is recomputed in the browser with one scalar
   Kalman update, K = Sigma[:, j] / (Sigma_jj + sigma^2), mu' = mu + K (y - mu_j).
   Tooltips on the radar spokes and the heatmap cells (pointer, or Tab in
   and step with the arrow keys) and the numbers as a table. Below ~580px
   the two panels stack; neither changes.
   ========================================================================== */
import data from '../data/onet_transfer.json';
import { el, html, PAPER, TOKENS, tooltip, dataTable } from '../lib.js';
import { responsive, figPos } from './_experiments.js';

const FAMILY = TOKENS.sans;
const N = data.features.length;
const SIG2 = data.observed.sigma_obs ** 2;

/* Geometry in points, from the matplotlib layout of the paper's figure. */
const CX = 97.92, CY = 109.44, R = 51.84;   // radar centre and rim
const R_LABEL = 70.3;                        // spoke labels centred on this circle
const RING_AT = (231.4 * Math.PI) / 180;    // where the .25/.50/.75 labels sit
const MX = 282.672, MY = 47.52, MW = 123.84; // matrix box
const CELL = MW / N;
const CB_Y = 186.84, CB_H = 6.12;            // colour bar
const VB_H = 207;

/* Radar order, as the paper: observed, three strongest positive correlates,
   the near-independent one, then the two negative ones strongest first. The
   JSON keeps the heatmap order (by correlation with the observed feature). */
const ORDER = [0, 1, 2, 3, 4, 6, 5];
const ANG = ORDER.map((_, k) => (2 * Math.PI * k) / ORDER.length);
const rad = (v) => (R * (v + 0.04)) / 1.04;   // ylim (-0.04, 1.0): a small hole at the centre
const pt = (r, a, cx = CX, cy = CY) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];

const RADAR_BREAKS = {
  'Arm-Hand Steadiness': 'Arm-Hand\nSteadiness',
  'Manual Dexterity': 'Manual\nDexterity',
  'Administration and Management': 'Administration\nand Management',
};
const short = (s) => (s.length > 18 ? s.replace(' and ', ' and\n') : s);
const spoke = (s) => RADAR_BREAKS[s] || short(s);

/* One scalar Kalman update (Equations 3.1-3.3). */
function update(j, y) {
  const S = data.sigma, mu = data.mu;
  const denom = S[j][j] + SIG2;
  return mu.map((m, i) => m + (S[i][j] / denom) * (y - mu[j]));
}

/* Cell label colour by contrast with the cell, not by |rho|: the paper's
   |rho| > .55 rule assumed its dark orange; on the site coral, white on .62
   would be faint. Whichever of white / ink contrasts more wins. */
function labelOn(fill) {
  const [r, g, b] = fill.match(/\d+/g).map(Number);       // cmap() returns rgb(r,g,b)
  const lin = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const onWhite = 1.05 / (L + 0.05), onInk = (L + 0.05) / 0.0636;   // ink #3d4f63, L ≈ 0.0136
  return onWhite > onInk ? '#fff' : PAPER.inkSoft;
}

/* Diverging map WARM -> white -> accent, linear in RGB like the .py's
   LinearSegmentedColormap. */
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const WARM = hex(PAPER.warmGrey), COOL = hex(PAPER.accent);
function cmap(c) {
  const t = Math.max(-1, Math.min(1, c));
  const pole = t >= 0 ? COOL : WARM, a = Math.abs(t);
  return `rgb(${pole.map((p) => Math.round(255 + (p - 255) * a)).join(',')})`;
}
const rhoTxt = (v) => {
  const s = Math.abs(v).toFixed(2);
  return (v < 0 ? '-' : '') + (s.startsWith('0.') ? s.slice(1) : s);
};

const ctx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
function textW(s, size, weight = 400) {
  if (!ctx) return s.length * size * 0.5;
  ctx.font = `${weight} ${size}px ${FAMILY}`;
  return ctx.measureText(s).width;
}
/* A text block: lines aligned 'center' (centred on cx) or 'right' (ending at cx). */
function block(lines, cx, cy, { size, weight = 400, fill, align = 'center', pitch = size * 0.97, italic }) {
  const g = el('g', { 'font-size': size, 'font-weight': weight, fill, 'font-style': italic ? 'italic' : null });
  const y0 = cy - ((lines.length - 1) * pitch) / 2 + size * 0.36;
  lines.forEach((s, k) => g.append(el('text', { x: cx.toFixed(2), y: (y0 + k * pitch).toFixed(2),
    'text-anchor': align === 'right' ? 'end' : align === 'left' ? 'start' : 'middle' }, s)));
  return g;
}

/* mpl markers in points: 'o' (ms + 1 pt edge), '^', '*'. */
const dot = (x, y, ms, color) => el('circle', { cx: x.toFixed(2), cy: y.toFixed(2), r: ms / 2 + 0.5, fill: color });
function tri(x, y, ms, color) {
  const h = ms / 2;
  return el('path', { d: `M${x},${y - h}L${x - h},${y + h}L${x + h},${y + h}Z`, fill: color, stroke: color, 'stroke-width': 1, 'stroke-linejoin': 'miter' });
}
function star(x, y, ms, attrs) {
  const ro = ms / 2, ri = ro * 0.381966;
  let d = '';
  for (let k = 0; k < 10; k++) {
    const a = (Math.PI * k) / 5, r = k % 2 ? ri : ro;
    d += `${k ? 'L' : 'M'}${(x + r * Math.sin(a)).toFixed(2)},${(y - r * Math.cos(a)).toFixed(2)}`;
  }
  return el('path', { d: d + 'Z', ...attrs });
}
const closed = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join('') + 'Z';

export async function render(container) {
  try { await document.fonts?.load(`400 12px ${FAMILY}`); await document.fonts?.load(`600 12px ${FAMILY}`); } catch { /* fallback metrics */ }

  const state = { j: data.observed.index, y: data.observed.y };
  const tip = tooltip(container);
  let lastW = 690;

  /* ---- controls, above the figure ---- */
  const controls = html('div', { class: 'fig__controls' });
  const sel = html('select', { 'aria-label': 'Observed feature' });
  data.features.forEach((f, i) => {
    const o = html('option', { value: i }, f.short);
    if (i === state.j) o.selected = true;
    sel.append(o);
  });
  const range = html('input', { type: 'range', min: 0, max: 1, step: 0.01, value: state.y, 'aria-label': 'Observed value y' });
  const out = html('output', { class: 'code' }, state.y.toFixed(2));
  controls.append(html('label', {}, 'Observe', sel), html('label', {}, html('span', {}, 'at ', html('i', {}, 'y'), ' ='), range, out));
  container.append(controls);
  sel.addEventListener('change', () => { state.j = +sel.value; redraw(); });
  range.addEventListener('input', () => { state.y = +range.value; out.textContent = state.y.toFixed(2); redraw(); });

  const host = responsive(container, (h, W) => { lastW = W; build(h, W); });
  function redraw() { tip.hide(); host.replaceChildren(); build(host, lastW); keyY.textContent = state.y.toFixed(2); fillTable(); }

  /* ---- the paper's 2 x 2 key, below ---- */
  const key = html('div', { class: 'fig__paperkey fig__paperkey--grid' });
  const sw = (draw) => { const s = el('svg', { viewBox: '0 0 26 10', width: 26, height: 10, 'aria-hidden': 'true' }); draw(s); return s; };
  const keyY = html('span', {}, state.y.toFixed(2));
  key.append(
    html('span', {}, sw((s) => s.append(
      el('line', { x1: 1, x2: 25, y1: 5, y2: 5, stroke: PAPER.prior, 'stroke-width': 1.6, 'stroke-dasharray': '5.9 2.6' }),
      el('circle', { cx: 13, cy: 5, r: 2.4, fill: PAPER.prior }))), 'prior (population mean)'),
    html('span', {}, sw((s) => s.append(
      el('line', { x1: 3, x2: 25, y1: 5, y2: 5, stroke: PAPER.accent, 'stroke-width': 2.4 }),
      el('circle', { cx: 13, cy: 5, r: 2.6, fill: PAPER.accent }))), 'posterior'),
    html('span', {}, sw((s) => s.append(
      el('line', { x1: 1, x2: 25, y1: 5, y2: 5, stroke: PAPER.ink, 'stroke-width': 1.6, 'stroke-dasharray': '4.8 3.2' }),
      tri(13, 5, 4.6, PAPER.ink))), `target: ${data.target.name} (unseen)`),
    html('span', {}, sw((s) => s.append(star(13, 5, 12, { fill: PAPER.accent, stroke: '#fff', 'stroke-width': 0.6 }))),
      html('span', {}, 'observation ', html('i', {}, 'y'), '\u2009=\u2009', keyY)),
  );
  container.append(key);

  /* ---- the table ---- */
  const tableBox = html('div');
  container.append(tableBox);
  function fillTable() {
    const mu1 = update(state.j, state.y);
    const wasOpen = tableBox.querySelector('details')?.open;
    tableBox.replaceChildren();
    dataTable(tableBox, {
      caption: `Observed ${data.features[state.j].short} at y = ${state.y.toFixed(2)} (σ = ${data.observed.sigma_obs}); target ${data.target.name}. ρ is the correlation with the observed feature over ${data.n_occupations} occupations.`,
      columns: ['Feature', 'Prior', 'Posterior', 'Target', 'ρ with observed'],
      rows: data.features.map((f, i) => [f.short, data.mu[i].toFixed(3), mu1[i].toFixed(3), data.target.values[i].toFixed(3), data.corr[state.j][i].toFixed(2)]),
    });
    if (wasOpen) tableBox.querySelector('details').open = true;
  }
  fillTable();
  const posOf = (node) => {
    const root = container.closest('.fig') || container;
    const a = root.getBoundingClientRect(), b = node.getBoundingClientRect();
    return [b.left + b.width / 2 - a.left, b.top + b.height / 2 - a.top];
  };

  function build(h, W) {
    const stacked = W < 580;
    const { j, y } = state;
    const mu1 = update(j, y);
    const vbW = stacked ? 224 : 425.232;
    const vbH = stacked ? 192 + VB_H - 6 : VB_H;
    h.style.gridTemplateColumns = 'minmax(0, 1fr)';
    const svg = el('svg', { viewBox: `0 0 ${vbW} ${vbH}`, width: '100%', 'font-family': FAMILY, role: 'group',
      'aria-label': `(a) radar of prior, posterior and target on seven O*NET features after observing ${data.features[j].short} at y = ${y.toFixed(2)}; (b) their correlation matrix.` });
    if (stacked) svg.style.cssText = 'max-width: 440px; margin: 0 auto;';
    h.append(svg);
    const A = el('g', { transform: stacked ? 'translate(8,0)' : null });
    const B = el('g', { transform: stacked ? 'translate(-196,190)' : null });
    svg.append(A, B);

    /* ---------------- (a) the update ---------------- */
    A.append(el('text', { x: 12.8, y: 12.4 + 10.2 * 0.36, 'font-size': 10.2, 'font-weight': 600, fill: PAPER.ink }, '(a) one skill inference update'));
    A.append(el('circle', { cx: CX, cy: CY, r: R, fill: PAPER.panel }));
    for (const v of [0.25, 0.5, 0.75]) A.append(el('circle', { cx: CX, cy: CY, r: rad(v), fill: 'none', stroke: PAPER.grid, 'stroke-width': 0.6, 'stroke-dasharray': '0.6 0.99' }));
    for (const a of ANG) { const [x2, y2] = pt(R, a); A.append(el('line', { x1: CX, y1: CY, x2, y2, stroke: PAPER.grid, 'stroke-width': 0.4 })); }
    A.append(el('circle', { cx: CX, cy: CY, r: R, fill: 'none', stroke: PAPER.grid, 'stroke-width': 0.7 }));

    // Spoke labels; the observed one in accent, bold, with a star.
    ORDER.forEach((fi, k) => {
      const obs = fi === j;
      const lines = spoke(data.features[fi].short).split('\n');
      if (obs) lines[lines.length - 1] += ' ★';
      const [lx, ly] = pt(R_LABEL, ANG[k]);
      A.append(block(lines, lx, ly, { size: 8.1, weight: obs ? 600 : 400, fill: obs ? PAPER.accentText : PAPER.inkSoft, pitch: 8.1 * 0.97 }));
    });

    const ring = (vals) => ORDER.map((fi, k) => pt(rad(vals[fi]), ANG[k]));
    const prior = ring(data.mu), post = ring(mu1), targ = ring(data.target.values);
    A.append(el('path', { d: closed(prior), fill: PAPER.prior, 'fill-opacity': 0.16, stroke: 'none' }));
    A.append(el('path', { d: closed(post), fill: PAPER.accent, 'fill-opacity': 0.18, stroke: 'none' }));
    A.append(el('path', { d: closed(prior), fill: 'none', stroke: PAPER.prior, 'stroke-width': 1, 'stroke-dasharray': '3.7 1.6' }));
    for (const [x, yy] of prior) A.append(dot(x, yy, 2.2, PAPER.prior));
    A.append(el('path', { d: closed(targ), fill: 'none', stroke: PAPER.ink, 'stroke-width': 1, 'stroke-dasharray': '3 2' }));
    for (const [x, yy] of targ) A.append(tri(x, yy, 2.4, PAPER.ink));
    A.append(el('path', { d: closed(post), fill: 'none', stroke: PAPER.accent, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }));
    for (const [x, yy] of post) A.append(dot(x, yy, 2.6, PAPER.accent));
    const kObs = ORDER.indexOf(j);
    const [sx, sy] = pt(rad(y), ANG[kObs]);
    A.append(star(sx, sy, 8, { fill: PAPER.accent, stroke: '#fff', 'stroke-width': 0.5 }));

    // Ring labels in the lower-left spoke gap, over a white box.
    for (const [v, s] of [[0.25, '.25'], [0.5, '.50'], [0.75, '.75']]) {
      const [x, yy] = pt(rad(v), RING_AT);
      const w = textW(s, 7.6) + 1;
      A.append(el('rect', { x: x - w / 2, y: yy - 4.3, width: w, height: 8.6, fill: '#fff', 'fill-opacity': 0.8 }));
      A.append(block([s], x, yy, { size: 7.6, fill: PAPER.inkFaint }));
    }

    // Hover / focus layer on the spokes.
    const hl = el('line', { stroke: PAPER.ink, 'stroke-width': 0.8, 'stroke-dasharray': '2 1.5', 'pointer-events': 'none', visibility: 'hidden' });
    const spokeHits = el('g', { tabindex: 0, role: 'group', class: 'fig6-hits',
      'aria-label': 'Radar spokes: use the arrow keys to read prior, posterior and target.' });
    A.append(hl, spokeHits);
    const spokeTip = (k) => {
      const fi = ORDER[k];
      return `<b>${data.features[fi].short}</b>${fi === j ? ' <span class="k">(observed)</span>' : ''}<br>`
        + `<span class="k">prior</span> <span class="num">${data.mu[fi].toFixed(3)}</span><br>`
        + `<span class="k">posterior</span> <span class="num"><b>${mu1[fi].toFixed(3)}</b></span><br>`
        + `<span class="k">target (${data.target.name})</span> <span class="num">${data.target.values[fi].toFixed(3)}</span><br>`
        + `<span class="k">ρ with ${data.features[j].short}</span> <span class="num">${rhoTxt(data.corr[j][fi])}</span>`;
    };
    const showSpoke = (k) => { const [x2, y2] = pt(R, ANG[k]); hl.setAttribute('x1', CX); hl.setAttribute('y1', CY); hl.setAttribute('x2', x2); hl.setAttribute('y2', y2); hl.setAttribute('visibility', 'visible'); };
    const half = Math.PI / ORDER.length;
    const vtx = [];
    ANG.forEach((a, k) => {
      const [x1, y1] = pt(R + 6, a - half), [x2, y2] = pt(R + 6, a + half);
      const wedge = el('path', { d: `M${CX},${CY}L${x1},${y1}A${R + 6},${R + 6} 0 0 1 ${x2},${y2}Z`, fill: 'transparent' });
      wedge.addEventListener('pointerenter', () => showSpoke(k));
      wedge.addEventListener('pointermove', (e) => { const p = figPos(e, container); tip.show(spokeTip(k), p.px, p.py); });
      wedge.addEventListener('pointerleave', () => { tip.hide(); if (document.activeElement !== spokeHits) hl.setAttribute('visibility', 'hidden'); });
      spokeHits.append(wedge);
      const [vx, vy] = post[k];
      const anchor = el('circle', { cx: vx, cy: vy, r: 0.1, fill: 'none', 'pointer-events': 'none' });
      spokeHits.append(anchor);
      vtx.push(anchor);
    });
    let sk = -1;
    const focusSpoke = (k) => { sk = (k + ORDER.length) % ORDER.length; showSpoke(sk); tip.show(spokeTip(sk), ...posOf(vtx[sk])); };
    spokeHits.addEventListener('focus', () => focusSpoke(sk < 0 ? 0 : sk));
    spokeHits.addEventListener('blur', () => { hl.setAttribute('visibility', 'hidden'); tip.hide(); });
    spokeHits.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); focusSpoke(sk + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); focusSpoke(sk - 1); }
      else if (e.key === 'Escape') tip.hide();
    });

    /* ---------------- (b) the correlation submatrix ---------------- */
    B.append(el('text', { x: 202.0, y: 12.4 + 10.2 * 0.36, 'font-size': 10.2, 'font-weight': 600, fill: PAPER.ink }, '(b) skill correlations'));
    const C = data.corr;
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const v = C[r][c];
        B.append(el('rect', { x: MX + c * CELL, y: MY + r * CELL, width: CELL, height: CELL, fill: cmap(v), stroke: '#fff', 'stroke-width': 0.8 }));
        B.append(block([r === c ? '1' : rhoTxt(v)], MX + (c + 0.5) * CELL, MY + (r + 0.5) * CELL,
          { size: 7.6, fill: labelOn(cmap(v)) }));
      }
      const obs = r === j;
      const lines = short(data.features[r].short).split('\n');
      if (obs) lines[lines.length - 1] += ' ★';
      B.append(block(lines, 279.2, MY + (r + 0.5) * CELL, { size: 8.1, weight: obs ? 600 : 400, fill: obs ? PAPER.accentText : PAPER.inkSoft, align: 'right', pitch: 8.1 * 0.97 }));
    }
    B.append(el('rect', { x: MX, y: MY + j * CELL, width: MW, height: CELL, fill: 'none', stroke: PAPER.accent, 'stroke-width': 1.2 }));
    B.append(el('rect', { x: MX + j * CELL, y: MY, width: CELL, height: MW, fill: 'none', stroke: PAPER.accent, 'stroke-width': 1.2 }));

    // Colour bar under the matrix, rho to its right.
    const gid = `fig6-cb-${Math.random().toString(36).slice(2, 8)}`;
    const grad = el('linearGradient', { id: gid, x1: 0, x2: 1, y1: 0, y2: 0 });
    grad.append(el('stop', { offset: '0%', 'stop-color': PAPER.warmGrey }), el('stop', { offset: '50%', 'stop-color': '#ffffff' }), el('stop', { offset: '100%', 'stop-color': PAPER.accent }));
    B.append(el('defs', {}, grad));
    B.append(el('rect', { x: MX, y: CB_Y, width: MW, height: CB_H, fill: `url(#${gid})` }));
    [-1, -0.5, 0, 0.5, 1].forEach((t) => {
      const s = (t < 0 ? '−' : '') + Math.abs(t).toFixed(1);
      B.append(block([s], MX + ((t + 1) / 2) * MW, 199, { size: 8, fill: PAPER.inkFaint }));
    });
    B.append(block(['ρ'], 410.8, 189.9, { size: 9.5, fill: PAPER.inkSoft, align: 'left', italic: true }));

    // Hover / focus layer on the cells: one tab stop, arrows move in 2-D.
    const box = el('rect', { width: CELL, height: CELL, fill: 'none', stroke: PAPER.ink, 'stroke-width': 1, 'pointer-events': 'none', visibility: 'hidden' });
    const cells = el('g', { tabindex: 0, role: 'group', class: 'fig6-hits',
      'aria-label': 'Correlation matrix: use the arrow keys to read each cell.' });
    B.append(box, cells);
    const cellTip = (r, c) => `<b>${data.features[r].short}</b> <span class="k">×</span> <b>${data.features[c].short}</b><br>`
      + `<span class="k">ρ</span> <span class="num"><b>${C[r][c].toFixed(2)}</b></span>`;
    const showBox = (r, c) => { box.setAttribute('x', MX + c * CELL); box.setAttribute('y', MY + r * CELL); box.setAttribute('visibility', 'visible'); };
    const hitAt = [];
    for (let r = 0; r < N; r++) {
      hitAt.push([]);
      for (let c = 0; c < N; c++) {
        const hr = el('rect', { x: MX + c * CELL, y: MY + r * CELL, width: CELL, height: CELL, fill: 'transparent' });
        hr.addEventListener('pointerenter', () => showBox(r, c));
        hr.addEventListener('pointermove', (e) => { const p = figPos(e, container); tip.show(cellTip(r, c), p.px, p.py); });
        hr.addEventListener('pointerleave', () => { tip.hide(); if (document.activeElement !== cells) box.setAttribute('visibility', 'hidden'); });
        cells.append(hr);
        hitAt[r].push(hr);
      }
    }
    let cr = -1, cc = -1;
    const focusCell = (r, c) => { cr = (r + N) % N; cc = (c + N) % N; showBox(cr, cc); tip.show(cellTip(cr, cc), ...posOf(hitAt[cr][cc])); };
    cells.addEventListener('focus', () => focusCell(cr < 0 ? j : cr, cc < 0 ? 0 : cc));
    cells.addEventListener('blur', () => { box.setAttribute('visibility', 'hidden'); tip.hide(); });
    cells.addEventListener('keydown', (e) => {
      const mv = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }[e.key];
      if (mv) { e.preventDefault(); focusCell(cr + mv[0], cc + mv[1]); }
      else if (e.key === 'Escape') tip.hide();
    });
  }
}
