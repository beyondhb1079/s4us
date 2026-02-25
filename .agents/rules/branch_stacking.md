---
trigger: always_on
description: Branching strategy, isolated work, and Epic feature branch rules.
---

---

## description: Branching strategy, isolated work, and Stacked PR rules to prevent idle time.

# Branch Isolation & Stacked Branch Rule

You are strictly **forbidden** from pushing changes directly to the `main` branch. All work must happen on isolated feature branches and be merged via Pull Requests.

## 1. Independent Changes

For new, independent features or bug fixes, always branch off the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b ag/feature-name
```

_Note: Prefix branches created by the agent with `ag/`._

## 2. Epic Branches & Stacked PRs (Never Sit Idle)

When working on an Epic that spans multiple PRs, **do not wait** for the user to review and merge your current PR before moving on. Keep the momentum going using Stacked Branches.

1. Work on the first logical piece of the epic on `ag/epic-phase-1` (branched from `main`).
2. Open a PR for `ag/epic-phase-1` targeting `main`.
3. Immediately branch off your _unmerged_ branch for the next phase:

   `git checkout ag/epic-phase-1`

   `git checkout -b ag/epic-phase-2`

4. Open a PR for `ag/epic-phase-2` targeting `ag/epic-phase-1` as the base.
5. As PRs get merged into `main`, rebase your subsequent branches on `main` and update their base in GitHub using `gh pr edit --base main`.

## 3. Keep PRs Small

Break down complex features (e.g., changes over 200 lines of complex logic) into smaller, reviewable chunks. Submit one chunk at a time via the Stacked Branch workflow outlined above.
