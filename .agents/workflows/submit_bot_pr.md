---
description: How to autonomously verify code, push branches, and create Pull Requests using the GitHub CLI.
---

# Autonomous PR Generation Workflow

Once you have finished implementing a feature or fix and are ready to hand it off from the agent to the user, you must autonomously create a Pull Request.

## Step 1: Verification

Before pushing, ensure the code is stable. Do not push broken builds.

```bash
// turbo
yarn lint
yarn test
yarn build
```

## Step 2: Check for Merge Conflicts

Avoid creating PRs with merge conflicts by pulling the latest changes from the base branch before you push.

```bash
git fetch origin main
git rebase origin/main
# If conflicts occur, resolve them, `git add .`, and execute `git rebase --continue`
```

## Step 3: Push

Push the branch to origin, setting the upstream link.

```bash
git push -u origin HEAD
```

## Step 4: Create the PR

Use the GitHub CLI (`gh`) to open the pull request automatically.

- Provide a concise title identifying it as an automated PR.
- Provide a summary body.
- If this is an independent branch, use `--base main`. If this is a stacked PR dependent on another feature branch, set `--base` to the parent branch name.

```bash
gh pr create --title "🤖 [Auto] Brief Feature Title" --body "### Summary of changes..." --base main
```

## Step 5: CI/CD Checks

If CI pipelines (like GitHub Actions) are configured, run `gh pr checks` and wait for the results. If a check fails, use `gh run view` to inspect the logs, implement a fix, and push an update automatically.
