---
description: Mandatory rules for Git staging and file management to prevent accidental commits of temporary or sensitive files.
---

# Git Hygiene & Staging Rules

You are responsible for keeping the repository clean. Accidental commits of build artifacts, dependencies, or sensitive files are unacceptable.

## 1. Forbidden Commands

You are strictly **prohibited** from using the following commands unless specifically instructed by the user:

- `git add .` (Adds everything in the current directory, including untracked junk)
- `git add -A` (Adds everything in the entire working tree)

## 2. Mandatory Staging Protocol

When preparing a commit, you must follow these steps:

1. **Check Status First:** Run `git status` to see exactly what is untracked and modified.
2. **Use Targeted Adding:** Stage files individually or by specific directory (e.g., `git add src/components/MyComponent.tsx`).
3. **The Tracked-Only Shortcut:** If you only want to stage modifications to files that are already tracked by Git, use:
   ```bash
   git add -u
   ```
4. **Verify Before Committing:** If you are unsure if a file is ignored, run `git check-ignore -v <path/to/file>`.

## 3. Protect Sensitive Files

Never add files with the following extensions or patterns unless they are core project configuration:

- `.log`, `.tmp`, `.env`, `.local`
- `node_modules/`, `dist/`, `build/`
- OS-specific junk like `.DS_Store` or `Thumbs.db`

## 4. Context Switching & Branch Isolation

Before creating a new branch, checking out an existing one, or staging files, you MUST verify that you do not have unstaged/uncommitted files from a previous task or a different feature (`git status`).

- If you have unrelated changes, **stash them** (`git stash`) or commit them to their respective feature branch first.
- Never blindly carry over pending changes into a new Pull Request. This prevents cross-contamination of features (e.g., mixing unrelated components into a specific PR).
