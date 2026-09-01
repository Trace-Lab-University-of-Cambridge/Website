# Design

<!-- impeccable:design-schema 1 -->

The durable visual system for the TRACE Lab website. Product truth lives in [PRODUCT.md](PRODUCT.md). This file owns colors, type, spacing, and component rules. Tokens here are the source of truth; mirror them into `data/themes/trace.toml`, `data/fonts/trace.toml`, and the SCSS `:root` in `assets/scss/custom.scss`.

## Direction contract

**THESIS.** A Cambridge trustworthy-AI lab presented like a scholarly publication, not a startup landing page: confident type, hairline structure, and disciplined color. It refuses the incumbent glassmorphism, animated gradients, shimmer text, and scattered ○□◇△ ornaments — decoration that signals nothing.

**OWN-WORLD.** Cool near-white and blue-grey paper; deep TRACE blue `#073d74` as the brand field and ink; coral `#f67552` as a single restrained signal (the "trace" mark, active states, key figures — never a rainbow of tag colors). A **serif display** (Source Serif 4) carries scholarship; **Inter** carries clarity; **JetBrains Mono** carries data (years, tags, counts). Structure is drawn with 1px hairline rules and generous whitespace, not boxes and shadows.

**STORY.** A visitor understands in seconds: *a serious Cambridge lab studying when AI can be trusted in the real world* — then scans research, people, and publications, and reaches out or applies.

**FORM.** Editorial-academic: content-first, sans-driven body with serif display moments, continuous with the PI's personal page but elevated to a lab brand.

## Color

Light-first (the site runs light-only today; see Dark below). All tokens as CSS custom properties.

### Neutrals — the workhorses (ink on paper)

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | Base background |
| `--surface` | `#F5F7FA` | Alternating sections, cards (cool blue-grey) |
| `--surface-2` | `#EDF1F5` | Deeper wells, hover on surface |
| `--hairline` | `#E1E7EC` | 1px rules and borders (default structure) |
| `--hairline-strong` | `#CDD6DE` | Emphasized dividers |
| `--ink` | `#0C1B2A` | Headings / primary text (blue-black, not pure black) |
| `--ink-body` | `#253340` | Body text |
| `--muted` | `#5A6B7A` | Secondary text (≥4.5:1 on paper) |
| `--faint` | `#8493A1` | Meta labels only, never body copy |

### Brand blue

| Token | Hex | Role |
|---|---|---|
| `--blue` | `#073D74` | **Brand.** Primary buttons, deep fields, logo blue |
| `--blue-strong` | `#062E57` | Hover / pressed on brand |
| `--link` | `#0A4F91` | Text links (≥7:1 on paper) |
| `--blue-100` | `#E7EEF6` | Tint chips, quiet fills |
| `--blue-50` | `#F3F7FB` | Faintest blue wash |
| `--field` | `#062A50` | Full deep-blue blocks (footer, hero overlay); text is white |

### Coral — single signal, ≤ ~5% of any surface

| Token | Hex | Role |
|---|---|---|
| `--coral` | `#F67552` | The accent mark: logo tick, active nav indicator, short accent rules, key figures, link-hover underline |
| `--coral-ink` | `#C0442A` | Coral **as text** on light (≥4.5:1) — use only when coral must carry words |
| `--coral-100` | `#FCE9E1` | Coral tint fill |

**Color strategy: Restrained** — neutral paper + brand blue doing the structural work + coral as one signal. This suits a Read/Persuade academic surface. The old per-category tag rainbow (blue/amber/green/violet/pink/cyan/orange/gray) is retired; research/topic tags use ink-on-`--blue-100` or a neutral chip, with coral reserved for the single active/highlighted item.

### Dark (deferred)

Site is light-only for now. A dark scheme is defined for future use: `--paper #0B1420`, `--surface #101B2A`, `--ink #EAF0F6`, blue lifts to `#5AA0E6`, coral stays `#F67552`. Do not enable without removing the light-only override in `custom.scss`.

## Typography

Google Fonts. Update `data/fonts/trace.toml` `google_fonts` to:
`family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500`

| Role | Family | Notes |
|---|---|---|
| Display / headings | **Source Serif 4** | Scholarly, warm, authoritative. Hero headline, section titles, pull quotes. Weight 400–600, tracking -0.02em on large sizes. |
| Body / UI / nav | **Inter** | Clean workhorse; matches the PI page's modern sans. Body 400, UI 500, emphasis 600. |
| Data / meta | **JetBrains Mono** | Publication years, tags, counts, small indices — real data only, never decorative "tech" labels. 0.75rem, tracked +0.02em, often uppercase. |

Type scale (fluid where noted):
- `--fs-display`: `clamp(2.5rem, 5vw, 4rem)` — serif, line-height 1.05
- `--fs-h1`: `2rem` serif · `--fs-h2`: `1.5rem` serif · `--fs-h3`: `1.125rem` (serif or Inter 600)
- `--fs-body`: `1.0625rem` / line-height 1.65 · body measure 62–72ch
- `--fs-small`: `0.875rem` · `--fs-meta`: `0.75rem` mono
- Tracking floor `-0.03em` on display; body normal.

## Space, radius, elevation

- Spacing scale (px): `4 8 12 16 24 32 48 64 96 128`. Section vertical rhythm ≥ `64px` desktop; more space above a heading than below.
- Radius: `--radius 8px`, `--radius-sm 4px`. No 16px "glass" cards, no full-pill unless a genuine tag/button pill.
- Elevation: border-first. `--shadow-sm 0 1px 2px rgba(12,27,42,.06)`; `--shadow-md 0 8px 24px -10px rgba(12,27,42,.20)` on hover only. No zero-offset colored glows.
- Content width: `--maxw 1100px`; prose column `--maxw-prose 680px`.

## Component rules

- **Structure with rules, not boxes.** Prefer 1px `--hairline` dividers and whitespace over bordered/shadowed cards. Where a card is warranted (team, research), use `--surface` fill or a 1px hairline border, `--radius`, and shadow only on hover.
- **Nav.** Fixed, `--paper` background, 1px bottom hairline (no blur backdrop as decoration). Active link marked with a short coral underline/tick, not a color swap alone.
- **Buttons.** Primary = `--blue` fill, white text, `--radius`, hover `--blue-strong`. Secondary = 1px `--blue` outline, blue text. No gradients.
- **Links.** `--link` color; hover reveals a coral underline. Underline offset 2px.
- **Section headings.** Serif, left- or center-aligned per section; optional short coral rule above. No tracked-uppercase eyebrow on every section, and no 01/02/03 numbering unless the order carries meaning.
- **Tags / topic chips.** Mono, `--blue-100` fill with ink text, or neutral; the single highlighted/active chip may use `--coral-100` + `--coral-ink`.
- **Motion.** One authored, restrained reveal (short fade+rise, exponential ease-out, from an already-legible default), not per-section shimmer. Respect `prefers-reduced-motion`.
- **Imagery.** Team photos square, consistent treatment. Partner logos in a calm grayscale-to-color-on-hover row. No decorative symbol scatter.

## Anti-references (from the incumbent build — do not reintroduce)

Gradient/shimmer text; animated gradient hero overlays; glassmorphism blur cards; `border-left` accent bars > 1px; scattered ○□◇△▽ symbol patterns; per-category tag rainbow; pill CTAs with heavy colored glow.
