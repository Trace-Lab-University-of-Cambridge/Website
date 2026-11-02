/* ==========================================================================
   Helpers shared by the experiment charts (Figures 7, 8 and 9).
   --------------------------------------------------------------------------
   These charts reproduce the paper's matplotlib figures. Geometry is worked
   out in the paper's own units: `s` is pixels per typographic point, so a
   0.6 pt spine, an 8.1 pt tick label or a (3, 2) dash in the .py source maps
   to the same proportions here. Only the typeface differs (Archivo).
   Interaction (crosshair, tooltip, toggles) is layered on top and leaves the
   untouched view identical to the paper's figure.
   ========================================================================== */
import { el, html, TOKENS, PAPER, nearest } from '../lib.js';

export const FONT = TOKENS.sans;
export { PAPER };

/* Run `build(host, width)` now and again whenever the column width changes,
   so the SVG's viewBox matches the real column and type keeps its size. Also
   rebuild once the web font is ready, since label widths are measured. */
export function responsive(container, build) {
  const host = html('div', { class: 'fig__panels fig__panels--paper' });
  container.append(host);
  let last = -1;
  const run = (w, force) => {
    if (!force && Math.abs(w - last) < 8) return;
    last = w;
    host.replaceChildren();
    build(host, w);
  };
  run(container.clientWidth || 690);
  if ('ResizeObserver' in window) {
    // Rebuild on the next frame, not inside the observer callback: changing
    // the panels' height there trips the "ResizeObserver loop" error.
    let raf = 0;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!(w > 0)) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => run(w));
    });
    ro.observe(container);
  }
  document.fonts?.ready?.then(() => { if (last > 0) run(container.clientWidth || last, true); });
  return host;
}

/* Text width in px, measured with the figure's face. */
let ctx;
export function measure(str, px, weight = 400) {
  ctx = ctx || document.createElement('canvas').getContext('2d');
  ctx.font = `${weight} ${px}px ${FONT}`;
  return ctx.measureText(String(str).replace(/\*/g, '')).width;
}

/* matplotlib scales dash patterns by the line width (lines.scale_dashes). */
export const dash = (pattern, lw, s) => (pattern ? pattern.map((v) => (v * lw * s).toFixed(2)).join(' ') : null);

/* Text with matplotlib-style vertical alignment. `str` may be a string or an
   array of lines; `va` is 'baseline' | 'center' | 'top' | 'bottom'. */
export function text(parent, { x, y, str, size, fill, anchor = 'start', va = 'baseline', weight, ls = 1.2, attrs = {} }) {
  const lines = Array.isArray(str) ? str : [str];
  const lh = size * ls;
  const block = (lines.length - 1) * lh;
  let y0 = y; // baseline of the first line
  if (va === 'center') y0 = y - block / 2 + size * 0.34;
  else if (va === 'top') y0 = y + size * 0.74;
  else if (va === 'bottom') y0 = y - block - size * 0.22;
  const t = el('text', { x: +x.toFixed(2), y: +y0.toFixed(2), 'font-size': size.toFixed(2), fill, 'text-anchor': anchor,
    'font-weight': weight || null, ...attrs });
  if (lines.length === 1) rich(t, lines[0]);
  else lines.forEach((ln, i) => t.append(rich(el('tspan', { x: +x.toFixed(2), dy: i ? lh.toFixed(2) : 0 }), ln)));
  parent.append(t);
  return t;
}

/* Text with *italic* runs, for the paper's math symbols (k, r, R(k), φ). */
export function rich(node, str) {
  str.split('*').forEach((part, i) => {
    if (!part) return;
    node.append(i % 2 ? el('tspan', { 'font-style': 'italic' }, part) : document.createTextNode(part));
  });
  return node;
}

/* Axes in the paper's house style (frame() in the .py sources): left and
   bottom spines in the grid colour, short ink-soft ticks, gridlines on one
   axis, tick labels in the text face. Returns the widest y tick label. */
