# RFC: High-Trust User Experience & Master-Detail Revamp (Epic 3)

**Date**: 2026-02-26
**Status**: Final (Corrected)

## 1. Problem

Even with a robust backend data pipeline, a clunky frontend undermines user trust. The platform currently suffers from orphaned UI/UX bugs from previous iterations, and the scholarship feed attempts to render too much information inline, causing cognitive overload.

## 2. Proposed Solution

Revamp the core User Experience to build trust and streamline the discovery feed by moving to a Master-Detail architecture, while squashing critical historical bugs.

## 3. Architecture & Implementation Requirements

### A. Master-Detail Feed Revamp

- **Responsive Drawer (MUI):**
  - **Desktop:** A slide-over pane that keeps the scholarship list partially visible to maintain user context.
  - **Mobile:** Transitions to a full-screen modal to maximize legibility and accommodate text expansion.
- **Trust Signals & Scannability:**
  - **Badge:** Use **"Information Verified"** (Datos Verificados) instead of AI branding. Place in a predictable, non-cluttering location with a distinct status color.
  - **Self-Explanatory Data:** In the compact Master cards, maintain the current icon-only representation for Amount and Deadline to preserve scan speed. Only add explicit text labels in the Detail view if the layout requires them for clarity (e.g., within a vertical list of requirements).
- **Z-Index & Layers:** Audit the drawer's z-index to ensure it overlays the global Header and persistent actions without visual artifacts.

### B. Technical Debt & Bug Squash

- **Non-clickable links (#1266):** Implement `e.stopPropagation()` on internal interactive elements (like the website link) to prevent the card-click handler from firing.
- **Array Sorting (#1268):** Perform non-destructive sorting in the `ScholarshipList` component using `[...list].sort()` to prevent state mutation bugs.
- **Scroll Preservation:** Ensure opening/closing the Detail view does not reset the scroll position of the Master Feed.

## 4. Work Breakdown (Acceptance Criteria)

1. **Frontend Specialist / UX Engineer:**
   - Implement the Master-Detail container using **Responsive Drawer (MUI)**.
   - Redesign cards with compact "Information Verified" badges.
   - Resolve bugs #1266 and #1268 using the defined non-destructive strategies.
2. **QA Explorer:**
   - **A11y Audit:** Verify focus trapping within the drawer, `Esc` key support, and `aria-modal="true"`.
   - **Stability Test:** Verify feed scroll position preservation and mobile-to-desktop viewport transitions.
3. **Inclusion Officer:**
   - Audit UX copy for "Parent Co-Pilot" persona, ensuring "Information Verified" builds trust without technical anxiety.
