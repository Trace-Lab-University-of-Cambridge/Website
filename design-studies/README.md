# TRACE Lab — Brand & Website Redesign (work in progress)

Exploration branch for the rebrand. **No production site files changed yet** — everything here is a standalone design study (open the `.html` files directly in a browser). Product truth and the durable design system live in `../PRODUCT.md` and `../DESIGN.md` at the repo root.

## Where we landed (as of last session)

Direction converged on **Study 03 — "Fresh / King's Chapel"**, with two tuning notes still to apply and one open decision.

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
