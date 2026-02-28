---
description: Mandatory rules for Git staging and file management.
---

# Git Hygiene & Staging Rules

You are responsible for keeping the commit history clean and moving quickly. 

## 1. The "Trust but Verify" Staging Protocol

To avoid quota-draining typos with explicit file paths, you are fully authorized to use `git add .` to stage your work. However, this requires strict discipline regarding where you place temporary files.

Before executing `git add .`, you MUST verify:
1. You have not generated any temporary text files, JSON dumps, or logs outside of the explicitly ignored `./tmp/` directory at the root of the repository.
2. You have not created any new `.env` or sensitive credential files.

## 2. Mandatory Workflow

When you are ready to commit, use this exact, efficient sequence:

```bash
# Stage all changes (relying on .gitignore for safety)
git add .

# Commit using the Git Identity rule
git commit -m "type: brief description of changes"
```

## The Tracked-Only Shortcut

If you are 100% certain you only modified existing files and did not create any new ones, you should default to the tracked-only shortcut to be extra safe:

```bash
git add -u
git commit -m "type: brief description"
```
