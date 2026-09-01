# Design

<!-- impeccable:design-schema 1 -->

Durable visual system for the TRACE Lab website. Product truth: [PRODUCT.md](PRODUCT.md). Tokens here are the source of truth; mirror into `data/themes/trace.toml`, `data/fonts/trace.toml`, and the `:root` in `assets/scss/custom.scss`.

## Direction contract

**THESIS.** A Cambridge trustworthy-AI lab that looks *fresh and institutional*, not a startup and not a generic serif-on-white academic template. Confident deep-blue colour-blocking, a grotesque type system, and a single coral signal. The wordmark's own logic (TRustworthy Artificial intelligenCE) is expressed in the hero. It refuses the incumbent glassmorphism, animated gradients, shimmer text, and scattered ○□◇△ ornaments.

**OWN-WORLD.** Paper-white ground; a deep TRACE blue field (`#034285` (from the chapel image), toward the logo navy `#073D74`) that owns the hero and footer; coral (`#F67552`) rationed to one signal (logo tick, active nav, key figures, section rule). **Familjen Grotesk** carries everything; **Spline Sans Mono** carries data/labels only (years, venues, eyebrows). No serif, no decorative monospace.

**SIGNATURE.** The hero pairs the copy (left) with a **King's College Chapel line drawing** (white on the deep-blue field) on the **right**. Static image: `static/media/kings-chapel.jpg` — the generated white-lines-on-blue relief, cropped tight to the chapel; its blue (`#034285`) is the hero field colour so it blends edge-free. Generated with the user's OpenAI key. (An animated self-drawing SVG variant was explored and set aside; see `design-studies/`.)

**STORY.** A visitor grasps in seconds: *a serious Cambridge lab studying when AI can be trusted in the real world* — then scans research, people, publications, and reaches out or applies.

## Color

Light-only today (see the force-light block in `custom.scss`). Tokens as CSS custom properties in `custom.scss :root`.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FFFFFF` | Base background |
| `--surface` | `#F6F8FB` | Alternating bands |
| `--hairline` | `#E4E8EE` | 1px rules / card borders |
| `--ink` | `#191D26` | Headings / primary text |
| `--body` | `#333A44` | Body text |
| `--muted` | `#5B6472` | Secondary text (AA) |
| `--brand` | `#034285` | Hero/footer field, brand blue |
| `--brand-deep` | `#022C57` | Footer, hover on brand |
| `--link` | `#0C4FA3` | Text links |
| `--coral` | `#F67552` | The one signal (marks, active state) |
| `--coral-ink` | `#B44A2C` | Coral **as text** on light (AA) |
| `--coral-lite` | `#F79A80` | Coral on the blue field (hero acronym) |
| tints | `#E4EBF5` sky · `#F4E7E0` blush · `#E3ECE7` mint · `#EEEBDC` sand | Research tiles (greyed, institutional) |

**Strategy: Restrained + one committed field.** Neutral paper does the reading work; blue owns the hero/footer as full fields; coral is a single accent. The old eight-colour tag rainbow is retired.

## Typography

`data/fonts/trace.toml` → `family=Familjen+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Spline+Sans+Mono:wght@400;500;600`.

| Role | Family | Notes |
|---|---|---|
| Display / headings / body / UI | **Familjen Grotesk** | Fresh humanist grotesque. Headings 700, tracking -0.02–-0.035em; body 400. |
| Data / meta / labels | **Spline Sans Mono** | Years, venues, eyebrows, tags — real data only. ~0.7rem, tracked, uppercase. |

Hero title `clamp(2.4rem,5vw,4rem)`; section titles `clamp(1.5rem,2.6vw,2rem)` centred with a short coral rule above; body measure ~62–72ch.

## Layout & components

- **Structure with hairlines and whitespace**, not glass/shadow. Cards use `--surface` fill or a 1px hairline border; shadow only on hover (offset + blur, never a zero-offset glow).
- **Nav**: fixed, paper, 1px bottom hairline; active link marked with a short coral underline.
- **Hero**: `.home-section:has(.trace-hero)` full-bleed `--brand`; two-column (copy left + chapel line image right) → stacks on ≤860px with copy first. Grid children need `min-width:0`.
- **Buttons**: brand fill / brand-outline; radius `--r` (10px). No gradients, no glow pills.
- **Research**: `.research-grid-five` = 4 institutional tint tiles; the ○□◇△ `.card-icon` glyphs are hidden.
- **Publications**: flat bordered cards, coral mono year, mono venue.
- **Motion**: quiet hover only (the animated chapel draw-on was explored and set aside). Respect `prefers-reduced-motion` (global reset).

## Build / constraints

- Hugo + Hugo Blox (vendored). SCSS is compiled by **LibSass** in this toolchain: wrap CSS `min()/max()` with mixed units in interpolation (`#{"min(76vh,700px)"}`) — LibSass otherwise tries to compute them and errors. `clamp()` passes through.
- Editable by non-designers via the documented markdown/YAML/HTML patterns in README.md; keep class names stable.
- `html, body { overflow-x: clip }` guards against horizontal overflow.

## Anti-references (do not reintroduce)

Glassmorphism blur cards; animated gradient hero overlays; gradient/shimmer text; scattered ○□◇△▽ symbol patterns; the per-category tag rainbow; heavy glowing pill CTAs; decorative monospace.

## Status

First pass shipped on branch `redesign/brand-exploration` (home, publications, join, project pages restyled). Not yet on `main`, not pushed. Earlier serif/blue exploration lives in `design-studies/`.
