---
name: css-theme-tokens
description: Design-token CSS variable conventions in index.css/App.css and where they leak into JS (recharts colors) — check for drift on future palette changes
metadata:
  type: project
---

As of the "personal ledger" dark-theme redesign (commits `28d23c6` "commit frontend" + `0006269`
"add background hover", merged 2026-06-19), the app's design tokens live as CSS custom properties
in `src/index.css` `:root`:

- `--ink`, `--bg`, `--surface`, `--border` — background layers (darkest to lightest: ink < bg <
  surface)
- `--text`, `--text-faint` — foreground text
- `--brass`, `--brass-dim`, `--sage`, `--rust` — accent colors (brass = primary/CTA, sage = income,
  rust = expense)
- `--font-display` / `--font-body` / `--font-mono` — IBM Plex Serif/Sans/Mono trio, loaded via
  Google Fonts `<link>` tags in `index.html`

`src/App.css` consumes these via `var(--name)` consistently — confirmed zero leftover references to
the old light-theme variable names (`--paper`, `--paper-raised`, `--paper-line`, `--ink-text`,
`--ink-faint`, `--ink-soft`, `--ink-line`, `--vellum-text`, `--vellum-text-faint`) after the
light-to-dark rename. If reviewing a future palette tweak, grep for these old names first as a sanity
check that the rename pattern was followed.

**Known duplication point (flagged but not yet fixed as of 2026-06-19 review):**
`src/SpendingChart.jsx` hardcodes its own hex color literals (`COLORS` array, plus inline
`tick`/`axisLine`/`tickLine`/`contentStyle`/`labelStyle`/`itemStyle` props on recharts components)
that visually correspond to `--brass`/`--sage`/`--rust`/`--text-faint`/`--surface`/`--text` but
can't reference the CSS variables directly (recharts SVG props need literal/computed values, not
CSS var() strings in all versions). These already drifted out of sync once mid-redesign (commit
`0006269` changed the token hex values and `SpendingChart.jsx`'s `COLORS` array had to be
hand-edited to match). 

**Why this matters:** any future palette retune must remember to also update `SpendingChart.jsx` by
hand — there's no single source of truth enforced in code, only by review discipline.

**How to apply:** when reviewing any future change to `index.css` color tokens, always check
`src/SpendingChart.jsx` for hardcoded hex values that need the same update. Consider suggesting a
`getComputedStyle(document.documentElement).getPropertyValue('--brass')` helper to derive chart
colors from CSS at runtime if this drifts again.

See [[project_shape]] for the broader architecture this sits within.
