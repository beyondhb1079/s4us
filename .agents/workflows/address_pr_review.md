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

If you do not have the context of the user's feedback, you can fetch the comments and reviews comprehensively using this command:

```bash
// turbo
gh pr view --json reviews,comments -q '.reviews[].body, .comments[].body'
```

## Step 3: Implement, Commit, and Reply

Before declaring a task finished, run `gh pr view`. If there are open comments or a "Changes Requested" status, you **must** address every single comment by:

1. Modifying the code.
2. Updating the `.TODO.md` Progress Manifest to check off the item.
3. Committing the changes (use the Git Identity rule).
4. Replying to the comment thread using `gh pr comment` stating `"Fixed in [commit-hash]"`.

```bash
git add .
git commit -m "fix: address review feedback" --author="s4us-bot <bot@dreamscholars.org>"
```

## Step 4: Push and Notify

Push the changes to the same branch so the PR updates automatically.

```bash
// turbo
git push
```

Then, notify the user that the revisions are complete and ready for re-review.
