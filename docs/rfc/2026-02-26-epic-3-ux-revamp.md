# RFC: High-Trust User Experience & Master-Detail Revamp (Epic 3)

**Date**: 2026-02-26
**Status**: Final (Corrected)

## 1. Problem

Even with a robust backend data pipeline, a clunky frontend undermines user trust. The platform currently suffers from orphaned UI/UX bugs from previous iterations, and the scholarship feed attempts to render too much information inline, causing cognitive overload.

## 2. Proposed Solution

Revamp the core User Experience to build trust and streamline the discovery feed by moving to a Master-Detail architecture, while squashing critical historical bugs.

## 3. Architecture & Implementation Requirements

### A. Master-Detail Feed Revamp

- Shift from full inline rendering on the main feed to a clean Master-Detail layout.
- **The Feed (Master):** Show compact, easily scannable scholarship cards highlighting only the name, amount, and deadline.
- **The Detail View:** Clicking a card opens a focused view (either a secondary slide-over pane or a focused modal) containing the full scholarship `description` and `requirements`.
- **Trust Signals:** Add "Verified by AI" or "Last Updated" metadata badges to the cards to foster user trust and signal active platform maintenance.

### B. Technical Debt & Bug Squash

- Resolve long-standing UI/UX backlog items identified in the project audit:
  - Fix non-clickable links on scholarship cards (#1266)
  - Resolve array sorting bugs on the feed (#1268)
  - Address general layout/overflow issues on mobile viewports.

## 4. Work Breakdown (Acceptance Criteria)

1. **Frontend Specialist / UX Engineer:**
   - Implement the Master-Detail container component.
   - Redesign the scholarship cards to be compact and include trust badges.
   - Resolve the active UI bug tickets (#1266, #1268).
2. **QA Explorer:**
   - Audit the new feed for layout shifts across desktop and mobile.
   - Test the new detail modal/pane for proper focus trapping and screen reader accessibility (A11y).
3. **Inclusion Officer:**
   - Verify the trust badges and UX copy maintain a supportive tone and do not inadvertently alienate users.
