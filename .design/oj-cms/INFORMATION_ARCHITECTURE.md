# Information Architecture: OJ CMS

## Structural goals

The interface is organized around editorial tasks rather than Payload implementation terms. Navigation stays two levels deep at most. Pages and their editor are the primary workspace; every other section either supplies content to it or configures the resulting site.

Frequency ranking:

1. Find and edit an existing page.
2. Save, preview, and publish a change.
3. Select or upload media.
4. Create or edit a news item.
5. Update site-wide contacts and navigation.
6. Manage users and roles as an administrator.

## Site Map

- Sign in `/login`
- Administration `/admin`
  - Overview `/admin`
  - Pages `/admin/pages`
    - Page editor `/admin/pages/:id`
  - News `/admin/news`
    - News editor `/admin/news/:id`
    - New article `/admin/news/new`
  - Media `/admin/media`
  - Site settings `/admin/settings`
  - Users `/admin/users` — administrator only
  - Profile `/admin/profile`
  - Component system `/admin/system` — prototype/developer view only
- Draft preview `/preview/:slug` — authenticated, time-limited in Payload integration
- Published example `/site/:slug` — public representation of last published content

The prototype uses the same route names but stores demonstration state in the browser. Payload integration maps these routes to supported Admin views or retains Payload's native collection routes behind client-facing navigation labels.

## Navigation Model

- **Primary navigation**: Overview, Pages, News, Media, Site settings. Maximum five permanent items.
- **Conditional navigation**: Users appears only for an administrator and remains protected on direct navigation.
- **Utility navigation**: Open site, Profile, Help, role switch and demo reset. Role switching exists only in the prototype.
- **Editor navigation**: Breadcrumb back to the document list, followed by document title and state. SEO and versions are secondary tabs or disclosures.
- **Mobile navigation**: A menu button opens a modal drawer containing the same information architecture. Primary document actions remain available in a compact action bar.
- **Depth rule**: No nested sidebar accordions. A user reaches an editable document in at most two navigation actions.

## Content Hierarchy

### Overview

1. Greeting and current site context — confirms which project is being edited.
2. Quick actions — create or continue work immediately.
3. Drafts requiring attention — reduces publishing mistakes.
4. Recently changed documents — resumes common work.
5. Site status and help — useful but secondary.

### Pages list

1. Title and Create page action.
2. Search, status filter, and sort.
3. Results with document title, path, state, updated time, and editor.
4. Pagination and explicit empty/no-results guidance.

### Page editor

1. Document identity, state, save feedback, Preview, and Publish.
2. Core page fields and ordered content blocks.
3. Media selection and meaningful alternative text.
4. SEO and route information.
5. Version history and destructive actions.

### Media

1. Upload and search.
2. Filtered library with selection state.
3. Metadata and use references.
4. Safe deletion or explanation of why deletion is blocked.

### News

1. Reused document list pattern.
2. Publication date, excerpt, cover, and body fields.
3. Same draft, preview, and publish language as Pages.

### Site settings

1. Public identity and contact information.
2. Navigation structure and social links.
3. Save feedback and validation.
4. Developer-owned OJ branding configuration is not exposed here.

### Users

1. User list and role.
2. Invite/add action if enabled by the deployment.
3. Role change and account state.
4. Current administrator safeguards and permission guidance.

## User Flows

### Edit and publish a page

1. User signs in and lands on Overview.
2. User opens Pages or selects a recent document.
3. User searches/filters if necessary and opens the page.
4. User edits copy and selects an image.
   - If validation fails, errors stay attached to fields and focus moves to the summary.
   - If media upload fails, the document remains intact and upload can be retried.
5. User selects Save draft.
   - If saving succeeds, state changes to Saved draft and the timestamp is announced.
   - If saving fails, input is retained and an inline notice offers retry.
6. User opens Preview and verifies the protected draft.
7. User selects Publish.
8. The interface confirms the published state and provides Open site.
9. The public example shows the new published version; draft-only changes never appear there.

