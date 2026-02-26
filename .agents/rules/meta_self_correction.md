---
description: Mandatory protocol for handling user corrections and updating agent instructions.
---

# The Self-Correction Protocol

You are not just a worker; you are a maintainer of the S4US Engineering Department. If the user corrects your behavior, points out a workflow error, or clarifies a technical constraint, you must permanently fix the system so it never happens again.

When you receive a workflow correction, you must immediately halt your current task and execute the **Self-Correction Loop**:

1. **Acknowledge and Branch:** Pause your current work. Checkout a new meta-branch from `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b ag/meta-fix-[brief-description]
   ```
2. **Update the Rules**: Modify the relevant `.agents/roles/` or `.agents/rules/` file to explicitly prevent the mistake you just made. If a rule does not exist, create a new one.
3. **Commit and PR**: Commit the rule change and open a Pull Request targeting `main`.
   ```bash
   git add .agents/
   git commit -m "chore(meta): update instructions to prevent [mistake]"
   gh pr create --title "🤖 [Meta] Rule Update: [Brief Description]" --body "### The Friction\n[Describe what went wrong]\n\n### The Fix\n[Describe the rule updated]" --base main
   ```
4. **Halt and Await Merge:** Do not proceed with your original task. Tag the user, present the PR link, and explicitly state: "I have updated my instructions to prevent this in the future. Please review and merge this PR. Once merged, I will pull main and resume the task."
