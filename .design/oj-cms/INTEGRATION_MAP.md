# Payload Integration Map

This document separates the interactive prototype from the future Payload implementation. The prototype is a design and behavior specification with browser-local demo state. It does not claim to persist data through Payload.

## Verified Payload extension points

The following capabilities were checked against the current official documentation on 22 September 2026. Exact package versions will be pinned from the generated starter when integration begins.

| OJ surface | Payload mechanism | Integration approach | Risk |
| --- | --- | --- | --- |
| Brand logo and icon | Root Components `graphics.Logo` and `graphics.Icon` | Typed configurable components | Low |
| Main navigation | Root Component `Nav`, plus supported before/after nav positions | Replace navigation while retaining permitted entity data | Medium |
| Dashboard | Root View `admin.components.views.dashboard` | Custom server view using DefaultTemplate or supported root layout | Low |
| Account/profile | Root View `account` or supported account components | Style first; replace only if required | Medium |
| Pages/news list | Collection `views.list` | Prefer supported list customization and Payload UI components | Medium |
| Document editor | Document View `views.edit.default` and field components | Preserve Payload form state, validation, relations, drafts, and versions | High |
| Extra editor tab | Document Views | Add versions/help context without replacing core form behavior | Low |
| Media picker | Upload collection and supported fields/components | Wrap or style supported upload/relationship behavior | Medium |
| Site settings | Global configuration and Global Views | Map contacts/navigation to globals | Low |
| Users and roles | Auth collection plus collection access | Keep native authentication; centralize role checks | Medium |
| Dashboard data | Server Component + Local API | Use request principal with `overrideAccess: false` | High if omitted |
| Draft preview | Drafts/versions plus protected preview route | Authenticate preview, request draft content intentionally, prevent public caching | High |

## Supported implementation boundary

OJ CMS will use Payload configuration, documented custom components and views, `@payloadcms/ui`, hooks, access controls, endpoints, drafts, versions, globals, and upload collections. It will not patch Payload internals, edit `node_modules`, rely on generated class names, or maintain a fork.

Custom Components are React Server Components by default. Client Components will be introduced only for interaction that requires browser state. Components inside the Admin Panel will import shared Payload UI elements from `@payloadcms/ui` where appropriate to avoid package mismatches.

Custom Views are public by default according to the Payload documentation, so every custom server view must verify authentication and permissions. The read-filtered top-level `user` may be passed to client-facing components; the request principal is used for server authorization and permission-aware Local API calls.

## Access-control contract

Local API operations skip access control by default. Any operation performed on behalf of the active CMS user must pass both:

```ts
{
  user: req.user,
  overrideAccess: false,
}
```

The actual operation also receives its collection/global, `where`, depth, pagination, and draft policy. System jobs that intentionally override access are isolated, named accordingly, and tested separately.

Anonymous reads of versioned collections must constrain `_status` to `published`. Authenticated draft access is granted through explicit collection access rules. Dashboard counts, recents, and search results use the same restrictions and never reveal inaccessible document names or totals.

## Draft, preview, and publish mapping

| Prototype state | Payload state |
| --- | --- |
| Clean published | `_status: published`, no newer draft |
| Draft | `_status: draft` or an unpublished draft version |
| Has changes | Published document with a newer draft version |
| Save draft | Create/update with `draft: true` |
| Publish | Update with publication intent supported by the pinned version |
| Preview | Authenticated request using draft retrieval and explicit no-store/private caching |
| Version history | Payload Versions with `readVersions` access |

The integration test must prove that saving a draft does not change the anonymous public response and that publishing does. Preview authorization must expire or be session-bound and must not leak through a shared cache.

## Configuration contract

The reusable OJ module receives a typed configuration rather than client-specific imports:

```ts
type OJCmsConfig = {
  product: {
    name: string
    attribution?: string
    logoComponent: string
    iconComponent: string
    accent: 'ink' | 'forest'
  }
  site: {
    name: string
    publicUrl: string
    supportUrl?: string
  }
  modules: {
    pages: { collection: string }
    news?: { collection: string }
    media: { collection: string }
    siteSettings: { global: string }
    users: { collection: string }
  }
}
```

Runtime navigation still filters modules through the authenticated user's permissions. Configuration controls availability, not authorization.

## Styling strategy

- CSS custom properties expose primitive, semantic, and component tokens.
- CSS Modules scope OJ-owned components.
- A small documented Payload integration stylesheet maps supported upstream variables and stable component surfaces.
- No Tailwind build step is introduced.
- Dark tokens exist for future compatibility; the first prototype and first integration acceptance focus on light mode.

## Delivery sequence after design approval

1. Generate a new supported Payload starter and pin its exact dependency set.
2. Add OJ configuration, logo/icon, tokens, and navigation through supported root components.
3. Replace the dashboard with a permission-aware server view.
4. Integrate one complete Pages flow using Payload drafts, media, preview, publish, and versions.
5. Add News and Site Settings by reusing the established document primitives.
6. Apply roles and direct API tests before exposing Users.
7. Validate a second fictitious client configuration before extracting a versioned package.

## Sources

- Admin overview: https://payloadcms.com/docs/admin/overview
- Custom component overview: https://payloadcms.com/docs/custom-components/overview
- Root components: https://payloadcms.com/docs/custom-components/root-components
- Custom views: https://payloadcms.com/docs/custom-components/custom-views
- Document views: https://payloadcms.com/docs/custom-components/document-views
- UI components: https://payloadcms.com/docs/ui-components/overview
- Local API access control: https://payloadcms.com/docs/local-api/access-control
- Versions: https://payloadcms.com/docs/versions/overview
- Drafts: https://payloadcms.com/docs/versions/drafts

## Open integration risks

- The standalone editor composition must be reconciled with the exact supported document form APIs before promising pixel parity.
- Payload's dark theme and upstream CSS variables must be audited against OJ tokens in the pinned release.
- Media deletion reference checks may require a project-specific relationship policy.
- Public site cache invalidation depends on the client site's deployment and rendering strategy and cannot be universalized as a CSS/admin concern.
