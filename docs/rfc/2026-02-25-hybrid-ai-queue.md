# RFC: Hybrid AI-Assisted Scholarship Queue (Epic 1)

**Date**: 2026-02-25
**Status**: Final (Updated post Cross-Agent Review)

## 1. Problem

Currently, adding a scholarship to S4US requires either:

1. A developer manually running `scripts/scrapeWeb.ts` and `scripts/importCsv.ts`.
2. A user painstakingly filling out a massive form (which caused crowdsourcing abandonment).

## 2. Proposed Solution

We will pivot to a "Hybrid AI Queue". Users simply submit a URL. A background job scrapes it using Gemini, and drops the parsed data into a `pending_approval` queue. An admin reviews the data on the Dashboard, edits if necessary, and clicks "Publish".

**Executive Overrides:** The queue will integrate deduplication, URL prioritization heuristics, and allow admins to deprioritize/dismiss URLs. Valid user sessions will be rate-limited to 50 links per day.

## 3. Architecture & Schema Changes

### A. Firestore Collections

We need two new top-level collections to act as queues, keeping raw data isolated from the production `scholarships` collection.

1. **`suggestions_queue`**
   - **Fields:** `url` (string), `submittedAt` (timestamp), `status` (enum: 'PENDING', 'PROCESSING', 'FAILED_UPSTREAM', 'BLOCKED', 'SUCCESS'), `priority` (number, default: 0)
   - **Rules:**
     - **Strict Schema Validation:** `url` must be a string < 500 chars and a valid URL format. `priority` supports dynamic ordering.
     - **State Enforcement:** `status` must be hardcoded to `'PENDING'` upon creation.
     - **Timestamp Validation:** `submittedAt` must equal `request.time`.

2. **`pending_approval`**
   - **Fields:** Matches `ScholarshipSchema` from the web scraper, plus `sourceUrl`, `scrapedAt`.
   - **Rules:** Only Admins can read/write/delete.

### B. Cloud Functions (Backend)

To protect the database from bloat and respect strictly 5 RPM Gemini limits:

1. **Submission Callable Function:**
   - Instead of direct client writes, the client calls a lightweight Cloud Function to submit URLs.
   - Performs IP-based and session-based rate limiting (max 50 links/day per session).
   - Validates schema and enqueues the URL as a **Cloud Task**.
2. **The Cloud Task (Ingestion Worker):**
   - Configured with `maxConcurrentDispatches: 1` and `maxDispatchesPerSecond: 0.08` to strictly guarantee <5 RPM.
   - **Deduplication:** Checks if the URL has been scraped recently. If so, skips scraping.
   - **Prioritization:** The Submission Function calculates and assigns the `priority` score (e.g., `+10` for `.edu`, `+5` for "list"). The backend processes higher priority documents first.
   - Executes `scrapeWeb.ts` logic using Gemini 3.0 Flash.
3. **Failure Modes:**
   - **403 Forbidden:** Catch, permanently flag as `BLOCKED`.
   - **500 Error:** Exponential backoff up to 3 retries, then flag as `FAILED_UPSTREAM`.

**Tiered Cost Analysis:**

- _Gemini 3.0 Flash limits:_ 5 RPM and 20 RPD on the free tier. The Cloud Task queue guarantees we stay under 5 RPM. **Cost: $0/mo.**
- _Firestore:_ Minimal impact due to deduplication and strict payload rules. **Cost: $0/mo.**

### C. Frontend (React/Vite)

1. **Suggest a Link Page (`/suggest`)**
   - **AppCheck/reCAPTCHA:** Must be lazy-loaded (e.g., on `onFocus`) to preserve LCP/TTI.
   - **UX State Lifecycle:** Interactive wait state with a loading skeleton tracking document `status`. The skeleton waits until the status transitions to a terminal state (`SUCCESS`, `FAILED_UPSTREAM`, or `BLOCKED`) before showing the final result. Graceful degradation on failure states.
   - **A11y:** Animations must respect `prefers-reduced-motion`. Use `aria-live` regions for status reading.
   - **i18n & Tone:** Wrap text in `t()`, handle Spanish text expansion gracefully, and use a "Parent Co-Pilot" tone (clear/supportive, keeping proper nouns in English).
2. **Admin Dashboard Revamp (`/admin`)**
   - **Queue Management:** Admins can view suggestion URLs to deprioritize or dismiss them.
   - **Component Reuse:** Extract the existing Scholarship Form into a strict, pure ("dumb") component that accepts `initialValues` and an `onSubmit` callback. No direct data-fetching.
   - **A11y:** Full keyboard navigation and clear focus states for Publish/Reject actions.

## 4. Work Breakdown (Acceptance Criteria)

1. **Data Specialist:**
   - Implement Firestore Schema with strict validation rules.
   - Build Callable Function (50 links/day rate limit).
   - Build Cloud Task worker with 5 RPM throttling, deduplication, URL heuristics, and failure mode handling.
2. **Frontend Specialist:**
   - Build `/suggest` with lazy-loaded AppCheck, i18n Co-Pilot tone, A11y standards, and real-time state listeners.
3. **Frontend Specialist:**
   - Refactor Scholarship form to pure component.
   - Build `/admin` pending queue with URL dismissal functionality and full keyboard navigation.
4. **QA Explorer:**
   - E2E testing for submission, state updates, and schema validation.
   - Mocking strategy using `vi.useFakeTimers()` to test debounce and configuring delays via env vars.

## 5. Next Steps

Review this finalized RFC. I will translate this into GitHub issues for execution!
