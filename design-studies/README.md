# TRACE Lab — Brand & Website Redesign

> **STATUS: SHIPPED.** The redesign is live on `main` / trace-lab.ai. This folder is the historical record of how we got there — standalone design studies (open the `.html` files in a browser). The production system is documented in `../DESIGN.md`; product truth in `../PRODUCT.md`. These study files are not used by the built site and can be deleted if a lean repo is preferred.

## What shipped (final direction)

Converged on **Study 03 — "Fresh / King's Chapel"**, then evolved during build:
- **King's College Chapel** hero rendered as a **static white line drawing on deep blue** (`static/media/kings-chapel.jpg`), copy on the left. (An animated self-drawing SVG variant was built and set aside — see history.)
- **Deep-blue color-blocking**: Research & Publications are full-bleed blue "plates" alternating with paper, with translucent cards.
- **Interactions**: scroll reveals, cursor spotlight + card tilt on the plates, team hover (full-colour photos + interests/links). A logo marquee and a scroll-progress line were tried and removed.
- **Colour**: brand blue `#034285` (matches the chapel image), coral `#F67552` as the single accent, white ground.
- **Type**: Familjen Grotesk everywhere + Spline Sans Mono for data.

### Original exploration notes (for the record)

**Confirmed by the client:**
- TRACE keeps its **own identity**; Cambridge = endorsement (footer, affiliations, lockup), not the color system.
- Reference the client liked: **secondhandai.org** — fresh, confident, color-blocked, grotesque type, diagrammatic. NOT the generic serif-on-white academic look (the first brand board, Study 01, was rejected as too AI-generated).
- The PI's page (umangsbhatt.github.io) is a touchstone: warm, page-like, teal `#0D4A4C` accent, Familjen Grotesk + Spline Sans Mono.
- Client wants an **animated King's College Chapel hero, rendered as a blue relief** (generated — see `assets/`). Open to moving off King's later.
- Tone: **calmer / more institution than startup** — deepen the blue toward brand navy, mute the pastels. (Applied in Study 03.)

**Type (current):** Familjen Grotesk (display + body) + Spline Sans Mono (labels/data). No serif. No decorative monospace beyond real labels/numbers.

**Color (current, Study 03):** deep blue hero `#0A4680` (toward logo navy `#073D74`), coral `#F67552` as the single accent, greyed institutional tints for tiles, white ground.

## The studies

| File | What it is | Status |
|---|---|---|
| `01-brand-board.html` | First brand board — Source Serif + Inter + JetBrains Mono, blue/coral | ❌ Rejected: too generic / AI-looking |
| `02-offprint.html` | "Working paper" — warm paper, teal, Literata, offprint layout | ⚠️ Superseded: right instinct, still too familiar |
| `02b-trace-line-typespecimen.html` | "Trace line" concept + Literata vs STIX Two Text side by side | ⚠️ Superseded |
| `03-fresh-kings-chapel.html` | **Current direction** — fresh/institutional, King's Chapel blue-relief animated hero | ✅ Chosen, tuning in progress |

## Assets (generated, gpt-image-2, billed to client's OpenAI key)

- `assets/kings-relief-exterior.{jpg,png}` — **used** as the hero relief in Study 03 (chapel on the right, navy negative space on the left for the headline).
- `assets/kings-relief-vault.{jpg,png}` — fan-vault ceiling relief; held in reserve for a secondary section.

## Next steps (pick up here)

1. **Finish tuning Study 03** — the "calmer" pass is applied; review the animated hero (ken-burns drift + light sheen over the relief) at desktop + mobile and confirm the blue depth / motion feel.
2. Decide: keep **King's Chapel** or swap the hero subject (client said "happy to move").
3. Once the direction is locked: write the shape **brief**, finalize `DESIGN.md` (it currently still reflects the earlier blue+serif system and needs rewriting to the fresh grotesque direction), then **apply to the live Hugo site** — `data/themes/trace.toml`, `data/fonts/trace.toml`, and refactor `assets/scss/custom.scss` (strip glassmorphism / gradients / symbol scatter).

> Note: `../DESIGN.md` and `../PRODUCT.md` were written early in the exploration. PRODUCT.md is still accurate; **DESIGN.md is stale** (documents the rejected serif/blue system) and must be rewritten to match Study 03 before implementation.
