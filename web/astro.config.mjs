import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import { WHITEPAPER_PUBLIC } from './src/papers/hybrid-workforces/config.mjs';

// Static output → same GitHub Pages deploy story as Hugo today.
// The yaml() plugin lets components `import data from '../data/*.yaml'`.
export default defineConfig({
  site: 'https://trace-lab.ai',
  integrations: [
    react(),
    sitemap({
      // A noindex error page has nothing to say to a crawler.
      // The whitepaper stays out while it is password-protected (noindex too).
      filter: (page) => !page.includes('/404') &&
        (WHITEPAPER_PUBLIC || !page.includes('/hybrid-workforces')),
      // Build time, i.e. last published rather than last edited. Coarse, but
      // a crawler treats a missing lastmod as "no idea" and recrawls on its
      // own schedule.
      lastmod: new Date(),
      changefreq: 'monthly',
      serialize(item) {
        // Priorities are a hint about relative importance within the site,
        // not a ranking lever. These exist so 5 URLs do not all claim to
        // matter equally: the homepage moves whenever news or the roster
        // does, publications whenever a paper lands, the rest rarely.
        if (item.url === 'https://trace-lab.ai/') {
          return { ...item, changefreq: 'weekly', priority: 1.0 };
        }
        if (item.url.includes('/publications')) {
          return { ...item, changefreq: 'weekly', priority: 0.9 };
        }
        return { ...item, priority: 0.6 };
      },
    }),
  ],
  vite: {
    plugins: [yaml()],
  },
});
