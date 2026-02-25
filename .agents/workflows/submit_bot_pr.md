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
yarn test:run
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
- Target `main` as the base branch (`--base main`).

```bash
gh pr create --title "🤖 [Auto] Brief Feature Title" --body "### Summary of changes..." --base main
```

## Step 5: CI/CD Checks

If CI pipelines (like GitHub Actions) are configured, monitor them using:

```bash
// turbo
gh pr checks --watch --interval 30
```

Wait for the results. If `gh pr checks --watch` fails, use `gh run view --log-failed` to identify the specific error. Analyze the log and fix the issue.

Before force-pushing your fix, you must pull and rebase in case the user pushed manual corrections to your branch:

```
git add .
git commit --amend --no-edit
git pull --rebase origin <your-branch-name>
git push --force-with-lease
```

Re-run the watch command until the PR is green.
