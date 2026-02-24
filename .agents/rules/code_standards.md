---
description: Core architectural principles and coding standards for the S4US workspace
---

# S4US Workspace Rules

These global rules define the architectural philosophy of the S4US project. Agents must adhere to these principles to ensure code quality, UI performance, and application stability over the long term.

## 1. Follow Existing Paradigms

When implementing new features or resolving bugs, you must thoroughly read the existing source code and match the established patterns and architecture of the surrounding project.

- **Rule:** Lean towards following the current codebase conventions (e.g., use Material-UI for UI components, Firestore for data fetching/storage, strict equality `===` for data comparisons). Avoid introducing competing libraries or conflicting paradigms unless absolutely necessary.

## 2. Approach to Migrations

The tech stack is allowed to evolve, but architectural shifts must be handled with care to prevent regressions.

- **Rule:** If you encounter shortcomings with the existing paradigms or find libraries that are deprecated/unmaintained, you are allowed to suggest a migration path.
- **Requirement:** Before executing a major architectural shift, you must write a detailed proposal explaining the specific shortcomings of the current approach, the benefits of your potential solution, and how the migration will be planned and evaluated safely.
