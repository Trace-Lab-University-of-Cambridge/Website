/* ==========================================================================
   Figure 5: real skill profiles from Singapore's Skills Framework (FS).
   --------------------------------------------------------------------------
   A replica of the paper's figure (hybrid-workforces-overleaf/figures/src/
   ssg_credit_profiles.py), drawn in the same point geometry: six radars in
   a 3 x 2 grid on eight shared axes, rings at levels 2/4/6, the sector mean
   as a flat grey filled polygon with no outline, each role as an accent
   polygon with dot markers over a light accent fill, and the two-entry key
   below. Only the typeface differs (Archivo). Added on top: a tooltip on
   every role vertex (pointer, or Tab into a panel and step with the arrow
   keys) and the numbers as a table. Below ~580px the grid goes to two
   columns; the panels themselves do not change.
   ========================================================================== */
import data from '../data/ssg_credit_profiles.json';
import { el, html, PAPER, TOKENS, tooltip, dataTable } from '../lib.js';
import { responsive, figPos } from './_experiments.js';

/* Geometry in points, from the matplotlib layout of the paper's figure
   (canvas 425.2 pt wide; each cell 141.7 x 163.4 pt incl. the row gap). */
const CELL_W = 141.744, CELL_H = 163.44;
const C0X = 70.872, C0Y = 84.6;   // centre of the first radar
const R = 29.112;                 // rim (level 6)
const R_LABEL = 46.6;             // spoke labels are centred on this circle
const TITLE_DY = -69.5;           // title centre above the radar centre
const MAXL = data.max_level;
const RING_POS = [[10.4, -7.2], [19.5, -10.9], [28.4, -14.6]];   // 2, 4, 6 at 67.5 deg
const FAMILY = TOKENS.sans;

const NAXES = data.axes.length;
const ANG = data.axes.map((_, i) => (2 * Math.PI * i) / NAXES);   // clockwise from the top

/* Text widths, for the multi-line spoke labels whose lines align left on the
   right of a panel and right on the left (as side_align in the .py). */
const ctx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
function textW(s, size, weight = 400) {
  if (!ctx) return s.length * size * 0.5;
  ctx.font = `${weight} ${size}px ${FAMILY}`;
  return ctx.measureText(s).width;
}

/* A text block centred on (cx, cy), lines aligned within it like matplotlib's
   multialignment. */
function block(lines, cx, cy, { size, weight = 400, fill, align = 'center', pitch = size * 1.02 }) {
  const ws = lines.map((s) => textW(s, size, weight));
  const bw = Math.max(...ws);
  const g = el('g', { 'font-size': size, 'font-weight': weight, fill });
  const y0 = cy - ((lines.length - 1) * pitch) / 2 + size * 0.36;
  lines.forEach((s, k) => {
    let x = cx, anchor = 'middle';
    if (align === 'left') { x = cx - bw / 2; anchor = 'start'; }
    else if (align === 'right') { x = cx + bw / 2; anchor = 'end'; }
    g.append(el('text', { x: x.toFixed(2), y: (y0 + k * pitch).toFixed(2), 'text-anchor': anchor }, s));
  });
  return g;
}

const sideAlign = (a) => { const dx = Math.sin(a); return dx < -0.1 ? 'right' : dx > 0.1 ? 'left' : 'center'; };
const pt = (cx, cy, r, a) => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
const poly = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join('') + 'Z';

