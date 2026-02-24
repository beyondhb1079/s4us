---
description: Core architectural principles and coding standards for the S4US workspace
---

# S4US Workspace Rules

These global rules define the architectural philosophy of the S4US project. Agents must adhere to these principles to ensure code quality, UI performance, and application stability over the long term.

## 1. Type Safety and Predictable State (Strict Equality)

The S4US platform relies on highly deterministic filtering and querying for scholarship data.

- **Rule:** Always use strict equality (`===` and `!==`). Never use loose equality (`==` or `!=`).
- **Why:** Javascript type coercion leads to unpredictable edge cases—especially when dealing with Firestore enums or casting numeric string parameters from the browser URL. Strict equality guarantees that the data layer and UI state computations remain synchronized and bug-free.

## 2. Modern, Concurrent-Safe React

We prioritize native React capabilities over third-party dependencies that inject brittle side-effects into the DOM or break concurrent rendering (React 18+).

- **Rule:** Do not introduce legacy wrappers for native browser APIs (e.g., forbidding `react-helmet` for manipulating the document `<head>`).
- **Why:** Unmaintained external libraries frequently cause hydration mismatches, strict-mode warnings, and memory leaks.
- **Implementation:** Prefer native hooks. For example, mutate the document title directly via a localized vanilla `useEffect`.

## 3. Remote State Management over Global Context

S4US strategically minimizes the use of bespoke, global `<Context.Provider>` wrappers to prevent excessive app-wide re-renders and to avoid writing complex loading state boilerplate.

- **Rule:** Do not build custom React Contexts or `useState`/`useEffect` chains to fetch, cache, or distribute remote database records.
- **Why:** Managing stale data, loading flags, cache invalidation, and error states manually across a large component tree is fragile and error-prone.
- **Implementation:** Delegate all remote asynchronous data flows to dedicated generic caching libraries (like `@tanstack/react-query`).

## 4. Cohesive Design System (Material-UI)

To prevent CSS bundle fragmentation and maintain visual consistency, the project operates entirely within a single established component system.

- **Rule:** Exclusively use Material-UI (MUI v5). Do not introduce competing styling paradigms like Tailwind CSS, CSS Modules, or raw un-scoped `.css` files.
- **Why:** Mixing CSS-in-JS (MUI's `sx` prop or `styled` engine) with external utility classes or global stylesheets creates cascading specificity conflicts. This makes centralized theme overrides difficult and severely degrades component maintainability. Custom aesthetics must use MUI's theme tokens.
