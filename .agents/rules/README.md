---
description: Master index and table of contents for S4US workspace rules.
---

# S4US Agent Rules Manifest (Index)

This directory contains the global rules and protocols that govern all AI agents operating in the S4US workspace. Before executing tasks or modifying the workspace, review the relevant rules to maintain our Shared Epic Branch architecture.

* **`branching_strategy.md`**: Mandatory rules for Branch Isolation. Defines the "Flat Branch Architecture," dictating when to use Independent Feature branches versus Shared Epic branches, and strictly forbids Stacked PRs.
* **`code_standards.md`**: Enforces workspace-wide code quality and formatting, including modern MUI v6+ mandates, Vitest usage, and strict TypeScript configurations (e.g., requiring ES2022 targets for Cloud Functions).
* **`git_hygiene.md`**: Defines the "Trust but Verify" Git staging protocol. Enforces the use of `git status` before `git add .` to prevent ghost files, and standardizes commit message formats.
* **`global_rules.md`**: The master protocol file. Governs the Safe Sync Protocol (Pull-Before-Push), the Conflict HALT Protocol, dependency conflict resolution, and the mandatory use of Dynamic Absolute Pathing (`$(git rev-parse --show-toplevel)/tmp/`) for all scratchpads.
* **`meta_self_correction.md`**: Outlines the Async Self-Correction Protocol. Empowers agents to author meta-PRs to independently update these rule files if they encounter systematic friction or port leakage.
* **`progress_manifest.md`**: Dictates the lifecycle of the `.TODO.md` ledger. Defines Orchestrator initialization, the fallback auto-initialization for specialists, and the execution check-off rules.
* **`pure_refactors.md`**: Enforces the "Strict Component Extraction" mandate. Ensures that when decomposing large files, UI components are cleanly disconnected from backend hooks without altering existing state or props.
* **`security_policy.md`**: Outlines the baseline repository security practices, vulnerability reporting, and the strict protection of student PII (Personally Identifiable Information).
