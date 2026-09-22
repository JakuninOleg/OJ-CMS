# OJ CMS Design System

## Direction

Quiet editorial utility: a precise working surface that borrows the reference's strong grid and typographic calm without its architecture-specific imagery. One memorable device carries the identity: the oversized circular OJ mark and a restrained forest-green publication accent. Everything else supports scanning and safe editing.

The generated UI/UX dataset recommendation of Swiss minimalism fits the product. Its generic blue/green SaaS palette, landing-page structure, and serif pairing were rejected because they conflict with the supplied monochrome CMS reference and dense editorial workflow.

## Principles

- Work before metrics: actions, drafts, and documents take precedence over decorative totals.
- One layer of emphasis: ink for primary actions, forest for positive publication state, warm amber/red only for warnings and errors.
- Typography creates hierarchy; cards do not carry the entire layout.
- Every interaction is quiet, immediate, and reversible where practical.

## Typography

- Display: Manrope Variable, 600–700. Used for page titles and key quantities.
- Interface/body: Inter Variable, 400–600. Used for controls, tables, and long-form guidance.
- Fallback: system UI stack with full Cyrillic coverage.
- Both bundled font packages use the SIL Open Font License and keep builds independent of remote font requests.

## Palette

- Paper: warm near-white, not cream.
- Ink: neutral near-black.
- Mist: cool-neutral working surface.
- Forest: restrained confirmation and publication accent.
- Amber: drafts and recoverable warnings.
- Red: destructive actions and errors.

All implementation colors are OKLCH custom properties in `src/styles/tokens.css`; components consume semantic tokens only.

## Geometry

- 4px base spacing with practical dashboard density.
- Controls: 44px default height.
- Radius: 8px controls, 12px panels, full radius only for badges/avatars.
- Shadows are rare; separation comes from borders and tonal surfaces.
- Page content max width: 1440px; editor reading measure: 760px.

## Motion

- 120–220ms for state transitions.
- Opacity and transform only.
- No entrance choreography for routine administration pages.
- Reduced-motion mode removes spatial movement.

## Responsive model

- 1280px+: persistent 248px sidebar.
- 768–1279px: compact sidebar and reduced gutters.
- Below 768px: sidebar becomes a modal drawer and document actions wrap into a stable compact bar.
- Tables become labelled record summaries or use deliberate horizontal overflow when comparison must be preserved.

## Component rules

- Primary buttons use ink; publication success is communicated separately through state, not by turning every CTA green.
- Icon-only controls require accessible names and 44px targets.
- Badges never wrap and always include text.
- Inputs preserve labels above the field; placeholders never replace labels.
- Error summaries link to invalid fields.
- Destructive confirmations name the affected object and consequence.
- Toasts confirm background completion; validation stays inline.
