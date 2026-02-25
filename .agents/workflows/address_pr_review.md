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

## Step 2: Fetch ALL Feedback Types (No Exceptions)

You must fetch feedback from three distinct areas: Reviews, General Comments, and Line-level Review Threads.

```bash
// turbo
gh pr view --json reviews,comments,reviewThreads -q '
  (.reviews[].body // ""),
  (.comments[].body // ""),
  (.reviewThreads[].comments[].body // "")'
```

## Step 3: Implementation & Tracking

Before declaring a task finished, run `gh pr view`. If there are open comments or a "Changes Requested" status, you **must** address every single comment by:

1. **Sync the Manifest**: Immediately update the `.TODO.md` file at the root. Every piece of feedback from Step 2 must become a task in the manifest.
2. **Modify Code**: Fix the issues.
3. **Commit**: Use the Git Identity rule.
4. **Reply**: Respond to the user's feedback via the CLI.
   - **For code changes:** Reply with `"Fixed in [short-commit-hash]"`.
   - **For questions or discussions:** Provide a direct, thoughtful response explaining your reasoning or answering the user's query. Do not use the "Fixed in" template if no code was changed.

## Step 4: The Final Sweep (Mandatory)

Before notifying the user that you are finished, you **must** re-run the command from Step 2.

- Compare the output against your `.TODO.md`.
- If a comment appears in the CLI output that is not checked off in your manifest, **you are not finished.**

## Step 5: Push and Notify

```bash
// turbo
git push
```

Once pushed, notify the user: "All feedback from the latest review threads and comments has been addressed."
