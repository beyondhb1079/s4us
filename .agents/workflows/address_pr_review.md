---
description: How to process user feedback left on a Pull Request.
---

# PR Feedback Loop Workflow

When the user reviews your autonomous PR and requests changes, follow this exact workflow to address the feedback.

## Step 1: Checkout the Right Context

Do not assume your current local branch is the correct one. The user may be reviewing an older PR.
Use the GitHub CLI to checkout the exact PR branch:

```bash
// turbo
gh pr checkout <PR-number>
```

## Step 2: Review Comments

If you do not have the context of the user's feedback, you can fetch the comments from the command line:

```bash
// turbo
gh pr view --comments
```

## Step 3: Implement and Commit

Make the requested code adjustments. When committing, you **must** use the Git Identity rule.

```bash
git add .
git commit -m "fix: address review feedback" --author="Antigravity Bot <bot@antigravity.dev>"
```

## Step 4: Push and Notify

Push the changes to the same branch so the PR updates automatically.

```bash
// turbo
git push
```

Then, notify the user that the revisions are complete and ready for re-review.
