---
name: project-shape
description: Architecture and conventions of the expense-tracker-starter course repo (state ownership, file roles, fixed bug history)
metadata:
  type: project
---

This is a course-starter React + Vite expense tracker (codewithmosh.com). CLAUDE.md at the repo
root is authoritative on architecture and intentionally documents known scaffolding (e.g.
`.delete-btn` CSS existed before the delete feature was wired up) — always read it before reviewing
so "missing" functionality isn't mistakenly flagged as new.

**Why:** the project deliberately ships with rough edges that get fixed progressively across the
course, so git history matters more than usual for distinguishing "known TODO" from "new regression."

**State ownership pattern (enforce in reviews):** `App.jsx` owns shared state (`transactions`,
`categories`); each child (`TransactionForm`, `TransactionList`) owns its own local state (form
fields, filters) and talks back to `App` only via callback props (`onAddTransaction`,
`onDeleteTransaction`). Flag any change that lifts local-only state into `App` unnecessarily, or
that has a child mutate shared state directly instead of via a callback.

**Known historical bug (already fixed, don't re-flag):** transaction `amount` was originally a
string, making `reduce`-based totals string-concatenate instead of sum. Now stored as `Number`
end-to-end (seed data in `App.jsx`, `TransactionForm.jsx` does `amount: Number(amount)`). If you see
a new numeric field, check it isn't reintroducing the string-coercion mistake.

**Testing:** Vitest + RTL, config in `vite.config.js` test block, setup file `src/setupTests.js`,
test files `*.test.jsx` colocated with source. Only one test file exists so far: `src/App.test.jsx`
(checks heading text renders) — low coverage, so most regressions in this repo won't be caught by
`npm test` and need manual/visual review.

See [[css_theme_tokens]] for the visual design system conventions layered on top of this.
