# Design Brief: OJ CMS

## Product context

OJ CMS is a reusable, client-facing content management experience built on Payload. OJ Studio uses it as the maintained foundation for corporate websites, service businesses, and editorial projects. Payload remains the backend and editorial engine; OJ CMS provides the interaction model, visual system, client configuration, and reusable integration layer.

The primary users are non-technical editors who update pages, news, media, navigation, and contact information. Administrators additionally manage users and roles. The first release is Russian-first and desktop-prioritized, while remaining fully usable on tablet and mobile.

## Problem

Client editors often face administration panels organized around implementation concepts rather than their work. They need to publish a small change confidently, but encounter generic collection names, unclear save states, hidden dependencies, and interfaces that make routine content work feel risky.

The editor's core concern is not how Payload stores a page. They need to find the right page, change text or an image, inspect the result, publish it, and know exactly what happened without asking a developer.

## Solution

OJ CMS presents Payload as a calm, task-oriented workspace. Navigation uses the client's language: Pages, News, Media, and Site Settings. The dashboard leads to real work, the page editor keeps draft, preview, and publication state explicit, and every destructive or failed action provides clear consequences and recovery.

The experience remains close enough to supported Payload behavior to preserve upgrades, access controls, drafts, versions, media, and validation. Branding, site links, module visibility, and collection mappings are supplied through typed configuration rather than copied client-specific code.

## Success criteria

- A first-time editor can update page text and media, preview the draft, publish it, and verify the public result without guidance.
- Draft, saved, published, failed, and unsaved states are always distinguishable through text as well as color.
- An editor cannot access user administration, restricted documents, or draft content through direct routes or APIs.
- The interface works with keyboard navigation and at 1440px, 1024px, 390px, and fluid widths between them.
- A developer can change client branding and enabled modules through configuration without rewriting the shell.
- Payload can be upgraded without maintaining a fork or patches to internal code and DOM structure.

## Experience Principles

1. **Confidence over cleverness** — Make state, consequence, and recovery explicit; familiar controls beat novel interactions.
2. **Work before metrics** — The dashboard prioritizes actions, drafts, and recent documents over decorative counts.
3. **Client language over system language** — Expose Pages, News, and Site Settings while keeping Payload concepts behind a stable configuration layer.

## Aesthetic Direction

- **Philosophy**: Quiet editorial utility. A precise working tool with generous rhythm, strong typography, restrained surfaces, and a small amount of authorial character.
- **Tone**: Calm, trustworthy, mature, direct, and warm enough for daily use.
- **Reference points**: The supplied OJ reference for its monochrome palette, fine borders, clear grid, and typographic hierarchy; high-quality editorial tools for content density and readable workflows.
- **Anti-references**: Bright generic SaaS dashboards, glass effects, decorative analytics, oversized empty hero areas, architecture-specific imagery, excessive gradients, novelty navigation, and animation that delays work.
- **Brand treatment**: A typographic OJ mark identifies the product discreetly. The client's name and logo are configurable and take precedence in their workspace. `Powered by OJ CMS` may appear as secondary attribution.
- **Typography constraint**: Select a legally usable typeface with strong Cyrillic and Latin coverage. The final family and fallback stack are decided in the token phase.

## Content strategy

Prototype content uses a fictional Russian service company and is explicitly identified as demonstration data. It includes realistic long titles, missing images, drafts, validation failures, and permission-limited states. No real customer information, production credentials, or invented operational analytics may be presented as live data.

Interface copy uses short verbs and names the object being changed. Technical terms such as collection, global, hook, API, and schema do not appear in routine editor workflows.

## Existing Patterns

The project currently contains no application code, components, tokens, UI framework, or font setup. The only established patterns are the engineering rules in `.cursor/rules/`.

- **Typography**: Not established; new system required.
- **Colors**: Not established; new semantic token system required.
- **Spacing**: Not established; new scale required.
- **Components**: None exist; the prototype establishes the first vocabulary.
- **Styling**: CSS Modules and CSS custom properties; Tailwind is excluded.
- **Runtime direction**: TypeScript, React, Next.js, and Payload with exact compatible versions selected and pinned before integration.

## Component Inventory

| Component | Status | Notes |
| --- | --- | --- |
| Application shell | New | Responsive sidebar, top context, content region, mobile navigation |
| Brand mark and client identity | New | Both configured independently |
| Primary and secondary navigation | New | Visibility also constrained by permissions |
| Button and icon button | New | Complete interaction, loading, and disabled states |
| Text field, textarea, select, checkbox | New | Labels, descriptions, errors, read-only states |
| Search and filter bar | New | URL-compatible state where integration permits |
| Status badge | New | Draft, published, scheduled/error if supported; never color-only |
| Data list/table | New | Sorting, pagination, empty/no-results distinction, narrow-screen strategy |
| Dropdown menu | New | Keyboard navigation and focus restoration |
| Modal/dialog | New | Confirmation and media selection; accessible focus management |
| Toast/inline notice | New | Persistent field errors stay near their source |
| Skeleton and loading indicator | New | Preserve layout and announce meaningful progress |
| Empty and no-results states | New | Different guidance and next actions |
| Dashboard action card | New | Real workflow entry point, not decorative KPI card |
| Recent document row | New | Document, status, author, time, and permitted action |
| Editor header/action bar | New | Save state, preview, publish, version access, overflow actions |
| Block editor frame | New | Three configured Payload block examples; no custom rich-text engine |
| Media library and picker | New | Browse, search, upload, alt text, use references, deletion safeguards |
| File uploader | New | Progress, validation, retry, cancellation where supported |
| Tabs/disclosure | New | SEO and secondary settings without hiding critical publication state |
| Pagination | New | Accessible current-page semantics and compact responsive form |
| User/role table | New | Administrator only; direct access still enforced server-side |
| Public preview frame/page | New | Clearly identifies draft preview and protected access |