### Leave with unsaved changes

1. User modifies a document.
2. User follows navigation, browser back, or another document action.
3. A confirmation dialog names the unsaved page.
4. Stay returns focus to the triggering navigation; Leave discards only unsaved working state.

### Add or select media

1. User opens the media picker from a page field.
2. User searches existing media or selects Upload.
3. File type and size are checked before acceptance.
4. User supplies required alt text where the image conveys content.
5. Select image closes the picker and returns focus to the field trigger.

### Editor attempts user administration

1. Users is absent from primary navigation.
2. Direct navigation to `/admin/users` evaluates the role again.
3. The user sees a permission-denied view with a safe route back; no user records are rendered.

### Create news

1. User opens News and selects Add news.
2. Shared editor primitives render news-specific fields.
3. User saves a draft, previews, and publishes through the same document-state model.

## Roles and entry points

| Role | Entry point | Can do | Cannot do |
| --- | --- | --- | --- |
| Editor | Overview | Manage permitted pages, news, media, and site content; publish by initial product policy | Manage users or product configuration |
| Administrator | Overview | All editor work plus user and role management | Bypass server validation or access rules |
| Anonymous visitor | Published example | Read published public content | Read drafts, preview routes, or administration data |

## Naming Conventions

| Concept | Label in UI | Notes |
| --- | --- | --- |
| Collection of pages | Страницы | Never expose “collection” to editors |
| Global site configuration | Настройки сайта | Separates public content from developer configuration |
| Draft persistence | Сохранить черновик | Consistent action wording |
| Publish operation | Опубликовать | Success feedback repeats “Опубликовано” |
| Unpublished state | Черновик | Text always accompanies color |
| Published state | Опубликовано | Never shorten to an unexplained icon |
| Newer unpublished changes | Есть изменения | Distinguishes from a first-time draft |
| Protected draft rendering | Предпросмотр | Preview banner explicitly says it is not public |
| Media library | Медиа | Covers images and files without storage terminology |
| Site-wide values | Настройки сайта | Contacts, navigation, public links |

## Component Reuse Map

| Component | Used on | Behavior differences |
| --- | --- | --- |
| AdminShell | All admin routes | Conditional Users item; compact mobile mode |
| PageHeader | Lists, settings, users | Optional primary action and supporting text |
| DocumentList | Pages, News | Column definitions and empty-state copy |
| DocumentEditor | Pages, News | Schema-driven field groups and content blocks |
| DocumentActions | Page/news editor | Same draft/preview/publish state machine |
| StatusBadge | Dashboard, lists, editors | Draft, published, changed, error |
| MediaLibrary | Media route and picker | Full-page management vs. selection dialog |
| FormField | Editors, settings, login, profile | Input type, descriptions, validation messages |
| Dialog | Unsaved changes, media picker, confirmations | Severity and initial focus vary |
| Notice | Forms and shell | Informational, success, warning, error |
| EmptyState | Lists and media | No data vs. no search results use different action copy |

## Content Growth Plan

- Pages and News use server-ready search, status filters, sorting, and pagination. The prototype mirrors these controls on demo data.
- Media supports search and paged/grid retrieval; production integration must avoid loading the entire library.
- Dashboard lists are capped and permission-filtered. They link to full lists instead of becoming activity archives.
- Versions remain attached to each document and use Payload's version storage and access controls.
- Navigation remains stable as content grows because individual content types do not become sidebar items without a product-level decision.

## URL Strategy

- Admin list: `/admin/<section>`.
- Document editor: `/admin/<section>/<opaque-id>`; never infer authorization from a discoverable ID.
- Query parameters: `q` for search, `status` for state, `sort` for ordering, `page` for pagination.
- Preview: `/preview/<public-slug>` plus protected server-side authorization in Payload integration.
- Published example: `/site/<public-slug>`.
- Slugs are normalized, validated, and unique within their content type; titles remain independent.
