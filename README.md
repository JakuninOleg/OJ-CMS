# OJ CMS

OJ CMS is a product design and interactive prototype for a reusable client-facing administration experience built on Payload. The current repository contains stages A–D: product brief, information architecture, design system, interactive browser prototype, verification, and a checked integration plan.

The prototype is intentionally honest about its boundary: content persists in browser `localStorage`, not Payload. The next implementation stage will connect the reviewed experience to Payload drafts, versions, access control, media, and globals through supported extension points.

## Run locally

Requirements: Node.js 22 or newer and npm 9 or newer. CI currently verifies Node.js 24.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The administration prototype starts at `/admin`; the populated login demonstration is at `/login`.

## Product walkthrough

1. Open `/admin/pages/home`.
2. Change the cover heading or choose another image.
3. Save the draft.
4. Open `/preview/home` and confirm the draft is visible.
5. Open `/site/home` and confirm the previous published version remains public.
6. Return to the editor, publish, and confirm `/site/home` now shows the new version.

The sidebar's demo panel switches between Administrator and Editor, and resets all browser-local data. As Editor, direct access to `/admin/users` returns a permission-denied view without rendering user records.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build # required before the production-server browser suite
npm run test:e2e
```

GitHub Actions runs the same gates on pushes and pull requests. The browser suite verifies draft isolation, preview, publication, permission boundaries, login behavior, and a mobile overflow check.
It also runs axe against the login, dashboard, and page editor. `npm run screenshots` refreshes the review evidence while the production server is available on port 3107.

## Project structure

- `.design/oj-cms/` — brief, information architecture, integration map, build tasks, review, and screenshots.
- `.cursor/rules/` — persistent engineering standards for TypeScript, React/Next.js, Payload, styling, accessibility, testing, and delivery.
- `design-system/oj-cms/MASTER.md` — visual and interaction source of truth.
- `src/styles/tokens.css` — primitive, semantic, typography, layout, motion, and dark-theme tokens.
- `src/components/` — reusable shell, document, editor, site renderer, and UI components.
- `src/app/` — real prototype routes for administration, preview, public example, and login.
- `tests/e2e/` — critical product scenarios.

## Architecture decisions

- TypeScript strict mode with unchecked index and exact optional property checks.
- React Server Components by default; client boundaries contain browser-local prototype interactions.
- CSS Modules and CSS custom properties; Tailwind is not used.
- Phosphor icons and locally installed SIL Open Font License font packages; builds do not fetch remote fonts.
- No Payload fork, patched dependencies, or assumptions about undocumented Admin DOM.

See `.design/oj-cms/INTEGRATION_MAP.md` for the verified Payload mapping and security requirements.

## Current status

This repository is a reviewed interactive prototype, not the production Payload integration. It is suitable for evaluating the workflow and visual system. Production readiness applies after the next stage proves persistence, authorization, migrations, preview security, caching, deployment, and backup/restore against a pinned Payload stack.
