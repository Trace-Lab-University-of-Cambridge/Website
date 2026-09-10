# TRACE Lab Website

Website for the **TRustworthy Artificial IntelligenCE Laboratory** at the University of Cambridge.

**Live site:** https://trace-lab.ai

## Quick Start

### Prerequisites
- [Hugo Extended](https://gohugo.io/installation/) (v0.140.0 or later)
- Go 1.19+ (for Hugo modules)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Trace-Lab-University-of-Cambridge/Website.git
cd Website

# Run locally (override baseURL for local preview)
hugo server --baseURL="http://localhost:1313/"

# Site will be available at http://localhost:1313/
```

### Build for Production

```bash
hugo --minify
# Output is in public/ directory
```

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### How it works:
1. Push changes to `main` branch
2. GitHub Actions runs `.github/workflows/publish.yaml`
3. **Astro** builds `web/` into `web/dist`
4. `web/dist` is deployed to GitHub Pages

> **The live site is the Astro app in `web/`.** The Hugo tree at the repo root
> (`config/`, `content/`, `layouts/`, `_vendor/`) is the previous generation of
> the site and is no longer built or deployed — editing it changes nothing that
> visitors see. Most of the Hugo instructions further down this file are kept
> for reference only. `netlify.toml` is likewise a leftover; nothing in CI
> reads it.

### DNS Configuration

For the custom domain `trace-lab.ai`:

1. **GitHub Pages Settings** (repo → Settings → Pages):
   - Custom domain: `trace-lab.ai`
   - Enable "Enforce HTTPS"

2. **DNS Records** (at your DNS provider):
   ```
   Type: A
   Name: @
   Values:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153

   Type: CNAME
   Name: www
   Value: trace-lab-university-of-cambridge.github.io
   ```

### Manual deployment:
If needed, trigger a manual deployment from the [Actions tab](https://github.com/Trace-Lab-University-of-Cambridge/Website/actions).

### Important: Module Vendoring

This site uses Hugo Blox (formerly Wowchemy) modules. The modules are **vendored** in the `_vendor/` directory to ensure reliable builds.

**If you update Hugo Blox modules:**
```bash
# Update modules
hugo mod get -u

# Re-vendor modules
hugo mod vendor

# Copy blox-core partials (required for CI builds)
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-core/layouts/_partials/* layouts/partials/
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-core/layouts/_partials/* layouts/_partials/

# Copy blox-seo partials (required for CI builds)
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-seo/layouts/_partials/* layouts/partials/
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-seo/layouts/_partials/* layouts/_partials/

# Test locally
hugo server --baseURL="http://localhost:1313/"

# Commit all changes including _vendor/ and layouts/
git add -A
git commit -m "Update Hugo modules"
git push
```

## Analytics & SEO

Both live in the Astro app. Nothing in `config/_default/params.yaml` is wired
up any more — that file's analytics block is deliberately blank, with a note
saying so.

### Where things are

| File | What it does |
|---|---|
| `web/src/lib/site.ts` | Site title, description, share image, **tracking IDs**. Change IDs here. |
| `web/src/components/Seo.astro` | Every `<head>` tag a crawler or link preview reads, plus schema.org JSON-LD. |
| `web/src/components/Analytics.astro` | GA4 tag, Consent Mode defaults, outbound-link events. |
| `web/src/components/ConsentBanner.astro` | The cookie notice. |
| `web/public/media/og-card.jpg` | 1200×630 social share card. |

### Google Analytics

GA4 property `G-PS5YFSJ4W6`, loaded on every page in production only — `astro
dev` sends nothing, so local work does not pollute the numbers.

Override the ID without editing source by setting `PUBLIC_GA_ID`
(the `PUBLIC_` prefix is what makes Astro expose it to the browser):

```bash
PUBLIC_GA_ID=G-XXXXXXXXXX npm run build
```

**Consent.** The tag loads with `analytics_storage: 'denied'`, which does not
mean no data: GA4 falls back to cookieless pings, so visits, pages and
referrers still arrive. What is missing until someone accepts is the
returning-visitor join across sessions. Accepting stores `trace:consent` in
`localStorage` and upgrades the measurement; declining stores the refusal so
the notice does not come back.

**Custom events**, on top of GA4's built-in `page_view` and enhanced
measurement:

| Event | Fires on | Useful parameters |
|---|---|---|
| `outbound_click` | any link to another domain | `link_domain`, `link_url`, `link_text`, `link_context` |
| `contact_click` | `mailto:` and `tel:` links | `method`, `link_context`, `link_text` |

`link_context` says which part of the page the click came from —
`publication`, `person`, `partner`, `research`, `spinout`, `news`,
`join-route`, `nav`, `footer`, `cta`. That is what makes "which papers do
people actually open" answerable rather than a list of bare DOI URLs. The
mapping is `CLICK_CONTEXTS` in `web/src/lib/site.ts`; add a row when you add a
section.

To see these in GA4 you must register them once: **Admin → Custom
definitions → Create custom dimension**, scope Event, for each parameter you
want to break reports down by. Until you do, the events are counted but the
parameters are not queryable.

### Google Search Console

Not set up yet, and worth doing: it is the only source of the search queries
people arrive on, which GA4 does not show. Verify by DNS at your registrar
(nothing to change here), or by HTML tag:

```bash
PUBLIC_GOOGLE_SITE_VERIFICATION=<token> npm run build
```

Then submit `https://trace-lab.ai/sitemap-index.xml`.

### SEO

- Canonical URL, Open Graph and Twitter card tags on every page, from
  `Seo.astro`. Pages pass `title` / `description` and inherit the rest.
- `schema.org` graph: `ResearchOrganization` + `WebSite` on all pages, plus an
  `ItemList` of `ScholarlyArticle` on `/publications/`.
- `sitemap-index.xml` generated at build with per-page priorities
  (`astro.config.mjs`); `/404` is excluded.
- `noindex` is available per page: `<Base noindex={true}>`. Used by `404.astro`.

### Adding analytics to a new page

Nothing to do. Pass better metadata if the defaults are wrong for it:

```astro
<Base
  title="Thing · TRACE Lab"
  description="One sentence, ~155 characters, written for a human reading search results."
>
```

### Checking it works

```bash
cd web && npm run build && npm run preview
```

Then in the browser's Network tab, filter for `collect` — a GA4 pageview is a
request to `google-analytics.com/g/collect` carrying `tid=G-...`. GA4's
Realtime report should show the visit within about half a minute.

## Project Structure

```
content/
├── _index.md              # Homepage (hero, about, research, team, publications, news)
├── project/               # Individual project pages
├── join/                  # How to join the lab
├── post/                  # News/blog posts
├── publications/          # Publications
└── authors/               # Team member profiles (for publication attribution)

config/_default/
├── hugo.yaml              # Site settings (title, baseURL)
├── params.yaml            # Theme & SEO settings
├── menus.yaml             # Navigation menu
└── module.yaml            # Hugo module imports

layouts/
├── section/
│   └── publications.html  # Custom publications page layout
├── partials/              # Custom partials (blox-core, blox-seo)
└── _partials/             # Module partials

assets/
├── scss/
│   └── custom.scss        # Custom styles (team cards, research cards, etc.)
└── media/
    ├── hero-bg.jpg        # Homepage hero background
    ├── icon.png           # Site icon
    └── team/              # Team member photos

static/media/team/         # Team photos (400x400px recommended)

_vendor/                   # Vendored Hugo modules (DO NOT EDIT)
```

## Adding Content

### Team Members

Team members are defined directly in `content/_index.md` using HTML with data attributes:

```html
<div class="team-card"
     data-name="Full Name"
     data-role="Role Title"
     data-org="University of Cambridge"
     data-bio="Bio text here..."
     data-interests="Interest 1,Interest 2,Interest 3"
     data-email="email@cam.ac.uk"
     data-website="https://personal-website.com"
     data-scholar="https://scholar.google.com/..."
     data-github="https://github.com/username">
  <img class="team-avatar" src="media/team/firstname-lastname.jpg" alt="Full Name">
  <h3 class="team-name">Full Name</h3>
  <p class="team-role">Role Title</p>
  <p class="team-org">Cambridge</p>
</div>
```

**Behavior:**
- Members **with** `data-website`: clicking opens their website in a new tab
- Members **without** `data-website`: clicking does nothing

**Photos:** Add to `static/media/team/` (square, 400x400px recommended, faces centered)

### New Publication

Publications are stored in `data/publications.yaml`. To add a new publication, add an entry:

```yaml
- title: "Paper Title"
  authors: "Author1, A., Author2, B., Author3, C."
  year: 2024
  venue: "Short Venue"
  venue_full: "Full Venue Name"
  url: "https://link-to-paper.com"  # Link to Google Scholar, journal, or arXiv
  tags:
    - Machine Learning
    - Trustworthy AI
```

Publications are displayed grouped by year with category filtering on `/publications/`. Clicking a publication opens the external link directly.

### Research Areas

Research cards are defined in `content/_index.md`. Cards can be:
- **Links** (`<a>` tag): Opens external website
- **Static** (`<div>` tag): Hover effect only, no action on click

```html
<!-- Linked research card -->
<a href="https://example.com" target="_blank" class="research-card">
  <div class="card-icon">○</div>
  <h3>Research Area</h3>
  <p>Description text.</p>
</a>

<!-- Static research card -->
<div class="research-card">
  <div class="card-icon">□</div>
  <h3>Research Area</h3>
  <p>Description text.</p>
</div>
```

### New Blog Post

```bash
mkdir content/post/post-name
# Create index.md with:
```
```yaml
---
title: Post Title
date: 2024-01-01
authors:
  - admin
---
Post content here.
```

## Customization

### Colors
Edit `data/themes/trace.toml` to change the color scheme. The brand system's
authoritative tokens (blue `#034285`, coral `#F67552`, neutrals, tints) live in
the `:root` block at the top of `assets/scss/custom.scss`; keep the two in sync.
The durable design system is documented in `DESIGN.md`.

### Fonts
Edit `data/fonts/trace.toml`. The site uses **Familjen Grotesk** (headings/body/UI)
and **Spline Sans Mono** (data/labels — years, venues, eyebrows).

### Navigation
Edit `config/_default/menus.yaml` to change the navigation menu.

### Styles
Edit `assets/scss/custom.scss` for custom CSS (hero, blue plates, cards, etc.).

### Interactions (JavaScript)
Custom interactions live in `assets/js/custom.js` and are loaded via
`layouts/partials/custom_js.html` (the theme's supported hook — note the theme
does **not** load `extend_footer.html`). Includes scroll reveals, the cursor
spotlight + card tilt on the blue plates, and the team hover panel. All effects
respect `prefers-reduced-motion`.

### Homepage
Edit `content/_index.md` to modify the homepage sections.

## Troubleshooting

### Build fails with "partial not found"
The Hugo Blox partials may need to be re-copied:
```bash
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-core/layouts/_partials/* layouts/partials/
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-core/layouts/_partials/* layouts/_partials/
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-seo/layouts/_partials/* layouts/partials/
cp -r _vendor/github.com/HugoBlox/hugo-blox-builder/modules/blox-seo/layouts/_partials/* layouts/_partials/
```

### Local preview shows wrong paths
Use the `--baseURL` flag:
```bash
hugo server --baseURL="http://localhost:1313/"
```

### Module download errors
The modules are vendored, so you shouldn't need to download them. If issues persist:
```bash
hugo mod clean
hugo mod vendor
```

## License

Content is copyright TRACE Lab, University of Cambridge.
