/* ==========================================================================
   Shared chart primitives for the whitepaper figures.
   --------------------------------------------------------------------------
   Plain SVG, no library. Every figure is a function (container, data) that
   builds an <svg> with these helpers, so axes, bands, tooltips and legends
   look the same across the nine figures. Colour and type come from the
   site tokens (see TOKENS); series identity is hue + dash, never hue alone.
   ========================================================================== */

export const TOKENS = {
  ink: '#0d1b2a',
  muted: '#5d6f81',
  rule: '#dce4ee',
  tint: '#f2f5f9',
  paper: '#ffffff',
  // Categorical hues, validated with the dataviz palette checker (light mode).
  orange: '#e8683f',
  blue: '#1f5fa8',
  // Neutrals for reference and baseline series only, never a category.
  grey: '#8a98a8',
  greyDark: '#5d6f81',
  // Orange as text on white (AA).
  orangeInk: '#b44a2c',
  sans: 'Archivo, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
};

/* Figure palette: the paper's colour ROLES in the website's colours.
   Each figure keeps the paper's form exactly; every paper colour is swapped
   for the site colour that plays the same role (comment = paper hex). Text
   that the paper set in a colour uses the *Text variant, which passes AA on
   white. The name stays PAPER because the roles are the paper's. */
export const PAPER = {
  accent: '#f67552',      // #C05621  main series, humans, posterior (marks)
  accentText: '#b44a2c',  // #C05621  same role when it is text
  accentLight: '#f9a68f', // #D68B5E  Agent-only in Figure 8
  warn: '#b44a2c',        // #B4531F  callout text
  ink: '#0d1b2a',         // #2A2724  machine, realised output, GMM-Σ, text
  inkSoft: '#3d4f63',     // #55524C  secondary strokes and labels
  inkFaint: '#5d6f81',    // #8A857C  faint labels (AA on white)
  warmGrey: '#5d6f81',    // #6B665E  negative pole of diverging maps
  prior: '#8a98a8',       // #9C968A  prior, random, reference rules
  ref: '#a9b6c4',         // #B0AA9E  reference fills
  grid: '#dce4ee',        // #DDD8CF  gridlines, rules  (site --rule)
  panel: '#f2f5f9',       // #FBFAF7 / #F5F2EB / #F7F5F0  panel tints (site --tint)
};

/* The same mapping as a lookup, for the inlined SVG diagrams. */
export const PAPER_TO_SITE = {
  '#C05621': '#f67552', '#D68B5E': '#f9a68f', '#B4531F': '#b44a2c',
  '#2A2724': '#0d1b2a', '#55524C': '#3d4f63', '#8A857C': '#5d6f81',
  '#6B665E': '#5d6f81', '#9C968A': '#8a98a8', '#9C958A': '#8a98a8',
  '#B0AA9E': '#a9b6c4', '#C9C3B7': '#c3cdd8', '#DDD8CF': '#dce4ee',
  '#D8D2C7': '#dce4ee', '#FBFAF7': '#f2f5f9', '#F5F2EB': '#f2f5f9',
  '#F7F5F0': '#f2f5f9', '#F2EFE8': '#f2f5f9',
};

const NS = 'http://www.w3.org/2000/svg';

/* Create an SVG element with attributes; children may be elements or strings. */
export function el(name, attrs = {}, ...children) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    node.setAttribute(k, String(v));
  }
  for (const c of children) {
    if (c == null) continue;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

/* HTML element helper for tooltips, legends and tables. */
export function html(name, attrs = {}, ...children) {
  const node = document.createElement(name);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null) continue;
    if (k === 'class') node.className = v;
    else node.setAttribute(k, String(v));
  }
  for (const c of children) {
    if (c == null) continue;
    node.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return node;
}

/* Linear scale: domain [d0, d1] -> range [r0, r1]. */
export function linear([d0, d1], [r0, r1]) {
  const f = (x) => r0 + ((x - d0) / (d1 - d0)) * (r1 - r0);
  f.invert = (y) => d0 + ((y - r0) / (r1 - r0)) * (d1 - d0);
  f.domain = [d0, d1];
  f.range = [r0, r1];
  f.ticks = (n = 5) => ticks(d0, d1, n);
  return f;
}

