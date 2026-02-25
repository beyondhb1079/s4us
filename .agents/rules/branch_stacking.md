---
description: Branching strategy, isolated work, and Epic feature branch rules.
---

# Branch Isolation & Epic Branch Rule

You are strictly **forbidden** from pushing changes directly to the `main` branch. All work must happen on isolated feature branches and be merged via Pull Requests. Always use `git rebase` to update feature branches from `main` to avoid noisy merge commits.

## 1. Independent Changes

For new, independent features or bug fixes, always branch off the latest `main`:

```bash
git checkout main
git pull
git checkout -b ag/feature-name
```

_Note: Prefix branches created by the agent with `ag/`._

## 2. Epic Branches (Related Changes Spanning Multiple PRs)

Instead of using overly complex "Stacked PRs" that depend on each other, use an **Epic Branch** for related work (e.g. `ag/phase-1-onboarding`).

1. Work on one logical piece of the epic at a time on the epic branch.
2. Open a PR for that piece and set the base to `main`.
3. **Wait** for the user to review and merge that PR. Do not continue to the next piece until the current PR is merged to ensure the changes are good.
4. Once merged, `git fetch origin main` and `git rebase origin/main` to keep the epic branch clean and up-to-date.
5. Continue working on the next piece of the epic on the same branch, and open a new PR when ready.

## 3. Keep PRs Small

Break down complex features (e.g., changes over 200 lines of complex logic) into smaller, reviewable chunks. Submit one chunk at a time via the Epic Branch workflow outlined above.
