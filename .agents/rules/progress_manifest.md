---
description: Mandatory rule for tracking progress via a .TODO.md manifest file on all active branches.
---

# The Progress Manifest

To ensure transparency and rigorous task tracking, you must maintain a `.TODO.md` file at the root of the project for the duration of any feature branch.

## 1. Initialization

At the start of every branch, create a `.TODO.md` file listing the requirements, requested changes, and CI status.
Commit this file as your **first action** on the branch:

```bash
git add .TODO.md
git commit -m "chore: initial progress manifest" --author="s4us-bot <bot@dreamscholars.org>"
```

## 2. Tracking

As you finish tasks, address PR comments, or resolve CI failures, update the `.TODO.md` file and commit the "check-off."
This provides a clear history of what was addressed and when.

## 3. Cleanup

Once the PR is approved, all tasks are complete, and all CI checks are green, your **final commit** before merging must delete the `.TODO.md` file so it doesn't pollute the `main` branch history.

You **must** commit this deletion with the exact message:

```bash
git rm .TODO.md
git commit -m "chore: cleanup progress manifest [skip ci]" --author="s4us-bot <bot@dreamscholars.org>"
```
