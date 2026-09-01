# Monolith Umbra Port Plan

## Purpose

Monolith Umbra is a personal Obsidian theme built on Minimal's mature application,
layout, mobile, and plugin support. The port will preserve Minimal as the
structural foundation while replacing its visual identity with Umbra and a
small set of deliberately chosen personal components from Monolith.

The objective is not to reproduce every Monolith feature or expose every
Minimal option. The finished theme should feel like Umbra, remain easy to
maintain, and retain the parts of Minimal that already work well.

## Source projects

- **Monolith Umbra fork:** this repository, originally forked from
  `kepano/obsidian-minimal`
- **Monolith:** `/home/jwl/projects/tools/css/Monolith`
- **Original Minimal:** `https://github.com/kepano/obsidian-minimal`

Minimal's copyright notice and MIT license attribution must remain in inherited
source and generated CSS.

## Guiding decisions

1. Minimal remains the foundation for Obsidian UI behavior, responsive layout,
   mobile support, and plugin compatibility.
2. Umbra is the default dark and light color scheme.
3. Resolarized is the first optional companion scheme.
4. Glacier remains experimental.
5. Minimal's macOS and Flexoki palettes become the attributed Monolith and
   Hunter variants.
6. Personal additions should live in clearly separated files rather than being
   mixed throughout inherited Minimal source.
7. Minimal's internal class names and variables should remain unchanged unless
   changing them provides a concrete benefit.
8. Working behavior in Obsidian is the source of truth. Failed Monolith code
   should not be ported merely because it exists in the repository.
9. Configuration should be intentionally small. Do not carry forward options
   that are not used.

## Architectural layers

### 1. Minimal foundation

Initially retain Minimal's existing modules unchanged. This includes its app,
content, mobile, core-plugin, and community-plugin support.

Unwanted features should first be disabled at the SCSS entry point rather than
deleted. This makes it easier to understand dependencies and review future
upstream fixes.

### 2. Umbra scheme adapter

Umbra cannot be represented well by changing only Minimal's public color
options. It needs a dedicated scheme that maps the palette into:

- Obsidian semantic variables
- Minimal-specific variables
- editor and syntax-highlight variables
- interactive, navigation, border, and state variables
- component-level variables used by the personal layer

Keep raw palette colors separate from semantic assignments. Components should
consume semantic variables rather than directly referencing colors such as
`--umbra-crimson` or `--umbra-cream`.

Resolarized should implement the same semantic interface so components do not
need scheme-specific selector copies.

### 3. Personal component layer

Port individual behaviors only after the base Umbra scheme is coherent. Likely
components are:

- bordered highlights
- `kbd` styling
- working table customization
- Coastal typography
- active editor line
- math sizing
- selected tag treatment
- selected code and syntax refinements

Each component should have its own SCSS partial where practical.

## Port inventory

| Area | Monolith source | Initial action |
| --- | --- | --- |
| Umbra palette | `src/color-schemes/_umbra.scss` | Re-map into Minimal and Obsidian semantic tokens |
| Resolarized palette | `src/color-schemes/_resolarized.scss` | Port after Umbra is stable |
| Fonts | `src/variables/_fonts.scss` and font tooling | Coastal Quattro and Coastal Mono embedded under SIL OFL 1.1 |
| Highlights | `src/base/_highlights.scss` | Port and test in source, live preview, and reading view |
| Keyboard keys | `src/base/_kbd.scss` | Port as an isolated component |
| Tables | working `tables.css` experiment | Use observed working behavior; do not assume `_tables.scss` is valid |
| Active line | `src/layout/_misc.scss` | Compare with Minimal's existing active-line feature before porting |
| Math | `src/base/_math.scss` | Port only the desired size and spacing changes |
| Tags | `src/components/_tags.scss` and layout rules | Review visually before deciding what to keep |
| Checkboxes | Monolith and Minimal implementations | Prefer Minimal unless a specific Monolith behavior is better |
| Headings | Monolith and Minimal implementations | Use Umbra variables with the preferred Minimal behavior |
| Plugin support | both projects | Prefer Minimal; add only personal plugin exceptions |

## Retained Minimal features

The following Minimal Theme Settings choices are part of Umbra's intended
configuration:

- colorful window frame (`colorful-frame`)
- colorful active states (`colorful-active`)
- colorful headings (`colorful-headings`)
- Minimal status bar (Minimal's default; `minimal-status-off` is not applied)
- trimmed filenames in sidebars (Minimal's default; `full-file-names` is not applied)
- workspace borders (Minimal's default; `borders-none` is not applied)
- underlined internal links (`links-int-on`)
- underlined external links (`links-ext-on`)

Keep these feature modules during pruning. During configuration reduction,
expose all eight choices in an **Umbra features** section in Style Settings so
they do not require Minimal Theme Settings. Default every toggle to the
configuration above: colorful frame, active states, and headings enabled;
Minimal status bar enabled; filenames trimmed; workspace borders enabled; and
internal and external links underlined.

From Minimal Advanced Settings, retain only:

- fast animations (`fast-animations`)
- pointer cursor (`--cursor: pointer`)
- disabled mobile toolbar (`mobile-toolbar-off`)

Remove the remaining Advanced Settings controls. Cards, Dataview, and Datacore
support are outside Umbra's scope.

Retain the following content and layout settings, using these values as Umbra
defaults:

- active editor line enabled
- horizontally scrollable code blocks enabled
- completed task-list text struck through
- unstyled tags
- alternating table rows, row hover, row lines, and full cell borders enabled
- table columns not separately lined; tables not centered
- table cells do not wrap and numbered columns are enabled
- tabular numerals disabled
- modern tabs
- tag radius `14px`
- window title visible
- H1 line disabled, with normal style and variant
- Lucide checkbox icons, icon treatment, and circular shape
- Umbra selected for both dark and light modes

## Current progress

Status as of 2026-08-31: the repository-side port is complete. The theme builds
successfully with `npm run build`, and a representative test note and visual
matrix are included under `tests/`. Final acceptance still requires running
that matrix in Obsidian because application rendering cannot be validated by
the build alone.

### Completed in source

- Renamed the package, manifest, build output, repository, and theme identity
  to Monolith Umbra while retaining Umbra as the default palette name.
- Retained Minimal as the application, layout, mobile, core-plugin, and general
  compatibility foundation.
- Added dark and light semantic adapters for five selectable schemes:
  Umbra, Resolarized, Glacier, Monolith, and Hunter.
- Made Umbra the default and stopped compiling Minimal's inherited preset
  schemes, preventing Minimal Theme Settings scheme classes from overriding it.
- Adapted Minimal's macOS palette as Monolith and Flexoki as Hunter, retaining
  their source attribution.
- Embedded Coastal Quattro and Coastal Mono as portable WOFF2 data, made them
  the default proportional and monospace families, and included the full SIL
  Open Font License 1.1 in generated CSS.
- Replaced Minimal's large Style Settings catalog with a compact Umbra panel
  containing only the selected schemes, features, interface behavior, editor
  behavior, tables, and checkbox choices.
- Disabled and removed the unused Cards and Dataview modules, their settings,
  compatibility metadata, related selectors, and documentation. Datacore and
  the meds callout are explicitly outside the port scope.
- Preserved the requested Minimal features: colorful frame, active states and
  headings; minimal status bar; trimmed filenames; workspace borders;
  underlined internal and external links; fast animations; pointer cursor; and
  disabled mobile toolbar.
- Ported bordered highlights, isolated `kbd` styling, restrained math sizing,
  semantic table finishing, active-line treatment, property-tag refinements,
  and the selected Lucide/icon-only/circular checkbox adapters as isolated
  personal partials.
- Added a representative note fixture and repeatable visual checklist.
- Disabled the remaining unconfigured presentation features at the SCSS entry
  point while retaining general application and plugin compatibility modules.
- Replaced inherited documentation with a concise Monolith Umbra guide and
  aligned package, manifest, generated output, and compatibility versions at
  `0.1.0`.

### Awaiting application validation

- Scheme palettes compile and switch correctly, but they have not completed
  the full dark/light UI-state and mobile visual checklist.
- The personal components and inherited behavior need visual confirmation with
  every included palette in dark and light modes.
- systematic testing in source mode, live preview, reading view, narrow panes,
  dialogs, settings, Canvas, Bases, and mobile
- baseline screenshots from the real application

### Scope removed

- Monolith's meds callout
- Cards layouts
- Dataview and Datacore support
- inherited Minimal color presets other than the attributed palettes adapted as
  Monolith and Hunter

## Implementation phases

### Phase 0: Establish the baseline

- Install dependencies and confirm the inherited Minimal build succeeds.
- Save screenshots of representative dark and light views.
- Create a test note covering all important Obsidian components.
- Record the Minimal commit and version used as the starting point.
- Commit the repository and theme rename separately from visual changes.

Completion criterion: Umbra builds exactly like the inherited Minimal version,
apart from its name and generated output filename.

### Phase 1: Build the Umbra scheme

- Add Umbra palette tokens.
- Map all relevant Obsidian semantic tokens.
- Map Minimal-specific color and contrast tokens.
- Make Umbra the default dark scheme.
- Add the light Umbra companion.
- Test UI states, not only note content.

Completion criterion: Umbra feels coherent across editor, reading view,
sidebars, settings, menus, dialogs, search, properties, canvas, and mobile
without relying on Minimal's preset color controls.

### Phase 2: Add Resolarized

- Implement the same semantic token contract used by Umbra.
- Add independent dark/light selection only if it remains useful.
- Verify components inherit the scheme without duplicated rules.

Completion criterion: switching schemes changes palette assignments without
changing layout or component implementation.

### Phase 3: Port personal components

Port one component per commit when possible, in this approximate order:

1. Coastal fonts
2. highlights
3. `kbd`
4. tables
5. active line
6. math
7. tags and remaining typography refinements

For each component:

- compare against Minimal's existing implementation
- port only the behavior that is actually desired
- use semantic variables
- test dark and light modes
- test source mode, live preview, and reading view where applicable
- commit the component independently

### Phase 4: Reduce configuration

- Identify Minimal Theme Settings features that Umbra actually uses.
- Replace plugin-dependent controls with small Style Settings entries only when
  runtime selection is valuable.
- Remove scheme choices and settings that are not part of Umbra.
- Avoid settings for values that can remain opinionated defaults.

Completion criterion: the theme works without Minimal Theme Settings, and its
remaining settings are few enough to understand at a glance.

### Phase 5: Prune unused features

- Disable unwanted SCSS modules from `src/scss/index.scss` first.
- Build and test after every small group of removals.
- Delete source only after it has remained disabled through normal use.
- Keep compatibility modules unless they cause a problem or support software
  that will never be used.

Completion criterion: removed features have no hidden layout or compatibility
effects in the actual vault.

### Phase 6: Documentation and release cleanup

- Replace inherited user documentation with Umbra-specific documentation.
- Preserve Minimal credit, licensing, and the requested support link.
- Update screenshots and installation instructions.
- Align package, manifest, generated filenames, and versioning.
- Decide whether the theme remains personal or is prepared for distribution.

## Test note and visual checklist

The test vault should include:

- headings H1 through H6
- internal and external links
- bold, italic, highlights, inline code, and code blocks
- ordered, unordered, nested, and task lists
- every checkbox state actually used
- blockquotes and standard callouts
- simple and wide tables, including hover and alternating rows
- inline and block math
- properties containing tags, links, numbers, and dates
- embeds, transclusions, images, and PDFs
- search results, backlinks, graph, canvas, and Bases
- menus, modals, prompts, notices, buttons, inputs, and toggles
- narrow desktop panes and mobile layouts

For every phase, verify both dark and light modes and check keyboard focus,
hover, active, selected, disabled, success, warning, and error states.

## Git and upstream workflow

Normal Monolith Umbra development is intentionally simple:

```text
edit -> build -> test -> commit
```

Keep `origin` pointed at the Monolith Umbra repository. Add the original Minimal repository as
`upstream` when upstream review becomes necessary:

```bash
git remote add upstream https://github.com/kepano/obsidian-minimal.git
git fetch upstream
```

Do not automatically merge every Minimal release. When Obsidian changes or a
useful Minimal fix appears:

1. fetch `upstream`
2. inspect the relevant commits
3. bring over only applicable compatibility fixes
4. adapt them to Umbra in a normal Umbra commit
5. rebuild and test

This is a selective-upstream workflow. Umbra has its own direction, while
Minimal remains a valuable compatibility reference.

## Commit strategy

Prefer small commits with one clear purpose. A useful initial sequence is:

1. `Rename theme and repository to Umbra`
2. `Add Umbra semantic color scheme`
3. `Add Umbra light scheme`
4. `Add Resolarized color scheme`
5. one commit for each personal component
6. one commit for each group of disabled Minimal features

Avoid combining repository management, palette work, component ports, and
feature removal in a single commit. Small commits make regressions and upstream
comparison much easier to manage.

## Resolved decisions

- A single scheme selector controls both dark and light variants.
- Minimal's current table implementation remains the behavioral base, with
  semantic Monolith border, radius, and header refinements layered over it.
- Inline tags remain plain; property tags use semantic palette pills. The
  selected checkbox default is Lucide, icon-only, and circular.
- Monolith Umbra remains a personal theme. Its repository still preserves the
  metadata and licensing needed for reproducible releases.