export function axes(g, { box, x, y, xticks, yticks, xfmt, yfmt, grid = 'y', s, fs, ylabels }) {
  const { x: X, y: Y, w, h } = box;
  const tickFs = 8.1 * fs;
  const gl = el('g', { class: 'grid' });
  if (grid === 'y') for (const t of yticks) gl.append(el('line', { x1: X, x2: X + w, y1: Y + y(t), y2: Y + y(t), stroke: PAPER.grid, 'stroke-width': 0.5 * s, 'stroke-opacity': 0.9 }));
  if (grid === 'x') for (const t of xticks) gl.append(el('line', { x1: X + x(t), x2: X + x(t), y1: Y, y2: Y + h, stroke: PAPER.grid, 'stroke-width': 0.5 * s, 'stroke-opacity': 0.9 }));
  g.append(gl);
  const ax = el('g', { class: 'axes' });
  ax.append(el('line', { x1: X, x2: X, y1: Y, y2: Y + h, stroke: PAPER.grid, 'stroke-width': 0.6 * s }));
  ax.append(el('line', { x1: X, x2: X + w, y1: Y + h, y2: Y + h, stroke: PAPER.grid, 'stroke-width': 0.6 * s }));
  const tl = 2 * s, pad = 3.5 * s;
  for (const t of xticks) {
    const px = X + x(t);
    ax.append(el('line', { x1: px, x2: px, y1: Y + h, y2: Y + h + tl, stroke: PAPER.inkSoft, 'stroke-width': 0.6 * s }));
    text(ax, { x: px, y: Y + h + tl + pad, str: xfmt(t), size: tickFs, fill: PAPER.inkSoft, anchor: 'middle', va: 'top' });
  }
  let maxW = 0;
  yticks.forEach((t, i) => {
    const py = Y + y(t);
    ax.append(el('line', { x1: X - tl, x2: X, y1: py, y2: py, stroke: PAPER.inkSoft, 'stroke-width': 0.6 * s }));
    const str = ylabels ? ylabels[i] : yfmt(t);
    const lines = Array.isArray(str) ? str : [str];
    maxW = Math.max(maxW, ...lines.map((l) => measure(l, tickFs)));
    text(ax, { x: X - tl - pad, y: py, str, size: tickFs, fill: PAPER.inkSoft, anchor: 'end', va: 'center' });
  });
  g.append(ax);
  return maxW;
}

/* Axis labels and the bold, left-aligned panel title. */
export function xlabel(g, box, str, s, fs) {
  const top = box.y + box.h + 5.5 * s + 8.1 * fs * 1.0 + 2 * s;
  return text(g, { x: box.x + box.w / 2, y: top, str, size: 8.7 * fs, fill: PAPER.inkSoft, anchor: 'middle', va: 'top' });
}
export function ylabel(g, box, lines, tickW, s, fs, ls = 1.1 * 1.2) {
  lines = Array.isArray(lines) ? lines : [lines];
  const size = 8.7 * fs;
  const lh = size * ls;
  // The right edge of the label block sits labelpad (2 pt) left of the tick labels.
  const right = box.x - 5.5 * s - tickW - 2 * s;
  const cy = box.y + box.h / 2;
  const t = el('text', { transform: `translate(${right.toFixed(2)},${cy.toFixed(2)}) rotate(-90)`,
    'text-anchor': 'middle', 'font-size': size.toFixed(2), fill: PAPER.inkSoft });
  // Baseline of the last line sits a descent above the right edge.
  lines.forEach((ln, i) => t.append(rich(el('tspan', { x: 0, y: (-size * 0.24 - (lines.length - 1 - i) * lh).toFixed(2) }), ln)));
  g.append(t);
  return t;
}
export function title(g, box, str, s, fs) {
  return text(g, { x: box.x, y: box.y - 4 * s, str, size: 10.2 * fs, fill: PAPER.ink, va: 'bottom', weight: 700 });
}

/* Path strings. */
export const linePath = (pts, X, Y) => pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(2)},${Y(p[1]).toFixed(2)}`).join('');
export function bandPath(pts, X, Y) {
  const top = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[0]).toFixed(2)},${Y(p[2]).toFixed(2)}`).join('');
  const bot = [...pts].reverse().map((p) => `L${X(p[0]).toFixed(2)},${Y(p[1]).toFixed(2)}`).join('');
  return `${top}${bot}Z`;
}

/* Make an SVG group a keyboard-operable show/hide toggle. */
export function toggle(node, label, onToggle) {
  node.setAttribute('role', 'button');
  node.setAttribute('tabindex', '0');
  node.setAttribute('aria-pressed', 'true');
  node.setAttribute('aria-label', `${label}: show or hide this series`);
  node.classList.add('fig-toggle');
  const flip = () => {
    const on = node.getAttribute('aria-pressed') !== 'true';
    node.setAttribute('aria-pressed', String(on));
    onToggle(on);
  };
  node.addEventListener('click', flip);
  node.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
  return node;
}

/* A transparent hit rect over one axes box; the pointer snaps to the nearest
   x position. `key(e)` steps through the positions from the keyboard. */
export function hoverLayer(svg, g, container, { box, xs, x, onMove, onLeave }) {
  const hit = el('rect', { x: box.x, y: box.y, width: box.w, height: box.h, fill: 'transparent', class: 'hover-hit' });
  g.append(hit);
  let cur = -1;
  const toFig = (sx, sy) => {
    const root = container.closest('.fig') || container;
    const fr = root.getBoundingClientRect();
    const r = svg.getBoundingClientRect();
    const k = r.width / svg.viewBox.baseVal.width;
    return { px: r.left - fr.left + sx * k, py: r.top - fr.top + sy * k };
  };
  const move = (evt) => {
    const r = svg.getBoundingClientRect();
    const k = svg.viewBox.baseVal.width / r.width;
    const lx = (evt.clientX - r.left) * k - box.x;
    cur = nearest(xs, x.invert(lx));
    onMove(cur, figPos(evt, container));
  };
  hit.addEventListener('pointermove', move);
  hit.addEventListener('pointerdown', move);
  hit.addEventListener('pointerleave', () => { cur = -1; onLeave(); });
  return {
    key(e) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return false;
      e.preventDefault();
      if (e.key === 'Home') cur = 0;
      else if (e.key === 'End') cur = xs.length - 1;
      else if (cur < 0) cur = e.key === 'ArrowRight' ? 0 : xs.length - 1;
      else cur = Math.max(0, Math.min(xs.length - 1, cur + (e.key === 'ArrowRight' ? 1 : -1)));
      onMove(cur, toFig(box.x + x(xs[cur]), box.y + box.h * 0.35));
      return true;
    },
    reset() { cur = -1; },
  };
}

