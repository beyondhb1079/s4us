# RFC: Hybrid AI-Assisted Scholarship Queue (Epic 1)

**Date**: 2026-02-25
**Status**: Draft

## 1. Problem

Currently, adding a scholarship to S4US requires either:

1. A developer manually running `scripts/scrapeWeb.ts` and `scripts/importCsv.ts`.
2. A user painstakingly filling out a massive form (which caused crowdsourcing abandonment).

## 2. Proposed Solution

We will pivot to a "Hybrid AI Queue". Users simply submit a URL. A background job scrapes it using Gemini, and drops the parsed data into a `pending_approval` queue. An admin reviews the data on the Dashboard, edits if necessary, and clicks "Publish".

## 3. Architecture & Schema Changes

### A. Firestore Collections

We need two new top-level collections (or sub-collections, depending on current rules) to act as queues, keeping raw data isolated from the production `scholarships` collection.

1. **`suggestions_queue`**
   - **Fields:** `url` (string), `submittedAt` (timestamp), `status` (enum: 'PENDING', 'PROCESSING', 'FAILED')
   - **Rules:** Anyone can create (with basic rate limiting/AppCheck). No one can read except Admins/Service Accounts.

2. **`pending_approval`**
   - **Fields:** Matches the `ScholarshipSchema` from the web scraper, plus `sourceUrl` (string), `scrapedAt` (timestamp).
   - **Rules:** Only Admins can read/write/delete.

### B. Cloud Functions (Backend)

We will create a scheduled Cloud Function (or a Pub/Sub trigger on `suggestions_queue` creation, combined with a Cloud Task queue for rate-limiting).

**The Scraper Worker:**

1. Pulls the oldest 'PENDING' document from `suggestions_queue` where `submittedAt` is > 15 seconds ago (to prevent rapid Gemini API hammering).
2. Marks it 'PROCESSING'.
3. Executes the existing `scrapeWeb.ts` logic using `@ai-sdk/google`.
4. Saves the successful output to the `pending_approval` collection.
5. Deletes the document from `suggestions_queue`.

**Tiered Cost Analysis:**

- _Gemini 3.0 Flash limits:_ 15 RPM on the free tier. The queue processing _must_ stagger HTTP requests using `setTimeout` or strict Cloud Task dispatch configurations to guarantee we never exceed 15 RPM. **Cost: $0/mo.**
- _Firestore:_ Minimal impact. Writes are tiny. **Cost: $0/mo.**

### C. Frontend (React/Vite)

1. **Suggest a Link Page (`/suggest`)**
   - A single, highly polished input field taking a URL.
   - reCAPTCHA or simple AppCheck integration to prevent spam bots.
   - Success state animation thanking the user.

2. **Admin Dashboard Revamp (`/admin`)**
   - Add a new tab: "Pending AI Approvals".
   - Shows a list of documents from `pending_approval`.
   - Clicking one opens a pre-filled form (reusing the existing Scholarship form components).
   - "Publish" button: Moves the document to the production `scholarships` collection and deletes it from `pending_approval`.
   - "Reject" button: Deletes from `pending_approval`.

## 4. Work Breakdown (For Orchestrator)

If approved, this will generate 3 separate GitHub Issues/PRs:

1. **Data Specialist:** Implement the Firestore Schema and Cloud Function Worker.
2. **Frontend Specialist:** Build the `/suggest` URL submission route.
3. **Frontend Specialist:** Revamp the `/admin` dashboard to read from the `pending` queue and handle the Publish/Reject actions.

## 5. Next Steps

Review this RFC. Once approved, I will translate this into GitHub issues and we can bring in the execution agents!
