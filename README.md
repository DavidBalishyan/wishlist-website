# Wishlist website

Product and technical documentation site for
[Wishlist](https://github.com/DavidBalishyan/wishlist), a small local-first Expo
application for tracking products and ideas without creating an account.
Wishlist was created as an educational project at
[TUMO Center for Creative Technologies](https://tumo.org); the website makes
that origin visible without presenting the app as an official TUMO service.

The site is built with Angular 22, TypeScript 6, Tailwind CSS 4, SSR, and
prerendered routes. It deliberately documents the app that exists today: there
are no app-store links, cloud-sync claims, analytics claims, or invented roadmap
features.

## What is in the site

| Route      | Purpose                                                                                                                                                         |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`        | Compact product overview with a working wishlist preview, TUMO origin strip, feature ledger, local-storage explanation, and source links                        |
| `/details` | Source-level build notes covering routes, state ownership, storage keys, schema, lifecycle, link matching, preferences, setup, scripts, design, and maintenance |

Both feature routes are lazy-loaded. The shared application shell owns the
fixed navigation, mobile disclosure, skip link, main landmark, and footer.

## Product, visual, and educational context

This repository draws from two local projects and one educational context:

- `../wishlist` is the product source of truth. Feature statements, commands,
  dependency versions, storage behavior, and limitations come from its README,
  package metadata, and implementation.
- `../../betterfetch-branding/website` is the visual reference. Its restrained
  dark canvas, precise developer details, one-accent palette, and generous
  whitespace informed the design.
- [TUMO](https://tumo.org) is where Wishlist was built as an educational
  project. The landing page includes a compact origin strip, and the shared
  footer repeats the attribution on both routes.

The site adapts those ideas instead of cloning them. The visual direction is
closer to a personal notebook on a dark desk than a software marketing template.
The working preview is the one substantial object on the page.
Technical details use simple rules and lists instead of repeated promotional
cards.

The home route has five compact beats:

1. A short introduction beside the interactive preview.
2. A narrow TUMO origin strip.
3. A three-row feature ledger followed by plain platform and preference facts.
4. A local-storage section with one direct data-flow line and one caveat.
5. A small closing row that points to the build notes and source.

This order lets the product demonstrate itself first. Flat feature, storage, and
closing sections avoid a wall of interchangeable cards. Borders organize
related text, while raised surfaces are reserved for the live preview, code,
and diagrams.

### TUMO logo treatment

`public/tumo-logo-white.png` is the 239×80 transparent white wordmark served by
[TUMO’s official website](https://tumo.org/wp-content/uploads/2018/02/ENG003_Stroke-Black-H80px-1.png).
It is stored locally instead of hot-linked, so the page does not depend on a
third-party request or disclose a visitor’s page load to TUMO. Angular’s
`NgOptimizedImage` directive supplies the image URL while its intrinsic
dimensions reserve layout space and prevent cumulative layout shift.

The wordmark appears at a modest size in the origin strip, keeps its original
aspect ratio, and links to `tumo.org`. Its alternative text names the
organization, and the whole linked image receives a visible keyboard focus
treatment. Adjacent copy states the precise relationship: TUMO is the project’s
educational origin, not the provider of a Wishlist service.

## Product claims and accuracy boundaries

The copy follows the current Wishlist repository:

- Wishes can contain a title, price string, product link, notes, a local image
  URI, and low/medium/high priority.
- Wishes can be created, edited, completed, restored, or permanently deleted.
- Duplicate product links produce a warning and may still be saved.
- Theme options are light, dark, and system.
- Currency options are USD, RUB, AMD, and EUR.
- One Expo project targets Android, iOS, and static web.
- Wishes and preferences are persisted with AsyncStorage.

The site also says what the product does **not** do:

- There is no account, backend, analytics service, or cloud synchronization.
- AsyncStorage persistence is not encrypted.
- Clearing app data or browser site storage removes local data.
- Currency selection swaps the displayed symbol; it does not convert amounts.
- Selected images currently appear in the editor, not on wishlist cards.
- The project has source setup instructions, but no verified store release.

Keeping these boundaries visible is a design choice. Trust is more useful than
inflated marketing copy for a local-first product.

## Visual system

The visual system keeps the dark Betterfetch influence without the usual
startup-site framing. The header is a quiet full-width rule. Home sections use
editorial columns, definition lists, and dividers. Rounded containers appear
only when the content behaves like an object, such as the app preview, code
windows, and the architecture diagram.

### Palette

| Token       | Value             | Role                                                     |
| ----------- | ----------------- | -------------------------------------------------------- |
| `ink-950`   | `#0c0c0b`         | Warm black page canvas and dark button text              |
| `ink-900`   | `#131311`         | Code and diagram surfaces                                |
| `ink-850`   | `#191916`         | Secondary technical surfaces                             |
| `paper-100` | `#f4f1e9`         | Main text and the tactile preview frame                  |
| `paper-200` | `#ded9ce`         | Quiet paper-toned borders and supporting text            |
| `wish-300`  | `#aaf2dc`         | Primary action, active state, underline, and focus ring  |
| `wish-400`  | `#77ddbd`         | Low-opacity ambient light                                |
| `wish-500`  | `#42bd96`         | Stronger accent variant                                  |
| `peach-300` | `#efa58c`         | Small live-demo label                                    |
| Stone scale | Tailwind defaults | Warm neutral text, borders, and preview interface colors |

The warmer black, paper, and stone tones make the page feel less synthetic than
pure black and cool zinc. Mint still carries focus and active meaning. Peach is
used once, on the live-demo label, so it reads as a small human detail rather
than a second brand color. Green, amber, and red remain inside the product
preview, where they communicate wish priority.

### Typography

The sans stack starts with `Avenir Next` when it is installed, then falls back to
the operating system UI font. No webfont request is made. Headings use semibold
weight and compact tracking to keep display text calm. Labels mostly use
sentence case. A system monospace stack remains limited to paths, commands,
storage keys, sequence numbers, and technical labels.

### Shape and spacing

- The 64px fixed header spans the viewport and is separated by one low-contrast
  rule. Active navigation uses text and a bottom border rather than a pill.
- The live preview has the largest radius at 28px because it is treated as a
  physical paper object.
- Buttons use restrained 6px to 8px radii. Technical code and diagram frames use
  16px radii when containment helps scanning.
- Feature and storage facts are flattened into divided rows instead of cards.
- Primary controls use at least a 44px touch target.
- The shell and hero use a 72rem maximum width. Editorial home sections and the
  build notes use narrower 64rem measures.
- Mobile gutters are 16px and become 24px from the small breakpoint.
- Home sections use 80px to 112px vertical spacing. The TUMO strip stays compact
  at 24px because it is attribution, not a separate marketing story.

### Background and eye candy

The page background uses one faint mint radial gradient near the upper-right
area. Routes do not use a page-wide grid, so most of the canvas remains plain
and quiet.

The home route concentrates its decorative work around the preview:

- a mint underline draws once beneath the final hero phrase;
- a thin dashed thread moves slowly behind the preview on large screens;
- an offset mint outline and soft shadow give the preview a paper-like stack;
- the preview rests at a 0.8 degree angle on large screens, then settles upright
  on hover or keyboard focus;
- one peach label identifies the working demo.

The details route uses a single hero glow, a small summary highlight, bordered
code windows, an architecture-diagram shadow, and a timeline line. These effects
are CSS or inline SVG. They do not add image requests or a runtime animation
dependency.

All decorative motion is disabled by the global reduced-motion rule. The
Wishlist mockup remains real HTML and CSS, so it stays sharp, keyboard
operable, and meaningful when animation is unavailable.

## Angular architecture

```text
src/app/
├── app.ts                   # shared shell state and mobile-menu behavior
├── app.html                 # skip link, header, router outlet, footer
├── app.css                  # shell host containment
├── app.routes.ts            # lazy route definitions
├── core/
│   └── site-content.ts      # shared links and navigation labels
└── features/
    ├── home/
    │   ├── home-page.ts     # preview signals and derived state
    │   ├── home-page.html   # compact product overview
    │   └── home-page.css    # underline, thread, paper stack, and tilt
    └── details/
        ├── details-page.ts   # typed documentation content and copy state
        ├── details-page.html # source-level technical reference
        └── details-page.css  # glow, summary line, diagram shadow, and timeline
```

The components are standalone by default in Angular 22; decorators do not repeat
`standalone: true`. Angular 22 also defaults to OnPush behavior, so the
components do not set `ChangeDetectionStrategy.OnPush` explicitly.

### Routing

`app.routes.ts` uses `loadComponent` for both feature routes. This keeps the
shell small and lets the technical notes load only when requested. The SSR route
configuration prerenders every static route, while `provideClientHydration()`
restores client interaction. Router scrolling restores new pages to the top and
keeps anchor navigation enabled.

### Signals

Signals are used for local interface state:

- `menuOpen` controls the mobile navigation.
- `previewScreen` selects open or completed wishes.
- `previewWishes` holds the small demonstration collection.
- `previewAnnouncement` gives assistive technology concise interaction updates.
- `copyState` exposes idle/copying/copied/failed clipboard feedback.

Computed values derive the open, completed, and visible preview lists, the
current list label, and clipboard feedback strings. Currency and theme are now
plain product facts on the home route, not separate interactive demos, so they
do not require local preview state. Updates remain immutable: a completed wish
is replaced through `update()` rather than mutated in place.

### SSR safety

The page templates render without direct access to `window`, `document`, or
`localStorage`. Clipboard access is contained inside a click handler and guarded
with `typeof navigator !== 'undefined'`, so prerendering does not evaluate a
browser-only global. Angular’s SSR host allowlist explicitly includes
`localhost` and `127.0.0.1`, which keeps local prerender/browser verification
compatible with its host-header protection.

## Tailwind CSS 4

Tailwind is connected through `.postcssrc.json` and a single
`@import 'tailwindcss'` in `src/styles.css`. The project uses the CSS-first
Tailwind 4 configuration model:

- brand values are declared inside `@theme`;
- global browser defaults, selection styling, the ambient page background, and
  the reduced-motion fallback live in `src/styles.css`;
- layout and component styling stay close to the HTML as utilities;
- route-specific decorative CSS lives beside each feature component;
- state-dependent appearance uses explicit Angular class bindings so every
  class remains statically discoverable.

No `tailwind.config.js` is required.

## Accessibility decisions

The implementation targets WCAG 2.2 AA and clean automated AXE results:

- a keyboard-visible skip link targets the main content;
- landmarks and navigation labels identify page structure;
- each route has one `h1` and a logical heading hierarchy;
- the mobile menu exposes `aria-expanded` and `aria-controls`;
- Escape closes the mobile menu and restores focus to its toggle;
- route changes move focus to the main landmark after the initial page load;
- the live-demo link moves focus to its named preview region;
- moving a wish between lists moves focus to the destination list toggle instead
  of leaving focus on a removed button;
- all links and buttons have visible, high-contrast focus rings;
- primary buttons, list toggles, menu controls, and mobile links use 44px touch
  targets;
- the app preview uses ordinary buttons with `aria-pressed` rather than an
  incomplete ARIA tabs implementation;
- preview and clipboard changes have restrained live-region announcements;
- decorative SVGs and background layers are hidden from assistive technology;
- the linked TUMO wordmark has meaningful alternative text and a visible focus
  ring around the complete image;
- external links use `noopener noreferrer`;
- color is reinforced with text labels instead of carrying meaning alone;
- `prefers-reduced-motion` removes transitions and smooth scrolling.

## Responsive behavior

- Mobile: the header collapses to an accessible disclosure, the hero and TUMO
  strip stack, the preview has no tilt, ledger rows become short vertical
  groups, and code windows scroll within their own bounds.
- Small and medium screens: gutters increase to 24px, feature rows become
  number/title/detail columns, product facts form three divided columns, and the
  closing links align beside their explanation when space permits.
- Desktop: the hero and local-storage section split into two columns, the
  preview gains its subtle paper tilt, full navigation appears, and the
  build-notes contents rail becomes sticky.

The layouts do not require JavaScript to resize. CSS grid, flexible columns, and
bounded widths handle every breakpoint.

## Performance choices

- No external fonts, stock photography, icon libraries, or runtime animation
  package.
- The one raster asset, the official TUMO wordmark, is small, local,
  intrinsically sized, and loaded through `NgOptimizedImage`.
- Inline SVG is used for small interface icons.
- Feature routes are lazy-loaded.
- Route-specific decorative CSS ships with its feature instead of growing the
  shared stylesheet.
- Static routes are prerendered for fast first content and crawlable copy.
- The product preview is DOM/CSS rather than a large screenshot.
- Decorative motion uses small CSS transforms and stroke offsets. It stops
  under `prefers-reduced-motion`.
- Flattened ledgers replace most repeated card surfaces, reducing markup and
  visual paint work while making the content easier to scan.
- The generated Angular production budgets remain enabled.

## Development

### Prerequisites

- Node.js 24.18.0 (see `.nvmrc`; Angular 22 requires Node 24.15 or newer in the
  24.x line)
- npm 11.16.0

### Install and run

```bash
nvm install
nvm use
npm install
npm start
```

Open `http://localhost:4200/`.

### Commands

| Command                              | Purpose                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------ |
| `npm start`                          | Run the Angular development server                                       |
| `npm run build`                      | Create the production browser/server bundles and prerender static routes |
| `npm test`                           | Run Vitest-backed Angular unit tests                                     |
| `npm run watch`                      | Rebuild continuously with the development configuration                  |
| `npm run serve:ssr:wishlist-website` | Serve an already-built SSR bundle                                        |

## Verification checklist

Before handoff, verify:

1. TypeScript and strict Angular templates compile.
2. Production budgets pass.
3. Unit tests pass.
4. `/` and `/details` prerender successfully.
5. Mobile navigation opens, closes, and responds to Escape.
6. Preview controls work with mouse and keyboard.
7. Completing and restoring a preview wish updates the visible list and
   announcement.
8. Clipboard feedback handles success and unsupported environments.
9. Layouts are reviewed at phone, tablet, and desktop widths.
10. Automated accessibility checks report no violations.
11. Reduced-motion mode removes nonessential motion.

The implemented handoff was checked with strict Angular compilation, seven
Vitest tests, a production SSR build that prerendered both routes, and AXE in a
real headless browser at 1280px and 390px widths. AXE reported zero violations
for both `/` and `/details` at both viewports. The initial browser bundle is
approximately 86KB transferred; each route’s content remains in its own lazy
chunk.

## Deliberate non-features

This is a static product and documentation site. It does not recreate the
complete Wishlist application, store visitor data, provide authentication,
proxy GitHub content, or invent distribution links. The interactive preview is
small and resettable; the actual source repository remains the product.
