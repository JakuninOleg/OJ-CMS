# Production Review: OJ CMS Demo

Review date: 22 September 2026  
Scope: application code, interaction state, accessibility, dependency security, Next.js production build, GitHub Actions, and Vercel deployment.

## Result

The public demonstration is approved for production hosting. No open critical or high-severity defects remain in the reviewed demo scope.

This approval covers the interactive product demo. A client production CMS still requires the planned Payload integration, server-side authorization, database and media storage, migrations, preview security, backups, and restore testing.

## Findings resolved

| Severity | Area | Finding | Resolution |
| --- | --- | --- | --- |
| High | News workflow | Publishing a brand-new news item without saving first changed the form state but did not create the item in the collection. | New items now validate, save, and publish in one reducer sequence; an E2E test proves the item appears as published in the list. |
| High | Persisted state | Editors could mount against seed state before browser state restoration, causing stale form values and a brief administrator-state render. | Child routes now mount only after validated state restoration; direct-role reload and draft reload are covered by E2E tests. |
| Medium | Browser storage | A large uploaded image could exhaust storage and throw during persistence without user feedback. | Demo uploads are limited to 512 KB, validation is shared and tested, persistence errors are caught, and the interface reports recovery guidance. |
| Medium | Form accessibility | Fields with both help and error text reused one description ID; fields without explicit IDs could generate duplicate identifiers. | Every field now receives a stable generated ID and distinct hint/error descriptions. |
| Medium | Dialog accessibility | Dialogs and the mobile drawer restored initial focus but did not contain keyboard focus. | Both surfaces now trap Tab/Shift+Tab, support Escape, prevent background scrolling, and restore trigger focus. |
| Medium | Deployment hardening | The initial deployment lacked explicit response security headers and used an open-ended Node engine range. | CSP, anti-framing, MIME, referrer, and permissions headers were added; Node is pinned to the Vercel-tested 24.x line. |
| Low | Dashboard navigation | “All drafts” linked to a list that did not apply the advertised filter. | The action now accurately opens all pages. |
| Low | Settings feedback | The saved message remained visible after a subsequent unsaved edit. | Editing any settings field now clears the saved state. |

## Verification

- Strict TypeScript compilation.
- ESLint with zero warnings.
- Six unit tests across reducers and media validation.
- Eleven Playwright scenarios covering drafts, reload persistence, preview/public isolation, publishing, new-news creation, permissions, login, unsaved navigation, mobile overflow, dialog focus, and storage failure.
- Automated axe scans on login, dashboard, and page editor with zero reported violations.
- `npm audit` with zero known vulnerabilities.
- Successful Next.js production build.
- Security-header response inspection against the production server.
- Successful Vercel build and visual inspection at `https://oj-cms.vercel.app/admin`.
