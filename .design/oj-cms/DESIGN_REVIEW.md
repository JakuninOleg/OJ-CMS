# Design Review: OJ CMS

Review date: 22 September 2026  
Baseline: `DESIGN_BRIEF.md`, `INFORMATION_ARCHITECTURE.md`, and `design-system/oj-cms/MASTER.md`

## Decision

The prototype is approved for the next Payload integration stage. It expresses the intended quiet editorial utility, supports the critical content workflow, and remains explicit that persistence is browser-local demonstration state.

## Evidence reviewed

- Dashboard at 1280px, 768px, and 375px.
- Page editor at 1280px, 768px, and 375px.
- Media library, protected-looking preview, failed save, and permission denial at 1280px.
- Keyboard order and focus visibility on login, shell navigation, editor actions, dialogs, and media picker.
- Automated axe scans of login, dashboard, and page editor.
- Draft isolation, preview, publish, role restriction, login, and mobile overflow browser tests.

Screenshots are stored in `.design/oj-cms/screenshots/` and can be regenerated with `npm run screenshots` while the production server runs on port 3107.

## Findings resolved

- The desktop dashboard preserves the reference's strong grid and monochrome restraint while replacing decorative metrics with drafts, recent documents, and real actions.
- At compact widths the editor action bar now wraps without clipping; the mobile document title remains readable rather than truncating to an ambiguous fragment.
- The mobile navigation is absent from the accessibility tree while closed, opens as a labelled modal surface, receives initial focus, closes with Escape, and returns focus to its trigger.
- Complementary landmarks now have unique names, resolving the only automated accessibility violation found during review.
- Native browser alerts were removed from the user workflow and replaced with an inline product notice.
- Login fallback no longer places even demonstration credentials into query parameters.
- Save failure, validation, unsafe media deletion, draft/published separation, and permission denial keep data visible and provide a safe next step.

## Brief alignment

| Area | Result | Evidence |
| --- | --- | --- |
| Visual hierarchy | Pass | Manrope display hierarchy, Inter interface text, restrained panels, ink actions |
| Task orientation | Pass | Dashboard leads to drafts and common actions; no decorative analytics |
| State clarity | Pass | Draft, published, changed, saving, saved, error, and denied states use explicit text |
| Responsive behavior | Pass | Persistent desktop shell, compact tablet layout, mobile drawer and stacked editor |
| Accessibility | Pass for prototype | Semantic landmarks, labelled controls, focus states, reduced motion, zero axe violations on critical screens |
| Honest system boundary | Pass | Demo controls and documentation state that data lives in the browser |
| Payload compatibility | Ready for proof | Integration map uses documented extension points and identifies high-risk editor/preview work |

## Accepted limitations

- This is an interaction specification and browser prototype. Server authorization, database persistence, Payload migrations, preview token security, cache invalidation, backups, and restore procedures belong to the next implementation stage.
- Automated accessibility checks cover critical screens and do not replace assistive-technology testing after Payload integration.
- Dark tokens are prepared, but dark mode is outside the first prototype acceptance scope.
- Pixel parity inside Payload's document form remains conditional on the APIs of the exact pinned Payload release.

No critical or major design issues remain in the prototype. The next gate is a real Payload vertical slice for Pages, drafts, media, protected preview, and publication.