export async function render(container) {
  try { await document.fonts?.load(`400 12px ${FAMILY}`); await document.fonts?.load(`600 12px ${FAMILY}`); } catch { /* measure with the fallback */ }

  const tip = tooltip(container);
  responsive(container, (host, W) => build(host, W));

  // The paper's key, below the figure: line-with-dot and a filled grey patch.
  const key = html('div', { class: 'fig__paperkey fig__paperkey--row' });
  const sw1 = el('svg', { viewBox: '0 0 30 10', width: 30, height: 10, 'aria-hidden': 'true' });
  sw1.append(el('line', { x1: 1, x2: 29, y1: 5, y2: 5, stroke: PAPER.accent, 'stroke-width': 2.2 }),
    el('circle', { cx: 15, cy: 5, r: 2.6, fill: PAPER.accent }));
  const sw2 = el('svg', { viewBox: '0 0 26 10', width: 26, height: 10, 'aria-hidden': 'true' });
  sw2.append(el('rect', { x: 1, y: 0.5, width: 24, height: 9, fill: PAPER.ref, 'fill-opacity': 0.5 }));
  key.append(html('span', {}, sw1, "level this role's card requires"),
    html('span', {}, sw2, `mean over all ${data.n_roles} Financial Services roles`));
  container.append(key);

  dataTable(container, {
    caption: `Required proficiency level (1–${MAXL}) on each axis; last row: mean over all ${data.n_roles} Financial Services roles.`,
    columns: ['Role', ...data.axes.map((a) => a.name)],
    rows: [
      ...data.roles.map((r) => [r.name, ...r.levels]),
      [`Sector mean (${data.n_roles} roles)`, ...data.sector_mean.map((v) => v.toFixed(2))],
    ],
  });

  function build(host, W) {
    // Desktop column: the paper's 3 x 2. Under ~580px, two columns; the
    // panels are unchanged (two columns already enlarge the type).
    const ncol = W < 580 ? 2 : 3;
    const fs = 1;   // two columns already enlarge the type
    const nrow = Math.ceil(data.roles.length / ncol);
    const vbW = ncol * CELL_W;
    const vbH = (nrow - 1) * CELL_H + C0Y + R_LABEL + 6 + 4 + (fs - 1) * 14;
    host.style.gridTemplateColumns = 'minmax(0, 1fr)';
    const svg = el('svg', {
      viewBox: `0 0 ${vbW.toFixed(1)} ${vbH.toFixed(1)}`, width: '100%', role: 'group',
      'aria-label': 'Six radar charts: required proficiency level on eight shared skill axes for six risk roles, against the Financial Services sector mean.',
      'font-family': FAMILY, class: 'fig5-svg',
    });
    host.append(svg);

    data.roles.forEach((role, i) => {
      const r = Math.floor(i / ncol), c = i % ncol;
      const cx = C0X + c * CELL_W, cy = C0Y + r * CELL_H + (fs - 1) * 10;
      const g = el('g', { class: 'fig5-panel' });
      svg.append(g);

      // Grid: rings at 2, 4, 6 (6 is the rim) and eight spokes.
      for (const lv of [2, 4]) g.append(el('circle', { cx, cy, r: (R * lv) / MAXL, fill: 'none', stroke: PAPER.grid, 'stroke-width': 0.55 }));
      for (const a of ANG) {
        const [x, y] = pt(cx, cy, R, a);
        g.append(el('line', { x1: cx, y1: cy, x2: x.toFixed(2), y2: y.toFixed(2), stroke: PAPER.grid, 'stroke-width': 0.55 }));
      }
      g.append(el('circle', { cx, cy, r: R, fill: 'none', stroke: PAPER.grid, 'stroke-width': 0.7 }));

      // Sector mean: flat grey fill, no outline.
      const refPts = data.sector_mean.map((v, k) => pt(cx, cy, (R * v) / MAXL, ANG[k]));
      g.append(el('path', { d: poly(refPts), fill: PAPER.ref, 'fill-opacity': 0.22, stroke: 'none' }));

      // The role: light accent fill, 1.4 pt outline, dot markers.
      const pts = role.levels.map((v, k) => pt(cx, cy, (R * v) / MAXL, ANG[k]));
      g.append(el('path', { d: poly(pts), fill: PAPER.accent, 'fill-opacity': 0.13, stroke: 'none' }));
      g.append(el('path', { d: poly(pts), fill: 'none', stroke: PAPER.accent, 'stroke-width': 1.4, 'stroke-linejoin': 'round' }));
      for (const [x, y] of pts) g.append(el('circle', { cx: x.toFixed(2), cy: y.toFixed(2), r: 1.58, fill: PAPER.accent }));

      // Ring labels 2/4/6 between two spokes, small and faint.
      ['2', '4', '6'].forEach((s, k) => {
        const t = block([s], cx + RING_POS[k][0], cy + RING_POS[k][1], { size: 7.4 * fs, fill: PAPER.inkFaint });
        // A white halo so a level number stays legible where a polygon crosses it.
        t.setAttribute('paint-order', 'stroke');
        t.setAttribute('stroke', '#ffffff');
        t.setAttribute('stroke-width', '2.4');
        t.setAttribute('stroke-linejoin', 'round');
        g.append(t);
      });

      // Spoke labels.
      data.axes.forEach((ax, k) => {
        const [lx, ly] = pt(cx, cy, R_LABEL + (fs - 1) * 8, ANG[k]);
        g.append(block(ax.short.split('\n'), lx, ly, { size: 7.6 * fs, fill: PAPER.inkSoft, align: sideAlign(ANG[k]), pitch: 7.6 * fs }));
      });

      // Title.
      g.append(block([role.short], cx, cy + TITLE_DY - (fs - 1) * 8, { size: 9.3 * fs, weight: 600, fill: PAPER.ink }));

      // Interaction layer: one tab stop per panel, arrows step through the
      // eight vertices; pointer hover on each vertex. Invisible until used.
      const hits = el('g', { class: 'fig5-hits', tabindex: 0, role: 'group',
        'aria-label': `${role.short}: required levels. Use the arrow keys to read each skill.` });
      const ring = el('circle', { r: 3.4, fill: 'none', stroke: PAPER.ink, 'stroke-width': 0.8, 'pointer-events': 'none', visibility: 'hidden' });
      let cur = -1;
      const content = (k) => {
        const lv = role.levels[k], m = data.sector_mean[k];
        return `<div class="fig__tip-title">${role.name}</div>`
          + `<b>${data.axes[k].name}</b><br>`
          + `<span class="k">level required</span> <span class="num"><b>${lv}</b></span> <span class="k">of ${MAXL}</span><br>`
          + `<span class="k">sector mean</span> <span class="num">${m.toFixed(2)}</span>`;
      };
      const posOf = (node) => {
        const root = container.closest('.fig') || container;
        const a = root.getBoundingClientRect(), b = node.getBoundingClientRect();
        return [b.left + b.width / 2 - a.left, b.top + b.height / 2 - a.top];
      };
      const showRing = (k) => { ring.setAttribute('cx', pts[k][0]); ring.setAttribute('cy', pts[k][1]); ring.setAttribute('visibility', 'visible'); };
      const dots = pts.map(([x, y], k) => {
        const d = el('circle', { cx: x.toFixed(2), cy: y.toFixed(2), r: 6, fill: 'transparent', class: 'fig5-hit' });
        d.addEventListener('pointerenter', () => showRing(k));
        d.addEventListener('pointermove', (e) => { const p = figPos(e, container); tip.show(content(k), p.px, p.py); });
        d.addEventListener('pointerleave', () => { tip.hide(); if (document.activeElement !== hits) ring.setAttribute('visibility', 'hidden'); });
        hits.append(d);
        return d;
      });
      const focusOn = (k) => {
        cur = (k + NAXES) % NAXES;
        showRing(cur);
        hits.setAttribute('aria-label', `${role.short}, ${data.axes[cur].name}: level ${role.levels[cur]} of ${MAXL}; sector mean ${data.sector_mean[cur].toFixed(2)}`);
        tip.show(content(cur), ...posOf(dots[cur]));
      };
      hits.addEventListener('focus', () => focusOn(cur < 0 ? 0 : cur));
      hits.addEventListener('blur', () => { ring.setAttribute('visibility', 'hidden'); tip.hide(); });
      hits.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); focusOn(cur + 1); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); focusOn(cur - 1); }
        else if (e.key === 'Escape') { tip.hide(); }
      });
      g.append(ring, hits);
    });
  }
}
