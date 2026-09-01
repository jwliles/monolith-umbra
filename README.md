# Monolith Umbra

Monolith Umbra is a personal [Obsidian](https://obsidian.md/) theme built on
[Minimal](https://github.com/kepano/obsidian-minimal). It combines Minimal's
application and plugin compatibility with custom color schemes, Coastal
Iosevka fonts, and a deliberately small set of Style Settings controls.

The theme is under active development.

## Installation

Copy `manifest.json` and `theme.css` into:

```text
<vault>/.obsidian/themes/Monolith Umbra/
```

Restart Obsidian, then select **Monolith Umbra** under **Settings → Appearance**.

The optional [Style Settings](https://github.com/mgmeyers/obsidian-style-settings)
plugin exposes the included schemes and feature controls.

## Development

```bash
npm ci
npm run build
```

The build produces `theme.css` for Obsidian and `Monolith-Umbra.css` as an
expanded development copy. Set `OBSIDIAN_PATH` in `.env` to copy `theme.css`
into a test vault automatically.

See [PORTING.md](PORTING.md) for current scope and progress.

## Attribution

Monolith Umbra retains source from Minimal, Copyright 2020–2026 Steph Ango
(@kepano), under the MIT License. If you find the Minimal foundation useful,
you can [support its author](https://www.buymeacoffee.com/kepano).

Coastal Mono and Coastal Quattro are custom builds of Iosevka and are embedded
under the SIL Open Font License 1.1. The complete font license is included in
the generated CSS and in `src/fonts/OFL-1.1.md`.

## License

Theme source is licensed under the [MIT License](LICENSE). Embedded fonts are
licensed separately under the SIL Open Font License 1.1.
