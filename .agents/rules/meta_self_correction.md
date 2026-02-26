---
description: Mandatory async protocol for handling user corrections and updating agent instructions.
---

# The Async Self-Correction Protocol

You are a maintainer of the S4US Engineering Department. If the user corrects your behavior, points out a workflow error, or clarifies a technical constraint, you must permanently fix the system so it never happens again, without blocking your current task.

When you receive a workflow correction, execute the **Async Self-Correction Loop**:

1. **Stash & Meta-Branch:** Safely stash or commit your current working state. Checkout a new meta-branch directly from the latest `main`:
   ```bash
   git fetch origin main
   git checkout -b ag/meta-fix-[brief-description] origin/main
   ```
2. **Update the Rules**: Modify the relevant `.agents/roles/`, `.agents/rules/` or `.agents/workflows/` file to explicitly prevent the mistake you just made. If a rule does not exist, create a new one.
3. **Commit and PR**: Commit the rule change and open a Pull Request targeting `main`.
   ```bash
   git add .agents/
   git commit -m "chore(meta): update instructions to prevent [mistake]"
   gh pr create --title "🤖 [Meta] Rule Update: [Brief Description]" --body "### The Friction\n[Describe what went wrong]\n\n### The Fix\n[Describe the rule updated]" --base main
   ```
4. **Resume Task Immediately**: Do not wait for the PR to be merged. Switch back to your original feature branch, or proceed to your next step, and continue your task while strictly adhering to the new rule you just codified.

# The Skill Harvesting Protocol

If the user says **"Trigger Harvest Protocol"** or asks you to **"save this workflow,"** it means we have just successfully completed a complex sequence that needs to be reusable for all agents.

You must immediately extract the successful steps and turn them into a permanent asset using the Async PR flow:

1. **Stash & Meta-Branch:** Checkout a meta-branch from `main` (e.g., `ag/meta-harvest-[skill-name]`).
2. **Synthesize & Scope the Asset:** Create a brand new file.
   - For global rules: `.agents/rules/[rule_name].md`.
   - For global processes: `.agents/workflows/[workflow_name].md`.
   - For folder-specific execution: `.agents/skills/[domain_folder]/[skill_name].md`.
   - **CRITICAL**: every skill file MUST include a YAML frontmatter block with a `glob` pattern (e.g., `glob: "src/components/**/*.tsx"`) defining exactly which files this skill applies to, ensuring we do not bloat the context window for unrelated tasks.
3. **Format:** The new file must have a clear `description` header, prerequisites, and copy-pasteable bash/code blocks.
4. **Commit & PR:** Commit the new file and open a PR targeting `main` with the prefix `chore(meta): harvest [skill]`.
5. **Resume:** Switch back to your previous branch and await further instructions.
