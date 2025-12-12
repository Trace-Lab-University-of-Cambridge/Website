# TRACE Lab Website

Website for the TRustworthy Artificial IntelligenCE Laboratory at the University of Cambridge.

## Development

```bash
# Install Hugo (macOS)
brew install hugo

# Run locally
hugo server -D

# Build for production
hugo
```

## Structure

```
content/
├── _index.md          # Homepage
├── research/          # Research overview
├── project/           # Individual project pages
├── software/          # Software tools
├── people/            # Team listing
├── join/              # How to join
├── contact/           # Contact info
├── post/              # News/blog
└── authors/           # Team member profiles

config/_default/
├── hugo.yaml          # Site settings
├── params.yaml        # Theme & SEO
└── menus.yaml         # Navigation

data/themes/
└── trace.toml         # Custom color theme
```

## Adding Content

**New team member:**
```bash
mkdir content/authors/firstname-lastname
# Create _index.md with profile info
```

**New project:**
```bash
mkdir content/project/project-name
# Create index.md with project details
```

**New publication:**
```bash
mkdir content/publication/paper-name
# Create index.md with paper metadata
```

## Deployment

Build static files:
```bash
hugo
```

Output is in `public/` directory.
