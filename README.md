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
3. Hugo builds the site
4. Site is deployed to GitHub Pages

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
Edit `data/themes/trace.toml` to change the color scheme.

### Navigation
Edit `config/_default/menus.yaml` to change the navigation menu.

### Styles
Edit `assets/scss/custom.scss` for custom CSS (cards, animations, etc.).

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
