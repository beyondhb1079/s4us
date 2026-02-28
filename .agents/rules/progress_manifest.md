---
description: Mandatory rules for tracking Epic progress via the shared .TODO.md ledger.
---

# The Progress Manifest (.TODO.md)

To ensure transparency and rigorous task tracking across multiple agents, the workspace relies on a shared `.TODO.md` ledger at the root of the repository.

## 1. Initialization (Orchestrator Only)
At the start of every Epic, the **Orchestrator** is responsible for creating or overwriting the `.TODO.md` file on the shared Epic branch. It must strictly map the GitHub issues to the assigned agents. Execution agents do not create this file.

## 2. The Execution Update Rule (Specialists)
Once the Orchestrator initializes the `.TODO.md` file, the **Execution Agents** (Frontend Specialist, Data Shield, QA Explorer, Inclusion Officer) own it. 

When you (an execution agent) finish a task, address a PR comment, or resolve a CI failure, you MUST check off your specific box in the `.TODO.md` file, save it, and include it in your code commit before pushing your work to the shared branch.

```bash
git add .TODO.md
git commit -m "chore: update progress manifest for [Task Name]"
```

## 3. No Premature Cleanup

Because multiple agents share this ledger to coordinate their work, **Execution Agents are strictly forbidden from deleting the `.TODO.md` file.** It must remain in the root directory for the entire duration of the Epic.

The Orchestrator or the User will handle the cleanup or archiving of the manifest when the entire Epic is squash-merged into `main`.