/* Band scale for categories: returns the band's start; .bandwidth() its width. */
export function band(domain, [r0, r1], padding = 0.2) {
  const n = domain.length;
  const step = (r1 - r0) / Math.max(1, n - padding);
  const bw = step * (1 - padding);
  const f = (d) => r0 + domain.indexOf(d) * step + (step - bw) / 2 - (padding * step) / 2 + (padding * step) / 2;
  f.bandwidth = () => bw;
  f.step = () => step;
  f.domain = domain;
  return f;
}

/* "Nice" ticks, like d3.ticks. */
export function ticks(a, b, n = 5) {
  const span = b - a;
  if (span === 0) return [a];
  const raw = span / n;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm >= 5 ? 5 : norm >= 2 ? 2 : 1) * mag;
  const out = [];
  for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

export const fmt = {
  num: (v, d = 2) => (Math.round(v * 10 ** d) / 10 ** d).toFixed(d),
  int: (v) => String(Math.round(v)),
  pct: (v) => Math.round(v * 100) + '%',
};

/* A standard chart frame: svg, plot group with margins, and axes. */
export function frame({ width = 640, height = 360, margin = { top: 24, right: 20, bottom: 44, left: 52 }, title }) {
  const svg = el('svg', {
    viewBox: `0 0 ${width} ${height}`,
    width: '100%',
    role: 'img',
    'font-family': TOKENS.sans,
    'font-size': 13,
    fill: TOKENS.ink,
  });
  if (title) svg.append(el('title', {}, title));
  const plot = el('g', { transform: `translate(${margin.left},${margin.top})` });
  svg.append(plot);
  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;
  return { svg, plot, w, h, margin, width, height };
}

/* Recessive axes: hairline, muted labels, mono digits. */
export function xAxis(plot, x, h, { ticks: tv, label, format = fmt.num, tickFormat } = {}) {
  const g = el('g', { class: 'axis axis--x', transform: `translate(0,${h})` });
  g.append(el('line', { x1: x.range[0], x2: x.range[1], y1: 0, y2: 0, stroke: TOKENS.rule }));
  for (const t of tv || x.ticks()) {
    const px = x(t);
    g.append(el('line', { x1: px, x2: px, y1: 0, y2: 4, stroke: TOKENS.rule }));
    g.append(el('text', { x: px, y: 18, 'text-anchor': 'middle', fill: TOKENS.muted,
      'font-family': TOKENS.mono, 'font-size': 11 }, (tickFormat || format)(t)));
  }
  if (label) g.append(el('text', { x: (x.range[0] + x.range[1]) / 2, y: 36, 'text-anchor': 'middle',
    fill: TOKENS.muted, 'font-size': 12 }, label));
  plot.append(g);
  return g;
}

export function yAxis(plot, y, w, { ticks: tv, label, format = fmt.num, grid = true, tickFormat } = {}) {
  const g = el('g', { class: 'axis axis--y' });
  for (const t of tv || y.ticks()) {
    const py = y(t);
    if (grid) g.append(el('line', { x1: 0, x2: w, y1: py, y2: py, stroke: TOKENS.rule, 'stroke-dasharray': t === 0 ? null : '2 3' }));
    g.append(el('text', { x: -8, y: py + 4, 'text-anchor': 'end', fill: TOKENS.muted,
      'font-family': TOKENS.mono, 'font-size': 11 }, (tickFormat || format)(t)));
  }
  if (label) g.append(el('text', { transform: `translate(-40,${(y.range[0] + y.range[1]) / 2}) rotate(-90)`,
    'text-anchor': 'middle', fill: TOKENS.muted, 'font-size': 12 }, label));
  plot.append(g);
  return g;
}

/* Path helpers. */
export function linePath(points, x, y) {
  return points.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('');
}
export function areaPath(points, x, y) {
  /* points: [xv, lo, hi] */
  const top = points.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[2]).toFixed(1)}`).join('');
  const bottom = [...points].reverse().map((p) => `L${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join('');
  return top + bottom + 'Z';
}

