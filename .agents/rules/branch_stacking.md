---
description: Branching strategy, isolated work, and Stacked PR generation rules.
---

# Branch Isolation & Stacking Rule

You are strictly **forbidden** from pushing changes directly to the `main` branch. All work must happen on isolated feature branches and be merged via Pull Requests.

## 1. Independent Changes

For new, independent features or bug fixes, always branch off the latest `main`:

```bash
git checkout main
git pull
git checkout -b ag/feature-name
```

_Note: Prefix branches created by the agent with `ag/`._

## 2. Stacked Branches (Dependent Changes)

If your new task (Change B) depends on unmerged code from your active work (Change A), you must use Stacked PRs.

1. Check out the parent branch: `git checkout ag/change-A`
2. Branch off of it: `git checkout -b ag/change-B`
3. When creating the PR for Change B, set the base to Change A `gh pr create --base ag/change-A`.

## 3. Keep PRs Small

Break down complex features (e.g., changes over 200 lines of complex logic) into smaller, reviewable stacked branches/PRs whenever possible. This makes review faster and safer.
