// ============================================================
// TRACE Lab — interactions
// 1) scroll-reveal choreography  2) cursor spotlight + card tilt
// 3) team hover detail  4) trace-line progress + logo marquee
// All progressive, all bail out under reduced-motion.
// ============================================================

(function () {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ready = (fn) =>
    document.readyState !== 'loading'
      ? fn()
      : document.addEventListener('DOMContentLoaded', fn);

  ready(function () {

    // ---- 1. Scroll-reveal choreography -----------------------------------
    (function scrollReveal() {
      if (reduced || !('IntersectionObserver' in window)) return;
      const groups = [
        ['.section-heading', 0],
        ['.about-section', 0],
        ['.research-card', 70],
        ['.pub-card', 70],
        ['.team-card', 45],
        ['.affiliated-card', 35],
        ['.news-item', 90],
      ];
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

      groups.forEach(([sel, step]) => {
        // stagger within each parent container so rows cascade, not the whole page
        const byParent = new Map();
        document.querySelectorAll(sel).forEach((el) => {
          const p = el.parentElement;
          const idx = byParent.get(p) || 0; byParent.set(p, idx + 1);
          el.classList.add('reveal');
          el.style.transitionDelay = (idx * step) + 'ms';
          io.observe(el);
        });
      });
    })();

    // ---- 2. Cursor spotlight + card tilt on the blue plates ---------------
    (function plateInteractions() {
      if (reduced) return;
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (!fine) return;

      document.querySelectorAll(
        '.home-section:has(.research-grid-five), .home-section:has(.pub-grid-five)'
      ).forEach((plate) => {
        let raf = 0, mx = 50, my = 0;
        plate.addEventListener('mouseenter', () => plate.classList.add('lit'));
        plate.addEventListener('mouseleave', () => plate.classList.remove('lit'));
        plate.addEventListener('mousemove', (e) => {
          const r = plate.getBoundingClientRect();
          mx = ((e.clientX - r.left) / r.width) * 100;
          my = ((e.clientY - r.top) / r.height) * 100;
          if (!raf) raf = requestAnimationFrame(() => {
            plate.style.setProperty('--mx', mx + '%');
            plate.style.setProperty('--my', my + '%');
            raf = 0;
          });
        });
      });

      document.querySelectorAll(
        '.home-section:has(.research-grid-five) .research-card, .home-section:has(.pub-grid-five) .pub-card'
      ).forEach((card) => {
        let raf = 0;
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          if (!raf) raf = requestAnimationFrame(() => {
            card.style.transform =
              `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
            raf = 0;
          });
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
    })();

    // ---- 3. Team comes alive: build hover detail from data-* -------------
    (function teamHover() {
      document.querySelectorAll('.team-card').forEach((card) => {
        if (card.querySelector('.team-hover')) return;
        const d = card.dataset;
        const name = d.name || card.querySelector('.team-name')?.textContent || '';
        const interests = (d.interests || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 3);
        const links = [];
        if (d.website) links.push(['Site', d.website]);
        if (d.scholar) links.push(['Scholar', d.scholar]);
        if (d.github) links.push(['GitHub', d.github]);
        if (d.email && links.length < 2) links.push(['Email', 'mailto:' + d.email]);

        const el = document.createElement('div');
        el.className = 'team-hover';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML =
          `<div class="th-name">${name}</div>` +
          (interests.length ? `<div class="th-tags">${interests.map((i) => `<span>${i}</span>`).join('')}</div>` : '') +
          (links.length ? `<div class="th-links">${links.map(([t, h]) =>
            `<a href="${h}"${h.startsWith('mailto') ? '' : ' target="_blank" rel="noopener"'}>${t} ↗</a>`).join('')}</div>` : '');
        // let link clicks work without triggering the card's open-website handler
        el.querySelectorAll('a').forEach((a) => a.addEventListener('click', (ev) => ev.stopPropagation()));
        card.appendChild(el);
      });
    })();

    // ---- 4. Partner logo marquee -----------------------------------------
    (function logoMarquee() {
      if (reduced) return;
      document.querySelectorAll('.affiliations-row.supporters-row').forEach((row) => {
        const items = Array.from(row.children);
        if (items.length < 2) return;

        const track = document.createElement('div');
        track.className = 'marquee-track';
        // measure one set width vs container to decide repeats for a full, seamless loop
        const setWidth = items.reduce((w, el) => w + el.getBoundingClientRect().width + 56, 0); // + gap
        const need = Math.max(2, Math.ceil((row.getBoundingClientRect().width * 1.4) / setWidth));
        for (let k = 0; k < need; k++) items.forEach((el) => track.appendChild(el.cloneNode(true)));
        const half = track.cloneNode(true);           // duplicate the whole track -> translateX(-50%) is seamless
        Array.from(half.children).forEach((c) => track.appendChild(c));

        row.innerHTML = '';
        row.appendChild(track);
        row.classList.add('is-marquee');
      });
    })();

    // ---- smooth in-page anchor scrolling (kept) --------------------------
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const t = document.querySelector(href);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
      });
    });
  });
})();
