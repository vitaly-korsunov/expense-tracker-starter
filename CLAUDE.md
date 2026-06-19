# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the starter project for a Claude Code course (codewithmosh.com). It's a small React + Vite expense tracker that originally **intentionally contained a bug, poor UI, and messy code**, meant to be found and fixed during the course rather than pre-emptively cleaned up. The codebase evolves as the course progresses — check `git log` for what's already been addressed before assuming something is still broken or unstructured.

Fixed so far: transaction `amount` values were originally stored/handled as strings, making the `reduce`-based income/expense totals string-concatenate instead of sum numerically. Amounts are now stored as numbers (seed data and the add-transaction form both produce numeric `amount`).

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

There is no router, no state management library, and no backend/persistence layer. Everything lives in-memory via `useState` and resets on page reload.

- `src/main.jsx` — entry point; mounts `<App />` into `#root` inside `StrictMode`.
- `src/App.jsx` — owns the source-of-truth `transactions` state (seeded with hardcoded sample data) and the shared `categories` array (`food`, `housing`, `utilities`, `transport`, `entertainment`, `salary`, `other`). Computes `totalIncome`/`totalExpenses`/`balance` inline (not memoized) and passes them down, along with an `onAddTransaction` callback that appends to `transactions`.
- `src/Summary.jsx` — presentational; renders the income/expense/balance cards from props.
- `src/TransactionForm.jsx` — owns its own field state (`description`, `amount`, `type`, `category`); on submit, builds the transaction object and calls `onAddTransaction` rather than touching `transactions` directly.
- `src/TransactionList.jsx` — owns its own filter state (`filterType`, `filterCategory`); derives `filteredTransactions` from the `transactions` prop and renders the filter selects + table.
- `src/App.css` / `src/index.css` — plain CSS, no CSS-in-JS or utility framework. Note: `.delete-btn` is defined in `App.css` but not yet used anywhere in JSX — likely scaffolding for a not-yet-implemented delete feature.

State ownership pattern: `App` holds data that's shared across components (`transactions`); each child owns state that's purely local to itself (form fields, filters) and only talks to `App` via the `onAddTransaction` callback prop. Keep this pattern when adding new features rather than lifting everything into `App`.
