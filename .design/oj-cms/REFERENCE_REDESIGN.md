# Reference redesign — 2026-09-22

The user's dashboard mockup and approved OJ wordmark supersede the original prototype's circular badge and abstract illustration direction. The updated contract is `design-system/oj-cms/MASTER.md`.

Implemented: vector OJ identity; light sidebar/topbar; expandable collections; global content search; document actions; profile/demo controls; reference dashboard proportions; four locally bundled architectural/landscape images; consistent editor, media, login and public preview branding; usable help and preferences routes. README screenshots were refreshed.

Deliberate differences from the raster mockup: counts come from the actual demo state; activity uses existing documents; profile uses initials rather than an invented portrait; small text has sufficient contrast; photography is newly generated in the reference's direction. This is not a claim of pixel-identical reproduction.

Verification:

- Production Next.js build and TypeScript check.
- ESLint with zero warnings; 8 unit tests.
- 21 Playwright scenarios, including existing draft/publish flows, unsaved-edit protection, role switching, persistence errors, search, row actions and keyboard navigation.
- Automated accessibility checks for login, overview, editor and mobile profile controls.
- Image loading and absence of horizontal overflow at 375, 768, 1280 and 1536 px.
- Visual review of desktop/mobile overview, editor and media screenshots under `screenshots/`.

Review fixes: mobile focus restoration after removing `inert`; stronger footer text contrast; reliable locally optimized hero loading; editor action wrapping; correct media thumbnail aspect ratio; migration of legacy artwork without clearing edits or uploads.

The app remains a browser-local demonstration. Backend authentication, server-enforced permissions, real audit history and persistent Payload data are outside this visual revision.
