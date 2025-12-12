# TRACE Lab Website

Website for the **TRustworthy Artificial IntelligenCE Laboratory** at the University of Cambridge.

**Live site:** https://trace-lab-university-of-cambridge.github.io/Website/

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

### Manual deployment:
If needed, trigger a manual deployment from the [Actions tab](https://github.com/Trace-Lab-University-of-Cambridge/Website/actions).

### Important: Module Vendoring

This site uses Hugo Blox (formerly Wowchemy) modules. The modules are **vendored** in the `_vendor/` directory to ensure reliable builds. Additionally, some partials are copied to `layouts/partials/` and `layouts/_partials/` for compatibility.

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
├── _index.md              # Homepage
├── research/              # Research overview
├── project/               # Individual project pages
│   ├── deployment-as-a-science/
│   ├── externalities-human-ai/
│   ├── affordances-ai-use/
│   ├── agent-orchestration/
│   └── fundamentals-trustworthy-ai/
├── software/              # Software tools
├── people/                # Team listing
├── join/                  # How to join
├── contact/               # Contact info
├── post/                  # News/blog
├── publication/           # Publications
└── authors/               # Team member profiles

config/_default/
├── hugo.yaml              # Site settings (title, baseURL)
├── params.yaml            # Theme & SEO settings
├── menus.yaml             # Navigation menu
└── module.yaml            # Hugo module imports

data/themes/
└── trace.toml             # Custom color theme

layouts/
├── partials/              # Custom partials (blox-core, blox-seo)
└── _partials/             # Module partials

_vendor/                   # Vendored Hugo modules (DO NOT EDIT)

assets/media/
├── hero-bg.jpg            # Homepage hero background
└── icon.png               # Site icon
```

## Adding Content

### New Team Member
```bash
mkdir content/authors/firstname-lastname
# Create _index.md with:
```
```yaml
---
title: Full Name
role: Role Title
user_groups:
  - PhD Students  # or: Principal Investigator, Research Staff, Visitors, Affiliates
social:
  - icon: envelope
    icon_pack: fas
    link: mailto:email@cam.ac.uk
  - icon: github
    icon_pack: fab
    link: https://github.com/username
---
Bio text here.
```
```bash
# Add avatar.jpg (square photo, 400x400px recommended)
```

### New Publication
```bash
mkdir content/publication/paper-short-name
# Create index.md with:
```
```yaml
---
title: "Paper Title"
authors:
  - admin  # or author slug
  - External Author Name
date: "2024-01-01"
publication_types: ['article-journal']  # or 'paper-conference'
publication: "Journal Name"
publication_short: "Short Name"
abstract: "Abstract text"
featured: true
url_pdf: "https://link-to-pdf.com"
---
```

### New Project/Research Initiative
```bash
mkdir content/project/project-name
# Create index.md with:
```
```yaml
---
title: Project Title
summary: Brief description
tags:
  - Research
date: "2024-01-01"
---
Full description here.
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

## Content Population Guide

See `CONTENT_TO_POPULATE.md` for a detailed checklist of content that needs to be added (team photos, bios, publications, etc.).

## Customization

### Colors
Edit `data/themes/trace.toml` to change the color scheme.

### Navigation
Edit `config/_default/menus.yaml` to change the navigation menu.

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