## Information scope

Primary navigation contains Overview, Pages, News, Media, and Site Settings. Users appears only for authorized administrators. Help and Profile are secondary destinations. Global search and a notification center are excluded from MVP unless a real data source and implementation need are established.

The page block system demonstrates only Cover, Text with Image, and Call to Action. News reuses the document list and editor foundations with a smaller field set. Site Settings covers contacts, navigation, and relevant public links; product branding configuration remains developer-owned.

## Key Interactions

### Primary publishing flow

1. The user signs in and sees work-relevant actions and recent documents.
2. They open Pages, search or filter, and select a page.
3. They change text and open the media picker to select or upload an image with alt text.
4. The interface marks unsaved changes and reports validation next to the responsible field.
5. Save Draft persists the change and changes the explicit document state.
6. Preview opens the protected draft representation and makes preview status unmistakable.
7. Publish requests confirmation only when consequences warrant it, then reports success and the effective public state.
8. The public example reflects the published version; reloading the editor preserves the saved result.

### Safety and recovery

- Navigating away with unsaved changes produces a focused confirmation with stay/leave choices.
- A failed save keeps the user's input, explains what failed, and offers a safe retry.
- Deleting media reports where it is used and prevents unsafe removal.
- Permission denial explains the restriction without revealing protected document data.
- Version history uses Payload versions where available and clearly identifies restoration consequences.

## Responsive Behavior

- **Wide desktop (1440px and above)**: Persistent navigation, comfortable content measure, contextual secondary panel only where it aids editing.
- **Compact desktop/tablet (1024px)**: Narrower navigation and content gutters; editor actions remain visible and do not overlap fields.
- **Mobile (390px)**: Navigation moves to an accessible drawer; page actions use a stable compact bar; data tables become deliberate record summaries or controlled horizontal regions.
- **All widths**: No essential action depends on hover, no content is clipped at intermediate sizes, and browser zoom/text resize remain usable.

## Accessibility Requirements

- Meet WCAG 2.2 AA contrast for text, controls, focus indicators, and meaningful non-text elements.
- Support full keyboard use with logical order, visible focus, skip/navigation affordances, and no keyboard traps.
- Restore focus after dialogs and announce dialog purpose, validation summaries, asynchronous save status, and upload progress.
- Every control has an accessible name; icon-only actions include tooltips as supplemental help, not as the sole accessible label.
- Errors are linked to their fields and summarized when a failed submit contains multiple problems.
- Status is represented by text and, where useful, icon plus color.
- Respect reduced motion and avoid automatic movement that interrupts editing.
- Test with browser accessibility tooling and manual keyboard review; automated checks alone are insufficient.

## Production constraints

- Use supported Payload extension points and preserve native authentication, validation, access control, drafts, versions, relations, and uploads.
- No Payload fork, `node_modules` modification, undocumented internal API, or fragile generated-selector styling.
- Validate and authorize all writes on the server. Dashboard queries and counts must obey current-user access.
- Use migrations for schema changes and document upgrade, backup, restore, and rollback procedures before release.
- Required gates include lockfile install, generated-type verification, strict typecheck, lint, relevant unit/integration/browser tests, production build, and browser verification.
- The standalone prototype must state that it uses demonstration state and must not imply that data is already persisted in Payload.

## Out of Scope

- Medusa, ecommerce, orders, payments, inventory, and shipping.
- SaaS billing, multi-tenancy, marketplace distribution, and self-service plugin installation.
- A universal no-code website builder or a custom rich-text engine.
- AI-generated content or AI administration features.
- Replacing Payload authentication or creating a separate full administration application.
- Building a complete production public website; only a minimal page renderer is needed to prove preview and publish behavior.
- Dark theme in the first prototype. Payload theme behavior must be evaluated and either supported later or deliberately constrained.
- Production deployment, registry publication, and automated cross-project updates in the first design phase.

## Open implementation decisions

- Pin the supported Payload/Next.js/React combination after checking the current official compatibility matrix and generated starter.
- Select database and media storage adapters when moving from prototype to Payload integration.
- Decide whether the first common OJ module remains local or becomes a versioned package after validating a second client configuration.
- Confirm the exact limits of theming Payload's document editor before promising pixel-level parity with the standalone prototype.
