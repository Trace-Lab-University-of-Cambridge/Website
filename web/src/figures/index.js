/* ==========================================================================
   Whitepaper figures: upgrade each static figure to a native one.
   --------------------------------------------------------------------------
   post.py emits <div class="fig" data-fig="NAME"><img …></div> for every
   figure. A renderer registered here replaces the <img> with a live SVG
   built from the figure's data; where there is none, or it fails, the static
   image is loaded instead, and a <noscript> copy covers no JavaScript.
   ========================================================================== */
import './figures.css';

const renderers = {
  onet_recovery_curves: () => import('./charts/onet_recovery_curves.js'),
  onet_orchestration: () => import('./charts/onet_orchestration.js'),
  controls_floor: () => import('./charts/controls_floor.js'),
  ssg_credit_profiles: () => import('./charts/ssg_credit_profiles.js'),
  onet_transfer: () => import('./charts/onet_transfer.js'),
};

/* Inlined diagrams keep their SVG; an enhancer adds motion and controls on
   top of it, leaving the paper's static drawing as the resting state. */
const enhancers = {
  hapi_direction: () => import('./diagrams/hapi_direction.motion.js'),
  hapi_framework: () => import('./diagrams/hapi_framework.motion.js'),
};

async function enhance(container) {
  const name = container.dataset.fig;
  const load = enhancers[name];
  if (!load) return;
  try {
    const mod = await load();
    await mod.enhance(container, container.querySelector('svg.diagram'));
    container.classList.add('fig--animated');
  } catch (err) {
    console.warn(`figure ${name}: no motion, keeping the static diagram`, err);
  }
}

/* The paper's figure is shipped as <img data-src> (plus a <noscript> copy),
   so it is only downloaded when the live figure cannot be built. */
function fallback(container) {
  const img = container.querySelector('img[data-src]');
  if (img) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
}

async function upgrade(container) {
  if (container.classList.contains('fig--diagram')) return enhance(container);
  const name = container.dataset.fig;
  const load = renderers[name];
  if (!load) return fallback(container);
  const live = document.createElement('div');
  live.className = 'fig__live';
  try {
    const mod = await load();
    // Attached before rendering, so the chart measures its real column
    // width once instead of building detached and then again in place.
    container.prepend(live);
    await mod.render(live);
    container.querySelector('img')?.remove();
    container.classList.add('fig--live');
  } catch (err) {
    live.remove();
    fallback(container);
    console.warn(`figure ${name}: keeping the static image`, err);
  }
}

const figs = document.querySelectorAll('.fig[data-fig]');
if ('IntersectionObserver' in window) {
  // Build each figure shortly before it scrolls into view.
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { io.unobserve(e.target); upgrade(e.target); }
    }
  }, { rootMargin: '600px 0px' });
  figs.forEach((f) => io.observe(f));
} else {
  figs.forEach(upgrade);
}