/* A series line with an optional ±1 s.e. band. Dash is the secondary encoding. */
export function series(plot, { points, band: bandPts, x, y, color, dash, width = 2, name }) {
  const g = el('g', { class: 'series', 'data-name': name });
  if (bandPts) g.append(el('path', { d: areaPath(bandPts, x, y), fill: color, 'fill-opacity': 0.12, stroke: 'none' }));
  g.append(el('path', { d: linePath(points, x, y), fill: 'none', stroke: color, 'stroke-width': width,
    'stroke-dasharray': dash || null, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  plot.append(g);
  return g;
}

/* Legend as HTML above the plot: swatch (with dash) + name. Always present for ≥2 series. */
export function legend(items) {
  const ul = html('ul', { class: 'fig__legend', role: 'list' });
  for (const it of items) {
    const sw = el('svg', { viewBox: '0 0 28 10', width: 28, height: 10, 'aria-hidden': 'true' });
    sw.append(el('line', { x1: 1, x2: 27, y1: 5, y2: 5, stroke: it.color, 'stroke-width': 2.5,
      'stroke-dasharray': it.dash || null, 'stroke-linecap': 'round' }));
    const li = html('li', { class: 'fig__legend-item' }, sw, it.name);
    if (it.onToggle) {
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');
      li.setAttribute('aria-pressed', 'true');
      const toggle = () => {
        const on = li.getAttribute('aria-pressed') !== 'true';
        li.setAttribute('aria-pressed', String(on));
        it.onToggle(on);
      };
      li.addEventListener('click', toggle);
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    }
    ul.append(li);
  }
  return ul;
}

/* Tooltip: one per figure, positioned inside the container. */
export function tooltip(container) {
  const tip = html('div', { class: 'fig__tip', role: 'status', 'aria-live': 'polite', hidden: '' });
  container.append(tip);
  return {
    show(htmlContent, px, py) {
      tip.innerHTML = htmlContent;
      tip.hidden = false;
      const cw = container.clientWidth;
      const tw = tip.offsetWidth;
      const left = px + 14 + tw > cw ? px - tw - 14 : px + 14;
      tip.style.left = `${Math.max(0, left)}px`;
      tip.style.top = `${py - 10}px`;
    },
    hide() { tip.hidden = true; },
  };
}

/* Map a pointer event to plot coordinates for an svg with a viewBox. */
export function pointer(evt, svg, margin) {
  const r = svg.getBoundingClientRect();
  const vb = svg.viewBox.baseVal;
  const sx = vb.width / r.width, sy = vb.height / r.height;
  return {
    x: (evt.clientX - r.left) * sx - margin.left,
    y: (evt.clientY - r.top) * sy - margin.top,
    px: evt.clientX - r.left,
    py: evt.clientY - r.top,
  };
}

/* Nearest index in a sorted numeric array. */
export function nearest(arr, v) {
  let best = 0, bd = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const d = Math.abs(arr[i] - v);
    if (d < bd) { bd = d; best = i; }
  }
  return best;
}

/* Panel label in the paper's house style: "(a) title". */
export function panelLabel(g, text, x = 0, y = -8) {
  g.append(el('text', { x, y, 'font-weight': 600, 'font-size': 13, fill: TOKENS.ink }, text));
}

/* Data table toggle, for the accessibility pass: the figure's numbers as HTML. */
export function dataTable(container, { caption, columns, rows, summary = 'Show the data' }) {
  const details = html('details', { class: 'fig__table' });
  details.append(html('summary', {}, summary));
  const table = html('table');
  if (caption) table.append(html('caption', {}, caption));
  const thead = html('thead');
  const tr = html('tr');
  for (const c of columns) tr.append(html('th', { scope: 'col' }, c));
  thead.append(tr);
  table.append(thead);
  const tbody = html('tbody');
  for (const r of rows) {
    const trr = html('tr');
    r.forEach((v, i) => trr.append(html(i ? 'td' : 'th', i ? {} : { scope: 'row' }, String(v))));
    tbody.append(trr);
  }
  table.append(tbody);
  details.append(table);
  container.append(details);
  return details;
}
