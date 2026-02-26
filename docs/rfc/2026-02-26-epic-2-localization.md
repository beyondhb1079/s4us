# RFC: Comprehensive Localization (Spanish) for Undocumented Students (Epic 2)

**Date**: 2026-02-26
**Status**: Draft

## 1. Problem

A large portion of the undocumented community in the US are native Spanish speakers, as are their parents who often assist in the scholarship search. The platform is currently only in English, limiting its reach and accessibility to key demographics.

## 2. Proposed Solution

Implement comprehensive localization, focusing on English and Spanish as the primary tier. This spans two layers: the static App Shell (UI) and the dynamic content (Scholarship data).

## 3. Architecture & Implementation

### A. App Shell Localization (Frontend)

- Leverage `react-i18next` and `i18next-browser-languagedetector` to automatically detect user preferences.
- Create JSON translation files for English (`en`) and Spanish (`es`).
- Key areas to localize:
  - Global Navigation & Footer
  - Onboarding Wizard (`/onboarding`)
  - Admin Dashboard (`/admin`)
- Add a visible language toggle (EN/ES) in the User Navigation bar for manual overrides.

### B. Dynamic Content Translation (Backend/Data Ops)

- Integrate translation into the newly built AI Data Ingestion Pipeline (Epic 1).
- Update the Gemini (`scrapeWeb.ts` logic) task worker: when parsing unstructured scholarship data, use the LLM to simultaneously translate `description`, `name`, and `requirements` fields into Spanish.
- Store the translated strings directly in the Firestore document alongside the English versions (e.g., `description_es`).

**Cost Analysis:**

- Gemini 3.0 Flash translation happens during the ingest hook. Existing AI step stays within free tier limits (20 RPD from Cron Job). Cost: **$0/mo**.
- Firestore storage expands by ~500 bytes per document. Even at 5,000 scholarships (+2.5MB), well within 1GiB free tier. Cost: **$0/mo**.

## 4. Work Breakdown

1. **Frontend Specialist:** Configure `react-i18next`, extract hardcoded strings to translation files, and build the navigation language toggle.
2. **Data Specialist / AI Engineer:** Update the Ingestion Cron Job to fetch and map Spanish translations for `description`, `name`, and `requirements` using Gemini.
3. **Inclusion Officer:** Review translated copy (particularly Onboarding flows) for culturally appropriate, supportive tone ("Parent Co-Pilot" persona).
4. **QA Explorer:** Test language persistence, layout shifts (Spanish text expansion), and verify Gemini translation quality in E2E sandbox.
