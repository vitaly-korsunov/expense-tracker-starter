---
name: deploy
description: Run the test suite, build the production bundle, and push the current branch to the staging branch on origin. Use when the user asks to deploy, ship, or push this app to staging.
---

# Deploy

Deploys the current branch to staging. Run the steps below **in order** and stop at the first failure — do not proceed to the next step if one fails.

1. **Run all tests**: `npm test` (runs Vitest in `run` mode, non-watch). If any test fails, stop and report the failure to the user. Do not proceed to build or push.

2. **Build the production bundle**: `npm run build`. This runs `vite build` and outputs to `dist/` (gitignored, not committed). If the build fails, stop and report the error.

3. **Push to staging**:
   - Confirm the working tree is clean (`git status`). If there are uncommitted changes, stop and ask the user whether to commit them first — do not commit on their behalf without asking.
   - Push the current branch to the `staging` branch on `origin`: `git push origin HEAD:staging`.
   - This is a shared/remote operation — tell the user what branch is being pushed and to which remote, and confirm with them before pushing if not already explicitly authorized for this run.

## Notes

- `dist/` is gitignored; the staging push ships source, not build artifacts. Whatever consumes the `staging` branch (hosting/CI) is expected to run its own build.
- Never use `git push --force` for this. If the push is rejected (non-fast-forward), stop and ask the user how to proceed rather than force-pushing over the staging branch.
