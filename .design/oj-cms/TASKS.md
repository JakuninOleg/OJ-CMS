# Build Tasks: OJ CMS interactive prototype

Generated from: `.design/oj-cms/DESIGN_BRIEF.md`  
Date: 22 September 2026

## Foundation

- [x] **Application shell and visual vocabulary**: Build the responsive OJ shell, typography, semantic tokens, buttons, fields, badges, notices, and demo-state provider so the aesthetic is reviewable on the first screen. _Creates: all foundation components. Reuses: `src/styles/tokens.css`._
- [x] **Component system view**: Expose every foundation component and state on a developer-only page. _Reuses: foundation components. Creates: system page._

## Core UI

- [x] **Overview workspace**: Build quick actions, drafts, recent documents, site context, and help without decorative analytics. _Reuses: shell, status badge, action link, document row. Creates: dashboard composition._
- [x] **Pages discovery**: Build searchable/filterable/sortable document list with pagination and distinct empty/no-results states. _Reuses: page header, fields, status badges. Creates: document list._
- [x] **Page editing slice**: Build page fields, three content block examples, SEO disclosure, unsaved state, validation, and document actions. _Reuses: form controls and notices. Creates: editor and block frames._
- [x] **Media selection and management**: Build full media library plus accessible picker/upload dialog with type/size validation, alt text, and deletion safeguards. _Reuses: dialog, search, notices. Creates: media grid and uploader._
- [x] **Preview and publish**: Connect browser-local draft and published snapshots to protected-looking preview and public example routes. _Reuses: editor actions, status badge. Creates: preview banner and public renderer._
- [x] **News workflow**: Reuse document list/editor foundations for news-specific fields and create flow. _Modifies: document list/editor. Creates: news field schema._
- [x] **Site settings**: Build contacts, navigation, and public links with validation and saved feedback. _Reuses: form controls and editor action bar. Creates: settings groups._
- [x] **Users, profile, and login**: Build authentication presentation, administrator user list, role simulation, and direct-route permission denial. _Reuses: form controls, table, shell. Creates: login and permission boundary views._

## Interactions & States

- [x] **Failure and recovery states**: Demonstrate failed save, validation errors, unsaved navigation confirmation, upload error, loading, and no-permission behavior without losing input. _Modifies: editor, dialog, uploader, notices._
- [x] **Demo controls and reset**: Clearly mark browser-local state, provide role switching and deterministic reset, and never imply Payload persistence. _Reuses: utility navigation and notices. Creates: demo controls._

## Responsive & Polish

- [x] **Responsive behavior**: Adapt shell, lists, editor actions, dialogs, and media grid at 1440px, 1024px, 768px, 390px, and intermediate widths. _Modifies: all layout components._
- [x] **Accessibility pass**: Verify landmarks, headings, labels, validation linkage, live announcements, keyboard order, dialog focus, reduced motion, target size, and WCAG AA contrast. _Modifies: all interactive components._

## Verification and handoff

- [x] **Automated quality gates**: Add meaningful reducer/state tests and browser tests for draft/preview/publish and editor permission boundaries; pass typecheck, lint, tests, and production build. _Creates: test suite and CI workflow._
- [x] **Design review**: Capture desktop, tablet, and mobile screenshots, compare against the brief, fix must/should issues, and save `DESIGN_REVIEW.md`. _Reuses: complete application._
- [x] **Repository handoff**: Add setup/architecture documentation, commit the reviewed state, and push `main` to `JakuninOleg/OJ-CMS`. _Creates: README and repository metadata._
