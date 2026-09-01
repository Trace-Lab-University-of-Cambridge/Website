# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Prospective PhD students, interns, and collaborators** deciding whether to apply to or work with the lab. They arrive from a paper, a talk, a referral, or a search, and want to quickly gauge the lab's focus, people, and credibility.
- **Academic peers and journalists** looking for the lab's research areas, publications, and contact points.
- **Funders and institutional / industry partners** assessing the lab's standing and affiliations.

Primary front door is the single-page homepage; most visitors scan rather than read deeply.

## Product Purpose

The site is the public identity of **TRACE Lab** — the **TR**ustworthy **A**rtificial intelligen**CE** Laboratory at the University of Cambridge, led by Dr. Umang Bhatt. It exists to communicate what the lab studies, who is on the team, what it has published, and how to join or partner. Success = a qualified visitor understands the lab's mission and credibility within seconds and takes a next step (read a paper, apply, or reach out).

## Positioning

TRACE studies **when and how AI can be trusted, integrated into decision-making, and evaluated in ecologically valid (real-world) settings** for high-stakes domains — healthcare, education, and public safety — by drawing across machine learning, human-computer interaction, and social science. The distinctive stance is empirical, deployment-oriented, and interdisciplinary trustworthy-AI research, anchored at Cambridge but building its own identity.

## Operating Context

- Built with **Hugo** + **Hugo Blox (Wowchemy)** vendored modules; deployed to GitHub Pages / Netlify at **trace-lab.ai**.
- Content authored in `content/_index.md` (homepage sections) and `data/publications.yaml`; team members are HTML cards with `data-*` attributes; theme colors in `data/themes/trace.toml`, fonts in `data/fonts/trace.toml`, custom styles in `assets/scss/custom.scss`.
- Homepage section order to preserve: Hero → About → Research → Team → Publications → News → Supporters → Affiliations. Additional routes: `/publications`, `/join`, and per-project pages.

## Capabilities and Constraints

- Static site; no login or app UI. Interactions are limited to navigation, external links (papers, personal sites), and filtering on the publications page.
- Team cards with a `data-website` open that site on click; cards without one are non-interactive.
- Research cards may be links (external project sites: deploymentof.ai, externalis.ai, tailorworkflow.com) or static.
- Must remain editable by non-designers via the documented markdown/YAML/HTML patterns in README.md.
- Currently forced **light mode only** (`mode: light`, and a hard light-mode override in `custom.scss`).

## Brand Commitments

- **Name & wordmark:** "TRACE" logo — geometric wordmark, deep blue `#073d74` with a small coral accent `#f67552` (`static/media/trace-logo.svg`, `trace-logo-white.svg`, `trace-icon.svg`). The wordmark is fixed and must be honored.
- **Brand posture (confirmed):** TRACE stands as its **own identity**; the University of Cambridge appears as an **endorsement/credential** (logo lockup, footer, affiliations row), not as the site's color system.
- **Color core (confirmed):** keep the logo's **deep blue + coral** as the brand core and build a full, disciplined system around them.
- **Register reference (confirmed):** the PI's personal site (umangsbhatt.github.io) — clean, content-first, academic-minimal — is the starting reference; the rebrand elevates that into a distinct lab brand with editorial discipline.
- **Voice:** scholarly, precise, credible, mission-driven; not hype-driven or salesy.
- **Institutional partners (real, on-site assets):** University of Cambridge, CHIA, King's College; AISI (UK), NHS, Responsible AI Institute, Accenture; MBZUAI, AIMS, UDLA.

## Evidence on Hand

- Real team roster with photos (PI, PhD students, MS students, interns, affiliated students, "Friends of TRACE").
- Real publications in `data/publications.yaml` and featured on the homepage (arXiv, Nature Human Behaviour, AAAI).
- Real news items, partner logos, and project microsites.
- Do **not** fabricate publications, team members, metrics, funding figures, or partner claims; only real, on-file content is used.

## Product Principles

1. **Credibility over decoration.** Every visual choice should increase trust; ornament that does not is removed (the incumbent glassmorphism/animation is the anti-reference).
2. **Scannable first, readable second.** Structure for a visitor who skims; reward the one who reads.
3. **The people and the work are the content.** Team, publications, and research are the hero — not chrome.
4. **Editable by the lab.** Preserve the documented content-authoring patterns; the brand system must survive non-designer edits.
5. **Cambridge-anchored, self-standing.** Wear the affiliation as credential; lead with TRACE's own identity.

## Accessibility & Inclusion

- Maintain WCAG AA contrast (body text ≥ 4.5:1). The coral accent is decorative/fill by default and is darkened when used as text on light backgrounds.
- Keyboard-navigable links and visible focus states; images carry alt text (team, logos).
