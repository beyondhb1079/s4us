---
trigger: always_on
description: Mandatory rules for Branch Isolation and Shared Epic Workflows.
---

# Branch Isolation & Epic Workflow

You are strictly **forbidden** from pushing changes directly to the `main` branch, and you are **forbidden** from creating "Stacked" PRs (branching off an unmerged feature branch). All branches must originate from `main`.

## 1. Independent Features (Standalone Tasks)
For isolated bug fixes or minor features, branch directly from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b ag/feature-name
```

_Note: Prefix standalone branches with `ag/`._

## 2. Epic Execution (Shared Branches)

When executing tasks that belong to a larger Epic, **do not** create individual branches for each phase. You must use the shared Epic branch defined by the Orchestrator.

1. Fetch and checkout the shared Epic branch (e.g., `git checkout epic-1-hybrid-queue`).
2. Sync the branch with remote (`git pull origin epic-1-hybrid-queue`).
3. Commit your specific task directly to this branch.
4. Push your changes.
5. Do not open a PR until the ENTIRE Epic is completed by all assigned agents.

## 3. The "No Stacking" Rule

Do not try to anticipate the next phase by branching off your current, unmerged work. If you are blocked waiting for a PR to merge into `main`, or waiting for another agent to finish their part of an Epic, you must **HALT**, notify the user, and wait. Do not attempt complex Git rebasing.

