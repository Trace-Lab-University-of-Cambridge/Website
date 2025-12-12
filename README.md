# TRACE Lab Website

Website for the **TRustworthy Artificial IntelligenCE Laboratory** at the University of Cambridge.

## Development

```bash
# Install Hugo (macOS)
brew install hugo

# Run locally
hugo server -D

# Build for production
hugo
```

Output is in `public/` directory.

## Structure

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
├── hugo.yaml              # Site settings
├── params.yaml            # Theme & SEO
└── menus.yaml             # Navigation

data/themes/
└── trace.toml             # Custom color theme

assets/media/
├── hero-bg.jpg            # Homepage hero background
└── icon.png               # Site icon
```

## Pending Tasks

### Team Member Photos
Add avatar images for each team member in their respective folders:

```
content/authors/
├── admin/avatar.jpg                 # Umang Bhatt
├── drew-calcagno/avatar.jpg
├── bernardo-villegas/avatar.jpg
├── elaf-almahmoud/avatar.jpg
├── noah-broestl/avatar.jpg
├── katherine-collins/avatar.jpg
├── siobhan-hall/avatar.jpg
├── yung-hsuan-wu/avatar.jpg
├── rigel-cierniak/avatar.jpg
├── rose-guingrich/avatar.jpg
├── hamza-alshamy/avatar.jpg
├── mihir-upadhyay/avatar.jpg
├── mohamed-hendy/avatar.jpg
├── dvija-mehta/avatar.jpg
└── francesco-quinzan/avatar.jpg
```

### Affiliations & Partners
Update the Affiliations section on homepage (`content/_index.md`) with:
- Partner organization logos
- Additional affiliations

Current logos:
- University of Cambridge
- CHIA (Centre for Human-Inspired AI)
- King's College Cambridge

### Publications
Add publications in `content/publication/` with BibTeX import:
```bash
# Use academic CLI to import from BibTeX
academic import --bibtex publications.bib
```

### Software Page
Update `content/software/index.md` with actual lab tools:
- Fabric
- Modiste
- Other open-source projects

### Contact Information
Update `content/contact/index.md` with:
- Correct email addresses
- Social media links
- Office location details

## Adding Content

**New team member:**
```bash
mkdir content/authors/firstname-lastname
# Add _index.md and avatar.jpg
```

**New project:**
```bash
mkdir content/project/project-name
# Add index.md
```

**New publication:**
```bash
mkdir content/publication/paper-name
# Add index.md with paper metadata
```

**New blog post:**
```bash
mkdir content/post/post-name
# Add index.md
```

## Deployment

Build and deploy to GitHub Pages:
```bash
hugo
# Push public/ to gh-pages branch
```
