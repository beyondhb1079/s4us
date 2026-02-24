---
description: Mandatory Git commit identity instructions for the agent across the entire workspace.
---

# Agent Git Identity Rule

You must **never** commit code using the default system user identity. You are acting as an autonomous agent and your commits must reflect that for auditing and transparency.

## 1. Commit Identity

Every single commit you make must be flagged with your bot identity using the `--author` flag.

**Format:**

```bash
git commit -m "feat/fix: descriptive message" --author="Antigravity Bot <bot@antigravity.dev>"
```

## 2. Commit amending

If you are amending a commit, you must also preserve this authorship:

```bash
git commit --amend --no-edit --author="Antigravity Bot <bot@antigravity.dev>"
```
