import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// Static output → same GitHub Pages deploy story as Hugo today.
// The yaml() plugin lets components `import data from '../data/*.yaml'`.
export default defineConfig({
  site: 'https://trace-lab.ai',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [yaml()],
  },
});