/* Pointer position relative to the figure box the tooltip is positioned in. */
export function figPos(evt, container) {
  const root = container.closest('.fig') || container;
  const r = root.getBoundingClientRect();
  return { px: evt.clientX - r.left, py: evt.clientY - r.top };
}

/* Position of an svg point relative to the figure box. */
export function svgToFig(svg, container, sx, sy) {
  const root = container.closest('.fig') || container;
  const fr = root.getBoundingClientRect();
  const r = svg.getBoundingClientRect();
  const k = r.width / svg.viewBox.baseVal.width;
  return { px: r.left - fr.left + sx * k, py: r.top - fr.top + sy * k };
}

/* The tooltip from lib.js, restyled in the paper's palette. */
export function paperTip(container, tooltip) {
  const tip = tooltip(container);
  const nodes = container.querySelectorAll('.fig__tip');
  nodes[nodes.length - 1]?.classList.add('fig__tip--paper');
  return tip;
}

/* Tooltip markup: a title line, then one row per series with a line key or
   a rect swatch, the value first and the name after it. */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export function tipRows(head, rows) {
  const key = (r) => r.swatch === 'rect'
    ? `<svg width="16" height="8" viewBox="0 0 16 8" aria-hidden="true"><rect x="1" y="0" width="14" height="8" fill="${r.color}"/></svg>`
    : `<svg width="16" height="8" viewBox="0 0 16 8" aria-hidden="true"><line x1="1" x2="15" y1="4" y2="4" stroke="${r.color}" stroke-width="${r.width || 2}"${r.dash ? ` stroke-dasharray="${r.dash}"` : ''}/></svg>`;
  return `<div class="fig__tip-title">${esc(head)}</div>` + rows.map((r) =>
    `<div class="fig__tip-row">${key(r)}<span class="num"><b>${esc(r.value)}</b>${r.extra ? ` <span class="k">${esc(r.extra)}</span>` : ''}</span><span class="k">${esc(r.name)}</span></div>`).join('');
}

/* Show or hide every element tagged with data-series in `root`. */
export function applyVisibility(root, hidden) {
  for (const n of root.querySelectorAll('[data-series]')) {
    n.style.display = hidden.has(n.dataset.series) ? 'none' : '';
  }
}

/* A fresh svg sized to the column, in the figure's face. */
export function canvas(W, H, label) {
  return el('svg', { viewBox: `0 0 ${W.toFixed(2)} ${H.toFixed(2)}`, width: '100%', role: 'group',
    'font-family': FONT, 'aria-label': label });
}

/* Legend in matplotlib's layout: `cols` is a list of columns (filled top to
   bottom), each a list of items { name, draw(g, x0, cy, hl) }. Returns the
   group; each item group is passed to `onItem` so it can be made a toggle. */
export function mplLegend(parent, { cols, x, y, anchor = 'center', valign = 'bottom', size, handlelength, handletextpad, columnspacing, labelspacing, color, onItem }) {
  const em = size; // legend units are the legend font size
  const hl = handlelength * em, tp = handletextpad * em, cs = columnspacing * em;
  const rowH = size * 1.0, step = rowH + labelspacing * em;
  const colW = cols.map((c) => hl + tp + Math.max(...c.map((it) => measure(it.name, size))));
  const totalW = colW.reduce((a, b) => a + b, 0) + cs * (cols.length - 1);
  const nRows = Math.max(...cols.map((c) => c.length));
  const totalH = rowH + (nRows - 1) * step;
  let x0 = anchor === 'center' ? x - totalW / 2 : x;
  const y0 = valign === 'bottom' ? y - totalH : y; // top of the first row
  const g = el('g', { class: 'legend' });
  cols.forEach((c, ci) => {
    c.forEach((it, ri) => {
      const cy = y0 + rowH / 2 + ri * step;
      const ig = el('g', { class: 'legend-item' });
      it.draw(ig, x0, cy, hl);
      text(ig, { x: x0 + hl + tp, y: cy, str: it.name, size, fill: color, va: 'center' });
      // A hit area covering handle and text.
      ig.append(el('rect', { x: x0 - 2, y: cy - step / 2, width: colW[ci] + 4, height: step, fill: 'transparent' }));
      g.append(ig);
      onItem?.(ig, it);
    });
    x0 += colW[ci] + cs;
  });
  parent.append(g);
  return { g, w: totalW, h: totalH };
}
