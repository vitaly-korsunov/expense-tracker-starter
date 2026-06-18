# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the starter project for a Claude Code course (codewithmosh.com). It's a small React + Vite expense tracker that **intentionally contains a bug, poor UI, and messy code** — these are meant to be found and fixed during the course, not pre-emptively cleaned up unless asked.

Known intentional bug: transaction `amount` values are stored/handled as strings (seed data uses string literals like `"5000"`, and the add-transaction form takes the raw string from the number input). The income/expense totals in `App.jsx` use `reduce((sum, t) => sum + t.amount, 0)`, which string-concatenates amounts instead of summing them numerically.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # production build (outputs to dist/)
npm run preview  # preview the production build locally
npm run lint     # run ESLint over the project
```

There is no test runner configured in this project (no test script, no test framework dependency).

## Architecture

This is a single-component app — there is no router, no state management library, and no backend/persistence layer. Everything lives in-memory via `useState` and resets on page reload.

- `src/main.jsx` — entry point; mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — the entire application: transaction state (seeded with hardcoded sample data), the add-transaction form, type/category filters, and the summary/table rendering all live in this one component. Derived values (`totalIncome`, `totalExpenses`, `balance`, `filteredTransactions`) are recomputed inline on every render rather than memoized.
- `src/App.css` / `src/index.css` — plain CSS, no CSS-in-JS or utility framework.
- Categories are a hardcoded array (`food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`) duplicated across the add-transaction and filter selects.

When making changes, keep in mind there's no separation between presentation and logic yet — splitting components, extracting hooks, or introducing state management are exactly the kinds of refactors this course walks through, so don't assume a "correct" architecture is already in place.
